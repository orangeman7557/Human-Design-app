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
//
// Known limitation: Nominatim is not really an autocomplete engine — short
// prefixes ("cuen", "barc") often don't surface the obvious match. We've
// tried switching to Photon and it broke; we'll revisit later. Logged in
// BACKLOG.md.

const ENDPOINT = 'https://nominatim.openstreetmap.org/search';

// Locale-biased result ordering. The audience is currently Spanish, so when
// two cities share a name (classic: "Cuenca" exists in both Spain and
// Ecuador) we surface the Spanish one first. We do NOT filter — the user
// can still pick the Ecuadorian one if it's the right match. Replace this
// constant with something user-configurable when the app grows beyond ES.
const PREFERRED_COUNTRY_CODE = 'es';

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
    // We over-fetch (more than we display) so client-side dedup and re-rank
    // have material to work with. Nominatim's own `dedupe=1` doesn't catch
    // every case because it can't distinguish a "city" from the homonymous
    // "boundary".
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
 * Keeps `class` and `countryCode` around as hidden ranking signals for the
 * dedup pass; they are stripped before returning to callers.
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
    _class: item.class,
    _countryCode: (addr.country_code ?? '').toLowerCase()
  };
}

/**
 * Re-rank and de-duplicate.
 *
 * Ranking signals (lower score wins; stable sort preserves Nominatim's
 * original "importance" order within ties):
 *   - Entries of `class=place` (actual cities/villages) come before
 *     `class=boundary` (administrative regions that share the name).
 *   - Entries in the preferred country come before the rest.
 *
 * Dedup is by exact label after ranking, so the highest-ranked entry for
 * a given label survives.
 */
function dedupeAndRank(places) {
  const score = (p) => {
    let s = 0;
    if (p._class !== 'place') s += 10;
    if (p._countryCode !== PREFERRED_COUNTRY_CODE) s += 5;
    return s;
  };
  const sorted = [...places].sort((a, b) => score(a) - score(b));

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
