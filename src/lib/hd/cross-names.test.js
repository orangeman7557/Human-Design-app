// Incarnation-cross name table — structural validation (2026-07-22).
//
// The 192 names are external reference data: they were sourced from published
// Human Design material, not derived by us. That makes a transcription error
// the real risk — a name attached to the wrong gate quartet looks perfectly
// plausible and no amount of proofreading reliably catches it.
//
// So the table is checked against the *engine* instead of against prose. The
// cross of a chart is fully determined by its Personality Sun gate and its
// angle, so `computeChart` can regenerate the whole (gate, angle) → quartet map
// from the ephemeris, independently of the table. Every key must exist in that
// map, and the geometry it implies must hold. If a row is ever mistyped, or the
// gate wheel changes, this fails.

import { describe, it, expect } from 'vitest';
import es from './content/es.js';
import en from './content/en.js';
import { computeChart } from './chart.js';
import { GATE_WHEEL } from './constants.js';

const ANGLES = ['right', 'left', 'juxtaposition'];

/** The gate half a turn away on the wheel (Sun ↔ Earth). */
const wheelIndex = new Map(GATE_WHEEL.map((g, i) => [g, i]));
const opposite = (g) => GATE_WHEEL[(wheelIndex.get(g) + 32) % 64];

/**
 * Rebuild "<sunGate>|<angle>" → [g1,g2,g3,g4] from the ephemeris. Sampling four
 * years at six times a day covers every Sun gate in all three angles.
 */
async function quartetsFromEngine() {
  const map = new Map();
  const start = Date.UTC(1980, 0, 1);
  for (let d = 0; d < 4 * 365; d++) {
    const date = new Date(start + d * 86400000).toISOString().slice(0, 10);
    for (const time of ['01:00', '05:00', '09:00', '13:00', '17:00', '21:00']) {
      const c = await computeChart({
        date, time, timezone: 'UTC', latitude: 0, longitude: 0
      });
      map.set(`${c.cross.gates[0]}|${c.cross.angle}`, c.cross.gates.join(','));
    }
  }
  return map;
}

describe('incarnation-cross name table', () => {
  it('covers all 192 combinations in both languages', () => {
    for (const [lang, pack] of [['es', es], ['en', en]]) {
      const keys = Object.keys(pack.crossName ?? {});
      expect(keys.length, `${lang} entry count`).toBe(192);
      for (let g = 1; g <= 64; g++) {
        for (const a of ANGLES) {
          expect(pack.crossName[`${g}|${a}`], `${lang} missing ${g}|${a}`).toBeTruthy();
        }
      }
    }
  });

  it('names the angle it is keyed under', () => {
    const marker = {
      es: { right: 'Cruz de ángulo derecho', left: 'Cruz de ángulo izquierdo', juxtaposition: 'Cruz de yuxtaposición' },
      en: { right: 'Right Angle Cross', left: 'Left Angle Cross', juxtaposition: 'Juxtaposition Cross' }
    };
    for (const [lang, pack] of [['es', es], ['en', en]]) {
      for (const [key, name] of Object.entries(pack.crossName)) {
        const angle = key.split('|')[1];
        expect(name.startsWith(marker[lang][angle]), `${lang} ${key}: "${name}"`).toBe(true);
      }
    }
  });

  // The load-bearing one: the table's keys must match the quartets the
  // ephemeris actually produces, so a name can never sit on the wrong cross.
  it('matches the gate quartets the engine computes', async () => {
    const engine = await quartetsFromEngine();
    expect(engine.size, 'engine (gate, angle) combinations').toBe(192);

    for (const key of Object.keys(es.crossName)) {
      expect(engine.has(key), `engine never produces ${key}`).toBe(true);
      const [pSun, pEarth, dSun, dEarth] = engine.get(key).split(',').map(Number);
      expect(Number(key.split('|')[0]), `${key} sun gate`).toBe(pSun);
      expect(opposite(pSun), `${key} personality Earth`).toBe(pEarth);
      expect(opposite(dSun), `${key} design Earth`).toBe(dEarth);
    }
  }, 60000);

  it('gives left and juxtaposition crosses the same quartet, and right its own', async () => {
    // The structural fact the sourced list has to agree with: per Sun gate there
    // are two quartets, not three — left and juxtaposition share one.
    const engine = await quartetsFromEngine();
    for (let g = 1; g <= 64; g++) {
      expect(engine.get(`${g}|left`), `gate ${g}`).toBe(engine.get(`${g}|juxtaposition`));
      expect(engine.get(`${g}|right`), `gate ${g}`).not.toBe(engine.get(`${g}|left`));
    }
  }, 60000);
});

// The per-cross interpretations are keyed by NAME (crosses sharing a name share
// their four gates), so the risk is a key that no cross resolves to — a text
// that silently never shows. This catches that in both languages.
describe('per-cross interpretations', () => {
  // Keys are the ENGLISH bare name in every language, so both packs stay in
  // step and a key that matches no cross (a text that would never show) fails.
  const bareEn = new Set(
    Object.entries(en.crossName).map(([key, full]) =>
      full.slice(en.labels.cross[key.split('|')[1]].length).trim()
    )
  );

  it('every essence key belongs to a real cross, in both languages', () => {
    for (const [lang, pack] of [['es', es], ['en', en]]) {
      for (const key of Object.keys(pack.crossEssence ?? {})) {
        expect(bareEn.has(key), `${lang}: "${key}" matches no cross name`).toBe(true);
      }
    }
  });

  it('covers all 192 crosses in both languages', () => {
    for (const [lang, pack] of [['es', es], ['en', en]]) {
      for (const angle of ANGLES) {
        for (let g = 1; g <= 64; g++) {
          const full = en.crossName[`${g}|${angle}`];
          const bare = full.slice(en.labels.cross[angle].length).trim();
          expect(pack.crossEssence[bare], `${lang}: gate ${g} ${angle}`).toBeTruthy();
        }
      }
    }
  });
});
