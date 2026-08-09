// Usage-analytics write endpoint (2026-08). Receives a session's batched
// counters (see lib/analytics.js) and folds them into a single per-day KV
// document, so traffic costs ~1 write per session. Aggregate only: the body is
// a flat { eventName: count } map, filtered against a server-side allowlist —
// anything unknown, or any birth data, is ignored. Backed by KV binding STATS
// (wrangler.jsonc); until it's bound the endpoint is a silent no-op.
//
// Staging shares the STATS namespace but writes its own keys: the staging
// worker sets STATS_KEY_SUFFIX=":staging" (like the love counter), so test
// traffic never touches the real numbers.
import { json } from '@sveltejs/kit';

// The only counters we persist. Derived server-side nowhere else — the client
// sends these names verbatim (lib/analytics.js).
const ALLOW = new Set([
  'open',
  'chart',
  'save',
  'report',
  'share',
  'sharelink',
  'ai',
  'install',
  'notime',
  'device',
  'm2',
  'm3',
  'm5',
  'm10',
  'lang.es',
  'lang.en'
]);

// Per-field clamp: a genuine session fires a handful of each; this caps what a
// single crafted request can add, so the counters can't be trivially inflated.
const CAP = 30;

function dayKey(platform) {
  const suffix = platform?.env?.STATS_KEY_SUFFIX || '';
  const day = new Date().toISOString().slice(0, 10); // UTC YYYY-MM-DD
  return `stat:${day}${suffix}`;
}

export async function POST({ request, platform }) {
  const kv = platform?.env?.STATS;
  if (!kv) return json({ ok: false }); // namespace not bound yet

  // Same-origin only. Our own beacon either omits Origin (same-origin) or sends
  // one matching the host; a cross-origin Origin is spam and gets dropped.
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ ok: false });
    } catch {
      return json({ ok: false });
    }
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false });
  }
  if (!body || typeof body !== 'object') return json({ ok: false });

  const key = dayKey(platform);
  let doc;
  try {
    doc = JSON.parse((await kv.get(key)) || '{}');
  } catch {
    doc = {};
  }

  let touched = false;
  for (const [k, v] of Object.entries(body)) {
    if (!ALLOW.has(k)) continue;
    let n = Math.floor(Number(v));
    if (!Number.isFinite(n) || n < 1) continue;
    if (n > CAP) n = CAP;
    doc[k] = (doc[k] || 0) + n;
    touched = true;
  }
  if (!touched) return json({ ok: true });

  // `_puts` is this document's own write count — the dashboard reads it as the
  // "writes today" gauge against the KV free-tier daily limit.
  doc._puts = (doc._puts || 0) + 1;
  await kv.put(key, JSON.stringify(doc));
  return json({ ok: true });
}
