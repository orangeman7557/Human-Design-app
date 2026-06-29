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
  getProfileInfo,
  getReportSection,
  getReportLeadIn,
  getTypeReport,
  getCenterReport,
  getPromptLabels,
  DEFAULT_LANG
} from './content/index.js';

/**
 * @typedef {{ id: string, title: string, paragraphs: string[] }} ReportSection
 */

/**
 * Build the ordered report sections for a chart.
 * @param {any} chart  computed chart (type, strategy, authority, profile, definition, definedCenters)
 * @param {string} [lang]
 * @returns {ReportSection[]}
 */
export function buildReport(chart, lang = DEFAULT_LANG) {
  if (!chart) return [];
  const L = getPromptLabels(lang);
  /** @type {ReportSection[]} */
  const sections = [];

  const add = (id, title, paragraphs) => {
    const ps = (paragraphs ?? []).filter(Boolean);
    if (title && ps.length) sections.push({ id, title, paragraphs: ps });
  };
  const block = (id) => {
    const s = getReportSection(id, lang);
    if (s) add(id, s.title, s.paragraphs);
  };

  // ── Parte A — el marco (general, igual para todas las cartas). ──
  block('intro');
  block('ants');
  block('chart');
  block('conditioning');
  block('experiment');

  // ── Parte B — tu carta (personalizado). ──
  const type = getElementInfo('type', chart.type, lang);
  if (type) add('type', `Tu tipo: ${L.type?.[chart.type] ?? type.title}`, type.paragraphs);

  block('collective');

  const strat = getElementInfo('strategy', chart.strategy, lang);
  if (strat) add('strategy', `Tu estrategia: ${strat.title}`, [getReportLeadIn('strategy', lang), ...strat.paragraphs]);

  const auth = getElementInfo('authority', chart.authority, lang);
  if (auth) add('authority', `Tu autoridad: ${L.authority?.[chart.authority] ?? auth.title}`, [getReportLeadIn('authority', lang), ...auth.paragraphs]);

  const tr = getTypeReport(chart.type, lang);
  if (tr) add('practice', 'Vivir según tu diseño', [tr.energia, tr.trampa, tr.senales]);

  const prof = getProfileInfo(chart.profile, lang);
  if (prof) add('profile', `Tu perfil ${chart.profile}`, prof.paragraphs);

  const def = getElementInfo('definition', chart.definition, lang);
  if (def) add('definition', 'Tu definición', [getReportLeadIn('definition', lang), ...def.paragraphs]);

  // Centres: defined first, then open; each as a heading paragraph + its detail.
  const defined = CENTERS.filter((c) => chart.definedCenters?.includes(c));
  const open = CENTERS.filter((c) => !chart.definedCenters?.includes(c));
  const centerParas = [getReportLeadIn('centers', lang)];
  for (const c of [...defined, ...open]) {
    const isDef = chart.definedCenters?.includes(c);
    const ci = getCenterReport(c, isDef, lang);
    if (ci) {
      centerParas.push(`**${ci.title}** · ${isDef ? 'definido' : 'indefinido (abierto)'}`);
      centerParas.push(...ci.paragraphs);
    }
  }
  add('centers', 'Tus centros, uno a uno', centerParas);

  return sections;
}

/**
 * A ready-to-paste prompt for a personalised initial reading of the whole chart
 * (Parte C — handoff). Impersonal, since the chart may belong to someone else.
 * @param {any} chart
 * @param {string} [lang]
 * @returns {string}
 */
export function buildReportPrompt(chart, lang = DEFAULT_LANG) {
  const L = getPromptLabels(lang);
  const type = L.type?.[chart.type] ?? chart.type;
  const authority = L.authority?.[chart.authority] ?? chart.authority;
  const strategy = L.strategy?.[chart.strategy] ?? chart.strategy;
  const definition = L.definition?.[chart.definition] ?? chart.definition;
  const centers = (chart.definedCenters ?? []).map((c) => L.center?.[c] ?? c).join(', ');
  return (
    'En el marco de Human Design, ¿me haces una lectura inicial y sencilla de esta ' +
    'carta, pensada para alguien que acaba de descubrir su diseño? Se trata de ' +
    `un ${type}, estrategia «${strategy}», autoridad ${authority}, perfil ` +
    `${chart.profile}, ${definition}, con los centros definidos: ${centers || 'ninguno'}. ` +
    'Explícame en lenguaje llano qué significa en conjunto, cómo le conviene tomar ' +
    'decisiones y gestionar su energía, y los errores más típicos de su tipo.'
  );
}
