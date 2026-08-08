// Shareable profile as JSON (aug 2026). A shared-chart link (/{lang}/chart?…)
// serves this object to non-human requests (AI fetchers, scripts) so they get
// the full computed profile without running the SPA — while a person clicking
// the same link still sees the normal chart. The detection lives in the Worker
// (hooks.server.js); this module only shapes the payload.
//
// Every closed-set value carries both its technical key (the standard HD name,
// language-independent) and a readable label in the link's language, so the AI
// has context either way.

import { CENTERS } from './constants.js';
import {
  getDisplayLabels,
  getCrossName,
  getChannelName,
  getLocale
} from './content/index.js';

/** Planet order for the activations block (matches the chart's activation table). */
const PLANET_ORDER = [
  'sun', 'earth', 'moon', 'northNode', 'southNode', 'mercury', 'venus',
  'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'
];

/** Reduce a side's activations to { planet: { gate, line } }. */
function sideActivations(side) {
  /** @type {Record<string, { gate: number, line: number }>} */
  const out = {};
  for (const planet of PLANET_ORDER) {
    const a = side?.[planet];
    if (a) out[planet] = { gate: a.gate, line: a.line };
  }
  return out;
}

/**
 * Build the shareable JSON profile from a computed chart + its birth data.
 * @param {any} chart  result of computeChart()
 * @param {any} birth  the birthData object (name/date/time/place/coords/timezone)
 * @param {string} [lang]
 */
export function buildProfileJson(chart, birth, lang = getLocale()) {
  const L = getDisplayLabels(lang);
  const defined = chart.definedCenters ?? [];
  const open = CENTERS.filter((c) => !defined.includes(c));

  return {
    language: lang,
    birth: {
      name: birth?.name ?? null,
      date: birth?.date ?? null,
      time: birth?.time ?? null,
      place: birth?.placeLabel ?? null,
      latitude: birth?.latitude ?? null,
      longitude: birth?.longitude ?? null,
      timezone: birth?.timezone ?? null
    },
    type: chart.type,
    typeLabel: L.type?.[chart.type] ?? chart.type,
    strategy: chart.strategy,
    strategyLabel: L.strategy?.[chart.strategy] ?? chart.strategy,
    authority: chart.authority,
    authorityLabel: L.authority?.[chart.authority] ?? chart.authority,
    profile: chart.profile,
    definition: chart.definition,
    definitionLabel: L.definition?.[chart.definition] ?? chart.definition,
    definedCenters: defined,
    definedCentersLabels: defined.map((c) => L.center?.[c] ?? c),
    openCenters: open,
    openCentersLabels: open.map((c) => L.center?.[c] ?? c),
    activeGates: [...(chart.activeGates ?? [])].sort((a, b) => a - b),
    activeChannels: (chart.activeChannels ?? []).map(([a, b]) => ({
      gates: [a, b],
      name: getChannelName(a, b, lang)
    })),
    cross: chart.cross
      ? {
          angle: chart.cross.angle,
          gates: chart.cross.gates,
          name: getCrossName(chart.cross, lang)
        }
      : null,
    activations: {
      personality: sideActivations(chart.personality),
      design: sideActivations(chart.design)
    }
  };
}
