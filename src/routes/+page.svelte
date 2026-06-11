<script>
  // Birth-data entry form.
  //
  // The form starts empty. orangeman7557's chart (the validation test case)
  // is behind a hidden shortcut: clicking the "r" of "Chart" in the title
  // pre-fills the form, with place carrying pre-resolved
  // latitude/longitude/timezone so it submits without the autocomplete.

  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import CityAutocomplete from '$lib/components/CityAutocomplete.svelte';
  import {
    listCharts,
    renameChart,
    deleteChart,
    exportCharts,
    importCharts,
    reorderCharts,
    setChartType
  } from '$lib/db/charts.js';
  import { computeChart } from '$lib/hd/chart.js';

  const TYPE_LABELS = {
    generator: 'Generator',
    'manifesting-generator': 'Manifesting Generator',
    projector: 'Projector',
    manifestor: 'Manifestor',
    reflector: 'Reflector'
  };

  let name = $state('');
  let date = $state('');
  let time = $state('');

  /** @type {{ label: string, latitude: number, longitude: number, timezone: string } | null} */
  let place = $state(null);

  // Hidden smoke-test shortcut (the "r" of "Chart" in the title).
  function fillAuthorData() {
    name = 'orangeman7557';
    date = '1984-03-13';
    time = '09:30';
    place = {
      label: 'Madrid, Comunidad de Madrid, España',
      latitude: 40.4168,
      longitude: -3.7038,
      timezone: 'Europe/Madrid'
    };
  }

  let submitting = $state(false);
  /** @type {string | null} */
  let error = $state(null);

  // ── Unknown birth time (Phase 4) ──────────────────────────────────────
  // Checking the box disables manual time entry and reveals a 0-24h
  // slider (half-hour steps). The slider hour is written into `time`, so
  // submitting works unchanged; a live preview shows the resulting type.
  let unknownTime = $state(false);
  let sliderVal = $state(24); // half-hours → 12:00
  /** @type {string | null} */
  let previewType = $state(null);
  let previewBusy = $state(false);
  let previewSeq = 0;

  const sliderTime = $derived(
    `${String(Math.floor(sliderVal / 2)).padStart(2, '0')}:${sliderVal % 2 === 0 ? '00' : '30'}`
  );

  const TYPE_ABBR = {
    generator: 'G',
    'manifesting-generator': 'MG',
    projector: 'P',
    manifestor: 'M',
    reflector: 'R'
  };

  // Map of the whole day: which type results from each half-hour. Computed
  // once per date/place (48 chart computations) and rendered as a segmented
  // band over the slider, like classic HD birth-time rectifiers.
  /** @type {{ type: string | null, span: number, from: number }[]} */
  let typeBands = $state([]);
  let bandsBusy = $state(false);
  let bandSeq = 0;

  $effect(() => {
    if (!unknownTime || !place) {
      typeBands = [];
      bandsBusy = false;
      return;
    }
    const d = date;
    const pl = place;
    const seq = ++bandSeq;
    bandsBusy = true;
    typeBands = [];
    (async () => {
      const types = [];
      for (let v = 0; v <= 47; v++) {
        const t = `${String(Math.floor(v / 2)).padStart(2, '0')}:${v % 2 === 0 ? '00' : '30'}`;
        try {
          const { type } = await computeChart({
            name: null,
            date: d,
            time: t,
            timezone: pl.timezone,
            latitude: pl.latitude,
            longitude: pl.longitude
          });
          types.push(type);
        } catch {
          types.push(null);
        }
        if (seq !== bandSeq) return;
      }
      const bands = [];
      for (let i = 0; i < types.length; i++) {
        const last = bands[bands.length - 1];
        if (last && last.type === types[i]) last.span++;
        else bands.push({ type: types[i], span: 1, from: i });
      }
      typeBands = bands;
      bandsBusy = false;
    })();
  });

  $effect(() => {
    if (unknownTime) time = sliderTime;
  });

  $effect(() => {
    if (!unknownTime || !place) {
      previewType = null;
      previewBusy = false;
      return;
    }
    const birth = {
      name: null,
      date,
      time: sliderTime,
      timezone: place.timezone,
      latitude: place.latitude,
      longitude: place.longitude
    };
    const seq = ++previewSeq;
    previewBusy = true;
    const t = setTimeout(async () => {
      try {
        const { type } = await computeChart(birth);
        if (seq === previewSeq) previewType = type;
      } catch {
        if (seq === previewSeq) previewType = null;
      } finally {
        if (seq === previewSeq) previewBusy = false;
      }
    }, 150);
    return () => clearTimeout(t);
  });

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
      backfillTypes();
    } catch (e) {
      listError = e instanceof Error ? e.message : String(e);
    }
  }

  // Charts saved before 3.E (or imported without it) lack the denormalised
  // type — compute it once and persist it.
  async function backfillTypes() {
    for (const c of savedCharts) {
      if (c.type) continue;
      try {
        const { type } = await computeChart(c.birth);
        await setChartType(c.id, type);
        c.type = type;
      } catch {
        // leave untyped; the chart page will surface any real data problem
      }
    }
  }

  // Drag & drop reordering (HTML5 DnD; list order persisted on drop).
  /** @type {number | null} */
  let dragIndex = $state(null);

  function dragStart(i) {
    dragIndex = i;
  }
  function dragOver(e, i) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    const arr = [...savedCharts];
    const [moved] = arr.splice(dragIndex, 1);
    arr.splice(i, 0, moved);
    savedCharts = arr;
    dragIndex = i;
  }
  async function dragEnd() {
    if (dragIndex === null) return;
    dragIndex = null;
    await reorderCharts(savedCharts.map((c) => c.id));
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

  // Touch has no hover, so there a tap toggles the tooltip via the global
  // .tip-open class (see app.css). Buttons are excluded: on them the tap
  // already runs the action and the tooltip would linger on top of it.
  function tipTap(e) {
    const touch = window.matchMedia('(pointer: coarse)').matches;
    const el = touch ? e.target.closest('[data-tip]:not(button)') : null;
    for (const open of document.querySelectorAll('.tip-open')) {
      if (open !== el) open.classList.remove('tip-open');
    }
    el?.classList.toggle('tip-open');
  }
</script>

<svelte:window onclick={tipTap} />

<main>
  <header>
    <!-- The "r" of "Chart" is the hidden smoke-test shortcut. -->
    <h1>Human Design Cha<span class="rr" role="presentation" onclick={fillAuthorData}>r</span>t</h1>
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
      <span>Lugar de nacimiento</span>
      <CityAutocomplete bind:value={place} />
    </label>

    <div class="field">
      <span class="field-head">
        <span>Hora local de nacimiento</span>
      </span>
      {#if !unknownTime}
        <input type="time" bind:value={time} required aria-label="Hora local de nacimiento" />
      {:else}
        <div class="slider-block">
          <p class="slider-hint">Elige una hora aproximada para calcular la carta:</p>
          <input
            type="range"
            min="0"
            max="47"
            step="1"
            bind:value={sliderVal}
            aria-label="Hora estimada"
          />
          {#if typeBands.length}
            <div class="bands" aria-hidden="true">
              {#each typeBands as b}
                {@const label = TYPE_LABELS[b.type] ?? '—'}
                {@const fits = label.length <= b.span * 1.3}
                <span
                  class="band"
                  class:active={sliderVal >= b.from && sliderVal < b.from + b.span}
                  style={`flex-grow:${b.span}`}
                  data-tip={fits ? undefined : label}
                >{fits ? label : (TYPE_ABBR[b.type] ?? '')}</span>
              {/each}
            </div>
          {:else if bandsBusy}
            <p class="bands-busy">Calculando los tipos del día…</p>
          {/if}
          <div class="slider-scale" aria-hidden="true">
            <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span>
          </div>
          <div class="slider-info">
            <span class="slider-time">{sliderTime}</span>
            <span class="slider-type">
              {#if !place}
                Selecciona una ciudad
              {:else if previewBusy}
                …
              {:else}
                {TYPE_LABELS[previewType] ?? '—'}
              {/if}
            </span>
          </div>
        </div>
      {/if}
      <label class="check">
        <input type="checkbox" bind:checked={unknownTime} />
        Hora desconocida
      </label>
    </div>

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
    </div>

    {#if listError}
      <p class="error">{listError}</p>
    {/if}

    {#if savedCharts.length === 0}
      <p class="empty">No hay cartas guardadas todavía.</p>
    {:else}
      <ul>
        {#each savedCharts as c, i (c.id)}
          <li
            draggable="true"
            class:dragging={dragIndex === i}
            ondragstart={() => dragStart(i)}
            ondragover={(e) => dragOver(e, i)}
            ondragend={dragEnd}
          >
            <span class="drag" aria-hidden="true">⠿</span>
            <button class="chart-open" onclick={() => openSaved(c)}>
              <span class="chart-name">
                {c.name}
                {#if c.type}
                  <span class="chart-type">{TYPE_LABELS[c.type] ?? c.type}</span>
                {/if}
              </span>
              <span class="chart-meta">{formatDate(c)} · {c.birth?.placeLabel ?? ''}</span>
            </button>
            <button class="icon" onclick={() => renameSaved(c)} aria-label="Renombrar">✎</button>
            <button class="icon" onclick={() => deleteSaved(c)} aria-label="Borrar">✕</button>
          </li>
        {/each}
      </ul>
    {/if}

    <div class="saved-foot">
      <p class="local-note">Las cartas se guardan solo en este dispositivo.</p>
      <div class="io">
        <button
          class="io-btn"
          onclick={doExport}
          disabled={savedCharts.length === 0}
          data-tip="Exportar cartas"
          aria-label="Exportar cartas"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v12" /><path d="m8 11 4 4 4-4" /><path d="M4 21h16" />
          </svg>
        </button>
        <button
          class="io-btn"
          onclick={() => importInput?.click()}
          data-tip="Importar cartas"
          aria-label="Importar cartas"
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
  input:disabled {
    opacity: 0.45;
  }

  .field {
    /* Anchor for the absolutely-positioned checkbox on desktop. */
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  .field-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.72rem;
  }
  .check {
    /* Desktop: in the label row, top right (its classic spot). */
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.35rem;
    text-transform: none;
    letter-spacing: normal;
    font-size: 0.78rem;
    cursor: pointer;
    white-space: nowrap;
  }
  .check input[type='checkbox'] {
    accent-color: var(--accent);
    margin: 0;
    cursor: pointer;
  }

  /* Mobile: labels, field text and the checkbox centred; the checkbox
     moves below the time field, reading as the alternative to filling
     it in. */
  @media (max-width: 520px) {
    label span,
    .field-head {
      text-align: center;
      justify-content: center;
    }
    form :global(input:not([type='checkbox']):not([type='range'])) {
      text-align: center;
    }
    .check {
      position: static;
      justify-content: center;
      margin-top: 0.15rem;
    }
  }

  .slider-block {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.7rem 0.85rem 0.55rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .slider-hint {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  /* overflow must stay visible so the [data-tip] tooltip isn't clipped;
     the rounded ends are applied per segment instead. */
  .bands {
    display: flex;
    width: 100%;
    height: 1.5rem;
    gap: 1px;
  }
  .band {
    flex-basis: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.68rem;
    color: var(--text-muted);
    background: var(--surface-2);
    min-width: 0;
    overflow: hidden;
  }
  .band:first-child {
    border-radius: 6px 0 0 6px;
  }
  .band:last-child {
    border-radius: 0 6px 6px 0;
  }
  .band[data-tip] {
    overflow: visible;
  }
  .band.active {
    background: var(--accent-soft);
    color: var(--accent);
    font-weight: 600;
  }
  .bands-busy {
    margin: 0;
    font-size: 0.72rem;
    color: var(--text-muted);
    opacity: 0.7;
  }
  .slider-scale {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: var(--text-muted);
    opacity: 0.8;
    margin-top: -0.3rem;
    font-variant-numeric: tabular-nums;
  }

  /* Instant tooltip (no native title delay). */
  [data-tip] {
    position: relative;
  }
  [data-tip]:hover::after {
    content: attr(data-tip);
    position: absolute;
    bottom: calc(100% + 7px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    font-size: 0.75rem;
    padding: 0.3rem 0.55rem;
    border-radius: 7px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 5;
  }
  .slider-block input[type='range'] {
    width: 100%;
    accent-color: var(--accent);
    padding: 0;
    margin: 0;
    background: none;
    border: none;
  }
  .slider-info {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .slider-time {
    font-size: 0.95rem;
    color: var(--text);
    font-variant-numeric: tabular-nums;
  }
  .slider-type {
    font-size: 0.85rem;
    color: var(--accent);
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
    margin-top: 2.75rem;
    border-top: 1px solid var(--border);
    padding-top: 1.75rem;
  }
  .saved li.dragging {
    opacity: 0.5;
  }
  .drag {
    align-self: center;
    color: var(--text-muted);
    opacity: 0.55;
    cursor: grab;
    font-size: 0.85rem;
    user-select: none;
  }
  .chart-type {
    color: var(--text-muted);
    font-weight: 400;
    font-size: 0.78rem;
    margin-left: 0.35rem;
  }
  .saved-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-top: 0.9rem;
  }
  .local-note {
    color: var(--text-muted);
    font-size: 0.75rem;
    opacity: 0.65;
    margin: 0;
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
