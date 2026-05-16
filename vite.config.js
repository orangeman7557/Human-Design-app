import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],

  // swisseph-wasm trae un .wasm que hay que servir tal cual como asset,
  // no procesar como módulo JS. Y hay que excluirlo del pre-bundling de
  // Vite para que su importación dinámica funcione.
  assetsInclude: ['**/*.wasm'],
  optimizeDeps: {
    exclude: ['swisseph-wasm']
  }
});
