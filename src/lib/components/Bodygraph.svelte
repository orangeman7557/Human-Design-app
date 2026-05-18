<!-- AI-authored — SVG bodygraph for Human Design charts. -->
<!-- Classical HD palette for defined centers (yellow, green, brown, red). -->
<!-- Channel colours: Personality = white, Design = red, Both = striped, -->
<!-- Inactive = dim. Active gates show a navy marker with the number inside. -->

<script>
  import { CENTERS } from '$lib/hd/constants.js';
  import {
    CENTER_POS,
    CENTER_SHAPES,
    CENTER_COLORS_DEFINED,
    centerPoints,
    channelLine,
    gateOuterPos,
    buildChannelGeometry,
  } from '$lib/hd/bodygraph-geometry.js';

  /** @type {import('$lib/hd/chart.js').Chart} */
  let { chart } = $props();

  // ── Gate activation sets ───────────────────────────────────────────────────
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

  /**
   * Channel visual state. A channel is only complete when both gate slots
   * are filled. "mixed" means the two slots are filled by different sides.
   */
  function channelState(g1, g2) {
    const s1 = gateState(g1);
    const s2 = gateState(g2);
    if (s1 === 'inactive' || s2 === 'inactive') return 'inactive';
    const hasP = s1 === 'pers' || s1 === 'both' || s2 === 'pers' || s2 === 'both';
    const hasD = s1 === 'des'  || s1 === 'both' || s2 === 'des'  || s2 === 'both';
    if (hasP && hasD) return 'mixed';
    if (hasP) return 'pers';
    return 'des';
  }

  // ── Palette ─────────────────────────────────────────────────────────────────
  const PERS_COLOR     = '#eaeaee'; // white (Personality)
  const DES_COLOR      = '#e0556c'; // red/pink (Design)
  const INACTIVE_COLOR = '#23232a'; // dim channel skeleton
  const MARKER_FILL    = '#1c2540'; // navy behind active gate numbers

  const channelGeometry = buildChannelGeometry();

  // ── Deduplicate gate labels ────────────────────────────────────────────────
  // A gate that participates in several channels (10, 20, 34, 57…) appeared
  // multiple times with the previous renderer. We render each gate exactly
  // once, taking its position from the first channel where it shows up.
  // Pixel-perfect per-gate positions on the center perimeter is a Phase 3
  // polish item (see BACKLOG.md).
  /** @type {Map<number, { x: number, y: number, state: string }>} */
  const gateLabels = (() => {
    const map = new Map();
    for (const ch of channelGeometry) {
      if (!map.has(ch.g_a)) {
        const pos = gateOuterPos(ch.c1, ch.c2, ch.offset);
        map.set(ch.g_a, { ...pos, state: gateState(ch.g_a) });
      }
      if (!map.has(ch.g_b)) {
        const pos = gateOuterPos(ch.c2, ch.c1, -ch.offset);
        map.set(ch.g_b, { ...pos, state: gateState(ch.g_b) });
      }
    }
    return map;
  })();
</script>

<div class="bodygraph-wrap">
  <svg
    viewBox="0 0 380 510"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Bodygraph Human Design"
  >
    <!-- ── 1. Channels (drawn first, behind centers) ─────────────────────── -->
    <g>
      {#each channelGeometry as ch}
        {@const state = channelState(ch.gates[0], ch.gates[1])}
        {@const ln    = channelLine(ch.c1, ch.c2, ch.offset)}

        {#if state === 'mixed'}
          <!-- Mixed: two overlaid dashed lines, alternating colours. -->
          <line
            x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
            stroke={PERS_COLOR} stroke-width="3.5"
            stroke-dasharray="9 9" stroke-linecap="butt"
          />
          <line
            x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
            stroke={DES_COLOR} stroke-width="3.5"
            stroke-dasharray="9 9" stroke-dashoffset="9" stroke-linecap="butt"
          />
        {:else if state === 'pers'}
          <line
            x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
            stroke={PERS_COLOR} stroke-width="3.5" stroke-linecap="round"
          />
        {:else if state === 'des'}
          <line
            x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
            stroke={DES_COLOR} stroke-width="3.5" stroke-linecap="round"
          />
        {:else}
          <line
            x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
            stroke={INACTIVE_COLOR} stroke-width="1.2" stroke-linecap="round"
          />
        {/if}
      {/each}
    </g>

    <!-- ── 2. Centers ────────────────────────────────────────────────────── -->
    <g>
      {#each CENTERS as center}
        {@const defined = chart.definedCenters.includes(center)}
        {@const pos     = CENTER_POS[center]}
        {@const s       = CENTER_SHAPES[center]}
        {@const fill    = defined ? CENTER_COLORS_DEFINED[center] : '#0e0e11'}
        {@const stroke  = defined ? CENTER_COLORS_DEFINED[center] : '#3a3a42'}
        {@const sw      = defined ? 1.3 : 1}

        {#if s.type === 'rect'}
          <rect
            x={pos.x - s.w / 2} y={pos.y - s.h / 2}
            width={s.w} height={s.h} rx="3"
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

    <!-- ── 3. Gate markers + numbers, deduplicated ───────────────────────── -->
    <g>
      {#each gateLabels as [gate, info]}
        {@const active = info.state !== 'inactive'}

        {#if active}
          <circle
            cx={info.x} cy={info.y} r="5.5"
            fill={MARKER_FILL} stroke="#3a3a42" stroke-width="0.5"
          />
        {/if}

        <text
          x={info.x} y={info.y}
          text-anchor="middle" dominant-baseline="central"
          fill={active ? '#eaeaee' : '#5a5a62'}
          font-size={active ? '6' : '5.5'}
          font-weight={active ? '600' : '400'}
          font-family="system-ui, sans-serif"
          pointer-events="none"
        >{gate}</text>
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
</style>
