// Element content access — Phase 6.A.
//
// Single entry point over the per-language content modules. Today only
// Spanish exists; adding a language is registering it in LANGS. Callers
// pass the element `kind` ('type', and later 'center', 'channel', …) and
// `key`, and optionally a language.

import es from './es.js';

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
