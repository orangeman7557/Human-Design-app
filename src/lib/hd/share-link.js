// Shareable-chart links (jul 2026). A chart is shared as a `/chart?…` URL that
// carries the birth data as query params, so the recipient recomputes the same
// chart locally — no backend, no stored charts.
//
// The place is what would blow up the URL, so instead of the full geocoder
// label we send the coordinates (needed for the calc anyway) plus a short
// "City, Country" label just for display. The IANA timezone is *not* sent: it
// is recovered from the coordinates with tz-lookup, exactly as it was resolved
// when the form was filled in — so the URL stays short.
//
// Param keys are terse on purpose: n=name, d=YYYYMMDD, t=HHMM, la/lo=coords,
// p=short place label (shown in the chart's birth subtitle and the export
// filename; the calc itself only needs the coordinates).

import { cityCountry } from '$lib/geo/place.js';
import { timezoneFor } from '$lib/geo/timezone.js';

/** Round to ~11 m and drop trailing zeros (city centroids don't need more). */
function shortCoord(n) {
  return String(Math.round(Number(n) * 1e4) / 1e4);
}

/**
 * Encode birth data into a URL query string (no leading "?").
 * @param {any} birth - the stored birthData object.
 */
export function encodeBirth(birth) {
  const p = new URLSearchParams();
  if (birth?.name) p.set('n', birth.name);
  if (birth?.date) p.set('d', String(birth.date).replace(/-/g, ''));
  if (birth?.time) p.set('t', String(birth.time).replace(':', ''));
  if (birth?.latitude != null) p.set('la', shortCoord(birth.latitude));
  if (birth?.longitude != null) p.set('lo', shortCoord(birth.longitude));
  const place = cityCountry(birth?.placeLabel);
  if (place) p.set('p', place);
  return p.toString();
}

/** Build the full absolute share URL for a chart. */
export function buildShareUrl(birth, origin) {
  return `${origin}/chart?${encodeBirth(birth)}`;
}

/** True when the query string looks like a shared-chart link. */
export function hasShareParams(params) {
  return params.has('d') && params.has('la') && params.has('lo');
}

/**
 * Decode a shared-chart query back into a birthData object, or null if the
 * params are missing/malformed.
 * @param {URLSearchParams} params
 */
export function decodeBirth(params) {
  const d = params.get('d');
  if (!d || !/^\d{8}$/.test(d)) return null;
  const date = `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;

  const t = (params.get('t') || '').padStart(4, '0');
  const time = /^\d{4}$/.test(t) ? `${t.slice(0, 2)}:${t.slice(2, 4)}` : '00:00';

  const latitude = Number(params.get('la'));
  const longitude = Number(params.get('lo'));
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

  let timezone;
  try {
    timezone = timezoneFor(latitude, longitude);
  } catch {
    return null;
  }

  return {
    name: params.get('n') || null,
    date,
    time,
    timezone,
    latitude,
    longitude,
    placeLabel: params.get('p') || ''
  };
}
