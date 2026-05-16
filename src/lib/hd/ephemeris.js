// Capa astronómica de la app.
//
// Usamos `astronomy-engine` (JavaScript puro, sin WASM) para las posiciones
// geocéntricas aparentes de Sol, Luna y planetas. Los nodos lunares no vienen
// en la librería como función directa, así que el Nodo Norte lo calculamos
// con la fórmula clásica de Meeus para el nodo medio (precisión sobrada para
// HD: el error frente al nodo verdadero es <2°, y una línea HD mide 0,9375°).

import * as Astronomy from 'astronomy-engine';

// Mapa nombre interno → constante de astronomy-engine para los cuerpos
// que la librería sí calcula directamente como vector geocéntrico.
const ASTRO_BODY = {
  sun: Astronomy.Body.Sun,
  mercury: Astronomy.Body.Mercury,
  venus: Astronomy.Body.Venus,
  mars: Astronomy.Body.Mars,
  jupiter: Astronomy.Body.Jupiter,
  saturn: Astronomy.Body.Saturn,
  uranus: Astronomy.Body.Uranus,
  neptune: Astronomy.Body.Neptune,
  pluto: Astronomy.Body.Pluto
};

const JD_UNIX_EPOCH = 2440587.5; // JD del 1970-01-01 00:00 UT

/** @param {Date} date */
export function dateToJd(date) {
  return date.getTime() / 86_400_000 + JD_UNIX_EPOCH;
}

/** @param {number} jd */
function jdToDate(jd) {
  return new Date((jd - JD_UNIX_EPOCH) * 86_400_000);
}

/**
 * Longitud eclíptica geocéntrica aparente de un cuerpo (en grados, 0-360).
 * @param {string} name
 * @param {Astronomy.AstroTime} time
 */
function eclipticLongitude(name, time) {
  if (name === 'moon') {
    const vec = Astronomy.GeoMoon(time);
    return Astronomy.Ecliptic(vec).elon;
  }
  const body = ASTRO_BODY[name];
  if (!body) throw new Error(`Cuerpo no soportado: ${name}`);
  const vec = Astronomy.GeoVector(body, time, true); // true = corregir aberración
  return Astronomy.Ecliptic(vec).elon;
}

/**
 * Nodo Norte lunar medio (Ω) en grados, fórmula de Meeus (Astronomical
 * Algorithms, cap. 47), válida para fechas razonables de uso humano.
 * @param {number} jd
 */
function meanLunarNorthNode(jd) {
  const T = (jd - 2451545.0) / 36525;
  const omega =
    125.0445479 -
    1934.1362891 * T +
    0.0020754 * T * T +
    (T * T * T) / 467441 -
    (T * T * T * T) / 60616000;
  return ((omega % 360) + 360) % 360;
}

/**
 * Devuelve las longitudes eclípticas de los 13 cuerpos relevantes para HD
 * en un Julian Day dado.
 * @param {number} jd
 * @returns {Record<string, number>}
 */
export function getPlanetLongitudes(jd) {
  const time = new Astronomy.AstroTime(jdToDate(jd));

  /** @type {Record<string, number>} */
  const longs = {};
  for (const name of Object.keys(ASTRO_BODY)) {
    longs[name] = eclipticLongitude(name, time);
  }
  longs.moon = eclipticLongitude('moon', time);
  longs.earth = (longs.sun + 180) % 360;
  longs.northNode = meanLunarNorthNode(jd);
  longs.southNode = (longs.northNode + 180) % 360;

  return longs;
}

/**
 * Encuentra el Julian Day del Diseño: el momento en que el Sol estaba
 * exactamente 88° por detrás de su posición natal (medido en grados de arco
 * solar, no en días). Newton-Raphson sobre la diferencia angular.
 *
 * @param {number} birthJd
 * @param {number} birthSunLongitude
 * @returns {number}
 */
export function computeDesignJd(birthJd, birthSunLongitude) {
  const target = (((birthSunLongitude - 88) % 360) + 360) % 360;

  let jd = birthJd - 88; // estimación: ~88 días naturales antes
  for (let i = 0; i < 50; i++) {
    const time = new Astronomy.AstroTime(jdToDate(jd));
    const current = eclipticLongitude('sun', time);

    let diff = (((current - target) % 360) + 540) % 360 - 180;
    if (Math.abs(diff) < 1e-7) return jd;
    jd -= diff / 0.985_647_3; // velocidad media diaria del Sol en grados
  }
  return jd;
}
