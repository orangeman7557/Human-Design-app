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
      await saveChart(name.trim() || suggested, $state.snapshot(birthData));
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

    <section class="top">
      <span class="label">Tipo</span>
      <div class="chips">
        {#each TYPES as t}
          <span class="chip" class:on={chart.type === t.key}>
            {t.label} <span class="pct">{t.pct}</span>
          </span>
        {/each}
      </div>
    </section>

    <section class="summary">
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
    </section>

    <div class="graph">
      <Bodygraph {chart} />
    </div>

    <section>
      <h2>Centros definidos</h2>
      <div class="chips">
        {#each CENTERS as c}
          <span class="chip" class:on={chart.definedCenters.includes(c)}>
            {CENTER_LABELS[c]}
          </span>
        {/each}
      </div>
    </section>

    <div class="cols">
      <section>
        <h2>Canales completos ({chart.activeChannels.length})</h2>
        {#if chart.activeChannels.length === 0}
          <p class="none">Ninguno</p>
        {:else}
          <ul class="channel-list">
            {#each chart.activeChannels as [g1, g2]}
              <li>
                <span class="pair">{g1}-{g2}</span>
                <span class="centers">
                  {CENTER_LABELS[CENTER_BY_GATE[g1]]}–{CENTER_LABELS[CENTER_BY_GATE[g2]]}
                </span>
              </li>
            {/each}
          </ul>
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
                class:on={!chart.definedCenters.includes(CENTER_BY_GATE[g])}
                class:soft={chart.definedCenters.includes(CENTER_BY_GATE[g])}
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
              <td>{chart.personality[p].gate}.{chart.personality[p].line}</td>
              <td>{chart.design[p].gate}.{chart.design[p].line}</td>
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
    margin: -1.4rem 0 1.5rem;
  }

  .top {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 0.9rem;
  }

  .summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.5rem 0.7rem;
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
    font-size: 0.9rem;
    color: var(--text);
  }

  /* ~8% narrower than the 720px container so the full graph fits one
     screen height more easily. */
  .graph {
    max-width: 660px;
    margin: 0 auto;
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
  .channel-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.9rem;
  }
  .pair {
    color: var(--accent);
    font-weight: 500;
  }
  .centers {
    color: var(--text-muted);
  }
  .chip.soft {
    opacity: 0.8;
    color: var(--text);
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
