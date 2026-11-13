import { describe, it, expect, vi } from 'vitest';

// The locale store is a runes module; these tests never need the active locale.
vi.mock('$lib/i18n/index.svelte.js', () => ({ getLocale: () => 'en' }));

import { decodeBirth, encodeBirth, hasShareParams } from './share-link.js';

const q = (s) => new URLSearchParams(s);

describe('decodeBirth', () => {
  it('round-trips a valid birth', () => {
    const birth = {
      name: 'Test',
      date: '1990-05-17',
      time: '14:20',
      latitude: 38.7167,
      longitude: -9.1333,
      placeLabel: 'Lisbon, Portugal'
    };
    const out = decodeBirth(q(encodeBirth(birth)));
    expect(out).toMatchObject({
      name: 'Test',
      date: '1990-05-17',
      time: '14:20',
      latitude: 38.7167,
      longitude: -9.1333,
      timezone: 'Europe/Lisbon'
    });
  });

  it('carries the unknown-time flag as a trailing u on d', () => {
    const birth = {
      date: '1990-05-17',
      time: '12:00',
      latitude: 38.7167,
      longitude: -9.1333,
      timeUnknown: true
    };
    const qs = encodeBirth(birth);
    expect(q(qs).get('d')).toBe('199005171200u');
    const out = decodeBirth(q(qs));
    expect(out).toMatchObject({ date: '1990-05-17', time: '12:00', timeUnknown: true });
  });

  it('leaves the flag off links without it (old links unchanged)', () => {
    const out = decodeBirth(q('d=199005171420&la=38.7167&lo=-9.1333'));
    expect(out).not.toHaveProperty('timeUnknown');
    expect(encodeBirth({ date: '1990-05-17', time: '14:20' })).toBe('d=199005171420');
    expect(decodeBirth(q('d=19900517x&la=1&lo=1'))).toBeNull();
  });

  it('still reads the legacy separate t= param', () => {
    expect(decodeBirth(q('d=19900517&t=1420&la=38.7&lo=-9.1')).time).toBe('14:20');
  });

  it.each([
    ['month 13', 'd=19901399&la=38.7&lo=-9.1'],
    ['Feb 30', 'd=19900230&la=38.7&lo=-9.1'],
    ['Feb 29 on a non-leap year', 'd=19900229&la=38.7&lo=-9.1'],
    ['year 0000', 'd=00000101&la=38.7&lo=-9.1'],
    ['hour 25', 'd=199005172500&la=38.7&lo=-9.1'],
    ['minute 61', 'd=199005171461&la=38.7&lo=-9.1'],
    ['letters in the date', 'd=1990ab17&la=38.7&lo=-9.1'],
    ['latitude out of range', 'd=19900517&la=138.7&lo=-9.1'],
    ['longitude out of range', 'd=19900517&la=38.7&lo=-190'],
    ['non-numeric coords', 'd=19900517&la=x&lo=y'],
    ['empty coords', 'd=19900517&la=&lo='],
    ['nothing at all', '']
  ])('rejects %s', (_label, query) => {
    expect(decodeBirth(q(query))).toBeNull();
  });

  it('accepts a real leap day', () => {
    expect(decodeBirth(q('d=19920229&la=38.7&lo=-9.1')).date).toBe('1992-02-29');
  });
});

describe('hasShareParams', () => {
  it('needs date and both coordinates', () => {
    expect(hasShareParams(q('d=19900517&la=1&lo=2'))).toBe(true);
    expect(hasShareParams(q('d=19900517&la=1'))).toBe(false);
  });
});
