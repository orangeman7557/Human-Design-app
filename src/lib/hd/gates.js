// Mapeo de longitud eclíptica (en grados, 0-360) a puerta y línea HD.

import { GATE_WHEEL, GATE_WHEEL_START, GATE_SIZE, LINE_SIZE } from './constants.js';

/**
 * Dada una longitud eclíptica en grados (tropical, 0-360),
 * devuelve la puerta HD activa y la línea dentro de esa puerta.
 *
 * @param {number} longitude - grados eclípticos, 0-360
 * @returns {{ gate: number, line: number, positionInGate: number }}
 *   gate: 1-64
 *   line: 1-6
 *   positionInGate: 0-5.625, posición dentro de la puerta (útil para color/tono/base más tarde)
 */
export function longitudeToGate(longitude) {
  // Normalizamos a un offset desde el inicio de la puerta 41.
  // El doble módulo es para manejar correctamente cualquier negativo.
  const offset = (((longitude - GATE_WHEEL_START) % 360) + 360) % 360;

  const gateIndex = Math.floor(offset / GATE_SIZE);
  const gate = GATE_WHEEL[gateIndex];

  const positionInGate = offset - gateIndex * GATE_SIZE;

  // Línea: 1-6 (cada línea ocupa 0,9375°).
  // Math.min protege contra Math.floor(5.999.../0.9375) = 6 con redondeo flotante.
  let line = Math.floor(positionInGate / LINE_SIZE) + 1;
  if (line > 6) line = 6;

  return { gate, line, positionInGate };
}
