<!-- AI-authored — SVG bodygraph for Human Design charts. -->
<!-- Colour coding: Personality = white, Design = red, both = amber (accent). -->
<!-- Geometry is approximately correct; pixel polish deferred to Phase 3. -->

<script>
  import { CENTERS } from '$lib/hd/constants.js';
  import {
    CENTER_POS,
    CENTER_SHAPES,
    centerPoints,
    channelLine,
    gateLabelPos,
    buildChannelGeometry,
  } from '$lib/hd/bodygraph-geometry.js';

  /** @type {import('$lib/hd/chart.js').Chart} */
  let { chart } = $props();

  // ── Human-readable center labels (short, fit inside shapes) ────────────────
  const CENTER_LABELS = {
    head:        'HD',
    ajna:        'Aj',
    throat:      'Gt',
    g:           'G',
    heart:       'Cz',
    sacral:      'Sc',
    spleen:      'Bz',
    solarPlexus: 'PS',
    root:        'Rz',
  };

  // ── Gate activation sets ────────────────────────────────────────────────────
  const persGates = new Set(Object.values(chart.personality).map((a) => a.gate));
  const desGates  = new Set(Object.values(chart.design).map((a) => a.gate));

  /**
   * Returns 'pers' | 'des' | 'both' | 'inactive' for a gate number.
   * @param {number} gate
   */
  function gateState(gate) {
    const p = persGates.has(gate);
    const d = desGates.has(gate);
    if (p && d) return 'both';
    if (p)      return 'pers';
    if (d)      return 'des';
    return 'inactive';
  }

  /**
   * Returns the visual state of a channel line.
   * A channel is active only when both gate slots are filled.
   * @param {number} g1 @param {number} g2
   * @returns {'pers'|'des'|'mixed'|'inactive'}
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

  // ── Colour maps ─────────────────────────────────────────────────────────────
  const GATE_COLOR = {
    pers:     '#e8e8ea', // white (Personality)
    des:      '#e06262', // red   (Design)
    both:     '#d4a657', // amber (both)
    inactive: '#3c3c42', // dim
  };

  const CHANNEL_COLOR = {
    pers:     '#e8e8ea',
    des:      '#e06262',
    mixed:    '#d4a657',
    inactive: '#222226',
  };

  const CHANNEL_WIDTH = { pers: 2.5, des: 2.5, mixed: 2.5, inactive: 1.2 };

  // ── Static geometry (computed once) ────────────────────────────────────────
  const channelGeometry = buildChannelGeometry();
</script>

<div class="bodygraph-wrap">
  <svg
    viewBox="0 0 380 510"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Bodygraph Human Design"
  >
    <!-- ── 1. Channel lines (drawn first, behind centers) ──────────────────── -->
    <g>
      {#each channelGeometry as ch}
        {@const state = channelState(ch.gates[0], ch.gates[1])}
        {@const ln    = channelLine(ch.c1, ch.c2, ch.offset)}
        <line
          x1={ln.x1} y1={ln.y1}
          x2={ln.x2} y2={ln.y2}
          stroke={CHANNEL_COLOR[state]}
          stroke-width={CHANNEL_WIDTH[state]}
          stroke-linecap="round"
        />
      {/each}
    </g>

    <!-- ── 2. Centers ──────────────────────────────────────────────────────── -->
    <g>
      {#each CENTERS as center}
        {@const defined = chart.definedCenters.includes(center)}
        {@const pos     = CENTER_POS[center]}
        {@const s       = CENTER_SHAPES[center]}
        {@const fill    = defined ? '#1e1e22' : '#0e0e11'}
        {@const stroke  = defined ? '#d4a657' : '#35353c'}
        {@const sw      = defined ? 1.5 : 1}

        {#if s.type === 'rect'}
          <rect
            x={pos.x - s.w / 2} y={pos.y - s.h / 2}
            width={s.w} height={s.h}
            rx="3"
            {fill} {stroke} stroke-width={sw}
          />
        {:else}
          <polygon
            points={centerPoints(center)}
            {fill} {stroke} stroke-width={sw}
          />
        {/if}

        <!-- Center label -->
        <text
          x={pos.x} y={pos.y}
          text-anchor="middle"
          dominant-baseline="central"
          fill={defined ? '#d4a657' : '#58585f'}
          font-size="7.5"
          font-family="system-ui, sans-serif"
          font-weight={defined ? '600' : '400'}
          pointer-events="none"
        >{CENTER_LABELS[center]}</text>
      {/each}
    </g>

    <!-- ── 3. Gate labels ──────────────────────────────────────────────────── -->
    <g>
      {#each channelGeometry as ch}
        {@const posA = gateLabelPos(ch.c1, ch.c2, 0.18, ch.offset)}
        {@const posB = gateLabelPos(ch.c1, ch.c2, 0.82, ch.offset)}
        {@const stA  = gateState(ch.g_a)}
        {@const stB  = gateState(ch.g_b)}

        <text
          x={posA.x} y={posA.y}
          text-anchor="middle"
          dominant-baseline="central"
          fill={GATE_COLOR[stA]}
          font-size="6.5"
          font-family="system-ui, sans-serif"
          opacity={stA === 'inactive' ? 0.28 : 1}
          pointer-events="none"
        >{ch.g_a}</text>

        <text
          x={posB.x} y={posB.y}
          text-anchor="middle"
          dominant-baseline="central"
          fill={GATE_COLOR[stB]}
          font-size="6.5"
          font-family="system-ui, sans-serif"
          opacity={stB === 'inactive' ? 0.28 : 1}
          pointer-events="none"
        >{ch.g_b}</text>
      {/each}
    </g>
  </svg>
</div>

<style>
  .bodygraph-wrap {
    width: 100%;
    max-width: 400px;
    margin: 0 auto 2rem;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
