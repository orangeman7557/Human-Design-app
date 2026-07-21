import { LOCALE_CODES } from '$lib/i18n/locales.js';

// The home is the public landing page, so we prerender it to real static HTML:
// crawlers and AI bots get the actual content (heading, copy, form) instead of
// the empty SPA shell. This overrides the app-wide `ssr = false` from
// +layout.js for this route only — prerendering requires server rendering.
//
// The chart route stays a pure SPA (its own +page.js keeps ssr:false /
// prerender:false): it's per-user, computed client-side, and not indexable.
//
// `entries` lists the languages to prerender: the `[lang]` segment is dynamic,
// so the prerenderer needs the values enumerated. It derives from LOCALE_CODES,
// so adding a language needs no change here (Phase M).
export const prerender = true;
export const ssr = true;

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  return LOCALE_CODES.map((lang) => ({ lang }));
}
