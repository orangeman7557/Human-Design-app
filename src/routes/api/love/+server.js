// AI-authored — global "send love" counter for the About modal (Phase L).
// Tiny same-origin API backed by Cloudflare KV (binding LOVE, wrangler.jsonc).
// Until the namespace is provisioned the endpoint answers { count: null } and
// the client hides the counter — the heart animation never needs the network.
import { json } from '@sveltejs/kit';

const KEY = 'love-clicks';
const MAX_PER_POST = 50;

async function readCount(kv) {
  return Number(await kv.get(KEY)) || 0;
}

export async function GET({ platform }) {
  const kv = platform?.env?.LOVE;
  if (!kv) return json({ count: null });
  return json({ count: await readCount(kv) });
}

// Body: { n } — clicks batched client-side, clamped so one request can't
// inflate the counter arbitrarily. KV read-modify-write can drop counts under
// simultaneous clicks from different visitors; fine for a love counter.
export async function POST({ request, platform }) {
  const kv = platform?.env?.LOVE;
  if (!kv) return json({ count: null });
  let n = 1;
  try {
    n = Math.floor(Number((await request.json())?.n));
  } catch {
    n = 1;
  }
  if (!Number.isFinite(n) || n < 1) n = 1;
  if (n > MAX_PER_POST) n = MAX_PER_POST;
  const count = (await readCount(kv)) + n;
  await kv.put(KEY, String(count));
  return json({ count });
}
