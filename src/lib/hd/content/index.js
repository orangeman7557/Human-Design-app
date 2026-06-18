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
  return pack(lang)[kind]?.[key] ?? null;
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
      `El perfil ${profile} combina dos líneas: la ${a}, consciente (de la personalidad), y la ${b}, inconsciente (del diseño). Cada una aporta su matiz, y juntas describen tu forma de aprender, relacionarte y desplegar tu propósito.`,
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

// Gates and channels (Phase 6.D) carry only minimal own info — the mechanical
// facts (centre membership, channel endpoints) plus the public-domain I Ching
// root — and delegate the depth to the user's AI via the panel's prompt. So
// their `{ title, paragraphs }` is built on the fly rather than hand-written
// 64 + 36 times. Cross-references use the in-text link markup `[label](kind:key)`
// (rendered as a subtle underline by ElementInfo) so a gate links its centre, a
// channel links its centres and gates, etc. — clicking opens a nested drawer.

/**
 * Info for a single gate.
 * @param {number|string} gate
 * @param {string} [lang]
 * @returns {{ title: string, paragraphs: string[] } | null}
 */
export function getGateInfo(gate, lang = DEFAULT_LANG) {
  const g = Number(gate);
  const center = CENTER_BY_GATE[g];
  if (!center) return null;
  const labels = pack(lang).promptLabels.center;
  const name = getIchingName(g, lang);
  return {
    title: `Puerta ${g}`,
    paragraphs: [
      `La puerta ${g} pertenece al **[centro ${labels[center] ?? center}](center:${center})**: su energía se expresa a través de la función de ese centro.`,
      name
        ? `Su raíz está en el hexagrama ${g} del I Ching, **«${name}»** (secuencia del rey Wen), el punto de partida clásico de su significado.`
        : `Su raíz está en el hexagrama ${g} del I Ching (secuencia del rey Wen).`,
      'Para una lectura detallada de esta puerta, usa el prompt de abajo con tu IA.'
    ]
  };
}

/**
 * Info for a channel given as a "g1-g2" string or [g1, g2] pair.
 * @param {string|number[]} pair
 * @param {string} [lang]
 * @returns {{ title: string, paragraphs: string[] } | null}
 */
export function getChannelInfo(pair, lang = DEFAULT_LANG) {
  const [a, b] = Array.isArray(pair) ? pair.map(Number) : String(pair).split('-').map(Number);
  const ca = CENTER_BY_GATE[a];
  const cb = CENTER_BY_GATE[b];
  if (!ca || !cb) return null;
  const labels = pack(lang).promptLabels.center;
  const na = getIchingName(a, lang);
  const nb = getIchingName(b, lang);
  return {
    title: `Canal ${a}-${b}`,
    paragraphs: [
      `El canal ${a}-${b} conecta el **[centro ${labels[ca] ?? ca}](center:${ca})** ([puerta ${a}](gate:${a})) con el **[centro ${labels[cb] ?? cb}](center:${cb})** ([puerta ${b}](gate:${b})). Con sus dos puertas activas, el canal queda completo y define ambos centros.`,
      `Une las puertas [${a}](gate:${a})${na ? ` —hexagrama «${na}»—` : ''} y [${b}](gate:${b})${nb ? ` —hexagrama «${nb}»—` : ''} del I Ching. Tenerlo completo aporta una corriente de energía constante y fiable entre esos dos centros.`,
      'Para una lectura detallada de este canal, usa el prompt de abajo con tu IA.'
    ]
  };
}
