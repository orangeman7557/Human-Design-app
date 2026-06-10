<script>
  import { onMount } from 'svelte';
  import { computeChart } from '$lib/hd/chart.js';
  import { CENTERS, PLANETS } from '$lib/hd/constants.js';
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

  const TYPE_LABELS = {
    manifestor: 'Manifestor',
    generator: 'Generator',
    'manifesting-generator': 'Manifesting Generator',
    projector: 'Projector',
    reflector: 'Reflector'
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
    <h1>Tu carta</h1>
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
    <Bodygraph {chart} />

    <section class="summary">
      <div class="card">
        <span class="label">Tipo</span>
        <span class="value">{TYPE_LABELS[chart.type] ?? chart.type}</span>
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
    </section>

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

    <section>
      <h2>Puertas activas ({chart.activeGates.length})</h2>
      <div class="chips small">
        {#each chart.activeGates as g}
          <span class="chip on">{g}</span>
        {/each}
      </div>
    </section>

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
              <td class="planet">{PLANET_LABELS[p]}</td>
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

  .summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.6rem;
    margin-bottom: 1rem;
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.75rem 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .label {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .value {
    font-size: 1rem;
    color: var(--text);
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
