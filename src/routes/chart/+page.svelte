<script>
  import { onMount } from 'svelte';
  import { computeChart } from '$lib/hd/chart.js';
  import { CENTERS, PLANETS, CENTER_BY_GATE } from '$lib/hd/constants.js';
  import { saveChart } from '$lib/db/charts.js';
  import Bodygraph from '$lib/components/Bodygraph.svelte';

  // Etiquetas humanas. En la próxima iteración esto vivirá en i18n.
  const CENTER_LABELS = {
    head: 'Cabeza',
    ajna: 'Ajna',
    throat: 'Garganta',
    g: 'G',
    heart: 'Corazón',
    sacral: 'Sacral',
    spleen: 'Bazo',
    solarPlexus: 'Plexo Solar',
    root: 'Raíz'
  };

  const PLANET_LABELS = {
    sun: 'Sol',
    earth: 'Tierra',
    moon: 'Luna',
    northNode: 'Nodo Norte',
    southNode: 'Nodo Sur',
    mercury: 'Mercurio',
    venus: 'Venus',
    mars: 'Marte',
    jupiter: 'Júpiter',
    saturn: 'Saturno',
    uranus: 'Urano',
    neptune: 'Neptuno',
    pluto: 'Plutón'
  };

  // Ordered by estimated share of the population.
  const TYPES = [
    { key: 'generator', label: 'Generator', pct: '37%' },
    { key: 'manifesting-generator', label: 'Manifesting Generator', pct: '33%' },
    { key: 'projector', label: 'Projector', pct: '20%' },
    { key: 'manifestor', label: 'Manifestor', pct: '9%' },
    { key: 'reflector', label: 'Reflector', pct: '1%' }
  ];

  const PLANET_SYMBOLS = {
    sun: '☉',
    earth: '⊕',
    moon: '☽',
    northNode: '☊',
    southNode: '☋',
    mercury: '☿',
    venus: '♀',
    mars: '♂',
    jupiter: '♃',
    saturn: '♄',
    uranus: '♅',
    neptune: '♆',
    pluto: '♇'
  };

  const STRATEGY_LABELS = {
    'inform-before-acting': 'Informar antes de actuar',
    respond: 'Responder',
    'respond-then-inform': 'Responder y luego informar',
    'wait-for-invitation': 'Esperar la invitación',
    'wait-lunar-cycle': 'Esperar un ciclo lunar'
  };

  const AUTHORITY_LABELS = {
    emotional: 'Plexo Solar (emocional)',
    sacral: 'Sacral',
    splenic: 'Bazo (intuición)',
    ego: 'Ego (corazón)',
    'self-projected': 'Autoproyectada (G-Garganta)',
    mental: 'Mental (sounding board)',
    lunar: 'Lunar'
  };

  const DEFINITION_LABELS = {
    'no-definition': 'Sin definición',
    single: 'Definición única',
    split: 'Definición split',
    'triple-split': 'Definición triple split',
    'quad-split': 'Definición cuádruple split'
  };

  /** @type {any} */
  let chart = $state(null);
  /** @type {string | null} */
  let error = $state(null);
  let loading = $state(true);
  /** @type {Object | null} */
  let birthData = $state(null);
  let saved = $state(false);
  /** @type {string | null} */
  let saveError = $state(null);

  // Hanging gates: active gates that don't complete any channel.
  const hangingGates = $derived.by(() => {
    if (!chart) return [];
    const inChannel = new Set(chart.activeChannels.flat());
    return chart.activeGates.filter((g) => !inChannel.has(g));
  });

  // Hover interlinking: one hover source at a time (a centre chip or SVG
  // centre, a channel chip, or a hanging-gate chip). Everything else —
  // graph emphasis, chip focus/dim states, activation pills — derives
  // from it.
  /** @type {{ kind: 'center', center: string, gates: number[] }
   *        | { kind: 'channel', gates: number[] }
   *        | { kind: 'gate', gates: number[] }
   *        | null} */
  let hover = $state(null);
  let hoverTimer;

  function setHover(h) {
    clearTimeout(hoverTimer);
    hover = h;
  }
  function tapCenter(c) {
    setHover({ kind: 'center', center: c, gates: [] });
    // Touch devices get no mouseleave; auto-clear after a moment.
    hoverTimer = setTimeout(() => (hover = null), 2500);
  }

  // What the bodygraph emphasises for each hover kind:
  //   centre → only the centre; channel → channel + its two centres;
  //   gate → its centre + the gate marker.
  const graphHighlight = $derived.by(() => {
    if (!hover) return { centers: [], gates: [], channels: [] };
    if (hover.kind === 'center') return { centers: [hover.center], gates: [], channels: [] };
    const centers = [...new Set(hover.gates.map((g) => CENTER_BY_GATE[g]))];
    if (hover.kind === 'channel') {
      return { centers, gates: hover.gates, channels: [hover.gates.join('-')] };
    }
    return { centers, gates: hover.gates, channels: [] };
  });
  const hoverCenters = $derived(new Set(graphHighlight.centers));

  /** Chip relation for centre hovers: is this gate's centre the hovered one? */
  function relatedToHoverCenter(...gates) {
    return hover?.kind === 'center' && gates.some((g) => CENTER_BY_GATE[g] === hover.center);
  }

  function formatBirth(b) {
    const [y, m, d] = (b.date ?? '').split('-');
    const date = d ? `${d}/${m}/${y}` : b.date;
    const parts = (b.placeLabel ?? '').split(',').map((s) => s.trim());
    const place =
      parts.length > 1 ? `${parts[0]}, ${parts[parts.length - 1]}` : parts[0];
    return [`${date}, ${b.time}`, place].filter(Boolean).join(' · ');
  }

  async function save() {
    if (!birthData || saved) return;
    saveError = null;
    const suggested = birthData.name || birthData.placeLabel || 'Sin nombre';
    const name = window.prompt('Nombre para esta carta:', suggested);
    if (name === null) return;
    try {
      // $state.snapshot strips the Svelte reactivity proxy; IndexedDB
      // structured clone fails on proxied objects.
      await saveChart(name.trim() || suggested, $state.snapshot(birthData), chart?.type);
      saved = true;
    } catch (e) {
      saveError = e instanceof Error ? e.message : String(e);
    }
  }

  onMount(async () => {
    try {
      // Recogemos los datos guardados por la página del formulario.
      const raw = sessionStorage.getItem('birthData');
      if (!raw) {
        error = 'No hay datos de nacimiento. Vuelve a la página inicial y rellena el formulario.';
        loading = false;
        return;
      }
      const birth = JSON.parse(raw);
      birthData = birth;
      chart = await computeChart(birth);
    } catch (e) {
      console.error(e);
      error = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  });

  function back() {
    history.back();
  }
</script>

<main>
  <header>
    <button class="back" onclick={back} aria-label="Volver">←</button>
    <h1>{birthData?.name?.trim() || 'Tu carta'}</h1>
    {#if chart}
      <button class="save" onclick={save} disabled={saved}>
        {saved ? 'Guardada ✓' : 'Guardar carta'}
      </button>
    {/if}
  </header>

  {#if saveError}
    <p class="status error">No se pudo guardar: {saveError}</p>
  {/if}

  {#if loading}
    <p class="status">Calculando…</p>
  {:else if error}
    <p class="status error">Error: {error}</p>
  {:else if chart}
    {#if birthData}
      <p class="birth">{formatBirth(birthData)}</p>
    {/if}

    <div class="graph">
      <div class="overlay left">
        <div class="card">
          <span class="label">Tipo</span>
          <div class="type-list">
            {#each TYPES as t}
              <span class="tchip" class:on={chart.type === t.key}>
                {t.label}
                <span class="pct" data-tip={`representan el ${t.pct} de la población`}>{t.pct}</span>
              </span>
            {/each}
          </div>
        </div>
        <div class="card">
          <span class="label">Estrategia</span>
          <span class="value">{STRATEGY_LABELS[chart.strategy] ?? chart.strategy}</span>
        </div>
        <div class="card">
          <span class="label">Autoridad</span>
          <span class="value">{AUTHORITY_LABELS[chart.authority] ?? chart.authority}</span>
        </div>
        <div class="card">
          <span class="label">Perfil</span>
          <span class="value">{chart.profile}</span>
        </div>
        <div class="card">
          <span class="label">Definición</span>
          <span class="value">{DEFINITION_LABELS[chart.definition] ?? chart.definition}</span>
        </div>
      </div>

      <div class="overlay right">
        <button
          class="png-btn"
          disabled
          data-tip="Exportar (próximamente)"
          aria-label="Exportar (próximamente)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </button>
      </div>

      <Bodygraph
        {chart}
        highlight={graphHighlight}
        onCenterHover={(c) => setHover(c ? { kind: 'center', center: c, gates: [] } : null)}
      />
    </div>

    <section>
      <h2>Centros definidos ({chart.definedCenters.length})</h2>
      <div class="chips">
        {#each CENTERS as c}
          <button
            class="cc"
            class:on={chart.definedCenters.includes(c)}
            class:focus={hoverCenters.has(c)}
            class:dimmed={hover && hover.kind !== 'center' && !hoverCenters.has(c)}
            onmouseenter={() => setHover({ kind: 'center', center: c, gates: [] })}
            onmouseleave={() => setHover(null)}
            onclick={() => tapCenter(c)}
          >
            {CENTER_LABELS[c]}
          </button>
        {/each}
      </div>
    </section>

    <div class="cols">
      <section>
        <h2>Canales completos ({chart.activeChannels.length})</h2>
        {#if chart.activeChannels.length === 0}
          <p class="none">Ninguno</p>
        {:else}
          <div class="chips small">
            {#each chart.activeChannels as [g1, g2]}
              <span
                class="chip on"
                role="presentation"
                class:focus={relatedToHoverCenter(g1, g2)}
                onmouseenter={() => setHover({ kind: 'channel', gates: [g1, g2] })}
                onmouseleave={() => setHover(null)}
              >
                {g1}-{g2}
              </span>
            {/each}
          </div>
        {/if}
      </section>

      <section>
        <h2>Puertas colgantes ({hangingGates.length})</h2>
        {#if hangingGates.length === 0}
          <p class="none">Ninguna</p>
        {:else}
          <div class="chips small">
            {#each hangingGates as g}
              <span
                class="chip"
                class:on={chart.definedCenters.includes(CENTER_BY_GATE[g])}
                class:soft={!chart.definedCenters.includes(CENTER_BY_GATE[g])}
                role="presentation"
                class:focus={relatedToHoverCenter(g)}
                onmouseenter={() => setHover({ kind: 'gate', gates: [g] })}
                onmouseleave={() => setHover(null)}
              >
                {g}
              </span>
            {/each}
          </div>
        {/if}
      </section>
    </div>

    <section>
      <h2>Activaciones</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Personality</th>
            <th>Design</th>
          </tr>
        </thead>
        <tbody>
          {#each PLANETS as p}
            <tr>
              <td class="planet">
                <span class="psym">{PLANET_SYMBOLS[p]}</span>{PLANET_LABELS[p]}
              </td>
              <td>
                <span class="act" class:hl={hover?.gates.includes(chart.personality[p].gate)}>
                  {chart.personality[p].gate}.{chart.personality[p].line}
                </span>
              </td>
              <td>
                <span class="act" class:hl={hover?.gates.includes(chart.design[p].gate)}>
                  {chart.design[p].gate}.{chart.design[p].line}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  {/if}
</main>

<style>
  main {
    max-width: 720px;
    margin: 0 auto;
    padding: 1.5rem 1.25rem 4rem;
  }
  header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .back {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
  }
  .save {
    margin-left: auto;
    background: var(--accent);
    color: #1a1408;
    border: none;
    padding: 0.55rem 0.9rem;
    border-radius: var(--radius);
    font-size: 0.85rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
  }
  .save:disabled {
    background: var(--surface-2);
    color: var(--text-muted);
    cursor: default;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
  }
  h2 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-muted);
    margin: 2rem 0 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.8rem;
  }
  .status {
    color: var(--text-muted);
    padding: 1rem;
    text-align: center;
  }
  .error {
    color: var(--danger);
  }

  .birth {
    color: var(--text-muted);
    font-size: 0.85rem;
    /* Left-aligned with the title text: back button (2.25rem) + gap (1rem). */
    margin: -1.4rem 0 1.5rem 3.25rem;
  }

  .type-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    margin-top: 0.2rem;
  }
  .tchip {
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface-2);
    color: var(--text-muted);
    font-size: 0.7rem;
    padding: 0.12rem 0.55rem;
    opacity: 0.6;
    white-space: nowrap;
  }
  .tchip.on {
    background: var(--accent);
    border-color: var(--accent);
    color: #1a1408;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 0.3rem 0.75rem;
    opacity: 1;
  }
  .tchip .pct {
    cursor: help;
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
    font-weight: 400;
    padding: 0.3rem 0.55rem;
    border-radius: 7px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 5;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.45rem 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  .label {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .value {
    font-size: 0.85rem;
    color: var(--text);
  }

  /* ~8% narrower than the 720px container so the full graph fits one
     screen height more easily. The top corners of the graph are empty,
     so the info cards / centres list overlay there (3.E). */
  .graph {
    position: relative;
    max-width: 660px;
    margin: 0 auto;
  }
  .overlay.left {
    position: absolute;
    top: 0;
    left: 0;
    width: 192px;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    z-index: 1;
  }
  /* Push the graph slightly right so the wider info cards breathe. */
  @media (min-width: 680px) {
    .graph > :global(.bodygraph-wrap) {
      transform: translateX(46px);
    }
  }
  .overlay.right {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    align-items: flex-end;
    z-index: 1;
  }
  .png-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text-muted);
  }
  .png-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .cc {
    font-family: inherit;
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-muted);
    opacity: 0.45;
    cursor: pointer;
    transition: opacity 120ms, border-color 120ms;
  }
  .cc.on {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--accent-soft);
    opacity: 1;
  }
  /* Focused centre chips mirror the graph: white for undefined centres,
     amber only for defined ones. */
  .cc.focus {
    opacity: 1;
    border-color: var(--text);
    color: var(--text);
  }
  .cc.on.focus {
    border-color: var(--accent);
    background: var(--accent);
    color: #1a1408;
    font-weight: 600;
  }
  .cc.dimmed {
    opacity: 0.18;
  }

  /* Channel / hanging-gate chips related to the hovered centre. */
  .cols .chip.focus {
    box-shadow: 0 0 0 1.5px var(--accent);
  }
  .cols .chip.soft.focus {
    box-shadow: 0 0 0 1.5px var(--text-muted);
  }
  @media (max-width: 679px) {
    .overlay.left {
      position: static;
      width: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .overlay.left .card:first-child {
      grid-column: 1 / -1;
    }
    .overlay.right {
      position: static;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 0.75rem;
    }
  }

  .none {
    color: var(--text-muted);
    font-size: 0.85rem;
    opacity: 0.7;
    margin: 0;
  }

  .pct {
    font-size: 0.7em;
    opacity: 0.75;
  }

  .cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 1.5rem;
    align-items: start;
  }
  @media (max-width: 540px) {
    .cols {
      grid-template-columns: 1fr;
    }
  }
  .chip.soft {
    opacity: 0.8;
    color: var(--text);
  }

  .act {
    display: inline-block;
    padding: 0.1rem 0.45rem;
    margin: -0.1rem -0.45rem;
    border: 1px solid transparent;
    border-radius: 999px;
  }
  .act.hl {
    color: var(--accent);
    font-weight: 600;
    border-color: var(--accent);
    background: var(--accent-soft);
  }

  .psym {
    display: inline-block;
    width: 1.3em;
    opacity: 0.8;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .chip {
    padding: 0.3rem 0.7rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text-muted);
    font-size: 0.85rem;
    background: var(--surface);
    opacity: 0.45;
  }
  .chip.on {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--accent-soft);
    opacity: 1;
  }
  .chips.small .chip {
    padding: 0.2rem 0.55rem;
    font-size: 0.8rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }
  thead th {
    text-align: left;
    color: var(--text-muted);
    font-weight: 500;
    padding: 0.4rem 0.6rem;
    border-bottom: 1px solid var(--border);
  }
  tbody td {
    padding: 0.4rem 0.6rem;
    border-bottom: 1px solid var(--border);
  }
  .planet {
    color: var(--text-muted);
  }
</style>
