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
//   3. /<lang>/chart     → for a person clicking the link (or a link-preview
//                          bot), rewrite <head> with chart-specific Open Graph
//                          in that language (social scrapers don't run the SPA's
//                          JS). For a programmatic client following a shared
//                          link (an AI, a script), serve the full computed
//                          profile as JSON instead — see the request-kind
//                          helpers below (aug 2026).
//   4. any /<lang>/…     → set <html lang> to the page's language.
//
// The JSON path decodes the share params and computes the chart edge-side, so
// this Worker now bundles the calc (astronomy-engine, luxon) and tz-lookup —
// unavoidable, since the SPA is client-rendered and a non-JS client can't get
// data any other way. The preview image stays the brand og-image.png (a
// per-chart image would need edge-side bodygraph rendering, out of scope).

import { building } from '$app/environment';
import { DEFAULT_LOCALE, LOCALE_CODES, negotiateLocale } from '$lib/i18n/locales.js';
import { decodeBirth, hasShareParams } from '$lib/hd/share-link.js';
import { computeChart } from '$lib/hd/chart.js';
import { buildProfileJson } from '$lib/hd/profile-json.js';

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

// ── Request-kind detection for the shared-chart link (aug 2026) ──────────────
// The SAME /<lang>/chart?… link serves the web page to a person who clicks it
// and JSON to a programmatic client (an AI following it from a prompt). The
// detection is behaviour-based, not a user-agent allowlist, so it doesn't rot:
//   - `Sec-Fetch-Mode: navigate` is set by the browser engine on every
//     top-level navigation (clicking a link, typing the URL) and can't be
//     spoofed by a plain fetch — the robust signal for "a person opened this".
//   - Link-preview / crawler bots are matched by their published UA tokens so
//     unfurl thumbnails and search indexing keep getting the HTML+OG.
//   - Anything else (no navigate, not a preview bot) is a data client and gets
//     the JSON. AI tools that don't run JS are exactly the ones lacking
//     `navigate`; ones that do render (headless Chromium) send it and get the
//     full app, which works.

/** True when the request looks like a real browser opening the document. */
function isBrowserNavigation(req) {
  const mode = req.headers.get('sec-fetch-mode');
  if (mode) return mode === 'navigate';
  // No Sec-Fetch-* (older browser or non-browser): treat as human only if it
  // clearly looks like a browser asking for HTML.
  const ua = req.headers.get('user-agent') || '';
  const accept = req.headers.get('accept') || '';
  return /mozilla|applewebkit|gecko|trident/i.test(ua) && accept.includes('text/html');
}

// Stable tokens published by link-preview services and search crawlers.
const PREVIEW_BOTS =
  /facebookexternalhit|facebot|twitterbot|slackbot|slack-imgproxy|whatsapp|discordbot|telegrambot|linkedinbot|pinterest|redditbot|embedly|quora link preview|showyoubot|outbrain|vkshare|skypeuripreview|nuzzel|bitlybot|googlebot|bingbot|applebot|yandex(bot|images)|duckduckbot|baiduspider|mastodon|iframely|opengraph/i;

/** True for a link-preview / crawler bot that should still get the HTML+OG. */
function isPreviewBot(req) {
  return PREVIEW_BOTS.test(req.headers.get('user-agent') || '');
}

/** Compute the shared chart and return it as a JSON string, or null if the
 *  params don't decode to a valid birth. */
async function chartJson(url, lang) {
  const birth = decodeBirth(url.searchParams);
  if (!birth) return null;
  const chart = await computeChart(birth);
  return JSON.stringify(buildProfileJson(chart, birth, lang), null, 2);
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

  // 3. Per-chart share link (client-rendered route, so both scrapers and data
  //    clients need edge help).
  if (lang && path === `/${lang}/chart`) {
    // 3a. Programmatic client following a shared link → serve JSON, not the SPA.
    if (
      !building &&
      hasShareParams(url.searchParams) &&
      !isBrowserNavigation(event.request) &&
      !isPreviewBot(event.request)
    ) {
      const json = await chartJson(url, lang);
      if (json) {
        return new Response(json, {
          headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'public, max-age=3600',
            'access-control-allow-origin': '*'
          }
        });
      }
      // Params didn't decode: fall through to the normal page.
    }

    // 3b. A person (or a link-preview bot) → the page with chart-specific OG.
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
