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
   * @type {{
   *   chart: import('$lib/hd/chart.js').Chart,
   *   highlight?: { centers: string[], gates: number[], channels: string[] },
   *   onCenterHover?: ((center: string | null) => void) | null
   * }}
   */
  let { chart, highlight = { centers: [], gates: [], channels: [] }, onCenterHover = null } = $props();

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
    <!-- ── 0. Faint human bust (decorative, behind everything) ───────────── -->
    <!-- Head, neck and shoulders that fade out below the chest — schematic
         on purpose, like classic HD chart backgrounds. -->
    <defs>
      <linearGradient id="silhouette-fade" gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="880">
        <stop offset="0" stop-color="#15151e" />
        <stop offset="0.45" stop-color="#15151e" />
        <stop offset="1" stop-color="#15151e" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g fill="url(#silhouette-fade)" pointer-events="none" aria-hidden="true">
      <circle cx="529" cy="160" r="115" />
      <rect x="488" y="250" width="82" height="78" rx="26" />
      <path d="M529 308
               C 425 312 352 348 310 410
               C 268 472 242 575 232 720
               L 226 870 L 832 870 L 826 720
               C 816 575 790 472 748 410
               C 706 348 633 312 529 308 Z" />
    </g>

    <!-- ── 1. Channels (two halves per channel, behind the centres) ──────── -->
    <g>
      {#each channelHalves as ch}
        <g opacity={dimming && !channelKept(ch) ? 0.22 : 1}>
        {#if ch.custom}
          <polyline points={ch.pathA} fill="none"
            stroke={ch.c1} stroke-width="12" stroke-linecap="round" stroke-linejoin="round"
          />
          {#if ch.both1}
            <polyline points={ch.pathA} fill="none"
              stroke={PERS_COLOR} stroke-width="12" stroke-linecap="butt"
              stroke-linejoin="round" stroke-dasharray={STRIPE_DASH}
            />
          {/if}
          <polyline points={ch.pathB} fill="none"
            stroke={ch.c2} stroke-width="12" stroke-linecap="round" stroke-linejoin="round"
          />
          {#if ch.both2}
            <polyline points={ch.pathB} fill="none"
              stroke={PERS_COLOR} stroke-width="12" stroke-linecap="butt"
              stroke-linejoin="round" stroke-dasharray={STRIPE_DASH}
            />
          {/if}
        {:else}
          <line
            x1={ch.x1} y1={ch.y1} x2={ch.mx} y2={ch.my}
            stroke={ch.c1} stroke-width="12" stroke-linecap="butt"
          />
          {#if ch.both1}
            <line
              x1={ch.x1} y1={ch.y1} x2={ch.mx} y2={ch.my}
              stroke={PERS_COLOR} stroke-width="12" stroke-linecap="butt"
              stroke-dasharray={STRIPE_DASH}
            />
          {/if}
          <line
            x1={ch.mx} y1={ch.my} x2={ch.x2} y2={ch.y2}
            stroke={ch.c2} stroke-width="12" stroke-linecap="butt"
          />
          {#if ch.both2}
            <line
              x1={ch.mx} y1={ch.my} x2={ch.x2} y2={ch.y2}
              stroke={PERS_COLOR} stroke-width="12" stroke-linecap="butt"
              stroke-dasharray={STRIPE_DASH}
            />
          {/if}
        {/if}
        </g>
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
          />
        {:else}
          <path
            d={roundedPolyPath(center)}
            {fill} {stroke} stroke-width={sw} stroke-linejoin="round"
            class="center-shape"
            onmouseenter={() => onCenterHover?.(center)}
            onmouseleave={() => onCenterHover?.(null)}
          />
        {/if}
      {/each}
    </g>

    <!-- ── 3. Gate markers + numbers (Phase 1.4.K — uniform style) ────────── -->
    <g>
      {#each gateEntries as g}
        {@const gd = dimming && !gateKept(g.gate)}
        {@const alert = hlAlert.has(g.gate)}
        {@const baseText = g.active ? '#ffffff' : g.inDefinedCenter ? '#4a2060' : '#aaaab4'}
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
  </svg>
</div>

<style>
  .bodygraph-wrap {
    width: 100%;
    max-width: 420px;
    margin: 0 auto 2rem;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .center-shape {
    cursor: pointer;
  }
</style>
