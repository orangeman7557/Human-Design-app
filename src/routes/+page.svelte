<script>
  // Birth-data entry form.
  //
  // Pre-filled with orangeman7557's chart as the validation test case. The
  // `place` state carries pre-resolved latitude/longitude/timezone so the
  // form can be submitted as-is without going through the autocomplete on
  // first load.

  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import CityAutocomplete from '$lib/components/CityAutocomplete.svelte';
  import {
    listCharts,
    renameChart,
    deleteChart,
    exportCharts,
    importCharts
  } from '$lib/db/charts.js';

  let name = $state('orangeman7557');
  let date = $state('1984-03-13');
  let time = $state('09:30');

  /** @type {{ label: string, latitude: number, longitude: number, timezone: string } | null} */
  let place = $state({
    label: 'Madrid, Comunidad de Madrid, España',
    latitude: 40.4168,
    longitude: -3.7038,
    timezone: 'Europe/Madrid'
  });

  let submitting = $state(false);
  /** @type {string | null} */
  let error = $state(null);

  function submit(e) {
    e.preventDefault();
    error = null;

    if (!place) {
      error = 'Selecciona una ciudad de la lista de sugerencias.';
      return;
    }

    submitting = true;
    try {
      const birth = {
        name: name.trim() || null,
        date,
        time,
        timezone: place.timezone,
        latitude: place.latitude,
        longitude: place.longitude,
        placeLabel: place.label
      };
      sessionStorage.setItem('birthData', JSON.stringify(birth));
      goto('/chart');
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      submitting = false;
    }
  }

  /** @type {import('$lib/db/charts.js').SavedChart[]} */
  let savedCharts = $state([]);
  /** @type {string | null} */
  let listError = $state(null);
  /** @type {HTMLInputElement | undefined} */
  let importInput = $state();

  onMount(refreshList);

  async function refreshList() {
    try {
      savedCharts = await listCharts();
    } catch (e) {
      listError = e instanceof Error ? e.message : String(e);
    }
  }

  function openSaved(c) {
    sessionStorage.setItem('birthData', JSON.stringify(c.birth));
    goto('/chart');
  }

  async function renameSaved(c) {
    const name = window.prompt('Nuevo nombre:', c.name);
    if (name === null || !name.trim()) return;
    await renameChart(c.id, name.trim());
    await refreshList();
  }

  async function deleteSaved(c) {
    if (!window.confirm(`¿Borrar la carta "${c.name}"?`)) return;
    await deleteChart(c.id);
    await refreshList();
  }

  async function doExport() {
    const json = await exportCharts();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'human-design-charts.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function doImport(e) {
    listError = null;
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const count = await importCharts(await file.text());
      await refreshList();
      window.alert(`${count} carta(s) importada(s).`);
    } catch (err) {
      listError = err instanceof Error ? err.message : String(err);
    } finally {
      e.target.value = '';
    }
  }

  function formatDate(c) {
    const d = c.birth?.date ?? '';
    const t = c.birth?.time ?? '';
    return `${d} ${t}`.trim();
  }
</script>

<main>
  <header>
    <h1>Human Design Chart</h1>
    <p class="tagline">Introduce tus datos de nacimiento.</p>
  </header>

  <form onsubmit={submit}>
    <label>
      <span>Nombre</span>
      <input type="text" bind:value={name} placeholder="Opcional" autocomplete="off" />
    </label>

    <label>
      <span>Fecha de nacimiento</span>
      <input type="date" bind:value={date} required />
    </label>

    <label>
      <span>Hora local de nacimiento</span>
      <input type="time" bind:value={time} required />
    </label>

    <label>
      <span>Lugar de nacimiento</span>
      <CityAutocomplete bind:value={place} />
    </label>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <button type="submit" disabled={submitting}>
      {submitting ? 'Calculando…' : 'Calcular carta'}
    </button>
  </form>

  <section class="saved">
    <div class="saved-head">
      <h2>Cartas guardadas</h2>
      <div class="io">
        <button
          class="io-btn"
          onclick={doExport}
          disabled={savedCharts.length === 0}
          title="Exportar JSON"
          aria-label="Exportar JSON"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v12" /><path d="m8 11 4 4 4-4" /><path d="M4 21h16" />
          </svg>
        </button>
        <button
          class="io-btn"
          onclick={() => importInput?.click()}
          title="Importar JSON"
          aria-label="Importar JSON"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 15V3" /><path d="m8 7 4-4 4 4" /><path d="M4 21h16" />
          </svg>
        </button>
        <input
          type="file"
          accept="application/json,.json"
          bind:this={importInput}
          onchange={doImport}
          hidden
        />
      </div>
    </div>

    {#if listError}
      <p class="error">{listError}</p>
    {/if}

    {#if savedCharts.length === 0}
      <p class="empty">No hay cartas guardadas todavía.</p>
    {:else}
      <ul>
        {#each savedCharts as c (c.id)}
          <li>
            <button class="chart-open" onclick={() => openSaved(c)}>
              <span class="chart-name">{c.name}</span>
              <span class="chart-meta">{formatDate(c)} · {c.birth?.placeLabel ?? ''}</span>
            </button>
            <button class="icon" onclick={() => renameSaved(c)} aria-label="Renombrar">✎</button>
            <button class="icon" onclick={() => deleteSaved(c)} aria-label="Borrar">✕</button>
          </li>
        {/each}
      </ul>
    {/if}

  </section>

  <footer>
    <small>v0.1.0 · source-available · free for noncommercial use · Built with AI assistance</small>
  </footer>
</main>

<style>
  main {
    max-width: 460px;
    margin: 0 auto;
    padding: 3rem 1.25rem 4rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  h1 {
    font-size: clamp(1.6rem, 5vw, 2rem);
    font-weight: 500;
    margin: 0 0 0.4rem;
    letter-spacing: -0.01em;
  }
  .tagline {
    color: var(--text-muted);
    margin: 0;
    font-size: 0.9rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  label span {
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.72rem;
  }
  input {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.7rem 0.85rem;
    border-radius: var(--radius);
    font-size: 1rem;
    font-family: inherit;
    color-scheme: dark;
  }
  input:focus {
    outline: none;
    border-color: var(--accent);
  }

  button[type='submit'] {
    margin-top: 1rem;
    background: var(--accent);
    color: #1a1408;
    border: none;
    padding: 0.85rem 1rem;
    border-radius: var(--radius);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
  }
  button[type='submit']:disabled {
    opacity: 0.6;
    cursor: progress;
  }

  .error {
    color: var(--danger);
    font-size: 0.9rem;
    margin: 0;
  }

  .saved {
    margin-top: 3rem;
  }
  .saved-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  .saved h2 {
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin: 0;
  }
  .io-btn {
    display: grid;
    place-items: center;
    width: 1.9rem;
    height: 1.9rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text-muted);
    cursor: pointer;
  }
  .io-btn:hover:not(:disabled) {
    color: var(--text);
    border-color: var(--accent);
  }
  .io-btn:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .empty {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin: 0;
  }
  .saved ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .saved li {
    display: flex;
    align-items: stretch;
    gap: 0.4rem;
  }
  .chart-open {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    text-align: left;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    padding: 0.6rem 0.85rem;
    font-family: inherit;
    cursor: pointer;
  }
  .chart-open:hover {
    border-color: var(--accent);
  }
  .chart-name {
    font-size: 0.95rem;
    font-weight: 500;
  }
  .chart-meta {
    font-size: 0.78rem;
    color: var(--text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icon {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-muted);
    border-radius: var(--radius);
    width: 2.4rem;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .icon:hover {
    color: var(--text);
    border-color: var(--accent);
  }
  .io {
    display: flex;
    gap: 0.4rem;
  }

  footer {
    margin-top: 4rem;
    text-align: center;
    color: var(--text-muted);
    opacity: 0.6;
  }
</style>
