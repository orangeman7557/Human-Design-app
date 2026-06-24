import { defineConfig } from 'vitest/config';

// Standalone config (no SvelteKit plugin): the calculation core is pure JS,
// so the tests need none of the app's Vite setup. Kept separate from
// vite.config.js so loading it never drags in the SvelteKit dev/build plugin.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js']
  }
});
