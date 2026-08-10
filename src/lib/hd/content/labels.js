// Light accessor for the display labels (audit aug 2026).
//
// Same contract as `getDisplayLabels` in ./index.js, but importing ONLY the two
// small label modules — so a page that needs nothing else from the content
// library (the home, which shows type names on the saved-chart chips and the
// unknown-time band) doesn't pull both language packs into its bundle.
//
// Anything that needs real content — the chart page, the report, the drawers —
// keeps importing from ./index.js as before.
import { LABELS as es } from './labels-es.js';
import { LABELS as en } from './labels-en.js';
import { getLocale, DEFAULT_LOCALE } from '$lib/i18n/index.svelte.js';

const LANGS = { es, en };

/**
 * Display labels for a language (type, strategy, authority, definition,
 * centre, planet, typeShort, signal, cross). Both languages carry the full key
 * set — checked by the i18n parity test — so this needs no merge.
 * @param {string} [lang]
 */
export function getDisplayLabels(lang = getLocale()) {
  return LANGS[lang] ?? LANGS[DEFAULT_LOCALE];
}
