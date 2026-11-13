import { describe, it, expect } from 'vitest';
import { cityCountry, buildPlaceLabel } from './place.js';

describe('cityCountry', () => {
  it('drops the intermediate region, keeping city + country', () => {
    expect(cityCountry('Madrid, Comunidad de Madrid, España')).toBe('Madrid, España');
    expect(cityCountry('València, Comunitat Valenciana, España')).toBe('València, España');
  });

  it('keeps a two-part "city, country" label as-is', () => {
    expect(cityCountry('Berlin, Deutschland')).toBe('Berlin, Deutschland');
  });

  it('returns the city alone when there is no country segment', () => {
    expect(cityCountry('Madrid')).toBe('Madrid');
  });

  it('handles empty / missing input', () => {
    expect(cityCountry('')).toBe('');
    expect(cityCountry()).toBe('');
  });
});

describe('buildPlaceLabel', () => {
  it('omits a region that repeats the city, ignoring case and accents', () => {
    expect(buildPlaceLabel('Lisbon', 'Lisbon', 'Portugal')).toBe('Lisbon, Portugal');
    expect(buildPlaceLabel('Málaga', 'malaga', 'España')).toBe('Málaga, España');
  });
  it('keeps distinct regions and tolerates missing parts', () => {
    expect(buildPlaceLabel('Madrid', 'Comunidad de Madrid', 'España')).toBe('Madrid, Comunidad de Madrid, España');
    expect(buildPlaceLabel('Lisbon', undefined, 'Portugal')).toBe('Lisbon, Portugal');
    expect(buildPlaceLabel('Lisbon', 'Lisbon', undefined)).toBe('Lisbon');
  });
});
