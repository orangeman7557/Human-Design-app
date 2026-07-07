<script>
  // Birth-data entry form. The form starts empty.

  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Injected by Vite's `define` from package.json (see vite.config.js).
  const version = __APP_VERSION__;
  import CityAutocomplete from '$lib/components/CityAutocomplete.svelte';
  import DateField from '$lib/components/DateField.svelte';
  import About from '$lib/components/About.svelte';
  import ReportBug from '$lib/components/ReportBug.svelte';
  import { install, promptInstall } from '$lib/pwa/install.svelte.js';
  import { dialog } from '$lib/components/dialog.svelte.js';
  import { cityCountry } from '$lib/geo/place.js';
  import {
    listCharts,
    renameChart,
    deleteChart,
    exportCharts,
    importCharts,
    reorderCharts,
    setChartType,
    ensureBackupRestored
  } from '$lib/db/charts.js';
  import StorageInfo from '$lib/components/StorageInfo.svelte';
  import { computeChart } from '$lib/hd/chart.js';

  // ── SEO (Phase L, step 2) ─────────────────────────────────────────────
  // The home is prerendered (see +page.js), so these tags land in the real
  // static HTML that crawlers and social scrapers read. Absolute URLs use the
  // custom domain (Phase L, step 3). www redirects to the root at Cloudflare.
  const SITE_URL = 'https://hdchart.app';
  const SEO_TITLE = 'Human Design Chart — calcula tu carta gratis, sin registro';
  const SEO_DESC =
    'Calcula tu carta de Human Design gratis y sin registro: tipo, estrategia, autoridad, perfil, centros y canales, con un bodygraph interactivo.';
  const jsonLd =
    `<script type="application/ld+json">` +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Human Design Chart',
      url: `${SITE_URL}/`,
      description: SEO_DESC,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web',
      inLanguage: 'es',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      author: { '@type': 'Person', name: 'Javi G.O.' }
    }) +
    `<\/script>`;

  const TYPE_LABELS = {
    generator: 'Generador',
    'manifesting-generator': 'Generador Manifestante',
    projector: 'Proyector',
    manifestor: 'Manifestador',
    reflector: 'Reflector'
  };

  let name = $state('');
  let date = $state('');
  let time = $state('');

  /** @type {{ label: string, latitude: number, longitude: number, timezone: string } | null} */
  let place = $state(null);

  // Remounts CityAutocomplete on form clear (its free-text query is
  // internal state that a null `place` deliberately doesn't wipe).
  let formEpoch = $state(0);

  function clearForm() {
    name = '';
    date = '';
    time = '';
    place = null;
    unknownTime = false;
    sliderVal = 24;
    error = null;
    sessionStorage.removeItem('birthData');
    formEpoch++;
  }

  // From the About modal's "Manifestor" link (no drawer system on the home
  // page): open the author's own chart — a Manifestor — titled orangeman7557,
  // and ask the chart page to open the matching element drawer on arrival.
  function openAuthorChartWithInfo(kind, key) {
    const birth = {
      name: 'Javi G.O.',
      date: '1984-03-13',
      time: '09:30',
      timezone: 'Europe/Madrid',
      latitude: 40.4168,
      longitude: -3.7038,
      placeLabel: 'Madrid, Comunidad de Madrid, España'
    };
    sessionStorage.setItem('birthData', JSON.stringify(birth));
    sessionStorage.setItem('hd:openInfo', `${kind}:${key}`);
    goto('/chart');
  }

  // "instalar como app" link (top of the home). Chromium → native prompt;
  // iOS Safari → manual "Add to Home Screen" instructions. The link only shows
  // when install.mode is set (see install.svelte.js).
  async function onInstallClick() {
    if (install.mode === 'prompt') {
      await promptInstall();
    } else if (install.mode === 'ios') {
      await dialog.alert({
        title: 'Instalar como app',
        message:
          'Abre el menú de compartir del navegador y elige "Añadir a pantalla de inicio".'
      });
    }
  }

  let submitting = $state(false);
  /** @type {string | null} */
  let error = $state(null);

  // ── Unknown birth time (Phase 4) ──────────────────────────────────────
  // Checking the box disables manual time entry and reveals a 0-24h
  // slider (half-hour steps). The slider hour is written into `time`, so
  // submitting works unchanged; a live preview shows the resulting type.
  // Checking seeds the slider from any manually entered hour (nearest
  // half-hour); unchecking leaves the slider's hour in the time field.
  let unknownTime = $state(false);
  let sliderVal = $state(24); // half-hours → 12:00
  /** @type {HTMLInputElement | undefined} */
  let timeEl = $state();

  // Reads the checkbox from the event: onchange fires before bind:checked
  // has updated `unknownTime`. The hour is read from the state AND from the
  // live input as fallback: the browser's own form restoration (back/forward)
  // can repopulate the field without input events, leaving `time` empty while
  // the field visibly shows an hour (author repro, 2026-07-06). Single-digit
  // hours and trailing seconds are tolerated.
  function seedSliderFromTime(e) {
    if (!e.currentTarget.checked) return;
    const raw = /^\d{1,2}:\d{2}/.test(time) ? time : timeEl?.value || '';
    const m = /^(\d{1,2}):(\d{2})/.exec(raw);
    if (!m) return;
    if (raw !== time) time = `${m[1].padStart(2, '0')}:${m[2]}`;
    sliderVal = Math.min(47, Number(m[1]) * 2 + Math.round(Number(m[2]) / 30));
  }
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

    // The DateField segments are `required` (empty blocks natively), but a
    // filled-yet-impossible date (31/02) composes to '' — catch it here.
    if (!date) {
      error = 'Revisa la fecha de nacimiento: no es una fecha válida.';
      return;
    }

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

  onMount(() => {
    restoreLastBirth();
    refreshList();
  });

  // Coming back from the chart page, the form keeps the data of the last
  // chart that was on screen.
  function restoreLastBirth() {
    try {
      const b = JSON.parse(sessionStorage.getItem('birthData'));
      if (!b?.date) return;
      name = b.name ?? '';
      date = b.date;
      time = b.time ?? '';
      if (b.placeLabel && b.timezone) {
        place = {
          label: b.placeLabel,
          latitude: b.latitude,
          longitude: b.longitude,
          timezone: b.timezone
        };
      }
    } catch {
      // ignore malformed storage
    }
  }

  async function refreshList() {
    try {
      // If the browser purged the local DB, the cookie-vault restore must
      // land before listing (charts.js) — a no-op after the first await.
      await ensureBackupRestored();
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
    // The saved (possibly renamed) chart name wins over whatever name was
    // typed in the form before saving.
    sessionStorage.setItem('birthData', JSON.stringify({ ...c.birth, name: c.name }));
    goto('/chart');
  }

  async function renameSaved(c) {
    const name = await dialog.prompt({
      title: 'Renombrar carta',
      defaultValue: c.name,
      placeholder: 'Nombre de la carta',
      confirmLabel: 'Guardar'
    });
    if (name === null || !name.trim()) return;
    await renameChart(c.id, name.trim());
    await refreshList();
  }

  async function deleteSaved(c) {
    const ok = await dialog.confirm({
      title: 'Borrar carta',
      message: `¿Borrar la carta "${c.name}"? Esta acción no se puede deshacer.`,
      confirmLabel: 'Borrar',
      danger: true
    });
    if (!ok) return;
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
      const { imported, duplicates, invalid } = await importCharts(await file.text());
      await refreshList();
      const parts = [`${imported} carta(s) importada(s).`];
      if (duplicates) parts.push(`${duplicates} omitida(s) por estar ya guardada(s).`);
      if (invalid) parts.push(`${invalid} descartada(s) por datos incompletos.`);
      await dialog.alert({ message: parts.join(' ') });
    } catch (err) {
      listError = err instanceof Error ? err.message : String(err);
    } finally {
      e.target.value = '';
    }
  }

  // Same date shape as the chart subtitle ("13/03/1984, 09:30").
  function formatDate(c) {
    const [y, m, d] = (c.birth?.date ?? '').split('-');
    const date = d ? `${d}/${m}/${y}` : (c.birth?.date ?? '');
    const t = c.birth?.time ?? '';
    return [date, t].filter(Boolean).join(', ');
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

<svelte:head>
  <title>{SEO_TITLE}</title>
  <meta name="description" content={SEO_DESC} />
  <link rel="canonical" href="{SITE_URL}/" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Human Design Chart" />
  <meta property="og:title" content={SEO_TITLE} />
  <meta property="og:description" content={SEO_DESC} />
  <meta property="og:url" content="{SITE_URL}/" />
  <meta property="og:image" content="{SITE_URL}/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Human Design Chart" />
  <meta property="og:locale" content="es_ES" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={SEO_TITLE} />
  <meta name="twitter:description" content={SEO_DESC} />
  <meta name="twitter:image" content="{SITE_URL}/og-image.png" />

  {@html jsonLd}
</svelte:head>

<main>
  <header>
    <div class="brand">
      <h1>Human Design Chart</h1>
      <!-- The app icon doubles as the "instalar como app" affordance. -->
      <button class="app-icon" type="button" onclick={onInstallClick} aria-label="Instalar como app" title="Instalar como app">
        <img src="/favicon.svg" alt="" width="28" height="28" />
      </button>
    </div>
    <p class="tagline">Calcula tu carta de Diseño Humano — gratis y sin registro.</p>
  </header>

  <form onsubmit={submit}>
    <label>
      <span>Nombre</span>
      <input type="text" bind:value={name} autocomplete="off" />
    </label>

    <!-- Own day/month/year entry (DateField) instead of the native date
         input: Android's picker leads with a ~100-year scroll, and a birth
         date is typed, not picked. -->
    <div class="field">
      <span class="field-head"><span>Fecha de nacimiento</span></span>
      <!-- {#key}: same pattern as CityAutocomplete — half-typed segments
           compose to the same '' as a cleared value, so clearing the form
           remounts the field instead of trying to signal it. -->
      {#key formEpoch}
        <DateField bind:value={date} />
      {/key}
    </div>

    <label>
      <span>Lugar de nacimiento</span>
      {#key formEpoch}
        <CityAutocomplete bind:value={place} />
      {/key}
    </label>

    <div class="field">
      <span class="field-head">
        <span>Hora local de nacimiento</span>
      </span>
      {#if !unknownTime}
        <span class="dtwrap">
          <input type="time" bind:this={timeEl} bind:value={time} required aria-label="Hora local de nacimiento" />
          <span class="dt-value" class:muted={!time} aria-hidden="true">{time || '--:--'}</span>
        </span>
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
        <input type="checkbox" bind:checked={unknownTime} onchange={seedSliderFromTime} />
        Hora desconocida
      </label>
    </div>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <button type="submit" disabled={submitting}>
      {submitting ? 'Calculando…' : 'Calcular carta'}
    </button>

    <!-- onclickcapture: direct listener, also usable when the page is
         driven programmatically (delegated handlers need trusted events). -->
    <button type="button" class="clear-link" onclickcapture={clearForm}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" />
      </svg>
      Borrar formulario
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
              <span class="chart-meta">{formatDate(c)} · {cityCountry(c.birth?.placeLabel)}</span>
            </button>
            <button class="icon" onclick={() => renameSaved(c)} aria-label="Renombrar">✎</button>
            <button class="icon" onclick={() => deleteSaved(c)} aria-label="Borrar">✕</button>
          </li>
        {/each}
      </ul>
    {/if}

    <div class="saved-foot">
      <div class="local-note">
        <p>Las cartas se guardan en este dispositivo. <StorageInfo /></p>
      </div>
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
    {#if install.mode}
      <button class="install-link" type="button" onclick={onInstallClick}>instalar como app</button>
      <span aria-hidden="true">·</span>
    {/if}
    <ReportBug version={version} />
    <span aria-hidden="true">·</span>
    <a class="foot-link" href="/privacy">privacidad</a>
    <span aria-hidden="true">·</span>
    <About version={version} onElement={openAuthorChartWithInfo} />
  </footer>
</main>

<style>
  main {
    position: relative;
    max-width: 460px;
    margin: 0 auto;
    /* 1.75rem side air (author request 2026-07-03): fields and CTA breathe
       instead of running near the phone edge; only visible below max-width. */
    padding: 3rem 1.75rem 4rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  /* Title + app icon on one centred row. */
  .brand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    margin-bottom: 0.4rem;
  }
  h1 {
    font-size: clamp(1.6rem, 5vw, 2rem);
    font-weight: 500;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .app-icon {
    display: inline-flex;
    align-items: center;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    line-height: 0;
    border-radius: 7px;
  }
  .app-icon img {
    width: 1.7rem;
    height: 1.7rem;
    display: block;
    /* A subtle frame so the icon reads as an app tile (its own background is
       the page colour, so without a border it looks like a floating glyph). */
    border: 1px solid var(--border);
    border-radius: 7px;
  }
  .app-icon:hover img {
    border-color: var(--accent);
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
    min-width: 0;
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
  /* Full-width, shrinkable entry fields. iOS Safari otherwise sizes native
     date/time inputs (and any input without an explicit width) to their
     intrinsic width and, as flex items with min-width:auto, refuses to shrink
     them — so on a phone the date/time/place fields misalign and overflow the
     form to the right. Checkbox and range keep their own sizing.
     appearance:none + border-box strip the iOS UA sizing entirely: real
     devices still overflowed with width/min-width alone (betatester, jul
     2026); without native appearance iOS honours the authored width. */
  input:not([type='checkbox']):not([type='range']) {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
    /* Uniform height: without native appearance each input type picks its
       own; 2.75rem ≈ 44px, the iOS minimum tap-target size. */
    height: 2.75rem;
  }
  /* iOS renders date/time values in a shadow div that collapses to zero
     height when empty once appearance is stripped; keep a text line alive. */
  input::-webkit-date-and-time-value {
    min-height: 1.2em;
    text-align: inherit;
  }

  /* Wrapper for date/time inputs: anchors the mobile-only centred value
     overlay (.dt-value, hidden on desktop — see the media query). */
  .dtwrap {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .dtwrap input {
    width: 100%;
  }
  .dt-value {
    display: none;
  }

  .field {
    /* Anchor for the absolutely-positioned checkbox on desktop. */
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    min-width: 0;
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
    /* Native date/time widgets ignore text-align and the shadow-part
       hacks on Android Chrome, so on small screens the real value is
       painted transparent and our own centred overlay shows it instead.
       The input keeps the taps, so the native picker opens as always. */
    .dtwrap input {
      color: transparent;
    }
    .dt-value {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      color: var(--text);
      font-size: 1rem;
      text-transform: none;
      letter-spacing: normal;
    }
    .dt-value.muted {
      color: var(--text-muted);
      opacity: 0.7;
    }
    .slider-hint {
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
    width: 100%;
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
  /* Deliberately understated: a quiet escape hatch under the CTA, not a
     competing action. */
  .clear-link {
    align-self: center;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    margin-top: -0.25rem;
    background: none;
    border: none;
    padding: 0.2rem 0.4rem;
    font-family: inherit;
    font-size: 0.72rem;
    color: var(--text-muted);
    opacity: 0.6;
    cursor: pointer;
  }
  .clear-link:hover {
    opacity: 1;
    color: var(--text);
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
    /* Dim colour instead of opacity: the StorageInfo modal renders inside
       this container, and opacity would bleed into the whole subtree. */
    color: #6f6f76;
    font-size: 0.75rem;
    margin: 0;
  }
  .local-note p {
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

  /* Footer links ("instalar como app" · "acerca de"): the footer sets the
     size/colour; this just matches About's link. */
  .install-link {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  .install-link:hover {
    color: var(--text-muted);
  }

  /* Footer "privacidad" link: overrides the global accent-coloured anchor so it
     matches the muted "acerca de" / "notificar un fallo" siblings. */
  .foot-link {
    color: inherit;
    text-decoration: none;
  }
  .foot-link:hover {
    color: var(--text-muted);
  }

  footer {
    margin-top: 4rem;
    text-align: center;
    font-size: 0.8rem;
    /* Dim via colour, not opacity: opacity<1 makes the footer a stacking
       context and would render the About modal (a descendant) semi-transparent
       and trapped below the page. This colour matches the old muted-at-0.6 look. */
    color: #64646a;
  }
</style>
