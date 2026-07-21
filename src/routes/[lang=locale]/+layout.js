// Language layer (Phase M). The `[lang=locale]` matcher guarantees `params.lang`
// is a real locale, so this load just activates it. It runs before any child
// component renders — on the server (prerender of /en, /es and their /privacy),
// on the client at hydration, and on every client-side navigation — so t() and
// the content library resolve in the URL's language, with no hydration flash.

import { setLocale } from '$lib/i18n/index.svelte.js';

export function load({ params }) {
  setLocale(params.lang);
  return { lang: params.lang };
}
