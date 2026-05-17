// Place autocomplete backed by Photon (https://photon.komoot.io/).
//
// We started with Nominatim's `/search` endpoint, but it's designed for
// full-form geocoding, not autocomplete: short prefixes like "cuen" or
// "barc" don't surface the obvious matches because Nominatim ranks by
// completeness and importance, not by prefix affinity. Photon is built on
// the same OSM dataset but uses an Elasticsearch index tuned for
// autocomplete-style prefix matching.
//
// Tech debt: this file is still called `nominatim.js` for historical
// reasons. Rename to `geocoder.js` in a future cleanup pass.

const ENDPOINT = 'https://photon.komoot.io/api/';

// Locale-biased result ordering. The audience is currently Spanish, so when
// two cities share a name (classic: "Cuenca" exists in both Spain and
// Ecuador) we surface the Spanish one first. We do NOT filter — the user
// can still pick the Ecuadorian one if it's the right match. Replace this
// constant with something user-configurable when the app grows beyond ES.
const PREFERRED_COUNTRY_CODE = 'es';

// OSM "place" tag values we accept as valid birth-places. We exclude POIs
// (restaurants, parks…) and admin boundaries because for a birth location
// the user wants the settlement, not its surrounding administrative shape.
const PLACE_TAGS = ['city', 'town', 'village', 'hamlet', 'municipality'];

/**
 * @typedef {Object} Place
 * @property {string} label
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * Autocomplete-style search for places matching a free-text prefix or
 * partial query.
 *
 * @param {string} query - Free-text input (e.g. "cuen", "Madrid", "Berlin").
 * @param {AbortSignal} [signal] - Used by the caller to cancel stale requests.
 * @returns {Promise<Place[]>}
 */
export async function searchPlaces(query, signal) {
  const params = new URLSearchParams({
    q: query,
    lang: 'es',
    // Over-fetch so client-side dedup and re-rank have material to work with.
    limit: '15'
  });
  for (const tag of PLACE_TAGS) params.append('osm_tag', `place:${tag}`);

  const res = await fetch(`${ENDPOINT}?${params}`, { signal });
  if (!res.ok) throw new Error(`Photon returned HTTP ${res.status}`);

  /** @type {{ features: any[] }} */
  const json = await res.json();
  const places = (json.features ?? []).map(toPlace).filter((p) => p.label);
  return dedupeAndRank(places).slice(0, 6);
}

/**
 * Photon returns a GeoJSON FeatureCollection where each feature has its
 * address parts on `properties`. We normalize to our internal shape and
 * keep `_type` and `_countryCode` as hidden ranking signals.
 */
function toPlace(feature) {
  const props = feature.properties ?? {};
  const [lon, lat] = feature.geometry?.coordinates ?? [NaN, NaN];

  // Photon's `name` is the most specific label; `city` may differ
  // (e.g. for a town that's part of a larger municipality).
  const placeName = props.name || props.city || props.county;
  const region = props.state || props.county;
  const country = props.country;
  const label = [placeName, region, country].filter(Boolean).join(', ');

  return {
    label,
    latitude: lat,
    longitude: lon,
    _type: props.type,
    _countryCode: (props.country_code ?? props.countrycode ?? '').toLowerCase()
  };
}

/**
 * Re-rank and de-duplicate.
 *
 * Ranking signals (lower score wins; stable sort preserves Photon's
 * original relevance order within ties):
 *   - Settlements (`city`, `town`, `village`, `hamlet`, `municipality`)
 *     come before anything else.
 *   - Entries in the preferred country come before the rest.
 *
 * Dedup is by exact label after ranking, so the highest-ranked entry for
 * a given label survives.
 */
function dedupeAndRank(places) {
  const score = (p) => {
    let s = 0;
    if (!PLACE_TAGS.includes(p._type)) s += 10;
    if (p._countryCode !== PREFERRED_COUNTRY_CODE) s += 5;
    return s;
  };
  const sorted = [...places].sort((a, b) => score(a) - score(b));

  const seen = new Set();
  const out = [];
  for (const p of sorted) {
    if (!p.label || seen.has(p.label)) continue;
    seen.add(p.label);
    out.push({
      label: p.label,
      latitude: p.latitude,
      longitude: p.longitude
    });
  }
  return out;
}
