<script>
  import '../app.css';
  import { browser } from '$app/environment';
  import Dialog from '$lib/components/Dialog.svelte';
  let { children } = $props();

  // Environment badge driven by the hostname at runtime, not by a build flag:
  // the same code ships everywhere and only lights up on staging hosts
  // (staging.hdchart.app or the *-staging.workers.dev fallback URL).
  const staging = browser && /^staging\.|-staging\./.test(location.hostname);
</script>

{#if staging}
  <div class="env-badge">staging</div>
{/if}

{@render children()}

<!-- Single themed-dialog host for the whole app (prompt / confirm / alert). -->
<Dialog />

<style>
  .env-badge {
    position: fixed;
    top: 0;
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
