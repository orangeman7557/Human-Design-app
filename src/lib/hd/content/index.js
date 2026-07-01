// Element content access — Phase 6.A.
//
// Single entry point over the per-language content modules. Today only
// Spanish exists; adding a language is registering it in LANGS. Callers
// pass the element `kind` ('type', and later 'center', 'channel', …) and
// `key`, and optionally a language.

import es from './es.js';
import { CENTER_BY_GATE, CHANNELS } from '../constants.js';

const LANGS = { es };
export const DEFAULT_LANG = 'es';

function pack(lang) {
  return LANGS[lang] ?? LANGS[DEFAULT_LANG];
}

/**
 * Explanatory content for an element, or null when none is written yet.
 * @param {string} kind  e.g. 'type'
 * @param {string} key   e.g. 'generator'
 * @param {string} [lang]
 * @returns {{ title: string, paragraphs: string[] } | null}
 */
export function getElementInfo(kind, key, lang = DEFAULT_LANG) {
  const entry = pack(lang)[kind]?.[key];
  if (!entry) return null;
  // Centres are stored split (fn/defined/open) — Phase 7. The chip "i" shows the
  // function plus both states; the report uses getCenterReport for just one.
  if (kind === 'center') {
    return { title: entry.title, paragraphs: [entry.fn, entry.defined, entry.open] };
  }
  return entry;
}

/** Whether an element has explanatory content (drives the info "i"). */
export function hasElementInfo(kind, key, lang = DEFAULT_LANG) {
  return getElementInfo(kind, key, lang) != null;
}

/**
 * Concept-level info (the card / section-title "i"). For the `channel` and
 * `gate` concepts it also attaches a `list` of every channel / gate so the
 * panel can offer a full clickable index (reach ANY element, not only the
 * active ones) — Phase 6.D.
 * @param {string} key 'type'|'strategy'|'authority'|'profile'|'definition'|'center'|'channel'|'gate'
 * @param {string} [lang]
 */
export function getConceptInfo(key, lang = DEFAULT_LANG) {
  const base = getElementInfo('concept', key, lang);
  if (!base) return null;
  if (key === 'channel') {
    return { ...base, list: CHANNELS.map(([a, b]) => ({ label: `${a}-${b}`, kind: 'channel', key: `${a}-${b}` })) };
  }
  if (key === 'gate') {
    return { ...base, list: Array.from({ length: 64 }, (_, i) => ({ label: `${i + 1}`, kind: 'gate', key: `${i + 1}` })) };
  }
  return base;
}

/**
 * A profile (e.g. "3/5") has no single entry: it's built on the fly from its
 * two line descriptions, with a short intro on top. Returns the same
 * `{ title, paragraphs }` shape the panel expects, or null if either line is
 * missing.
 * @param {string} profile e.g. "3/5"
 * @param {string} [lang]
 */
export function getProfileInfo(profile, lang = DEFAULT_LANG) {
  const [a, b] = String(profile).split('/');
  const la = getElementInfo('profile', a, lang);
  const lb = getElementInfo('profile', b, lang);
  if (!la || !lb) return null;
  return {
    title: `Perfil ${profile}`,
    paragraphs: [
      `El perfil ${profile} combina dos líneas: la ${a}, consciente, y la ${b}, inconsciente. Cada una aporta su matiz, y juntas describen tu forma de aprender, relacionarte y desplegar tu propósito.`,
      `**${la.title}.** ${la.paragraphs[0]}`,
      ...la.paragraphs.slice(1),
      `**${lb.title}.** ${lb.paragraphs[0]}`,
      ...lb.paragraphs.slice(1)
    ]
  };
}

/** Natural-language labels used to build prompts. */
export function getPromptLabels(lang = DEFAULT_LANG) {
  return pack(lang).promptLabels;
}

/** I Ching hexagram name for a gate (gate N ↔ hexagram N), or null. */
export function getIchingName(gate, lang = DEFAULT_LANG) {
  return pack(lang).iching?.[Number(gate)] ?? null;
}

/**
 * Relative weight of a planet's activation (Phase 6.E) — `{ tier, label }` or
 * null. PROVISIONAL (see es.js): only Sun+Earth ≈ 70% is firm.
 */
export function getActivationWeight(planet, lang = DEFAULT_LANG) {
  return pack(lang).activationWeight?.[planet] ?? null;
}

// ── Initial report (Phase 7). Content accessors used by buildReport (report.js). ──

/** A general report section ({ title, paragraphs }) by id, or null. */
export function getReportSection(id, lang = DEFAULT_LANG) {
  return pack(lang).report?.[id] ?? null;
}

/** Short connective lead-in string for a personalised report section, or null. */
export function getReportLeadIn(id, lang = DEFAULT_LANG) {
  return pack(lang).report?.leadIn?.[id] ?? null;
}

/**
 * The report's own second-person body (paragraph array) for a personalised
 * section — kept separate from the shared, impersonal drawer text. Sections:
 * 'type' | 'strategy' | 'authority' | 'definition' (and 'profile' per line).
 * @returns {string[] | null}
 */
export function getReportBody(section, key, lang = DEFAULT_LANG) {
  return pack(lang).report?.[section]?.[key] ?? null;
}

/**
 * A profile for the report, composed in second person from its two lines: the
 * line *titles* come from the shared `profile` block, the *bodies* from the
 * report's own second-person `report.profile` lines.
 * @param {string} profile e.g. "1/3"
 * @returns {{ title: string, paragraphs: string[] } | null}
 */
export function getReportProfile(profile, lang = DEFAULT_LANG) {
  const [a, b] = String(profile).split('/');
  const la = getElementInfo('profile', a, lang);
  const lb = getElementInfo('profile', b, lang);
  const ba = getReportBody('profile', a, lang);
  const bb = getReportBody('profile', b, lang);
  if (!la || !lb || !ba || !bb) return null;
  return {
    title: `Perfil ${profile}`,
    paragraphs: [
      `Tu perfil ${profile} combina dos líneas: la ${a}, consciente, y la ${b}, inconsciente. Cada una aporta su matiz, y juntas describen tu forma de aprender, relacionarte y desplegar tu propósito.`,
      `**${la.title}.** ${ba[0]}`,
      ...ba.slice(1),
      `**${lb.title}.** ${bb[0]}`,
      ...bb.slice(1)
    ]
  };
}

/** The per-type practical block ({ energia, trampa, senales }) or null. */
export function getTypeReport(type, lang = DEFAULT_LANG) {
  return pack(lang).typeReport?.[type] ?? null;
}

/**
 * A centre for the report: its function + only the relevant state.
 * @param {string} key   centre key
 * @param {boolean} isDefined
 * @param {string} [lang]
 */
export function getCenterReport(key, isDefined, lang = DEFAULT_LANG) {
  const entry = pack(lang).center?.[key];
  if (!entry) return null;
  // The report uses the shared `fn` (a general description of what the centre
  // is) plus the report's own second-person state line (framed as *your* chart);
  // it falls back to the shared, impersonal state if no report text exists.
  const rep = pack(lang).report?.center?.[key];
  const state = rep ? (isDefined ? rep.defined : rep.open) : isDefined ? entry.defined : entry.open;
  return { title: entry.title, paragraphs: [entry.fn, state] };
}

// Gates and channels (Phase 6.D) carry only minimal own info — the mechanical
// facts (centre membership, channel endpoints) plus the public-domain I Ching
// root — and delegate the depth to the user's AI via the panel's prompt. So
// their `{ title, paragraphs }` is built on the fly rather than hand-written
// 64 + 36 times. Cross-references use the in-text link markup `[label](kind:key)`
// (rendered as a subtle underline by ElementInfo) so a gate links its centre, a
// channel links its centres and gates, etc. — clicking opens a nested drawer.

/** Short theme phrase for a gate (used to compose channels), or null. */
function gateTheme(gate, lang = DEFAULT_LANG) {
  return pack(lang).gate?.[Number(gate)]?.theme ?? null;
}

/** A gate's state in a chart: 'complete' | 'hanging' | 'inactive', or null if no chart. */
export function gateState(gate, chart) {
  if (!chart?.activeGates) return null;
  const g = Number(gate);
  if (!chart.activeGates.includes(g)) return 'inactive';
  const inChannel = (chart.activeChannels ?? []).some(([a, b]) => a === g || b === g);
  return inChannel ? 'complete' : 'hanging';
}

/** Personalised one-line coda for a gate given its state, or null. */
function gateCoda(state) {
  switch (state) {
    case 'complete':
      return 'En tu carta forma parte de un canal completo: es una energía que aportas de forma estable e integrada.';
    case 'hanging':
      return 'En tu carta está activa pero colgante: aportas su tema, y su otra mitad solo se completa de forma puntual, con ciertas personas o en ciertos tránsitos.';
    case 'inactive':
      return 'No está activa en tu carta: es una energía que reconoces y recibes de los demás y del entorno, más que una constante tuya.';
    default:
      return null;
  }
}

/**
 * Info for a single gate. With `chart`, appends a personalised state coda
 * (complete / hanging / inactive) — Phase 7.
 * @param {number|string} gate
 * @param {any} [chart]
 * @param {string} [lang]
 * @returns {{ title: string, paragraphs: string[] } | null}
 */
export function getGateInfo(gate, chart = null, lang = DEFAULT_LANG) {
  const g = Number(gate);
  const center = CENTER_BY_GATE[g];
  if (!center) return null;
  const p = pack(lang);
  const entry = p.gate?.[g];
  const labels = p.promptLabels.center;
  const name = getIchingName(g, lang);
  const paragraphs = [
    entry?.text ??
      `La puerta ${g} se sitúa en el **[centro ${labels[center] ?? center}](center:${center})**.`,
    name
      ? `Su raíz es el hexagrama ${g} del I Ching, «${name}».`
      : `Le corresponde el hexagrama ${g} del I Ching.`
  ];
  const coda = gateCoda(gateState(g, chart));
  if (coda) paragraphs.push(coda);
  paragraphs.push('Para una lectura más a fondo, puedes utilizar la opción de «saber más usando IA».');
  return { title: `Puerta ${g}`, paragraphs };
}

/** A channel's state in a chart: 'complete' | 'half' | 'none', or null if no chart. */
export function channelState(a, b, chart) {
  if (!chart?.activeGates) return null;
  const aOn = chart.activeGates.includes(Number(a));
  const bOn = chart.activeGates.includes(Number(b));
  if (aOn && bOn) return 'complete';
  if (aOn || bOn) return 'half';
  return 'none';
}

/** Personalised coda for a channel given the chart, or null. */
function channelCoda(a, b, chart) {
  if (!chart?.activeGates) return null;
  const aOn = chart.activeGates.includes(a);
  const bOn = chart.activeGates.includes(b);
  if (aOn && bOn) {
    return 'Tienes este canal completo en tu carta: define sus dos centros y mantiene esa corriente estable entre ellos.';
  }
  if (aOn || bOn) {
    const on = aOn ? a : b;
    const off = aOn ? b : a;
    return `En tu carta tienes una de sus dos puertas (la [puerta ${on}](gate:${on})) pero no la otra (la [puerta ${off}](gate:${off})): es un medio canal que se completa de forma puntual, con quien tenga la puerta que falta o en ciertos tránsitos.`;
  }
  return 'Ninguna de sus dos puertas está activa en tu carta: es una corriente que encuentras sobre todo en los demás.';
}

/**
 * Info for a channel given as a "g1-g2" string or [g1, g2] pair. With `chart`,
 * appends a personalised state coda (complete / half / none) — Phase 7.
 * @param {string|number[]} pair
 * @param {any} [chart]
 * @param {string} [lang]
 * @returns {{ title: string, paragraphs: string[] } | null}
 */
export function getChannelInfo(pair, chart = null, lang = DEFAULT_LANG) {
  const [a, b] = Array.isArray(pair) ? pair.map(Number) : String(pair).split('-').map(Number);
  const ca = CENTER_BY_GATE[a];
  const cb = CENTER_BY_GATE[b];
  if (!ca || !cb) return null;
  const labels = pack(lang).promptLabels.center;
  const ta = gateTheme(a, lang);
  const tb = gateTheme(b, lang);
  const paragraphs = [
    `El canal ${a}-${b} conecta el **[centro ${labels[ca] ?? ca}](center:${ca})** ([puerta ${a}](gate:${a})) con el **[centro ${labels[cb] ?? cb}](center:${cb})** ([puerta ${b}](gate:${b})). Con sus dos puertas activas queda completo, define ambos centros y crea una corriente de energía estable entre ellos.`
  ];
  if (ta && tb) {
    paragraphs.push(`Reúne ${ta} ([puerta ${a}](gate:${a})) y ${tb} ([puerta ${b}](gate:${b})), que conviene leer juntas para captar su carácter.`);
  }
  const coda = channelCoda(a, b, chart);
  if (coda) paragraphs.push(coda);
  paragraphs.push('Para una lectura más a fondo, puedes utilizar la opción de «saber más usando IA».');
  return { title: `Canal ${a}-${b}`, paragraphs };
}
