<script>
  // Place-of-birth autocomplete.
  //
  // The component is bound to a `value` that is either `null` (no place
  // confirmed yet) or a fully resolved place object including the IANA
  // timezone derived from its coordinates. The parent form treats a `null`
  // value as a validation error on submit.

  import { searchPlaces } from '$lib/geo/nominatim.js';
  import { timezoneFor } from '$lib/geo/timezone.js';

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
    placeholder = 'Madrid, Cuenca, Bogotá…'
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

  /** @type {AbortController | null} */
  let inflight = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let debounce = null;

  function onInput() {
    // Typing invalidates the previous confirmed place.
    value = null;

    if (debounce) clearTimeout(debounce);

    const trimmed = query.trim();
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
      } catch (err) {
        if (err && err.name !== 'AbortError') {
          console.error('Nominatim search failed', err);
          results = [];
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
    focused = false;
  }

  function onBlur() {
    // Delay closing so a click on a result still registers before the
    // dropdown disappears.
    setTimeout(() => {
      focused = false;
    }, 120);
  }
</script>

<div class="autocomplete">
  <input
    type="text"
    bind:value={query}
    oninput={onInput}
    onfocus={() => (focused = true)}
    onblur={onBlur}
    {placeholder}
    autocomplete="off"
    spellcheck="false"
  />

  {#if value}
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

  <span class="hint" class:warn={query.length >= 3 && !loading && results.length === 0 && !value}>
    {#if loading}
      Buscando…
    {:else if !value && query.length >= 3 && results.length === 0}
      Sin resultados
    {:else}
      &nbsp;
    {/if}
  </span>

  {#if focused && results.length > 0}
    <ul class="results">
      {#each results as r}
        <li>
          <button type="button" onclick={() => pick(r)}>{r.label}</button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .autocomplete {
    position: relative;
  }
  input {
    width: 100%;
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
  .results li button:hover {
    background: var(--surface);
    color: var(--accent);
  }
</style>
