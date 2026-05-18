<!-- AI-authored — SVG bodygraph for Human Design charts. -->
<!-- Layout follows the classic Rave reference: nine centres in their      -->
<!-- standard shapes, 64 gates at canonical positions inside their centre, -->
<!-- and 36 channels routed gate-to-gate as straight lines.                 -->
<!--                                                                         -->
<!-- Channel rendering: each channel is drawn as two halves, each coloured  -->
<!-- by its near-gate's activation state. White = Personality or inactive   -->
<!-- (the bodygraph skeleton is always visible); red = Design or Both.      -->
<!--                                                                         -->
<!-- Gate rendering: active gates carry a navy marker with the gate number  -->
<!-- in white; inactive gates show just a dim number. The combination of    -->
<!-- channel colouring + gate markers fully encodes Personality / Design /  -->
<!-- Both / Inactive states.                                                 -->

<script>
  import { CENTERS, CHANNELS } from '$lib/hd/constants.js';
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
  const PERS_COLOR  = '#eaeaee'; // white (Personality + inactive skeleton)
  const DES_COLOR   = '#e0556c'; // red/pink (Design + Both)
  const MARKER_FILL = '#1c2540'; // navy behind active gate numbers

  function halfColor(state) {
    return state === 'des' || state === 'both' ? DES_COLOR : PERS_COLOR;
  }

  // ── Channel halves (pre-computed) ──────────────────────────────────────────
  const channelHalves = CHANNELS.map(([g1, g2]) => {
    const p1 = GATE_POSITIONS[g1];
    const p2 = GATE_POSITIONS[g2];
    return {
      x1: p1.x, y1: p1.y,
      mx: (p1.x + p2.x) / 2,
      my: (p1.y + p2.y) / 2,
      x2: p2.x, y2: p2.y,
      c1: halfColor(gateState(g1)),
      c2: halfColor(gateState(g2)),
    };
  });

  // ── Gate render entries (one per gate, all 64) ─────────────────────────────
  const gateEntries = Object.entries(GATE_POSITIONS).map(([gateStr, pos]) => {
    const gate = Number(gateStr);
    const state = gateState(gate);
    return { gate, pos, state, active: state !== 'inactive' };
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
          stroke={ch.c1} stroke-width="6" stroke-linecap="butt"
        />
        <line
          x1={ch.mx} y1={ch.my} x2={ch.x2} y2={ch.y2}
          stroke={ch.c2} stroke-width="6" stroke-linecap="butt"
        />
      {/each}
    </g>

    <!-- ── 2. Centres ────────────────────────────────────────────────────── -->
    <g>
      {#each CENTERS as center}
        {@const defined = chart.definedCenters.includes(center)}
        {@const pos     = CENTER_POS[center]}
        {@const s       = CENTER_SHAPES[center]}
        {@const fill    = defined ? CENTER_COLORS_DEFINED[center] : '#101116'}
        {@const stroke  = defined ? CENTER_COLORS_DEFINED[center] : '#3a3a42'}
        {@const sw      = defined ? 1.3 : 1}

        {#if s.type === 'rect'}
          <rect
            x={pos.x - s.w / 2} y={pos.y - s.h / 2}
            width={s.w} height={s.h} rx="4"
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

    <!-- ── 3. Gate markers + numbers ─────────────────────────────────────── -->
    <g>
      {#each gateEntries as g}
        {#if g.active}
          <circle
            cx={g.pos.x} cy={g.pos.y} r="6.5"
            fill={MARKER_FILL} stroke="#5a5a62" stroke-width="0.5"
          />
        {/if}
        <text
          x={g.pos.x} y={g.pos.y}
          text-anchor="middle" dominant-baseline="central"
          fill={g.active ? '#eaeaee' : '#a0a0a8'}
          font-size={g.active ? '7' : '6'}
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
