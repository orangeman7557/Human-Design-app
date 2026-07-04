// Prompt builder — Phase 6 (prompts cleaned up 2026-06-22).
//
// Turns an element + the user's chart into a ready-made, *clean* prompt the
// user takes to their own AI. The app never calls an AI; it only composes the
// text. Each element offers up to two angles:
//   - general: the concept in the abstract (always available).
//   - chart:   the element read together with the rest of this chart.
//
// House style (kept deliberately short so the AI isn't boxed in):
//   general → "En el marco de Human Design, ¿me explicas en detalle <X>?"
//   chart   → "En el marco de Human Design, para <quién>, ¿me explicas en
//              detalle <X>?"
// where <quién> = "un Generador, perfil 3/5, autoridad Sacral, centros
// definidos …". Prompts stay impersonal (no first person): the chart on screen
// may belong to someone else (a saved chart).
//
// `chart` is null when the angle doesn't apply (most concepts are abstract). A
// gate/channel chart angle always applies when there's a chart, and its prompt
// names how that element sits in it (a gate: complete / hanging / inactive; a
// channel: complete / half / none).

import { getPromptLabels, gateState, channelState, DEFAULT_LANG } from './content/index.js';

const FRAME = 'En el marco de Human Design';
// Nudges the AI away from vague-mystical answers (text audit, jul 2026).
const TONE = ', de forma práctica y aterrizada';

/** General angle: "En el marco de Human Design, ¿me explicas en detalle <subject>, de forma práctica y aterrizada?" */
const ask = (subject) => `${FRAME}, ¿me explicas en detalle ${subject}${TONE}?`;

/** Impersonal descriptor of the chart, e.g. "un Generador, perfil 3/5, autoridad Sacral, definición split, centros definidos …". */
function who(L, chart) {
  const type = L.type[chart.type] ?? chart.type;
  const authority = L.authority[chart.authority] ?? chart.authority;
  const definition = L.definition[chart.definition] ?? chart.definition;
  const centers = (chart.definedCenters ?? [])
    .map((c) => L.center[c] ?? c)
    .join(', ');
  return (
    `un ${type}, perfil ${chart.profile}, autoridad ${authority}, ` +
    `${definition}, centros definidos ${centers || 'ninguno'}`
  );
}

/** Chart angle: same as `ask` but prefixed with the chart descriptor. */
const askChart = (L, chart, subject) =>
  `${FRAME}, para ${who(L, chart)}, ¿me explicas en detalle ${subject}${TONE}?`;

/** The planets whose Personality/Design activations light up gate `g`, e.g.
 *  "el Sol en Personalidad (línea 3)". Empty when the gate isn't active. */
function gateActivations(L, chart, g) {
  const parts = [];
  for (const [side, label] of [['personality', 'Personalidad'], ['design', 'Diseño']]) {
    for (const [planet, act] of Object.entries(chart?.[side] ?? {})) {
      if (act?.gate === g) parts.push(`${L.planet?.[planet] ?? planet} en ${label} (línea ${act.line})`);
    }
  }
  return parts;
}

/** Gate chart-angle subject, naming the gate's state (and activations) in the chart. */
function gateChartSubject(L, chart, g, state) {
  const acts = gateActivations(L, chart, g);
  const by = acts.length ? ` está activada por ${acts.join(' y ')} y` : '';
  const tail = {
    complete: `, que en esta carta${by} forma parte de un canal completo`,
    hanging: `, que en esta carta${by} está colgante (sin la otra mitad de su canal)`,
    inactive: ', que en esta carta no está activa'
  }[state] ?? '';
  return `la puerta ${g}${tail}`;
}

/** Channel chart-angle subject, naming the channel's state in the chart. */
function channelChartSubject(a, b, state) {
  const tail = {
    complete: ', que en esta carta está completo (define sus dos centros)',
    half: ', del que en esta carta solo está activa una de sus dos puertas (medio canal)',
    none: ', que en esta carta no está activo'
  }[state] ?? '';
  return `el canal ${a}-${b}${tail}`;
}

/**
 * @param {string} kind   'concept' | 'type' | 'strategy' | 'authority' | 'profile' | 'definition' | 'center' | 'gate' | 'channel' | 'activationCol' | 'planet'
 * @param {string} key    element key (for 'concept', the category name; for 'profile', the "3/5" string)
 * @param {any} chart      computed chart (type, authority, strategy, profile, definedCenters, personality, design…)
 * @param {string} [lang]
 * @returns {{ general: string, chart: string | null }}
 */
export function buildPrompts(kind, key, chart, lang = DEFAULT_LANG) {
  const L = getPromptLabels(lang);

  if (kind === 'concept') return conceptPrompts(L, key, chart);

  if (kind === 'type') {
    const type = L.type[key] ?? key;
    const isOwn = key === chart.type;
    // The chart angle only makes sense for the chart's own type.
    return {
      general: ask(`el tipo ${type}`),
      chart: isOwn ? askChart(L, chart, `el tipo ${type}`) : null
    };
  }

  if (kind === 'strategy') {
    const s = L.strategy[key] ?? key;
    return {
      general: ask(`la estrategia de "${s}"`),
      chart: askChart(L, chart, `la estrategia de "${s}"`)
    };
  }

  if (kind === 'authority') {
    const a = L.authority[key] ?? key;
    return {
      general: ask(`la autoridad ${a}`),
      chart: askChart(L, chart, `la autoridad ${a}`)
    };
  }

  if (kind === 'profile') {
    // key is the "3/5" string, or a single line ("3") from the lines schema.
    const isLine = !String(key).includes('/');
    const subject = isLine ? `la línea ${key} del perfil` : `el perfil ${key}`;
    return {
      general: ask(subject),
      chart: isLine ? null : askChart(L, chart, subject)
    };
  }

  if (kind === 'definition') {
    const d = L.definition[key] ?? key;
    // "sin definición" doesn't read as "la sin definición"; phrase it apart.
    const subject =
      key === 'no-definition'
        ? 'qué significa no tener definición (una carta sin definición)'
        : `la ${d}`;
    return { general: ask(subject), chart: askChart(L, chart, subject) };
  }

  if (kind === 'center') {
    const c = L.center[key] ?? key;
    return {
      general: ask(`el centro "${c}"`),
      chart: askChart(L, chart, `el centro "${c}"`)
    };
  }

  if (kind === 'gate') {
    const g = Number(key);
    // The chart angle applies to any gate (even one reached through the full
    // index that isn't active) and names its state: complete / hanging / inactive.
    const state = gateState(g, chart);
    return {
      general: ask(`la puerta ${g}`),
      chart: state ? askChart(L, chart, gateChartSubject(L, chart, g, state)) : null
    };
  }

  if (kind === 'channel') {
    const [a, b] = String(key).split('-').map(Number);
    // Same for channels, naming the state: complete / half / none.
    const state = channelState(a, b, chart);
    return {
      general: ask(`el canal ${a}-${b}`),
      chart: state ? askChart(L, chart, channelChartSubject(a, b, state)) : null
    };
  }

  if (kind === 'activationCol') {
    const subject = {
      personality:
        'la parte consciente (Personalidad) de una carta, calculada en el momento del nacimiento',
      design:
        'la parte inconsciente (Diseño) de una carta, calculada unos 88 días antes del nacimiento',
      weight: 'el peso o influencia relativa de cada activación planetaria'
    };
    return { general: ask(subject[key] ?? key), chart: null };
  }

  if (kind === 'planet') {
    const name = L.planet?.[key] ?? key;
    const p = chart?.personality?.[key];
    const d = chart?.design?.[key];
    // The chart angle names this planet's two activations in the chart.
    return {
      general: ask(`qué representa ${name}`),
      chart:
        p && d
          ? `${FRAME}, para ${who(L, chart)}, ¿me explicas en detalle qué ` +
            `representa ${name} y qué aportan sus dos activaciones en esta ` +
            `carta: ${p.gate}.${p.line} (consciente, Personalidad) y ` +
            `${d.gate}.${d.line} (inconsciente, Diseño)${TONE}?`
          : null
    };
  }

  return { general: '', chart: null };
}

/** Concept-level prompts (the card / section-title "i"). Only `center` has a chart angle. */
function conceptPrompts(L, key, chart) {
  if (key === 'bodygraph') {
    return {
      general: ask('qué es el bodygraph de Diseño Humano y cómo se lee'),
      chart: askChart(L, chart, 'cómo se lee este bodygraph en concreto')
    };
  }
  if (key === 'center') {
    return {
      general: ask(
        'qué son los nueve centros y qué diferencia hay entre tenerlos definidos o indefinidos'
      ),
      chart: askChart(
        L,
        chart,
        'qué implica la combinación de centros definidos e indefinidos de esta carta'
      )
    };
  }
  const subject = {
    type: 'qué son los tipos',
    strategy: 'qué es la estrategia',
    authority: 'qué es la autoridad',
    profile: 'qué es el perfil',
    definition: 'qué es la definición',
    channel: 'qué son los canales',
    gate: 'qué son las puertas',
    activation: 'qué son las activaciones planetarias'
  }[key];
  return { general: subject ? ask(subject) : '', chart: null };
}
