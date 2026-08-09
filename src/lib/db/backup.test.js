// Cookie-vault wire format: a corrupted or lossy encode would silently lose
// the user's charts on restore, so the roundtrip is pinned here.
import { describe, it, expect } from 'vitest';
import { encodeCharts, decodeCharts } from './backup.js';

const birth = {
  name: 'orangeman7557',
  date: '1984-03-13',
  time: '09:30',
  timezone: 'Europe/Madrid',
  latitude: 40.4168,
  longitude: -3.7038,
  placeLabel: 'Madrid, España'
};

describe('cookie-vault encoding', () => {
  it('roundtrips the saved list, cookie-safe, order preserved, ids dropped', async () => {
    const charts = [
      { id: 7, name: 'Autor', createdAt: '2026-07-01T10:00:00.000Z', sortOrder: 3, birth, type: 'manifestor', labels: ['Familia'] },
      { id: 2, name: 'Otra carta', createdAt: '2026-07-02T10:00:00.000Z', sortOrder: 9, birth: { ...birth, date: '1984-01-30', time: '01:00' } }
    ];
    const payload = await encodeCharts(charts, ['Familia', 'Trabajo']);
    expect(payload).toMatch(/^[A-Za-z0-9._-]+$/);

    const { charts: back, labels } = await decodeCharts(payload);
    expect(back).toHaveLength(2);
    expect(back[0]).toMatchObject({ name: 'Autor', sortOrder: 0, type: 'manifestor', birth, labels: ['Familia'] });
    expect(back[0].id).toBeUndefined();
    expect(back[1].name).toBe('Otra carta');
    expect(back[1].sortOrder).toBe(1);
    expect(back[1].birth.date).toBe('1984-01-30');
    expect(back[1].labels).toEqual([]);
    expect(labels).toEqual(['Familia', 'Trabajo']);
  });

  it('drops records missing the birth fields computeChart needs', async () => {
    const payload = await encodeCharts([
      { name: 'Rota', createdAt: 'x', sortOrder: 0, birth: { date: '1984-03-13' } },
      { name: 'Buena', createdAt: 'x', sortOrder: 1, birth }
    ]);
    const { charts: back } = await decodeCharts(payload);
    expect(back.map((c) => c.name)).toEqual(['Buena']);
  });

  it('roundtrips an empty list', async () => {
    expect(await decodeCharts(await encodeCharts([]))).toEqual({ charts: [], labels: [] });
  });

  it('still decodes the legacy bare-array payload (charts only)', async () => {
    // Pre-v3 payloads were a bare charts array; decode must not choke on them.
    const legacy = [{ name: 'Vieja', createdAt: 'x', sortOrder: 0, birth }];
    const raw = new TextEncoder().encode(JSON.stringify(legacy));
    let bin = '';
    for (const b of raw) bin += String.fromCharCode(b);
    const payload = '0.' + btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const { charts: back, labels } = await decodeCharts(payload);
    expect(back.map((c) => c.name)).toEqual(['Vieja']);
    expect(labels).toEqual([]);
  });
});
