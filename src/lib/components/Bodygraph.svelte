<!-- AI-authored — SVG bodygraph for Human Design charts. -->
<!-- Layout follows the classic reference: nine centres in their           -->
<!-- standard shapes, 64 gates at canonical positions inside their centre, -->
<!-- and 36 channels routed gate-to-gate as straight lines.                 -->
<!--                                                                         -->
<!-- Channel rendering: each channel is drawn as two halves, each coloured  -->
<!-- by its near-gate's activation state.                                    -->
<!--   Personality = bright white, Design = red/pink,                        -->
<!--   Both = red/pink, Inactive = visible white-grey skeleton.              -->
<!-- Channel halves use stroke-linecap=butt so the two halves meet cleanly   -->
<!-- at the midpoint instead of bulging with rounded caps.                    -->
<!--                                                                         -->
<!-- Parallel channels: groups of channels that connect the same pair of     -->
<!-- centres are offset perpendicularly so they appear as parallel lines     -->
<!-- instead of overlapping. 10 such groups exist (2-4 channels each).       -->
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

  /** @type {import('$lib/hd/chart.js').Chart} */
  let { chart } = $props();

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
  const PERS_COLOR     = '#9898a8'; // dark gray — Personality activations
  const DES_COLOR      = '#e84672'; // hot pink-red — Design activations
  const INACTIVE_COLOR = '#dadce0'; // light grey-white — visible skeleton

  function halfColor(state) {
    if (state === 'des' || state === 'both') return DES_COLOR;
    if (state === 'pers') return PERS_COLOR;
    return INACTIVE_COLOR; // inactive — just a ghost skeleton
  }

  // ── Channel halves (pre-computed) ──────────────────────────────────────────
  const channelHalves = CHANNELS.map(([g1, g2]) => {
    const c1 = halfColor(gateState(g1));
    const c2 = halfColor(gateState(g2));
    const custom = INTEGRATION_CHANNEL_PATHS[`${g1}-${g2}`];
    if (custom) {
      return { custom: true, pathA: custom.pathA, pathB: custom.pathB, c1, c2 };
    }
    const p1 = GATE_POSITIONS[g1];
    const p2 = GATE_POSITIONS[g2];
    return {
      custom: false,
      x1: p1.x, y1: p1.y,
      mx: (p1.x + p2.x) / 2, my: (p1.y + p2.y) / 2,
      x2: p2.x, y2: p2.y,
      c1, c2,
    };
  });

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
    <!-- ── 1. Channels (two halves per channel, behind the centres) ──────── -->
    <g>
      {#each channelHalves as ch}
        {#if ch.custom}
          <polyline points={ch.pathA} fill="none"
            stroke={ch.c1} stroke-width="12" stroke-linecap="butt" stroke-linejoin="miter"
          />
          <polyline points={ch.pathB} fill="none"
            stroke={ch.c2} stroke-width="12" stroke-linecap="butt" stroke-linejoin="miter"
          />
        {:else}
          <line
            x1={ch.x1} y1={ch.y1} x2={ch.mx} y2={ch.my}
            stroke={ch.c1} stroke-width="12" stroke-linecap="butt"
          />
          <line
            x1={ch.mx} y1={ch.my} x2={ch.x2} y2={ch.y2}
            stroke={ch.c2} stroke-width="12" stroke-linecap="butt"
          />
        {/if}
      {/each}
    </g>

    <!-- ── 2. Centres ────────────────────────────────────────────────────── -->
    <g>
      {#each CENTERS as center}
        {@const defined = chart.definedCenters.includes(center)}
        {@const pos     = CENTER_POS[center]}
        {@const s       = CENTER_SHAPES[center]}
        {@const fill    = defined ? CENTER_COLORS_DEFINED[center] : '#181823'}
        {@const stroke  = defined ? CENTER_COLORS_DEFINED[center] : '#46465a'}
        {@const sw      = 3}

        {#if s.type === 'rect'}
          <rect
            x={pos.x - s.w / 2} y={pos.y - s.h / 2}
            width={s.w} height={s.h} rx="11"
            {fill} {stroke} stroke-width={sw}
          />
        {:else}
          <polygon
            points={centerPoints(center)}
            {fill} {stroke} stroke-width={sw}
          />
        {/if}
      {/each}
    </g>

    <!-- ── 3. Gate markers + numbers (Phase 1.4.K — uniform style) ────────── -->
    <g>
      {#each gateEntries as g}
        {#if g.active}
          <circle
            cx={g.pos.x} cy={g.pos.y} r="15"
            fill="#4a2060" stroke="#5a5a62" stroke-width="1.5"
          />
        {/if}
        <text
          x={g.pos.x} y={g.pos.y}
          text-anchor="middle" dominant-baseline="central"
          fill={g.active ? '#ffffff' : g.inDefinedCenter ? '#4a2060' : '#909098'}
          font-size="16"
          font-weight={g.active ? '600' : '400'}
          font-family="system-ui, sans-serif"
          pointer-events="none"
        >{g.gate}</text>
      {/each}
    </g>
  </svg>
</div>

<style>
  .bodygraph-wrap {
    width: 100%;
    max-width: 460px;
    margin: 0 auto 2rem;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
