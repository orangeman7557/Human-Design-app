// English Human Design content — Phase M.
//
// Built as a DEEP MERGE of English overrides on top of the Spanish base (es.js),
// so every key always resolves: English where translated, Spanish where not yet.
// This is what lets the app be switched to English before the ~600 content
// strings are translated (Phase M turn 2) — and it means adding the English
// content is purely filling `overrides` below, no code changes.
//
// Own wording only (mechanical facts + public-domain roots), never copied from
// Jovian Archive — same rule as es.js. NOTE for the translation turn: the I
// Ching hexagram names (`iching`) must NOT reuse the Wilhelm/Baynes English
// (still under copyright). Use own phrasing or the public-domain Legge (1882).

import es from './es.js';

/** Recursively merge `over` onto a deep clone of `base` (arrays replaced whole). */
function deepMerge(base, over) {
  if (Array.isArray(base) || Array.isArray(over)) return over ?? base;
  if (base && over && typeof base === 'object' && typeof over === 'object') {
    const out = { ...base };
    for (const k of Object.keys(over)) out[k] = deepMerge(base[k], over[k]);
    return out;
  }
  return over === undefined ? base : over;
}

// English overrides. Filled in Phase M turn 2 (concepts, types, 64 gates,
// channels, report, prompts, prompt labels, i Ching names…). Until then this is
// empty and English content === Spanish content.
const overrides = {};

export default deepMerge(es, overrides);
