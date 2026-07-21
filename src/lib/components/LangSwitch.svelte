<script>
  // Language selector (Phase M): a discreet pill top-right showing the current
  // language code ("EN"/"ES"); tapping it opens a small menu of every language
  // written in its own name (never translated), the current one marked. Picking
  // one navigates to the same page in that language (swap the [lang] segment).
  //
  // A two-letter toggle alone is ambiguous ("is ES the current language or the
  // one I'd switch to?"); the menu removes that and scales to a third language.
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { LOCALES, getLocale } from '$lib/i18n/index.svelte.js';

  let open = $state(false);

  // The route param, not the i18n module state: this component renders inside
  // the root layout of every page, including the PRERENDERED ones, and the
  // prerenderer builds pages concurrently — reading the shared module locale
  // there printed "EN" into the static HTML of /es (it only self-corrected on
  // hydration). See docs/fase-m-multilingue.md, "la regla de oro del SSR".
  // Falls back to the module locale for any route without a language segment.
  const current = $derived($page.params.lang ?? getLocale());

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

<div class="lang-switch">
  <button
    type="button"
    class="tag"
    aria-haspopup="menu"
    aria-expanded={open}
    aria-label="Language"
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

<style>
  .lang-switch {
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 900;
  }
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.2rem 0.5rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-muted);
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    cursor: pointer;
    font-family: inherit;
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
  }
  .item:hover {
    background: var(--surface-2);
    color: var(--text);
  }
  .item.active {
    color: var(--accent);
  }
</style>
