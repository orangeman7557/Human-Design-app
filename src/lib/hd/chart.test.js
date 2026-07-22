// Regression tests for the calculation core — the whole value of the app.
//
// Anchored to two externally verifiable charts:
//   - 1984-01-30 01:00 Madrid → Reflector (every centre undefined). This is
//     the chart that exposed the grave mean-vs-true lunar-node bug: with the
//     mean node the design South Node fell in gate 26, forging a 26-44 channel
//     and a false Projector. The osculating true node lands it in gate 5, so
//     the chart is correctly a Reflector.
//   - 1984-03-13 09:30 Madrid → the author's own chart (Manifestor, emotional
//     authority, profile 1/3), validated by hand against reference HD tools.
//
// HD activations are geocentric ecliptic longitudes, so the result depends
// only on date/time/timezone — latitude/longitude are not used by
// computeChart (the bodygraph has no houses). They are kept here only to
// mirror the real BirthData shape.

import { describe, it, expect } from 'vitest';
import { computeChart } from './chart.js';
import { longitudeToGate } from './gates.js';
import { GATE_WHEEL_START, GATE_SIZE, LINE_SIZE } from './constants.js';

const REFLECTOR = {
  date: '1984-01-30', time: '01:00', timezone: 'Europe/Madrid',
  latitude: 40.4168, longitude: -3.7038
};
const AUTHOR = {
  date: '1984-03-13', time: '09:30', timezone: 'Europe/Madrid',
  latitude: 40.4168, longitude: -3.7038
};

// Compact "gate.line" view of an activation map, keyed by planet, for snapshots.
const activations = (side) =>
  Object.fromEntries(Object.values(side).map((a) => [a.planet, `${a.gate}.${a.line}`]));

describe('computeChart — Reflector (1984-01-30 01:00 Europe/Madrid)', () => {
  it('derives the headline values', async () => {
    const c = await computeChart(REFLECTOR);
    expect(c.type).toBe('reflector');
    expect(c.strategy).toBe('wait-lunar-cycle');
    expect(c.authority).toBe('lunar');
    expect(c.profile).toBe('2/4');
    expect(c.definition).toBe('no-definition');
  });

  it('has no defined centres and no active channels', async () => {
    const c = await computeChart(REFLECTOR);
    expect(c.definedCenters).toEqual([]);
    expect(c.activeChannels).toEqual([]);
  });

  it('places the design South Node in gate 5, not 26 (mean-vs-true node guard)', async () => {
    // The exact failure that shipped once: the mean node put this node in
    // gate 26, forging channel 26-44 and a false Projector. Must stay gate 5.
    const c = await computeChart(REFLECTOR);
    expect(c.design.southNode.gate).toBe(5);
    expect(c.activeGates).not.toContain(26);
  });

  it('matches the full activation snapshot', async () => {
    const c = await computeChart(REFLECTOR);
    expect(activations(c.personality)).toEqual({
      sun: '19.2', earth: '33.2', northNode: '35.4', southNode: '5.4',
      moon: '58.3', mercury: '54.2', venus: '58.2', mars: '44.2',
      jupiter: '10.5', saturn: '1.3', uranus: '5.2', neptune: '10.3', pluto: '28.1'
    });
    expect(activations(c.design)).toEqual({
      sun: '44.4', earth: '24.4', northNode: '35.6', southNode: '5.6',
      moon: '28.1', mercury: '1.1', venus: '6.3', mars: '47.5',
      jupiter: '5.2', saturn: '44.1', uranus: '9.3', neptune: '11.6', pluto: '50.4'
    });
  });
});

describe('computeChart — author (1984-03-13 09:30 Europe/Madrid)', () => {
  it('derives the headline values', async () => {
    const c = await computeChart(AUTHOR);
    expect(c.type).toBe('manifestor');
    expect(c.strategy).toBe('inform-before-acting');
    expect(c.authority).toBe('emotional');
    expect(c.profile).toBe('1/3');
    expect(c.definition).toBe('split');
  });

  it('defines throat, G, spleen and solar plexus via channels 10-57 and 35-36', async () => {
    const c = await computeChart(AUTHOR);
    expect(new Set(c.definedCenters)).toEqual(new Set(['throat', 'g', 'spleen', 'solarPlexus']));
    expect(c.activeChannels).toContainEqual([10, 57]);
    expect(c.activeChannels).toContainEqual([35, 36]);
  });

  it('keeps the personality nodes on 16.5 / 9.5 (true-node validation)', async () => {
    const c = await computeChart(AUTHOR);
    expect(`${c.personality.northNode.gate}.${c.personality.northNode.line}`).toBe('16.5');
    expect(`${c.personality.southNode.gate}.${c.personality.southNode.line}`).toBe('9.5');
  });

  it('matches the full activation snapshot', async () => {
    const c = await computeChart(AUTHOR);
    expect(activations(c.personality)).toEqual({
      sun: '36.1', earth: '6.1', northNode: '16.5', southNode: '9.5',
      moon: '62.6', mercury: '36.6', venus: '30.5', mars: '14.1',
      jupiter: '38.1', saturn: '1.4', uranus: '5.3', neptune: '10.4', pluto: '50.6'
    });
    expect(activations(c.design)).toEqual({
      sun: '11.3', earth: '12.3', northNode: '35.5', southNode: '5.5',
      moon: '23.4', mercury: '38.6', venus: '44.6', mars: '57.2',
      jupiter: '11.1', saturn: '44.6', uranus: '9.5', neptune: '10.1', pluto: '50.6'
    });
  });
});

// ── Type/authority coverage (audit 2026-07-03) ─────────────────────────────
//
// The two charts above only exercise Manifestor and Reflector. These six
// anchors cover the remaining types (Generator, MG, Projector) and the
// remaining authorities (sacral, splenic, ego, self-projected, mental), so
// every branch of computeType / computeAuthority is pinned.
//
// Unlike the two charts above, these are SELF-FROZEN regression anchors: the
// expected values were generated by this same code (2026-07-03), not verified
// against an external reference tool. They guard against unintended change,
// not against a pre-existing systematic error (the ephemeris path is already
// externally validated by the snapshots above).
const COVERAGE = [
  {
    name: 'Generator / sacral (1978-01-03 04:30)',
    birth: { date: '1978-01-03', time: '04:30' },
    expected: {
      type: 'generator', strategy: 'respond', authority: 'sacral',
      profile: '4/6', definition: 'split',
      definedCenters: ['g', 'heart', 'spleen', 'sacral', 'root'],
      activeChannels: [[5, 15], [18, 58], [26, 44]]
    }
  },
  {
    name: 'Manifesting Generator / sacral (1978-01-19 04:30)',
    birth: { date: '1978-01-19', time: '04:30' },
    expected: {
      type: 'manifesting-generator', strategy: 'respond-then-inform', authority: 'sacral',
      profile: '3/5', definition: 'single',
      definedCenters: ['throat', 'g', 'heart', 'spleen', 'sacral', 'root'],
      activeChannels: [[3, 60], [18, 58], [20, 57], [25, 51], [26, 44]]
    }
  },
  {
    name: 'Projector / splenic (1978-01-27 04:30)',
    birth: { date: '1978-01-27', time: '04:30' },
    expected: {
      type: 'projector', strategy: 'wait-for-invitation', authority: 'splenic',
      profile: '6/2', definition: 'single',
      definedCenters: ['heart', 'spleen'],
      activeChannels: [[26, 44]]
    }
  },
  {
    name: 'Projector / ego (1988-01-03 10:00)',
    birth: { date: '1988-01-03', time: '10:00' },
    expected: {
      type: 'projector', strategy: 'wait-for-invitation', authority: 'ego',
      profile: '3/6', definition: 'single',
      definedCenters: ['g', 'heart'],
      activeChannels: [[25, 51]]
    }
  },
  {
    name: 'Projector / self-projected (1978-05-19 04:30)',
    birth: { date: '1978-05-19', time: '04:30' },
    expected: {
      type: 'projector', strategy: 'wait-for-invitation', authority: 'self-projected',
      profile: '4/6', definition: 'single',
      definedCenters: ['ajna', 'throat', 'g'],
      activeChannels: [[1, 8], [17, 62]]
    }
  },
  {
    name: 'Projector / mental (1979-04-11 16:30)',
    birth: { date: '1979-04-11', time: '16:30' },
    expected: {
      type: 'projector', strategy: 'wait-for-invitation', authority: 'mental',
      profile: '1/3', definition: 'single',
      definedCenters: ['head', 'ajna'],
      activeChannels: [[47, 64]]
    }
  }
];

describe('computeChart — type/authority coverage anchors', () => {
  for (const { name, birth, expected } of COVERAGE) {
    it(name, async () => {
      const c = await computeChart({
        ...birth, timezone: 'Europe/Madrid', latitude: 40.4168, longitude: -3.7038
      });
      expect(c.type).toBe(expected.type);
      expect(c.strategy).toBe(expected.strategy);
      expect(c.authority).toBe(expected.authority);
      expect(c.profile).toBe(expected.profile);
      expect(c.definition).toBe(expected.definition);
      expect(c.definedCenters).toEqual(expected.definedCenters);
      expect(c.activeChannels).toEqual(expected.activeChannels);
    });
  }
});

describe('computeChart — incarnation cross', () => {
  it('takes its four gates from the Sun/Earth activations, in notation order', async () => {
    const c = await computeChart(AUTHOR);
    expect(c.cross.gates).toEqual([
      c.personality.sun.gate,
      c.personality.earth.gate,
      c.design.sun.gate,
      c.design.earth.gate
    ]);
  });

  it('derives the angle from the profile', async () => {
    // Right angle from the two externally-validated charts (1/3 and 2/4), left
    // angle from the 6/2 coverage anchor. 4/1 — the only juxtaposition profile
    // — has no reference chart here, so it stays uncovered on purpose.
    const author = await computeChart(AUTHOR);
    expect(author.profile).toBe('1/3');
    expect(author.cross.angle).toBe('right');

    const reflector = await computeChart(REFLECTOR);
    expect(reflector.profile).toBe('2/4');
    expect(reflector.cross.angle).toBe('right');

    const left = await computeChart({
      date: '1978-01-27', time: '04:30',
      timezone: 'Europe/Madrid', latitude: 40.4168, longitude: -3.7038
    });
    expect(left.profile).toBe('6/2');
    expect(left.cross.angle).toBe('left');
  });
});

describe('longitudeToGate — wheel mapping', () => {
  it('starts the wheel at gate 41 line 1 (2° Aquarius)', () => {
    expect(longitudeToGate(GATE_WHEEL_START)).toMatchObject({ gate: 41, line: 1 });
  });

  it('advances to the next wheel gate after one gate width', () => {
    expect(longitudeToGate(GATE_WHEEL_START + GATE_SIZE)).toMatchObject({ gate: 19, line: 1 });
  });

  it('advances the line within a gate', () => {
    expect(longitudeToGate(GATE_WHEEL_START + LINE_SIZE)).toMatchObject({ gate: 41, line: 2 });
  });

  it('wraps longitudes below the wheel start (0° → gate 25 line 2)', () => {
    expect(longitudeToGate(0)).toMatchObject({ gate: 25, line: 2 });
  });
});
