// AI-authored — geometry constants and helpers for the SVG bodygraph.
// Coordinates are relative to a 380×510 viewBox.

import { CENTER_BY_GATE, CHANNELS } from './constants.js';

// ── Center-of-mass positions ─────────────────────────────────────────────────
export const CENTER_POS = {
  head:        { x: 190, y: 48  },
  ajna:        { x: 190, y: 113 },
  throat:      { x: 190, y: 176 },
  g:           { x: 190, y: 262 },
  heart:       { x: 295, y: 228 },
  sacral:      { x: 190, y: 352 },
  spleen:      { x: 97,  y: 318 },
  solarPlexus: { x: 292, y: 318 },
  root:        { x: 190, y: 438 },
};

// ── Center shape definitions ─────────────────────────────────────────────────
// type: 'triangle-up' | 'triangle-down' | 'rect' | 'diamond'
// r: circumradius for polygon shapes (px)
// w, h: dimensions for rects (px)
export const CENTER_SHAPES = {
  head:        { type: 'triangle-up',   r: 30 },
  ajna:        { type: 'triangle-down', r: 30 },
  throat:      { type: 'rect',          w: 72, h: 36 },
  g:           { type: 'diamond',       r: 46 },
  heart:       { type: 'triangle-up',   r: 26 },
  sacral:      { type: 'rect',          w: 82, h: 38 },
  spleen:      { type: 'triangle-down', r: 34 },
  solarPlexus: { type: 'triangle-down', r: 34 },
  root:        { type: 'rect',          w: 82, h: 38 },
};

// Perpendicular gap between parallel channels sharing the same center pair.
export const CHANNEL_SPACING = 6;

/**
 * Returns SVG polygon `points` string for a center shape.
 * Returns null for rects (rendered as <rect> in Svelte).
 * @param {string} name
 * @returns {string|null}
 */
export function centerPoints(name) {
  const { x, y } = CENTER_POS[name];
  const s = CENTER_SHAPES[name];
  const r = s.r;
  if (s.type === 'triangle-up') {
    // Equilateral triangle pointing up, circumradius r
    return `${x},${y - r} ${x - r * 0.866},${y + r * 0.5} ${x + r * 0.866},${y + r * 0.5}`;
  }
  if (s.type === 'triangle-down') {
    return `${x - r * 0.866},${y - r * 0.5} ${x + r * 0.866},${y - r * 0.5} ${x},${y + r}`;
  }
  if (s.type === 'diamond') {
    return `${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`;
  }
  return null;
}

/**
 * Returns the SVG line endpoints for a channel with a perpendicular offset.
 * @param {string} c1 - center name (canonical: alphabetically first)
 * @param {string} c2 - center name (canonical: alphabetically second)
 * @param {number} offset - pixels perpendicular to the c1→c2 direction
 * @returns {{ x1: number, y1: number, x2: number, y2: number }}
 */
export function channelLine(c1, c2, offset) {
  const p1 = CENTER_POS[c1];
  const p2 = CENTER_POS[c2];
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  // Perpendicular unit vector
  const px = -dy / len;
  const py = dx / len;
  return {
    x1: p1.x + px * offset,
    y1: p1.y + py * offset,
    x2: p2.x + px * offset,
    y2: p2.y + py * offset,
  };
}

/**
 * Returns the position of a gate label along a channel.
 * fraction=0 → at c1, fraction=1 → at c2.
 * @param {string} c1
 * @param {string} c2
 * @param {number} fraction
 * @param {number} offset
 * @returns {{ x: number, y: number }}
 */
export function gateLabelPos(c1, c2, fraction, offset) {
  const { x1, y1, x2, y2 } = channelLine(c1, c2, offset);
  return {
    x: x1 + (x2 - x1) * fraction,
    y: y1 + (y2 - y1) * fraction,
  };
}

/**
 * Builds per-channel rendering metadata: canonical center pair, perpendicular
 * offset within the bundle, and gate↔end assignment.
 *
 * Each entry:
 * {
 *   gates: [g1, g2],    // original gate pair
 *   g_a: number,        // gate belonging to c1 (c1 end of the line)
 *   g_b: number,        // gate belonging to c2 (c2 end of the line)
 *   c1: string,         // alphabetically first center
 *   c2: string,         // alphabetically second center
 *   offset: number,     // perpendicular offset px
 * }
 *
 * @returns {Array<{gates:[number,number], g_a:number, g_b:number, c1:string, c2:string, offset:number}>}
 */
export function buildChannelGeometry() {
  // Group channels by canonical (sorted) center-pair key
  /** @type {Map<string, Array<{g1:number, g2:number, c1:string, c2:string}>>} */
  const groups = new Map();

  for (const [g1, g2] of CHANNELS) {
    const c1 = CENTER_BY_GATE[g1];
    const c2 = CENTER_BY_GATE[g2];
    const [ca, cb] = [c1, c2].sort(); // canonical order
    const key = `${ca}:${cb}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ g1, g2, c1, c2 });
  }

  const result = [];
  for (const channels of groups.values()) {
    const n = channels.length;
    channels.forEach(({ g1, g2, c1, c2 }, i) => {
      const [ca, cb] = [c1, c2].sort();
      // Offset: spread bundle symmetrically around 0
      const offset = (i - (n - 1) / 2) * CHANNEL_SPACING;
      // Assign each gate to its canonical end
      const g_a = CENTER_BY_GATE[g1] === ca ? g1 : g2;
      const g_b = g_a === g1 ? g2 : g1;
      result.push({
        gates: /** @type {[number,number]} */ ([g1, g2]),
        g_a,   // gate label near ca
        g_b,   // gate label near cb
        c1: ca,
        c2: cb,
        offset,
      });
    });
  }
  return result;
}
