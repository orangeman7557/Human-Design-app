<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import Dialog from '$lib/components/Dialog.svelte';
  import LangSwitch from '$lib/components/LangSwitch.svelte';
  import { getLocale } from '$lib/i18n/index.svelte.js';
  import { ensureBackupRestored } from '$lib/db/charts.js';
  let { children } = $props();

  // Environment badge driven by the hostname at runtime, not by a build flag:
  // the same code ships everywhere and only lights up on staging hosts
  // (staging.hdchart.app or the *-staging.workers.dev fallback URL).
  const staging = browser && /^staging\.|-staging\./.test(location.hostname);

  // The language tab aligns to the right edge of the page's content column, so
  // it needs that column's width. Each page sets its own `main { max-width }`;
  // keep these in sync if a page's width changes.
  const contentMax = $derived(
    /\/chart(\/|$)/.test($page.url.pathname)
      ? 720
      : /\/privacy(\/|$)/.test($page.url.pathname)
        ? 640
        : 460
  );

  // Keep <html lang> in sync with the active language on client-side navigation
  // (first paint is already correct via the prerendered HTML / the Worker's
  // transformPageChunk), and remember the choice in the `hdl` cookie so the
  // bare-root `/` redirect can honour it (see hooks.server.js). Effects are
  // client-only, so this never runs during prerender.
  $effect(() => {
    const lang = getLocale();
    document.documentElement.lang = lang;
    document.cookie = `hdl=${lang}; path=/; max-age=34560000; samesite=lax`;
  });

  // Kick the cookie-vault restore at boot, whatever the entry route: if the
  // browser purged the local DB (iOS ~7-day rule) the charts come back before
  // the user can act. The home additionally awaits it before listing.
  onMount(() => {
    ensureBackupRestored();
  });
</script>

<LangSwitch {contentMax} />

{#if staging}
  <div class="env-badge">staging</div>
{/if}

{@render children()}

<!-- Single themed-dialog host for the whole app (prompt / confirm / alert). -->
<Dialog />

<style>
  .env-badge {
    position: fixed;
    top: env(safe-area-inset-top);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    pointer-events: none;
    padding: 0.12rem 0.65rem;
    border: 1px solid var(--accent);
    border-top: none;
    border-radius: 0 0 10px 10px;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 0.62rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
</style>
