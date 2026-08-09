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

// ── Shared-chart link: profile as JSON, no client detection (aug 2026) ───────
// The SAME /<lang>/chart?… link must serve the web page to a person AND make
// the computed profile readable to an AI following it from a prompt — WITHOUT
// trying to detect who is asking (header-based detection proved unreliable: a
// browsing AI goes through infra that rewrites headers, so Sec-Fetch/UA are not
// dependable). Instead:
//   - Everyone gets the same HTML, with the full profile embedded as a fallback
//     block (readable text + JSON). A JS client removes it instantly (inline
//     script, before paint); a client that can't run JS keeps and reads it.
//   - As a clean bonus, a client that explicitly asks for JSON only
//     (`Accept: application/json`, no text/html) gets the raw JSON directly.
// This means the chart is computed edge-side for every shared-link view, not
// only for bots — the accepted cost (see BACKLOG).

/** True when the client explicitly wants JSON and not HTML (a direct API/CLI
 *  fetch), so we can skip the HTML and return the raw profile. */
function wantsJsonOnly(req) {
  const accept = req.headers.get('accept') || '';
  return accept.includes('application/json') && !accept.includes('text/html');
}

/** Compute the shared chart's profile object, or null if the params don't
 *  decode to a valid birth. */
async function chartProfile(url, lang) {
  const birth = decodeBirth(url.searchParams);
  if (!birth) return null;
  const chart = await computeChart(birth);
  return buildProfileJson(chart, birth, lang);
}

/** Escape text for safe embedding inside a <pre> / HTML text node. Escaping `<`
 *  also neutralises any `</script>` inside the JSON. */
function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

/** The body fallback block: a human-readable summary + the full JSON, plus an
 *  inline script that removes it immediately so JS clients never see it. */
function fallbackBlock(profile) {
  const b = profile.birth || {};
  const name = b.name ? `${b.name} — ` : '';
  const summary =
    `${escHtml(name)}${escHtml(profile.typeLabel)}. ` +
    `Estrategia: ${escHtml(profile.strategyLabel)}. Autoridad: ${escHtml(profile.authorityLabel)}. ` +
    `Perfil: ${escHtml(profile.profile)}. Definición: ${escHtml(profile.definitionLabel)}. ` +
    `Nacimiento: ${escHtml(b.date ?? '')} ${escHtml(b.time ?? '')} · ${escHtml(b.place ?? '')}.`;
  const json = escHtml(JSON.stringify(profile, null, 2));
  return (
    // TEMPORARY diagnostic (aug 2026): a persistent marker that is NOT removed by
    // JS, placed before the removable profile. If an AI reads THIS on /chart but
    // not the profile below, its browser runs JS and the removal script is what
    // strips the profile (that's the difference vs the JS-less /ai-test route).
    // Remove once the AI-access question is settled.
    `<h1>AI_CHART_TEST_123456</h1><pre>{"chart_test":true}</pre>` +
    `<div id="hd-share-fallback">` +
    `<h1>Carta de Human Design</h1>` +
    `<p>${summary}</p>` +
    `<p>Perfil completo calculado (JSON):</p>` +
    `<pre>${json}</pre>` +
    `</div>` +
    `<script>(function(){var e=document.getElementById('hd-share-fallback');if(e)e.parentNode.removeChild(e);})();<\/script>`
  );
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
    // TEMPORARY diagnostic (aug 2026): a dead-simple, plain-HTML route — no
    // framework, no JS, no detection — to isolate whether an AI browsing tool
    // can read ANY HTML the Worker serves. Remove once shared-link access is
    // sorted. (Suggested by ChatGPT while debugging why it couldn't read the
    // embedded profile.)
    if (path === '/ai-test' || path === '/es/ai-test' || path === '/en/ai-test') {
      return new Response(
        '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>AI test</title></head>' +
          '<body><h1>AI_TEST_123456</h1><pre>{"hello":"world","source":"cloudflare-worker","number":123456}</pre></body></html>',
        { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } }
      );
    }

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

  // 3. Per-chart share link (client-rendered route). Compute the profile once
  //    and either return it as raw JSON (explicit JSON request) or embed it in
  //    the page as a non-JS fallback — no client detection (see the note above).
  if (lang && path === `/${lang}/chart`) {
    const profile =
      !building && hasShareParams(url.searchParams) ? await chartProfile(url, lang) : null;

    // 3a. A client that explicitly wants JSON only → give it the raw profile.
    if (profile && wantsJsonOnly(event.request)) {
      return new Response(JSON.stringify(profile, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'public, max-age=3600',
          'access-control-allow-origin': '*'
        }
      });
    }

    // 3b. Everyone else → the page with chart-specific OG, plus the embedded
    //     profile fallback (stripped by JS clients, read by non-JS ones).
    const meta = chartMeta(url, lang);
    const fallback = profile ? fallbackBlock(profile) : '';
    return resolve(event, {
      transformPageChunk: ({ html }) =>
        setHtmlLang(html.replace('<!--%og%-->', meta).replace('<!--%fallback%-->', fallback), lang)
    });
  }

  // 4. Any other page under a language: fix <html lang> (prerender + SSR).
  if (lang) {
    return resolve(event, { transformPageChunk: ({ html }) => setHtmlLang(html, lang) });
  }

  return resolve(event);
}
