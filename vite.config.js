import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Single source of truth for the version shown in the page footers.
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

// AI-session worktrees under .claude/worktrees/ carry no node_modules of
// their own: Node resolves dependencies by walking up to the main
// checkout's node_modules, so Vite must be allowed to serve files from it.
const root = fileURLToPath(new URL('.', import.meta.url));
const mainCheckoutModules = resolve(root, '../../../node_modules');
const fsAllow =
  root.includes('.claude/worktrees') && existsSync(mainCheckoutModules)
    ? { fs: { allow: [root, mainCheckoutModules] } }
    : {};

export default defineConfig({
  plugins: [sveltekit()],
  server: fsAllow,
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  }
});
