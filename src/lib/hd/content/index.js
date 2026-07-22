// Element content access — Phase 6.A.
//
// Single entry point over the per-language content modules. Today only
// Spanish exists; adding a language is registering it in LANGS. Callers
// pass the element `kind` ('type', and later 'center', 'channel', …) and
// `key`, and optionally a language.

import es from './es.js';
import en from './en.js';
import { CENTER_BY_GATE, CHANNELS, GATES_BY_CENTER, CENTERS } from '../constants.js';
import { getLocale, DEFAULT_LOCALE } from '$lib/i18n/index.svelte.js';

const LANGS = { es, en };
export const DEFAULT_LANG = DEFAULT_LOCALE;
// Re-exported so report.js / prompts.js default their `lang` to the active
// locale from one place (they already import from here).
export { getLocale };

function pack(lang) {
  return LANGS[lang] ?? LANGS[DEFAULT_LOCALE];
}

/** Capitalise the first letter (for names embedded in a title). */
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/**
 * Fill `{name}` placeholders in a template string (Phase M). Templates live in
 * the language pack so a new language translates grammar-bound connective text
 * (articles, gender, word order) without touching code.
 * @param {string} str
 * @param {Record<string, any>} [params]
 */
export function fillTpl(str, params) {
  if (params == null || typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m));
}

/** Prompt templates (frame, subjects, chart descriptor) for the active language. */
export function getPromptTemplates(lang = getLocale()) {
  return pack(lang).promptTemplates;
}

/** Element-drawer scaffolding (composed titles, fact labels, state codas). */
export function getDrawerText(lang = getLocale()) {
  return pack(lang).drawer;
}

/** Initial-report scaffolding (section titles, closing prompt). */
export function getReportShell(lang = getLocale()) {
  return pack(lang).reportShell;
}

/**
 * Explanatory content for an element, or null when none is written yet.
 * @param {string} kind  e.g. 'type'
 * @param {string} key   e.g. 'generator'
 * @param {string} [lang]
 * @returns {{ title: string, paragraphs: string[] } | null}
 */
export function getElementInfo(kind, key, lang = getLocale()) {
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
  // The "Definición" card was merged into the Centres card (2026-07-22), so it
  // no longer has a concept "i" of its own — every concrete definition drawer
  // now opens with the general framing that "i" used to carry.
  if (kind === 'definition') {
    const D = pack(lang).drawer;
    const rel = relatedIndex(kind, key, lang);
    // General framing first, then this definition named in bold at the head of
    // its own text (the same shape getProfileInfo uses for its two lines).
    const withIntro = {
      ...entry,
      paragraphs: [
        D.definitionIntro,
        `**${entry.title}.** ${entry.paragraphs[0]}`,
        ...entry.paragraphs.slice(1)
      ]
    };
    return rel ? { ...withIntro, related: rel } : withIntro;
  }
  const rel = relatedIndex(kind, key, lang);
  return rel ? { ...entry, related: rel } : entry;
}

/** Closed-set schema ({ heading, items, hasPct }) for a category, with
 *  `currentKeys` highlighted, or null when the category has no closed set. */
function relatedIndex(kind, currentKeys, lang = getLocale()) {
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
function centerFacts(center, lang = getLocale()) {
  const p = pack(lang);
  const D = p.drawer;
  const chans = CHANNELS.filter(([a, b]) => CENTER_BY_GATE[a] === center || CENTER_BY_GATE[b] === center);
  const gates = GATES_BY_CENTER[center] ?? [];
  return [
    {
      label: D.factChannels,
      rows: chans.map(([a, b]) => {
        const k = `${a}-${b}`;
        const name = p.channel?.[k]?.name;
        return { chip: { label: k, kind: 'channel', key: k }, note: name ?? null };
      })
    },
    {
      label: D.factGates,
      rows: gates.map((g) => {
        const t = gateTheme(g, lang);
        return { chip: { label: String(g), kind: 'gate', key: String(g) }, note: t ?? null };
      })
    }
  ];
}

/** Whether an element has explanatory content (drives the info "i"). */
export function hasElementInfo(kind, key, lang = getLocale()) {
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
export function getConceptInfo(key, chart = null, lang = getLocale()) {
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
  if (key === 'signal') {
    // Same table as the pair drawers, so the concept "i" is also the index of
    // every pair (this chart's type highlighted when there is one).
    return { ...base, related: signalIndex(chart?.type, lang) };
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
export function getProfileInfo(profile, lang = getLocale()) {
  const [a, b] = String(profile).split('/');
  const la = getElementInfo('profile', a, lang);
  const lb = getElementInfo('profile', b, lang);
  if (!la || !lb) return null;
  const D = pack(lang).drawer;
  return {
    title: fillTpl(D.profileTitle, { profile }),
    paragraphs: [
      fillTpl(D.profileIntro, { profile, a, b }),
      `**${la.title}.** ${la.paragraphs[0]}`,
      ...la.paragraphs.slice(1),
      `**${lb.title}.** ${lb.paragraphs[0]}`,
      ...lb.paragraphs.slice(1)
    ],
    related: relatedIndex('profile', [a, b], lang)
  };
}

/**
 * The signals of a type, as ONE drawer for the PAIR — never one polarity alone,
 * because what the pair is for is telling you which of the two is winning. Like
 * a profile, it is composed on the fly rather than written out: the two bodies
 * already name themselves in bold, so they just run one after the other.
 *
 * The key is the TYPE (Generator and MG share the same two words, so the title
 * carries the type to tell those two pairs apart).
 * @param {string} type
 * @param {string} [lang]
 */
export function getSignalInfo(type, lang = getLocale()) {
  const p = pack(lang);
  const pair = p.signal?.[type];
  if (!pair) return null;
  const D = p.drawer;
  return {
    title: fillTpl(D.signalTitle, {
      aligned: pair.aligned.name,
      misaligned: pair.misaligned.name,
      type: p.labels.typeShort?.[type] ?? p.labels.type?.[type] ?? type
    }),
    paragraphs: [...pair.aligned.text, ...pair.misaligned.text],
    // Closed set, like the other value drawers: every pair, with the type it
    // belongs to as the note. The chips navigate to the other pairs.
    related: signalIndex(type, lang),
    after: [D.signalPairNote, D.signalCanonical]
  };
}

/** Every signal pair as the clickable column, its type as the note. */
function signalIndex(currentType, lang = getLocale()) {
  const p = pack(lang);
  const labels = p.labels.type;
  const items = Object.entries(p.signal).map(([type, pair]) => ({
    kind: 'signal',
    key: type,
    label: `${pair.aligned.name} / ${pair.misaligned.name}`,
    note: labels[type] ?? type,
    pct: null,
    current: type === currentType
  }));
  return { heading: p.drawer.signalIndexHeading, items, hasPct: false };
}

/** Display names of both signals for a type, e.g. `{ aligned: 'Satisfacción' }`. */
export function getSignalNames(type, lang = getLocale()) {
  const s = pack(lang).signal?.[type];
  return s ? { aligned: s.aligned.name, misaligned: s.misaligned.name } : null;
}

/**
 * The incarnation cross, composed from the angle plus the chart's four Sun/Earth
 * gates. No canonical cross name yet (the ~768-entry table is its own content
 * task), so the meaning is carried by the angle text and the four gate themes —
 * the same approach channels use.
 * @param {any} chart
 * @param {string} [lang]
 */
export function getCrossInfo(chart, lang = getLocale()) {
  const cross = chart?.cross;
  const p = pack(lang);
  const entry = p.cross?.[cross?.angle];
  if (!entry) return null;
  const D = p.drawer;
  const [pSun, pEarth, dSun, dEarth] = cross.gates;
  const gateRow = (g) => ({
    chip: { label: String(g), kind: 'gate', key: String(g) },
    note: gateTheme(g, lang) ?? null
  });
  return {
    title: fillTpl(D.crossTitle, { name: entry.name, gates: formatCrossGates(cross, lang) }),
    paragraphs: [entry.text],
    facts: [
      { label: D.factCrossPersonality, rows: [gateRow(pSun), gateRow(pEarth)] },
      { label: D.factCrossDesign, rows: [gateRow(dSun), gateRow(dEarth)] }
    ],
    after: [D.crossWeight, D.deeper]
  };
}

/** The cross's gates in the conventional "4/49 | 23/43" notation. */
export function formatCrossGates(cross, lang = getLocale()) {
  if (!cross?.gates) return '';
  const [a, b, c, d] = cross.gates;
  return `${a}/${b}${pack(lang).drawer.crossGatesJoin}${c}/${d}`;
}

/** Natural-language labels used to build prompts (lower-case, with articles). */
export function getPromptLabels(lang = getLocale()) {
  return pack(lang).promptLabels;
}

/**
 * Display labels for the UI (cards, chips, table columns) — sentence case and
 * without articles, unlike `getPromptLabels`. Phase M.
 * @returns {{ type: Record<string,string>, strategy: Record<string,string>,
 *   authority: Record<string,string>, definition: Record<string,string>,
 *   center: Record<string,string>, planet: Record<string,string> }}
 */
export function getDisplayLabels(lang = getLocale()) {
  return pack(lang).labels;
}

/** I Ching hexagram name for a gate (gate N ↔ hexagram N), or null. */
export function getIchingName(gate, lang = getLocale()) {
  return pack(lang).iching?.[Number(gate)] ?? null;
}

/**
 * Relative weight of a planet's activation (Phase 6.E) — `{ tier, label }` or
 * null. PROVISIONAL (see es.js): only Sun+Earth ≈ 70% is firm.
 */
export function getActivationWeight(planet, lang = getLocale()) {
  return pack(lang).activationWeight?.[planet] ?? null;
}

// ── Initial report (Phase 7). Content accessors used by buildReport (report.js). ──

/** A general report section ({ title, paragraphs }) by id, or null. */
export function getReportSection(id, lang = getLocale()) {
  return pack(lang).report?.[id] ?? null;
}

/** Short connective lead-in string for a personalised report section, or null. */
export function getReportLeadIn(id, lang = getLocale()) {
  return pack(lang).report?.leadIn?.[id] ?? null;
}

/**
 * The report's own second-person body (paragraph array) for a personalised
 * section — kept separate from the shared, impersonal drawer text. Sections:
 * 'type' | 'strategy' | 'authority' | 'definition' (and 'profile' per line).
 * @returns {string[] | null}
 */
export function getReportBody(section, key, lang = getLocale()) {
  return pack(lang).report?.[section]?.[key] ?? null;
}

/**
 * A profile for the report, composed in second person from its two lines: the
 * line *titles* come from the shared `profile` block, the *bodies* from the
 * report's own second-person `report.profile` lines.
 * @param {string} profile e.g. "1/3"
 * @returns {{ title: string, paragraphs: string[] } | null}
 */
export function getReportProfile(profile, lang = getLocale()) {
  const [a, b] = String(profile).split('/');
  const la = getElementInfo('profile', a, lang);
  const lb = getElementInfo('profile', b, lang);
  const ba = getReportBody('profile', a, lang);
  const bb = getReportBody('profile', b, lang);
  if (!la || !lb || !ba || !bb) return null;
  const R = pack(lang).reportShell;
  return {
    title: fillTpl(R.profileHeading, { profile }),
    // One bullet per line, and each bullet carries *all* of that line's
    // paragraphs: a bullet item may be an array, which both renderers lay out
    // as several paragraphs sharing the bullet's indent. Emitting the follow-up
    // paragraphs outside the list made them fall back to the section margin.
    paragraphs: [
      fillTpl(R.profileIntro, { profile, a, b }),
      {
        bullets: [
          [`**${la.title}.** ${ba[0]}`, ...ba.slice(1)],
          [`**${lb.title}.** ${bb[0]}`, ...bb.slice(1)]
        ]
      }
    ]
  };
}

/** The per-type practical block ({ energia, trampa, senales }) or null. */
export function getTypeReport(type, lang = getLocale()) {
  return pack(lang).typeReport?.[type] ?? null;
}

/**
 * A centre for the report: its function + only the relevant state.
 * @param {string} key   centre key
 * @param {boolean} isDefined
 * @param {string} [lang]
 */
export function getCenterReport(key, isDefined, lang = getLocale()) {
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
function gateTheme(gate, lang = getLocale()) {
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
function gateCoda(state, g, lang = getLocale()) {
  const D = pack(lang).drawer;
  const tpl = { complete: D.gateComplete, hanging: D.gateHanging, inactive: D.gateInactive }[state];
  return tpl ? fillTpl(tpl, { g }) : null;
}

/**
 * Info for a single gate. With `chart`, appends a personalised state coda
 * (complete / hanging / inactive) — Phase 7.
 * @param {number|string} gate
 * @param {any} [chart]
 * @param {string} [lang]
 * @returns {{ title: string, paragraphs: string[] } | null}
 */
export function getGateInfo(gate, chart = null, lang = getLocale()) {
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
  const D = p.drawer;
  const many = CHANNELS.filter(([a, b]) => a === g || b === g).length > 1;
  const pairs = CHANNELS.filter(([a, b]) => a === g || b === g);
  const facts = [
    { label: D.factCenter, inline: true, rows: [{ chip: { label: labels[center] ?? center, kind: 'center', key: center } }] },
    {
      label: many ? D.factChannels : D.factChannel,
      rows: pairs.map(([a, b]) => {
        const k = `${a}-${b}`;
        const chName = p.channel?.[k]?.name;
        return { chip: { label: k, kind: 'channel', key: k }, note: chName ?? null };
      })
    },
    {
      label: many ? D.factHarmonics : D.factHarmonic,
      tip: many ? D.tipHarmonics : D.tipHarmonic,
      rows: pairs.map(([a, b]) => {
        const h = a === g ? b : a;
        const t = gateTheme(h, lang);
        return { chip: { label: String(h), kind: 'gate', key: String(h) }, note: t ?? null };
      })
    }
  ];

  const after = [
    name ? fillTpl(D.ichingNamed, { g, name }) : fillTpl(D.ichingPlain, { g })
  ];
  const coda = gateCoda(gateState(g, chart), g, lang);
  if (coda) after.push(coda);
  after.push(D.deeper);
  const theme = gateTheme(g, lang);
  const title = theme
    ? fillTpl(D.gateTitle, { g, theme: cap(theme) })
    : fillTpl(D.gateTitlePlain, { g });
  return { title, paragraphs: [entry?.text ?? fillTpl(D.gateFallback, { g })], facts, after };
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
function channelCoda(a, b, chart, lang = getLocale()) {
  if (!chart?.activeGates) return null;
  const D = pack(lang).drawer;
  const aOn = chart.activeGates.includes(a);
  const bOn = chart.activeGates.includes(b);
  if (aOn && bOn) return fillTpl(D.channelComplete, { a, b });
  if (aOn || bOn) {
    return fillTpl(D.channelHalf, { a, b, on: aOn ? a : b, off: aOn ? b : a });
  }
  return fillTpl(D.channelNone, { a, b });
}

/**
 * Info for a channel given as a "g1-g2" string or [g1, g2] pair. With `chart`,
 * appends a personalised state coda (complete / half / none) — Phase 7.
 * @param {string|number[]} pair
 * @param {any} [chart]
 * @param {string} [lang]
 * @returns {{ title: string, paragraphs: string[] } | null}
 */
export function getChannelInfo(pair, chart = null, lang = getLocale()) {
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
  const D = pack(lang).drawer;
  const paragraphs = [];
  if (ch && ta && tb) {
    paragraphs.push(fillTpl(D.channelIs, { name: ch.name, essence: ch.essence }));
  } else if (ta && tb) {
    paragraphs.push(fillTpl(D.channelPair, { ta, tb, a, b }));
  }

  const facts = [
    {
      label: D.factCenters,
      inline: true,
      rows: [
        { chip: { label: labels[ca] ?? ca, kind: 'center', key: ca } },
        { chip: { label: labels[cb] ?? cb, kind: 'center', key: cb } }
      ]
    },
    {
      label: D.factGates,
      rows: [
        { chip: { label: String(a), kind: 'gate', key: String(a) }, note: ta ?? null },
        { chip: { label: String(b), kind: 'gate', key: String(b) }, note: tb ?? null }
      ]
    }
  ];

  const after = [D.channelBoth];
  const coda = channelCoda(a, b, chart, lang);
  if (coda) after.push(coda);
  after.push(D.deeper);
  const title = ch?.name
    ? fillTpl(D.channelTitle, { a, b, name: cap(ch.name) })
    : fillTpl(D.channelTitlePlain, { a, b });
  return { title, paragraphs, facts, after };
}

/**
 * Info for a planet. With `chart`, appends a schematic facts block with the
 * gates this planet activates in Personality and Design (text audit, jul 2026).
 * @param {string} planet
 * @param {any} [chart]
 * @param {string} [lang]
 */
export function getPlanetInfo(planet, chart = null, lang = getLocale()) {
  const entry = pack(lang).planet?.[planet];
  if (!entry) return null;
  const row = (side) => {
    const act = chart?.[side]?.[planet];
    if (!act) return null;
    const t = gateTheme(act.gate, lang);
    return [{ chip: { label: String(act.gate), kind: 'gate', key: String(act.gate) }, note: t ?? null }];
  };
  const D = pack(lang).drawer;
  const pRows = row('personality');
  const dRows = row('design');
  const facts = [];
  if (pRows) facts.push({ label: D.sidePersonality, rows: pRows });
  if (dRows) facts.push({ label: D.sideDesign, rows: dRows });
  return facts.length ? { ...entry, facts } : entry;
}
