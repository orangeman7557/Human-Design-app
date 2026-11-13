import { describe, it, expect } from 'vitest';
import { computeChart } from './chart.js';
import { computeDayRange, summariseDay, HALF_HOURS, crossKey } from './day-range.js';

const birth = {
  date: '1990-05-17',
  timezone: 'Europe/Lisbon',
  latitude: 38.7167,
  longitude: -9.1333
};

describe('computeDayRange', async () => {
  const day = await computeDayRange(birth);

  it('computes one slot per half-hour, matching computeChart at that time', async () => {
    expect(HALF_HOURS).toHaveLength(48);
    expect(HALF_HOURS[0]).toBe('00:00');
    expect(HALF_HOURS[47]).toBe('23:30');
    expect(day.slots).toHaveLength(48);
    const c = await computeChart({ ...birth, name: null, time: '14:30' });
    const s = day.slots[29];
    expect(s.time).toBe('14:30');
    expect(s).toMatchObject({ type: c.type, authority: c.authority, profile: c.profile, definition: c.definition });
    expect(crossKey(s.cross)).toBe(crossKey(c.cross));
  });

  it('lists every value the day allows, distinct and in order of appearance', () => {
    for (const f of ['type', 'authority', 'profile', 'definition']) {
      const seq = day.slots.map((s) => s[f]);
      expect(day.values[f]).toEqual([...new Set(seq)]);
    }
    expect(day.values.cross.map(crossKey)).toEqual([...new Set(day.slots.map((s) => crossKey(s.cross)))]);
    expect(day.stable).toEqual(
      ['type', 'authority', 'profile', 'definition', 'cross'].filter((f) => day.values[f].length === 1)
    );
  });

  it('keeps only centres and channels present in every slot', () => {
    for (const s of day.slots) {
      for (const c of day.constantCenters) expect(s.definedCenters).toContain(c);
      for (const [a, b] of day.constantChannels) {
        expect(s.activeChannels.some(([x, y]) => (x === a && y === b) || (x === b && y === a))).toBe(true);
      }
    }
  });
});

describe('summariseDay', () => {
  const slot = (o) => ({
    time: '00:00', type: 'generator', authority: 'sacral', profile: '1/3', definition: 'single',
    cross: { angle: 'right', gates: [1, 2, 3, 4] }, definedCenters: ['sacral', 'root'],
    activeChannels: [[3, 60]], ...o
  });

  it('marks single-valued fields as stable and skips failed slots', () => {
    const r = summariseDay([
      slot({}),
      null,
      slot({ profile: '2/4', cross: { angle: 'right', gates: [2, 1, 4, 3] }, definedCenters: ['sacral'], activeChannels: [[60, 3]] })
    ]);
    expect(r.values.profile).toEqual(['1/3', '2/4']);
    expect(r.values.cross).toHaveLength(2);
    expect(r.stable).toEqual(['type', 'authority', 'definition']);
    expect(r.constantCenters).toEqual(['sacral']);
    expect(r.constantChannels).toEqual([[3, 60]]);
  });
});
