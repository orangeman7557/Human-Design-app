// AI-authored — geometry constants for the SVG bodygraph.
// Coordinates are relative to a 380×620 viewBox. The layout follows the
// classic Human Design bodygraph (Rave-style reference): nine centres in
// their standard shapes (triangles, diamond, rectangles) with the 64 gates
// at canonical positions *inside* their centre.
//
// Channels are rendered gate-to-gate as straight lines (no centre-to-centre
// approximation, no perpendicular bundle offset) in Bodygraph.svelte, so
// this file no longer exports the previous channel-routing helpers.

export const VIEWBOX = { w: 380, h: 620 };

// ── Centre origins (centroids) ──────────────────────────────────────────────
export const CENTER_POS = {
  head:        { x: 190, y: 55  },
  ajna:        { x: 190, y: 140 },
  throat:      { x: 190, y: 235 },
  g:           { x: 190, y: 345 },
  heart:       { x: 300, y: 325 },
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
export const CENTER_SHAPES = {
  head:        { type: 'triangle-up',    r: 45 },
  ajna:        { type: 'triangle-down',  r: 40 },
  throat:      { type: 'rect',           w: 130, h: 85 },
  g:           { type: 'diamond',        r: 60 },
  heart:       { type: 'triangle-left',  r: 40 },
  sacral:      { type: 'rect',           w: 130, h: 85 },
  spleen:      { type: 'triangle-right', r: 55 },
  solarPlexus: { type: 'triangle-left',  r: 55 },
  root:        { type: 'rect',           w: 130, h: 80 },
};

// ── HD-standard fill colours when a centre is defined ───────────────────────
// Lightly desaturated for the dark theme so they don't vibrate against the
// background but stay recognisable as the classic palette.
export const CENTER_COLORS_DEFINED = {
  head:        '#d4b03a', // yellow
  ajna:        '#5d9b5d', // green
  throat:      '#9b7137', // brown / ochre
  g:           '#d4b03a', // yellow
  heart:       '#b94444', // red
  sacral:      '#b94444', // red
  spleen:      '#9b7137', // brown
  solarPlexus: '#9b7137', // brown
  root:        '#7a5128', // dark brown
};

// ── Canonical gate positions ────────────────────────────────────────────────
// Each gate has a fixed position *inside* its centre, modelled on the
// Rave reference layout. Channels in Bodygraph.svelte are drawn as straight
// lines from one of these positions to the other.
//
// Counts (must total 64): Head 3, Ajna 6, Throat 11, G 8, Heart 4,
// Sacral 9, Spleen 7, Solar Plexus 7, Root 9.
export const GATE_POSITIONS = {
  // HEAD — three gates along the bottom edge, facing Ajna
  64: { x: 165, y: 87 },
  61: { x: 190, y: 87 },
  63: { x: 215, y: 87 },

  // AJNA — top edge faces Head, bottom three converge toward the apex
  47: { x: 162, y: 122 },
  24: { x: 190, y: 122 },
  4:  { x: 218, y: 122 },
  17: { x: 170, y: 158 },
  11: { x: 210, y: 158 },
  43: { x: 190, y: 175 },

  // THROAT — top row faces Ajna, sides face Spleen/Solar Plexus,
  // bottom row faces G/Sacral
  62: { x: 152, y: 207 },
  23: { x: 190, y: 207 },
  56: { x: 228, y: 207 },
  16: { x: 138, y: 228 },
  35: { x: 242, y: 228 },
  20: { x: 148, y: 248 },
  12: { x: 232, y: 248 },
  31: { x: 152, y: 270 },
  8:  { x: 178, y: 270 },
  33: { x: 200, y: 270 },
  45: { x: 228, y: 270 },

  // G — diamond, vertices face Throat (top), Heart (right),
  // Sacral (bottom), Spleen (left)
  1:  { x: 190, y: 295 },
  7:  { x: 172, y: 322 },
  13: { x: 208, y: 322 },
  10: { x: 148, y: 348 },
  25: { x: 232, y: 348 },
  15: { x: 172, y: 380 },
  46: { x: 208, y: 380 },
  2:  { x: 190, y: 405 },

  // HEART — small triangle, apex pointing left toward G
  21: { x: 305, y: 305 },
  51: { x: 290, y: 322 },
  26: { x: 290, y: 340 },
  40: { x: 315, y: 343 },

  // SACRAL — top row faces G, bottom row faces Root
  5:  { x: 160, y: 415 },
  14: { x: 190, y: 415 },
  29: { x: 222, y: 415 },
  34: { x: 158, y: 437 },
  27: { x: 158, y: 458 },
  59: { x: 222, y: 458 },
  42: { x: 160, y: 480 },
  3:  { x: 190, y: 480 },
  9:  { x: 222, y: 480 },

  // SPLEEN — triangle with apex pointing right (toward Sacral)
  48: { x: 62,  y: 350 },
  57: { x: 85,  y: 370 },
  44: { x: 107, y: 380 },
  50: { x: 123, y: 388 },
  32: { x: 78,  y: 402 },
  28: { x: 62,  y: 418 },
  18: { x: 58,  y: 428 },

  // SOLAR PLEXUS — triangle with apex pointing left (toward Sacral)
  36: { x: 318, y: 350 },
  22: { x: 295, y: 370 },
  37: { x: 273, y: 380 },
  6:  { x: 257, y: 388 },
  49: { x: 302, y: 402 },
  55: { x: 318, y: 418 },
  30: { x: 322, y: 428 },

  // ROOT — top row faces Sacral, lower rows face Spleen/Solar Plexus
  53: { x: 160, y: 520 },
  60: { x: 190, y: 520 },
  52: { x: 220, y: 520 },
  54: { x: 155, y: 542 },
  19: { x: 225, y: 542 },
  39: { x: 225, y: 562 },
  58: { x: 155, y: 578 },
  38: { x: 190, y: 578 },
  41: { x: 220, y: 578 },
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
