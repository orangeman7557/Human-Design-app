// Route param matcher for the `[lang=locale]` segment: only real languages
// match, so `/en/…` and `/es/…` route to the app while `/foo/…` 404s (and the
// bare `/` has no matching page → the Worker negotiates a redirect). Phase M.

import { isLocale } from '$lib/i18n/locales.js';

/** @param {string} param */
export function match(param) {
  return isLocale(param);
}
