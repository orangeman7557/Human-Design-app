// Place-of-birth autocomplete, backed by Photon (https://photon.komoot.io/).
//
// We started on Nominatim's `/search`, but it is built for full-form
// geocoding, not autocomplete: short prefixes ("madr", "stuttg") rank by
// completeness/importance, not prefix affinity, so "madr" surfaces a hamlet
// in Yemen instead of Madrid. Photon indexes the same OSM data in an
// Elasticsearch index tuned for typeahead, so prefixes resolve correctly.
//
// History / gotcha: an earlier switch to Photon was reverted because it sent
// `lang=es`, which Photon rejects with HTTP 400 (it only accepts de/en/fr/it
// or the default). DO NOT pass `lang=es` here. Without `lang`, Photon returns
// names in their local language, which reads fine for our labels.

const ENDPOINT = 'https://photon.komoot.io/api/';

// Locale-biased result ordering. The audience is currently Spanish, so when
// two cities share a name (classic: "Cuenca" exists in both Spain and
// Ecuador) we surface the Spanish one first. We do NOT filter by country —
// the user can still pick the Ecuadorian one. Replace with something
// user-configurable when the app grows beyond ES.
const PREFERRED_COUNTRY_CODE = 'es';

// OSM `place` values we accept as birth-places. Restricting to settlements
// (server-side, via `osm_tag`) is what keeps regions, counties and POIs out
// of the suggestions — the old Nominatim path leaked "Valencia County" and
// duplicated-label admin boundaries into the list.
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
 * @param {string} query - Free-text input (e.g. "madr", "Madrid", "Berlin").
 * @param {AbortSignal} [signal] - Used by the caller to cancel stale requests.
 * @returns {Promise<Place[]>}
 */
export async function searchPlaces(query, signal) {
  const params = new URLSearchParams({
    q: query,
    // Over-fetch (more than we show) so client-side dedup and re-rank have
    // material to work with.
    limit: '15'
  });
  // Multiple `osm_tag` values are OR-combined, so this keeps only settlements.
  for (const tag of PLACE_TAGS) params.append('osm_tag', `place:${tag}`);

  const res = await fetch(`${ENDPOINT}?${params}`, { signal });
  if (!res.ok) throw new Error(`Photon returned HTTP ${res.status}`);

  /** @type {{ features?: any[] }} */
  const json = await res.json();
  const places = (json.features ?? []).map(toPlace).filter((p) => p.label);
  return dedupeAndRank(places).slice(0, 6);
}

/**
 * Photon returns a GeoJSON FeatureCollection; each feature carries its
 * address parts on `properties` and coordinates on `geometry`. We normalize
 * to our internal shape and keep `_value`/`_countryCode` as hidden ranking
 * signals (stripped before returning to callers).
 */
function toPlace(feature) {
  const props = feature.properties ?? {};
  const [lon, lat] = feature.geometry?.coordinates ?? [NaN, NaN];

  // `name` is the most specific label; `city` may differ (e.g. a town that's
  // part of a larger municipality).
  const placeName = props.name || props.city || props.county;
  const region = props.state || props.county;
  const country = props.country;
  const label = [placeName, region, country].filter(Boolean).join(', ');

  return {
    label,
    latitude: lat,
    longitude: lon,
    _value: props.osm_value || props.type,
    _countryCode: (props.countrycode ?? props.country_code ?? '').toLowerCase()
  };
}

/**
 * Re-rank and de-duplicate.
 *
 * Ranking signals (lower score wins; stable sort preserves Photon's
 * relevance order within ties):
 *   - Settlements before anything else (a guard — the server filter should
 *     already have excluded non-settlements).
 *   - Preferred-country entries before the rest, so a homonym in Spain wins
 *     a tie against one abroad without hiding the foreign option.
 *
 * Dedup is by exact label after ranking, so the highest-ranked entry for a
 * given label survives.
 */
function dedupeAndRank(places) {
  const score = (p) => {
    let s = 0;
    if (!PLACE_TAGS.includes(p._value)) s += 10;
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
