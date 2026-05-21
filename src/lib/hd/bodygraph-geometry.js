// AI-authored — geometry constants for the SVG bodygraph.
// Coordinates target a 1058×1630 viewBox, taken directly from the
// reference layout (docs/bodygraph-reference-coordinates.txt).
//
// Centre shapes store explicit polygon vertices — reference triangles are
// not equilateral, so the old circumradius approach is replaced with
// literal vertex lists. Rects keep w/h alongside CENTER_POS centroids.
//
// Phase 1.4 — Centre sizes, gate positions, parallel channel layout.
// Phase 2.0 — Full geometry rebase: viewBox 1058×1630, all coordinates
//   from reference. CENTER_SHAPES switch from circumradius to polygon points.

export const VIEWBOX = { w: 1058, h: 1630 };

// ── Centre centroids (geometric mean of reference vertices) ──────────────────
export const CENTER_POS = {
  head:        { x: 524, y: 154  },
  ajna:        { x: 524, y: 317  },
  throat:      { x: 524, y: 566  },
  g:           { x: 524, y: 854  },
  heart:       { x: 718, y: 994  },
  sacral:      { x: 524, y: 1281 },
  spleen:      { x: 131, y: 1182 },
  solarPlexus: { x: 917, y: 1182 },
  root:        { x: 524, y: 1510 },
};

// ── Centre shapes ─────────────────────────────────────────────────────────────
// type 'polygon': points is a ready-made SVG polygon points string.
// type 'rect': Bodygraph.svelte renders via pos.x ± w/2, pos.y ± h/2.
export const CENTER_SHAPES = {
  head:        { type: 'polygon', points: '524,28 440,217 608,217'          },
  ajna:        { type: 'polygon', points: '440,259 608,259 524,433'         },
  throat:      { type: 'rect',    w: 164, h: 164                            },
  g:           { type: 'polygon', points: '524,741 636,854 524,967 412,854' },
  heart:       { type: 'polygon', points: '718,917 608,1033 829,1033'       },
  spleen:      { type: 'polygon', points: '232,1188 80,1077 80,1280'        },
  solarPlexus: { type: 'polygon', points: '816,1188 968,1077 968,1280'      },
  sacral:      { type: 'rect',    w: 164, h: 164                            },
  root:        { type: 'rect',    w: 164, h: 164                            },
};

// ── HD-standard fill colours when a centre is defined ────────────────────────
export const CENTER_COLORS_DEFINED = {
  head:        '#e5cf3d', // bright yellow
  ajna:        '#6cb46c', // green
  throat:      '#b87a35', // warm amber
  g:           '#e5cf3d', // bright yellow (matches Head)
  heart:       '#c83838', // red
  sacral:      '#c83838', // red (matches Heart)
  spleen:      '#b87a35', // warm amber (matches Throat)
  solarPlexus: '#b87a35', // warm amber (matches Throat)
  root:        '#5e3e1d', // dark brown
};

// ── Gate positions (all 64, coordinates from reference) ──────────────────────
export const GATE_POSITIONS = {

  // HEAD
  64: { x: 484, y: 202 },
  61: { x: 524, y: 202 },
  63: { x: 564, y: 202 },

  // AJNA
  47: { x: 484, y: 276 },
  24: { x: 524, y: 276 },
  4:  { x: 564, y: 276 },
  17: { x: 484, y: 322 },
  11: { x: 564, y: 322 },
  43: { x: 524, y: 397 },

  // THROAT
  62: { x: 484, y: 502 },
  23: { x: 524, y: 502 },
  56: { x: 564, y: 502 },
  16: { x: 460, y: 538 },
  35: { x: 588, y: 538 },
  20: { x: 460, y: 591 },
  12: { x: 588, y: 591 },
  31: { x: 484, y: 630 },
  8:  { x: 524, y: 630 },
  33: { x: 564, y: 630 },
  45: { x: 590, y: 630 },

  // G
  1:  { x: 524, y: 768 },
  7:  { x: 484, y: 810 },
  13: { x: 564, y: 810 },
  10: { x: 442, y: 853 },
  25: { x: 612, y: 853 },
  15: { x: 484, y: 899 },
  46: { x: 564, y: 899 },
  2:  { x: 524, y: 942 },

  // HEART
  21: { x: 718, y: 945  },
  51: { x: 682, y: 984  },
  26: { x: 648, y: 1019 },
  40: { x: 764, y: 1019 },

  // SPLEEN
  48: { x: 104, y: 1112 },
  57: { x: 136, y: 1134 },
  44: { x: 177, y: 1161 },
  50: { x: 212, y: 1188 },
  32: { x: 175, y: 1206 },
  28: { x: 136, y: 1228 },
  18: { x: 102, y: 1250 },

  // SOLAR PLEXUS
  36: { x: 955, y: 1104 },
  22: { x: 920, y: 1131 },
  37: { x: 878, y: 1158 },
  6:  { x: 836, y: 1187 },
  49: { x: 882, y: 1213 },
  55: { x: 920, y: 1235 },
  30: { x: 954, y: 1259 },

  // SACRAL
  5:  { x: 484, y: 1217 },
  14: { x: 524, y: 1217 },
  29: { x: 564, y: 1217 },
  34: { x: 460, y: 1250 },
  27: { x: 460, y: 1298 },
  59: { x: 588, y: 1299 },
  42: { x: 484, y: 1346 },
  3:  { x: 524, y: 1346 },
  9:  { x: 564, y: 1346 },

  // ROOT
  53: { x: 484, y: 1447 },
  60: { x: 524, y: 1447 },
  52: { x: 564, y: 1447 },
  54: { x: 460, y: 1481 },
  19: { x: 588, y: 1481 },
  38: { x: 460, y: 1528 },
  39: { x: 588, y: 1528 },
  58: { x: 460, y: 1574 },
  41: { x: 588, y: 1574 },
};

/**
 * SVG polygon `points` string for a centre shape.
 * Returns null for rects (Bodygraph.svelte renders those as <rect>).
 */
export function centerPoints(name) {
  const s = CENTER_SHAPES[name];
  if (s.type === 'polygon') return s.points;
  return null;
}

// ── Gate-10 channel paths ─────────────────────────────────────────────────────
// Gates 10-20, 10-34 and 10-57 cannot be drawn as straight lines because gate
// 10 sits at the left vertex of the G diamond while its partners span three
// different centres. They share a common trunk that follows the line between
// gates 20 and 57, branching from gate 10 at Q (the intersection of that line
// with the horizontal through gate 10).

export const FACTOR_VIRAJE = 0.10;

/** Returns the point on line A→B at the given y (linear interpolation). */
function proyectarSobreRecta(A, B, y) {
  const x = A.x + (B.x - A.x) * (y - A.y) / (B.y - A.y);
  return { x, y };
}

function buildIntegrationPaths() {
  const g10 = GATE_POSITIONS[10];
  const g20 = GATE_POSITIONS[20];
  const g34 = GATE_POSITIONS[34];
  const g57 = GATE_POSITIONS[57];

  const Q  = proyectarSobreRecta(g20, g57, g10.y);
  const yViraje = g57.y - FACTOR_VIRAJE * (g57.y - g20.y);
  const Q2 = proyectarSobreRecta(g20, g57, yViraje);

  const pts = (...ps) => ps.map(p => `${Math.round(p.x)},${Math.round(p.y)}`).join(' ');

  return {
    '10-20': { pathA: pts(g10, Q),      pathB: pts(Q, g20)       },
    '10-34': { pathA: pts(g10, Q),      pathB: pts(Q, Q2, g34)   },
    '10-57': { pathA: pts(g10, Q),      pathB: pts(Q, g57)       },
    '20-34': { pathA: pts(g20, Q),      pathB: pts(Q, Q2, g34)   },
    '20-57': { pathA: pts(g20, Q),      pathB: pts(Q, g57)       },
    '34-57': { pathA: pts(g34, Q2),     pathB: pts(Q2, g57)      },
  };
}

export const INTEGRATION_CHANNEL_PATHS = buildIntegrationPaths();
