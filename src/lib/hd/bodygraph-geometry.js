// AI-authored — geometry constants and helpers for the SVG bodygraph.
// Coordinates are relative to a 380×510 viewBox.
//
// This file is "structural truth": center positions, shapes, palette, and the
// helpers that turn the channel list into renderable lines + label positions.
// Pixel-perfect Rave-style placement of every gate on its center perimeter is
// a Phase 3 polish item; for now we approximate by drawing channels center-to-
// center and pushing gate labels just outside the perimeter along each channel.

import { CENTER_BY_GATE, CHANNELS } from './constants.js';

// ── Center-of-mass positions ────────────────────────────────────────────────
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

// ── Center shape definitions ────────────────────────────────────────────────
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

// ── HD-standard fill colors when a center is defined ────────────────────────
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

// Perpendicular gap between parallel channels sharing the same center pair.
export const CHANNEL_SPACING = 6;

/**
 * SVG polygon `points` string for a center shape (returns null for rects).
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
  if (s.type === 'diamond') {
    return `${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`;
  }
  return null;
}

/**
 * Distance from a center's origin to its perimeter along the unit direction
 * (ux, uy). Exact for rect and diamond; conservative (circumradius) for
 * triangles.
 */
function exitDistance(name, ux, uy) {
  const s = CENTER_SHAPES[name];
  if (s.type === 'rect') {
    const tx = Math.abs(ux) > 1e-6 ? (s.w / 2) / Math.abs(ux) : Infinity;
    const ty = Math.abs(uy) > 1e-6 ? (s.h / 2) / Math.abs(uy) : Infinity;
    return Math.min(tx, ty);
  }
  if (s.type === 'diamond') {
    return s.r / (Math.abs(ux) + Math.abs(uy));
  }
  return s.r;
}

/**
 * SVG endpoints for a channel line, optionally offset perpendicular to the
 * c1→c2 direction (used to spread parallel channels in a bundle).
 */
export function channelLine(c1, c2, offset) {
  const p1 = CENTER_POS[c1];
  const p2 = CENTER_POS[c2];
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
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
 * Position for a gate-number label just *outside* the perimeter of `home`,
 * along the line from `home` to `far`, plus a perpendicular `offset` that
 * matches its sibling channel line in a parallel bundle.
 */
export function gateOuterPos(home, far, offset, margin = 5) {
  const p1 = CENTER_POS[home];
  const p2 = CENTER_POS[far];
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const r = exitDistance(home, ux, uy) + margin;
  const px = -uy;
  const py = ux;
  return {
    x: p1.x + ux * r + px * offset,
    y: p1.y + uy * r + py * offset,
  };
}

/**
 * Builds per-channel rendering metadata: canonical center pair, perpendicular
 * offset within the bundle, and gate↔end assignment.
 */
export function buildChannelGeometry() {
  /** @type {Map<string, Array<{g1:number, g2:number, c1:string, c2:string}>>} */
  const groups = new Map();

  for (const [g1, g2] of CHANNELS) {
    const c1 = CENTER_BY_GATE[g1];
    const c2 = CENTER_BY_GATE[g2];
    const [ca, cb] = [c1, c2].sort();
    const key = `${ca}:${cb}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ g1, g2, c1, c2 });
  }

  const result = [];
  for (const channels of groups.values()) {
    const n = channels.length;
    channels.forEach(({ g1, g2, c1, c2 }, i) => {
      const [ca, cb] = [c1, c2].sort();
      const offset = (i - (n - 1) / 2) * CHANNEL_SPACING;
      const g_a = CENTER_BY_GATE[g1] === ca ? g1 : g2;
      const g_b = g_a === g1 ? g2 : g1;
      result.push({
        gates: /** @type {[number,number]} */ ([g1, g2]),
        g_a,
        g_b,
        c1: ca,
        c2: cb,
        offset,
      });
    });
  }
  return result;
}
