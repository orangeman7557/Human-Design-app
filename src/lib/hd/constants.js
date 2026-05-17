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

export const GATE_WHEEL_START = 302; // longitud eclíptica donde arranca la puerta 41
export const GATE_SIZE = 360 / 64;   // 5,625°
export const LINE_SIZE = GATE_SIZE / 6; // 0,9375°

// Los 9 centros del bodygraph.
export const CENTERS = /** @type {const} */ ([
  'head', 'ajna', 'throat', 'g', 'heart',
  'sacral', 'spleen', 'solarPlexus', 'root'
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
