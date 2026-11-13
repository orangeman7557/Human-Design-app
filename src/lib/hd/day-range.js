// What an unknown birth time leaves open (HD-1, nov 2026).
//
// With the time unknown, the chart on screen is one of 48 possible ones (one
// per local half-hour of the birth day). This module computes them all and
// reduces them to what a reader needs: for each headline value, the set of
// values the day allows (in the order they appear through the day), plus the
// centres and channels that stay defined all day. The home slider's type band
// uses the per-slot list; the chart page uses the summary.
//
// 48 full computations take long enough to notice on a phone, so callers run
// this after the first paint, and `pause` lets it yield to the UI between slots.

import { computeChart } from './chart.js';

/** The 48 local half-hours of a day, "00:00" … "23:30". */
export const HALF_HOURS = Array.from(
  { length: 48 },
  (_, v) => `${String(Math.floor(v / 2)).padStart(2, '0')}:${v % 2 === 0 ? '00' : '30'}`
);

/** Fields whose day-long range is summarised. */
export const DAY_FIELDS = /** @type {const} */ (['type', 'authority', 'profile', 'definition', 'cross']);

/** Identity of a cross: same angle and same four gates. */
export const crossKey = (c) => (c ? `${c.angle}:${c.gates.join('-')}` : null);

/**
 * @typedef {{ time: string, type: string, authority: string, profile: string,
 *   definition: string, cross: { angle: string, gates: number[] } | null,
 *   definedCenters: string[], activeChannels: [number, number][] } | null} DaySlot
 *   null when that half-hour could not be computed.
 */

/**
 * @typedef {Object} DayRange
 * @property {DaySlot[]} slots one per HALF_HOURS entry
 * @property {{ type: string[], authority: string[], profile: string[],
 *   definition: string[], cross: { angle: string, gates: number[] }[] }} values
 *   distinct values per field, in order of first appearance through the day
 * @property {string[]} stable fields with a single value all day
 * @property {string[]} constantCenters centres defined in every slot
 * @property {[number, number][]} constantChannels channels active in every slot
 */

/**
 * Compute the chart at every half-hour of the birth's local day.
 * @param {{ date: string, timezone: string, latitude: number, longitude: number }} birth
 * @param {{ pause?: () => Promise<void> }} [opts] awaited between slots
 * @returns {Promise<DayRange>}
 */
export async function computeDayRange(birth, opts = {}) {
  /** @type {DaySlot[]} */
  const slots = [];
  for (const time of HALF_HOURS) {
    try {
      const c = await computeChart({
        name: null,
        date: birth.date,
        time,
        timezone: birth.timezone,
        latitude: birth.latitude,
        longitude: birth.longitude
      });
      slots.push({
        time,
        type: c.type,
        authority: c.authority,
        profile: c.profile,
        definition: c.definition,
        cross: c.cross ?? null,
        definedCenters: c.definedCenters,
        activeChannels: c.activeChannels
      });
    } catch {
      slots.push(null);
    }
    if (opts.pause) await opts.pause();
  }
  return summariseDay(slots);
}

/**
 * Reduce per-slot charts to the day summary (pure; split out for tests).
 * @param {DaySlot[]} slots
 * @returns {DayRange}
 */
export function summariseDay(slots) {
  const ok = slots.filter(Boolean);
  /** @type {any} */
  const values = {};
  for (const f of DAY_FIELDS) {
    const seen = new Map();
    for (const s of ok) {
      const k = f === 'cross' ? crossKey(s.cross) : s[f];
      if (k != null && !seen.has(k)) seen.set(k, s[f]);
    }
    values[f] = [...seen.values()];
  }
  const stable = DAY_FIELDS.filter((f) => values[f].length === 1);

  const chKey = ([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`;
  const constantCenters = ok.length
    ? ok[0].definedCenters.filter((c) => ok.every((s) => s.definedCenters.includes(c)))
    : [];
  const channelSets = ok.map((s) => new Set(s.activeChannels.map(chKey)));
  const constantChannels = ok.length
    ? ok[0].activeChannels.filter((ch) => channelSets.every((set) => set.has(chKey(ch))))
    : [];

  return { slots, values, stable, constantCenters, constantChannels };
}
