// Display labels, split out of the main content pack (audit aug 2026).
//
// WHY THIS IS ITS OWN FILE: the home page needs nothing from the content
// library but the five type names, and reaching them through content/index.js
// dragged BOTH language packs (es.js + en.js — ~526 KB of prose: the 192
// crosses, the 64 gates, the whole report) into the home's eager bundle. These
// labels are tiny and load-bearing for the UI chrome, so they live apart and
// the packs import them back in — `pack(lang).labels` and the i18n parity test
// are unchanged.
//
// Conventions unchanged: distinct from `promptLabels` on purpose — those are
// written to sit inside prompt sentences (lower-case, with articles), these are
// what the UI shows in cards, chips and table columns (sentence case, no
// articles).

export const LABELS = {
  type: {
    generator: 'Generador',
    'manifesting-generator': 'Generador Manifestante',
    projector: 'Proyector',
    manifestor: 'Manifestador',
    reflector: 'Reflector'
  },
  strategy: {
    'inform-before-acting': 'Informar antes de actuar',
    respond: 'Responder',
    'respond-then-inform': 'Responder y luego informar',
    'wait-for-invitation': 'Esperar la invitación',
    'wait-lunar-cycle': 'Esperar un ciclo lunar'
  },
  // Same quality-(centre) order as the drawers and prompts (text audit, jul 2026).
  authority: {
    emotional: 'Emocional (Plexo solar)',
    sacral: 'Sacral',
    splenic: 'Esplénica (Bazo)',
    ego: 'Ego (Corazón)',
    'self-projected': 'Autoproyectada (G-Garganta)',
    mental: 'Mental/ambiental',
    lunar: 'Lunar'
  },
  definition: {
    'no-definition': 'Sin definición',
    single: 'Definición única',
    split: 'Definición split',
    'triple-split': 'Definición triple split',
    'quad-split': 'Definición cuádruple split'
  },
  center: {
    head: 'Cabeza',
    ajna: 'Ajna',
    throat: 'Garganta',
    g: 'G',
    heart: 'Corazón',
    sacral: 'Sacral',
    spleen: 'Bazo',
    solarPlexus: 'Plexo solar',
    root: 'Raíz'
  },
  planet: {
    sun: 'Sol',
    earth: 'Tierra',
    moon: 'Luna',
    northNode: 'Nodo Norte',
    southNode: 'Nodo Sur',
    mercury: 'Mercurio',
    venus: 'Venus',
    mars: 'Marte',
    jupiter: 'Júpiter',
    saturn: 'Saturno',
    uranus: 'Urano',
    neptune: 'Neptuno',
    pluto: 'Plutón'
  },
  // Short type names for tight spots (the signal-pair drawer title). Only the
  // Manifesting Generator actually shortens; the acronym follows the
  // language's word order — Spanish GM, English MG.
  typeShort: {
    generator: 'Generador',
    'manifesting-generator': 'GM',
    projector: 'Proyector',
    manifestor: 'Manifestador',
    reflector: 'Reflector'
  },
  // The two polarities of the signals card (the values themselves are per
  // type and live in the `signal` block).
  signal: {
    aligned: 'Alineamiento',
    misaligned: 'Desalineamiento'
  },
  cross: {
    right: 'Cruz de ángulo derecho',
    left: 'Cruz de ángulo izquierdo',
    juxtaposition: 'Cruz de yuxtaposición'
  }
};
