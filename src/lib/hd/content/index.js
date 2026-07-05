// Element content access — Phase 6.A.
//
// Single entry point over the per-language content modules. Today only
// Spanish exists; adding a language is registering it in LANGS. Callers
// pass the element `kind` ('type', and later 'center', 'channel', …) and
// `key`, and optionally a language.

import es from './es.js';
import { CENTER_BY_GATE, CHANNELS, GATES_BY_CENTER, CENTERS } from '../constants.js';

const LANGS = { es };
export const DEFAULT_LANG = 'es';

function pack(lang) {
  return LANGS[lang] ?? LANGS[DEFAULT_LANG];
}

/** Capitalise the first letter (for names embedded in a title). */
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

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
  // A centre also lists its channels and gates as a schematic facts block, in
  // the same style as the gate/channel drawers (text audit, jul 2026).
  if (kind === 'center') {
    return {
      title: entry.title,
      paragraphs: [entry.fn, entry.defined, entry.open],
      facts: centerFacts(key, lang)
    };
  }
  // Closed-set categories append the full set of possibilities (text audit,
  // jul 2026): a compact clickable schema with the current element highlighted.
  const rel = relatedIndex(kind, key, lang);
  return rel ? { ...entry, related: rel } : entry;
}

/** Closed-set schema ({ heading, items, hasPct }) for a category, with
 *  `currentKeys` highlighted, or null when the category has no closed set. */
function relatedIndex(kind, currentKeys, lang = DEFAULT_LANG) {
  const idx = pack(lang).relatedIndex?.[kind];
  if (!idx) return null;
  const cur = new Set((Array.isArray(currentKeys) ? currentKeys : [currentKeys]).map(String));
  const items = Object.entries(idx.items).map(([k, it]) => ({
    kind,
    key: k,
    label: it.label,
    note: it.note,
    pct: it.pct ?? null,
    current: cur.has(String(k))
  }));
  return { heading: idx.heading, items, hasPct: items.some((i) => i.pct) };
}

/** A centre's schematic facts: its channels (with names) and its gates (with
 *  themes), each a clickable chip row — mirrors the gate/channel drawers. */
function centerFacts(center, lang = DEFAULT_LANG) {
  const p = pack(lang);
  const chans = CHANNELS.filter(([a, b]) => CENTER_BY_GATE[a] === center || CENTER_BY_GATE[b] === center);
  const gates = GATES_BY_CENTER[center] ?? [];
  return [
    {
      label: 'Canales',
      rows: chans.map(([a, b]) => {
        const k = `${a}-${b}`;
        const name = p.channel?.[k]?.name;
        return { chip: { label: k, kind: 'channel', key: k }, note: name ?? null };
      })
    },
    {
      label: 'Puertas',
      rows: gates.map((g) => {
        const t = gateTheme(g, lang);
        return { chip: { label: String(g), kind: 'gate', key: String(g) }, note: t ?? null };
      })
    }
  ];
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
export function getConceptInfo(key, chart = null, lang = DEFAULT_LANG) {
  const base = getElementInfo('concept', key, lang);
  if (!base) return null;
  const p = pack(lang);
  if (key === 'channel') {
    // Full index as "[chip] name" rows (text audit, jul 2026).
    return {
      ...base,
      list: CHANNELS.map(([a, b]) => ({
        label: `${a}-${b}`,
        kind: 'channel',
        key: `${a}-${b}`,
        note: p.channel?.[`${a}-${b}`]?.name ?? null
      }))
    };
  }
  if (key === 'gate') {
    return {
      ...base,
      list: Array.from({ length: 64 }, (_, i) => ({
        label: `${i + 1}`,
        kind: 'gate',
        key: `${i + 1}`,
        note: gateTheme(i + 1, lang)
      }))
    };
  }
  if (key === 'center') {
    // The nine centres as chips carrying the chart's defined/open state.
    const labels = p.promptLabels.center;
    const brief = p.centerBrief ?? {};
    const defined = new Set(chart?.definedCenters ?? []);
    return {
      ...base,
      centerStates: CENTERS.map((c) => ({
        kind: 'center',
        key: c,
        label: labels[c] ?? c,
        note: brief[c] ?? '',
        defined: defined.has(c)
      }))
    };
  }
  // The five closed-set categories also show their full schema at concept
  // level (no current element highlighted).
  const rel = relatedIndex(key, null, lang);
  return rel ? { ...base, related: rel } : base;
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
      `El perfil ${profile} combina dos líneas: la ${a}, consciente, y la ${b}, inconsciente. Cada una aporta su matiz, y juntas describen una forma de aprender, de relacionarse y de desplegar el propósito.`,
      `**${la.title}.** ${la.paragraphs[0]}`,
      ...la.paragraphs.slice(1),
      `**${lb.title}.** ${lb.paragraphs[0]}`,
      ...lb.paragraphs.slice(1)
    ],
    related: relatedIndex('profile', [a, b], lang)
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

/** Chart-state one-line coda for a gate, or null. Impersonal by rule: the
 *  drawers are the viewer's reference material and the chart on screen may be
 *  someone else's, so state lines say "esta carta" (voice decision 2026-07-03;
 *  only the initial report speaks in the second person). */
function gateCoda(state, g) {
  switch (state) {
    case 'complete':
      return `En esta carta, la puerta ${g} está activa y forma parte de un canal completo: es una energía que se aporta de forma estable e integrada.`;
    case 'hanging':
      return `En esta carta, la puerta ${g} está activa pero colgante: su tema está presente, y su otra mitad solo se completa de forma puntual, con ciertas personas o en ciertos tránsitos.`;
    case 'inactive':
      return `En esta carta, la puerta ${g} no está activa: es una energía que se reconoce y se recibe de los demás y del entorno, más que una constante propia.`;
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

  // Mechanical identity as a schematic `facts` block (text audit, jul 2026):
  // centre / channel(s) / harmonic gate(s), one row per element, rendered by
  // ElementInfo as aligned chip rows. Gates 10/20/34/57 (the integration
  // cluster) sit on more than one channel, so channel rows can be plural.
  const pairs = CHANNELS.filter(([a, b]) => a === g || b === g);
  const facts = [
    { label: 'Centro', inline: true, rows: [{ chip: { label: labels[center] ?? center, kind: 'center', key: center } }] },
    {
      label: pairs.length > 1 ? 'Canales' : 'Canal',
      rows: pairs.map(([a, b]) => {
        const k = `${a}-${b}`;
        const chName = p.channel?.[k]?.name;
        return { chip: { label: k, kind: 'channel', key: k }, note: chName ?? null };
      })
    },
    {
      label: pairs.length > 1 ? 'Puertas armónicas' : 'Puerta armónica',
      tip: pairs.length > 1 ? 'puertas que completan sus canales' : 'puerta que completa el canal',
      rows: pairs.map(([a, b]) => {
        const h = a === g ? b : a;
        const t = gateTheme(h, lang);
        return { chip: { label: String(h), kind: 'gate', key: String(h) }, note: t ?? null };
      })
    }
  ];

  const after = [
    name
      ? `Su raíz es el hexagrama ${g} del I Ching, "${name}".`
      : `Le corresponde el hexagrama ${g} del I Ching.`
  ];
  const coda = gateCoda(gateState(g, chart), g);
  if (coda) after.push(coda);
  after.push('Para una lectura más a fondo, puedes utilizar la opción de "saber más usando IA".');
  const theme = gateTheme(g, lang);
  const title = theme ? `Puerta ${g}: ${cap(theme)}` : `Puerta ${g}`;
  return { title, paragraphs: [entry?.text ?? `La puerta ${g}.`], facts, after };
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

/** Chart-state coda for a channel, or null. Impersonal, same rule as gateCoda. */
function channelCoda(a, b, chart) {
  if (!chart?.activeGates) return null;
  const aOn = chart.activeGates.includes(a);
  const bOn = chart.activeGates.includes(b);
  if (aOn && bOn) {
    return `En esta carta, el canal ${a}-${b} está completo: es una corriente que se aporta de forma estable e integrada.`;
  }
  if (aOn || bOn) {
    const on = aOn ? a : b;
    const off = aOn ? b : a;
    return `En esta carta, del canal ${a}-${b} está activa una de sus dos puertas (la [puerta ${on}](gate:${on})) pero no la otra (la [puerta ${off}](gate:${off})): es un medio canal que se completa de forma puntual, con quien tenga la puerta que falta o en ciertos tránsitos.`;
  }
  return `En esta carta, ninguna de las dos puertas del canal ${a}-${b} está activa: es una corriente que se encuentra sobre todo en los demás.`;
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
  const ch = pack(lang).channel?.[a < b ? `${a}-${b}` : `${b}-${a}`];

  // Essence first; the mechanical identity (centres, gates) lives in the
  // schematic `facts` block below (text audit, jul 2026).
  const paragraphs = [];
  if (ch && ta && tb) {
    paragraphs.push(`Es el **${ch.name}**: ${ch.essence}`);
  } else if (ta && tb) {
    paragraphs.push(`Reúne "${ta}" ([puerta ${a}](gate:${a})) y "${tb}" ([puerta ${b}](gate:${b})), que conviene leer juntas para captar su carácter.`);
  }

  const facts = [
    {
      label: 'Centros',
      inline: true,
      rows: [
        { chip: { label: labels[ca] ?? ca, kind: 'center', key: ca } },
        { chip: { label: labels[cb] ?? cb, kind: 'center', key: cb } }
      ]
    },
    {
      label: 'Puertas',
      rows: [
        { chip: { label: String(a), kind: 'gate', key: String(a) }, note: ta ?? null },
        { chip: { label: String(b), kind: 'gate', key: String(b) }, note: tb ?? null }
      ]
    }
  ];

  const after = [
    'Con sus dos puertas activas, el canal queda completo: define los dos centros que conecta y crea una corriente de energía estable entre ellos.'
  ];
  const coda = channelCoda(a, b, chart);
  if (coda) after.push(coda);
  after.push('Para una lectura más a fondo, puedes utilizar la opción de "saber más usando IA".');
  const title = ch?.name ? `${a}-${b}: ${cap(ch.name)}` : `Canal ${a}-${b}`;
  return { title, paragraphs, facts, after };
}

/**
 * Info for a planet. With `chart`, appends a schematic facts block with the
 * gates this planet activates in Personality and Design (text audit, jul 2026).
 * @param {string} planet
 * @param {any} [chart]
 * @param {string} [lang]
 */
export function getPlanetInfo(planet, chart = null, lang = DEFAULT_LANG) {
  const entry = pack(lang).planet?.[planet];
  if (!entry) return null;
  const row = (side) => {
    const act = chart?.[side]?.[planet];
    if (!act) return null;
    const t = gateTheme(act.gate, lang);
    return [{ chip: { label: String(act.gate), kind: 'gate', key: String(act.gate) }, note: t ?? null }];
  };
  const pRows = row('personality');
  const dRows = row('design');
  const facts = [];
  if (pRows) facts.push({ label: 'Personalidad', rows: pRows });
  if (dRows) facts.push({ label: 'Diseño', rows: dRows });
  return facts.length ? { ...entry, facts } : entry;
}
