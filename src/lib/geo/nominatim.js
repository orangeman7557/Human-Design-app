// Wrapper around the public Nominatim (OpenStreetMap) geocoder.
//
// Nominatim's usage policy asks consumers to:
//   1. Stay below 1 request per second.
//   2. Identify themselves via Referer or User-Agent.
//
// We handle (1) by debouncing keystrokes in CityAutocomplete.svelte and
// aborting in-flight requests on every new keystroke. For (2), the browser
// automatically sends a Referer header pointing at our own deployment, which
// satisfies Nominatim's requirement without us having to forge a User-Agent
// (browsers won't let us set that anyway).

const ENDPOINT = 'https://nominatim.openstreetmap.org/search';

/**
 * @typedef {Object} Place
 * @property {string} label
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * Search Nominatim for places matching a free-text query.
 *
 * @param {string} query - Free-text input (e.g. "Madrid", "Cuenca, Spain").
 * @param {AbortSignal} [signal] - Used by the caller to cancel stale requests.
 * @returns {Promise<Place[]>}
 */
export async function searchPlaces(query, signal) {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: '6',
    addressdetails: '1',
    // Localized place names. Spanish users see Spanish-language place names.
    'accept-language': 'es'
  });

  const res = await fetch(`${ENDPOINT}?${params}`, { signal });
  if (!res.ok) throw new Error(`Nominatim returned HTTP ${res.status}`);

  const raw = await res.json();
  return raw.map(toPlace);
}

/**
 * Compose a human-friendly label from Nominatim's verbose address parts.
 * Falls back through the place hierarchy because not every locality has a
 * `city` field (small villages, hamlets, etc.).
 */
function toPlace(item) {
  const addr = item.address ?? {};
  const place =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.hamlet ||
    addr.municipality ||
    addr.county ||
    item.name;
  const region = addr.state || addr.region;
  const country = addr.country;
  const label = [place, region, country].filter(Boolean).join(', ');

  return {
    label,
    latitude: parseFloat(item.lat),
    longitude: parseFloat(item.lon)
  };
}
