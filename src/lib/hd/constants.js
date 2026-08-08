// Datos de referencia del sistema Human Design.
// Todo lo que es estructura fija (rueda de puertas, canales, centros)
// vive aquí para que el resto del código sea solo lógica.

// La rueda de puertas, en el orden en que aparecen alrededor del zodiaco
// tropical, empezando por la puerta 41 a 2°00' Acuario (= 302° eclípticos).
// Cada puerta ocupa 360/64 = 5,625°.
export const GATE_WHEEL = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3,
  27, 24, 2,  23, 8,  20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
  31, 33, 7,  4,  29, 59, 40, 64, 47, 6,  46, 18, 48, 57, 32, 50,
  28, 44, 1,  43, 14, 34, 9,  5,  26, 11, 10, 58, 38, 54, 61, 60
];

const WHEEL_IDX = new Map(GATE_WHEEL.map((g, i) => [g, i]));
const atOffset = (g, d) => GATE_WHEEL[((WHEEL_IDX.get(g) + d) % 64 + 64) % 64];

/**
 * An incarnation cross's four gates, from its Personality Sun gate and angle.
 * Derived from the wheel rather than stored: Earth is always half a turn away,
 * and the Design Sun sits 16 wheel positions back for a right angle and 15 for
 * the other two. Verified against the ephemeris in cross-names.test.js.
 * @returns {number[]} [pSun, pEarth, dSun, dEarth]
 */
export function crossQuartet(gate, angle) {
  const g = Number(gate);
  const dSun = atOffset(g, angle === 'right' ? -16 : -15);
  return [g, atOffset(g, 32), dSun, atOffset(dSun, 32)];
}

/** The mandala's four quarters, 16 gates each, in wheel order from gate 13. */
export function quarterGates() {
  const start = GATE_WHEEL.indexOf(13);
  return [0, 1, 2, 3].map((q) =>
    Array.from({ length: 16 }, (_, i) => GATE_WHEEL[(start + q * 16 + i) % 64])
  );
}

export const GATE_WHEEL_START = 302; // longitud eclíptica donde arranca la puerta 41
export const GATE_SIZE = 360 / 64;   // 5,625°
export const LINE_SIZE = GATE_SIZE / 6; // 0,9375°

// The 9 bodygraph centres. Display order (centre chips list): sacral
// goes after spleen and solar plexus by design decision.
export const CENTERS = /** @type {const} */ ([
  'head', 'ajna', 'throat', 'g', 'heart',
  'spleen', 'solarPlexus', 'sacral', 'root'
]);

// Centros que son motores (capaces de motorizar la Garganta).
export const MOTOR_CENTERS = ['sacral', 'heart', 'solarPlexus', 'root'];

// Qué puertas pertenecen a cada centro.
export const GATES_BY_CENTER = {
  head:        [61, 63, 64],
  ajna:        [4, 11, 17, 24, 43, 47],
  throat:      [8, 12, 16, 20, 23, 31, 33, 35, 45, 56, 62],
  g:           [1, 2, 7, 10, 13, 15, 25, 46],
  heart:       [21, 26, 40, 51],
  sacral:      [3, 5, 9, 14, 27, 29, 34, 42, 59],
  spleen:      [18, 28, 32, 44, 48, 50, 57],
  solarPlexus: [6, 22, 30, 36, 37, 49, 55],
  root:        [19, 38, 39, 41, 52, 53, 54, 58, 60]
};

// Same gates, but in the order they read around each centre in the bodygraph
// (derived from GATE_POSITIONS by angle around the centre's gate centroid).
// Used to list a centre's gates/channels the way they sit on the chart rather
// than numerically. The Solar Plexus is a deliberate exception: it runs
// anticlockwise so it reads top-to-bottom like the rest (author, aug 2026).
export const CENTER_GATE_ORDER = {
  head:        [64, 61, 63],
  ajna:        [47, 24, 4, 11, 43, 17],
  throat:      [20, 16, 62, 23, 56, 35, 12, 45, 33, 8, 31],
  g:           [10, 7, 1, 13, 25, 46, 2, 15],
  heart:       [26, 51, 21, 40],
  sacral:      [27, 34, 5, 14, 29, 59, 9, 3, 42],
  spleen:      [44, 50, 32, 28, 18, 48, 57],
  solarPlexus: [36, 22, 37, 6, 49, 55, 30],
  root:        [58, 38, 54, 53, 60, 52, 19, 39, 41]
};

// Mapa inverso: puerta → centro. Se construye una vez al cargar.
export const CENTER_BY_GATE = (() => {
  /** @type {Record<number, string>} */
  const map = {};
  for (const [center, gates] of Object.entries(GATES_BY_CENTER)) {
    for (const g of gates) map[g] = center;
  }
  return map;
})();

// Los 36 canales del bodygraph. Cada canal es un par ordenado de puertas.
// El primero/segundo orden no tiene significado, lo dejamos consistente
// (puerta menor primero) para evitar duplicados.
export const CHANNELS = [
  [1, 8],   [2, 14],  [3, 60],  [4, 63],  [5, 15],  [6, 59],
  [7, 31],  [9, 52],  [10, 20], [10, 34], [10, 57], [11, 56],
  [12, 22], [13, 33], [16, 48], [17, 62], [18, 58], [19, 49],
  [20, 34], [20, 57], [21, 45], [23, 43], [24, 61], [25, 51],
  [26, 44], [27, 50], [28, 38], [29, 46], [30, 41], [32, 54],
  [34, 57], [35, 36], [37, 40], [39, 55], [42, 53], [47, 64]
];

// Cuerpos planetarios que se calculan en HD. Los nombres aquí son los
// que usaremos internamente; el mapeo a IDs de Swiss Ephemeris vive en
// ephemeris.js para no acoplar este fichero a la librería astronómica.
// El orden importa: es el orden visual estándar en HD (de arriba abajo).
export const PLANETS = /** @type {const} */ ([
  'sun', 'earth', 'moon', 'northNode', 'southNode',
  'mercury', 'venus', 'mars', 'jupiter', 'saturn',
  'uranus', 'neptune', 'pluto'
]);
