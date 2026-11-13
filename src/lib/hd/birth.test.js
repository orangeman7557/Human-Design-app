import { describe, it, expect } from 'vitest';
import { validateBirth } from './birth.js';

const ok = { date: '1990-05-17', time: '14:20', timezone: 'Europe/Lisbon', latitude: 38.7, longitude: -9.1, placeLabel: 'Lisbon, Portugal', name: null };

describe('validateBirth', () => {
  it('accepts a complete record and one without coordinates', () => {
    expect(validateBirth(ok)).toBe(true);
    expect(validateBirth({ date: '1984-03-13', time: '09:30', timezone: 'Europe/Madrid' })).toBe(true);
  });
  it('rejects impossible dates and times', () => {
    expect(validateBirth({ ...ok, date: '1990-02-31' })).toBe(false);
    expect(validateBirth({ ...ok, date: '1990-13-01' })).toBe(false);
    expect(validateBirth({ ...ok, date: '90-05-17' })).toBe(false);
    expect(validateBirth({ ...ok, time: '24:00' })).toBe(false);
    expect(validateBirth({ ...ok, time: '12:60' })).toBe(false);
    expect(validateBirth({ ...ok, time: '9:30' })).toBe(false);
  });
  it('rejects bad time zones', () => {
    expect(validateBirth({ ...ok, timezone: '' })).toBe(false);
    expect(validateBirth({ ...ok, timezone: 'Mars/Olympus' })).toBe(false);
  });
  it('checks coordinates only when present', () => {
    expect(validateBirth({ ...ok, latitude: 91 })).toBe(false);
    expect(validateBirth({ ...ok, longitude: NaN })).toBe(false);
    expect(validateBirth({ ...ok, latitude: '38' })).toBe(false);
  });
  it('bounds text fields and rejects non-objects', () => {
    expect(validateBirth({ ...ok, name: 'x'.repeat(201) })).toBe(false);
    expect(validateBirth({ ...ok, placeLabel: 5 })).toBe(false);
    expect(validateBirth(null)).toBe(false);
    expect(validateBirth('x')).toBe(false);
  });
});
