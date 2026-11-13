# Tasks

Estado actual del proyecto de un vistazo. Es corto a propósito: se lee entero al inicio de cada sesión.

- **Lista de trabajo viva:** [`docs/plan-mejora.md`](./docs/plan-mejora.md) (se trabaja de arriba abajo, una pieza por turno).
- **Decisiones diferidas y deuda:** [`BACKLOG.md`](./BACKLOG.md) (se consulta con `grep` cuando haga falta).
- **Histórico completo** (crónica de todas las fases y versiones, congelada a 2026-11-13): [`docs/archivo/TASKS-hasta-2026-11.md`](./docs/archivo/TASKS-hasta-2026-11.md) y [`docs/archivo/BACKLOG-hasta-2026-11.md`](./docs/archivo/BACKLOG-hasta-2026-11.md). Se consultan con `grep`, no se leen enteros.

Última actualización: 2026-11-13.

## Estado

- **En producción:** versión **1.5.7** (menú de acciones ☰ de la carta, 2026-11-12) en `https://hdchart.app/`. Tests: 75 casos en 9 ficheros (`npm test`).
- **En curso:** la **revisión global y plan de mejora (nov 2026)**. Piezas hechas el 2026-11-13 y pendientes de validación del autor: COD-1, MKT-3, HD-2a, HD-1, UX-3, UX-1, COD-9, PRO-1. Siguen el resto de piezas de `docs/plan-mejora.md`. Informes de la revisión en `docs/revision-2026-11/`.
- **Decisión reciente:** **Fase P (Play Store) aparcada** por el autor el 2026-11-13 (cuenta personal nueva = 12 testers durante 14 días, nombre legal público, actualización anual); se retoma solo si hay 12 voluntarios.

## Fases y versiones cerradas

- **Fase 0 — Infraestructura** (may 2026): repo, Cloudflare Workers con auto-deploy, manifest PWA, tema oscuro.
- **Fase 1 — Cálculo y bodygraph** (may 2026): efeméride (13 cuerpos), puertas/líneas, tipo/estrategia/autoridad/perfil/definición; autocompletado de ciudad + zona horaria; bodygraph SVG preciso (1.4 cerrada 2026-05-19, rebase de geometría 2026-05-21).
- **Fase 2 — Persistencia local** (2026-06-10): IndexedDB (Dexie), guardar/listar/renombrar/borrar, exportar/importar.
- **Fases 3-5 — Pulido visual, hora desconocida, compartir imagen** (MVP cerrado 2026-06-12); corregido en ese cierre el nodo lunar (medio → verdadero).
- **Estabilización post-MVP** (jun 2026): tests con vitest, diálogos propios, Photon, etiqueta «ciudad, país».
- **Fase 6 — Handoff a IA + información de elementos** (jun 2026; textos revisados 2026-07-02).
- **Fase 7 — Informe inicial** y su PDF (jun 2026; textos revisados 2026-07-02).
- **Fase L — Lanzamiento, versión 1.0.0** (2026-07-03): instalable, SEO, dominio `hdchart.app`, notificar fallo (Web3Forms), privacidad, «agradecer». Verificación en vivo cerrada 2026-08-10.
- **Fase M — Multilingüe (en/es)** (2026-07-21): idioma en la URL, fuente única de idiomas, contenido y chrome traducidos, test de paridad.
- **Versión 1.4.0** (2026-07-22): batería de testeo de usuario y lote de arreglos.
- **Versión 1.5.0** (2026-07-22): señales y cruz de encarnación (192 nombres validados contra la efeméride, 192 interpretaciones propias). 1.5.1 (2026-07-23): retoques y «¿Qué es el Diseño Humano?».
- **Enlace de perfil compartible legible por IA** (2026-08-08) y **versión 1.5.3** (2026-08-09): resúmenes de las 112 cruces.
- **Versión 1.5.4** (2026-08-10): etiquetas y buscador de cartas guardadas. Auditoría completa y creación de la Fase 11 el mismo día.
- **Versión 1.5.5** (2026-08-24): drawer (segundo toque, arrastrar para cerrar), etiquetas por idioma, copia de seguridad por correo, diálogos por encima de todo.
- **Versión 1.5.6** (2026-09-09): filtro de cartas guardadas (embudo, chips); panel `/stats` con rango de tiempo.
- **Versión 1.5.7** (2026-11-12): menú ☰ de acciones de la carta.
- **Revisión global** (2026-11-13): seis informes en `docs/revision-2026-11/` y plan de mejora; primeras piezas hechas (ver «En curso»).

## Pendiente de validación en dispositivo físico

- iPhone real: cookie-bóveda, restauración tras borrar datos, scroll iOS, reordenar cartas en táctil.
- Chrome Android: enlace «instalar como app».
- Lo demás sin revisar (lector de pantalla, teclado completo, modo hora desconocida en la interfaz, indexación real en Google/Bing) está en la sección «Sin revisar» de `docs/plan-mejora.md`.

## Fases futuras

Fases 8 (carta compuesta), 9 (tránsitos), 10 (guardado en línea, propuesta de descartarla), 11 (distribución y marketing) y P (Play Store, aparcada): resumen en `BACKLOG.md` § «Fases futuras».

## Punteros

- Live: <https://hdchart.app/> (también en el origen antiguo `human-design-chart-app.orangeman7557.workers.dev`).
- Repo: <https://github.com/orangeman7557/human-design-chart-app>.
- Caso de validación: carta del autor (1984-03-13, 09:30, Madrid, Manifestor), a mano o con los snapshots de `src/lib/hd/chart.test.js`.
- Autoría y uso de IA: [`README.md`](./README.md).

## Acuerdos de trabajo para el asistente

- Actualiza este fichero solo cuando el autor confirme que una tarea está hecha y validada, y refresca la fecha de «Última actualización».
- Entradas breves y factuales: el detalle va en los mensajes de commit y en los comentarios de código. La crónica de cada versión no vive aquí.
- Lee este fichero y `docs/plan-mejora.md` al inicio; `BACKLOG.md` y `docs/archivo/` solo con `grep`.
