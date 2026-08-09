// Private analytics dashboard — client-only, never prerendered, never indexed
// (see the noindex tag in +page.svelte and the staging-only /api/stats gate).
export const ssr = false;
export const prerender = false;
