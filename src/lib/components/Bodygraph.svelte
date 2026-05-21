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
  const PERS_COLOR     = '#ffffff'; // pure white — Personality activations
  const DES_COLOR      = '#e84672'; // hot pink-red — Design activations
  const INACTIVE_COLOR = '#dadce0'; // light grey-white — visible skeleton
  const MARKER_FILL    = '#1c2540'; // navy behind active gate numbers

  function halfColor(state) {
    if (state === 'des' || state === 'both') return DES_COLOR;
    if (state === 'pers') return PERS_COLOR;
    return INACTIVE_COLOR; // inactive — just a ghost skeleton
  }

  // ── Parallel channel offsets (Phase 1.4.C) ─────────────────────────────────
  // Channels sharing the same centre-pair are shifted perpendicularly so
  // they appear as parallel lines rather than overlapping.
  //
  // Spacing between adjacent parallel channels (px in viewBox units).
  const PARALLEL_SPACING = 12;

  // Canonical key for a centre-pair (order-independent).
  function centrePairKey(g1, g2) {
    const c1 = CENTER_BY_GATE[g1];
    const c2 = CENTER_BY_GATE[g2];
    return c1 < c2 ? `${c1}|${c2}` : `${c2}|${c1}`;
  }

  // Group channels by centre-pair.
  const cpGroups = /** @type {Record<string, Array<[number,number]>>} */ ({});
  for (const [g1, g2] of CHANNELS) {
    const key = centrePairKey(g1, g2);
    if (!cpGroups[key]) cpGroups[key] = [];
    cpGroups[key].push([g1, g2]);
  }

  // For each multi-channel group, compute a shared perpendicular direction
  // (perpendicular to the mean direction of all channels in the group).
  // Then assign each channel its scalar offset along that perpendicular.
  /** @type {Record<string, { ox: number, oy: number }>} */
  const channelOffsets = {};

  for (const [, channels] of Object.entries(cpGroups)) {
    if (channels.length <= 1) continue;

    // Mean direction unit vector across all channels in the group.
    let sumDx = 0, sumDy = 0;
    for (const [g1, g2] of channels) {
      const p1 = GATE_POSITIONS[g1], p2 = GATE_POSITIONS[g2];
      const len = Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1;
      sumDx += (p2.x - p1.x) / len;
      sumDy += (p2.y - p1.y) / len;
    }
    const avgLen = Math.hypot(sumDx, sumDy) || 1;
    // Perpendicular: rotate 90° counter-clockwise → (-dy, dx).
    const px = -sumDy / avgLen;
    const py =  sumDx / avgLen;

    const n = channels.length;
    channels.forEach(([g1, g2], i) => {
      const scalar = (i - (n - 1) / 2) * PARALLEL_SPACING;
      channelOffsets[`${g1}-${g2}`] = { ox: scalar * px, oy: scalar * py };
    });
  }

  // ── Channel halves (pre-computed) ──────────────────────────────────────────
  const channelHalves = CHANNELS.map(([g1, g2]) => {
    const p1 = GATE_POSITIONS[g1];
    const p2 = GATE_POSITIONS[g2];
    const off = channelOffsets[`${g1}-${g2}`] ?? { ox: 0, oy: 0 };
    return {
      x1: p1.x + off.ox, y1: p1.y + off.oy,
      mx: (p1.x + p2.x) / 2 + off.ox,
      my: (p1.y + p2.y) / 2 + off.oy,
      x2: p2.x + off.ox, y2: p2.y + off.oy,
      c1: halfColor(gateState(g1)),
      c2: halfColor(gateState(g2)),
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
        <line
          x1={ch.x1} y1={ch.y1} x2={ch.mx} y2={ch.my}
          stroke={ch.c1} stroke-width="10" stroke-linecap="butt"
        />
        <line
          x1={ch.mx} y1={ch.my} x2={ch.x2} y2={ch.y2}
          stroke={ch.c2} stroke-width="10" stroke-linecap="butt"
        />
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
            cx={g.pos.x} cy={g.pos.y} r="18"
            fill={MARKER_FILL} stroke="#5a5a62" stroke-width="1.5"
          />
        {/if}
        <text
          x={g.pos.x} y={g.pos.y}
          text-anchor="middle" dominant-baseline="central"
          fill={g.active ? '#ffffff' : g.inDefinedCenter ? '#1c2540' : '#909098'}
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
