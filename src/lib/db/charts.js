// Local persistence for saved charts (Phase 2; sortOrder + type in 3.E;
// cookie-vault backup 2026-07-07).
//
// Stores only the birth input data, not the computed chart: the chart is
// recomputed on load, so stored records stay valid if the calculation
// logic improves. The chart `type` is denormalised into the record so the
// saved-charts list can show it without recomputing; missing types are
// backfilled lazily by the home page. IndexedDB via Dexie, all client-side.

import Dexie from 'dexie';
import { encodeCharts, decodeCharts, backupMarkerPresent } from './backup.js';
import { track } from '$lib/analytics.js';

const db = new Dexie('human-design-charts');

db.version(1).stores({
  charts: '++id, name, createdAt'
});

db.version(2)
  .stores({
    charts: '++id, name, createdAt, sortOrder'
  })
  .upgrade((tx) =>
    tx
      .table('charts')
      .toCollection()
      .modify((c) => {
        c.sortOrder = c.id;
      })
  );

// v3 (2026-08-09): a global, user-editable label list. Charts store their
// labels by NAME (not id) so the value is self-describing — it survives the
// cookie-vault backup and the JSON export/import without id remapping, and a
// rename just rewrites the name in every chart. The `labels` table exists to
// hold the ordered set (including labels not yet assigned to any chart) that
// drives the menu and the manage modal. Default labels are seeded from the UI
// (localised, once) via seedDefaultLabels — not here, since this layer has no
// locale.
db.version(3).stores({
  charts: '++id, name, createdAt, sortOrder',
  labels: '++id, name, sortOrder'
});

/**
 * @typedef {Object} SavedChart
 * @property {number} [id]
 * @property {string} name
 * @property {string} createdAt ISO datetime
 * @property {number} sortOrder list position (ascending)
 * @property {Object} birth same shape the form writes to sessionStorage
 * @property {string} [type] HD type id, e.g. 'generator'
 * @property {string[]} [labels] assigned label names
 */

/**
 * @typedef {Object} Label
 * @property {number} [id]
 * @property {string} name
 * @property {number} sortOrder
 */

// --- Cookie-vault backup (2026-07-07) ---
// WebKit's ITP wipes IndexedDB & friends after ~7 days of Safari use without
// visiting the site, so the saved list is mirrored into first-party cookies
// via /api/backup (server-set cookies survive the purge; the server stores
// nothing). Every mutation schedules a debounced sync; restore runs once per
// app load when the local DB turns up empty but the marker cookie says a
// backup exists — after a purge the charts just come back.

let syncTimer;
let persistRequested = false;
/** @type {Promise<boolean> | null} */
let restorePromise = null;

/**
 * Boot-time check, kicked from the layout (and awaited by the home before
 * listing): repopulate an empty local DB from the cookie vault, or seed the
 * vault for pre-vault users who already have local charts but no backup yet.
 * Singleton — safe to call from anywhere, runs at most once per load.
 * @returns {Promise<boolean>} true when charts were restored
 */
export function ensureBackupRestored() {
  if (!restorePromise) {
    restorePromise = (async () => {
      try {
        if (typeof document === 'undefined') return false;
        const marker = backupMarkerPresent();
        if ((await db.charts.count()) > 0) {
          if (!marker) scheduleBackupSync();
          return false;
        }
        if (!marker) return false;
        const res = await fetch('/api/backup');
        if (!res.ok) return false;
        const { payload } = await res.json();
        if (!payload) return false;
        const { charts: records, labels } = await decodeCharts(payload);
        if (!records.length) return false;
        await db.charts.bulkAdd(records);
        // Rebuild the label list from the backup only if we don't already have
        // one (e.g. after an ITP purge that wiped IndexedDB but not the vault).
        if (labels.length && (await db.labels.count()) === 0) {
          await db.labels.bulkAdd(labels.map((name, i) => ({ name, sortOrder: i })));
        }
        return true;
      } catch {
        // offline or corrupt payload — leave local data alone
        return false;
      }
    })();
  }
  return restorePromise;
}

function scheduleBackupSync() {
  if (typeof fetch === 'undefined') return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(runBackupSync, 800);
}

async function runBackupSync() {
  try {
    // Never overwrite a fuller backup from a not-yet-restored empty DB
    // (e.g. purged storage + landing straight on a share link and saving).
    await ensureBackupRestored();
    const charts = await db.charts.orderBy('sortOrder').toArray();
    if (charts.length && !persistRequested) {
      persistRequested = true;
      // Best-effort hardening against storage-pressure eviction (it does not
      // exempt from the ITP purge — that's what the vault is for).
      navigator.storage?.persist?.()?.catch(() => {});
    }
    const labelNames = (await db.labels.orderBy('sortOrder').toArray()).map((l) => l.name);
    const payload = charts.length ? await encodeCharts(charts, labelNames) : '';
    await fetch('/api/backup', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: payload
    });
  } catch {
    // best-effort: the backup stays stale until the next mutation or load
  }
}

/**
 * @param {string} name
 * @param {Object} birth
 * @param {string} [type]
 * @returns {Promise<number>} new id
 */
export async function saveChart(name, birth, type) {
  const id = await db.charts.add({
    name,
    createdAt: new Date().toISOString(),
    sortOrder: Date.now(),
    birth,
    type
  });
  scheduleBackupSync();
  track('save');
  return id;
}

/** @returns {Promise<SavedChart[]>} in user-defined order */
export async function listCharts() {
  return db.charts.orderBy('sortOrder').toArray();
}

/**
 * The saved chart matching these birth data (same date/time/timezone/coords),
 * or null. Used to mark an opened chart as already saved. Name is ignored — the
 * chart is the same whatever it was saved as.
 * @param {Object} birth same shape the form writes to sessionStorage
 * @returns {Promise<SavedChart | null>}
 */
export async function findSavedChart(birth) {
  if (!birth) return null;
  const same = (b) =>
    b &&
    b.date === birth.date &&
    b.time === birth.time &&
    b.timezone === birth.timezone &&
    b.latitude === birth.latitude &&
    b.longitude === birth.longitude;
  const all = await db.charts.toArray();
  return all.find((c) => same(c.birth)) ?? null;
}

/** @param {number} id @param {string} name */
export async function renameChart(id, name) {
  await db.charts.update(id, { name });
  scheduleBackupSync();
}

/** Backfill the denormalised type of an existing record. */
export async function setChartType(id, type) {
  await db.charts.update(id, { type });
  scheduleBackupSync();
}

/** Persist a new list order. @param {number[]} ids in display order */
export async function reorderCharts(ids) {
  await db.transaction('rw', db.charts, async () => {
    for (let i = 0; i < ids.length; i++) {
      await db.charts.update(ids[i], { sortOrder: i });
    }
  });
  scheduleBackupSync();
}

/** @param {number} id */
export async function deleteChart(id) {
  await db.charts.delete(id);
  scheduleBackupSync();
}

// ── Labels (v3) ────────────────────────────────────────────────────────────

/** @returns {Promise<Label[]>} in user-defined order */
export async function listLabels() {
  return db.labels.orderBy('sortOrder').toArray();
}

/**
 * Seed the default labels, but only when the table has never been touched:
 * empty AND not previously seeded (the localStorage flag stops re-seeding after
 * the user deletes them all). Called from the UI with localised names.
 *
 * Each seeded row keeps the default's `def` key, which is what lets
 * `syncDefaultLabels` re-translate it when the app language changes. A rename
 * drops the key: from then on the label is the user's word, in any language.
 * @param {{ key: string, name: string }[]} defaults
 * @returns {Promise<boolean>} true when seeding happened
 */
export async function seedDefaultLabels(defaults) {
  if (!Array.isArray(defaults) || !defaults.length) return false;
  try {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('hd:labels-seeded')) {
      return false;
    }
  } catch {
    // storage unavailable — fall back to the empty-table check alone
  }
  const seeded = await db.transaction('rw', db.labels, async () => {
    if ((await db.labels.count()) > 0) return false;
    for (let i = 0; i < defaults.length; i++) {
      await db.labels.add({ name: defaults[i].name.trim(), sortOrder: i, def: defaults[i].key });
    }
    return true;
  });
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem('hd:labels-seeded', '1');
  } catch {
    // ignore — worst case defaults re-seed once on a device without storage
  }
  if (seeded) scheduleBackupSync();
  return seeded;
}

/**
 * Keep the *default* labels in the app's language (aug 2026). Charts store
 * their labels by name, so translating one is a rename: the row and every
 * chart carrying it are rewritten together, exactly as renameLabel does.
 *
 * Only rows that still carry their `def` key are touched. Rows seeded before
 * the keys existed (and rows the cookie-vault restore rebuilt from names alone)
 * are adopted first — but only when the table still holds most of ONE
 * language's default set, so a label the user happened to name "Work" by hand
 * isn't mistaken for the seeded one and translated out from under them.
 *
 * @param {{ key: string, name: string }[]} current  defaults in the active language
 * @param {Record<string, Record<string, string>>} byLocale  every language's defaults, keyed by locale
 * @returns {Promise<boolean>} true when anything was rewritten
 */
export async function syncDefaultLabels(current, byLocale) {
  if (!Array.isArray(current) || !current.length) return false;
  const want = new Map(current.map((d) => [d.key, d.name]));
  const rows = await db.labels.toArray();
  if (!rows.length) return false;

  // Which name belongs to which default key, for the languages whose seeded set
  // is still recognisable in this table (half of it or more).
  /** @type {Map<string, string>} lowercased name → default key */
  const adoptable = new Map();
  for (const set of Object.values(byLocale ?? {})) {
    const entries = Object.entries(set ?? {});
    if (!entries.length) continue;
    const present = entries.filter(([, name]) =>
      rows.some((r) => r.name.toLowerCase() === name.toLowerCase())
    );
    if (present.length * 2 < entries.length) continue;
    for (const [key, name] of entries) adoptable.set(name.toLowerCase(), key);
  }

  const taken = new Set(rows.map((r) => r.name.toLowerCase()));
  /** @type {{ id: number, key: string, name?: string, from?: string }[]} */
  const changes = [];
  for (const row of rows) {
    if (row.def === null) continue;
    const key = row.def ?? adoptable.get(row.name.toLowerCase());
    if (!key) continue;
    const name = want.get(key);
    if (!name) continue;
    if (row.name === name) {
      if (row.def !== key) changes.push({ id: row.id, key });
      continue;
    }
    // Someone already owns that word (a label of their own, or another default
    // that hasn't been rewritten yet): leave this one alone rather than create
    // a duplicate. It gets picked up on a later pass.
    if (taken.has(name.toLowerCase())) continue;
    taken.delete(row.name.toLowerCase());
    taken.add(name.toLowerCase());
    changes.push({ id: row.id, key, name, from: row.name });
  }
  if (!changes.length) return false;

  const renamed = new Map(changes.filter((c) => c.name).map((c) => [c.from, c.name]));
  await db.transaction('rw', db.labels, db.charts, async () => {
    for (const c of changes) {
      await db.labels.update(c.id, c.name ? { name: c.name, def: c.key } : { def: c.key });
    }
    if (renamed.size) {
      await db.charts.toCollection().modify((c) => {
        if (Array.isArray(c.labels)) c.labels = c.labels.map((n) => renamed.get(n) ?? n);
      });
    }
  });
  if (renamed.size) scheduleBackupSync();
  return true;
}

/** Case-insensitive lookup of a label name already in use (optionally excluding one id). */
async function labelNameTaken(name, exceptId) {
  const lower = name.trim().toLowerCase();
  const all = await db.labels.toArray();
  return all.some((l) => l.id !== exceptId && l.name.toLowerCase() === lower);
}

/**
 * @param {string} name
 * @returns {Promise<{ id: number } | { error: 'empty' | 'duplicate' }>}
 */
export async function createLabel(name) {
  const trimmed = (name ?? '').trim();
  if (!trimmed) return { error: 'empty' };
  if (await labelNameTaken(trimmed)) return { error: 'duplicate' };
  const last = await db.labels.orderBy('sortOrder').last();
  const id = await db.labels.add({ name: trimmed, sortOrder: (last?.sortOrder ?? -1) + 1 });
  scheduleBackupSync();
  return { id };
}

/**
 * Rename a label and rewrite the name in every chart that carries it.
 * @param {number} id @param {string} name
 * @returns {Promise<{ ok: true } | { error: 'empty' | 'duplicate' | 'notfound' }>}
 */
export async function renameLabel(id, name) {
  const trimmed = (name ?? '').trim();
  if (!trimmed) return { error: 'empty' };
  const label = await db.labels.get(id);
  if (!label) return { error: 'notfound' };
  if (label.name === trimmed) return { ok: true };
  if (await labelNameTaken(trimmed, id)) return { error: 'duplicate' };
  const oldName = label.name;
  await db.transaction('rw', db.labels, db.charts, async () => {
    // `def: null` — not a deletion — so the row can never be re-adopted as a
    // default by name and re-translated behind the user's back.
    await db.labels.update(id, { name: trimmed, def: null });
    await db.charts.toCollection().modify((c) => {
      if (Array.isArray(c.labels) && c.labels.includes(oldName)) {
        c.labels = c.labels.map((n) => (n === oldName ? trimmed : n));
      }
    });
  });
  scheduleBackupSync();
  return { ok: true };
}

/** Delete a label and strip it from every chart. @param {number} id */
export async function deleteLabel(id) {
  const label = await db.labels.get(id);
  if (!label) return;
  const name = label.name;
  await db.transaction('rw', db.labels, db.charts, async () => {
    await db.labels.delete(id);
    await db.charts.toCollection().modify((c) => {
      if (Array.isArray(c.labels) && c.labels.includes(name)) {
        c.labels = c.labels.filter((n) => n !== name);
      }
    });
  });
  scheduleBackupSync();
}

/** Persist a new label order. @param {number[]} ids in display order */
export async function reorderLabels(ids) {
  await db.transaction('rw', db.labels, async () => {
    for (let i = 0; i < ids.length; i++) {
      await db.labels.update(ids[i], { sortOrder: i });
    }
  });
  scheduleBackupSync();
}

/** Set the labels assigned to a chart. @param {number} id @param {string[]} labels */
export async function setChartLabels(id, labels) {
  await db.charts.update(id, { labels });
  scheduleBackupSync();
}

/** Serialize all saved charts (and the label list) to a JSON string for download. */
export async function exportCharts() {
  const charts = await db.charts.orderBy('sortOrder').toArray();
  const labels = (await db.labels.orderBy('sortOrder').toArray()).map((l) => l.name);
  return JSON.stringify({ app: 'human-design-chart-app', charts, labels }, null, 2);
}

/**
 * Import charts from an exported JSON string. Appends as new records at
 * the end of the list (ignores incoming ids to avoid collisions).
 *
 * Records missing the fields computeChart needs (date/time/timezone) are
 * rejected instead of stored broken, and records identical to an already
 * saved chart (same name + birth data) are skipped, so re-importing the
 * same file doesn't duplicate the whole list. (Audit 2026-07-03.)
 * @param {string} json
 * @returns {Promise<{ imported: number, duplicates: number, invalid: number }>}
 */
export async function importCharts(json) {
  const data = JSON.parse(json);
  if (!data || !Array.isArray(data.charts)) {
    // Coded, not worded: this layer has no locale. The caller translates from
    // `code`; the message is only a last-resort fallback (default locale).
    const err = new Error('The file is not in the expected format.');
    // @ts-expect-error — augmenting Error with a stable code
    err.code = 'BAD_FORMAT';
    throw err;
  }
  const validBirth = (b) =>
    b && typeof b === 'object' &&
    typeof b.date === 'string' && typeof b.time === 'string' && typeof b.timezone === 'string';
  const key = (name, b) => [name, b.date, b.time, b.timezone, b.placeLabel ?? ''].join('|');
  const existing = new Set(
    (await db.charts.toArray()).filter((c) => validBirth(c.birth)).map((c) => key(c.name, c.birth))
  );
  let imported = 0;
  let duplicates = 0;
  let invalid = 0;
  const base = Date.now();
  for (const c of data.charts) {
    if (!c || typeof c.name !== 'string' || !validBirth(c.birth)) {
      invalid++;
      continue;
    }
    const k = key(c.name, c.birth);
    if (existing.has(k)) {
      duplicates++;
      continue;
    }
    existing.add(k);
    await db.charts.add({
      name: c.name,
      createdAt: typeof c.createdAt === 'string' ? c.createdAt : new Date().toISOString(),
      sortOrder: base + imported,
      birth: c.birth,
      type: typeof c.type === 'string' ? c.type : undefined,
      labels: Array.isArray(c.labels) ? c.labels.filter((n) => typeof n === 'string') : []
    });
    imported++;
  }
  // Merge the label set: the file's global list plus any name referenced by an
  // imported chart, appended (case-insensitively deduped) to what's already here.
  const incoming = [];
  if (Array.isArray(data.labels)) {
    for (const n of data.labels) if (typeof n === 'string' && n.trim()) incoming.push(n.trim());
  }
  for (const c of data.charts) {
    if (Array.isArray(c?.labels)) {
      for (const n of c.labels) if (typeof n === 'string' && n.trim()) incoming.push(n.trim());
    }
  }
  if (incoming.length) {
    const current = await db.labels.toArray();
    const seen = new Set(current.map((l) => l.name.toLowerCase()));
    let order = current.reduce((m, l) => Math.max(m, l.sortOrder), -1);
    for (const n of incoming) {
      if (seen.has(n.toLowerCase())) continue;
      seen.add(n.toLowerCase());
      await db.labels.add({ name: n, sortOrder: ++order });
    }
  }
  if (imported) scheduleBackupSync();
  return { imported, duplicates, invalid };
}
