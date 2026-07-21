// Locale registry — Phase M. Plain data (no runes), so both the reactive i18n
// engine (index.svelte.js) and the Cloudflare Worker (hooks.server.js) can
// import it without pulling in the Svelte runtime.
//
// THIS is the single source of truth for "what languages exist". Adding a
// language starts here (see docs/fase-m-multilingue.md).

/**
 * @typedef {Object} Locale
 * @property {string} code      URL segment + catalog key ('en', 'es')
 * @property {string} label     endonym shown in the language menu ("English")
 * @property {string} htmlLang  <html lang> / manifest lang ('en')
 * @property {string} ogLocale  Open Graph og:locale ('en_US')
 */

/** @type {Locale[]} — menu order; the first entry is the default language. */
export const LOCALES = [
  { code: 'en', label: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  { code: 'es', label: 'Español', htmlLang: 'es', ogLocale: 'es_ES' }
];

export const DEFAULT_LOCALE = LOCALES[0].code;
export const LOCALE_CODES = LOCALES.map((l) => l.code);

/** True if `code` is a language we ship. */
export function isLocale(code) {
  return LOCALE_CODES.includes(code);
}

/** The Locale metadata for a code (falls back to the default). */
export function localeMeta(code) {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

/**
 * Pick a language for the bare root `/`: an explicit saved preference (the
 * `hdl` cookie) wins; otherwise the browser's Accept-Language, by prefix;
 * otherwise the default. Used by the Worker to redirect `/` → `/<lang>`.
 * @param {string|null|undefined} cookieLang
 * @param {string|null|undefined} acceptLanguage
 * @returns {string}
 */
export function negotiateLocale(cookieLang, acceptLanguage) {
  if (isLocale(cookieLang)) return cookieLang;
  const wanted = (acceptLanguage || '')
    .split(',')
    .map((s) => s.trim().split(';')[0].toLowerCase())
    .filter(Boolean);
  for (const w of wanted) {
    const hit = LOCALE_CODES.find((c) => c === w || c === w.split('-')[0]);
    if (hit) return hit;
  }
  return DEFAULT_LOCALE;
}
