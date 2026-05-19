// AI-authored — geometry constants for the SVG bodygraph.
// Coordinates are relative to a 380×620 viewBox. The layout follows the
// classic Human Design bodygraph (Rave-style reference): nine centres in
// their standard shapes (triangles, diamond, rectangles) with the 64 gates
// at canonical positions *inside* their centre.
//
// Channels are rendered gate-to-gate as straight lines (no centre-to-centre
// approximation) in Bodygraph.svelte.
//
// Phase 1.4.A — Centre sizes reduced ~25-30% vs Phase 1.3. Gate positions
// rescaled proportionally toward each centre's centroid using:
//   new_gate = centroid + (old_gate − centroid) × scale
// Scale factors: Head 0.711, Ajna 0.70, Throat 0.731/0.765, G 0.75,
// Heart 0.75, Sacral 0.731/0.765, Spleen 0.727, SolarPlexus 0.727,
// Root 0.731/0.725.
// Phase 1.4.F — Heart centroid moved from y:325 to y:305 (better alignment
// with the Throat↔G gap). All four Heart gate positions shifted -20 y.
// Phase 1.4.J — Head gates corrected from y:78 to y:68 (they were below the
// triangle's bottom edge at y:71; now firmly inside the shape).
// Phase 1.4.L — A1: Throat/Sacral/Root reshaped to square 85×85 (was
// 95×65/95×65/95×58). A2: Head enlarged from r=32 to r=40, Ajna from
// r=28 to r=34. Ajna gates 17 and 11 nudged x toward the centerline so
// they remain inside the larger triangle's narrower lower half.
// Phase 1.4.M — Throat/Sacral/Root squares tightened from 85 to 75 (1.4.L
// came out visually too big). C1: full audit of the 64 gate positions
// against the Rave reference, row-aligning gates so parallel channels
// now form parallel bars by geometry alone (no perpendicular offsets
// needed any more).

export const VIEWBOX = { w: 380, h: 620 };

// ── Centre origins (centroids) ──────────────────────────────────────────────
export const CENTER_POS = {
  head:        { x: 190, y: 55  },
  ajna:        { x: 190, y: 140 },
  throat:      { x: 190, y: 235 },
  g:           { x: 190, y: 345 },
  heart:       { x: 300, y: 305 },  // was y:325 — moved up to sit in the Throat↔G gap
  sacral:      { x: 190, y: 445 },
  spleen:      { x: 80,  y: 385 },
  solarPlexus: { x: 300, y: 385 },
  root:        { x: 190, y: 545 },
};

// ── Centre shape definitions ────────────────────────────────────────────────
// type: 'triangle-up' | 'triangle-down' | 'triangle-left' | 'triangle-right'
//     | 'rect' | 'diamond'
// r: circumradius for triangles and diamonds
// w, h: dimensions for rects
// Phase 1.4.M — Throat/Sacral/Root squares tightened from 85 to 75.
//               (1.4.L made them squares; visually they came out too big.)
export const CENTER_SHAPES = {
  head:        { type: 'triangle-up',    r: 40 },
  ajna:        { type: 'triangle-down',  r: 34 },
  throat:      { type: 'rect',           w: 75, h: 75 },
  g:           { type: 'diamond',        r: 45 },
  heart:       { type: 'triangle-left',  r: 30 },
  sacral:      { type: 'rect',           w: 75, h: 75 },
  spleen:      { type: 'triangle-right', r: 40 },
  solarPlexus: { type: 'triangle-left',  r: 40 },
  root:        { type: 'rect',           w: 75, h: 75 },
};

// ── HD-standard fill colours when a centre is defined (Phase 1.4.K) ─────────
// Calibrated to match the Rave reference palette: brighter, slightly warmer.
export const CENTER_COLORS_DEFINED = {
  head:        '#e5cf3d', // bright yellow
  ajna:        '#6cb46c', // green
  throat:      '#b87a35', // warm amber / orange-brown
  g:           '#e5cf3d', // bright yellow (matches Head)
  heart:       '#c83838', // red
  sacral:      '#c83838', // red (matches Heart)
  spleen:      '#b87a35', // warm amber (matches Throat)
  solarPlexus: '#b87a35', // warm amber (matches Throat)
  root:        '#5e3e1d', // dark brown
};

// ── Canonical gate positions (Phase 1.4.M — C1 audit) ──────────────────────
// All 64 positions re-derived from the Rave reference layout. Gates inside
// each centre are placed in rows / columns that match the standard HD
// bodygraph (e.g. Throat: 3-2-2-4 vertical rows; G: 1 top, 7/13 upper, 10/25
// at side vertices, 15/46 lower, 2 bottom; etc.). Parallel channels now
// emerge from geometry alone: the row alignment puts source and target
// gates in matching X-positions, so channels are visually parallel without
// any perpendicular offset trick.
//
// Counts (must total 64): Head 3, Ajna 6, Throat 11, G 8, Heart 4,
// Sacral 9, Spleen 7, Solar Plexus 7, Root 9.
export const GATE_POSITIONS = {

  // HEAD — 3 gates along the inner bottom edge (faces Ajna)
  64: { x: 170, y: 68 },
  61: { x: 190, y: 68 },
  63: { x: 210, y: 68 },

  // AJNA — top row faces Head; apex region faces Throat
  47: { x: 167, y: 127 },
  24: { x: 190, y: 127 },
  4:  { x: 213, y: 127 },
  17: { x: 180, y: 155 },
  11: { x: 200, y: 155 },
  43: { x: 190, y: 165 },

  // THROAT — 4 rows: Ajna face (top), Spleen/SP faces (mid), G face (bottom)
  62: { x: 165, y: 207 },
  23: { x: 190, y: 207 },
  56: { x: 215, y: 207 },
  16: { x: 157, y: 224 },
  35: { x: 223, y: 224 },
  20: { x: 165, y: 242 },
  12: { x: 215, y: 242 },
  31: { x: 162, y: 263 },
  8:  { x: 180, y: 263 },
  33: { x: 200, y: 263 },
  45: { x: 218, y: 263 },

  // G — diamond: 1 top, 7/13 upper, 10/25 at side vertices,
  // 15/46 lower, 2 bottom
  1:  { x: 190, y: 308 },
  7:  { x: 175, y: 325 },
  13: { x: 205, y: 325 },
  10: { x: 153, y: 345 },
  25: { x: 227, y: 345 },
  15: { x: 175, y: 365 },
  46: { x: 205, y: 365 },
  2:  { x: 190, y: 382 },

  // HEART — small triangle, apex pointing left toward G
  21: { x: 305, y: 288 },
  51: { x: 293, y: 302 },
  26: { x: 290, y: 315 },
  40: { x: 308, y: 320 },

  // SACRAL — top row faces G; mid row 27/59; 34 on the left mid;
  // bottom row faces Root
  5:  { x: 165, y: 418 },
  14: { x: 190, y: 418 },
  29: { x: 215, y: 418 },
  34: { x: 165, y: 435 },
  27: { x: 165, y: 455 },
  59: { x: 215, y: 455 },
  42: { x: 165, y: 472 },
  3:  { x: 190, y: 472 },
  9:  { x: 215, y: 472 },

  // SPLEEN — triangle apex pointing right (toward Sacral)
  // Top slope (toward Sacral/Throat): 48, 57, 44, 50 from outer to apex.
  // Bottom slope (toward Root): 32, 28, 18.
  48: { x: 65,  y: 358 },
  57: { x: 82,  y: 372 },
  44: { x: 97,  y: 380 },
  50: { x: 110, y: 385 },
  32: { x: 80,  y: 397 },
  28: { x: 65,  y: 408 },
  18: { x: 62,  y: 415 },

  // SOLAR PLEXUS — mirror of Spleen, apex pointing left (toward Sacral)
  36: { x: 315, y: 358 },
  22: { x: 303, y: 372 },
  37: { x: 288, y: 380 },
  6:  { x: 267, y: 385 },
  49: { x: 303, y: 397 },
  55: { x: 315, y: 408 },
  30: { x: 317, y: 415 },

  // ROOT — top row faces Sacral; mid row faces Spleen/SP; bottom is the
  // outer face (no channels emanate downward from Root).
  53: { x: 165, y: 520 },
  60: { x: 190, y: 520 },
  52: { x: 215, y: 520 },
  54: { x: 160, y: 540 },
  19: { x: 220, y: 540 },
  39: { x: 220, y: 558 },
  58: { x: 160, y: 575 },
  38: { x: 190, y: 575 },
  41: { x: 220, y: 575 },
};

/**
 * SVG polygon `points` string for a centre shape (returns null for rects,
 * which Bodygraph.svelte renders with `<rect>` directly).
 */
export function centerPoints(name) {
  const { x, y } = CENTER_POS[name];
  const s = CENTER_SHAPES[name];
  const r = s.r;
  if (s.type === 'triangle-up') {
    return `${x},${y - r} ${x - r * 0.866},${y + r * 0.5} ${x + r * 0.866},${y + r * 0.5}`;
  }
  if (s.type === 'triangle-down') {
    return `${x - r * 0.866},${y - r * 0.5} ${x + r * 0.866},${y - r * 0.5} ${x},${y + r}`;
  }
  if (s.type === 'triangle-left') {
    // Apex on the left; base is the vertical edge on the right.
    return `${x + r * 0.5},${y - r * 0.866} ${x + r * 0.5},${y + r * 0.866} ${x - r},${y}`;
  }
  if (s.type === 'triangle-right') {
    return `${x - r * 0.5},${y - r * 0.866} ${x - r * 0.5},${y + r * 0.866} ${x + r},${y}`;
  }
  if (s.type === 'diamond') {
    return `${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`;
  }
  return null;
}
