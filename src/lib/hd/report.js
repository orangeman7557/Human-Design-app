// Initial report assembly (Phase 7).
//
// Turns a computed chart into the ordered list of sections the initial report
// shows. Pure data: the UI (InitialReport.svelte) renders each section's
// paragraphs with the same markup as the element panels (**bold**, *italic*,
// [label](kind:key) links). No AI, no calculation here — the personalised
// substance is reused from the content library; only the assembly lives here.

import { CENTERS } from './constants.js';
import {
  getElementInfo,
  getReportSection,
  getReportLeadIn,
  getReportBody,
  getReportProfile,
  getTypeReport,
  getCenterReport,
  getPromptLabels,
  getReportShell,
  fillTpl,
  getLocale
} from './content/index.js';

/**
 * @typedef {{ id: string, title: string, paragraphs: string[], items?: any[] }} ReportSection
 */

/** "Tu definición: split" (or just "Tu definición" for a Reflector). */
function definitionTitle(R, key, fullTitle) {
  if (key === 'no-definition') return R.definitionTitleNone;
  const bare = String(fullTitle).replace(new RegExp(R.definitionPrefix, 'i'), '');
  return fillTpl(R.definitionTitle, { definition: bare });
}

/**
 * Build the ordered report sections for a chart.
 * @param {any} chart  computed chart (type, strategy, authority, profile, definition, definedCenters)
 * @param {string} [lang]
 * @returns {ReportSection[]}
 */
export function buildReport(chart, lang = getLocale()) {
  if (!chart) return [];
  const L = getPromptLabels(lang);
  const R = getReportShell(lang);
  /** @type {ReportSection[]} */
  const sections = [];

  const add = (id, title, paragraphs, extra = {}) => {
    const ps = (paragraphs ?? []).filter(Boolean);
    if (title && (ps.length || extra.items)) sections.push({ id, title, paragraphs: ps, ...extra });
  };

  // ── Parte A — el marco (general, igual para todas las cartas). ──
  // "Qué es Human Design" = intro + the ant analogy folded in, no own heading.
  const intro = getReportSection('intro', lang);
  const ants = getReportSection('ants', lang);
  if (intro) add('intro', intro.title, [...intro.paragraphs, ...(ants?.paragraphs ?? [])]);

  const exp = getReportSection('experiment', lang);
  if (exp) add('experiment', exp.title, exp.paragraphs);

  const bg = getReportSection('chart', lang);
  if (bg) add('chart', bg.title, bg.paragraphs);

  // ── Parte B — tu carta (personalizado). ──
  // Tipos = the collective comparison + this chart's type.
  const typeBody = getReportBody('type', chart.type, lang);
  const coll = getReportSection('collective', lang);
  if (typeBody) {
    const typeLabel = L.type?.[chart.type] ?? chart.type;
    // The collective comparison reads as intro + a bulleted list of the five
    // types + outro; then a sub-heading marks the jump to this chart's own type.
    add('type', fillTpl(R.typeTitle, { type: typeLabel }), [
      coll?.intro,
      coll?.bullets ? { bullets: coll.bullets } : null,
      coll?.outro,
      { subhead: fillTpl(R.typeSubhead, { type: typeLabel }) },
      ...typeBody
    ]);
  }

  // Centros = conditioning + a one-by-one walk through the nine centres, in the
  // canonical bodygraph order (head/ajna … sacral/root), not defined-first.
  const cond = getReportSection('conditioning', lang);
  const items = CENTERS.map((c) => {
    const isDef = chart.definedCenters?.includes(c);
    const ci = getCenterReport(c, isDef, lang);
    return ci && { key: c, title: ci.title, defined: isDef, fn: ci.paragraphs[0], state: ci.paragraphs[1] };
  }).filter(Boolean);
  add(
    'centers',
    R.centersTitle,
    [...(cond?.paragraphs ?? []), getReportLeadIn('centers', lang)],
    { items }
  );

  const strat = getElementInfo('strategy', chart.strategy, lang);
  const stratBody = getReportBody('strategy', chart.strategy, lang);
  if (strat && stratBody) add('strategy', fillTpl(R.strategyTitle, { strategy: strat.title }), [getReportLeadIn('strategy', lang), ...stratBody]);

  const auth = getElementInfo('authority', chart.authority, lang);
  const authBody = getReportBody('authority', chart.authority, lang);
  if (auth && authBody) add('authority', fillTpl(R.authorityTitle, { authority: L.authority?.[chart.authority] ?? auth.title }), [getReportLeadIn('authority', lang), ...authBody]);

  const prof = getReportProfile(chart.profile, lang);
  if (prof) add('profile', fillTpl(R.profileTitle, { profile: chart.profile }), prof.paragraphs);

  const def = getElementInfo('definition', chart.definition, lang);
  const defBody = getReportBody('definition', chart.definition, lang);
  if (def && defBody) add('definition', definitionTitle(R, chart.definition, def.title), [getReportLeadIn('definition', lang), ...defBody]);

  const tr = getTypeReport(chart.type, lang);
  if (tr) add('practice', R.practiceTitle, [getReportLeadIn('practice', lang), tr.energia, tr.trampa, tr.senales]);

  return sections;
}

/**
 * A ready-to-paste prompt for the closing "Saber más" handoff. First person and
 * deliberately open-ended (the report covers many topics, so the user completes
 * what they want to go deeper on).
 * @param {any} chart
 * @param {string} [lang]
 * @returns {string}
 */
export function buildReportPrompt(chart, lang = getLocale()) {
  const L = getPromptLabels(lang);
  const R = getReportShell(lang);
  const centers = (chart.definedCenters ?? []).map((c) => L.center?.[c] ?? c).join(', ');
  return fillTpl(R.closingPrompt, {
    type: L.type?.[chart.type] ?? chart.type,
    profile: chart.profile,
    authority: L.authority?.[chart.authority] ?? chart.authority,
    strategy: L.strategy?.[chart.strategy] ?? chart.strategy,
    definition: L.definition?.[chart.definition] ?? chart.definition,
    centers: centers || R.noCenters
  });
}
