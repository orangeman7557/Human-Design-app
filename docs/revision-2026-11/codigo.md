# Revisión de código y salud técnica (v1.5.7)

## 1. Nota: 7/10
Base sólida y poco frecuente en un proyecto personal: núcleo de cálculo testeado, endpoints pequeños y defensivos, cabeceras de seguridad ya auditadas y privacidad coherente con lo que el código hace. Los puntos débiles son (a) un 500 evitable en el Worker al abrir un enlace compartido con fecha inválida, (b) ficheros-monstruo en la UI sin red de tests, (c) importar/respaldo con validación superficial y fallos silenciosos, y (d) ausencia total de monitorización de errores.

## 2. Fortalezas
- `npm test`: 5 ficheros, 40 tests, todos verdes (12 s). Cálculo validado con cartas reales y paridad de catálogos i18n.
- `npm run build` correcto con adaptador Cloudflare; JS cliente total ≈ 2 MB sin comprimir. Los packs ES y EN se importan estáticamente pero jsPDF y el pack de contenido de la home van con `import()` diferido.
- `{@html}` solo con `renderInline`/`md`, que escapan `& < >` antes de insertar marcas (`src/lib/markup.js`); `esc()` del Worker escapa también comillas. No he visto vector XSS con nombres de carta, enlaces o ficheros importados.
- Endpoints `/api/*` acotados: `/api/love` limita `n` a 50 por POST; `/api/stat` usa lista blanca de claves, tope de 30 por campo y comprobación de Origin; `/api/backup` valida regex y tamaño, cookies HttpOnly + SameSite=Strict + Secure y ruta acotada.
- Service worker correcto en lo esencial: precache versionado, `_headers` excluido del precache (`svelte.config.js` filtra `_*`, lo que evita que `addAll` falle), navegación network-first con fallback por idioma, no intercepta Photon.
- Importación (`importCharts`) ya deduplica, rechaza registros sin fecha/hora/zona y reescribe etiquetas dentro de una transacción (`syncDefaultLabels`).

## 3. Hallazgos

**COD-1 — Enlace compartido con fecha inválida devuelve 500 en el Worker**
- Qué: `chartProfile` llama a `computeChart(birth)` sin try/catch; `decodeBirth` solo valida con regex `\d{8}`, no que la fecha exista, y `computeChart` lanza si Luxon la considera inválida.
- Evidencia: `src/hooks.server.js:108-113` y `:249` (sin try/catch); `src/lib/hd/chart.js:64-68` (throw); `src/lib/hd/share-link.js:75-78` (solo regex). Ej.: `/es/chart?d=20261399&la=40&lo=-3` → excepción no capturada (no ejecutado: deducido del código).
- Impacto: medio. Cualquier enlace mal copiado/editado, o un bot, ve una página de error en vez de la app; además es el URL que la gente comparte. Efecto secundario: cada visita a un enlace válido ejecuta el cálculo completo en el edge sin caché del HTML.
- Esfuerzo: S. Propuesta: envolver `chartProfile` en try/catch devolviendo `null` (la página cliente ya muestra su error), validar mes/día en `decodeBirth`, y añadir un test de `decodeBirth` con entradas basura. Confianza: alta.

**COD-2 — Importar y restaurar copias valida solo 3 campos; el resto del `birth` entra sin comprobar**
- Qué: `validBirth` solo exige `date/time/timezone` como string. `latitude`, `longitude`, formato de fecha, tamaño del fichero y número de cartas no se validan; el objeto `birth` se guarda tal cual. Una copia editada/corrupta puede dejar cartas que fallan al abrirse (`computeChart` lanza) y que además se replican a la cookie-bóveda.
- Evidencia: `src/lib/db/charts.js:445-448, 466-474`; `src/lib/db/backup.js` (`validBirth` idéntico).
- Impacto: bajo-medio, afecta a quien importe ficheros de otros o editados a mano. Esfuerzo: S. Propuesta: validar con una función única compartida (regex fecha/hora, `DateTime.fromISO(...).isValid`, números finitos) y límite razonable de cartas/bytes; test de importación con basura. Confianza: alta.

**COD-3 — La bóveda-cookie falla en silencio al superar ~11 KB y no reintenta**
- Qué: el payload máximo es 3×3800 bytes; el servidor responde 413 y `runBackupSync` ignora la respuesta (ni `res.ok` ni aviso). Un usuario con muchas cartas/etiquetas largas deja de tener copia sin enterarse; el marcador antiguo sigue indicando que existe.
- Evidencia: `src/routes/api/backup/+server.js:21-22,34`; `src/lib/db/charts.js:137-142` (el `fetch` no comprueba estado, `catch` vacío).
- Impacto: medio a largo plazo (pérdida de datos tras purga ITP en iOS), hoy bajo con ~7 usuarios. Esfuerzo: S. Propuesta: comprobar `res.ok`, y si es 413 mostrar un aviso "copia llena, exporta un fichero"; test de `encodeCharts` con 100+ cartas para conocer el techo real (no verificado: estimo ~100 cartas). Confianza: media.

**COD-4 — Ficheros gigantes sin tests: página de la carta (2785 líneas) y home (2296)**
- Qué: `chart/+page.svelte` (2785), `+page.svelte` home (2296), `ElementInfo.svelte` (1421), `InitialReport.svelte` (866), `stats/+page.svelte` (753) mezclan estado, persistencia, compartir, PDF/PNG, drawers y estilos. Es la mayor deuda de mantenibilidad y el sitio donde un asistente de IA en frío rompe cosas sin que ningún test avise.
- Evidencia: `find src -name '*.svelte' | xargs wc -l`.
- Impacto: medio (mantenimiento). Esfuerzo: L si se refactoriza entera; S-M si se hace solo cuando se toque. Propuesta: extraer a módulos `.svelte.js` la lógica sin UI (compartir/exportar imagen, gestión de lista guardada, filtros) y dejar los `.svelte` en presentación; empezar por lo que más cambia (lista de cartas guardadas). Confianza: alta.

**COD-5 — Sin monitorización de errores ni telemetría de fallos**
- Qué: no hay Sentry/log propio; los `catch {}` vacíos (p. ej. restauración de bóveda, sincronización, SW) hacen que fallos reales sean invisibles. El único canal es "notificar un fallo" manual.
- Evidencia: `src/lib/db/charts.js:108-110,142-144`; `src/lib/analytics.js` solo cuenta eventos aprobados (no errores). `/api/stat` tiene lista blanca cerrada.
- Impacto: medio (te enteras tarde de roturas). Esfuerzo: S. Propuesta sin gasto: añadir un contador `err` (y `err.restore`, `err.compute`) a la lista blanca de `/api/stat`, alimentado desde un `window.onerror`/`unhandledrejection` sin texto ni datos personales; ya cuadra con la política de privacidad. Confianza: alta.

**COD-6 — Sin CSP; `/api/stats` y `/stats` protegidos solo por nombre de host**
- Qué: hay cabeceras de seguridad pero no `Content-Security-Policy`. Como mitigación existen escapes consistentes, así que el riesgo real es bajo. Aparte, el panel de estadísticas depende de `isStagingHost` (regex sobre `hostname`) y staging comparte el KV de producción: si staging se hiciera público o alguien creara un host con ese patrón, vería datos agregados (sin PII).
- Evidencia: `src/hooks.server.js:150-165` (set de cabeceras sin CSP), `src/routes/api/stats/+server.js:11-13`, `wrangler.jsonc:26-28,51-54`.
- Impacto: bajo. Esfuerzo: S-M (CSP necesita probar los scripts inline de SvelteKit y el de la fila fallback). Propuesta: CSP en modo `report-only` primero, o aceptarlo documentado; proteger staging con Cloudflare Access (gratis hasta 50 usuarios). Confianza: media.

**COD-7 — Abuso del contador `/api/love` y del cálculo en el edge**
- Qué: `/api/love` no comprueba Origin ni limita frecuencia; 50 por POST × peticiones ilimitadas infla el contador y consume escrituras KV (límite gratuito 1000/día, compartido con `/api/stat`). El mismo límite sirve a `/api/stat`, así que un script puede agotar la cuota diaria del plan gratuito y degradar el contador (los endpoints fallan con error 500 de KV, no controlado).
- Evidencia: `src/routes/api/love/+server.js:46-62` (sin Origin, sin try/catch en `kv.put`); `api/stat/+server.js` (sí comprueba Origin pero Origin es falsificable fuera del navegador).
- Impacto: bajo (es un contador de cariño; el daño es cosmético). Esfuerzo: S. Propuesta: copiar el chequeo de Origin, envolver `kv.put` en try/catch y, si importa, una regla gratuita de Cloudflare WAF por ruta. Confianza: alta.

**COD-8 — Flujo de actualización del SW: pestañas abiertas pueden romperse tras un despliegue**
- Qué: `skipWaiting()` + `clients.claim()` + borrado de cachés viejas en `activate`. Una pestaña abierta con la versión anterior que luego pida un chunk diferido (jsPDF, pack de contenido) tras un deploy puede encontrar 404 porque el hash viejo ya no está ni en caché ni en servidor. No hay aviso "hay versión nueva".
- Evidencia: `src/service-worker.js:30-51`; imports diferidos en `report-pdf.js`/`chart/+page.svelte:746`. Escenario deducido del código, no reproducido.
- Impacto: bajo (se arregla recargando). Esfuerzo: S. Propuesta: escuchar `controllerchange` y recargar en un momento seguro, o capturar el error de import dinámico y mostrar "recarga para actualizar". Confianza: media.

**COD-9 — Documentación que ya es un coste para una IA que llega en frío**
- Qué: TASKS.md 1206 líneas, BACKLOG.md 1979 líneas y CLAUDE.md 272 líneas con párrafos densos y largas bitácoras por versión. CLAUDE.md pide leer TASKS y BACKLOG al inicio de cada sesión: eso consume decenas de miles de tokens antes de empezar y diluye las reglas críticas. Además, CLAUDE.md está desactualizado en cosas comprobables (no menciona `/api/stat`, `/api/stats`, `/stats`, `lib/analytics.js`, que sí existen; el árbol de `api/` dice "/api/backup, /api/love").
- Evidencia: `wc -l TASKS.md BACKLOG.md CLAUDE.md`; `ls src/routes/api`.
- Impacto: medio (productividad/coste). Esfuerzo: S-M. Propuesta: partir TASKS/BACKLOG en "vigente" (≤150 líneas) y `docs/archivo/` histórico, cambiar la regla a "lee solo la sección vigente", y mover las narrativas de versiones de CLAUDE.md §6 a TASKS. Confianza: alta.

**COD-10 — Sin manifest/enlaces listos para TWA y `start_url` redirige**
- Qué: falta `static/.well-known/assetlinks.json` (no existe `static/.well-known`), requisito para que la TWA sin barra de URL funcione. `start_url: "/"` pasa por el redirect 307 del Worker (funciona, pero añade salto y depende de cookie/Accept-Language). El manifest no declara `screenshots`, y `lang` fijo "en".
- Evidencia: `ls static` (sin `.well-known`); `static/manifest.webmanifest`; `src/hooks.server.js:222-224`.
- Impacto: medio al llegar a la Fase P. Esfuerzo: S. Propuesta: tras generar la clave de firma con Bubblewrap/PWABuilder, publicar `assetlinks.json` con la huella SHA-256; considerar `start_url: "/en"`... con la negociación de idioma perdida, o mantener "/" y probar. Confianza: media (no verifiqué requisitos actuales de Play).

**COD-11 — Dependencias: sin riesgo urgente, un aviso de `npm audit` pendiente**
- Qué: `npm audit` informa de vulnerabilidades (la salida recortada solo mostró el pie, no el recuento; no verificado qué paquetes). `npm outdated` no pudo comparar porque el worktree no tiene `node_modules` propio. Photon público sin mirror: si cae, la ciudad no se puede buscar; no hay modo de introducir lat/long manual (según lo leído en `geocoder.js`, lanza error HTTP).
- Evidencia: salida de `npm audit`/`outdated`; `src/lib/geo/geocoder.js:214`.
- Impacto: bajo-medio. Esfuerzo: S. Propuesta: ejecutar `npm audit --omit=dev` en la carpeta principal para separar lo de producción (jspdf/luxon/dexie) de herramientas de build; añadir en la UI un estado "buscador no disponible, reinténtalo" y, a medio plazo, entrada manual de coordenadas. Confianza: baja-media.

## 3b. Tests que darían más seguridad (3–5)
1. `decodeBirth`/`hasShareParams` con entradas basura (fecha inexistente, lat/lon enormes, `n` con HTML) y el handler de `/chart` ante ellas (COD-1).
2. `importCharts` + `syncDefaultLabels` con fake-indexeddb: duplicados, birth sin lat/lon, renombrado en cascada, colisión de nombres.
3. `encodeCharts`/`decodeCharts`: ida y vuelta, payload legado (array), payload truncado/corrupto y techo de 11 KB.
4. Handlers `/api/love` y `/api/stat` con KV simulado (clamp, allowlist, Origin).
5. Smoke test de `renderInline` con `<script>`, `[x](javascript:...)` (hoy el enlace es `data-link`, no `href`: solo falta fijarlo en un test).

## 4. Oportunidades
- Un solo `validateBirth()` compartido por importar, bóveda, enlace y formulario.
- Contador de errores anónimo (COD-5) reutilizando `/api/stat`.
- Cachear en el edge la respuesta JSON/HTML de enlaces compartidos (`Cache-Control` corto) para abaratar cómputo.
- Dividir `content/es.js` (275 KB) por bloques cargados bajo demanda; hoy el chunk con ambos idiomas pesa ~490 KB sin comprimir y se precachea entero.
- Alerta de `console.error` al fallar la restauración de bóveda para depurar en dispositivo real.

## 5. No revisado
- Comportamiento en iPhone/Android real (bóveda, SW, instalación), nada se ejecutó en navegador ni servidor.
- Valores de `npm audit` por paquete y `npm outdated` real (worktree sin node_modules).
- Cabeceras reales servidas por Cloudflare en producción; reglas WAF/Access de Cloudflare.
- Lógica interna de ElementInfo/InitialReport/Bodygraph, geocoder completo, `report-pdf.js`, `DateField`, y correctitud astronómica (otro frente).
- Peso gzip real del bundle y precache efectivo (solo medí tamaños sin comprimir).
