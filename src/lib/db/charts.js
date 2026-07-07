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

/**
 * @typedef {Object} SavedChart
 * @property {number} [id]
 * @property {string} name
 * @property {string} createdAt ISO datetime
 * @property {number} sortOrder list position (ascending)
 * @property {Object} birth same shape the form writes to sessionStorage
 * @property {string} [type] HD type id, e.g. 'generator'
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
        const records = await decodeCharts(payload);
        if (!records.length) return false;
        await db.charts.bulkAdd(records);
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
    const payload = charts.length ? await encodeCharts(charts) : '';
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
  return id;
}

/** @returns {Promise<SavedChart[]>} in user-defined order */
export async function listCharts() {
  return db.charts.orderBy('sortOrder').toArray();
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

/** Serialize all saved charts to a JSON string for download. */
export async function exportCharts() {
  const charts = await db.charts.orderBy('sortOrder').toArray();
  return JSON.stringify({ app: 'human-design-chart-app', version: 1, charts }, null, 2);
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
    throw new Error('El archivo no tiene el formato esperado.');
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
      type: typeof c.type === 'string' ? c.type : undefined
    });
    imported++;
  }
  if (imported) scheduleBackupSync();
  return { imported, duplicates, invalid };
}
