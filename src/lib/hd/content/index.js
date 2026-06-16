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

/** Natural-language labels used to build prompts. */
export function getPromptLabels(lang = DEFAULT_LANG) {
  return pack(lang).promptLabels;
}
