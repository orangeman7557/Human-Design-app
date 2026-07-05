// Per-chart link previews (jul 2026). The app is a SPA (ssr:false), so a
// shared `/chart?…` link would otherwise carry the home page's generic Open
// Graph tags — social scrapers don't run the JS that would set chart-specific
// ones. This request-time hook runs in the Cloudflare Worker (the same runtime
// that serves /api/*) and rewrites the <head> of the /chart shell so the
// preview reflects the shared chart (name + type) instead of the app at large.
//
// It reads the share params directly (see lib/hd/share-link.js for the schema)
// rather than importing the decoder, so tz-lookup never gets bundled into the
// Worker. The image stays the brand og-image.png — a per-chart image would need
// server-side bodygraph rendering, which is out of scope.

/** Escape a string for use inside an HTML attribute / text node. */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function chartMeta(url) {
  const name = (url.searchParams.get('n') || '').trim();

  const title = name ? `${name} · Carta de Human Design` : 'Carta de Human Design';
  const desc =
    'Tipo, estrategia, autoridad, perfil, centros y canales. Mira esta carta de Human Design y explórala.';

  const ogUrl = `${url.origin}${url.pathname}${url.search}`;
  const image = `${url.origin}/og-image.png`;

  const T = esc(title);
  const D = esc(desc);
  const U = esc(ogUrl);

  return [
    `<title>${T}</title>`,
    `<meta name="description" content="${D}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Human Design Chart" />`,
    `<meta property="og:title" content="${T}" />`,
    `<meta property="og:description" content="${D}" />`,
    `<meta property="og:url" content="${U}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="es_ES" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${T}" />`,
    `<meta name="twitter:description" content="${D}" />`,
    `<meta name="twitter:image" content="${image}" />`
  ].join('\n    ');
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (event.url.pathname === '/chart') {
    const meta = chartMeta(event.url);
    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('<!--%og%-->', meta)
    });
  }
  return resolve(event);
}
