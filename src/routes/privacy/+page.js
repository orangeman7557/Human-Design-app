// Static privacy policy — a public, linkable page (the app stores and general
// good practice want a reachable privacy-policy URL). Prerendered to real HTML
// like the home, overriding the app-wide `ssr = false` from +layout.js for this
// route only. It has no per-user state, so serving it as static HTML is ideal.
export const prerender = true;
export const ssr = true;
