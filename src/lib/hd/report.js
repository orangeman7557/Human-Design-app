// Initial report assembly (Phase 7).
//
// Turns a computed chart into the ordered list of sections the initial report
// shows. Pure data: the UI (InitialReport.svelte) renders each section's
// paragraphs with the same markup as the element panels (**bold**, *italic*,
// [label](kind:key) links). No AI, no calculation here — the personalised
// substance is reused from the content library; only the assembly lives here.

import { CENTERS, CENTER_BY_GATE } from './constants.js';
import {
  getElementInfo,
  getReportSection,
  getReportLeadIn,
  getReportBody,
  getReportProfile,
  getTypeReport,
  getCenterReport,
  getPromptLabels,
  getPromptTemplates,
  getDisplayLabels,
  getReportShell,
  getSignalNames,
  formatCrossGates,
  getCrossName,
  fillTpl,
  getLocale
} from './content/index.js';

/**
 * @typedef {{ id: string, title: string, paragraphs: string[], items?: any[] }} ReportSection
 */

/** The definition's short name without the "Definición " prefix ("split"). */
function definitionBare(R, fullTitle) {
  return String(fullTitle).replace(new RegExp(R.definitionPrefix, 'i'), '');
}

/** "Tu definición: split" (or just "Tu definición" for a Reflector). */
function definitionTitle(R, key, fullTitle) {
  if (key === 'no-definition') return R.definitionTitleNone;
  return fillTpl(R.definitionTitle, { definition: definitionBare(R, fullTitle) });
}

/**
 * The connected groups of defined centers (joined by active channels), each
 * group's centers in bodygraph order — so a split definition can name which
 * centers actually fall together. Mirrors computeDefinition's graph in chart.js.
 * @param {any} chart
 * @returns {string[][]}
 */
function definitionGroups(chart) {
  const defined = chart.definedCenters ?? [];
  const set = new Set(defined);
  if (set.size === 0) return [];
  /** @type {Record<string, Set<string>>} */
  const adj = {};
  for (const c of defined) adj[c] = new Set();
  for (const [g1, g2] of chart.activeChannels ?? []) {
    const c1 = CENTER_BY_GATE[g1];
    const c2 = CENTER_BY_GATE[g2];
    if (c1 !== c2 && set.has(c1) && set.has(c2)) {
      adj[c1].add(c2);
      adj[c2].add(c1);
    }
  }
  const visited = new Set();
  const groups = [];
  for (const start of CENTERS) {
    if (!set.has(start) || visited.has(start)) continue;
    const group = [];
    const queue = [start];
    while (queue.length) {
      const cur = queue.shift();
      if (visited.has(cur)) continue;
      visited.add(cur);
      group.push(cur);
      for (const n of adj[cur]) if (!visited.has(n)) queue.push(n);
    }
    group.sort((a, b) => CENTERS.indexOf(a) - CENTERS.indexOf(b));
    groups.push(group);
  }
  return groups;
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
      { subhead: fillTpl(R.typeSubhead, { type: typeLabel, typeKey: chart.type }) },
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
  if (def && defBody) {
    // For a split (2+ groups): after the general lead-in, state the definition
    // explicitly and list which centers actually fall into each group, then the
    // explanation. Single / no-definition keep the plain lead-in + body.
    const groups = definitionGroups(chart);
    const centerLbl = getDisplayLabels(lang).center ?? {};
    const groupsBlock =
      groups.length >= 2
        ? [
            fillTpl(R.definitionGroupsLead, {
              label: definitionBare(R, def.title),
              n: groups.length
            }),
            { bullets: groups.map((g) => g.map((c) => centerLbl[c] ?? c).join(R.definitionGroupJoin)) }
          ]
        : [];
    add('definition', definitionTitle(R, chart.definition, def.title), [
      getReportLeadIn('definition', lang),
      ...groupsBlock,
      ...defBody
    ]);
  }

  const tr = getTypeReport(chart.type, lang);
  // Energy · trap · signals as three parallel bullets. The signals bullet leads
  // with a linked "Signals" heading, then the alignment / misalignment pair as
  // two sub-bullets, then the rest of the text (author revert, 2026-08).
  if (tr) {
    const names = getSignalNames(chart.type, lang);
    const signalsBullet =
      tr.senales && names
        ? {
            head: fillTpl(R.signalsBulletHead, { type: chart.type }),
            sub: [
              `**${R.signalAligned}:** ${names.aligned}`,
              `**${R.signalMisaligned}:** ${names.misaligned}`
            ],
            tail: tr.senales
          }
        : null;
    add('practice', R.practiceTitle, [
      getReportLeadIn('practice', lang),
      { bullets: [tr.energia, tr.trampa, signalsBullet].filter(Boolean) }
    ]);
  }

  // Purpose goes LAST and deliberately after "Living your design": the cross is
  // a backdrop, not a task, and putting it first invites a newcomer to fixate on
  // "my purpose" and skip strategy and authority, which are what actually get
  // used day to day (author decision 2026-07-22).
  const purpose = getReportSection('purpose', lang);
  const angleBody = getReportBody('crossAngle', chart.cross?.angle, lang);
  if (purpose && angleBody) {
    // The cross's canonical name, falling back to the bare angle label.
    const name = getCrossName(chart.cross, lang) ?? getDisplayLabels(lang).cross?.[chart.cross.angle] ?? '';
    add('purpose', purpose.title, [
      getReportLeadIn('purpose', lang),
      ...purpose.paragraphs,
      {
        subhead: fillTpl(R.purposeSubhead, {
          name,
          angle: chart.cross.angle,
          gates: formatCrossGates(chart.cross, lang)
        })
      },
      angleBody,
      purpose.outro
    ]);
  }

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
export function buildReportPrompt(chart, lang = getLocale(), shareUrl = null) {
  const L = getPromptLabels(lang);
  const R = getReportShell(lang);
  const centers = (chart.definedCenters ?? []).map((c) => L.center?.[c] ?? c).join(', ');
  let prompt = fillTpl(R.closingPrompt, {
    type: L.type?.[chart.type] ?? chart.type,
    profile: chart.profile,
    authority: L.authority?.[chart.authority] ?? chart.authority,
    strategy: L.strategy?.[chart.strategy] ?? chart.strategy,
    definition: L.definition?.[chart.definition] ?? chart.definition,
    centers: centers || R.noCenters
  });
  // The report handoff carries the whole chart, so it also gets the JSON link
  // (shareable-profile, aug 2026).
  if (shareUrl) prompt += fillTpl(getPromptTemplates(lang).chartLink, { url: shareUrl });
  return prompt;
}
