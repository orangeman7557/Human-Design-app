// Wrapper alrededor de swisseph-wasm.
// Aquí se concentra todo lo astronómico:
//   - Inicializar la librería WASM.
//   - Convertir fecha/hora a Julian Day.
//   - Pedir longitudes eclípticas de los 13 cuerpos HD.
//   - Encontrar el momento exacto del Diseño (Sol a 88° del nacimiento).

import SwissEph from 'swisseph-wasm';

/** @type {SwissEph | null} */
let swePromise = null;

/**
 * Inicializa Swiss Ephemeris una sola vez por sesión.
 * Devuelve siempre la misma instancia para evitar recargas innecesarias.
 */
function getSwe() {
  if (!swePromise) {
    swePromise = (async () => {
      const swe = new SwissEph();
      await swe.initSwissEph();
      return swe;
    })();
  }
  return swePromise;
}

/**
 * Convierte una fecha UTC a Julian Day (UT).
 * @param {Date} utcDate
 * @returns {Promise<number>}
 */
export async function dateToJd(utcDate) {
  const swe = await getSwe();
  const hourFraction =
    utcDate.getUTCHours() +
    utcDate.getUTCMinutes() / 60 +
    utcDate.getUTCSeconds() / 3600;
  return swe.julday(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth() + 1,
    utcDate.getUTCDate(),
    hourFraction
  );
}

/**
 * Devuelve las longitudes eclípticas de los 13 cuerpos relevantes para HD
 * en un Julian Day dado.
 *
 * @param {number} jd
 * @returns {Promise<Record<string, number>>} mapa nombre → longitud (0-360)
 */
export async function getPlanetLongitudes(jd) {
  const swe = await getSwe();
  const flags = swe.SEFLG_SWIEPH; // Swiss Ephemeris, tropical, geocéntrico

  // Mapa de nombre interno → constante de Swiss Ephemeris.
  // El Norte/Sur lunar usa True Node (no Mean) por convención HD moderna.
  const ids = {
    sun: swe.SE_SUN,
    moon: swe.SE_MOON,
    mercury: swe.SE_MERCURY,
    venus: swe.SE_VENUS,
    mars: swe.SE_MARS,
    jupiter: swe.SE_JUPITER,
    saturn: swe.SE_SATURN,
    uranus: swe.SE_URANUS,
    neptune: swe.SE_NEPTUNE,
    pluto: swe.SE_PLUTO,
    northNode: swe.SE_TRUE_NODE
  };

  /** @type {Record<string, number>} */
  const longs = {};
  for (const [name, id] of Object.entries(ids)) {
    const result = swe.calc_ut(jd, id, flags);
    longs[name] = result[0]; // result = [longitude, latitude, distance, ...]
  }

  // Tierra: opuesta al Sol.
  longs.earth = (longs.sun + 180) % 360;
  // Nodo Sur: opuesto al Nodo Norte.
  longs.southNode = (longs.northNode + 180) % 360;

  return longs;
}

/**
 * Encuentra el Julian Day del Diseño: el momento en que el Sol estaba
 * exactamente 88° por detrás de su posición en el nacimiento (medido en
 * grados de arco solar, no en días).
 *
 * Usa una búsqueda iterativa tipo Newton. El Sol se mueve ~0,985°/día, así
 * que cada corrección de error en grados se traduce a corrección en días.
 *
 * @param {number} birthJd - Julian Day del nacimiento
 * @param {number} birthSunLongitude - longitud del Sol natal en grados
 * @returns {Promise<number>} Julian Day del Diseño
 */
export async function computeDesignJd(birthJd, birthSunLongitude) {
  const swe = await getSwe();
  const target = (((birthSunLongitude - 88) % 360) + 360) % 360;

  let jd = birthJd - 88; // estimación inicial: ~88 días naturales antes
  const flags = swe.SEFLG_SWIEPH;

  for (let i = 0; i < 50; i++) {
    const pos = swe.calc_ut(jd, swe.SE_SUN, flags);
    const current = pos[0];

    // Diferencia firmada en [-180, 180]: cuánto le sobra/falta al Sol
    // para llegar al target.
    let diff = (((current - target) % 360) + 540) % 360 - 180;

    if (Math.abs(diff) < 1e-7) return jd; // ~0,000004° de precisión, sobra
    jd -= diff / 0.985_647_3; // velocidad media diaria del Sol en grados
  }

  return jd; // 50 iteraciones es de sobra; si llegamos aquí, ya convergió
}
