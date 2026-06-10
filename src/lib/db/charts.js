// Local persistence for saved charts (Phase 2).
//
// Stores only the birth input data, not the computed chart: the chart is
// recomputed on load, so stored records stay valid if the calculation
// logic improves. IndexedDB via Dexie, all client-side.

import Dexie from 'dexie';

const db = new Dexie('human-design-charts');

db.version(1).stores({
  charts: '++id, name, createdAt'
});

/**
 * @typedef {Object} SavedChart
 * @property {number} [id]
 * @property {string} name
 * @property {string} createdAt ISO datetime
 * @property {Object} birth same shape the form writes to sessionStorage
 */

/** @param {string} name @param {Object} birth @returns {Promise<number>} new id */
export async function saveChart(name, birth) {
  return db.charts.add({ name, createdAt: new Date().toISOString(), birth });
}

/** @returns {Promise<SavedChart[]>} newest first */
export async function listCharts() {
  return db.charts.orderBy('createdAt').reverse().toArray();
}

/** @param {number} id @param {string} name */
export async function renameChart(id, name) {
  await db.charts.update(id, { name });
}

/** @param {number} id */
export async function deleteChart(id) {
  await db.charts.delete(id);
}

/** Serialize all saved charts to a JSON string for download. */
export async function exportCharts() {
  const charts = await db.charts.toArray();
  return JSON.stringify({ app: 'human-design-chart-app', version: 1, charts }, null, 2);
}

/**
 * Import charts from an exported JSON string. Appends as new records
 * (ignores incoming ids to avoid collisions).
 * @param {string} json
 * @returns {Promise<number>} number of charts imported
 */
export async function importCharts(json) {
  const data = JSON.parse(json);
  if (!data || !Array.isArray(data.charts)) {
    throw new Error('El archivo no tiene el formato esperado.');
  }
  let count = 0;
  for (const c of data.charts) {
    if (!c || typeof c.name !== 'string' || !c.birth) continue;
    await db.charts.add({
      name: c.name,
      createdAt: typeof c.createdAt === 'string' ? c.createdAt : new Date().toISOString(),
      birth: c.birth
    });
    count++;
  }
  return count;
}
