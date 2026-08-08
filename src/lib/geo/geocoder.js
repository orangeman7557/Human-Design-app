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

// Locale-biased result ordering. When two cities share a name (classic:
// "Cuenca" exists in both Spain and Ecuador) we surface one first by country.
// The bias follows the UI language (Phase M): Spanish → Spain; other languages
// keep Photon's own relevance order. We do NOT filter by country — the user can
// still pick any result.
const PREFERRED_COUNTRY_BY_LANG = { es: 'es' };

// Photon location bias per UI language. Photon buries big cities under short
// exact-name hamlets for a short prefix ("mala" doesn't surface Málaga even in
// the top 40), but a location bias pulls nearby places up — so for the Spanish
// UI we nudge toward Spain and Málaga rides up on "mala". Exact foreign matches
// (Berlin, London, Paris) still win, so it doesn't hurt international searches.
const PREFERRED_LATLON_BY_LANG = { es: { lat: 40, lon: -3.5 } };

// Settlement prominence, low = more prominent. A big city buried under hamlets
// of the same prefix (Málaga vs Malaguilla/Malagón) rises once its type outranks
// theirs. Spanish big cities are often tagged `municipality`, so it sits high.
const SETTLEMENT_RANK = { city: 0, municipality: 1, town: 2, village: 3, hamlet: 4 };

// Major Spanish cities (provincial capitals + the biggest towns). Photon's
// typeahead buries them under same-prefix hamlets — "mala" never surfaces Málaga
// at any depth or bias — so for the Spanish UI, when the input is a prefix of one
// of these, we look it up by name and float it to the top. Same reliable trick as
// the exonym rescue; the list is small and only the prefix has to match.
const MAJOR_ES_CITIES = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia',
  'Palma', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón',
  'Granada', 'Elche', 'Oviedo', 'Badalona', 'Cartagena', 'Terrassa', 'Sabadell',
  'Móstoles', 'Pamplona', 'Almería', 'Santander', 'Burgos', 'Albacete',
  'Salamanca', 'Huelva', 'Logroño', 'Badajoz', 'León', 'Tarragona', 'Cádiz',
  'Lleida', 'Marbella', 'Jaén', 'Ourense', 'Girona', 'Cáceres', 'Toledo',
  'Cuenca', 'Ávila', 'Segovia', 'Soria', 'Zamora', 'Palencia', 'Lugo',
  'Pontevedra', 'Guadalajara', 'Ciudad Real', 'Teruel', 'Huesca', 'Castellón',
  'Melilla', 'Ceuta', 'San Sebastián', 'Vitoria', 'A Coruña', 'Las Palmas',
  'Santa Cruz de Tenerife', 'Jerez de la Frontera', 'Santiago de Compostela'
];

// Photon accepts de/en/fr/it (and default); it rejects lang=es with HTTP 400
// (see the header note). So we only forward languages Photon supports; Spanish
// falls through to the default, which returns local-language names.
const PHOTON_LANGS = new Set(['de', 'en', 'fr', 'it']);

// Spanish exonyms. Because Photon rejects `lang=es`, the Spanish path uses its
// default index, which matches only local/official names — so a Spanish exonym
// for a foreign city ("Nueva York", "Londres", "Múnich") matches nothing: the
// city's OSM name is "New York" / "London" / "München". English is spared this,
// since Photon accepts `lang=en` and indexes English names. So for the Spanish
// UI we map the well-known exonyms to their English name and run a second lookup
// with `lang=en` (which resolves them correctly), surfacing those results first.
// Only unambiguous famous cities are listed — names that also belong to a real
// Spanish-speaking town (Colonia, Florencia, Ginebra, Atenas…) are left out so
// we never bury the place the user actually means.
const ES_EXONYMS = {
  'nueva york': 'New York',
  'nueva orleans': 'New Orleans',
  'filadelfia': 'Philadelphia',
  'londres': 'London',
  'edimburgo': 'Edinburgh',
  'munich': 'Munich',
  'hamburgo': 'Hamburg',
  'francfort': 'Frankfurt',
  'frankfurt': 'Frankfurt',
  'nuremberg': 'Nuremberg',
  'aquisgran': 'Aachen',
  'milan': 'Milan',
  'napoles': 'Naples',
  'turin': 'Turin',
  'venecia': 'Venice',
  'genova': 'Genoa',
  'basilea': 'Basel',
  'viena': 'Vienna',
  'praga': 'Prague',
  'varsovia': 'Warsaw',
  'cracovia': 'Krakow',
  'bucarest': 'Bucharest',
  'belgrado': 'Belgrade',
  'moscu': 'Moscow',
  'san petersburgo': 'Saint Petersburg',
  'lisboa': 'Lisbon',
  'oporto': 'Porto',
  'burdeos': 'Bordeaux',
  'marsella': 'Marseille',
  'niza': 'Nice',
  'estrasburgo': 'Strasbourg',
  'brujas': 'Bruges',
  'amberes': 'Antwerp',
  'bruselas': 'Brussels',
  'la haya': 'The Hague',
  'roterdam': 'Rotterdam',
  'estocolmo': 'Stockholm',
  'copenhague': 'Copenhagen',
  'gotemburgo': 'Gothenburg',
  'estambul': 'Istanbul',
  'esmirna': 'Izmir',
  'damasco': 'Damascus',
  'jerusalen': 'Jerusalem',
  'el cairo': 'Cairo',
  'pekin': 'Beijing',
  'tokio': 'Tokyo',
  'seul': 'Seoul',
  'bombay': 'Mumbai',
  'calcuta': 'Kolkata',
  'nueva delhi': 'New Delhi',
  'ciudad del cabo': 'Cape Town'
};

/** Lowercase and strip diacritics so "Múnich" and "munich" hit the same key. */
const normalize = (s) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

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
 * @param {string} [lang] - UI language; biases ranking and result-name language.
 * @returns {Promise<Place[]>}
 */
export async function searchPlaces(query, signal, lang) {
  const places = await rawSearch(
    query,
    signal,
    PHOTON_LANGS.has(lang) ? lang : undefined,
    PREFERRED_LATLON_BY_LANG[lang] ?? null
  );

  // Spanish rescues (both flag hits with `_priority` so ranking floats them above
  // the preferred-country bias — without it "Múnich" surfaces the hamlet Muñico
  // ahead of Munich).
  if (lang === 'es') {
    const nq = normalize(query);
    const endonym = ES_EXONYMS[nq];
    if (endonym) {
      // Exonym: the whole query is a known exonym → look the city up by its
      // English name (which Photon resolves) so "Nueva York" offers New York, USA.
      const extra = await rawSearch(endonym, signal, 'en');
      for (const p of extra) p._priority = true;
      places.unshift(...extra);
    } else if (nq.length >= 3) {
      // Major-city prefix: the input is the start of a big Spanish city Photon
      // won't surface on its own ("mala" → Málaga). Look each match up by name
      // (Spain-biased) and float its own ES hit to the top. Capped so a broad
      // prefix ("san") makes at most a few extra requests.
      const matches = MAJOR_ES_CITIES.filter((c) => normalize(c).startsWith(nq)).slice(0, 3);
      const hits = [];
      for (const city of matches) {
        const extra = await rawSearch(city, signal, undefined, PREFERRED_LATLON_BY_LANG.es);
        const hit =
          extra.find((p) => p._countryCode === 'es' && normalize(p._name) === normalize(city)) ??
          extra.find((p) => p._countryCode === 'es');
        if (hit) {
          hit._priority = true;
          hits.push(hit);
        }
      }
      places.unshift(...hits);
    }
  }

  return dedupeAndRank(places, PREFERRED_COUNTRY_BY_LANG[lang] ?? null, normalize(query)).slice(0, 6);
}

/**
 * One Photon lookup → filtered `Place[]` carrying the hidden ranking fields
 * (`_value`, `_countryCode`), before dedup/rank/slice. Kept separate so callers
 * can merge several lookups (e.g. the exonym rescue) and rank the union once.
 *
 * @param {string} query
 * @param {AbortSignal} [signal]
 * @param {string} [photonLang] - already validated against PHOTON_LANGS.
 */
async function rawSearch(query, signal, photonLang, bias = null) {
  const params = new URLSearchParams({
    q: query,
    // Over-fetch (more than we show) so client-side dedup and re-rank have
    // material to work with.
    limit: '15'
  });
  // Ask Photon for names in the UI language when it supports it (English etc.),
  // so results read "Madrid, Spain" rather than "Madrid, España".
  if (photonLang) params.set('lang', photonLang);
  // Optional location bias so nearby settlements rank higher (see PREFERRED_LATLON).
  if (bias) {
    params.set('lat', String(bias.lat));
    params.set('lon', String(bias.lon));
  }
  // Multiple `osm_tag` values are OR-combined, so this keeps only settlements.
  for (const tag of PLACE_TAGS) params.append('osm_tag', `place:${tag}`);

  const res = await fetch(`${ENDPOINT}?${params}`, { signal });
  if (!res.ok) throw new Error(`Photon returned HTTP ${res.status}`);

  /** @type {{ features?: any[] }} */
  const json = await res.json();
  // Features without a label or without real coordinates are dropped: NaN
  // coords would make the timezone lookup throw when the place is picked.
  return (json.features ?? [])
    .map(toPlace)
    .filter((p) => p.label && Number.isFinite(p.latitude) && Number.isFinite(p.longitude));
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
    _name: placeName ?? '',
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
 *   - An exact name match (accents folded) before mere prefix/substring hits,
 *     so typing a city's full name floats it above longer homonyms whatever
 *     Photon's own order — and "Málaga" / "malaga" rank identically.
 *   - Preferred-country entries before the rest, so a homonym in Spain wins
 *     a tie against one abroad without hiding the foreign option.
 *
 * Dedup is by exact label after ranking, so the highest-ranked entry for a
 * given label survives.
 */
function dedupeAndRank(places, preferredCountry = null, normQuery = '') {
  const score = (p) => {
    // Rescued hits (exonym or major-city prefix) are the city the user meant —
    // always first, ahead of every other signal. Constant keeps their own order.
    if (p._priority) return -100;
    let s = 0;
    if (!PLACE_TAGS.includes(p._value)) s += 10;
    // Accent-insensitive exact-name match: "malaga" and "málaga" both land here,
    // so the actual city beats hamlets that merely start with the same letters.
    if (normQuery && normalize(p._name) === normQuery) s -= 4;
    if (preferredCountry && p._countryCode !== preferredCountry) s += 5;
    // Prominence tiebreaker (weaker than the country bias): among same-country
    // prefix hits, a city/municipality outranks a village/hamlet, so "mala"
    // surfaces Málaga above Malaguilla/Malagón.
    s += SETTLEMENT_RANK[p._value] ?? 4;
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
