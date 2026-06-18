<script>
  import { onMount, tick } from 'svelte';

  // Injected by Vite's `define` from package.json (see vite.config.js).
  const version = __APP_VERSION__;
  import { computeChart } from '$lib/hd/chart.js';
  import { CENTERS, PLANETS, CENTER_BY_GATE, CHANNELS } from '$lib/hd/constants.js';
  import { toBlob } from 'html-to-image';
  import { saveChart } from '$lib/db/charts.js';
  import Bodygraph from '$lib/components/Bodygraph.svelte';
  import ElementInfo from '$lib/components/ElementInfo.svelte';
  import InfoDot from '$lib/components/InfoDot.svelte';
  import About from '$lib/components/About.svelte';
  import { getElementInfo, getProfileInfo, getGateInfo, getChannelInfo, getConceptInfo, getActivationWeight } from '$lib/hd/content/index.js';
  import { buildPrompts } from '$lib/hd/prompts.js';

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

  // Activations table shows the first 5 bodies by default (Sun/Earth/Moon +
  // both Nodes), so the nodes are visible without expanding.
  let showAllPlanets = $state(false);

  // Phase 6.A/6.B — element info panels. The info "i" appears on hover
  // (desktop) or tap (touch). Two levels coexist: a *card* "i" explains the
  // concept (what a Type, a Strategy, the Centres… are), and a *chip/value*
  // "i" explains the concrete element (this chart's type, the "split"
  // definition, the Sacral centre…). Both open the same reusable panel.
  // The panel is a *stack* of elements (Phase 6.D): opening from a chip/title
  // starts a fresh stack of depth 1; an in-text link inside the panel pushes
  // the linked element on top (a back arrow pops it). One ElementInfo renders
  // the top of the stack.
  /** @type {{ category: string, kind: string, key: string, info: any, prompts: any }[]} */
  let infoStack = $state([]);
  const infoOpen = $derived(infoStack.length > 0);
  const infoTop = $derived(infoStack[infoStack.length - 1] ?? null);
  const infoOrigin = $derived(infoStack[0] ?? null);
  /** Which card reveals its concept "i": 'type'|'strategy'|…|'center'|null. */
  let cardReveal = $state(null);
  /** Which inner element reveals its specific "i" ('type:generator',
   *  'strategy:value', 'center:head'…), or null. Only one of cardReveal /
   *  innerReveal is ever set, so exactly one "i" shows at a time. */
  let innerReveal = $state(null);

  const CATEGORY_BY_KIND = {
    type: 'Tipo', strategy: 'Estrategia', authority: 'Autoridad',
    profile: 'Perfil', definition: 'Definición', center: 'Centro',
    channel: 'Canal', gate: 'Puerta', activationCol: 'Activaciones',
    planet: 'Planeta'
  };

  /** Resolve an element's `{ title, paragraphs, list? }` by kind. */
  function resolveInfo(kind, key) {
    return kind === 'concept' ? getConceptInfo(key)
      : kind === 'profile' ? getProfileInfo(key)
      : kind === 'gate' ? getGateInfo(key)
      : kind === 'channel' ? getChannelInfo(key)
      : getElementInfo(kind, key);
  }

  function buildEntry(category, kind, key) {
    const info = resolveInfo(kind, key);
    if (!info) return null;
    return { category, kind, key, info, prompts: buildPrompts(kind, key, chart) };
  }

  /** Is the panel open *for* this element? Tracks the stack's origin so the
   *  originating chip stays marked even while a deeper element shows. */
  function infoIsOpen(kind, key) {
    return !!infoOrigin && infoOrigin.kind === kind && infoOrigin.key === key;
  }

  // Open from a chip/title: a fresh stack.
  function openInfoFor(category, kind, key) {
    const entry = buildEntry(category, kind, key);
    if (entry) infoStack = [entry];
  }
  // Follow an in-text link: push onto the current stack (or open fresh).
  function navigateInfo(kind, key) {
    const entry = buildEntry(CATEGORY_BY_KIND[kind] ?? '', kind, key);
    if (entry) infoStack = [...infoStack, entry];
  }
  function backInfo() {
    if (infoStack.length > 1) infoStack = infoStack.slice(0, -1);
  }
  function closeInfo() {
    infoStack = [];
    cardReveal = null;
    innerReveal = null;
  }
  // Tapping an activation (e.g. 30.3) opens its gate; stopPropagation keeps the
  // info-zone's cardClick from also toggling the section reveal.
  function actClick(e, gate) {
    e.stopPropagation();
    openInfoFor('Puerta', 'gate', String(gate));
  }

  // Desktop: one mouseover per card decides whether the pointer sits on an
  // inner element (data-inner-key → show only its specific "i") or on the card
  // body (show only the card's concept "i") — never both at once.
  function cardOver(e, id) {
    if (isTouch()) return;
    const inner = e.target.closest('[data-inner-key]');
    if (inner) { innerReveal = inner.dataset.innerKey; cardReveal = null; }
    else { cardReveal = id; innerReveal = null; }
  }
  function clearReveal() {
    if (!isTouch()) { cardReveal = null; innerReveal = null; }
  }

  // Touch: a tap toggles the reveal for whatever was tapped; tapping the "i"
  // opens the panel. stopPropagation keeps the window handler from clearing
  // the reveal underneath — nesting handlers under Svelte's event delegation
  // is unreliable, so everything routes through this one handler.
  function cardClick(e, id, extra) {
    const dot = e.target.closest('[data-info-key]');
    if (dot) {
      e.stopPropagation();
      openInfoFor(dot.dataset.infoCat, dot.dataset.infoKind, dot.dataset.infoKey);
      return;
    }
    extra?.(e);
    e.stopPropagation();
    if (!isTouch()) return;
    const inner = e.target.closest('[data-inner-key]');
    if (inner) {
      innerReveal = innerReveal === inner.dataset.innerKey ? null : inner.dataset.innerKey;
      cardReveal = null;
    } else {
      cardReveal = cardReveal === id ? null : id;
      innerReveal = null;
    }
  }

  // Centre chips are <button>, so their tap is handled here (pin + reveal); the
  // "i" sits as a sibling and opens via the card's click handler.
  function onCenterChipClick(e, c) {
    pin(e, { kind: 'center', center: c, gates: [] });
    if (isTouch()) {
      innerReveal = innerReveal === `center:${c}` ? null : `center:${c}`;
      cardReveal = null;
    }
  }

  // Hanging gates: active gates that don't complete any channel.
  const hangingGates = $derived.by(() => {
    if (!chart) return [];
    const inChannel = new Set(chart.activeChannels.flat());
    return chart.activeGates.filter((g) => !inChannel.has(g));
  });
  const hangingInDefined = $derived(
    hangingGates.filter((g) => chart?.definedCenters.includes(CENTER_BY_GATE[g])).length
  );

  // Hover interlinking: one hover source at a time (a centre chip or SVG
  // centre, a channel chip, or a hanging-gate chip). Everything else —
  // graph emphasis, chip focus/dim states, activation pills — derives
  // from it.
  /** @type {{ kind: 'center', center: string, gates: number[] }
   *        | { kind: 'channel', gates: number[] }
   *        | { kind: 'gate', gates: number[] }
   *        | { kind: 'definition', gates: number[] }
   *        | null} */
  let hover = $state(null);

  function isTouch() {
    return window.matchMedia('(pointer: coarse)').matches;
  }
  // Mouse hover only: on touch devices the browser fires synthetic
  // mouseenter together with the tap, which would cancel the tap's toggle,
  // so there everything goes through pin() instead.
  function setHover(h) {
    if (isTouch()) return;
    hover = h;
  }
  // Tap/click = pin: stays until the user clicks anywhere else (window
  // handler). On touch, tapping the same element again toggles it off.
  function pin(e, h) {
    e.stopPropagation();
    hover = isTouch() && sameHover(hover, h) ? null : h;
  }
  function sameHover(a, b) {
    return !!a && !!b && a.kind === b.kind && a.center === b.center &&
      String(a.gates) === String(b.gates);
  }

  // While a channel/gate chip is hovered or pinned, every other chip dims
  // so the selected one stands alone.
  function dimsAgainstChipHover(h) {
    return (hover?.kind === 'channel' || hover?.kind === 'gate') && !sameHover(hover, h);
  }

  // Touch has no hover, so there a tap toggles the tooltip via the global
  // .tip-open class (see app.css). Buttons are excluded: on them the tap
  // already runs the action and the tooltip would linger on top of it.
  function tipTap(e) {
    const el = isTouch() ? e.target.closest('[data-tip]:not(button)') : null;
    for (const open of document.querySelectorAll('.tip-open')) {
      if (open !== el) open.classList.remove('tip-open');
    }
    el?.classList.toggle('tip-open');
  }

  // Definition islands: connected groups of defined centres, plus the
  // hanging gates whose missing partner sits in a *different* island —
  // i.e. the gates that would bridge the split.
  const islandOf = $derived.by(() => {
    /** @type {Map<string, number>} */
    const map = new Map();
    if (!chart) return map;
    const adj = new Map(chart.definedCenters.map((c) => [c, []]));
    for (const [a, b] of chart.activeChannels) {
      adj.get(CENTER_BY_GATE[a])?.push(CENTER_BY_GATE[b]);
      adj.get(CENTER_BY_GATE[b])?.push(CENTER_BY_GATE[a]);
    }
    let island = 0;
    for (const start of chart.definedCenters) {
      if (map.has(start)) continue;
      const queue = [start];
      map.set(start, island);
      while (queue.length) {
        for (const next of adj.get(queue.pop()) ?? []) {
          if (!map.has(next)) {
            map.set(next, island);
            queue.push(next);
          }
        }
      }
      island++;
    }
    return map;
  });

  // The *inactive* partner gates that, if activated, would complete a
  // channel between two different islands — i.e. close the split. Shown
  // with a red ring on the bodygraph only (they're not in any chip list).
  const bridgeGates = $derived.by(() => {
    if (!chart) return [];
    const active = new Set(chart.activeGates);
    const out = new Set();
    for (const [a, b] of CHANNELS) {
      const aOn = active.has(a);
      const bOn = active.has(b);
      if (aOn === bOn) continue;
      const hanging = aOn ? a : b;
      const missing = aOn ? b : a;
      const ia = islandOf.get(CENTER_BY_GATE[hanging]);
      const ib = islandOf.get(CENTER_BY_GATE[missing]);
      if (ia !== undefined && ib !== undefined && ia !== ib) out.add(missing);
    }
    return [...out];
  });

  // What the bodygraph emphasises for each hover kind:
  //   centre → only the centre; channel → channel + its two centres;
  //   gate → its centre + the gate and its channel; definition → the
  //   islands (defined centres + active channels) with the bridging
  //   hanging gates ringed in red.
  const graphHighlight = $derived.by(() => {
    if (!hover) return { centers: [], gates: [], channels: [], alertGates: [] };
    if (hover.kind === 'center') {
      return { centers: [hover.center], gates: [], channels: [], alertGates: [] };
    }
    if (hover.kind === 'definition') {
      return {
        centers: [...chart.definedCenters],
        gates: chart.activeChannels.flat(),
        channels: chart.activeChannels.map((p) => p.join('-')),
        alertGates: bridgeGates
      };
    }
    const centers = [...new Set(hover.gates.map((g) => CENTER_BY_GATE[g]))];
    if (hover.kind === 'channel') {
      return { centers, gates: hover.gates, channels: [hover.gates.join('-')], alertGates: [] };
    }
    // gate: keep its own channel(s) lit so the active half isn't muted
    const channels = CHANNELS.filter((p) => p.includes(hover.gates[0])).map((p) => p.join('-'));
    return { centers, gates: hover.gates, channels, alertGates: [] };
  });
  const hoverCenters = $derived(new Set(graphHighlight.centers));

  /** Chip relation for centre hovers: is this gate's centre the hovered one? */
  function relatedToHoverCenter(...gates) {
    return hover?.kind === 'center' && gates.some((g) => CENTER_BY_GATE[g] === hover.center);
  }

  /** Activation highlight: the hovered gates, or every gate of a hovered centre. */
  function actHl(gate) {
    if (!hover) return false;
    if (hover.kind === 'center') return CENTER_BY_GATE[gate] === hover.center;
    return hover.gates.includes(gate);
  }

  function formatBirth(b) {
    const [y, m, d] = (b.date ?? '').split('-');
    const date = d ? `${d}/${m}/${y}` : b.date;
    const parts = (b.placeLabel ?? '').split(',').map((s) => s.trim());
    const place =
      parts.length > 1 ? `${parts[0]}, ${parts[parts.length - 1]}` : parts[0];
    return [`${date}, ${b.time}`, place].filter(Boolean).join(' · ');
  }

  // Share the whole chart view (bodygraph + summary + lists) as a PNG via
  // the native share sheet when available, downloading as fallback.
  /** @type {HTMLElement | undefined} */
  let captureEl = $state();
  let sharing = $state(false);

  // "nombre carta YYYY-MM-DD-HHMM-ciudad.png" — city = placeLabel up to
  // the first comma.
  function imageFileName() {
    const name = (birthData?.name || 'carta').trim();
    const time = (birthData?.time || '').replace(':', '');
    const place = (birthData?.placeLabel || '').split(',')[0].trim();
    const tail = [birthData?.date, time, place].filter(Boolean).join('-');
    return [name, tail].filter(Boolean).join(' ') + '.png';
  }

  async function captureBlob() {
    // Wait for the .capturing class (set via `sharing`) to reach the DOM
    // before cloning, so the export-only centring is picked up.
    await tick();
    // Capture <main> so the header (name + birth data) is part of the
    // image, filtering out interactive chrome (back button, action
    // buttons and their tooltips, footer). The clone is re-padded with a
    // small uniform margin: html-to-image copies the live node's computed
    // margin (the desktop `margin: 0 auto` centring becomes a ~190px
    // left shift that pushed everything off-canvas) and <main>'s own
    // padding (4rem bottom) plus the removed footer left a huge empty
    // band at the bottom.
    const pad = 12;
    const cs = getComputedStyle(captureEl);
    const contentW =
      captureEl.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const footer = captureEl.querySelector('footer');
    const fcs = footer ? getComputedStyle(footer) : null;
    const footerH = footer
      ? footer.offsetHeight + parseFloat(fcs.marginTop) + parseFloat(fcs.marginBottom)
      : 0;
    const contentH =
      captureEl.clientHeight -
      parseFloat(cs.paddingTop) -
      parseFloat(cs.paddingBottom) -
      footerH;
    const blob = await toBlob(captureEl, {
      backgroundColor: '#0b0b0d',
      pixelRatio: 2,
      width: contentW + pad * 2,
      height: contentH + pad * 2,
      style: {
        margin: '0',
        maxWidth: 'none',
        padding: `${pad}px`,
        width: `${contentW + pad * 2}px`,
        height: `${contentH + pad * 2}px`
      },
      filter: (node) =>
        !(
          node.classList?.contains('back') ||
          node.classList?.contains('actions') ||
          node.classList?.contains('img-actions') ||
          node.tagName === 'FOOTER'
        )
    });
    if (!blob) throw new Error('No se pudo generar la imagen.');
    return blob;
  }

  function downloadBlob(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = imageFileName();
    a.click();
    URL.revokeObjectURL(url);
  }

  async function share() {
    if (!captureEl || sharing) return;
    sharing = true;
    try {
      const blob = await captureBlob();
      const file = new File([blob], imageFileName(), { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Carta Human Design' });
      } else {
        // No share sheet available (typical on desktop): just download.
        downloadBlob(blob);
      }
    } catch (e) {
      if (e?.name !== 'AbortError') {
        saveError = e instanceof Error ? e.message : String(e);
      }
    } finally {
      sharing = false;
    }
  }

  async function download() {
    if (!captureEl || sharing) return;
    sharing = true;
    try {
      downloadBlob(await captureBlob());
    } catch (e) {
      saveError = e instanceof Error ? e.message : String(e);
    } finally {
      sharing = false;
    }
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

{#snippet imgButtons()}
  <button
    class="img-btn"
    onclick={share}
    disabled={sharing}
    data-tip={sharing ? 'Generando imagen…' : 'Compartir'}
    aria-label="Compartir carta"
  >
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  </button>
  <button
    class="img-btn"
    onclick={download}
    disabled={sharing}
    data-tip={sharing ? 'Generando imagen…' : 'Descargar imagen'}
    aria-label="Descargar imagen"
  >
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3v12" /><path d="m8 11 4 4 4-4" /><path d="M4 21h16" />
    </svg>
  </button>
{/snippet}

<!-- While sharing, .capturing applies the export-only layout (centred
     title and birth line) that the PNG clone picks up. -->
<main bind:this={captureEl} class:capturing={sharing}>
  <header>
    <button class="back" onclick={back} aria-label="Volver">←</button>
    <h1>{birthData?.name?.trim() || 'Tu carta'}</h1>
    {#if chart}
      <div class="actions">
        <!-- Desktop spot; on mobile the buttons render over the graph
             corner instead (.graph-actions). -->
        <div class="img-actions">
          {@render imgButtons()}
        </div>
        <button class="save" onclick={save} disabled={saved}>
          {saved ? 'Guardada ✓' : 'Guardar carta'}
        </button>
      </div>
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
        <div
          class="card type-card"
          role="presentation"
          onclick={(e) => cardClick(e, 'type')}
          onmouseover={(e) => cardOver(e, 'type')}
          onmouseleave={clearReveal}
        >
          <span class="label">Tipo</span>
          <div class="type-list">
            {#each TYPES as t, i}
              <span class="tchip" class:on={chart.type === t.key} data-inner-key={`type:${t.key}`}>
                {t.label}
                <span class="pct" data-tip={`representan el ${t.pct} de la población`}>{t.pct}</span>
                {#if innerReveal === `type:${t.key}` || infoIsOpen('type', t.key)}
                  <span class="dot-slot" data-info-cat="Tipo" data-info-kind="type" data-info-key={t.key}>
                    <InfoDot active={infoIsOpen('type', t.key)} label={`Más información sobre ${t.label}`} />
                  </span>
                {/if}
              </span>
              {#if i === 1}
                <span class="row-break" aria-hidden="true"></span>
              {/if}
            {/each}
          </div>
          {#if cardReveal === 'type' || infoIsOpen('concept', 'type')}
            <span class="dot-slot card-dot" data-info-cat="Tipo" data-info-kind="concept" data-info-key="type">
              <InfoDot active={infoIsOpen('concept', 'type')} label="Qué es el tipo" />
            </span>
          {/if}
        </div>
        <div
          class="card"
          role="presentation"
          onclick={(e) => cardClick(e, 'strategy')}
          onmouseover={(e) => cardOver(e, 'strategy')}
          onmouseleave={clearReveal}
        >
          <span class="label">Estrategia</span>
          <span class="value" data-inner-key="strategy:value"
            >{STRATEGY_LABELS[chart.strategy] ?? chart.strategy}{#if innerReveal === 'strategy:value' || infoIsOpen('strategy', chart.strategy)}<span
              class="dot-side"
              data-info-cat="Estrategia" data-info-kind="strategy" data-info-key={chart.strategy}
            ><InfoDot active={infoIsOpen('strategy', chart.strategy)} label="Más información sobre esta estrategia" /></span>{/if}</span>
          {#if cardReveal === 'strategy' || infoIsOpen('concept', 'strategy')}
            <span class="dot-slot card-dot" data-info-cat="Estrategia" data-info-kind="concept" data-info-key="strategy">
              <InfoDot active={infoIsOpen('concept', 'strategy')} label="Qué es la estrategia" />
            </span>
          {/if}
        </div>
        <div
          class="card"
          role="presentation"
          onclick={(e) => cardClick(e, 'authority')}
          onmouseover={(e) => cardOver(e, 'authority')}
          onmouseleave={clearReveal}
        >
          <span class="label">Autoridad</span>
          <span class="value" data-inner-key="authority:value"
            >{AUTHORITY_LABELS[chart.authority] ?? chart.authority}{#if innerReveal === 'authority:value' || infoIsOpen('authority', chart.authority)}<span
              class="dot-side"
              data-info-cat="Autoridad" data-info-kind="authority" data-info-key={chart.authority}
            ><InfoDot active={infoIsOpen('authority', chart.authority)} label="Más información sobre esta autoridad" /></span>{/if}</span>
          {#if cardReveal === 'authority' || infoIsOpen('concept', 'authority')}
            <span class="dot-slot card-dot" data-info-cat="Autoridad" data-info-kind="concept" data-info-key="authority">
              <InfoDot active={infoIsOpen('concept', 'authority')} label="Qué es la autoridad" />
            </span>
          {/if}
        </div>
        <div
          class="card"
          role="presentation"
          onclick={(e) => cardClick(e, 'profile')}
          onmouseover={(e) => cardOver(e, 'profile')}
          onmouseleave={clearReveal}
        >
          <span class="label">Perfil</span>
          <span class="value" data-inner-key="profile:value"
            >{chart.profile}{#if innerReveal === 'profile:value' || infoIsOpen('profile', chart.profile)}<span
              class="dot-side"
              data-info-cat="Perfil" data-info-kind="profile" data-info-key={chart.profile}
            ><InfoDot active={infoIsOpen('profile', chart.profile)} label="Más información sobre este perfil" /></span>{/if}</span>
          {#if cardReveal === 'profile' || infoIsOpen('concept', 'profile')}
            <span class="dot-slot card-dot" data-info-cat="Perfil" data-info-kind="concept" data-info-key="profile">
              <InfoDot active={infoIsOpen('concept', 'profile')} label="Qué es el perfil" />
            </span>
          {/if}
        </div>
        <div
          class="card pointer"
          role="presentation"
          onmouseenter={() => setHover({ kind: 'definition', gates: [] })}
          onmouseleave={() => { setHover(null); clearReveal(); }}
          onmouseover={(e) => cardOver(e, 'definition')}
          onclick={(e) => cardClick(e, 'definition', () => pin(e, { kind: 'definition', gates: [] }))}
        >
          <span class="label">Definición</span>
          <span class="value" data-inner-key="definition:value"
            >{DEFINITION_LABELS[chart.definition] ?? chart.definition}{#if innerReveal === 'definition:value' || infoIsOpen('definition', chart.definition)}<span
              class="dot-side"
              data-info-cat="Definición" data-info-kind="definition" data-info-key={chart.definition}
            ><InfoDot active={infoIsOpen('definition', chart.definition)} label="Más información sobre esta definición" /></span>{/if}</span>
          {#if cardReveal === 'definition' || infoIsOpen('concept', 'definition')}
            <span class="dot-slot card-dot" data-info-cat="Definición" data-info-kind="concept" data-info-key="definition">
              <InfoDot active={infoIsOpen('concept', 'definition')} label="Qué es la definición" />
            </span>
          {/if}
        </div>
      </div>

      <!-- Mobile only: share/download over the graph's empty top-right
           corner, right below the Definición card. -->
      <div class="img-actions graph-actions">
        {@render imgButtons()}
      </div>

      <div class="overlay right">
        <div
          class="card"
          role="presentation"
          onclick={(e) => cardClick(e, 'center')}
          onmouseover={(e) => cardOver(e, 'center')}
          onmouseleave={clearReveal}
        >
          <span class="label">
            Centros
            <span class="count" data-tip="Centros definidos">({chart.definedCenters.length})</span>
          </span>
          <div class="center-list">
            {#each CENTERS as c}
              <span class="cc-wrap" data-inner-key={`center:${c}`}>
                <button
                  class="cc"
                  class:on={chart.definedCenters.includes(c)}
                  class:focus={hoverCenters.has(c)}
                  class:dimmed={hover && !hoverCenters.has(c)}
                  onmouseenter={() => setHover({ kind: 'center', center: c, gates: [] })}
                  onmouseleave={() => setHover(null)}
                  onclick={(e) => onCenterChipClick(e, c)}
                >
                  {CENTER_LABELS[c]}
                </button>
                {#if innerReveal === `center:${c}` || infoIsOpen('center', c)}
                  <span class="dot-slot" data-info-cat="Centro" data-info-kind="center" data-info-key={c}>
                    <InfoDot active={infoIsOpen('center', c)} label={`Más información sobre el centro ${CENTER_LABELS[c]}`} />
                  </span>
                {/if}
              </span>
            {/each}
          </div>
          {#if cardReveal === 'center' || infoIsOpen('concept', 'center')}
            <span class="dot-slot card-dot" data-info-cat="Centros" data-info-kind="concept" data-info-key="center">
              <InfoDot active={infoIsOpen('concept', 'center')} label="Qué son los centros" />
            </span>
          {/if}
        </div>
      </div>

      <Bodygraph
        {chart}
        highlight={graphHighlight}
        onCenterHover={(c) => setHover(c ? { kind: 'center', center: c, gates: [] } : null)}
        onCenterClick={(e, c) => pin(e, { kind: 'center', center: c, gates: [] })}
      />
    </div>

    <div class="cols">
      <section>
        <div
          class="info-zone"
          role="presentation"
          onclick={(e) => cardClick(e, 'channels')}
          onmouseover={(e) => cardOver(e, 'channels')}
          onmouseleave={clearReveal}
        >
          <h2>
            Canales completos ({chart.activeChannels.length})
            <span class="dot-h2">
              {#if cardReveal === 'channels' || infoIsOpen('concept', 'channel')}
                <span class="dot-host" data-info-cat="Canales" data-info-kind="concept" data-info-key="channel">
                  <InfoDot active={infoIsOpen('concept', 'channel')} label="Qué son los canales" />
                </span>
              {/if}
            </span>
          </h2>
          {#if chart.activeChannels.length === 0}
            <p class="none">Ninguno</p>
          {:else}
            <div class="chips small">
              {#each chart.activeChannels as [g1, g2]}
                <span class="cc-wrap" data-inner-key={`channel:${g1}-${g2}`}>
                  <span
                    class="chip on"
                    role="presentation"
                    class:focus={relatedToHoverCenter(g1, g2)}
                    class:selected={sameHover(hover, { kind: 'channel', gates: [g1, g2] })}
                    class:dimmed={(hover?.kind === 'center' && !relatedToHoverCenter(g1, g2)) ||
                      dimsAgainstChipHover({ kind: 'channel', gates: [g1, g2] })}
                    onmouseenter={() => setHover({ kind: 'channel', gates: [g1, g2] })}
                    onmouseleave={() => setHover(null)}
                    onclick={(e) => pin(e, { kind: 'channel', gates: [g1, g2] })}
                  >
                    {g1}-{g2}
                  </span>
                  {#if innerReveal === `channel:${g1}-${g2}` || infoIsOpen('channel', `${g1}-${g2}`)}
                    <span class="dot-slot" data-info-cat="Canal" data-info-kind="channel" data-info-key={`${g1}-${g2}`}>
                      <InfoDot active={infoIsOpen('channel', `${g1}-${g2}`)} label={`Más información sobre el canal ${g1}-${g2}`} />
                    </span>
                  {/if}
                </span>
              {/each}
            </div>
          {/if}
        </div>
      </section>

      <section>
        <div
          class="info-zone"
          role="presentation"
          onclick={(e) => cardClick(e, 'gates')}
          onmouseover={(e) => cardOver(e, 'gates')}
          onmouseleave={clearReveal}
        >
          <h2>
            Puertas colgantes
            <span
              class="count"
              data-tip={`${hangingGates.length - hangingInDefined} puertas en centros indefinidos\n${hangingInDefined} puertas en centros definidos`}
            >({hangingGates.length})</span>
            <span class="dot-h2">
              {#if cardReveal === 'gates' || infoIsOpen('concept', 'gate')}
                <span class="dot-host" data-info-cat="Puertas" data-info-kind="concept" data-info-key="gate">
                  <InfoDot active={infoIsOpen('concept', 'gate')} label="Qué son las puertas" />
                </span>
              {/if}
            </span>
          </h2>
          {#if hangingGates.length === 0}
            <p class="none">Ninguna</p>
          {:else}
            <div class="chips small">
              {#each hangingGates as g}
                <span class="cc-wrap" data-inner-key={`gate:${g}`}>
                  <span
                    class="chip"
                    class:on={chart.definedCenters.includes(CENTER_BY_GATE[g])}
                    class:soft={!chart.definedCenters.includes(CENTER_BY_GATE[g])}
                    role="presentation"
                    class:focus={relatedToHoverCenter(g)}
                    class:selected={sameHover(hover, { kind: 'gate', gates: [g] })}
                    class:dimmed={(hover?.kind === 'center' && !relatedToHoverCenter(g)) ||
                      hover?.kind === 'definition' ||
                      dimsAgainstChipHover({ kind: 'gate', gates: [g] })}
                    onmouseenter={() => setHover({ kind: 'gate', gates: [g] })}
                    onmouseleave={() => setHover(null)}
                    onclick={(e) => pin(e, { kind: 'gate', gates: [g] })}
                  >
                    {g}
                  </span>
                  {#if innerReveal === `gate:${g}` || infoIsOpen('gate', `${g}`)}
                    <span class="dot-slot" data-info-cat="Puerta" data-info-kind="gate" data-info-key={`${g}`}>
                      <InfoDot active={infoIsOpen('gate', `${g}`)} label={`Más información sobre la puerta ${g}`} />
                    </span>
                  {/if}
                </span>
              {/each}
            </div>
          {/if}
        </div>
      </section>
    </div>

    <section>
      <div
        class="info-zone"
        role="presentation"
        onclick={(e) => cardClick(e, 'activations')}
        onmouseover={(e) => cardOver(e, 'activations')}
        onmouseleave={clearReveal}
      >
        <h2>
          Activaciones
          <span class="dot-h2">
            {#if cardReveal === 'activations' || infoIsOpen('concept', 'activation')}
              <span class="dot-host" data-info-cat="Activaciones" data-info-kind="concept" data-info-key="activation">
                <InfoDot active={infoIsOpen('concept', 'activation')} label="Qué son las activaciones" />
              </span>
            {/if}
          </span>
        </h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th data-inner-key="actcol:personality">
                <span class="side-head" data-tip="Se define en el momento del nacimiento">Personality<span class="side-dot personality" aria-hidden="true"></span></span>{#if innerReveal === 'actcol:personality' || infoIsOpen('activationCol', 'personality')}<span class="dot-side" data-info-cat="Activaciones" data-info-kind="activationCol" data-info-key="personality"><InfoDot active={infoIsOpen('activationCol', 'personality')} label="Qué es Personality" /></span>{/if}
              </th>
              <th data-inner-key="actcol:design">
                <span class="side-head" data-tip={'Se define 88° de arco solar antes\ndel nacimiento (~88 días)'}>Design<span class="side-dot design" aria-hidden="true"></span></span>{#if innerReveal === 'actcol:design' || infoIsOpen('activationCol', 'design')}<span class="dot-side" data-info-cat="Activaciones" data-info-kind="activationCol" data-info-key="design"><InfoDot active={infoIsOpen('activationCol', 'design')} label="Qué es Design" /></span>{/if}
              </th>
              <th class="weight-col" data-inner-key="actcol:weight">
                <span class="side-head" data-tip={'Influencia relativa de la activación\n(el Sol y la Tierra pesan más)'}>Peso</span>{#if innerReveal === 'actcol:weight' || infoIsOpen('activationCol', 'weight')}<span class="dot-side" data-info-cat="Activaciones" data-info-kind="activationCol" data-info-key="weight"><InfoDot active={infoIsOpen('activationCol', 'weight')} label="Qué es el peso" /></span>{/if}
              </th>
            </tr>
          </thead>
          <tbody>
            {#each (showAllPlanets ? PLANETS : PLANETS.slice(0, 5)) as p}
              {@const w = getActivationWeight(p)}
              <tr>
                <td class="planet" data-inner-key={`planet:${p}`}>
                  <span class="psym">{PLANET_SYMBOLS[p]}</span>{PLANET_LABELS[p]}{#if innerReveal === `planet:${p}` || infoIsOpen('planet', p)}<span class="dot-side" data-info-cat="Planeta" data-info-kind="planet" data-info-key={p}><InfoDot active={infoIsOpen('planet', p)} label={`Más información sobre ${PLANET_LABELS[p]}`} /></span>{/if}
                </td>
                <td>
                  <button class="act act-btn" class:hl={actHl(chart.personality[p].gate)} onclick={(e) => actClick(e, chart.personality[p].gate)}>
                    {chart.personality[p].gate}.{chart.personality[p].line}
                  </button>
                </td>
                <td>
                  <button class="act act-btn" class:hl={actHl(chart.design[p].gate)} onclick={(e) => actClick(e, chart.design[p].gate)}>
                    {chart.design[p].gate}.{chart.design[p].line}
                  </button>
                </td>
                <td class="weight-col">
                  {#if w}<span class="weight-val" data-tier={w.tier}>{w.label}</span>{/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        <button class="show-more" onclick={(e) => { e.stopPropagation(); showAllPlanets = !showAllPlanets; }}>
          {showAllPlanets ? 'Mostrar menos ▴' : 'Mostrar más ▾'}
        </button>
      </div>
    </section>

    <footer>
      v{version} · source-available · gratis para uso no comercial · <About onElement={(kind, key) => openInfoFor(CATEGORY_BY_KIND[kind] ?? '', kind, key)} />
    </footer>
  {/if}
</main>

<ElementInfo
  open={infoOpen}
  category={infoTop?.category ?? ''}
  info={infoTop?.info ?? null}
  prompts={infoTop?.prompts ?? null}
  elementKey={infoTop ? `${infoTop.kind}:${infoTop.key}` : ''}
  canBack={infoStack.length > 1}
  onback={backInfo}
  onnavigate={navigateInfo}
  onclose={closeInfo}
/>

<svelte:window onclick={(e) => { hover = null; cardReveal = null; innerReveal = null; tipTap(e); }} />

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
    margin-bottom: 0.4rem;
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
    /* Reserve the inline concept "i" height so revealing it doesn't shift the row. */
    line-height: 1.35;
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
    /* Left-aligned with the title text (back button 2.25rem + gap 1rem);
       slight negative top margin tucks it right under the title. */
    margin: -0.15rem 0 1.5rem 3.25rem;
  }

  /* Export-only layout: the back button and action buttons are filtered
     out of the PNG clone, so while capturing the title and the birth
     line are centred to keep the image header balanced. */
  main.capturing header {
    justify-content: center;
  }
  main.capturing .birth {
    margin-left: 0;
    text-align: center;
  }

  .type-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    margin-top: 0.2rem;
  }
  /* Muted via explicit colours, not opacity — otherwise the population
     tooltip rendered inside the chip becomes translucent too. */
  .tchip {
    position: relative;
    border: 1px solid #232328;
    border-radius: 999px;
    background: var(--surface-2);
    color: #7e7e88;
    font-size: 0.7rem;
    padding: 0.12rem 0.55rem;
    white-space: nowrap;
  }
  /* The info "i" sits as a superscript over the chip's top-right corner. */
  .dot-slot {
    position: absolute;
    top: -9px;
    right: -9px;
    z-index: 1;
  }
  .type-card {
    position: relative;
  }
  /* On the card itself the "i" tucks hard into the top-right corner. The top
     inset is a touch smaller than the right so the rounded corner doesn't make
     the top gap look larger than the right one. */
  .card-dot {
    top: 2px;
    right: 4px;
  }
  /* Centre chips are <button>, so their "i" can't nest inside; it sits as a
     positioned sibling over the chip's corner, anchored by this wrapper. */
  .cc-wrap {
    position: relative;
    display: inline-flex;
  }
  /* The value "i" (specific strategy / authority / profile / definition) sits
     inline right after the value text — and after the last line when the value
     wraps — vertically centred with it (not raised like a superscript). The
     negative right margin cancels its own advance so it reserves no space and
     never pushes the value onto an extra line. */
  .dot-side {
    display: inline-flex;
    vertical-align: middle;
    margin-left: 0.3rem;
    margin-right: -1.4rem;
  }
  /* The concept "i" on a section title ("Canales completos", "Puertas
     colgantes") sits inline after the count. The slot is *always* present at a
     fixed size — only the "i" inside it toggles — so revealing it never grows
     the line box nor shifts the chips below. */
  .dot-h2 {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 17px;
    height: 17px;
    vertical-align: middle;
    margin-left: 0.35rem;
  }
  .dot-host {
    display: inline-flex;
  }
  .tchip.on {
    background: var(--accent);
    border-color: var(--accent);
    color: #1a1408;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 0.3rem 0.75rem;
    opacity: 1;
    /* Long labels (Manifesting Generator) overflow the narrow desktop
       type card if kept on one line. */
    white-space: normal;
  }
  .tchip .pct {
    cursor: help;
  }
  /* Forces the G+MG / P+M+R two-row split on mobile; inert on desktop. */
  .row-break {
    display: none;
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
    /* pre: keeps single lines intact and honours \n in multi-line tips */
    white-space: pre;
    text-transform: none;
    letter-spacing: normal;
    text-align: left;
    pointer-events: none;
    z-index: 40;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.45rem 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    /* Anchor for the card's concept "i" (.card-dot, absolute top-right). */
    position: relative;
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
    /* Tall enough to hold the inline "i" so revealing it never bumps the
       line height. */
    line-height: 1.4;
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
    width: 158px;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    align-items: stretch;
    z-index: 1;
  }
  /* Desktop: share/download to the left of the save button, same row. */
  .actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .img-actions {
    display: flex;
    gap: 0.4rem;
  }
  .graph-actions {
    display: none;
  }
  .count {
    cursor: help;
  }
  .img-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    cursor: pointer;
  }
  .img-btn:hover {
    border-color: var(--accent);
  }
  .img-btn:disabled {
    opacity: 0.5;
    cursor: progress;
  }
  .card.pointer {
    cursor: pointer;
  }
  .center-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    margin-top: 0.2rem;
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
    /* No font-weight change here: bolding widens the chip and reflows the
       whole row. The solid amber fill is emphasis enough. */
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
  .cols .chip.dimmed {
    opacity: 0.18;
  }
  /* The chip whose own highlight is active (hovered or pinned) — mirrors
     the centre-chip focus colours: amber fill when active, white outline
     when soft. */
  .cols .chip.selected {
    opacity: 1;
    border-color: var(--text);
    color: var(--text);
  }
  .cols .chip.on.selected {
    border-color: var(--accent);
    background: var(--accent);
    color: #1a1408;
    /* Same reason as .cc.on.focus: no bold, so the chip doesn't reflow. */
  }
  @media (max-width: 679px) {
    .graph {
      display: flex;
      flex-direction: column;
    }
    .overlay.left {
      position: static;
      width: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      order: 1;
    }
    .overlay.left .card:first-child {
      grid-column: 1 / -1;
    }
    .graph > :global(.bodygraph-wrap) {
      order: 2;
    }
    /* Centres card goes below the graph on mobile. */
    .overlay.right {
      position: static;
      width: auto;
      margin-top: 0.5rem;
      order: 3;
    }
    .center-list {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    /* Types in two left-aligned rows: G + MG, then P / M / R. */
    .type-list {
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 0.35rem;
      row-gap: 0.3rem;
    }
    .type-list .row-break {
      display: block;
      flex-basis: 100%;
      height: 0;
    }
    .birth {
      /* Same title-text alignment as desktop, tight gap under the title. */
      margin: -0.1rem 0 1.25rem 3.25rem;
    }
    /* Mobile: save stays at title height in the header; share/download
       move over the graph's empty top-right corner, right below the
       Definición card (the date-place line keeps the full width). The
       negative bottom margin lets the graph start at the same height,
       so the buttons overlap its empty corner instead of pushing it
       down. */
    .actions .img-actions {
      display: none;
    }
    .graph-actions {
      display: flex;
      order: 1;
      align-self: flex-end;
      margin: 0.45rem 0 calc(-2rem - 0.45rem);
      z-index: 1;
    }
    .save {
      padding: 0.4rem 0.65rem;
      font-size: 0.78rem;
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
    /* opacity makes .pct a stacking context that would otherwise trap its
       tooltip behind the "i"; a z-index above the dot keeps the tip on top. */
    position: relative;
    z-index: 2;
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
  /* Activation values are now buttons (tap → open the gate). Reset the native
     button chrome so they read exactly like the old <span>. */
  .act-btn {
    background: none;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  /* Pin the Peso column wide enough for its longest label ("medio") so that
     expanding "Mostrar más" — which first introduces "medio" rows — can't
     widen it and jitter the whole table. */
  thead th.weight-col,
  tbody td.weight-col {
    min-width: 4.5rem;
  }
  /* "Peso" column: deliberately discreet (smaller, muted), with a faint tier
     gradient so the eye lands on the heavy activations (Sun/Earth) first. */
  .weight-val {
    font-size: 0.78rem;
    color: #5a5a62;
  }
  .weight-val[data-tier='high'] {
    color: #9a9aa2;
  }
  .weight-val[data-tier='mid'] {
    color: #76767e;
  }

  .psym {
    display: inline-block;
    width: 1.3em;
    opacity: 0.8;
  }

  .side-head {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    cursor: help;
  }
  /* Same colours the two sides use on gates/channels in the graph. */
  .side-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
  }
  .side-dot.personality {
    background: #ffffff;
  }
  .side-dot.design {
    background: #e84672;
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
  /* Pin the planet-name column wide enough for the longest label ("Nodo
     Norte") so expanding "Mostrar más" can't widen it and shift the value
     columns. min-width (not width) is what the shrink-to-fit <main> honours
     as a hard floor — a plain width gets minimised away; table-layout:fixed
     would collapse the table to zero against that same shrink-to-fit main. */
  thead th:first-child,
  tbody td:first-child {
    min-width: 8.5rem;
    white-space: nowrap;
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
  .show-more {
    display: block;
    padding: 0.45rem 0.6rem;
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 0.8rem;
    cursor: pointer;
  }
  .show-more:hover {
    color: var(--accent);
  }
</style>
