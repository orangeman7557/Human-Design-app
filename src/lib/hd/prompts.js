// Prompt builder — Phase 6 (prompts cleaned up 2026-06-22; templated Phase M).
//
// Turns an element + the user's chart into a ready-made, *clean* prompt the
// user takes to their own AI. The app never calls an AI; it only composes the
// text. Each element offers up to two angles:
//   - general: the concept in the abstract (always available).
//   - chart:   the element read together with the rest of this chart.
//
// House style (kept deliberately short so the AI isn't boxed in):
//   general → "<frame>, ¿me explicas en detalle <X>?"
//   chart   → "<frame>, para <quién>, ¿me explicas en detalle <X>?"
// where <quién> = "un Generador, perfil 3/5, autoridad Sacral, centros
// definidos …". Prompts stay impersonal (no first person): the chart on screen
// may belong to someone else (a saved chart).
//
// Every one of those sentence fragments is grammar-bound (articles, gender,
// word order), so they live in the language pack as templates
// (`promptTemplates`) rather than here — see docs/fase-m-multilingue.md.
//
// `chart` is null when the angle doesn't apply (most concepts are abstract). A
// gate/channel chart angle always applies when there's a chart, and its prompt
// names how that element sits in it (a gate: complete / hanging / inactive; a
// channel: complete / half / none).

import {
  getPromptLabels,
  getPromptTemplates,
  getSignalNames,
  formatCrossGates,
  getCrossName,
  fillTpl,
  gateState,
  channelState,
  getLocale
} from './content/index.js';

/** General angle. */
const ask = (T, subject) => fillTpl(T.ask, { frame: T.frame, subject });

/** Impersonal descriptor of the chart, e.g. "un Generador, perfil 3/5, …". */
function who(T, L, chart) {
  // Every field is optional: some call sites (concept prompts) can reach here
  // before a chart exists, and a missing one should thin the sentence out, not
  // throw. `??` on each lookup mirrors the `definedCenters` guard that was
  // already here.
  const c = chart ?? {};
  return fillTpl(T.who, {
    type: L.type[c.type] ?? c.type ?? '',
    profile: c.profile ?? '',
    authority: L.authority[c.authority] ?? c.authority ?? '',
    definition: L.definition[c.definition] ?? c.definition ?? '',
    centers: (c.definedCenters ?? []).map((x) => L.center[x] ?? x).join(', ') || T.none
  });
}

/** Chart angle: same as `ask` but prefixed with the chart descriptor. */
const askChart = (T, L, chart, subject) =>
  fillTpl(T.askChart, { frame: T.frame, who: who(T, L, chart), subject });

/** The planets whose Personality/Design activations light up gate `g`. */
function gateActivations(T, L, chart, g) {
  const parts = [];
  for (const side of ['personality', 'design']) {
    for (const [planet, act] of Object.entries(chart?.[side] ?? {})) {
      if (act?.gate === g) {
        parts.push(
          fillTpl(T.activation, {
            planet: L.planet?.[planet] ?? planet,
            side: T.side[side],
            line: act.line
          })
        );
      }
    }
  }
  return parts;
}

/** Gate chart-angle subject, naming the gate's state (and activations). */
function gateChartSubject(T, L, chart, g, state) {
  const acts = gateActivations(T, L, chart, g);
  const by = acts.length ? fillTpl(T.gate.by, { acts: acts.join(T.activationJoin) }) : '';
  const tail = fillTpl(T.gate[state] ?? '', { by });
  return fillTpl(T.gate.subject, { g }) + tail;
}

/** Channel chart-angle subject, naming the channel's state in the chart. */
function channelChartSubject(T, a, b, state) {
  return fillTpl(T.channel.subject, { a, b }) + (T.channel[state] ?? '');
}

/**
 * @param {string} kind   'concept' | 'type' | 'strategy' | 'authority' | 'profile' | 'definition' | 'center' | 'gate' | 'channel' | 'activationCol' | 'planet'
 * @param {string} key    element key (for 'concept', the category name; for 'profile', the "3/5" string)
 * @param {any} chart      computed chart (type, authority, strategy, profile, definedCenters, personality, design…)
 * @param {string} [lang]
 * @param {string|null} [shareUrl] when given, the chart-angle prompt ends with a
 *   link to this chart's shareable page (which serves the full profile as JSON
 *   to an AI). Only the chart angle gets it — the general angle isn't about this
 *   chart. Phase: shareable-profile (aug 2026).
 * @returns {{ general: string, chart: string | null }}
 */
export function buildPrompts(kind, key, chart, lang = getLocale(), shareUrl = null) {
  const out = buildPromptsCore(kind, key, chart, lang);
  if (shareUrl && out?.chart) {
    out.chart += fillTpl(getPromptTemplates(lang).chartLink, { url: shareUrl });
  }
  return out;
}

/** @returns {{ general: string, chart: string | null }} */
function buildPromptsCore(kind, key, chart, lang = getLocale()) {
  const L = getPromptLabels(lang);
  const T = getPromptTemplates(lang);
  const S = T.subject;

  if (kind === 'concept') return conceptPrompts(T, L, key, chart);

  if (kind === 'type') {
    const subject = fillTpl(S.type, { name: L.type[key] ?? key });
    // The chart angle only makes sense for the chart's own type.
    return {
      general: ask(T, subject),
      chart: key === chart.type ? askChart(T, L, chart, subject) : null
    };
  }

  if (kind === 'strategy') {
    const subject = fillTpl(S.strategy, { name: L.strategy[key] ?? key });
    return { general: ask(T, subject), chart: askChart(T, L, chart, subject) };
  }

  if (kind === 'authority') {
    const subject = fillTpl(S.authority, { name: L.authority[key] ?? key });
    return { general: ask(T, subject), chart: askChart(T, L, chart, subject) };
  }

  if (kind === 'profile') {
    // key is the "3/5" string, or a single line ("3") from the lines schema.
    const isLine = !String(key).includes('/');
    const subject = isLine ? fillTpl(S.profileLine, { n: key }) : fillTpl(S.profile, { n: key });
    return {
      general: ask(T, subject),
      chart: isLine ? null : askChart(T, L, chart, subject)
    };
  }

  if (kind === 'definition') {
    const subject =
      key === 'no-definition'
        ? S.noDefinition
        : fillTpl(S.definition, { name: L.definition[key] ?? key });
    return { general: ask(T, subject), chart: askChart(T, L, chart, subject) };
  }

  if (kind === 'center') {
    const subject = fillTpl(S.center, { name: L.center[key] ?? key });
    return { general: ask(T, subject), chart: askChart(T, L, chart, subject) };
  }

  if (kind === 'gate') {
    const g = Number(key);
    // The chart angle applies to any gate (even one reached through the full
    // index that isn't active) and names its state: complete / hanging / inactive.
    const state = gateState(g, chart);
    return {
      general: ask(T, fillTpl(T.gate.subject, { g })),
      chart: state ? askChart(T, L, chart, gateChartSubject(T, L, chart, g, state)) : null
    };
  }

  if (kind === 'channel') {
    const [a, b] = String(key).split('-').map(Number);
    // Same for channels, naming the state: complete / half / none.
    const state = channelState(a, b, chart);
    return {
      general: ask(T, fillTpl(T.channel.subject, { a, b })),
      chart: state ? askChart(T, L, chart, channelChartSubject(T, a, b, state)) : null
    };
  }

  // Signals come as a PAIR, and the pair belongs to a type — so `key` is the
  // type, and a pair reached from the index that isn't this chart's type gets
  // the general angle only.
  if (kind === 'signal') {
    const names = getSignalNames(key, lang);
    if (!names) return { general: '', chart: null };
    const subject = fillTpl(S.signal, {
      type: L.type?.[key] ?? key,
      aligned: names.aligned,
      misaligned: names.misaligned
    });
    return {
      general: ask(T, subject),
      chart: key === chart?.type ? askChart(T, L, chart, subject) : null
    };
  }

  if (kind === 'cross') {
    if (!chart?.cross) return { general: '', chart: null };
    const subject = fillTpl(S.cross, {
      name: getCrossName(chart.cross, lang) ?? L.cross?.[chart.cross.angle] ?? key,
      gates: formatCrossGates(chart.cross, lang)
    });
    return { general: ask(T, subject), chart: askChart(T, L, chart, subject) };
  }

  if (kind === 'activationCol') {
    return { general: ask(T, T.activationCol[key] ?? key), chart: null };
  }

  if (kind === 'planet') {
    const name = L.planet?.[key] ?? key;
    const p = chart?.personality?.[key];
    const d = chart?.design?.[key];
    // The chart angle names this planet's two activations in the chart.
    return {
      general: ask(T, fillTpl(S.planet, { name })),
      chart:
        p && d
          ? fillTpl(T.planetChart, {
              frame: T.frame,
              who: who(T, L, chart),
              name,
              pg: p.gate,
              pl: p.line,
              dg: d.gate,
              dl: d.line
            })
          : null
    };
  }

  return { general: '', chart: null };
}

/** Concept-level prompts (the card / section-title "i"). Only `bodygraph` and
 *  `center` have a chart angle. */
function conceptPrompts(T, L, key, chart) {
  const C = T.concept;
  if (key === 'bodygraph') {
    return { general: ask(T, C.bodygraph), chart: askChart(T, L, chart, C.bodygraphChart) };
  }
  if (key === 'center') {
    return { general: ask(T, C.centerGeneral), chart: askChart(T, L, chart, C.centerChart) };
  }
  const subject = C[key];
  return { general: subject ? ask(T, subject) : '', chart: null };
}
