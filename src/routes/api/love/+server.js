// AI-authored — global "send love" counter for the About modal (Phase L).
// Tiny same-origin API backed by Cloudflare KV (binding LOVE, wrangler.jsonc).
// Until the namespace is provisioned the endpoint answers { count: null } and
// the client hides the counter — the heart animation never needs the network.
import { json } from '@sveltejs/kit';

const KEY = 'love-clicks';
// Distinct senders, same namespace (a KV namespace holds many keys). Counted
// approximately: the client sends `first: true` once per device/browser (a
// localStorage flag), clamped to +1 per request like `n` is clamped.
const SENDERS_KEY = 'love-senders';
const MAX_PER_POST = 50;

// Staging shares the production namespace but with its own keys: its worker
// env sets LOVE_KEY_SUFFIX="-staging" (wrangler.jsonc), so staging clicks
// never touch the real counters.
function keys(platform) {
  const suffix = platform?.env?.LOVE_KEY_SUFFIX || '';
  return { key: KEY + suffix, sendersKey: SENDERS_KEY + suffix };
}

async function readCount(kv, key) {
  return Number(await kv.get(key)) || 0;
}

export async function GET({ platform }) {
  const kv = platform?.env?.LOVE;
  if (!kv) return json({ count: null, senders: null });
  const { key, sendersKey } = keys(platform);
  const [count, senders] = await Promise.all([readCount(kv, key), readCount(kv, sendersKey)]);
  return json({ count, senders });
}

// Body: { n, first? } — clicks batched client-side, clamped so one request
// can't inflate the counter arbitrarily; an invalid or empty n adds nothing
// (never "at least 1", so junk requests can't creep the counter up). KV
// read-modify-write can drop counts under simultaneous clicks from different
// visitors; fine for a love counter.
export async function POST({ request, platform }) {
  const kv = platform?.env?.LOVE;
  if (!kv) return json({ count: null, senders: null });
  const { key, sendersKey } = keys(platform);
  let n = 0;
  let first = false;
  try {
    const body = await request.json();
    n = Math.floor(Number(body?.n));
    first = body?.first === true;
  } catch {
    n = 0;
  }
  let senders = await readCount(kv, sendersKey);
  if (!Number.isFinite(n) || n < 1) return json({ count: await readCount(kv, key), senders });
  if (n > MAX_PER_POST) n = MAX_PER_POST;
  const count = (await readCount(kv, key)) + n;
  await kv.put(key, String(count));
  if (first) {
    senders += 1;
    await kv.put(sendersKey, String(senders));
  }
  return json({ count, senders });
}
