import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import { localToUtc } from './timezone.js';

// Offset (minutes, east positive) that localToUtc applied to a wall time.
const offset = (date, time, zone, lon) =>
  (Date.parse(`${date}T${time}Z`) - localToUtc(date, time, zone, lon).getTime()) / 60000;

describe('localToUtc — HD-2 pre-1970 corrections', () => {
  it('Netherlands: Amsterdam mean time and its summer time until 1937', () => {
    expect(offset('1935-01-15', '12:00', 'Europe/Amsterdam', 4.9)).toBeCloseTo(19 + 32 / 60, 5);
    expect(offset('1935-06-01', '12:00', 'Europe/Amsterdam', 4.9)).toBeCloseTo(79 + 32 / 60, 5);
    expect(offset('1935-05-14', '12:00', 'Europe/Amsterdam', 4.9)).toBeCloseTo(19 + 32 / 60, 5);
  });

  it('Netherlands: +00:20 from July 1937, German time from May 1940', () => {
    expect(offset('1938-01-15', '12:00', 'Europe/Amsterdam', 4.9)).toBe(20);
    expect(offset('1938-07-01', '12:00', 'Europe/Amsterdam', 4.9)).toBe(80);
    expect(offset('1940-05-17', '12:00', 'Europe/Amsterdam', 4.9)).toBe(120);
  });

  it('Netherlands: no summer time in 1946 (Brussels had it)', () => {
    expect(offset('1946-07-01', '12:00', 'Europe/Amsterdam', 4.9)).toBe(60);
  });

  it('Iceland: UTC-1 with summer time until April 1968', () => {
    expect(offset('1960-01-15', '12:00', 'Atlantic/Reykjavik', -21.94)).toBe(-60);
    expect(offset('1960-07-15', '12:00', 'Atlantic/Reykjavik', -21.94)).toBe(0);
    expect(offset('1968-06-01', '12:00', 'Atlantic/Reykjavik', -21.94)).toBe(0);
  });

  it('Sweden: no wartime summer time; +01:00:14 before 1900', () => {
    expect(offset('1944-07-01', '12:00', 'Europe/Stockholm', 18.07)).toBe(60);
    expect(offset('1890-07-01', '12:00', 'Europe/Stockholm', 18.07)).toBeCloseTo(60 + 14 / 60, 5);
  });

  it('Norway and Denmark: their own post-war summer time, not Berlin\'s', () => {
    expect(offset('1962-07-01', '12:00', 'Europe/Oslo', 10.75)).toBe(120);
    expect(offset('1947-05-20', '12:00', 'Europe/Oslo', 10.75)).toBe(60);
    expect(offset('1947-05-20', '12:00', 'Europe/Copenhagen', 12.57)).toBe(120);
    expect(offset('1949-07-01', '12:00', 'Europe/Copenhagen', 12.57)).toBe(60);
  });

  it('local mean time follows the birthplace longitude, not the capital', () => {
    // Barcelona 1890: 2.17° E → +00:08:41, not Madrid's -00:14:44.
    expect(offset('1890-06-01', '12:00', 'Europe/Madrid', 2.17)).toBeCloseTo(2.17 * 4, 1);
    // From 1901 Spain is on Greenwich time everywhere: unchanged.
    expect(offset('1901-06-01', '12:00', 'Europe/Madrid', 2.17)).toBe(0);
  });

  it('modern dates and unaffected zones match Luxon exactly', () => {
    const cases = [
      ['1984-03-13', '09:30', 'Europe/Madrid', -3.7],
      ['1975-07-01', '12:00', 'Europe/Amsterdam', 4.9],
      ['1990-01-15', '08:00', 'Atlantic/Reykjavik', -21.94],
      ['1955-07-01', '12:00', 'Europe/Stockholm', 18.07],
      ['1950-06-01', '12:00', 'America/New_York', -74]
    ];
    for (const [d, t, z, lon] of cases) {
      expect(localToUtc(d, t, z, lon).getTime()).toBe(DateTime.fromISO(`${d}T${t}`, { zone: z }).toMillis());
    }
  });
});
