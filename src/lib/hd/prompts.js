// Prompt builder — Phase 6.A.
//
// Turns an element + the user's chart into ready-made prompts the user
// takes to their own AI. The app never calls an AI; it only composes the
// text. Each element offers two angles:
//   - general: the concept in the abstract (always available).
//   - chart:   the element read alongside the rest of the chart.
//
// Prompts are impersonal ("Para un Generador con autoridad…") on purpose:
// the chart on screen may belong to someone else (saved charts), so we
// never phrase them in the first person.
//
// Pilot scope: the 'type' element. `chart` angle is null when it doesn't
// apply (e.g. a type chip that isn't the chart's own — handled in 6.B).

import { getPromptLabels, DEFAULT_LANG } from './content/index.js';

/**
 * @param {string} kind   e.g. 'type'
 * @param {string} key    element key (for 'type', the type to describe)
 * @param {any} chart     computed chart (type, authority, strategy, profile…)
 * @param {string} [lang]
 * @returns {{ general: string, chart: string | null }}
 */
export function buildPrompts(kind, key, chart, lang = DEFAULT_LANG) {
  const L = getPromptLabels(lang);

  if (kind === 'type') {
    const type = L.type[key] ?? key;
    const strategy = L.strategy[chart.strategy] ?? chart.strategy;
    const authority = L.authority[chart.authority] ?? chart.authority;

    const general =
      `Explícame de forma sencilla y práctica qué es el tipo ${type} en ` +
      `Diseño Humano: cómo funciona su energía, su estrategia (${strategy}) ` +
      `y qué señales indican que va por buen camino. No asumas conocimiento ` +
      `previo del sistema.`;

    const chartPrompt =
      `Para un ${type} con autoridad ${authority} y perfil ${chart.profile}, ` +
      `explícame cómo se combinan estos rasgos y cómo se viven en el día a ` +
      `día. No asumas conocimiento previo del sistema.`;

    return { general, chart: chartPrompt };
  }

  return { general: '', chart: null };
}
