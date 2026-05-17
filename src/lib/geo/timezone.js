// Thin wrapper around tz-lookup. Given a latitude/longitude pair it returns
// the matching IANA timezone identifier (e.g. "Europe/Madrid"). The IANA
// identifier is the key piece for resolving historical daylight-saving
// rules via Luxon when we convert birth-local time to UTC.

import tzLookup from 'tz-lookup';

/**
 * Resolve an IANA timezone for a coordinate pair.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @returns {string} IANA timezone id (e.g. "Europe/Madrid").
 * @throws if tz-lookup cannot match a zone (e.g. invalid coordinates).
 */
export function timezoneFor(latitude, longitude) {
  return tzLookup(latitude, longitude);
}
