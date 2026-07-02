// App-wide default: SPA mode, rendered entirely on the client (no SSR, no
// prerender). adapter-cloudflare serves the client-rendered shell and the
// SvelteKit router takes over from there.
//
// Individual routes override this: the home (`+page.js`) is prerendered to
// static HTML for SEO, while the chart route keeps this SPA default.
export const ssr = false;
export const prerender = false;
