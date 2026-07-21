// Static privacy policy — a public, linkable page (the app stores and general
// good practice want a reachable privacy-policy URL). Prerendered to real HTML
// like the home, overriding the app-wide `ssr = false` from +layout.js for this
// route only. It has no per-user state, so serving it as static HTML is ideal.
import { LOCALE_CODES } from '$lib/i18n/locales.js';

export const prerender = true;
export const ssr = true;

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  return LOCALE_CODES.map((lang) => ({ lang }));
}
