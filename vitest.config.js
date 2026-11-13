import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Standalone config (no SvelteKit plugin): the calculation core is pure JS,
// so the tests need none of the app's Vite setup. Kept separate from
// vite.config.js so loading it never drags in the SvelteKit dev/build plugin.
export default defineConfig({
  // Only the `$lib` alias is mirrored, so modules that import through it can
  // be tested; runes modules (*.svelte.js) still need a vi.mock in the test.
  resolve: { alias: { $lib: fileURLToPath(new URL('./src/lib', import.meta.url)) } },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js']
  }
});
