// SPA mode: render entirely on the client. No SSR, no prerender per route.
// We rely on adapter-static's `fallback: 'index.html'` to serve a single
// entry that the SvelteKit client router takes over from.
export const ssr = false;
export const prerender = false;
