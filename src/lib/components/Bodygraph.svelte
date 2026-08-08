<!-- AI-authored — SVG bodygraph for Human Design charts. -->
<!-- Layout follows the classic reference: nine centres in their           -->
<!-- standard shapes, 64 gates at canonical positions inside their centre, -->
<!-- and 36 channels routed gate-to-gate as straight lines.                 -->
<!--                                                                         -->
<!-- Channel rendering: each channel is drawn as two halves, each coloured  -->
<!-- by its near-gate's activation state.                                    -->
<!--   Personality = bright white, Design = red/pink,                        -->
<!--   Both = white stripes over red (Phase 3.D),                            -->
<!--   Inactive = visible white-grey skeleton.                               -->
<!-- Straight halves use stroke-linecap=butt so the two halves meet cleanly  -->
<!-- at the midpoint. Integration-circuit polylines use round caps/joins so  -->
<!-- the bends and the A/B joint don't leave miter spikes or notches         -->
<!-- (Phase 3.D); the round end bulges at the gates are hidden under the     -->
<!-- centre shapes, which are painted on top.                                -->
<!--                                                                         -->
<!-- Parallel channels emerge naturally from the reference gate coordinates  -->
<!-- (geometry rebase 2026-05-21); no perpendicular offsets are applied.     -->
<!--                                                                         -->
<!-- Gate rendering (Phase 1.4.K — uniform style):                            -->
<!--   Active (Personality / Design / Both): navy circle + white number.     -->
<!--   The Personality/Design/Both distinction is encoded by the channel    -->
<!--   halves, not the gate marker.                                          -->
<!--   Inactive: dim number only, no circle.                                  -->
<!--                                                                         -->
<!-- Centre styling: defined → coloured fill with a stroke matching the fill -->
<!-- (no visible separate border). Undefined → very dark fill with a subtle  -->
<!-- gray border (shape stays visible).                                       -->

<script>
  import { CENTERS, CHANNELS, CENTER_BY_GATE } from '$lib/hd/constants.js';
  import {
    VIEWBOX,
    CENTER_POS,
    CENTER_SHAPES,
    CENTER_COLORS_DEFINED,
    GATE_POSITIONS,
    INTEGRATION_CHANNEL_PATHS,
    centerPoints,
  } from '$lib/hd/bodygraph-geometry.js';

  /**
   * `highlight`: granular emphasis driven by the chart page —
   *   centers: outlined (gold if defined, white if undefined); the rest of
   *     the graph is muted. Gates inside highlighted centres stay legible.
   *   gates: gate markers kept at full strength.
   *   channels: 'g1-g2' keys of channels kept at full strength.
   * Muting recolours shapes toward the page background instead of using
   * opacity, so undefined centres never turn see-through.
   * `onCenterHover(center | null)` fires while the pointer is over a centre
   * shape, letting the page mirror the highlight on its chips.
   * `onCenterClick(event, center)` fires on tap/click — the page pins the
   * highlight there (the only way to trigger it on touch, where hover
   * doesn't exist).
   * `onGateClick(event, gate)` fires when a gate marker is tapped/clicked; a
   * transparent hit disc (same radius as the active gate marker) sits on top of
   * everything so a gate opens its own drawer while the rest of the centre still
   * opens the centre's.
   * @type {{
   *   chart: import('$lib/hd/chart.js').Chart,
   *   highlight?: { centers: string[], gates: number[], channels: string[] },
   *   onCenterHover?: ((center: string | null) => void) | null,
   *   onCenterClick?: ((event: MouseEvent, center: string) => void) | null,
   *   onGateClick?: ((event: MouseEvent, gate: number) => void) | null
   * }}
   */
  let {
    chart,
    highlight = { centers: [], gates: [], channels: [] },
    onCenterHover = null,
    onCenterClick = null,
    onGateClick = null
  } = $props();

  const hlCenters = $derived(new Set(highlight.centers));
  const hlGates = $derived(new Set(highlight.gates));
  const hlChannels = $derived(new Set(highlight.channels));
  // alertGates: gates marked with a red ring (e.g. the hanging gates that
  // would bridge a split definition). They stay at full strength.
  const hlAlert = $derived(new Set(highlight.alertGates ?? []));
  const dimming = $derived(hlCenters.size + hlGates.size + hlChannels.size + hlAlert.size > 0);

  function channelKept(ch) {
    return hlChannels.has(`${ch.g1}-${ch.g2}`);
  }
  function gateKept(gate) {
    return hlGates.has(gate) || hlAlert.has(gate) || hlCenters.has(CENTER_BY_GATE[gate]);
  }

  /** Opaque muting: blend a hex colour toward the page background. */
  function dimColor(hex, t = 0.7) {
    const bg = [11, 11, 13]; // --bg #0b0b0d
    const n = hex.replace('#', '');
    const ch = (i) => parseInt(n.slice(i * 2, i * 2 + 2), 16);
    const mix = (i) => Math.round(ch(i) + (bg[i] - ch(i)) * t);
    return `rgb(${mix(0)} ${mix(1)} ${mix(2)})`;
  }

  /**
   * Polygon centres get their sharp corners rounded by replacing each
   * vertex with a small quadratic curve (rects already use rx).
   * @param {string} center @param {number} r corner radius in viewBox px
   */
  function roundedPolyPath(center, r = 16) {
    const pts = centerPoints(center)
      .trim()
      .split(/\s+/)
      .map((p) => p.split(',').map(Number));
    const n = pts.length;
    let d = '';
    for (let i = 0; i < n; i++) {
      const prev = pts[(i - 1 + n) % n];
      const cur = pts[i];
      const next = pts[(i + 1) % n];
      const v1 = [cur[0] - prev[0], cur[1] - prev[1]];
      const v2 = [next[0] - cur[0], next[1] - cur[1]];
      const l1 = Math.hypot(v1[0], v1[1]);
      const l2 = Math.hypot(v2[0], v2[1]);
      const r1 = Math.min(r, l1 / 2);
      const r2 = Math.min(r, l2 / 2);
      const ax = cur[0] - (v1[0] / l1) * r1;
      const ay = cur[1] - (v1[1] / l1) * r1;
      const bx = cur[0] + (v2[0] / l2) * r2;
      const by = cur[1] + (v2[1] / l2) * r2;
      d += (i === 0 ? `M ${ax} ${ay}` : ` L ${ax} ${ay}`) + ` Q ${cur[0]} ${cur[1]} ${bx} ${by}`;
    }
    return d + ' Z';
  }

  // ── Activation lookup ──────────────────────────────────────────────────────
  const persGates = new Set(Object.values(chart.personality).map((a) => a.gate));
  const desGates  = new Set(Object.values(chart.design).map((a) => a.gate));

  /** @param {number} gate */
  function gateState(gate) {
    const p = persGates.has(gate);
    const d = desGates.has(gate);
    if (p && d) return 'both';
    if (p)      return 'pers';
    if (d)      return 'des';
    return 'inactive';
  }

  // ── Colour palette ─────────────────────────────────────────────────────────
  // Phase 1.4.K: inactive raised to a visible white-grey so the bodygraph
  // skeleton is always present. Personality is the same hue,
  // just brighter, so structure-vs-activation reads via brightness + the
  // gate markers themselves.
  const PERS_COLOR     = '#ffffff'; // white — Personality activations
  const DES_COLOR      = '#e84672'; // hot pink-red — Design activations
  const INACTIVE_COLOR = '#606070'; // muted gray — visible skeleton

  function halfColor(state) {
    if (state === 'des' || state === 'both') return DES_COLOR;
    if (state === 'pers') return PERS_COLOR;
    return INACTIVE_COLOR; // inactive — just a ghost skeleton
  }

  // ── Channel halves (pre-computed) ──────────────────────────────────────────
  const channelHalves = CHANNELS.map(([g1, g2]) => {
    const s1 = gateState(g1);
    const s2 = gateState(g2);
    const c1 = halfColor(s1);
    const c2 = halfColor(s2);
    const both1 = s1 === 'both';
    const both2 = s2 === 'both';
    const custom = INTEGRATION_CHANNEL_PATHS[`${g1}-${g2}`];
    if (custom) {
      return { custom: true, pathA: custom.pathA, pathB: custom.pathB, c1, c2, both1, both2, g1, g2, s1, s2 };
    }
    const p1 = GATE_POSITIONS[g1];
    const p2 = GATE_POSITIONS[g2];
    return {
      custom: false,
      x1: p1.x, y1: p1.y,
      mx: (p1.x + p2.x) / 2, my: (p1.y + p2.y) / 2,
      x2: p2.x, y2: p2.y,
      c1, c2, both1, both2, g1, g2, s1, s2,
    };
  });

  // "Both" halves: white stripes painted over the red base so the half
  // reads as Personality+Design instead of pure Design. Ratio ~30% white
  // / 70% red (user preference, Phase 3.E).
  const STRIPE_DASH = '10 22';

  // ── Gate render entries (one per gate, all 64) ─────────────────────────────
  const definedCenterSet = new Set(chart.definedCenters);

  // Inactive gate numbers on a defined centre: the dark purple reads on
  // every defined fill except Root's dark brown, which needs a light tone.
  const INACTIVE_TEXT_ON_DEFINED = { root: '#d8c8b0' };

  const gateEntries = Object.entries(GATE_POSITIONS).map(([gateStr, pos]) => {
    const gate = Number(gateStr);
    const state = gateState(gate);
    return {
      gate, pos, state,
      active: state !== 'inactive',
      inDefinedCenter: definedCenterSet.has(CENTER_BY_GATE[gate]),
    };
  });
</script>

<div class="bodygraph-wrap">
  <svg
    viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Bodygraph Human Design"
  >
    <!-- ── 0. Human bust (decorative, behind everything) ─────────────────── -->
    <!-- Ethereal head + shoulders: earless dome wrapping Head+Ajna, neck at
         the Throat, sloping shoulders. Below the chest the shape dissolves
         via a vertical fade (no outline), softened by a light blur. -->
    <defs>
      <linearGradient id="silhouette-fade" gradientUnits="userSpaceOnUse" x1="0" y1="100" x2="0" y2="945">
        <stop offset="0" stop-color="#171f2e" />
        <stop offset="0.58" stop-color="#171f2e" />
        <stop offset="0.82" stop-color="#171f2e" stop-opacity="0.25" />
        <stop offset="1" stop-color="#171f2e" stop-opacity="0" />
      </linearGradient>
      <!-- Banding fixes: filters default to 8-bit linearRGB, which collapses
           these dark sRGB tones into ~5 levels (huge bands) — force sRGB
           interpolation. Residual 1-level quantisation steps are broken up
           by fine noise grain clipped to the shape's own alpha (dithering). -->
      <filter id="silhouette-blur" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="shape" />
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="7" result="noise" />
        <feColorMatrix in="noise" type="matrix"
          values="0 0 0 0 0.090
                  0 0 0 0 0.122
                  0 0 0 0 0.180
                  0 0 0 0.10 0" result="dither" />
        <feComposite in="dither" in2="shape" operator="in" result="ditherIn" />
        <feMerge>
          <feMergeNode in="shape" />
          <feMergeNode in="ditherIn" />
        </feMerge>
      </filter>
    </defs>
    <g fill="url(#silhouette-fade)" filter="url(#silhouette-blur)" pointer-events="none" aria-hidden="true">
      <path d="M524 118
               C 440 118, 398 190, 398 290
               C 398 360, 430 425, 468 452
               C 480 470, 482 485, 480 505
               C 430 540, 345 562, 285 612
               C 250 660, 140 840, 30 1000
               L 1018 1000
               C 908 840, 798 660, 763 612
               C 703 562, 618 540, 568 505
               C 566 485, 568 470, 580 452
               C 618 425, 650 360, 650 290
               C 650 190, 608 118, 524 118 Z" />
    </g>

    <!-- ── 1. Channels (two halves per channel, behind the centres) ──────── -->
    <!-- Two passes: inactive halves first, active halves on top. The
         integration trunk (Q→Q2) is shared by the x-34 paths (coloured by
         gate 34) and the Q→57 halves (coloured by gate 57); without this
         z-order an inactive grey half paints over a completed channel's
         stretch there (e.g. 20-34 complete with 57 undefined). -->
    <!-- Dimming uses opaque dimColor (like the centres) instead of group
         opacity: the integration polylines overlap on shared trunk stretches,
         and stacked translucency there would read brighter than the rest. -->
    {#snippet channelHalf(ch, half)}
      {@const dim = dimming && !channelKept(ch)}
      {@const baseColor = half === 'a' ? ch.c1 : ch.c2}
      {@const color = dim ? dimColor(baseColor, 0.78) : baseColor}
      {@const stripeColor = dim ? dimColor(PERS_COLOR, 0.78) : PERS_COLOR}
      {@const striped = half === 'a' ? ch.both1 : ch.both2}
      <g>
        {#if ch.custom}
          {@const pts = half === 'a' ? ch.pathA : ch.pathB}
          <polyline points={pts} fill="none"
            stroke={color} stroke-width="12" stroke-linecap="round" stroke-linejoin="round"
          />
          {#if striped}
            <polyline points={pts} fill="none"
              stroke={stripeColor} stroke-width="12" stroke-linecap="butt"
              stroke-linejoin="round" stroke-dasharray={STRIPE_DASH}
            />
          {/if}
        {:else}
          {@const x1 = half === 'a' ? ch.x1 : ch.mx}
          {@const y1 = half === 'a' ? ch.y1 : ch.my}
          {@const x2 = half === 'a' ? ch.mx : ch.x2}
          {@const y2 = half === 'a' ? ch.my : ch.y2}
          <line {x1} {y1} {x2} {y2} stroke={color} stroke-width="12" stroke-linecap="butt" />
          {#if striped}
            <line {x1} {y1} {x2} {y2}
              stroke={stripeColor} stroke-width="12" stroke-linecap="butt"
              stroke-dasharray={STRIPE_DASH}
            />
          {/if}
        {/if}
      </g>
    {/snippet}
    <!-- Dimmed halves paint before kept ones for the same reason: the
         opaque dim colour would otherwise cover a highlighted channel's
         stretch of the shared trunk (e.g. hovering the 20-34 chip while
         10-34 shares Q→Q2). -->
    <g>
      {#each [true, false] as dimPass}
        {#each [false, true] as activePass}
          {#each channelHalves as ch}
            {#if (dimming && !channelKept(ch)) === dimPass}
              {#if (ch.s1 !== 'inactive') === activePass}
                {@render channelHalf(ch, 'a')}
              {/if}
              {#if (ch.s2 !== 'inactive') === activePass}
                {@render channelHalf(ch, 'b')}
              {/if}
            {/if}
          {/each}
        {/each}
      {/each}
    </g>

    <!-- ── 2. Centres ────────────────────────────────────────────────────── -->
    <g>
      {#each CENTERS as center}
        {@const defined   = chart.definedCenters.includes(center)}
        {@const pos       = CENTER_POS[center]}
        {@const s         = CENTER_SHAPES[center]}
        {@const isHl      = hlCenters.has(center)}
        {@const dim       = dimming && !isHl}
        {@const baseFill  = defined ? CENTER_COLORS_DEFINED[center] : '#181823'}
        {@const fill      = dim ? dimColor(baseFill) : baseFill}
        {@const baseStrk  = defined ? CENTER_COLORS_DEFINED[center] : '#46465a'}
        {@const stroke    = isHl ? (defined ? '#d4a657' : '#ffffff') : dim ? dimColor(baseStrk) : baseStrk}
        {@const sw        = isHl ? 6 : 3}

        {#if s.type === 'rect'}
          <rect
            x={pos.x - s.w / 2} y={pos.y - s.h / 2}
            width={s.w} height={s.h} rx="11"
            {fill} {stroke} stroke-width={sw}
            class="center-shape"
            onmouseenter={() => onCenterHover?.(center)}
            onmouseleave={() => onCenterHover?.(null)}
            onclick={(e) => onCenterClick?.(e, center)}
          />
        {:else}
          <path
            d={roundedPolyPath(center)}
            {fill} {stroke} stroke-width={sw} stroke-linejoin="round"
            class="center-shape"
            onmouseenter={() => onCenterHover?.(center)}
            onmouseleave={() => onCenterHover?.(null)}
            onclick={(e) => onCenterClick?.(e, center)}
          />
        {/if}
      {/each}
    </g>

    <!-- ── 3. Gate markers + numbers (Phase 1.4.K — uniform style) ────────── -->
    <g>
      {#each gateEntries as g}
        {@const gd = dimming && !gateKept(g.gate)}
        {@const alert = hlAlert.has(g.gate)}
        {@const baseText = g.active
          ? '#ffffff'
          : g.inDefinedCenter
            ? (INACTIVE_TEXT_ON_DEFINED[CENTER_BY_GATE[g.gate]] ?? '#4a2060')
            : '#aaaab4'}
        <g pointer-events="none">
          {#if g.active}
            <circle
              cx={g.pos.x} cy={g.pos.y} r="15"
              fill={gd ? dimColor('#4a2060', 0.45) : '#4a2060'}
              stroke={gd ? dimColor('#5a5a62', 0.45) : '#5a5a62'}
              stroke-width="1.5"
            />
          {/if}
          {#if alert}
            <circle
              cx={g.pos.x} cy={g.pos.y} r="16"
              fill="none" stroke="#e84672" stroke-width="4"
            />
          {/if}
          <text
            x={g.pos.x} y={g.pos.y}
            text-anchor="middle" dominant-baseline="central"
            fill={gd ? dimColor(baseText, 0.5) : baseText}
            font-size="17"
            font-weight={g.active ? '600' : '400'}
            font-family="system-ui, sans-serif"
          >{g.gate}</text>
        </g>
      {/each}
    </g>

    <!-- ── 4. Gate hit targets (transparent, on top) ─────────────────────── -->
    <!-- One clickable disc per gate, sized to the active gate marker (r=15), so
         tapping a gate opens its drawer while the rest of the centre still
         opens the centre's. Painted last so it wins over the centre shape
         underneath. Only rendered when a handler is wired. -->
    {#if onGateClick}
      <g>
        {#each gateEntries as g}
          <circle
            cx={g.pos.x} cy={g.pos.y} r="15"
            fill="transparent"
            class="gate-hit"
            role="button"
            aria-label={`Gate ${g.gate}`}
            onclick={(e) => { e.stopPropagation(); onGateClick(e, g.gate); }}
          />
        {/each}
      </g>
    {/if}
  </svg>
</div>

<style>
  .bodygraph-wrap {
    width: 100%;
    max-width: 420px;
    margin: 0 auto 0.25rem;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .center-shape {
    cursor: pointer;
  }

  .gate-hit {
    cursor: pointer;
  }
</style>
