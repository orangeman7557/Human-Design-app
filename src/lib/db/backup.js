// AI-authored — cookie-vault encoding for saved charts (2026-07-07).
//
// WebKit's ITP purges all script-writable storage (IndexedDB included) after
// ~7 days of Safari use without visiting the site, so the saved list is
// mirrored into first-party cookies via /api/backup — server-set cookies are
// the one browser storage that purge spares. This module is the wire format:
// the saved list serialised to a compact, cookie-safe string —
// deflate-compressed JSON in base64url with a "1." prefix ("0." = plain
// base64url where CompressionStream isn't available). Internal format, not a
// file: the JSON export in charts.js stays the user-facing backup.

/** Same requirement importCharts enforces: what computeChart needs. */
function validBirth(b) {
  return (
    b && typeof b === 'object' &&
    typeof b.date === 'string' && typeof b.time === 'string' && typeof b.timezone === 'string'
  );
}

/** @param {Uint8Array} bytes @param {any} stream Compression/DecompressionStream */
async function pipeThrough(bytes, stream) {
  const res = new Response(new Blob([bytes]).stream().pipeThrough(stream));
  return new Uint8Array(await res.arrayBuffer());
}

/** @param {Uint8Array} bytes */
function toBase64Url(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** @param {string} s */
function fromBase64Url(s) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/**
 * Serialise saved charts (and the global label list) to a cookie-safe payload.
 * The wire shape is an object `{ c: charts, l: labelNames }`; older payloads are
 * a bare charts array (still decoded — see decodeCharts).
 * @param {import('./charts.js').SavedChart[]} charts in display order
 * @param {string[]} [labelNames] global labels, in order
 * @returns {Promise<string>}
 */
export async function encodeCharts(charts, labelNames = []) {
  const slim = charts.map((c) => ({
    name: c.name,
    createdAt: c.createdAt,
    type: c.type,
    birth: c.birth,
    labels: Array.isArray(c.labels) && c.labels.length ? c.labels : undefined
  }));
  const data = { c: slim, l: Array.isArray(labelNames) ? labelNames : [] };
  const raw = new TextEncoder().encode(JSON.stringify(data));
  if (typeof CompressionStream !== 'undefined') {
    return '1.' + toBase64Url(await pipeThrough(raw, new CompressionStream('deflate-raw')));
  }
  return '0.' + toBase64Url(raw);
}

/**
 * Decode a payload into insertable chart records (no ids — fresh ones on
 * bulkAdd, sortOrder from position, records unusable by computeChart dropped)
 * plus the global label names. Accepts both the new `{ c, l }` object and the
 * legacy bare-array shape.
 * @param {string} payload
 * @returns {Promise<{ charts: Omit<import('./charts.js').SavedChart, 'id'>[], labels: string[] }>}
 */
export async function decodeCharts(payload) {
  const dot = payload.indexOf('.');
  if (dot < 1) return { charts: [], labels: [] };
  let bytes = fromBase64Url(payload.slice(dot + 1));
  if (payload.slice(0, dot) === '1') {
    bytes = await pipeThrough(bytes, new DecompressionStream('deflate-raw'));
  }
  const parsed = JSON.parse(new TextDecoder().decode(bytes));
  const arr = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.c) ? parsed.c : [];
  const labels = Array.isArray(parsed?.l) ? parsed.l.filter((n) => typeof n === 'string') : [];
  const charts = arr
    .filter((c) => c && typeof c.name === 'string' && validBirth(c.birth))
    .map((c, i) => ({
      name: c.name,
      createdAt: typeof c.createdAt === 'string' ? c.createdAt : new Date().toISOString(),
      sortOrder: i,
      birth: c.birth,
      type: typeof c.type === 'string' ? c.type : undefined,
      labels: Array.isArray(c.labels) ? c.labels.filter((n) => typeof n === 'string') : []
    }));
  return { charts, labels };
}

/**
 * True when the `hdb` marker cookie says a backup exists. The marker is the
 * only vault cookie readable from JS (the data chunks are HttpOnly and
 * path-scoped to /api/backup), so existence can be checked with no network.
 */
export function backupMarkerPresent() {
  return typeof document !== 'undefined' && /(?:^|;\s*)hdb=/.test(document.cookie);
}
