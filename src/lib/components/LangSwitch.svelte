<script>
  // Language selector (Phase M): a discreet tab hanging from the top edge —
  // same shape and height as the staging badge, but in neutral colours — that
  // shows the current language code ("EN"/"ES"). Tapping it opens a small menu
  // of every language written in its own name, the current one marked. Picking
  // one navigates to the same page in that language.
  //
  // A two-letter toggle alone is ambiguous ("is ES the current language or the
  // one I'd switch to?"); the menu removes that and scales to a third language.
  //
  // Placement: aligned to the right edge of the page's CONTENT column (not the
  // viewport), hence the `contentMax` prop. Deliberately thin so it never
  // collides with the chart header's save button on a phone.
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { LOCALES, getLocale } from '$lib/i18n/index.svelte.js';
  import { routeT } from '$lib/i18n/route-t.svelte.js';

  /** Width of the host page's content column, in px. */
  let { contentMax = 720 } = $props();

  let open = $state(false);

  // The route param, not the i18n module state: this component renders inside
  // the root layout of every page, including the PRERENDERED ones, and the
  // prerenderer builds pages concurrently — reading the shared module locale
  // there printed "EN" into the static HTML of /es (it only self-corrected on
  // hydration). See docs/fase-m-multilingue.md, "la regla de oro del SSR".
  // Falls back to the module locale for any route without a language segment.
  const current = $derived($page.params.lang ?? getLocale());
  const t = routeT();

  /** Same path/query/hash, with the language segment swapped to `code`. */
  function urlFor(code) {
    const parts = $page.url.pathname.split('/');
    parts[1] = code; // parts[0] is '' (leading slash), parts[1] the lang
    return parts.join('/') + $page.url.search + $page.url.hash;
  }

  function choose(code) {
    open = false;
    if (code !== current) goto(urlFor(code));
  }

  // Close on outside click / Escape.
  function onWindowClick(e) {
    if (open && !e.target.closest('.lang-switch')) open = false;
  }
  function onKeydown(e) {
    if (e.key === 'Escape') open = false;
  }
</script>

<svelte:window onclick={onWindowClick} onkeydown={onKeydown} />

<div class="lang-switch" style="--content-max: {contentMax}px">
  <div class="row">
    <div class="anchor">
      <button
        type="button"
        class="tag"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('lang.menu')}
        onclick={(e) => {
          e.stopPropagation();
          open = !open;
        }}
      >
        {current.toUpperCase()}
      </button>

      {#if open}
        <div class="menu" role="menu">
          {#each LOCALES as l}
            <button
              type="button"
              role="menuitemradio"
              aria-checked={l.code === current}
              class="item"
              class:active={l.code === current}
              onclick={() => choose(l.code)}
            >
              {l.label}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Full-width strip so the inner row can be centred like the page content;
     it must not eat clicks anywhere except on the control itself.
     z-index sits BELOW every overlay (drawers 40/60, report 50, dialogs 70) so
     the selector never floats on top of an open panel.

     `absolute`, not `fixed` (author, jul 2026): the tab belongs to the top of
     the page, not to the viewport — it scrolls away with the header instead of
     riding along over the content. */
  .lang-switch {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }
  /* Matches the host page's content column, so the tab lands on the right edge
     of the content instead of the right edge of the window. */
  .row {
    width: 100%;
    max-width: var(--content-max, 720px);
    padding-inline: 0.75rem;
    display: flex;
    justify-content: flex-end;
  }
  .anchor {
    position: relative;
    pointer-events: auto;
  }
  /* Same silhouette as the staging badge (hangs from the top edge, thin) but in
     neutral colours — the accent is reserved for the staging warning. */
  .tag {
    display: block;
    padding: 0.12rem 0.6rem;
    border: 1px solid var(--border);
    border-top: none;
    border-radius: 0 0 10px 10px;
    background: var(--surface);
    color: var(--text-muted);
    font-family: inherit;
    font-size: 0.62rem;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .tag:hover {
    color: var(--text);
    border-color: var(--accent);
  }
  .menu {
    position: absolute;
    top: calc(100% + 0.3rem);
    right: 0;
    min-width: 7.5rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
  .item {
    text-align: left;
    padding: 0.4rem 0.6rem;
    background: none;
    border: none;
    border-radius: 7px;
    color: var(--text-muted);
    font-size: 0.85rem;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
  }
  .item:hover {
    background: var(--surface-2);
    color: var(--text);
  }
  .item.active {
    color: var(--accent);
  }
</style>
