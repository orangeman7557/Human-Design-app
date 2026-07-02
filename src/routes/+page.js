// The home is the public landing page, so we prerender it to real static HTML:
// crawlers and AI bots get the actual content (heading, copy, form) instead of
// the empty SPA shell. This overrides the app-wide `ssr = false` from
// +layout.js for this route only — prerendering requires server rendering.
//
// The chart route stays a pure SPA (its own +page.js keeps ssr:false /
// prerender:false): it's per-user, computed client-side, and not indexable.
export const prerender = true;
export const ssr = true;
