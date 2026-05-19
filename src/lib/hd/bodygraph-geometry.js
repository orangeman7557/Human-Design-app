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
// Phase 1.4.L — A1: Throat/Sacral/Root → square (85×85).
//               A2: Head/Ajna enlarged a touch.
export const CENTER_SHAPES = {
  head:        { type: 'triangle-up',    r: 40 },   // A2: was 32
  ajna:        { type: 'triangle-down',  r: 34 },   // A2: was 28
  throat:      { type: 'rect',           w: 85, h: 85 }, // A1: was 95×65
  g:           { type: 'diamond',        r: 45 },
  heart:       { type: 'triangle-left',  r: 30 },
  sacral:      { type: 'rect',           w: 85, h: 85 }, // A1: was 95×65
  spleen:      { type: 'triangle-right', r: 40 },
  solarPlexus: { type: 'triangle-left',  r: 40 },
  root:        { type: 'rect',           w: 85, h: 85 }, // A1: was 95×58
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

// ── Canonical gate positions ────────────────────────────────────────────────
// Rescaled from Phase 1.3 positions using per-centre scale factors so that
// all gate dots land inside (or at the inner edge of) their smaller centre.
//
// Counts (must total 64): Head 3, Ajna 6, Throat 11, G 8, Heart 4,
// Sacral 9, Spleen 7, Solar Plexus 7, Root 9.
export const GATE_POSITIONS = {

  // HEAD — three gates inside the triangle near the bottom, facing Ajna
  // (Phase 1.4.J: moved from y:78 to y:68 — triangle bottom edge is at y:71)
  64: { x: 172, y: 68 },
  61: { x: 190, y: 68 },
  63: { x: 208, y: 68 },

  // AJNA — top edge faces Head, bottom apex faces Throat
  // Phase 1.4.L: gates 17 and 11 nudged inward (x) to stay inside the
  // bigger triangle (r=34); the narrower section near the apex needs them
  // closer to the centerline.
  47: { x: 170, y: 127 },
  24: { x: 190, y: 127 },
  4:  { x: 210, y: 127 },
  17: { x: 180, y: 153 },
  11: { x: 200, y: 153 },
  43: { x: 190, y: 165 },

  // THROAT — top row faces Ajna, sides face Spleen/SolarPlexus,
  // bottom row faces G/Sacral (scale_x 0.731, scale_y 0.765)
  62: { x: 162, y: 214 },
  23: { x: 190, y: 214 },
  56: { x: 218, y: 214 },
  16: { x: 152, y: 230 },
  35: { x: 228, y: 230 },
  20: { x: 159, y: 245 },
  12: { x: 221, y: 245 },
  31: { x: 162, y: 262 },
  8:  { x: 181, y: 262 },
  33: { x: 197, y: 262 },
  45: { x: 218, y: 262 },

  // G — diamond, vertices face Throat (top), Heart (right),
  // Sacral (bottom), Spleen (left) (scale 0.75)
  1:  { x: 190, y: 308 },
  7:  { x: 177, y: 328 },
  13: { x: 204, y: 328 },
  10: { x: 159, y: 347 },
  25: { x: 222, y: 347 },
  15: { x: 177, y: 371 },
  46: { x: 204, y: 371 },
  2:  { x: 190, y: 390 },

  // HEART — small triangle, apex pointing left toward G (Phase 1.4.F: all y −20)
  21: { x: 304, y: 290 },
  51: { x: 293, y: 303 },
  26: { x: 293, y: 316 },
  40: { x: 311, y: 319 },

  // SACRAL — top row faces G, bottom row faces Root (scale_x 0.731, scale_y 0.765)
  5:  { x: 168, y: 422 },
  14: { x: 190, y: 422 },
  29: { x: 212, y: 422 },
  34: { x: 167, y: 439 },
  27: { x: 167, y: 455 },
  59: { x: 213, y: 455 },
  42: { x: 168, y: 472 },
  3:  { x: 190, y: 472 },
  9:  { x: 212, y: 472 },

  // SPLEEN — triangle apex pointing right, toward Sacral (scale 0.727)
  48: { x: 67,  y: 360 },
  57: { x: 84,  y: 374 },
  44: { x: 100, y: 381 },
  50: { x: 111, y: 387 },
  32: { x: 79,  y: 397 },
  28: { x: 67,  y: 409 },
  18: { x: 64,  y: 416 },

  // SOLAR PLEXUS — triangle apex pointing left, toward Sacral (scale 0.727)
  36: { x: 313, y: 360 },
  22: { x: 296, y: 374 },
  37: { x: 280, y: 381 },
  6:  { x: 269, y: 387 },
  49: { x: 301, y: 397 },
  55: { x: 313, y: 409 },
  30: { x: 316, y: 416 },

  // ROOT — top row faces Sacral, lower rows face Spleen/SolarPlexus
  // (scale_x 0.731, scale_y 0.725)
  53: { x: 168, y: 527 },
  60: { x: 190, y: 527 },
  52: { x: 212, y: 527 },
  54: { x: 164, y: 543 },
  19: { x: 216, y: 543 },
  39: { x: 216, y: 557 },
  58: { x: 164, y: 569 },
  38: { x: 190, y: 569 },
  41: { x: 212, y: 569 },
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
