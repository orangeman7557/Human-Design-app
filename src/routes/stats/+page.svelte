<!-- Private usage dashboard (2026-08). One screen, dark theme, no chrome of its
     own. Reads /api/stats, which only answers on staging hosts — on production
     this page loads but the fetch 404s and it shows "unavailable". Reachable
     from the tiny chart icon on the staging badge (see routes/+layout.svelte).
     Aggregate numbers only; nothing here identifies anyone. -->
<script>
  import { onMount } from 'svelte';
  import { DateTime } from 'luxon';

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

  const fmt = (n) => (n ?? 0).toLocaleString('es-ES');

  // Daily line chart: three series on one shared y-axis. They're all counts
  // per day in the same unit (new devices / opens / charts created), so a
  // single scale keeps them directly comparable — three axes would distort
  // that comparison rather than help it.
  const LINES = [
    { key: 'chart', label: 'cartas', color: 'var(--accent)' },
    { key: 'open', label: 'aperturas', color: '#6ec48a' },
    { key: 'device', label: 'dispositivos', color: '#e84672' }
  ];
  const CW = 640;
  const CH = 200;
  const PAD = { t: 14, r: 12, b: 24, l: 30 };
  const innerW = CW - PAD.l - PAD.r;
  const innerH = CH - PAD.t - PAD.b;

  // Time range: each one fixes how far back the window reaches and the unit the
  // daily rows are summed into, so a wider window doesn't turn into a hairball
  // of hundreds of points. 'todo' picks its unit from the history it finds.
  const RANGES = [
    { key: '1m', label: '1 mes', days: 30, unit: 'day' },
    { key: '3m', label: '3 meses', days: 91, unit: 'week' },
    { key: '1y', label: '1 año', days: 365, unit: 'month' },
    { key: 'all', label: 'todo', days: null, unit: 'auto' }
  ];
  const UNIT_NAME = { day: 'día', week: 'semana', month: 'mes', year: 'año' };
  let range = $state('1m');
  /** index into `buckets`, or null: the point the pointer is on */
  let hover = $state(null);

  function setRange(next) {
    range = next;
    hover = null;
  }

  // Dense buckets, zeros included: KV only holds a document for days with
  // traffic, so a chart built from the rows alone would silently close the gaps
  // and draw a quiet week as if it never happened.
  const buckets = $derived.by(() => {
    const rows = data?.series ?? [];
    if (!rows.length) return { unit: 'day', items: [] };

    const r = RANGES.find((x) => x.key === range) ?? RANGES[0];
    const today = DateTime.utc().startOf('day');
    const first = DateTime.fromISO(rows[0].date, { zone: 'utc' }).startOf('day');
    const start = r.days ? today.minus({ days: r.days - 1 }) : first;

    let unit = r.unit;
    if (unit === 'auto') {
      const months = today.diff(start, 'months').months;
      unit = months > 36 ? 'year' : months > 2 ? 'month' : 'day';
    }

    const step = { day: { days: 1 }, week: { weeks: 1 }, month: { months: 1 }, year: { years: 1 } }[unit];
    const items = [];
    const index = new Map();
    for (let t = start.startOf(unit); t <= today; t = t.plus(step)) {
      index.set(t.toISODate(), items.length);
      items.push({ at: t, chart: 0, open: 0, device: 0 });
    }

    for (const row of rows) {
      const d = DateTime.fromISO(row.date, { zone: 'utc' });
      if (d < start.startOf(unit) || d > today) continue;
      const i = index.get(d.startOf(unit).toISODate());
      if (i === undefined) continue;
      items[i].chart += row.chart;
      items[i].open += row.open;
      items[i].device += row.device;
    }
    return { unit, items };
  });

  const yMax = $derived(
    Math.max(1, ...buckets.items.flatMap((b) => [b.chart, b.open, b.device]))
  );

  const bx = (i) => {
    const n = buckets.items.length;
    return PAD.l + (n > 1 ? (i * innerW) / (n - 1) : innerW / 2);
  };
  const by = (v) => PAD.t + innerH - (v / yMax) * innerH;

  const coords = (key) => buckets.items.map((b, i) => ({ x: bx(i), y: by(b[key]) }));
  const asPoints = (key) => coords(key).map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  // Axis ticks: short. Months go by name, not number — "8/26" next to a "3/9"
  // day tick reads as another day/month.
  const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function tickLabel(at, unit) {
    if (unit === 'year') return String(at.year);
    if (unit === 'month') return `${MONTHS[at.month - 1]} ${String(at.year).slice(2)}`;
    return `${at.day}/${at.month}`;
  }
  function fullLabel(at, unit) {
    if (unit === 'year') return String(at.year);
    if (unit === 'month') return at.setLocale('es').toFormat('LLLL yyyy');
    if (unit === 'week') return `semana del ${at.day}/${at.month}/${at.year}`;
    return at.setLocale('es').toFormat('d LLL yyyy');
  }

  // At most ~6 ticks, always including the last bucket, so labels never collide.
  const xLabels = $derived.by(() => {
    const { items, unit } = buckets;
    const n = items.length;
    if (!n) return [];
    const stride = Math.max(1, Math.ceil(n / 6));
    const out = [];
    for (let i = n - 1; i >= 0; i -= stride) out.unshift({ x: bx(i), label: tickLabel(items[i].at, unit) });
    return out;
  });

  /** Pointer → nearest bucket. The SVG scales, so map client px through its box. */
  function pointAt(e) {
    const n = buckets.items.length;
    if (!n) return;
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * CW;
    const t = n > 1 ? (x - PAD.l) / innerW : 0;
    hover = Math.max(0, Math.min(n - 1, Math.round(t * (n - 1))));
  }

  // Touch destroys the pointer on lift, which fires pointerleave — so only a
  // mouse leaving clears the readout; a tap keeps it until the next tap.
  function onChartLeave(e) {
    if (e.pointerType === 'mouse') hover = null;
  }

  function onDocPointerDown(e) {
    if (hover !== null && !e.target.closest('.chart-wrap')) hover = null;
  }

  const hovered = $derived(hover !== null ? buckets.items[hover] : null);
  const headTitle = $derived.by(() => {
    const r = RANGES.find((x) => x.key === range) ?? RANGES[0];
    const per = `Uso por ${UNIT_NAME[buckets.unit]}`;
    return r.days ? `${per} · ${r.key === '1m' ? 'último mes' : r.label === '3 meses' ? 'últimos 3 meses' : 'último año'}` : `${per} · todo el historial`;
  });

  const OPEN_TIP =
    'Cada vez que se carga la app (una visita): incluye recargas y reaperturas. No es lo mismo que dispositivos, que cuenta cada navegador una sola vez.';
</script>

<svelte:window onpointerdown={onDocPointerDown} />

<svelte:head>
  <title>stats</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
  <header>
    <a class="back" href="/" aria-label="Volver a la home">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </a>
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
      <div class="card-head">
        <span>{headTitle}</span>
        <div class="toggle range" role="group" aria-label="Rango de tiempo">
          {#each RANGES as r}
            <button class:active={range === r.key} onclick={() => setRange(r.key)}>{r.label}</button>
          {/each}
        </div>
      </div>
      {#if buckets.items.length}
        <div class="chart-wrap">
          <svg
            class="chart"
            viewBox="0 0 {CW} {CH}"
            role="img"
            aria-label={`Uso por ${UNIT_NAME[buckets.unit]}: cartas, aperturas y dispositivos`}
            onpointermove={pointAt}
            onpointerdown={pointAt}
            onpointerleave={onChartLeave}
          >
            <line class="gridline" x1={PAD.l} y1={PAD.t} x2={CW - PAD.r} y2={PAD.t} />
            <line class="gridline" x1={PAD.l} y1={CH - PAD.b} x2={CW - PAD.r} y2={CH - PAD.b} />
            <text class="axis" x={PAD.l - 5} y={PAD.t + 4} text-anchor="end">{yMax}</text>
            <text class="axis" x={PAD.l - 5} y={CH - PAD.b} text-anchor="end">0</text>
            {#each xLabels as xl}
              <text class="axis" x={xl.x} y={CH - 7} text-anchor="middle">{xl.label}</text>
            {/each}
            {#if hover !== null}
              <line class="guide" x1={bx(hover)} y1={PAD.t} x2={bx(hover)} y2={CH - PAD.b} />
            {/if}
            {#each LINES as l}
              <polyline fill="none" stroke={l.color} stroke-width="2" stroke-linejoin="round" points={asPoints(l.key)} />
              {#each coords(l.key) as p, i}
                <circle cx={p.x} cy={p.y} r={hover === i ? 3.6 : 2.2} fill={l.color} />
              {/each}
            {/each}
          </svg>

          {#if hovered}
            <div
              class="readout"
              class:flip={bx(hover) > CW * 0.62}
              style="left:{(bx(hover) / CW) * 100}%"
            >
              <span class="ro-when">{fullLabel(hovered.at, buckets.unit)}</span>
              {#each LINES as l}
                <span class="ro-row">
                  <i style="background:{l.color}"></i>{l.label}<b>{fmt(hovered[l.key])}</b>
                </span>
              {/each}
            </div>
          {/if}
        </div>
        <span class="legend under">
          {#each LINES as l}
            <span class="lg"><i style="background:{l.color}"></i>{l.label}</span>
          {/each}
        </span>
      {:else}
        <p class="muted small">Sin datos todavía.</p>
      {/if}
    </section>

    <section class="grid">
      <div class="col">
        <div class="card">
          <div class="card-head"><span>Recurrencia (dispositivos que…)</span></div>
          <ul class="rows">
            <li><span>≥ 2 cartas</span><b>{fmt(data.milestones.m2)}</b></li>
            <li><span>≥ 3 cartas</span><b>{fmt(data.milestones.m3)}</b></li>
            <li><span>≥ 5 cartas</span><b>{fmt(data.milestones.m5)}</b></li>
            <li><span>≥ 10 cartas</span><b>{fmt(data.milestones.m10)}</b></li>
          </ul>
        </div>

        <div class="card lang-box">
          <div class="card-head">
            <span class="tip" data-tip="Aperturas contadas según el idioma activo en cada carga de la app.">Idioma <em>· aperturas</em></span>
          </div>
          <span class="chips">
            <span class="chip">es · {fmt(data.langs.es)}</span>
            <span class="chip">en · {fmt(data.langs.en)}</span>
          </span>
        </div>
      </div>

      <div class="card">
        <div class="card-head"><span>Otros</span></div>
        <ul class="rows">
          <li><span class="tip" data-tip={OPEN_TIP}>Aperturas</span><b>{fmt(data.totals.open)}</b></li>
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
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }
  .back {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
  }
  .back:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
  header .toggle {
    margin-left: auto;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: 0.7rem;
  }
  .legend {
    display: inline-flex;
    gap: 0.7rem;
    text-transform: none;
    letter-spacing: 0;
  }
  .lg {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }
  .lg i {
    width: 10px;
    height: 3px;
    border-radius: 2px;
    display: inline-block;
  }
  /* Range selector: the env toggle's chrome, one size down. */
  .toggle.range button {
    padding: 0.24rem 0.5rem;
    font-size: 0.72rem;
    text-transform: none;
    letter-spacing: 0;
  }
  .chart-wrap {
    position: relative;
  }
  .chart {
    width: 100%;
    height: auto;
    display: block;
    /* Reading a point is a tap or a drag along the line; the page must still
       scroll vertically under the finger. */
    touch-action: pan-y;
  }
  .chart .guide {
    stroke: var(--text-muted);
    stroke-width: 1;
    stroke-dasharray: 3 3;
    opacity: 0.6;
  }
  /* Readout: anchored to the hovered point, flipping to its left half-way
     across so it never runs off the card. */
  .readout {
    position: absolute;
    top: 0;
    display: grid;
    gap: 0.1rem;
    min-width: 8.5rem;
    padding: 0.45rem 0.55rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 8px 24px #0009;
    font-size: 0.74rem;
    color: var(--text);
    pointer-events: none;
    transform: translateX(10px);
    z-index: 5;
  }
  .readout.flip {
    transform: translateX(-100%) translateX(-10px);
  }
  .ro-when {
    color: var(--text-muted);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.15rem;
  }
  .ro-row {
    display: grid;
    grid-template-columns: 10px 1fr auto;
    align-items: center;
    gap: 0.4rem;
    font-variant-numeric: tabular-nums;
  }
  .ro-row i {
    width: 10px;
    height: 3px;
    border-radius: 2px;
  }
  .ro-row b {
    font-weight: 600;
  }
  .legend.under {
    margin-top: 0.5rem;
    font-size: 0.72rem;
    color: var(--text-muted);
  }
  /* On a phone the plot is only ~100 px tall, so the readout gives back what
     it can: less padding, tighter minimum, one step down in size. */
  @media (max-width: 520px) {
    .readout {
      min-width: 7.4rem;
      padding: 0.35rem 0.45rem;
      font-size: 0.7rem;
    }
    .readout .ro-when {
      font-size: 0.62rem;
    }
  }
  .chart .gridline {
    stroke: var(--border);
    stroke-width: 1;
  }
  .chart .axis {
    fill: var(--text-muted);
    font-size: 11px;
  }
  .tip {
    position: relative;
    text-decoration: underline dotted var(--text-muted);
    text-underline-offset: 3px;
    cursor: help;
  }
  .tip em {
    font-style: normal;
    color: #82828a;
    text-decoration: none;
  }
  /* Own hover tooltip — the native `title` only appears after a long delay. */
  .tip::after {
    content: attr(data-tip);
    position: absolute;
    left: 0;
    top: 100%;
    margin-top: 6px;
    width: max-content;
    max-width: 240px;
    padding: 0.5rem 0.6rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 0.75rem;
    line-height: 1.4;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    color: var(--text);
    white-space: normal;
    opacity: 0;
    transform: translateY(-2px);
    pointer-events: none;
    transition: opacity 0.1s ease, transform 0.1s ease;
    z-index: 50;
  }
  .tip:hover::after,
  .tip:focus-visible::after {
    opacity: 1;
    transform: translateY(0);
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: stretch;
  }
  .col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  /* Inside the two-column grid, cards use the grid `gap`, not their own
     bottom margin — the leftover margin would stop a card from stretching to
     the row height (the "Otros" column ends up short of the left column). */
  .grid .card {
    margin-bottom: 0;
  }
  /* The language box fills the leftover height so the recurrence + language
     column ends level with the taller "Otros" column. */
  .lang-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.7rem;
  }
  .lang-box .card-head {
    margin-bottom: 0;
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
