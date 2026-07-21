// Promise-based controller for the app's themed modal dialogs.
//
// Replaces window.prompt / confirm / alert with in-app dialogs that match the
// dark UI. A single <Dialog/> host (mounted in +layout.svelte) renders the
// active request. If no host is mounted — it always is in this SPA, but as a
// safety net — the calls fall back to the native dialogs, so no platform is
// ever left unable to rename / save / delete.
//
// Usage:
//   const name = await dialog.prompt({ title: 'Renombrar', defaultValue: c.name });
//   if (await dialog.confirm({ title: 'Borrar', danger: true })) { … }
//   await dialog.alert({ message: '3 cartas importadas.' });

import { t } from '$lib/i18n/index.svelte.js';

let active = $state(null);
let resolver = null;
let hostMounted = false;

function settle(value) {
  const r = resolver;
  resolver = null;
  active = null;
  if (r) r(value);
}

function open(request) {
  // A new request supersedes any pending one (resolve the old as cancelled).
  if (resolver) settle(request.mode === 'prompt' ? null : false);
  return new Promise((resolve) => {
    resolver = resolve;
    active = request;
  });
}

export const dialog = {
  get active() {
    return active;
  },

  /** @returns {Promise<string|null>} the entered text, or null if cancelled. */
  prompt(opts = {}) {
    if (!hostMounted) {
      return Promise.resolve(window.prompt(opts.message ?? opts.title ?? '', opts.defaultValue ?? ''));
    }
    return open({
      mode: 'prompt',
      title: '',
      message: '',
      defaultValue: '',
      placeholder: '',
      confirmLabel: t('dialog.ok'),
      cancelLabel: t('dialog.cancel'),
      ...opts
    });
  },

  /** @returns {Promise<boolean>} */
  confirm(opts = {}) {
    if (!hostMounted) {
      return Promise.resolve(window.confirm(opts.message ?? opts.title ?? ''));
    }
    return open({
      mode: 'confirm',
      title: '',
      message: '',
      confirmLabel: t('dialog.ok'),
      cancelLabel: t('dialog.cancel'),
      danger: false,
      ...opts
    });
  },

  /** @returns {Promise<void>} */
  alert(opts = {}) {
    if (!hostMounted) {
      window.alert(opts.message ?? opts.title ?? '');
      return Promise.resolve();
    }
    return open({
      mode: 'alert',
      title: '',
      message: '',
      confirmLabel: t('dialog.ok'),
      ...opts
    });
  },

  // --- used by the <Dialog/> host only ---
  _resolve: settle,
  _register() {
    hostMounted = true;
    return () => {
      hostMounted = false;
    };
  }
};
