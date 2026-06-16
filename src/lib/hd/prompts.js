// Prompt builder — Phase 6.A.
//
// Turns an element + the user's chart into a ready-made, personalised
// prompt the user takes to their own AI. The app never calls an AI; it only
// composes the text. Pilot scope: the 'type' element.

import { getPromptLabels, DEFAULT_LANG } from './content/index.js';

/**
 * @param {string} kind   e.g. 'type'
 * @param {string} key    element key (for 'type', equals chart.type)
 * @param {any} chart     computed chart (type, authority, strategy, profile…)
 * @param {string} [lang]
 * @returns {string}
 */
export function buildPrompt(kind, key, chart, lang = DEFAULT_LANG) {
  const L = getPromptLabels(lang);

  if (kind === 'type') {
    const type = L.type[chart.type] ?? chart.type;
    const authority = L.authority[chart.authority] ?? chart.authority;
    const strategy = L.strategy[chart.strategy] ?? chart.strategy;
    return (
      `Soy de tipo ${type} en Diseño Humano, con autoridad ${authority} ` +
      `y perfil ${chart.profile}. Explícame de forma sencilla y práctica ` +
      `qué significa, cómo funciona mi energía y mi estrategia (${strategy}), ` +
      `y qué señales indican que voy por buen camino. No asumas que conozco ` +
      `el sistema.`
    );
  }

  return '';
}
