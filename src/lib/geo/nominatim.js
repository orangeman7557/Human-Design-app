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
    // We over-fetch (more than we display) so client-side dedup has material
    // to work with. Nominatim's own `dedupe=1` doesn't catch every case
    // because it can't distinguish a "city" from the homonymous "boundary".
    limit: '10',
    addressdetails: '1',
    // Localized place names. Spanish users see Spanish-language place names.
    'accept-language': 'es'
  });

  const res = await fetch(`${ENDPOINT}?${params}`, { signal });
  if (!res.ok) throw new Error(`Nominatim returned HTTP ${res.status}`);

  const raw = await res.json();
  return dedupeAndRank(raw.map(toPlace)).slice(0, 6);
}

/**
 * Compose a human-friendly label from Nominatim's verbose address parts.
 * Falls back through the place hierarchy because not every locality has a
 * `city` field (small villages, hamlets, etc.).
 *
 * Keeps the `class` field around as a hidden ranking signal for the
 * dedup pass; it's stripped before returning to callers.
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
    longitude: parseFloat(item.lon),
    _class: item.class // internal ranking signal
  };
}

/**
 * Remove duplicate entries (Nominatim often returns the same place under
 * different OSM types: the "city" record and the "administrative boundary"
 * record that shares the city name). We rank `place` entries above
 * `boundary` entries, then keep the first occurrence of each label.
 */
function dedupeAndRank(places) {
  const priority = (p) => (p._class === 'place' ? 0 : 1);
  const sorted = [...places].sort((a, b) => priority(a) - priority(b));

  const seen = new Set();
  const out = [];
  for (const p of sorted) {
    if (seen.has(p.label)) continue;
    seen.add(p.label);
    out.push({
      label: p.label,
      latitude: p.latitude,
      longitude: p.longitude
    });
  }
  return out;
}
