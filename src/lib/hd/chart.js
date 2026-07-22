// Orquestador del cálculo de la carta HD.
// Toma datos de nacimiento → devuelve un objeto chart con todo lo necesario.

import { DateTime } from 'luxon';
import { longitudeToGate } from './gates.js';
import {
  PLANETS,
  CHANNELS,
  CENTERS,
  GATES_BY_CENTER,
  CENTER_BY_GATE,
  MOTOR_CENTERS
} from './constants.js';
import {
  dateToJd,
  getPlanetLongitudes,
  computeDesignJd
} from './ephemeris.js';

/**
 * @typedef {Object} BirthData
 * @property {string} date     - ISO date "1984-03-13"
 * @property {string} time     - "HH:MM" en hora local
 * @property {string} timezone - IANA ("Europe/Madrid"). En 1.2 lo detectaremos por coordenadas;
 *                                de momento el formulario lo recibe directamente.
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} [name]
 */

/**
 * @typedef {Object} Activation
 * @property {number} longitude        - longitud eclíptica en grados
 * @property {number} gate             - 1-64
 * @property {number} line             - 1-6
 * @property {string} planet           - nombre del planeta/punto
 * @property {'personality'|'design'} side
 */

/**
 * Calcula la carta HD completa para unos datos de nacimiento.
 *
 * @param {BirthData} birth
 * @returns {Promise<{
 *   meta: { birth: BirthData, personalityJd: number, designJd: number },
 *   personality: Record<string, Activation>,
 *   design: Record<string, Activation>,
 *   activeGates: number[],
 *   definedCenters: string[],
 *   activeChannels: [number, number][],
 *   type: string,
 *   strategy: string,
 *   authority: string,
 *   profile: string,
 *   definition: string,
 *   cross: { angle: string, gates: number[] }
 * }>}
 */
export async function computeChart(birth) {
  // 1. Convertir hora local → UTC respetando zona horaria histórica.
  const localDt = DateTime.fromISO(`${birth.date}T${birth.time}`, {
    zone: birth.timezone
  });
  if (!localDt.isValid) {
    // All-Spanish message (Luxon's invalidExplanation is English prose): name
    // the offending stored values, which is what a bug report needs anyway.
    throw new Error(
      `Los datos de nacimiento guardados no son válidos ` +
        `(fecha "${birth.date}", hora "${birth.time}", zona horaria "${birth.timezone}").`
    );
  }
  const utcDate = localDt.toUTC().toJSDate();

  // 2. Calcular Julian Day del nacimiento (Personality).
  const personalityJd = await dateToJd(utcDate);

  // 3. Calcular posiciones de Personality.
  const personalityLongs = await getPlanetLongitudes(personalityJd);

  // 4. Calcular el Julian Day del Diseño (Sol a -88° del natal).
  const designJd = await computeDesignJd(personalityJd, personalityLongs.sun);

  // 5. Calcular posiciones de Design.
  const designLongs = await getPlanetLongitudes(designJd);

  // 6. Mapear cada longitud a su puerta y línea.
  /** @type {Record<string, Activation>} */
  const personality = {};
  /** @type {Record<string, Activation>} */
  const design = {};
  for (const planet of PLANETS) {
    const pLong = personalityLongs[planet];
    const dLong = designLongs[planet];
    const pGate = longitudeToGate(pLong);
    const dGate = longitudeToGate(dLong);
    personality[planet] = { ...pGate, longitude: pLong, planet, side: 'personality' };
    design[planet] = { ...dGate, longitude: dLong, planet, side: 'design' };
  }

  // 7. Conjunto de puertas activas (unión de las 26 activaciones, sin duplicados).
  const gateSet = new Set();
  for (const a of Object.values(personality)) gateSet.add(a.gate);
  for (const a of Object.values(design)) gateSet.add(a.gate);
  const activeGates = [...gateSet].sort((a, b) => a - b);

  // 8. Canales activos: canales en los que ambas puertas están activas.
  const activeChannels = CHANNELS.filter(
    ([g1, g2]) => gateSet.has(g1) && gateSet.has(g2)
  );

  // 9. Centros definidos: cualquiera que sea extremo de algún canal activo.
  const defined = new Set();
  for (const [g1, g2] of activeChannels) {
    defined.add(CENTER_BY_GATE[g1]);
    defined.add(CENTER_BY_GATE[g2]);
  }
  const definedCenters = CENTERS.filter((c) => defined.has(c));

  // 10. Definición: grupos conectados de centros definidos.
  const definition = computeDefinition(definedCenters, activeChannels);

  // 11. Tipo + estrategia.
  const { type, strategy } = computeType(definedCenters, activeChannels);

  // 12. Autoridad.
  const authority = computeAuthority(definedCenters, type, activeChannels);

  // 13. Perfil: línea del Sol Personality / línea del Sol Design.
  const profile = `${personality.sun.line}/${design.sun.line}`;

  // 14. Cruz de encarnación: las cuatro activaciones Sol/Tierra + el ángulo.
  const cross = computeCross(personality, design, profile);

  return {
    meta: { birth, personalityJd, designJd },
    personality,
    design,
    activeGates,
    definedCenters,
    activeChannels,
    type,
    strategy,
    authority,
    profile,
    definition,
    cross
  };
}

// ---------------------------------------------------------------------------
// Funciones derivadas
// ---------------------------------------------------------------------------

/**
 * Which profiles carry each incarnation-cross angle. The angle is a property of
 * the profile alone, so it is a lookup rather than a derivation: right-angle
 * profiles are the "personal destiny" ones, 4/1 is the single juxtaposition
 * profile, and the left-angle ones are the "transpersonal" ones.
 */
const CROSS_ANGLE_BY_PROFILE = {
  '1/3': 'right', '1/4': 'right', '2/4': 'right', '2/5': 'right',
  '3/5': 'right', '3/6': 'right', '4/6': 'right',
  '4/1': 'juxtaposition',
  '5/1': 'left', '5/2': 'left', '6/2': 'left', '6/3': 'left'
};

/**
 * Incarnation cross: the four Sun/Earth activations plus the angle. The gates
 * are ordered in the conventional notation — personality Sun/Earth first, then
 * design Sun/Earth, i.e. "(4/49 | 23/43)".
 *
 * Deliberately name-less for now: the ~768 canonical cross names are a separate
 * content task, so the app shows the angle + the four gates and composes the
 * meaning from the gate essences it already has (same approach as channels in
 * Phase 6.D).
 *
 * @param {Record<string, Activation>} personality
 * @param {Record<string, Activation>} design
 * @param {string} profile
 * @returns {{ angle: string, gates: number[] }}
 */
function computeCross(personality, design, profile) {
  return {
    angle: CROSS_ANGLE_BY_PROFILE[profile] ?? 'right',
    gates: [personality.sun.gate, personality.earth.gate, design.sun.gate, design.earth.gate]
  };
}

/**
 * Cuenta los grupos conectados de centros definidos (Single, Split, etc.).
 * @param {string[]} definedCenters
 * @param {[number, number][]} activeChannels
 */
function computeDefinition(definedCenters, activeChannels) {
  if (definedCenters.length === 0) return 'no-definition';

  // Grafo: centros conectados entre sí por canales activos.
  /** @type {Record<string, Set<string>>} */
  const adj = {};
  for (const c of definedCenters) adj[c] = new Set();
  for (const [g1, g2] of activeChannels) {
    const c1 = CENTER_BY_GATE[g1];
    const c2 = CENTER_BY_GATE[g2];
    if (c1 !== c2) {
      adj[c1].add(c2);
      adj[c2].add(c1);
    }
  }

  // Componentes conectados via BFS.
  const visited = new Set();
  let components = 0;
  for (const c of definedCenters) {
    if (visited.has(c)) continue;
    components++;
    const queue = [c];
    while (queue.length) {
      const cur = queue.shift();
      if (visited.has(cur)) continue;
      visited.add(cur);
      for (const n of adj[cur]) if (!visited.has(n)) queue.push(n);
    }
  }

  return ['no-definition', 'single', 'split', 'triple-split', 'quad-split'][components] ?? 'unknown';
}

/**
 * Determina el tipo HD y la estrategia asociada.
 */
function computeType(definedCenters, activeChannels) {
  if (definedCenters.length === 0) {
    return { type: 'reflector', strategy: 'wait-lunar-cycle' };
  }

  const sacralDefined = definedCenters.includes('sacral');
  const throatDefined = definedCenters.includes('throat');
  const throatMotorized = throatDefined && isThroatMotorized(definedCenters, activeChannels);

  if (sacralDefined) {
    return throatMotorized
      ? { type: 'manifesting-generator', strategy: 'respond-then-inform' }
      : { type: 'generator', strategy: 'respond' };
  }
  if (throatMotorized) {
    return { type: 'manifestor', strategy: 'inform-before-acting' };
  }
  return { type: 'projector', strategy: 'wait-for-invitation' };
}

/**
 * Comprueba si la Garganta está conectada a algún centro motor a través
 * de canales activos. BFS desde Garganta sobre el grafo de centros definidos.
 */
function isThroatMotorized(definedCenters, activeChannels) {
  /** @type {Record<string, Set<string>>} */
  const adj = {};
  for (const c of definedCenters) adj[c] = new Set();
  for (const [g1, g2] of activeChannels) {
    const c1 = CENTER_BY_GATE[g1];
    const c2 = CENTER_BY_GATE[g2];
    if (c1 !== c2) {
      adj[c1].add(c2);
      adj[c2].add(c1);
    }
  }

  const visited = new Set();
  const queue = ['throat'];
  while (queue.length) {
    const cur = queue.shift();
    if (visited.has(cur)) continue;
    visited.add(cur);
    if (MOTOR_CENTERS.includes(cur)) return true;
    for (const n of adj[cur]) if (!visited.has(n)) queue.push(n);
  }
  return false;
}

/**
 * Autoridad interna según la jerarquía HD estándar.
 */
function computeAuthority(definedCenters, type, activeChannels) {
  if (type === 'reflector') return 'lunar';
  if (definedCenters.includes('solarPlexus')) return 'emotional';
  if (definedCenters.includes('sacral')) return 'sacral';
  if (definedCenters.includes('spleen')) return 'splenic';
  if (definedCenters.includes('heart')) return 'ego';
  if (definedCenters.includes('g') && definedCenters.includes('throat')) {
    // Autoconstruida (G ↔ Garganta sin pasar por motor).
    return 'self-projected';
  }
  // Proyector mental / autoridad externa.
  return 'mental';
}
