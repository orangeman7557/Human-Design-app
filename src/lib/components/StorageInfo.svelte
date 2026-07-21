<!-- AI-authored — "saber más" storage explainer (cookie vault, 2026-07-07). -->
<!-- Inline trigger for the saved-charts note on the home: opens a compact -->
<!-- modal (same pattern as About) telling, without drama, where the charts -->
<!-- live, how the automatic cookie backup protects them, what does delete -->
<!-- them, and the manual export/install routes. -->
<script>
  import { routeT } from '$lib/i18n/route-t.svelte.js';
  import { fade, fly } from 'svelte/transition';
  import { focusTrap } from './focus-trap.js';
  import { scrollLock } from './scroll-lock.js';

  // Route-bound: the "saber más" trigger renders inside the PRERENDERED home,
  // where the shared module locale races (see route-t.svelte.js).
  const t = routeT();

  let open = $state(false);

  function onkeydown(e) {
    if (e.key === 'Escape' && open) open = false;
  }
</script>

<svelte:window {onkeydown} />

<button class="link" type="button" onclick={() => (open = true)}>{t('storage.link')}</button>

{#if open}
  <div class="scrim" onclick={() => (open = false)} role="presentation" transition:fade={{ duration: 120 }}></div>
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-label={t('storage.title')}
    use:focusTrap
    use:scrollLock
    transition:fly={{ y: 12, duration: 180 }}
  >
    <header>
      <h2>{t('storage.title')}</h2>
      <button class="close" type="button" onclick={() => (open = false)} aria-label={t('bug.close')}>✕</button>
    </header>

    <div class="body">
      <p>{t('storage.p1')}</p>
      <p>{t('storage.p2')}</p>
      <p>{t('storage.p3a')}<strong>{t('storage.p3b')}</strong>{t('storage.p3c')}</p>
      <p>{t('storage.p4a')}<strong>{t('storage.p4b')}</strong>{t('storage.p4c')}</p>
    </div>
  </div>
{/if}

<style>
  /* The note sets size/colour; the trigger just adds a discreet underline. */
  .link {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .link:hover {
    color: var(--text);
  }
  .scrim {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 70;
  }
  .modal {
    position: fixed;
    z-index: 71;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(420px, calc(100vw - 2rem));
    max-height: 85vh;
    overflow-y: auto;
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1rem 1.3rem 1.3rem;
    text-align: left;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  h2 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    color: var(--accent);
  }
  .close {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1;
    padding: 0.15rem 0.3rem;
    cursor: pointer;
  }
  .close:hover {
    color: var(--text);
  }
  .body {
    margin-top: 0.9rem;
  }
  .body p {
    font-size: 0.88rem;
    line-height: 1.5;
    color: #c4c4ca;
    margin: 0.55rem 0 0;
  }
  .body strong {
    color: var(--text);
    font-weight: 600;
  }
</style>
