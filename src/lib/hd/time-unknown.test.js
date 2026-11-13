// Unknown birth time (HD-1): the form's flag must reach every place that
// presents the chart as a statement — report, AI prompts, the shareable JSON.
import { describe, it, expect, vi } from 'vitest';

vi.mock('$lib/i18n/index.svelte.js', () => ({ getLocale: () => 'en', DEFAULT_LOCALE: 'en' }));

import { computeChart } from './chart.js';
import { buildReport, buildReportPrompt } from './report.js';
import { buildPrompts } from './prompts.js';
import { buildProfileJson } from './profile-json.js';

const base = {
  name: null,
  date: '1990-05-17',
  time: '12:00',
  timezone: 'Europe/Lisbon',
  latitude: 38.7167,
  longitude: -9.1333
};

describe('unknown birth time', async () => {
  const known = await computeChart(base);
  const unknown = await computeChart({ ...base, timeUnknown: true });

  it('opens Part B of the report with a birth-time section, only when unknown', () => {
    for (const lang of ['es', 'en']) {
      const ids = buildReport(unknown, lang).map((s) => s.id);
      expect(ids.indexOf('birthTime')).toBe(ids.indexOf('type') - 1);
      expect(buildReport(known, lang).some((s) => s.id === 'birthTime')).toBe(false);
    }
  });

  it('leads the report handoff with the caveat', () => {
    expect(buildReportPrompt(unknown, 'es')).toMatch(/^No conozco mi hora/);
    expect(buildReportPrompt(unknown, 'en', 'https://x/y')).toMatch(/^I don't know my birth time/);
    expect(buildReportPrompt(known, 'en')).not.toMatch(/birth time/);
  });

  it('tells the AI in chart-angle prompts, not in general ones', () => {
    const p = buildPrompts('profile', unknown.profile, unknown, 'en', 'https://x/y');
    expect(p.chart).toMatch(/birth time for this chart is unknown/);
    expect(p.chart.indexOf('unknown')).toBeLessThan(p.chart.indexOf('https://x/y'));
    expect(p.general).not.toMatch(/unknown/);
    expect(buildPrompts('profile', known.profile, known, 'en').chart).not.toMatch(/unknown/);
  });

  it('says so explicitly in the shareable JSON profile', () => {
    const j = buildProfileJson(unknown, unknown.meta.birth, 'es');
    expect(j.birth.timeUnknown).toBe(true);
    expect(j.birth.timeNote).toMatch(/desconocida/);
    expect(buildProfileJson(known, base, 'en').birth.timeUnknown).toBe(false);
  });
});
