// Server hook (Cloudflare Worker) — Phase L (per-chart previews) + Phase M
// (language routing). Runs for requests the static-asset layer doesn't serve
// (the bare root, legacy links, and the client-rendered /<lang>/chart), and at
// prerender time for the prerendered pages (where it fixes <html lang>).
//
// Responsibilities:
//   1. Bare root `/`     → 307 to /<lang> negotiated from the `hdl` cookie /
//                          Accept-Language (see lib/i18n/locales.js).
//   2. Legacy links      → pre-Phase-M `/chart` and `/privacy` had no language;
//                          all shared chart links were Spanish, so `/chart` →
//                          `/es/chart`; `/privacy` → negotiated.
//   3. /<lang>/chart     → rewrite <head> with chart-specific Open Graph in that
//                          language (social scrapers don't run the SPA's JS).
//   4. any /<lang>/…     → set <html lang> to the page's language.
//
// It reads the share params by hand (schema in lib/hd/share-link.js) rather than
// importing the decoder, so tz-lookup never gets bundled into the Worker. The
// preview image stays the brand og-image.png (a per-chart image would need
// edge-side bodygraph rendering, out of scope).

import { building } from '$app/environment';
import { DEFAULT_LOCALE, LOCALE_CODES, negotiateLocale } from '$lib/i18n/locales.js';

/** Escape a string for use inside an HTML attribute / text node. */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Open Graph copy per language for the /<lang>/chart share preview.
const OG = {
  en: {
    site: 'Human Design Chart',
    title: (name) => (name ? `${name} · Human Design Chart` : 'Human Design Chart'),
    desc: 'Type, strategy, authority, profile, centres and channels. View this Human Design chart and explore it.'
  },
  es: {
    site: 'Human Design Chart',
    title: (name) => (name ? `${name} · Carta de Human Design` : 'Carta de Human Design'),
    desc: 'Tipo, estrategia, autoridad, perfil, centros y canales. Mira esta carta de Human Design y explórala.'
  }
};

const OG_LOCALE = { en: 'en_US', es: 'es_ES' };

function chartMeta(url, lang) {
  const s = OG[lang] ?? OG[DEFAULT_LOCALE];
  const name = (url.searchParams.get('n') || '').trim();
  const T = esc(s.title(name));
  const D = esc(s.desc);
  const U = esc(`${url.origin}${url.pathname}${url.search}`);
  const image = `${url.origin}/og-image.png`;

  return [
    `<title>${T}</title>`,
    `<meta name="description" content="${D}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(s.site)}" />`,
    `<meta property="og:title" content="${T}" />`,
    `<meta property="og:description" content="${D}" />`,
    `<meta property="og:url" content="${U}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang] ?? OG_LOCALE[DEFAULT_LOCALE]}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${T}" />`,
    `<meta name="twitter:description" content="${D}" />`,
    `<meta name="twitter:image" content="${image}" />`
  ].join('\n    ');
}

/** The leading path segment if it's a known language, else null. */
function langOf(pathname) {
  const seg = pathname.split('/')[1];
  return LOCALE_CODES.includes(seg) ? seg : null;
}

/** app.html ships lang="en" (the default); swap it for other languages. */
function setHtmlLang(html, lang) {
  return lang === DEFAULT_LOCALE ? html : html.replace('<html lang="en"', `<html lang="${lang}"`);
}

function redirectTo(location) {
  return new Response(null, { status: 307, headers: { location } });
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const { url } = event;
  const path = url.pathname;

  // Root/legacy redirects are runtime-only. During prerender none of these
  // paths have a page and nothing links to them, and touching url.search then
  // throws — so skip the redirect logic while building.
  if (!building) {
    // 1. Bare root → negotiate a language and redirect.
    if (path === '/') {
      const lang = negotiateLocale(event.cookies.get('hdl'), event.request.headers.get('accept-language'));
      return redirectTo(`/${lang}${url.search}`);
    }

    // 2. Legacy language-less links (pre-Phase-M).
    if (path === '/chart') return redirectTo(`/es/chart${url.search}`);
    if (path === '/privacy') {
      const lang = negotiateLocale(event.cookies.get('hdl'), event.request.headers.get('accept-language'));
      return redirectTo(`/${lang}/privacy`);
    }
  }

  const lang = langOf(path);

  // 3. Per-chart share preview (client-rendered route, so scrapers need this).
  if (lang && path === `/${lang}/chart`) {
    const meta = chartMeta(url, lang);
    return resolve(event, {
      transformPageChunk: ({ html }) => setHtmlLang(html.replace('<!--%og%-->', meta), lang)
    });
  }

  // 4. Any other page under a language: fix <html lang> (prerender + SSR).
  if (lang) {
    return resolve(event, { transformPageChunk: ({ html }) => setHtmlLang(html, lang) });
  }

  return resolve(event);
}
