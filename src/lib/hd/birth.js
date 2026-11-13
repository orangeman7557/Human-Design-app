import { DateTime } from 'luxon';

const MAX_TEXT = 200;

/** @param {unknown} v */
function optionalText(v) {
  return v == null || (typeof v === 'string' && v.length <= MAX_TEXT);
}

/**
 * Single validity check for a stored/imported birth record. Coordinates are
 * optional (old saved charts predate them) but must be sane when present.
 * @param {any} b
 * @returns {boolean}
 */
export function validateBirth(b) {
  if (!b || typeof b !== 'object') return false;
  if (typeof b.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(b.date)) return false;
  const [y, mo, da] = b.date.split('-').map(Number);
  const probe = new Date(Date.UTC(2000, mo - 1, da));
  probe.setUTCFullYear(y);
  if (y < 1 || probe.getUTCMonth() !== mo - 1 || probe.getUTCDate() !== da) return false;
  if (typeof b.time !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(b.time)) return false;
  if (typeof b.timezone !== 'string' || !b.timezone) return false;
  try {
    if (!DateTime.local().setZone(b.timezone).isValid) return false;
  } catch {
    return false;
  }
  for (const [k, max] of [['latitude', 90], ['longitude', 180]]) {
    const v = b[k];
    if (v == null) continue;
    if (typeof v !== 'number' || !Number.isFinite(v) || Math.abs(v) > max) return false;
  }
  return optionalText(b.name) && optionalText(b.placeLabel);
}
