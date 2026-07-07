// AI-authored — cookie vault for saved charts (2026-07-07). Stores NOTHING
// server-side: POST turns the client's encoded chart list (see
// lib/db/backup.js) into first-party cookies and GET echoes them back for
// restore. Server-set cookies are the one browser storage WebKit's ~7-day
// ITP purge spares, which is the whole point. The data cookies are HttpOnly
// and path-scoped to this endpoint, so the charts never travel with normal
// navigation; the tiny `hdb` marker (chunk count, Path=/) lets the client
// know a backup exists without a network call. An empty POST clears the
// vault (the user deleted their last chart).
import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';

const MARKER = 'hdb';
const CHUNK = 3800; // conservative slice under the ~4 KB per-cookie limit
const MAX_CHUNKS = 3;
const MAX_AGE = 400 * 24 * 60 * 60; // browsers cap cookies at ~400 days; refreshed on every sync

// `secure: !dev` keeps the cookies testable over plain-http localhost.
const dataOpts = { path: '/api/backup', maxAge: MAX_AGE, httpOnly: true, sameSite: 'strict', secure: !dev };
const markerOpts = { path: '/', maxAge: MAX_AGE, httpOnly: false, sameSite: 'strict', secure: !dev };

export async function GET({ cookies }) {
  let payload = '';
  for (let i = 1; i <= MAX_CHUNKS; i++) {
    const part = cookies.get(MARKER + i);
    if (!part) break;
    payload += part;
  }
  return json({ payload: payload || null });
}

export async function POST({ request, cookies }) {
  const payload = (await request.text()).trim();
  if (payload.length > CHUNK * MAX_CHUNKS) return json({ error: 'too-large' }, { status: 413 });
  if (payload && !/^[A-Za-z0-9._-]+$/.test(payload)) return json({ error: 'bad-payload' }, { status: 400 });

  const chunks = [];
  for (let i = 0; i < payload.length; i += CHUNK) chunks.push(payload.slice(i, i + CHUNK));

  for (let i = 1; i <= MAX_CHUNKS; i++) {
    if (i <= chunks.length) cookies.set(MARKER + i, chunks[i - 1], dataOpts);
    else if (cookies.get(MARKER + i) !== undefined) cookies.delete(MARKER + i, dataOpts);
  }
  if (chunks.length) cookies.set(MARKER, String(chunks.length), markerOpts);
  else cookies.delete(MARKER, markerOpts);

  return json({ ok: true, chunks: chunks.length });
}
