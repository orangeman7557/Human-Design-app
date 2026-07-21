// i18n engine — Phase M (multi-language).
//
// No dependency: the active locale is a module-level `$state`, `t(key, params)`
// resolves UI-chrome strings from the per-language catalogs, and the content
// library (lib/hd/content) reads `getLocale()` as its default language so no
// call site has to pass one.
//
// The list of languages lives in ./locales.js (plain data, shared with the
// Worker). Adding a language: (1) add its entry there, (2) add its UI catalog
// ui/<code>.js, (3) add its content overrides hd/content/<code>.js. Everything
// else derives from LOCALES. See docs/fase-m-multilingue.md.
//
// The locale is driven by the URL (the `[lang]` route segment): the [lang]
// layout `load` calls setLocale before anything renders, so `/en/…` renders
// English and `/es/…` Spanish, at prerender time too. The cookie/Accept-Language
// are only used to negotiate the redirect at the bare root `/` (hooks.server.js).

import en from './ui/en.js';
import es from './ui/es.js';
import { DEFAULT_LOCALE, isLocale } from './locales.js';

export { LOCALES, DEFAULT_LOCALE, LOCALE_CODES, isLocale, localeMeta } from './locales.js';

const CATALOGS = { en, es };

// ── Active locale (reactive) ──────────────────────────────────────────────
let current = $state(DEFAULT_LOCALE);

/** The active language code. Reactive: reading it in a template tracks it. */
export function getLocale() {
  return current;
}

/** Set the active language. No-op for unknown codes or a no-op change. */
export function setLocale(code) {
  if (isLocale(code) && code !== current) current = code;
}

// ── String lookup ─────────────────────────────────────────────────────────
function get(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function fill(str, params) {
  if (params == null || typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m));
}

/**
 * A UI-chrome string by dot-path key, with `{param}` interpolation. Falls back
 * to the default locale, then to the key itself, so a page never renders blank.
 *
 * `locale` defaults to the active (module) locale, which is correct on the
 * client (single user). Prerendered pages render concurrently at build, where
 * the shared module locale can race, so those pass their route language
 * explicitly (see the home page). See docs/fase-m-multilingue.md.
 * @param {string} key    e.g. 'form.calculate'
 * @param {Record<string, any>} [params]
 * @param {string} [locale]
 * @returns {string}
 */
export function t(key, params, locale = current) {
  const cat = CATALOGS[locale] ?? CATALOGS[DEFAULT_LOCALE];
  const raw = get(cat, key);
  const val = raw != null ? raw : get(CATALOGS[DEFAULT_LOCALE], key);
  return fill(val != null ? val : key, params);
}
