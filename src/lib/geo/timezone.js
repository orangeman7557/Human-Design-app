// Thin wrapper around tz-lookup. Given a latitude/longitude pair it returns
// the matching IANA timezone identifier (e.g. "Europe/Madrid"). The IANA
// identifier is the key piece for resolving historical daylight-saving
// rules via Luxon when we convert birth-local time to UTC.
//
// HD-2 (2026-11): Luxon reads offsets from the runtime's ICU tz data, which
// browsers and Node build WITHOUT tzdb's "backzone". Before 1970 many zones
// are merged into a neighbour there (Amsterdam → Brussels, Oslo/Stockholm/
// Copenhagen → Berlin, Reykjavik → Abidjan), and every zone's pre-standard
// period carries the local mean time of its reference city. `localToUtc`
// corrects exactly those cases and leaves everything else to Luxon:
//   1. a few merged zones get their own history from tzdb's backzone file,
//      up to the date the runtime data becomes right again (all before 1970);
//   2. elsewhere, while the runtime reports the zone's LMT, the birthplace's
//      own mean time (longitude / 15 h) is used instead of the capital's.

import tzLookup from 'tz-lookup';
import { DateTime } from 'luxon';

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

const HOUR = 3600;
const HOUR_MS = HOUR * 1000;
const DAY_MS = 24 * HOUR_MS;
const RUNTIME_END = Date.UTC(1970, 0, 1);

/** First Sunday on or after y-m-d, as "YYYY-MM-DD". */
function sunOnOrAfter(y, m, d) {
  const t = new Date(Date.UTC(y, m - 1, d));
  t.setUTCDate(d + ((7 - t.getUTCDay()) % 7));
  return t.toISOString().slice(0, 10);
}

/** Summer-time intervals (+1 h) for the given years, as [start, end] pairs. */
function yearly(from, to, fn) {
  const out = [];
  for (let y = from; y <= to; y++) out.push(fn(y));
  return out;
}

// Dutch "Neth" rules 1916-1939 (backzone). All times are local STANDARD time
// (tzdb ends given in wall summer time are already shifted back one hour).
const NETH_DST = [
  ['1916-05-01T00:00', '1916-09-30T23:00'],
  ['1917-04-16T02:00', '1917-09-17T02:00'],
  ['1918-04-01T02:00', '1918-09-30T02:00'],
  ['1919-04-07T02:00', '1919-09-29T02:00'],
  ['1920-04-05T02:00', '1920-09-27T02:00'],
  ['1921-04-04T02:00', '1921-09-26T02:00'],
  ['1922-03-26T02:00', '1922-10-08T02:00'],
  ['1923-06-01T02:00', '1923-10-07T02:00'],
  ['1924-03-30T02:00', '1924-10-05T02:00'],
  ['1925-06-05T02:00', '1925-10-04T02:00'],
  ...yearly(1926, 1939, (y) => [
    `${y}-05-${y === 1932 || y === 1937 ? 22 : 15}T02:00`,
    `${sunOnOrAfter(y, 10, 2)}T02:00`
  ])
];

// Icelandic rules 1917-1967 (backzone), local standard time (UTC-1).
const ICELAND_DST = [
  ['1917-02-19T23:00', '1917-10-21T00:00'],
  ['1918-02-19T23:00', '1918-11-16T00:00'],
  ['1919-02-19T23:00', '1919-11-16T00:00'],
  ['1921-03-19T23:00', '1921-06-23T00:00'],
  ['1939-04-29T23:00', '1939-10-29T01:00'],
  ['1940-02-25T02:00', '1940-11-03T01:00'],
  ['1941-03-02T01:00', '1941-11-02T01:00'],
  ['1942-03-08T01:00', '1942-10-25T01:00'],
  ...yearly(1943, 1967, (y) => [
    `${sunOnOrAfter(y, y <= 1946 ? 3 : 4, 1)}T01:00`,
    y === 1949 ? '1949-10-30T01:00' : y === 1967 ? '1967-10-29T01:00' : `${sunOnOrAfter(y, 10, 22)}T01:00`
  ])
];

// Per-zone history, from tzdb's backzone. Segments are ordered; `until` is
// the UTC instant where each one ends, and the last `until` is where the
// runtime data is correct again. Kinds:
//   { lmt: true }   local mean time of the birthplace (longitude)
//   { std, dst }    fixed standard offset (seconds) + summer intervals
//   { zone }        a runtime zone that kept the same clock in that period
const HISTORY = {
  'Europe/Amsterdam': [
    { until: '1834-12-31T23:40:28Z', lmt: true },
    { until: '1937-06-30T22:40:28Z', std: 1172, dst: NETH_DST }, // Amsterdam mean time +00:19:32
    { until: '1940-05-15T23:40:00Z', std: 1200, dst: NETH_DST }, // +00:20
    { until: '1945-04-02T01:00:00Z', zone: 'Europe/Berlin' },
    { until: '1946-12-31T23:00:00Z', std: HOUR, dst: [['1945-04-02T02:00', '1945-09-16T02:00']] }
  ],
  'Atlantic/Reykjavik': [
    { until: '1908-01-01T01:28:00Z', lmt: true },
    { until: '1968-04-07T02:00:00Z', std: -HOUR, dst: ICELAND_DST }
  ],
  'Europe/Stockholm': [
    { until: '1878-12-31T22:47:48Z', lmt: true },
    { until: '1899-12-31T22:59:46Z', std: 3614 }, // Swedish standard time +01:00:14
    { until: '1949-12-31T23:00:00Z', std: HOUR, dst: [['1916-05-14T23:00', '1916-10-01T00:00']] }
  ],
  'Europe/Oslo': [
    { until: '1894-12-31T23:17:00Z', lmt: true },
    { until: '1940-08-10T22:00:00Z', std: HOUR, dst: [['1916-05-22T01:00', '1916-09-29T23:00']] },
    { until: '1945-04-02T01:00:00Z', zone: 'Europe/Berlin' },
    {
      until: '1965-12-31T23:00:00Z',
      std: HOUR,
      dst: [
        ['1945-04-02T02:00', '1945-10-01T02:00'],
        ...yearly(1959, 1964, (y) => [`${sunOnOrAfter(y, 3, 15)}T02:00`, `${sunOnOrAfter(y, 9, 15)}T02:00`]),
        ['1965-04-25T02:00', '1965-09-19T02:00']
      ]
    }
  ],
  'Europe/Copenhagen': [
    { until: '1889-12-31T23:09:40Z', lmt: true },
    { until: '1893-12-31T23:09:40Z', std: 3020 }, // Copenhagen mean time +00:50:20
    {
      until: '1942-11-02T01:00:00Z',
      std: HOUR,
      dst: [['1916-05-14T23:00', '1916-09-30T22:00'], ['1940-05-15T00:00', '1942-11-02T02:00']]
    },
    { until: '1945-04-02T01:00:00Z', zone: 'Europe/Berlin' },
    {
      until: '1949-12-31T23:00:00Z',
      std: HOUR,
      dst: [
        ['1945-04-02T02:00', '1945-08-15T02:00'],
        ['1946-05-01T02:00', '1946-09-01T02:00'],
        ['1947-05-04T02:00', '1947-08-10T02:00'],
        ['1948-05-09T02:00', '1948-08-08T02:00']
      ]
    }
  ]
};

for (const segments of Object.values(HISTORY)) {
  for (const s of segments) {
    s.untilMs = Date.parse(s.until);
    if (s.dst) s.dstMs = s.dst.map((pair) => pair.map((t) => Date.parse(`${t}Z`) - s.std * 1000));
  }
}

/** Runtime (ICU) offset of `zone` at a UTC instant, in whole seconds. */
function runtimeOffset(zone, utcMs) {
  return Math.round(DateTime.fromMillis(utcMs, { zone }).offset * 60);
}

/** Local mean time for a longitude, in seconds (1° = 4 min). */
function meanTimeOffset(longitude) {
  return Math.round(longitude * 240);
}

const lmtCache = new Map();
function zoneLmt(zone) {
  if (!lmtCache.has(zone)) lmtCache.set(zone, runtimeOffset(zone, Date.UTC(1800, 0, 1)));
  return lmtCache.get(zone);
}

/** Offset (seconds) at a UTC instant for a zone that has a HISTORY entry. */
function historyOffset(zone, segments, utcMs, longitude) {
  const seg = segments.find((s) => utcMs < s.untilMs);
  if (!seg || seg.zone) return runtimeOffset(seg ? seg.zone : zone, utcMs);
  if (seg.lmt) return Number.isFinite(longitude) ? meanTimeOffset(longitude) : runtimeOffset(zone, utcMs);
  return seg.std + ((seg.dstMs || []).some(([a, b]) => utcMs >= a && utcMs < b) ? HOUR : 0);
}

/**
 * Convert a birth-local wall-clock time to a UTC Date, correcting the pre-1970
 * cases the runtime tz data gets wrong (see header). Returns null when Luxon
 * cannot parse the input.
 *
 * Ambiguous wall times (clocks set back) resolve to the later, standard-time
 * occurrence and skipped ones count as standard time — the same choice Luxon
 * makes for the zones it handles.
 *
 * @param {string} date      "YYYY-MM-DD"
 * @param {string} time      "HH:MM"
 * @param {string} zone      IANA zone id
 * @param {number} [longitude] birthplace longitude (east positive)
 * @returns {Date|null}
 */
export function localToUtc(date, time, zone, longitude) {
  const dt = DateTime.fromISO(`${date}T${time}`, { zone });
  if (!dt.isValid) return null;
  const local = Date.parse(`${date}T${time}Z`);
  const segments = HISTORY[zone];

  if (segments) {
    if (local >= segments[segments.length - 1].untilMs + DAY_MS) return dt.toJSDate();
    const offsetAt = (utc) => historyOffset(zone, segments, utc, longitude);
    const candidates = [...new Set([-3, -2, -1, 0, 1, 2, 3].map((h) => offsetAt(local - h * HOUR_MS)))];
    const fitting = candidates.filter((o) => offsetAt(local - o * 1000) === o);
    return new Date(local - Math.min(...(fitting.length ? fitting : candidates)) * 1000);
  }

  if (local < RUNTIME_END && Number.isFinite(longitude)) {
    const lmt = zoneLmt(zone);
    const own = meanTimeOffset(longitude);
    // Only while the runtime is on the zone's LMT (never a round offset), and
    // not across the date line (e.g. Alaska's pre-1867 Russian-side LMT).
    if (lmt % 900 !== 0 && Math.round(dt.offset * 60) === lmt && Math.abs(own - lmt) <= 3 * HOUR) {
      return new Date(local - own * 1000);
    }
  }
  return dt.toJSDate();
}
