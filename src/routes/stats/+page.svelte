<!-- Private usage dashboard (2026-08). One screen, dark theme, no chrome of its
     own. Reads /api/stats, which only answers on staging hosts — on production
     this page loads but the fetch 404s and it shows "unavailable". Reachable
     from the tiny chart icon on the staging badge (see routes/+layout.svelte).
     Aggregate numbers only; nothing here identifies anyone. -->
<script>
  import { onMount } from 'svelte';

  let data = $state(null);
  let error = $state('');
  let loading = $state(true);
  let env = $state('prod'); // 'prod' | 'staging'

  async function load() {
    loading = true;
    error = '';
    try {
      const res = await fetch(`/api/stats?env=${env}`, { headers: { accept: 'application/json' } });
      if (!res.ok) {
        error = res.status === 404 ? 'unavailable' : `error ${res.status}`;
        data = null;
        return;
      }
      const json = await res.json();
      if (json.error === 'no-kv') {
        error = 'no-kv';
        data = null;
        return;
      }
      data = json;
    } catch {
      error = 'network';
      data = null;
    } finally {
      loading = false;
    }
  }

  onMount(load);

  function setEnv(next) {
    if (env === next) return;
    env = next;
    load();
  }

  const ratio = $derived(data ? data.chartsPerDevice.toFixed(2) : '0');

  // Writes gauge — the binding KV free-tier limit is 1000 writes/day.
  const writePct = $derived(data ? Math.min(100, (data.writesToday / data.writeLimit) * 100) : 0);
  const writeLevel = $derived(writePct >= 90 ? 'red' : writePct >= 70 ? 'amber' : 'ok');

  const maxBar = $derived(
    data && data.series.length ? Math.max(1, ...data.series.map((d) => d.chart)) : 1
  );
  const fmt = (n) => (n ?? 0).toLocaleString('es-ES');
</script>

<svelte:head>
  <title>stats</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
  <header>
    <h1>Uso — <span class="env-name">{env === 'staging' ? 'staging (prueba)' : 'producción'}</span></h1>
    <div class="toggle" role="group" aria-label="Fuente de datos">
      <button class:active={env === 'prod'} onclick={() => setEnv('prod')}>producción</button>
      <button class:active={env === 'staging'} onclick={() => setEnv('staging')}>staging</button>
    </div>
  </header>

  {#if loading}
    <p class="muted">Cargando…</p>
  {:else if error === 'unavailable'}
    <p class="muted">El panel solo responde en el host de staging. Ábrelo en <code>staging.hdchart.app/stats</code>.</p>
  {:else if error === 'no-kv'}
    <p class="muted">El namespace KV <code>STATS</code> aún no está enlazado en este Worker.</p>
  {:else if error}
    <p class="muted">No se pudieron cargar los datos ({error}).</p>
  {:else if data}
    <section class="big">
      <div class="stat"><span class="num">{fmt(data.devices)}</span><span class="lbl">dispositivos</span></div>
      <div class="stat"><span class="num">{fmt(data.charts)}</span><span class="lbl">cartas</span></div>
      <div class="stat"><span class="num">{ratio}</span><span class="lbl">cartas / dispositivo</span></div>
    </section>

    <section class="card">
      <div class="card-head"><span>Cartas · últimos {data.series.length} días</span></div>
      {#if data.series.length}
        <div class="spark" aria-hidden="true">
          {#each data.series as d}
            <div class="bar" style="height:{Math.max(3, (d.chart / maxBar) * 100)}%" title="{d.date}: {d.chart}"></div>
          {/each}
        </div>
      {:else}
        <p class="muted small">Sin datos todavía.</p>
      {/if}
    </section>

    <section class="grid">
      <div class="card">
        <div class="card-head"><span>Recurrencia (dispositivos que…)</span></div>
        <ul class="rows">
          <li><span>≥ 2 cartas</span><b>{fmt(data.milestones.m2)}</b></li>
          <li><span>≥ 3 cartas</span><b>{fmt(data.milestones.m3)}</b></li>
          <li><span>≥ 5 cartas</span><b>{fmt(data.milestones.m5)}</b></li>
          <li><span>≥ 10 cartas</span><b>{fmt(data.milestones.m10)}</b></li>
        </ul>
      </div>

      <div class="card">
        <div class="card-head"><span>Otros</span></div>
        <ul class="rows">
          <li><span>Aperturas</span><b>{fmt(data.totals.open)}</b></li>
          <li><span>Guardadas</span><b>{fmt(data.totals.save)}</b></li>
          <li><span>Instalaciones (PWA)</span><b>{fmt(data.installs)}</b></li>
          <li><span>Informe abierto</span><b>{fmt(data.totals.report)}</b></li>
          <li><span>Compartir imagen</span><b>{fmt(data.totals.share)}</b></li>
          <li><span>Enlace compartible</span><b>{fmt(data.totals.sharelink)}</b></li>
          <li><span>Handoff a IA</span><b>{fmt(data.totals.ai)}</b></li>
          <li><span>Hora desconocida</span><b>{fmt(data.totals.notime)}</b></li>
        </ul>
      </div>
    </section>

    <section class="card lang-row">
      <span>Idioma</span>
      <span class="chips">
        <span class="chip">es · {fmt(data.langs.es)}</span>
        <span class="chip">en · {fmt(data.langs.en)}</span>
      </span>
    </section>

    <section class="card gauge {writeLevel}">
      <div class="gauge-top">
        <span>Escrituras KV hoy</span>
        <b>{fmt(data.writesToday)} / {fmt(data.writeLimit)}</b>
      </div>
      <div class="track"><div class="fill" style="width:{writePct}%"></div></div>
      <p class="muted small">
        Límite del plan gratuito, compartido por toda la cuenta (también el contador «amor»).
        {#if writeLevel === 'red'}<b class="warn">⚠ Cerca del límite.</b>{:else if writeLevel === 'amber'}<b class="warn">Vigila el margen.</b>{/if}
      </p>
    </section>

    <p class="muted small foot">Actualizado {new Date(data.generatedAt).toLocaleString('es-ES')}</p>
  {/if}
</main>

<style>
  main {
    max-width: 640px;
    margin: 0 auto;
    padding: 2.5rem 1.25rem 3rem;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }
  h1 {
    font-size: 1.15rem;
    font-weight: 500;
    margin: 0;
    color: var(--text);
  }
  .env-name {
    color: var(--accent);
  }
  .toggle {
    display: inline-flex;
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }
  .toggle button {
    background: var(--surface);
    color: var(--text-muted);
    border: none;
    padding: 0.3rem 0.7rem;
    font-size: 0.78rem;
    cursor: pointer;
  }
  .toggle button.active {
    background: var(--accent-soft);
    color: var(--accent);
  }
  .big {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .stat {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1rem 0.75rem;
    text-align: center;
  }
  .num {
    display: block;
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--text);
    line-height: 1.1;
  }
  .lbl {
    display: block;
    margin-top: 0.35rem;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.9rem 1rem;
    margin-bottom: 1rem;
  }
  .card-head {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: 0.7rem;
  }
  .spark {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 64px;
  }
  .bar {
    flex: 1;
    min-width: 2px;
    background: var(--accent);
    border-radius: 2px 2px 0 0;
    opacity: 0.85;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .rows {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .rows li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.28rem 0;
    font-size: 0.88rem;
    color: var(--text-muted);
    border-top: 1px solid var(--border);
  }
  .rows li:first-child {
    border-top: none;
  }
  .rows b {
    color: var(--text);
    font-variant-numeric: tabular-nums;
  }
  .lang-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
  }
  .chips {
    display: inline-flex;
    gap: 0.4rem;
  }
  .chip {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.2rem 0.55rem;
    color: var(--text);
    letter-spacing: 0;
    text-transform: none;
  }
  .gauge-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.88rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }
  .gauge-top b {
    color: var(--text);
    font-variant-numeric: tabular-nums;
  }
  .track {
    height: 8px;
    border-radius: 5px;
    background: var(--surface-2);
    overflow: hidden;
  }
  .fill {
    height: 100%;
    background: var(--success, #6ec48a);
    transition: width 0.3s ease;
  }
  .gauge.amber .fill {
    background: var(--accent);
  }
  .gauge.red .fill {
    background: var(--danger);
  }
  .warn {
    color: var(--danger);
  }
  .gauge.amber .warn {
    color: var(--accent);
  }
  .muted {
    color: var(--text-muted);
  }
  .small {
    font-size: 0.78rem;
  }
  .foot {
    margin-top: 1.5rem;
    text-align: center;
  }
  @media (max-width: 480px) {
    .big,
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
