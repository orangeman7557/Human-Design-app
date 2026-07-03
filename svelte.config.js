import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // adapter-cloudflare deploys to the unified Cloudflare Workers
    // platform (which now also serves what used to be Pages).
    // We run as a SPA (no SSR) thanks to `ssr = false` in +layout.js.
    adapter: adapter(),
    serviceWorker: {
      // Cloudflare consumes _headers/_redirects (never serves them), so
      // precaching them would 404 and abort the service-worker install.
      files: (filepath) => !/(^|\/)_/.test(filepath)
    }
  }
};

export default config;
