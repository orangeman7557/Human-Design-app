// Capa astronómica de la app.
//
// Usamos `astronomy-engine` (JavaScript puro, sin WASM) para las posiciones
// geocéntricas aparentes de Sol, Luna y planetas. Los nodos lunares no vienen
// en la librería como función directa, así que el Nodo Norte lo calculamos
// como nodo verdadero osculante (igual que TRUE_NODE de Swiss Ephemeris,
// el que usan las herramientas HD de referencia). El nodo medio de Meeus
// que usábamos antes se desvía hasta ~1.75° del verdadero — suficiente para
// cruzar un límite de puerta (bug: 1984-01-30 daba Projector en vez de
// Reflector por una puerta 26 falsa del Nodo Sur de Design).

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
 * Nodo Norte lunar verdadero (osculante) en grados: nodo ascendente del
 * plano orbital instantáneo de la Luna, en eclíptica de la fecha. Es el
 * mismo valor que TRUE_NODE de Swiss Ephemeris.
 * @param {number} jd
 */
function trueLunarNorthNode(jd) {
  const time = new Astronomy.AstroTime(jdToDate(jd));
  const state = Astronomy.RotateState(
    Astronomy.Rotation_EQJ_ECT(time),
    Astronomy.GeoMoonState(time)
  );
  // Angular momentum h = r × v; the ascending node lies along ẑ × h.
  const hx = state.y * state.vz - state.z * state.vy;
  const hy = state.z * state.vx - state.x * state.vz;
  const omega = Math.atan2(hy, hx) * (180 / Math.PI) + 90;
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
  longs.northNode = trueLunarNorthNode(jd);
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
