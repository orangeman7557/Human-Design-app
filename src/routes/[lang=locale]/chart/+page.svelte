<script>
  import { onMount, tick, untrack } from 'svelte';

  // Injected by Vite's `define` from package.json (see vite.config.js).
  const version = __APP_VERSION__;
  import { computeChart } from '$lib/hd/chart.js';
  import { CENTERS, PLANETS, CENTER_BY_GATE, CHANNELS } from '$lib/hd/constants.js';
  import { toBlob } from 'html-to-image';
  import { saveChart } from '$lib/db/charts.js';
  import Bodygraph from '$lib/components/Bodygraph.svelte';
  import ElementInfo from '$lib/components/ElementInfo.svelte';
  import InitialReport from '$lib/components/InitialReport.svelte';
  import InfoDot from '$lib/components/InfoDot.svelte';
  import About from '$lib/components/About.svelte';
  import ReportBug from '$lib/components/ReportBug.svelte';
  import { install, promptInstall } from '$lib/pwa/install.svelte.js';
  import { dialog } from '$lib/components/dialog.svelte.js';
  import { cityCountry } from '$lib/geo/place.js';
  import { getElementInfo, getProfileInfo, getGateInfo, getChannelInfo, getConceptInfo, getPlanetInfo, getSignalInfo, getSignalNames, getCrossInfo, formatCrossGates, getActivationWeight, getDisplayLabels } from '$lib/hd/content/index.js';
  import { t } from '$lib/i18n/index.svelte.js';
  import { buildPrompts } from '$lib/hd/prompts.js';
  import { buildShareUrl, decodeBirth, hasShareParams } from '$lib/hd/share-link.js';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  // Active language for building URLs — from the route param (SSR-safe).
  const lang = $derived($page.params.lang);
  const tr = (key, params) => t(key, params, lang);

  // Human labels for centres/planets/types/strategies/authorities/definitions
  // all come from the content pack's DISPLAY labels (not the prompt ones, which
  // are lower-case and carry articles), so they translate with the rest of the
  // Human Design content (Phase M turn 2). The variable names are kept, so every
  // usage site below is untouched. Astro symbols are language-neutral.
  const CENTER_LABELS = $derived(getDisplayLabels(lang).center);
  const PLANET_LABELS = $derived(getDisplayLabels(lang).planet);
  const STRATEGY_LABELS = $derived(getDisplayLabels(lang).strategy);
  const AUTHORITY_LABELS = $derived(getDisplayLabels(lang).authority);
  const DEFINITION_LABELS = $derived(getDisplayLabels(lang).definition);
  const SIGNAL_LABELS = $derived(getDisplayLabels(lang).signal);
  const CROSS_LABELS = $derived(getDisplayLabels(lang).cross);
  // The type's alignment / misalignment pair, e.g. { aligned: 'Satisfacción' }.
  const signalNames = $derived(chart ? getSignalNames(chart.type, lang) : null);

  // Types ordered by estimated share of the population; labels from the pack.
  const TYPE_ORDER = ['generator', 'manifesting-generator', 'projector', 'manifestor', 'reflector'];
  const TYPES = $derived(TYPE_ORDER.map((key) => ({ key, label: getDisplayLabels(lang).type[key] ?? key })));

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

  /** @type {any} */
  let chart = $state(null);
  let reportOpen = $state(false);
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

  // Category eyebrow shown above a drawer's title. Also read from the DOM via
  // `data-info-cat` on each info dot, so every entry point is translated.
  const CATEGORY_BY_KIND = $derived({
    bodygraph: tr('category.bodygraph'),
    type: tr('category.type'), strategy: tr('category.strategy'), authority: tr('category.authority'),
    profile: tr('category.profile'), definition: tr('category.definition'),
    center: tr('category.center'), centers: tr('category.centers'),
    signal: tr('category.signal'), signals: tr('category.signals'), cross: tr('category.cross'),
    channel: tr('category.channel'), channels: tr('category.channels'),
    gate: tr('category.gate'), gates: tr('category.gates'),
    activationCol: tr('category.activationCol'), planet: tr('category.planet')
  });

  /** Resolve an element's `{ title, paragraphs, facts?, after?, related?, list? }` by kind. */
  function resolveInfo(kind, key) {
    return kind === 'concept' ? getConceptInfo(key, chart)
      // A profile key is "3/5"; a bare line number ("3", from the lines
      // schema or an activation's line) opens that line's own entry instead.
      : kind === 'profile' ? (String(key).includes('/') ? getProfileInfo(key) : getElementInfo(kind, key))
      : kind === 'gate' ? getGateInfo(key, chart)
      : kind === 'channel' ? getChannelInfo(key, chart)
      : kind === 'planet' ? getPlanetInfo(key, chart)
      // Signals and the cross have no stand-alone entry: both are composed from
      // the chart (the signal pair follows the type, the cross the Sun/Earth
      // gates), so the key is only the polarity / the angle.
      : kind === 'signal' ? getSignalInfo(key, chart)
      : kind === 'cross' ? getCrossInfo(chart)
      : getElementInfo(kind, key);
  }

  // `catKey` is the *key* of the category eyebrow (not its translated label):
  // the label is resolved at render time so it follows a language switch.
  function buildEntry(catKey, kind, key) {
    const info = resolveInfo(kind, key);
    if (!info) return null;
    return { catKey, kind, key, info, prompts: buildPrompts(kind, key, chart) };
  }

  /** Is the panel open *for* this element? Tracks the stack's origin so the
   *  originating chip stays marked even while a deeper element shows. */
  function infoIsOpen(kind, key) {
    return !!infoOrigin && infoOrigin.kind === kind && infoOrigin.key === key;
  }

  // Open from a chip/title: a fresh stack.
  // One-off "the elements are clickable" hint (see the markup). Shown until
  // the user dismisses it or opens any drawer — at that point they've found
  // the mechanic and the line has done its job.
  const INFO_HINT_KEY = 'hd:info-hint-seen';
  let showInfoHint = $state(false);
  function dismissInfoHint() {
    if (!showInfoHint) return;
    showInfoHint = false;
    try {
      localStorage.setItem(INFO_HINT_KEY, '1');
    } catch {
      // Private mode / storage disabled: the hint just shows again next time.
    }
  }

  function openInfoFor(category, kind, key) {
    const entry = buildEntry(category, kind, key);
    if (entry) infoStack = [entry];
    dismissInfoHint();
  }
  // Follow an in-text link: push onto the current stack (or open fresh).
  function navigateInfo(kind, key) {
    const entry = buildEntry(kind, kind, key);
    if (entry) infoStack = [...infoStack, entry];
  }
  // A language switch with a drawer open: `info` and `prompts` were resolved in
  // the previous language when the entry was pushed, so re-resolve the whole
  // stack. Without this the drawer only updated the parts that read live state
  // and needed a close/reopen to fully switch.
  $effect(() => {
    const l = lang; // the ONLY tracked dependency
    // Everything touching infoStack goes inside untrack: reading it here would
    // make this effect depend on the very state it writes, which Svelte flags
    // as an update loop.
    untrack(() => {
      if (!l || infoStack.length === 0) return;
      infoStack = infoStack.map((e) => {
        const info = resolveInfo(e.kind, e.key);
        return info ? { ...e, info, prompts: buildPrompts(e.kind, e.key, chart) } : e;
      });
    });
  });

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
    openInfoFor('gate', 'gate', String(gate));
  }
  // Tapping the line number (the ".N" part) opens that line's drawer, not the
  // gate. The line 1-6 shares its archetype with the profile lines, so it
  // reuses the 'profile' content by line number.
  function actLineClick(e, line) {
    e.stopPropagation();
    openInfoFor('profile', 'profile', String(line));
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
    const h = { kind: 'center', center: c, gates: [] };
    pin(e, h);
    revealForPinned(h, `center:${c}`);
  }

  // Channel / hanging-gate chips: a tap pins the highlight AND, on touch,
  // reveals the chip's own "i". They call pin() (which stopPropagation, so the
  // window handler doesn't clear the reveal), so the reveal must be set here —
  // not left to the info-zone's cardClick, which never runs for them.
  function onChipClick(e, h, innerKey) {
    pin(e, h);
    revealForPinned(h, innerKey);
  }

  // Couple the specific "i" to the pinned state: on touch, show `innerKey` iff
  // this element is now the selected one, so the "i" can never linger after the
  // element is deselected (and switches cleanly when another is selected).
  // Desktop reveals via cardOver instead, so this is a no-op there.
  function revealForPinned(h, innerKey) {
    if (!isTouch()) return;
    innerReveal = sameHover(hover, h) ? innerKey : null;
    cardReveal = null;
  }

  // Tapping a centre on the SVG pins it like the chip does, but a centre's "i"
  // lives in the Centres list (not on the graph), so we don't surface one
  // across the screen — we just clear any stale reveal so a previous chip's
  // "i" can't linger over the newly pinned centre.
  // Clicking a centre shape on the bodygraph pins its highlight AND opens its
  // drawer (author request 2026-07-06; gate markers stay non-clickable for now).
  function onSvgCenterClick(e, c) {
    pin(e, { kind: 'center', center: c, gates: [] });
    if (isTouch()) { innerReveal = null; cardReveal = null; }
    openInfoFor('center', 'center', c);
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
    const place = cityCountry(b.placeLabel);
    return [`${date}, ${b.time}`, place].filter(Boolean).join(' · ');
  }

  // Share the whole chart view (bodygraph + summary + lists) as a PNG via
  // the native share sheet when available, downloading as fallback.
  /** @type {HTMLElement | undefined} */
  let captureEl = $state();
  /** @type {HTMLElement | undefined} The bodygraph block; the PDF cover crops here. */
  let graphEl = $state();
  let sharing = $state(false);
  // Forces the desktop layout while capturing the PDF cover (see downloadReportPdf).
  let pdfShot = $state(false);

  // "nombre carta YYYY-MM-DD-HHMM-ciudad.png" — city = placeLabel up to
  // the first comma. Characters that are illegal in filenames (a chart named
  // "a/b" would break the download) are replaced with a dash.
  function safeFilePart(s) {
    return s.replace(/[/\\:*?"<>|]/g, '-').replace(/\s+/g, ' ').trim();
  }
  function imageFileName() {
    const name = safeFilePart(birthData?.name || 'carta');
    const time = (birthData?.time || '').replace(':', '');
    const place = safeFilePart((birthData?.placeLabel || '').split(',')[0]);
    const tail = [birthData?.date, time, place].filter(Boolean).join('-');
    return [name, tail].filter(Boolean).join(' ') + '.png';
  }

  async function captureBlob({ summaryOnly = false } = {}) {
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
    //
    // `summaryOnly` (the PDF cover) stops at the bodygraph: the channels,
    // hanging gates and activations table are dropped from the clone (they go
    // into the PDF as text instead) and the height is cropped to the graph's
    // bottom so no empty band trails below.
    const pad = 12;
    const cs = getComputedStyle(captureEl);
    const contentW =
      captureEl.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    let contentH;
    if (summaryOnly) {
      const mainTop = captureEl.getBoundingClientRect().top;
      const graphBottom = graphEl.getBoundingClientRect().bottom;
      contentH = graphBottom - mainTop - parseFloat(cs.paddingTop);
    } else {
      const footer = captureEl.querySelector('footer');
      const fcs = footer ? getComputedStyle(footer) : null;
      const footerH = footer
        ? footer.offsetHeight + parseFloat(fcs.marginTop) + parseFloat(fcs.marginBottom)
        : 0;
      contentH =
        captureEl.clientHeight -
        parseFloat(cs.paddingTop) -
        parseFloat(cs.paddingBottom) -
        footerH;
    }
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
      filter: (node) => {
        if (
          node.classList?.contains('back') ||
          node.classList?.contains('report-btn') ||
          node.classList?.contains('actions') ||
          node.classList?.contains('img-actions') ||
          node.tagName === 'FOOTER'
        )
          return false;
        if (summaryOnly && (node.classList?.contains('cols') || node.classList?.contains('activations')))
          return false;
        return true;
      }
    });
    if (!blob) throw new Error(tr('chart.errImageGen'));
    return blob;
  }

  function downloadBlob(blob, name = imageFileName()) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Image/PDF export errors get their own state: they used to land in
  // saveError, which renders with a misleading "No se pudo guardar:" prefix.
  /** @type {string | null} */
  let shareError = $state(null);

  // Share the chart as a link (birth data in the URL) rather than an image:
  // the recipient recomputes the same chart locally. Native share sheet on
  // touch; clipboard copy (with a brief "copiado" confirmation) on desktop.
  let linkCopied = $state(false);
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let copiedTimer;
  async function doShareUrl(url) {
    try {
      if (navigator.share) {
        await navigator.share({ title: tr('chart.shareSheetTitle'), url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        linkCopied = true;
        clearTimeout(copiedTimer);
        copiedTimer = setTimeout(() => (linkCopied = false), 2200);
      } else {
        await dialog.alert({ title: tr('chart.shareFallbackTitle'), message: url });
      }
    } catch (e) {
      if (e?.name !== 'AbortError') {
        shareError = tr('chart.errShare', { msg: e instanceof Error ? e.message : String(e) });
      }
    }
  }
  async function shareLink() {
    if (!birthData) return;
    shareError = null;
    await doShareUrl(buildShareUrl($state.snapshot(birthData), location.origin));
  }
  // Same link, but with `r=1` so the recipient lands with the report open.
  async function shareReportLink() {
    if (!birthData) return;
    shareError = null;
    await doShareUrl(buildShareUrl($state.snapshot(birthData), location.origin) + '&r=1');
  }

  async function download() {
    if (!captureEl || sharing) return;
    sharing = true;
    shareError = null;
    try {
      downloadBlob(await captureBlob());
    } catch (e) {
      shareError = tr('chart.errDownload', { msg: e instanceof Error ? e.message : String(e) });
    } finally {
      sharing = false;
    }
  }

  // Blob → { dataUrl, width, height } for jsPDF's addImage (it needs the
  // natural pixel size to keep the aspect ratio).
  function blobToImage(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = /** @type {string} */ (reader.result);
        const img = new Image();
        img.onload = () => resolve({ dataUrl, width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = reject;
        img.src = dataUrl;
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Build & download the initial report as a PDF: a cover image (the chart
  // header + summary cards + bodygraph) followed by the report as selectable
  // text. The overlay owns buildReport and hands us the assembled sections;
  // we own the chart capture and the lazily-loaded jsPDF layer.
  //
  // `pdfShot` forces the desktop layout for the cover even on a phone: a PDF is
  // a document, so it should always carry the wide desktop arrangement rather
  // than the stacked mobile one. The report overlay covers <main> while this
  // runs, so the brief re-layout behind it is never seen.
  async function downloadReportPdf({ sections }) {
    if (!captureEl || sharing) return;
    sharing = true;
    shareError = null;
    pdfShot = true;
    try {
      const cover = await blobToImage(await captureBlob({ summaryOnly: true }));
      const { buildReportPdf } = await import('$lib/hd/report-pdf.js');
      // Cover wording is passed in so report-pdf.js stays free of app imports.
      const pdf = await buildReportPdf({
        image: cover,
        sections,
        labels: {
          eyebrow: tr('reportUi.eyebrow').toUpperCase(),
          title: tr('reportUi.title'),
          defined: tr('reportUi.pdfDefined'),
          open: tr('reportUi.pdfOpen')
        }
      });
      downloadBlob(pdf, imageFileName().replace(/\.png$/i, '.pdf'));
    } catch (e) {
      shareError = tr('chart.errPdf', { msg: e instanceof Error ? e.message : String(e) });
    } finally {
      sharing = false;
      pdfShot = false;
    }
  }

  async function save() {
    if (!birthData || saved) return;
    saveError = null;
    const suggested = birthData.name || birthData.placeLabel || tr('chart.noName');
    const name = await dialog.prompt({
      title: tr('chart.dlgSaveTitle'),
      defaultValue: suggested,
      placeholder: tr('chart.dlgSavePlaceholder'),
      confirmLabel: tr('chart.dlgSaveConfirm')
    });
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

  // Mobile header fit (jul 2026). On a phone the header row is [back] [name +
  // Informe] [Guardar]. Space permitting, the buttons show words instead of
  // bare icons; when the name would push them off, the labels collapse in a
  // fixed order — Informe's word first, then Guardar's — before the name
  // finally truncates with an ellipsis. We can't express "labels drop before
  // the name truncates" in CSS alone, so we measure: pick the richest layout in
  // which the name isn't cut off. Desktop is untouched (media query handles it).
  //   'full'       → Guardar (text) · Informe (icon + text)
  //   'noInforme'  → Guardar (text) · Informe (icon)
  //   'icons'      → Guardar (icon) · Informe (icon)
  /** @type {HTMLElement | undefined} */
  let headerEl = $state();
  let hdrMode = $state('icons');
  let fitSeq = 0;

  function isMobileHeader() {
    return window.matchMedia('(max-width: 679px)').matches;
  }
  async function fitHeader() {
    if (!headerEl || !isMobileHeader()) return;
    const seq = ++fitSeq;
    const h1 = headerEl.querySelector('h1');
    if (!h1) return;
    for (const m of ['full', 'noInforme', 'icons']) {
      hdrMode = m;
      await tick();
      if (seq !== fitSeq) return; // a newer run superseded this one
      // 'icons' is the last resort; otherwise keep the first mode that doesn't
      // truncate the name (+1px tolerance for sub-pixel rounding).
      if (m === 'icons' || h1.scrollWidth <= h1.clientWidth + 1) return;
    }
  }

  $effect(() => {
    const onResize = () => fitHeader();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });
  // Re-fit when the name, the chart's presence, or the save label change width.
  $effect(() => {
    void birthData?.name;
    void chart;
    void saved;
    fitHeader();
  });

  onMount(async () => {
    try {
      showInfoHint = localStorage.getItem(INFO_HINT_KEY) !== '1';
    } catch {
      showInfoHint = false;
    }
    try {
      // A shared link (/chart?…) carries the birth data in the URL; otherwise
      // we read what the form left in sessionStorage. A decoded link is also
      // written back to sessionStorage so save / back / form-restore behave the
      // same as an in-app chart.
      let birth = null;
      const params = new URLSearchParams(location.search);
      if (hasShareParams(params)) {
        birth = decodeBirth(params);
        if (birth) sessionStorage.setItem('birthData', JSON.stringify(birth));
      }
      if (!birth) {
        const raw = sessionStorage.getItem('birthData');
        if (!raw) {
          error = tr('chart.noBirthData');
          loading = false;
          return;
        }
        birth = JSON.parse(raw);
      }
      birthData = birth;
      chart = await computeChart(birth);
      // A shared "report" link (…&r=1) asks us to land with the initial report
      // already open.
      if (params.get('r') === '1') reportOpen = true;
      // A link elsewhere (e.g. the "Manifestor" word in the About modal on the
      // home page) can ask us to open an element drawer on arrival.
      const openInfo = sessionStorage.getItem('hd:openInfo');
      if (openInfo) {
        sessionStorage.removeItem('hd:openInfo');
        const i = openInfo.indexOf(':');
        if (i > 0) {
          const kind = openInfo.slice(0, i);
          openInfoFor(kind, kind, openInfo.slice(i + 1));
        }
      }
    } catch (e) {
      console.error(e);
      error = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  });

  function back() {
    // Always the home of the current language. history.back() used to be the
    // first choice, but after a language switch the previous entry is this same
    // chart in the old language, so the arrow appeared to undo the switch.
    goto(`/${lang}`);
  }

  // "instalar como app" footer link — same behaviour as the home's: Chromium
  // fires the captured native prompt, iOS browsers get manual instructions.
  async function onInstallClick() {
    if (install.mode === 'prompt') {
      await promptInstall();
    } else if (install.mode === 'ios') {
      await dialog.alert({
        title: tr('install.iosTitle'),
        message: tr('install.iosMessage')
      });
    }
  }
</script>

<svelte:head>
  <title>{tr('chart.seoTitle')}</title>
  <meta name="description" content={tr('chart.seoDesc')} />
</svelte:head>

{#snippet imgButtons()}
  <button
    class="img-btn"
    onclick={shareLink}
    data-tip={linkCopied ? tr('chart.shareCopied') : tr('chart.shareLink')}
    aria-label={tr('chart.shareLinkAria')}
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
    data-tip={sharing ? tr('chart.generatingImage') : tr('chart.downloadImage')}
    aria-label={tr('chart.downloadImage')}
  >
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3v12" /><path d="m8 11 4 4 4-4" /><path d="M4 21h16" />
    </svg>
  </button>
{/snippet}

<!-- While sharing, .capturing applies the export-only layout (centred
     title and birth line) that the PNG clone picks up. -->
<main bind:this={captureEl} class:capturing={sharing} class:pdf-shot={pdfShot}>
  <!-- Export-only brand line: shows in the shared/downloaded PNG (not the PDF
       cover, which gets a native header in report-pdf.js). -->
  <div class="export-brand" aria-hidden="true">hdchart.app</div>
  <header
    bind:this={headerEl}
    class:hdr-full={hdrMode === 'full'}
    class:hdr-noinforme={hdrMode === 'noInforme'}
    class:hdr-icons={hdrMode === 'icons'}
  >
    <button class="back" onclick={back} aria-label={tr('chart.back')}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </button>
    <div class="title-wrap">
      <h1>{birthData?.name?.trim() || tr('chart.untitled')}</h1>
      {#if chart}
        <button class="report-btn" type="button" onclick={() => (reportOpen = true)} aria-label={tr('chart.reportAria')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="16" y2="17" />
          </svg>
          <span class="report-lbl">{tr('chart.report')}</span>
        </button>
      {/if}
    </div>
    {#if chart}
      <div class="actions">
        <!-- Desktop spot; on mobile the buttons render over the graph
             corner instead (.graph-actions). -->
        <div class="img-actions">
          {@render imgButtons()}
        </div>
        <button class="save" onclick={save} disabled={saved} aria-label={saved ? tr('chart.savedAria') : tr('chart.save')}>
          {#if saved}
            <svg class="save-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          {:else}
            <svg class="save-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
          {/if}
          <span class="save-lbl">{saved ? tr('chart.saved') : tr('chart.save')}</span>
          <span class="save-lbl-m">{saved ? tr('chart.saved') : tr('chart.saveShort')}</span>
        </button>
      </div>
    {/if}
  </header>

  {#if saveError}
    <p class="status error">{tr('chart.errSave', { msg: saveError })}</p>
  {/if}
  {#if shareError}
    <p class="status error">{shareError}</p>
  {/if}

  {#if loading}
    <p class="status">{tr('chart.calculating')}</p>
  {:else if error}
    <p class="status error">{tr('chart.errorPrefix', { msg: error })}</p>
    <p class="status"><a href={`/${lang}`}>{tr('chart.backToForm')}</a></p>
  {:else if chart}
    {#if birthData}
      <p class="birth">{formatBirth(birthData)}</p>
    {/if}

    <!-- Every element on this page has an explanation behind an "i". On
         desktop you find it by moving the pointer around, so the hint is
         MOBILE-ONLY (hidden by CSS below): on touch there is no hover to
         stumble into, and nothing suggests the drawers exist. Shown once —
         dismissed on close, or the first time a drawer is actually opened. -->
    {#if showInfoHint}
      <div class="info-hint">
        <p>
          {tr('chart.infoHintA')}<span class="dot" aria-hidden="true">i</span>{tr('chart.infoHintB')}
        </p>
        <button type="button" onclick={dismissInfoHint} aria-label={tr('bug.close')}>✕</button>
      </div>
    {/if}

    <div class="graph" bind:this={graphEl}>
      <!-- Bodygraph label + concept "i". Absolute over the head on desktop;
           on mobile it rides the graph's empty top-left corner (see the
           media query) so it doesn't push the graph down. -->
      <div
        class="bg-title-zone"
        role="presentation"
        onclick={(e) => cardClick(e, 'bodygraph')}
        onmouseover={(e) => cardOver(e, 'bodygraph')}
        onmouseleave={clearReveal}
      >
        <span class="bg-title">
          {tr('chart.hBodygraph')}
          <span class="dot-h2">
            {#if cardReveal === 'bodygraph' || infoIsOpen('concept', 'bodygraph')}
              <span class="dot-host" data-info-cat="bodygraph" data-info-kind="concept" data-info-key="bodygraph">
                <InfoDot active={infoIsOpen('concept', 'bodygraph')} label={tr('chart.whatBodygraph')} />
              </span>
            {/if}
          </span>
        </span>
      </div>
      <div class="overlay left">
        <div
          class="card type-card"
          role="presentation"
          onclick={(e) => cardClick(e, 'type')}
          onmouseover={(e) => cardOver(e, 'type')}
          onmouseleave={clearReveal}
        >
          <span class="label">
            {tr('category.type')}
            <span class="dot-h2">
              {#if cardReveal === 'type' || infoIsOpen('concept', 'type')}
                <span class="dot-host" data-info-cat="type" data-info-kind="concept" data-info-key="type">
                  <InfoDot active={infoIsOpen('concept', 'type')} label={tr('chart.whatType')} />
                </span>
              {/if}
            </span>
          </span>
          <div class="type-list">
            {#each TYPES as t, i}
              <span class="tchip" class:on={chart.type === t.key} data-inner-key={`type:${t.key}`}>
                {t.label}
                {#if innerReveal === `type:${t.key}` || infoIsOpen('type', t.key)}
                  <span class="dot-slot" data-info-cat="type" data-info-kind="type" data-info-key={t.key}>
                    <InfoDot active={infoIsOpen('type', t.key)} label={t.label} />
                  </span>
                {/if}
              </span>
              {#if i === 1}
                <span class="row-break" aria-hidden="true"></span>
              {/if}
            {/each}
          </div>
        </div>
        <div
          class="card"
          role="presentation"
          onclick={(e) => cardClick(e, 'strategy')}
          onmouseover={(e) => cardOver(e, 'strategy')}
          onmouseleave={clearReveal}
        >
          <span class="label">
            {tr('category.strategy')}
            <span class="dot-h2">
              {#if cardReveal === 'strategy' || infoIsOpen('concept', 'strategy')}
                <span class="dot-host" data-info-cat="strategy" data-info-kind="concept" data-info-key="strategy">
                  <InfoDot active={infoIsOpen('concept', 'strategy')} label={tr('chart.whatStrategy')} />
                </span>
              {/if}
            </span>
          </span>
          <span class="value" data-inner-key="strategy:value"
            >{STRATEGY_LABELS[chart.strategy] ?? chart.strategy}{#if innerReveal === 'strategy:value' || infoIsOpen('strategy', chart.strategy)}<span
              class="dot-side"
              data-info-cat="strategy" data-info-kind="strategy" data-info-key={chart.strategy}
            ><InfoDot active={infoIsOpen('strategy', chart.strategy)} label={tr('chart.moreStrategy')} /></span>{/if}</span>
        </div>
        <div
          class="card"
          role="presentation"
          onclick={(e) => cardClick(e, 'authority')}
          onmouseover={(e) => cardOver(e, 'authority')}
          onmouseleave={clearReveal}
        >
          <span class="label">
            {tr('category.authority')}
            <span class="dot-h2">
              {#if cardReveal === 'authority' || infoIsOpen('concept', 'authority')}
                <span class="dot-host" data-info-cat="authority" data-info-kind="concept" data-info-key="authority">
                  <InfoDot active={infoIsOpen('concept', 'authority')} label={tr('chart.whatAuthority')} />
                </span>
              {/if}
            </span>
          </span>
          <span class="value" data-inner-key="authority:value"
            >{AUTHORITY_LABELS[chart.authority] ?? chart.authority}{#if innerReveal === 'authority:value' || infoIsOpen('authority', chart.authority)}<span
              class="dot-side"
              data-info-cat="authority" data-info-kind="authority" data-info-key={chart.authority}
            ><InfoDot active={infoIsOpen('authority', chart.authority)} label={tr('chart.moreAuthority')} /></span>{/if}</span>
        </div>
        <!-- Signals: one card, two values, each with its own "i" (the card's
             concept "i" explains what signals are). They sit right after
             Authority because they close that chain — type → strategy →
             authority → "how do I know I'm getting it right?". -->
        {#if signalNames}
          <div
            class="card"
            role="presentation"
            onclick={(e) => cardClick(e, 'signal')}
            onmouseover={(e) => cardOver(e, 'signal')}
            onmouseleave={clearReveal}
          >
            <span class="label">
              {tr('category.signals')}
              <span class="dot-h2">
                {#if cardReveal === 'signal' || infoIsOpen('concept', 'signal')}
                  <span class="dot-host" data-info-cat="signals" data-info-kind="concept" data-info-key="signal">
                    <InfoDot active={infoIsOpen('concept', 'signal')} label={tr('chart.whatSignals')} />
                  </span>
                {/if}
              </span>
            </span>
            <span class="value sig" data-inner-key="signal:aligned"
              ><span class="sig-k">{SIGNAL_LABELS.aligned}</span>{signalNames.aligned}{#if innerReveal === 'signal:aligned' || infoIsOpen('signal', 'aligned')}<span
                class="dot-side"
                data-info-cat="signal" data-info-kind="signal" data-info-key="aligned"
              ><InfoDot active={infoIsOpen('signal', 'aligned')} label={tr('chart.moreSignalAligned')} /></span>{/if}</span>
            <span class="value sig" data-inner-key="signal:misaligned"
              ><span class="sig-k">{SIGNAL_LABELS.misaligned}</span>{signalNames.misaligned}{#if innerReveal === 'signal:misaligned' || infoIsOpen('signal', 'misaligned')}<span
                class="dot-side"
                data-info-cat="signal" data-info-kind="signal" data-info-key="misaligned"
              ><InfoDot active={infoIsOpen('signal', 'misaligned')} label={tr('chart.moreSignalMisaligned')} /></span>{/if}</span>
          </div>
        {/if}
        <div
          class="card"
          role="presentation"
          onclick={(e) => cardClick(e, 'profile')}
          onmouseover={(e) => cardOver(e, 'profile')}
          onmouseleave={clearReveal}
        >
          <span class="label">
            {tr('category.profile')}
            <span class="dot-h2">
              {#if cardReveal === 'profile' || infoIsOpen('concept', 'profile')}
                <span class="dot-host" data-info-cat="profile" data-info-kind="concept" data-info-key="profile">
                  <InfoDot active={infoIsOpen('concept', 'profile')} label={tr('chart.whatProfile')} />
                </span>
              {/if}
            </span>
          </span>
          <span class="value" data-inner-key="profile:value"
            >{chart.profile}{#if innerReveal === 'profile:value' || infoIsOpen('profile', chart.profile)}<span
              class="dot-side"
              data-info-cat="profile" data-info-kind="profile" data-info-key={chart.profile}
            ><InfoDot active={infoIsOpen('profile', chart.profile)} label={tr('chart.moreProfile')} /></span>{/if}</span>
        </div>
        <!-- Incarnation cross. The four Sun/Earth gates ride the label's line
             (right-aligned) so the long angle name keeps the full width to
             itself; each gate opens its own drawer. -->
        {#if chart.cross}
          <div
            class="card cross-card"
            role="presentation"
            onclick={(e) => cardClick(e, 'cross')}
            onmouseover={(e) => cardOver(e, 'cross')}
            onmouseleave={clearReveal}
          >
            <span class="label">
              {tr('category.cross')}
              <span class="dot-h2">
                {#if cardReveal === 'cross' || infoIsOpen('concept', 'cross')}
                  <span class="dot-host" data-info-cat="cross" data-info-kind="concept" data-info-key="cross">
                    <InfoDot active={infoIsOpen('concept', 'cross')} label={tr('chart.whatCross')} />
                  </span>
                {/if}
              </span>
              <span class="xgates">
                {#each chart.cross.gates as g, i}
                  <button class="xgate" onclick={(e) => actClick(e, g)}>{g}</button
                  >{#if i === 0 || i === 2}<span class="xsep" aria-hidden="true">/</span>{:else if i === 1}<span
                      class="xsep bar"
                      aria-hidden="true">|</span
                    >{/if}
                {/each}
              </span>
            </span>
            <span class="value" data-inner-key="cross:value"
              >{CROSS_LABELS[chart.cross.angle] ?? chart.cross.angle}{#if innerReveal === 'cross:value' || infoIsOpen('cross', chart.cross.angle)}<span
                class="dot-side"
                data-info-cat="cross" data-info-kind="cross" data-info-key={chart.cross.angle}
              ><InfoDot active={infoIsOpen('cross', chart.cross.angle)} label={tr('chart.moreCross')} /></span>{/if}</span>
          </div>
        {/if}
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
            {tr('chart.hCenters')}
            <span class="count" data-tip={tr('chart.definedCenters')}>({chart.definedCenters.length})</span>
            <span class="dot-h2">
              {#if cardReveal === 'center' || infoIsOpen('concept', 'center')}
                <span class="dot-host" data-info-cat="centers" data-info-kind="concept" data-info-key="center">
                  <InfoDot active={infoIsOpen('concept', 'center')} label={tr('chart.whatCenters')} />
                </span>
              {/if}
            </span>
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
                  <span class="dot-slot" data-info-cat="center" data-info-kind="center" data-info-key={c}>
                    <InfoDot active={infoIsOpen('center', c)} label={CENTER_LABELS[c]} />
                  </span>
                {/if}
              </span>
            {/each}
          </div>
        </div>
        <!-- Definition sits under Centres: it *is* a statement about how the
             defined centres group together, so it explains itself here. -->
        <div
          class="card pointer"
          role="presentation"
          onmouseenter={() => setHover({ kind: 'definition', gates: [] })}
          onmouseleave={() => { setHover(null); clearReveal(); }}
          onmouseover={(e) => cardOver(e, 'definition')}
          onclick={(e) => cardClick(e, 'definition', () => pin(e, { kind: 'definition', gates: [] }))}
        >
          <span class="label">
            {tr('category.definition')}
            <span class="dot-h2">
              {#if cardReveal === 'definition' || infoIsOpen('concept', 'definition')}
                <span class="dot-host" data-info-cat="definition" data-info-kind="concept" data-info-key="definition">
                  <InfoDot active={infoIsOpen('concept', 'definition')} label={tr('chart.whatDefinition')} />
                </span>
              {/if}
            </span>
          </span>
          <span class="value" data-inner-key="definition:value"
            >{DEFINITION_LABELS[chart.definition] ?? chart.definition}{#if innerReveal === 'definition:value' || infoIsOpen('definition', chart.definition)}<span
              class="dot-side"
              data-info-cat="definition" data-info-kind="definition" data-info-key={chart.definition}
            ><InfoDot active={infoIsOpen('definition', chart.definition)} label={tr('chart.moreDefinition')} /></span>{/if}</span>
        </div>
      </div>

      <Bodygraph
        {chart}
        highlight={graphHighlight}
        onCenterHover={(c) => setHover(c ? { kind: 'center', center: c, gates: [] } : null)}
        onCenterClick={(e, c) => onSvgCenterClick(e, c)}
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
            {tr('chart.completeChannels')} ({chart.activeChannels.length})
            <span class="dot-h2">
              {#if cardReveal === 'channels' || infoIsOpen('concept', 'channel')}
                <span class="dot-host" data-info-cat="channels" data-info-kind="concept" data-info-key="channel">
                  <InfoDot active={infoIsOpen('concept', 'channel')} label={tr('chart.whatChannels')} />
                </span>
              {/if}
            </span>
          </h2>
          {#if chart.activeChannels.length === 0}
            <p class="none">{tr('chart.noneM')}</p>
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
                    onclick={(e) => onChipClick(e, { kind: 'channel', gates: [g1, g2] }, `channel:${g1}-${g2}`)}
                  >
                    {g1}-{g2}
                  </span>
                  {#if innerReveal === `channel:${g1}-${g2}` || infoIsOpen('channel', `${g1}-${g2}`)}
                    <span class="dot-slot" data-info-cat="channel" data-info-kind="channel" data-info-key={`${g1}-${g2}`}>
                      <InfoDot active={infoIsOpen('channel', `${g1}-${g2}`)} label={`${g1}-${g2}`} />
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
            {tr('chart.hHangingGates')}
            <span
              class="count"
              data-tip={tr('chart.hangingTip', { a: hangingGates.length - hangingInDefined, b: hangingInDefined })}
            >({hangingGates.length})</span>
            <span class="dot-h2">
              {#if cardReveal === 'gates' || infoIsOpen('concept', 'gate')}
                <span class="dot-host" data-info-cat="gates" data-info-kind="concept" data-info-key="gate">
                  <InfoDot active={infoIsOpen('concept', 'gate')} label={tr('chart.whatGates')} />
                </span>
              {/if}
            </span>
          </h2>
          {#if hangingGates.length === 0}
            <p class="none">{tr('chart.noneF')}</p>
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
                    onclick={(e) => onChipClick(e, { kind: 'gate', gates: [g] }, `gate:${g}`)}
                  >
                    {g}
                  </span>
                  {#if innerReveal === `gate:${g}` || infoIsOpen('gate', `${g}`)}
                    <span class="dot-slot" data-info-cat="gate" data-info-kind="gate" data-info-key={`${g}`}>
                      <InfoDot active={infoIsOpen('gate', `${g}`)} label={`${g}`} />
                    </span>
                  {/if}
                </span>
              {/each}
            </div>
          {/if}
        </div>
      </section>
    </div>

    <section class="activations">
      <div
        class="info-zone"
        role="presentation"
        onclick={(e) => cardClick(e, 'activations')}
        onmouseover={(e) => cardOver(e, 'activations')}
        onmouseleave={clearReveal}
      >
        <h2>
          {tr('chart.hActivations')}
          <span class="dot-h2">
            {#if cardReveal === 'activations' || infoIsOpen('concept', 'activation')}
              <span class="dot-host" data-info-cat="activationCol" data-info-kind="concept" data-info-key="activation">
                <InfoDot active={infoIsOpen('concept', 'activation')} label={tr('chart.whatActivations')} />
              </span>
            {/if}
          </span>
        </h2>
        <div class="acts-scroll">
        <table>
          <thead>
            <tr>
              <th></th>
              <th data-inner-key="actcol:personality">
                <span class="side-head" data-tip={tr('chart.tipPersonality')}>{tr('chart.colPersonality')}<span class="side-dot personality" aria-hidden="true"></span><span class="dot-side head-i" data-info-cat="activationCol" data-info-kind="activationCol" data-info-key="personality">{#if innerReveal === 'actcol:personality' || infoIsOpen('activationCol', 'personality')}<InfoDot active={infoIsOpen('activationCol', 'personality')} label={tr('chart.whatPersonality')} />{/if}</span></span>
              </th>
              <th data-inner-key="actcol:design">
                <span class="side-head" data-tip={tr('chart.tipDesign')}>{tr('chart.colDesign')}<span class="side-dot design" aria-hidden="true"></span><span class="dot-side head-i" data-info-cat="activationCol" data-info-kind="activationCol" data-info-key="design">{#if innerReveal === 'actcol:design' || infoIsOpen('activationCol', 'design')}<InfoDot active={infoIsOpen('activationCol', 'design')} label={tr('chart.whatDesign')} />{/if}</span></span>
              </th>
              <th class="weight-col" data-inner-key="actcol:weight">
                <span class="side-head" data-tip={tr('chart.tipWeight')}>{tr('chart.colWeight')}<span class="dot-side head-i" data-info-cat="activationCol" data-info-kind="activationCol" data-info-key="weight">{#if innerReveal === 'actcol:weight' || infoIsOpen('activationCol', 'weight')}<InfoDot active={infoIsOpen('activationCol', 'weight')} label={tr('chart.whatWeight')} />{/if}</span></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {#each (showAllPlanets ? PLANETS : PLANETS.slice(0, 5)) as p}
              {@const w = getActivationWeight(p)}
              <tr>
                <td class="planet" data-inner-key={`planet:${p}`}>
                  <span class="psym">{PLANET_SYMBOLS[p]}</span>{PLANET_LABELS[p]}{#if innerReveal === `planet:${p}` || infoIsOpen('planet', p)}<span class="dot-side" data-info-cat="planet" data-info-kind="planet" data-info-key={p}><InfoDot active={infoIsOpen('planet', p)} label={PLANET_LABELS[p]} /></span>{/if}
                </td>
                <td>
                  <span class="act" class:hl={actHl(chart.personality[p].gate)}
                    ><button class="act-btn" onclick={(e) => actClick(e, chart.personality[p].gate)}>{chart.personality[p].gate}</button><span class="act-sep">.</span><button class="act-btn" onclick={(e) => actLineClick(e, chart.personality[p].line)}>{chart.personality[p].line}</button></span>
                </td>
                <td>
                  <span class="act" class:hl={actHl(chart.design[p].gate)}
                    ><button class="act-btn" onclick={(e) => actClick(e, chart.design[p].gate)}>{chart.design[p].gate}</button><span class="act-sep">.</span><button class="act-btn" onclick={(e) => actLineClick(e, chart.design[p].line)}>{chart.design[p].line}</button></span>
                </td>
                <td class="weight-col">
                  {#if w}<span class="weight-val" data-tier={w.tier}>{w.label}</span>{/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        </div>
        <button class="show-more" onclick={(e) => { e.stopPropagation(); showAllPlanets = !showAllPlanets; }}>
          {showAllPlanets ? tr('chart.showLess') + ' ▴' : tr('chart.showMore') + ' ▾'}
        </button>
      </div>
    </section>

    <footer>
      {#if install.mode}
        <button class="install-link" type="button" onclick={onInstallClick}>{tr('install.link')}</button>
        <span aria-hidden="true">·</span>
      {/if}
      <ReportBug version={version} />
      <span aria-hidden="true">·</span>
      <a class="foot-link" href={`/${lang}/privacy`}>{tr('footer.privacy')}</a>
      <span aria-hidden="true">·</span>
      <About version={version} onElement={(kind, key) => openInfoFor(kind, kind, key)} />
    </footer>
  {/if}
</main>

<ElementInfo
  open={infoOpen}
  category={infoTop ? (CATEGORY_BY_KIND[infoTop.catKey] ?? '') : ''}
  info={infoTop?.info ?? null}
  prompts={infoTop?.prompts ?? null}
  elementKey={infoTop ? `${infoTop.kind}:${infoTop.key}` : ''}
  canBack={infoStack.length > 1}
  onback={backInfo}
  onnavigate={navigateInfo}
  onclose={closeInfo}
/>

<InitialReport
  open={reportOpen}
  {chart}
  onnavigate={(kind, key) => openInfoFor(CATEGORY_BY_KIND[kind] ?? '', kind, key)}
  ondownloadpdf={downloadReportPdf}
  onshare={shareReportLink}
  onclose={() => (reportOpen = false)}
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    padding: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    cursor: pointer;
  }
  /* Same square-rounded shape and size as the share/download buttons, in gold —
     so the header doesn't mix too many button styles. */
  .report-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    flex: none;
    height: 2rem;
    padding: 0 0.6rem;
    background: var(--accent-soft);
    border: 1px solid var(--accent);
    color: var(--accent);
    border-radius: var(--radius);
    cursor: pointer;
    font-family: inherit;
  }
  .report-btn svg {
    width: 16px;
    height: 16px;
  }
  .report-lbl {
    font-size: 0.85rem;
    font-weight: 500;
  }
  /* Mobile: icon only by default; the "Informe" word shows only when the
     header has room for it (hdr-full — see fitHeader). */
  @media (max-width: 679px) {
    .report-lbl {
      display: none;
    }
    .report-btn {
      width: 2rem;
      padding: 0;
      gap: 0;
    }
    header.hdr-full .report-lbl {
      display: inline;
    }
    header.hdr-full .report-btn {
      width: auto;
      padding: 0 0.6rem;
      gap: 0.4rem;
    }
  }
  .report-btn:hover {
    background: var(--accent);
    color: #1a1408;
  }
  .save {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
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
  /* The save icon and the short mobile label ("Guardar") show only on mobile;
     desktop uses the full ".save-lbl" ("Guardar carta"). */
  .save-ic {
    display: none;
  }
  .save-lbl-m {
    display: none;
  }
  /* Holds the name + the report button so the report button sits right next to
     the name; this wrap takes the space up to the right-side actions. */
  .title-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
    /* Shrink + truncate a long name with … instead of pushing the report
       button or the right-side actions. */
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  /* One-off discoverability notice for the "i" drawers. A card with a touch of
     the accent so it reads as a notice and not as body copy — but only a
     touch: it sits above the chart and must not compete with it.
     MOBILE ONLY (see the media query): on desktop the "i" appears under the
     pointer on its own. Hidden from the PNG/PDF export like the rest of the
     interactive chrome (see .capturing below). */
  .info-hint {
    display: none;
    /* Centred, so the ✕ sits on the middle of the box however many lines the
       text wraps to — not pinned to the first one. */
    align-items: center;
    gap: 0.6rem;
    margin: -0.6rem 0 1.4rem;
    padding: 0.6rem 0.7rem;
    border: 1px solid var(--accent-soft);
    border-left: 3px solid var(--accent);
    border-radius: var(--radius);
    background: var(--accent-soft);
  }
  .info-hint p {
    margin: 0;
    flex: 1;
    font-size: 0.75rem;
    line-height: 1.5;
    color: var(--text-muted);
  }
  /* The "i" is shown as the glyph the user has to look for, not spelled out —
     same circle as InfoDot, but inert (the real one lives on each element). */
  .info-hint .dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin: 0 0.1rem;
    vertical-align: -2px;
    border-radius: 50%;
    border: 1px solid #4a4a54;
    background: var(--surface-2);
    color: var(--text);
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
    font-size: 9px;
    line-height: 1;
  }
  .info-hint button {
    flex: none;
    align-self: center;
    background: none;
    border: none;
    padding: 0 0.1rem;
    color: var(--accent);
    font-size: 0.85rem;
    cursor: pointer;
    line-height: 1;
  }
  @media (max-width: 680px) {
    .info-hint {
      display: flex;
    }
  }

  /* Discreet site attribution, shown only in the downloaded PNG (the PDF cover
     is captured with .pdf-shot and gets its own native header instead). */
  .export-brand {
    display: none;
  }
  main.capturing:not(.pdf-shot) .export-brand {
    display: block;
    text-align: center;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: var(--accent);
    margin-bottom: 0.6rem;
  }

  /* Export-only layout: the back button and action buttons are filtered
     out of the PNG clone, so while capturing the title and the birth
     line are centred to keep the image header balanced.

     The chrome must ALSO be hidden in the live DOM: html-to-image copies each
     node's computed width into the clone, so .title-wrap measured with the
     "Informe" button inside stayed too wide after the filter dropped the
     button, shifting the title left of centre (bug found 2026-07-06). */
  main.capturing .back,
  main.capturing .report-btn,
  main.capturing .actions,
  main.capturing .img-actions,
  main.capturing .info-hint {
    display: none;
  }
  main.capturing header {
    justify-content: center;
  }
  /* In the PNG the buttons are filtered out, so let the title size to its text
     and centre (don't stretch/truncate it). */
  main.capturing h1 {
    flex: none;
    overflow: visible;
    white-space: normal;
  }
  main.capturing .title-wrap {
    flex: none;
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
    align-items: center;
    vertical-align: middle;
    /* Zero height so revealing the 17px "i" never grows the line box: the dot
       overflows (centred on the text line) instead of pushing the line taller,
       which otherwise nudged the value text and the activation header/rows. */
    height: 0;
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
    margin-left: 0.18rem;
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
  /* The header actions sit against the top of the page, where a tip drawn
     above gets clipped by the viewport edge — those flip below the button. */
  .img-btn[data-tip]:hover::after {
    bottom: auto;
    top: calc(100% + 7px);
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.45rem 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
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

  /* Signals card: two values in one card, each with its own "i". The polarity
     rides its own tight line above the word — side by side it overflows the
     192px column ("DESALINEAMIENTO Frustración" doesn't fit), and this way the
     card is the same height at every breakpoint. */
  .sig-k {
    display: block;
    font-size: 0.62rem;
    line-height: 1.25;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
  }
  .value.sig + .value.sig {
    margin-top: 0.25rem;
  }

  /* Incarnation cross: the four Sun/Earth gates ride the label's line, pushed
     right, so the long angle name keeps the full width below. In the narrow
     desktop column they simply wrap onto their own line. */
  .cross-card .label {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0 0.35rem;
  }
  .xgates {
    margin-left: auto;
    display: inline-flex;
    align-items: baseline;
    font-size: 0.7rem;
    letter-spacing: 0;
    text-transform: none;
    color: var(--text-muted);
  }
  .xgate {
    background: none;
    border: 0;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  .xgate:hover,
  .xgate:focus-visible {
    color: var(--accent);
  }
  .xsep {
    opacity: 0.55;
  }
  .xsep.bar {
    margin: 0 0.25rem;
  }

  /* ~8% narrower than the 720px container so the full graph fits one
     screen height more easily. The top corners of the graph are empty,
     so the info cards / centres list overlay there (3.E). */
  .graph {
    position: relative;
    max-width: 660px;
    margin: 0 auto;
  }
  /* Desktop: the label floats absolutely, centred over the head (shifted
     +46px to match the bodygraph's translate). pointer-events:none on the
     zone lets clicks fall through to the graph except on the label itself. */
  .bg-title-zone {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    transform: translateX(46px);
    z-index: 2;
    pointer-events: none;
  }
  .bg-title {
    pointer-events: auto;
    position: relative;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    /* Reserve the inline concept "i" height so revealing it doesn't shift. */
    line-height: 1.35;
  }
  /* Float the concept "i" out of flow (just right of the word) so it doesn't
     add width and pull "Bodygraph" off the SVG's horizontal centre. */
  .bg-title .dot-h2 {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 0.25rem;
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
      /* margin-top positions the whole graph below the birth line (it collapses
         through .graph, so it shifts graph + label + side cards together).
         padding-top instead drops only the SVG inside the wrap, opening ~3px of
         air between the "Bodygraph" label (fixed at graph top, level with the
         side cards) and the Head apex — without moving the label or the cards. */
      margin-top: 1.7rem;
      padding-top: 7.5px;
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
  /* Footer "privacidad" link: overrides the global accent-coloured anchor so it
     matches the muted "acerca de" / "notificar un fallo" siblings. */
  .foot-link {
    color: inherit;
    text-decoration: none;
  }
  .foot-link:hover {
    color: var(--text-muted);
  }
  /* Footer "instalar como app" link, matching the home's. */
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
    /* The cross closes the grid across both columns: its name is far longer
       than any other value, so in a half-width cell it would be 4-5 lines and
       stretch its whole row. Full width keeps it to label + one line. */
    .overlay.left .cross-card {
      grid-column: 1 / -1;
    }
    .graph > :global(.bodygraph-wrap) {
      order: 2;
    }
    /* Mobile: the label rides the graph's empty top-left corner instead of
       sitting over the head, so it adds no height and the graph doesn't drop.
       height:0 + overflow lets the text overlap the bodygraph below it. */
    .bg-title-zone {
      position: static;
      order: 2;
      justify-content: flex-start;
      align-self: flex-start;
      height: 0;
      overflow: visible;
      transform: none;
      margin: 0.1rem 0 0 0.15rem;
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
    /* Types in two left-aligned rows: G + MG, then P / M / R. The selected
       chip is taller (bigger font + padding); align-items:center keeps every
       chip on a row vertically centred so the marked one doesn't sit off. */
    .type-list {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
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
    /* Compact icon-only save by default on mobile (square, like the image
       buttons); the "Guardar" word replaces the icon when the header has room
       (hdr-full / hdr-noinforme — see fitHeader). */
    .save {
      width: 2rem;
      height: 2rem;
      padding: 0;
    }
    .save-lbl {
      display: none;
    }
    .save-ic {
      display: block;
    }
    header.hdr-full .save,
    header.hdr-noinforme .save {
      width: auto;
      height: 2rem;
      padding: 0 0.85rem;
    }
    header.hdr-full .save-lbl-m,
    header.hdr-noinforme .save-lbl-m {
      display: inline;
    }
    header.hdr-full .save-ic,
    header.hdr-noinforme .save-ic {
      display: none;
    }
  }

  /* Capture-only: while building the PDF cover (.pdf-shot, set by
     downloadReportPdf), force the desktop arrangement even on a phone — a PDF
     is a document and should carry the wide desktop layout, not the stacked
     mobile one. These rules undo the @media (max-width: 679px) block above and
     win on specificity; keep them in sync with it. Used together with
     .capturing, which centres the title and birth line. */
  main.pdf-shot {
    width: 720px;
    max-width: 720px;
  }
  main.pdf-shot .graph {
    display: block;
  }
  main.pdf-shot .overlay.left {
    position: absolute;
    top: 0;
    left: 0;
    width: 192px;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    margin-bottom: 0;
  }
  main.pdf-shot .overlay.left .card:first-child,
  main.pdf-shot .overlay.left .cross-card {
    grid-column: auto;
  }
  main.pdf-shot .overlay.right {
    position: absolute;
    top: 0;
    right: 0;
    width: 158px;
    margin-top: 0;
  }
  main.pdf-shot .graph > :global(.bodygraph-wrap) {
    order: 0;
    margin-top: 1.7rem;
    padding-top: 7.5px;
    transform: translateX(46px);
  }
  main.pdf-shot .bg-title-zone {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    order: 0;
    height: auto;
    margin: 0;
    justify-content: center;
    transform: translateX(46px);
  }
  main.pdf-shot .type-list,
  main.pdf-shot .center-list {
    flex-direction: column;
    flex-wrap: nowrap;
  }
  main.pdf-shot .type-list .row-break {
    display: none;
  }

  .none {
    color: var(--text-muted);
    font-size: 0.85rem;
    opacity: 0.7;
    margin: 0;
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
  /* Activation values are split into two buttons: the gate (→ its drawer) and
     the line (→ that line's drawer), joined by a "." separator. Reset the
     native button chrome so they read exactly like the old <span>. */
  .act-btn {
    background: none;
    font: inherit;
    color: inherit;
    cursor: pointer;
    padding: 0;
    border: 0;
  }
  .act-sep {
    pointer-events: none;
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
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    cursor: help;
  }
  /* Activations-header info "i" (text audit, jul 2026): on desktop it is a
     permanent inline slot right of the text+dot — like .dot-h2 — so revealing
     the "i" never shifts the columns. On mobile it goes back to an absolute
     overlay so it can't widen the scrollable table (see the media block). */
  .side-head .head-i {
    position: static;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 17px;
    height: 17px;
    margin: 0;
    transform: none;
    z-index: 1;
  }
  @media (max-width: 679px) {
    .side-head .head-i {
      position: absolute;
      top: 50%;
      right: -5px;
      transform: translateY(-50%);
      width: auto;
      height: auto;
    }
    .weight-col .side-head .head-i {
      top: -3px;
      right: -8px;
      transform: none;
    }
  }
  /* The activations tooltips pop *below* their header: the table scroller
     (overflow-x: auto) clips anything above it, which hid them entirely. */
  .acts-scroll .side-head:hover::after {
    bottom: auto;
    top: calc(100% + 7px);
  }
  /* Right-edge columns: right-align the tooltip so it stays inside the
     scroller instead of being clipped at its right edge. */
  .acts-scroll th:nth-child(3) .side-head:hover::after,
  .acts-scroll .weight-col .side-head:hover::after {
    left: auto;
    right: 0;
    transform: none;
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

  /* The activations table (with the weight column) is intrinsically wider than a
     phone screen; give it its own horizontal scroll so it never pushes the page
     width. On desktop the table fits, so no scrollbar shows. */
  .acts-scroll {
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
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
