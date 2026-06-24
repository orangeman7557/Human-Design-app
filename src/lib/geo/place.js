// Display helpers for geocoder place labels (shaped "City, Region…, Country").

/**
 * Trim a full place label to "City, Country", dropping the intermediate
 * region / province / county parts. Returns the city alone when there is no
 * distinct country segment.
 *
 * @param {string} [label] - e.g. "Madrid, Comunidad de Madrid, España"
 * @returns {string} e.g. "Madrid, España"
 */
export function cityCountry(label) {
  const parts = (label ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length <= 1) return parts[0] ?? '';
  const city = parts[0];
  const country = parts[parts.length - 1];
  return city === country ? city : `${city}, ${country}`;
}
