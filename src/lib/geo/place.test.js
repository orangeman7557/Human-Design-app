import { describe, it, expect } from 'vitest';
import { cityCountry } from './place.js';

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
