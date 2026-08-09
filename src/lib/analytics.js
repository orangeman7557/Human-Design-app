// First-party, cookieless usage analytics (2026-08). Aggregate counters only —
// no identifiers, no per-user records, and never any birth data. Events are
// buffered in memory during the session and flushed ONCE, when the page is
// hidden/unloaded, via `navigator.sendBeacon` → so a whole session costs a
// single KV write regardless of how many events it fired (see
// routes/api/stat/+server.js). Missing/blocked storage must never throw, so
// every localStorage touch is guarded.
import { browser } from '$app/environment';

// Simple, no-argument events the app fires directly. `open`, `device` and the
// language/milestone counters are derived here, not called by name.
const EVENTS = new Set([
  'chart', // a chart was computed and shown
  'save', // a chart was saved to the local library
  'report', // the initial report overlay was opened
  'share', // the chart image/share sheet was used
  'sharelink', // a shareable profile link was generated
  'ai', // the chart was handed off to an AI
  'install', // the PWA was installed
  'notime' // a chart was computed in "unknown time" mode
]);

/** @type {Record<string, number>} */
const buf = Object.create(null);
let armed = false;

function bump(name, n = 1) {
  buf[name] = (buf[name] || 0) + n;
}

function ls(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function lsSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode / storage disabled — measurement is best-effort */
  }
}

// Count each browser once, ever — the analytics equivalent of the love
// counter's `first` flag. This local flag is the only client-side state the
// feature keeps, and it holds nothing but "1".
function markDeviceOnce() {
  if (ls('hd_seen')) return;
  lsSet('hd_seen', '1');
  bump('device');
}

// Per-device chart tally → anonymous recurrence milestones. The server only
// ever learns "some device crossed its Nth chart", never which one.
const MILESTONES = [2, 3, 5, 10];
function recordChartMilestone() {
  const n = (Number(ls('hd_charts')) || 0) + 1;
  lsSet('hd_charts', String(n));
  if (MILESTONES.includes(n)) bump('m' + n);
}

// One flush per session: registered on first activity, fired when the page goes
// to the background or unloads (the reliable window for sendBeacon). pagehide
// and visibilitychange can both fire on the same unload; the empty-buffer guard
// makes the second a no-op.
function arm() {
  if (armed || !browser) return;
  armed = true;
  // visibilitychange is dispatched on `document`; pagehide on `window`.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
  window.addEventListener('pagehide', flush);
}

function flush() {
  const keys = Object.keys(buf);
  if (!keys.length) return;
  const payload = JSON.stringify(buf);
  for (const k of keys) delete buf[k]; // clear first — sendBeacon is fire-and-forget
  try {
    navigator.sendBeacon('/api/stat', new Blob([payload], { type: 'application/json' }));
  } catch {
    /* no beacon support / offline — the batch is simply dropped */
  }
}

/**
 * Record a simple usage event (see EVENTS). No-op off the browser or for an
 * unknown name, so call sites can stay one-liners without guards.
 * @param {string} event
 */
export function track(event) {
  if (!browser || !EVENTS.has(event)) return;
  bump(event);
  if (event === 'chart') recordChartMilestone();
  arm();
}

/**
 * Record an app open: a visit, a first-seen device (once ever) and the active
 * language. Call once per app load.
 * @param {string} [lang]
 */
export function trackOpen(lang) {
  if (!browser) return;
  bump('open');
  markDeviceOnce();
  if (lang === 'es' || lang === 'en') bump('lang.' + lang);
  arm();
}
