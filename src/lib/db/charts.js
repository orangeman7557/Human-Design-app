// Local persistence for saved charts (Phase 2; sortOrder + type in 3.E).
//
// Stores only the birth input data, not the computed chart: the chart is
// recomputed on load, so stored records stay valid if the calculation
// logic improves. The chart `type` is denormalised into the record so the
// saved-charts list can show it without recomputing; missing types are
// backfilled lazily by the home page. IndexedDB via Dexie, all client-side.

import Dexie from 'dexie';

const db = new Dexie('human-design-charts');

db.version(1).stores({
  charts: '++id, name, createdAt'
});

db.version(2)
  .stores({
    charts: '++id, name, createdAt, sortOrder'
  })
  .upgrade((tx) =>
    tx
      .table('charts')
      .toCollection()
      .modify((c) => {
        c.sortOrder = c.id;
      })
  );

/**
 * @typedef {Object} SavedChart
 * @property {number} [id]
 * @property {string} name
 * @property {string} createdAt ISO datetime
 * @property {number} sortOrder list position (ascending)
 * @property {Object} birth same shape the form writes to sessionStorage
 * @property {string} [type] HD type id, e.g. 'generator'
 */

/**
 * @param {string} name
 * @param {Object} birth
 * @param {string} [type]
 * @returns {Promise<number>} new id
 */
export async function saveChart(name, birth, type) {
  return db.charts.add({
    name,
    createdAt: new Date().toISOString(),
    sortOrder: Date.now(),
    birth,
    type
  });
}

/** @returns {Promise<SavedChart[]>} in user-defined order */
export async function listCharts() {
  return db.charts.orderBy('sortOrder').toArray();
}

/** @param {number} id @param {string} name */
export async function renameChart(id, name) {
  await db.charts.update(id, { name });
}

/** Backfill the denormalised type of an existing record. */
export async function setChartType(id, type) {
  await db.charts.update(id, { type });
}

/** Persist a new list order. @param {number[]} ids in display order */
export async function reorderCharts(ids) {
  await db.transaction('rw', db.charts, async () => {
    for (let i = 0; i < ids.length; i++) {
      await db.charts.update(ids[i], { sortOrder: i });
    }
  });
}

/** @param {number} id */
export async function deleteChart(id) {
  await db.charts.delete(id);
}

/** Serialize all saved charts to a JSON string for download. */
export async function exportCharts() {
  const charts = await db.charts.orderBy('sortOrder').toArray();
  return JSON.stringify({ app: 'human-design-chart-app', version: 1, charts }, null, 2);
}

/**
 * Import charts from an exported JSON string. Appends as new records at
 * the end of the list (ignores incoming ids to avoid collisions).
 * @param {string} json
 * @returns {Promise<number>} number of charts imported
 */
export async function importCharts(json) {
  const data = JSON.parse(json);
  if (!data || !Array.isArray(data.charts)) {
    throw new Error('El archivo no tiene el formato esperado.');
  }
  let count = 0;
  const base = Date.now();
  for (const c of data.charts) {
    if (!c || typeof c.name !== 'string' || !c.birth) continue;
    await db.charts.add({
      name: c.name,
      createdAt: typeof c.createdAt === 'string' ? c.createdAt : new Date().toISOString(),
      sortOrder: base + count,
      birth: c.birth,
      type: typeof c.type === 'string' ? c.type : undefined
    });
    count++;
  }
  return count;
}
