<script>
  // Place-of-birth autocomplete.
  //
  // The component is bound to a `value` that is either `null` (no place
  // confirmed yet) or a fully resolved place object including the IANA
  // timezone derived from its coordinates. The parent form treats a `null`
  // value as a validation error on submit.

  import { searchPlaces } from '$lib/geo/geocoder.js';
  import { timezoneFor } from '$lib/geo/timezone.js';
  import { selectOnFocus } from './select-on-focus.js';

  /**
   * @typedef {Object} ResolvedPlace
   * @property {string} label
   * @property {number} latitude
   * @property {number} longitude
   * @property {string} timezone
   */

  let {
    /** @type {ResolvedPlace | null} */
    value = $bindable(null),
    placeholder = 'Madrid, Bogotá, Berlín, Nuevayol…'
  } = $props();

  // Free-text input. Independent from `value`: typing erases the previous
  // selection until the user picks a result.
  let query = $state(value?.label ?? '');

  // Keep the visible text in sync when the parent sets the place
  // programmatically (e.g. the hidden smoke-test pre-fill).
  $effect(() => {
    if (value && value.label !== query) query = value.label;
  });

  let results = $state(/** @type {{ label: string, latitude: number, longitude: number }[]} */ ([]));
  let loading = $state(false);
  let focused = $state(false);
  // Distinguishes "the service failed" from "no city matches" in the hint.
  let searchError = $state(false);
  // Keyboard-highlighted result (-1 = none); ArrowUp/Down move it, Enter picks it.
  let activeIndex = $state(-1);

  /** @type {AbortController | null} */
  let inflight = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let debounce = null;
  /** @type {HTMLInputElement | undefined} */
  let inputEl = $state();

  // Easter egg tied to the "Nuevayol" placeholder joke: typing it exactly offers
  // the two homes of the word — San Juan (where the Caribbean slang for New York
  // comes from) and New York itself. Timezone is resolved on pick, like any result.
  const EGG_PLACES = [
    { label: 'San Juan, Puerto Rico', latitude: 18.4663, longitude: -66.1057 },
    { label: 'Nueva York, Estados Unidos', latitude: 40.7128, longitude: -74.006 }
  ];

  function onInput() {
    // Typing invalidates the previous confirmed place.
    value = null;
    searchError = false;
    activeIndex = -1;

    if (debounce) clearTimeout(debounce);

    const trimmed = query.trim();

    if (trimmed.toLowerCase() === 'nuevayol') {
      if (inflight) inflight.abort();
      loading = false;
      results = EGG_PLACES;
      return;
    }

    if (trimmed.length < 3) {
      results = [];
      loading = false;
      if (inflight) inflight.abort();
      return;
    }

    debounce = setTimeout(async () => {
      if (inflight) inflight.abort();
      inflight = new AbortController();
      loading = true;
      try {
        results = await searchPlaces(trimmed, inflight.signal);
        searchError = false;
        activeIndex = -1;
      } catch (err) {
        if (err && err.name !== 'AbortError') {
          console.error('Place search failed', err);
          results = [];
          searchError = true;
        }
      } finally {
        loading = false;
      }
    }, 300);
  }

  function pick(p) {
    value = {
      label: p.label,
      latitude: p.latitude,
      longitude: p.longitude,
      timezone: timezoneFor(p.latitude, p.longitude)
    };
    query = p.label;
    results = [];
    activeIndex = -1;
    focused = false;
  }

  // Arrow keys walk the open suggestion list; Enter picks the highlighted one
  // (when none is highlighted, Enter falls through to the form as usual).
  function onKeydown(e) {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focused = true;
      activeIndex = (activeIndex + 1) % results.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focused = true;
      activeIndex = (activeIndex - 1 + results.length) % results.length;
    } else if (e.key === 'Enter' && focused && activeIndex >= 0) {
      e.preventDefault();
      pick(results[activeIndex]);
    } else if (e.key === 'Escape' && focused) {
      focused = false;
      activeIndex = -1;
    }
  }

  function onBlur() {
    // Delay closing so a click on a result still registers before the
    // dropdown disappears.
    setTimeout(() => {
      focused = false;
    }, 120);
  }

  // Clear button (shown while editing): wipe the field and any confirmed
  // place, then keep focus so the user can type a fresh search.
  function clear() {
    query = '';
    value = null;
    results = [];
    searchError = false;
    activeIndex = -1;
    if (inflight) inflight.abort();
    inputEl?.focus();
  }
</script>

<div class="autocomplete">
  <input
    type="text"
    bind:this={inputEl}
    bind:value={query}
    use:selectOnFocus
    oninput={onInput}
    onkeydown={onKeydown}
    onfocus={() => (focused = true)}
    onblur={onBlur}
    {placeholder}
    autocomplete="off"
    spellcheck="false"
    role="combobox"
    aria-autocomplete="list"
    aria-expanded={focused && results.length > 0}
    aria-controls="city-results"
    aria-activedescendant={activeIndex >= 0 ? `city-opt-${activeIndex}` : undefined}
  />

  {#if focused && query.length > 0}
    <!-- Clear button while editing: mousedown is swallowed so pressing it
         doesn't blur the input before the click clears + refocuses. -->
    <button
      type="button"
      class="clear-btn"
      onmousedown={(e) => e.preventDefault()}
      onclick={clear}
      aria-label="Borrar lugar"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </svg>
    </button>
  {:else if value}
    <svg
      class="ok-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--success)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-label="Lugar confirmado"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  {/if}

  <span class="hint" class:warn={!loading && (searchError || (query.length >= 3 && results.length === 0 && !value))}>
    {#if loading}
      Buscando…
    {:else if searchError}
      No se pudo buscar. Revisa tu conexión e inténtalo de nuevo.
    {:else if !value && query.length >= 3 && results.length === 0}
      Sin resultados
    {:else}
      &nbsp;
    {/if}
  </span>

  {#if focused && results.length > 0}
    <ul class="results" id="city-results" role="listbox" aria-label="Sugerencias de ciudad">
      {#each results as r, i}
        <li id={`city-opt-${i}`} role="option" aria-selected={i === activeIndex}>
          <button type="button" class:active={i === activeIndex} tabindex="-1" onclick={() => pick(r)}>{r.label}</button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .autocomplete {
    position: relative;
    min-width: 0;
  }
  input {
    width: 100%;
    min-width: 0;
    /* Same iOS hardening as the home form fields: strip the UA sizing so
       real devices honour the authored width, same 44px height (see
       +page.svelte). */
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
    height: 2.75rem;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.7rem 2.4rem 0.7rem 0.85rem;
    border-radius: var(--radius);
    font-size: 1rem;
    font-family: inherit;
    color-scheme: dark;
  }
  input:focus {
    outline: none;
    border-color: var(--accent);
  }
  /* Subtle in-field confirmation, mirroring the native date/time icons. */
  .ok-icon {
    position: absolute;
    right: 0.85rem;
    top: 0.95rem;
    pointer-events: none;
    opacity: 0.85;
  }
  /* Clear button, in the same right-hand slot as the check. */
  .clear-btn {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    border: none;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: 50%;
  }
  .clear-btn:hover,
  .clear-btn:focus-visible {
    color: var(--text);
    outline: none;
  }
  /* Absolutely positioned so the empty state doesn't add extra spacing
     between this field and the next one. */
  .hint {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    pointer-events: none;
  }
  .hint.warn {
    color: var(--danger);
  }

  .results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0.4rem 0 0;
    padding: 0.25rem 0;
    list-style: none;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    z-index: 10;
    max-height: 240px;
    overflow-y: auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
  .results li {
    margin: 0;
  }
  .results li button {
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    color: var(--text);
    font-family: inherit;
    font-size: 0.9rem;
    padding: 0.55rem 0.85rem;
    cursor: pointer;
  }
  .results li button:hover,
  .results li button.active {
    background: var(--surface);
    color: var(--accent);
  }
</style>
