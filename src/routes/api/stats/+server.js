// Usage-analytics read endpoint powering the mini-dashboard (2026-08).
// Deliberately gated to staging hosts: staging is unlinked and blocked to
// crawlers (see routes/robots.txt), so it's where the private dashboard lives.
// On production this 404s. It reads the daily documents written by /api/stat
// and aggregates them; no personal data exists to return.
import { json } from '@sveltejs/kit';

const WRITE_LIMIT = 1000; // KV free-tier writes/day (account-wide; see below)

function isStagingHost(url) {
  return /^staging\.|-staging\./.test(url.hostname);
}

const nz = (v) => Number(v) || 0;

export async function GET({ url, platform }) {
  if (!isStagingHost(url)) return new Response('Not found', { status: 404 });

  const kv = platform?.env?.STATS;
  if (!kv) return json({ error: 'no-kv', writeLimit: WRITE_LIMIT });

  // `?env=staging` inspects staging's own suffixed keys (for verifying the
  // pipeline from staging itself); the default shows the real production data.
  const wantStaging = url.searchParams.get('env') === 'staging';

  const listed = await kv.list({ prefix: 'stat:' });
  const days = listed.keys
    .map((k) => ({ name: k.name, staging: k.name.endsWith(':staging') }))
    .filter((k) => k.staging === wantStaging)
    .map((k) => ({ name: k.name, date: k.name.slice('stat:'.length).replace(/:staging$/, '') }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  const docs = await Promise.all(
    days.map((d) =>
      kv.get(d.name).then((v) => {
        try {
          return JSON.parse(v || '{}');
        } catch {
          return {};
        }
      })
    )
  );

  const today = new Date().toISOString().slice(0, 10);
  const totals = {};
  const series = []; // per-day chart counts, for the sparkline
  let writesToday = 0;

  days.forEach((d, i) => {
    const doc = docs[i];
    for (const [k, v] of Object.entries(doc)) {
      if (k === '_puts') continue;
      totals[k] = nz(totals[k]) + nz(v);
    }
    series.push({ date: d.date, chart: nz(doc.chart), open: nz(doc.open), device: nz(doc.device) });
    if (d.date === today) writesToday = nz(doc._puts);
  });

  const devices = nz(totals.device);
  const charts = nz(totals.chart);

  return json({
    env: wantStaging ? 'staging' : 'prod',
    generatedAt: new Date().toISOString(),
    totals,
    devices,
    charts,
    // "Charts per device": a ratio of two aggregates — no one is tracked.
    chartsPerDevice: devices ? charts / devices : 0,
    milestones: { m2: nz(totals.m2), m3: nz(totals.m3), m5: nz(totals.m5), m10: nz(totals.m10) },
    langs: { es: nz(totals['lang.es']), en: nz(totals['lang.en']) },
    installs: nz(totals.install),
    series: series.slice(-30),
    writesToday,
    writeLimit: WRITE_LIMIT
  });
}
