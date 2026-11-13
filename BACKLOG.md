# Backlog

Solo lo que sigue **vivo**: decisiones diferidas abiertas, deuda conocida, mejoras aún no hechas y fases futuras. Lo cerrado, las bitácoras por fase y el razonamiento histórico viven congelados (a 2026-11-13) en [`docs/archivo/BACKLOG-hasta-2026-11.md`](./docs/archivo/BACKLOG-hasta-2026-11.md); se consulta con `grep`, no se lee entero. La lista de trabajo en curso es [`docs/plan-mejora.md`](./docs/plan-mejora.md).

Los punteros «Histórico: …» indican fichero `docs/archivo/BACKLOG-hasta-2026-11.md` + título de sección.

## Fases futuras

- **Fase 8 — Carta compuesta.** Overlay visual de dos cartas guardadas; después, dinámicas de pareja (canales electromagnéticos, dominancia, compromiso, compañía). Versión mínima en el plan de mejora (bloque 3). Histórico: «Features already identified for future phases».
- **Fase 9 — Tránsitos.** Vista de tránsitos sobre una carta guardada. La versión barata es la **«Puerta del día»** (puerta y línea del Sol de hoy con la esencia y el drawer que ya existen; una llamada más a la efeméride): el único motivo recurrente para reabrir la app. Histórico: «Functional gap analysis 2026-07-06», ítem 5.
- **Fase 10 — Guardado en línea.** Sincronización opcional en la nube (local-only sigue siendo el default). El plan de mejora propone **descartarla** (cuentas, RGPD, mantenimiento); a falta de confirmación del autor. Histórico: «Features already identified for future phases».
- **Fase 11 — Distribución y marketing.** Plan completo más abajo (sección conservada íntegra).
- **Fase P — Play Store (TWA): APARCADA por decisión del autor, 2026-11-13.** Una cuenta personal nueva exige 12 testers durante 14 días seguidos, publica el nombre legal y obliga a actualizar cada año; se retoma solo si hay 12 voluntarios. Si se retoma: `assetlinks.json` (no existe), capturas en el manifest (ver Fase 11, nivel 4), `start_url` sin redirección (COD-10), target API vigente de Play. Apple App Store sigue aparcada (99 €/año). Histórico: «Post-1.0 packaging — Google Play (TWA) then Apple».

## Pendiente de validación en dispositivo físico

- **Enlace «instalar como app» ausente en Chrome Android (betatester).** Aparece en Chrome de Mac y no en el móvil; solo se muestra si `install.mode` está definido (`beforeinstallprompt`). No reproducible en local: hace falta el build desplegado + Android real. Histórico: «Known bugs & pre-MVP tasks».
- **iPhone real:** cookie Secure de la bóveda en `hdchart.app`, marcador visible, restauración tras borrar datos del sitio (conservando cookies) y flujo del aviso de staging. Histórico: «iOS storage eviction».
- **Reordenar cartas guardadas en táctil:** el autor lo confirma en Android 16/Brave; el hueco histórico sería iOS Safari (sin HTML5 DnD). Verificar en iOS antes de tratarlo como bug. Histórico: «Audit 2026-06-15», «Contested / needs reproduction».
- **Compartir copia por correo en macOS:** la hoja de compartir de Chrome no ofrece Mail para el `.txt` (el SO decide; `.json` no es compartible en Chromium). Aceptado; en escritorio el botón cae a descarga. Funciona en Android.

## Decisiones diferidas abiertas

- **Medir el coste de cómputo del enlace de perfil compartible (añadido 2026-08-08).** El Worker calcula la carta en el edge para **cada** vista de un enlace compartido (el JSON va embebido para todos). Pendiente tras el primer despliegue: CPU de un render (`computeChart` = dos pasadas de efeméride) frente al presupuesto por invocación de Cloudflare (~10 ms en plan gratis), y a partir de qué volumen haría falta plan de pago, caché de HTML por URL o ruta de cómputo aislada. El peso del bundle (~500 kB) no preocupa. Histórico: «Shareable profile as JSON — measure the edge-compute cost».
- **Precisión astronómica (variables color/tono/base).** `astronomy-engine` (±1 arcmin) basta para puertas y líneas; no para color (~9′), tono (~1,9′) ni base (~22″). Solo se revisa si las variables entran en alcance; opciones: otro wrapper de Swiss Ephemeris compatible con Vite, forkear `swisseph-wasm`, o cómputo en un Worker aparte. Histórico: «Astronomical precision (HD variables: color, tone, base)».
- **Precisión de la hora desconocida / zonas históricas:** ver `docs/plan-mejora.md` (HD-1, HD-2, HD-3, HD-4, HD-6).

## Deuda conocida

- Algunos ficheros viejos conservan comentarios en español (fases 0/1.1); se traducen al tocarlos.
- El geocoder usa la instancia pública de **Photon**; válido con poco tráfico. Plan B si cae o crece: PRO-5 del plan de mejora (entrada manual o segundo proveedor / mirror propio).
- Ficheros muy grandes (carta ~2.800 líneas, home ~2.300): trocear de forma oportunista (COD-4 del plan).
- Higiene de repo, sin verificar (comprobar antes de actuar): `bodygraph-geometry.js.bak` y `docs/bodygraph-reference-coordinates-backup.txt` versionados; `.wrangler/state/*.sqlite` versionado y `.wrangler/` fuera de `.gitignore`. Histórico: «Audit 2026-06-15», «To evaluate — repo hygiene».
- Limpieza de código sin verificar: `await` sobre funciones síncronas en `chart.js`; parámetro `activeChannels` sin uso en `computeAuthority`; JSDoc colgante de `Bodygraph.svelte` (falta un `@typedef Chart`); duplicación `TYPE_LABELS`/`TYPES`/`TYPE_ABBR` entre home y carta; comentario obsoleto en `+layout.js` («adapter-static»). Histórico: «To evaluate — clean code».
- Accesibilidad sin teclado: canales, puertas colgantes y «Definición» son `span`/`div` con click/hover y sin camino de teclado; el autocompletado de lugar no es un combobox ARIA. Histórico: «To evaluate — UX / accessibility».
- Rendimiento sin medir: peso del bundle de producción y carga diferida de `html-to-image`, `astronomy-engine`, `luxon`, `tz-lookup`; la banda de hora desconocida calcula 48 cartas en el hilo principal. Histórico: «Performance».
- Lo revisado y aceptado a propósito está en «QA review before 1.4» (más abajo).

## Mejoras posibles (sin programar)

Todas con su texto completo en el histórico, sección «Possible improvements (not scheduled, not part of Phase 5)», localizables por su título en negrita.

- **Cruces: nombrar el cuarto del mandala** (Iniciación / Civilización / Dualidad / Mutación) en cada descripción, enlazando a un drawer explicativo de los cuatro cuartos. (El drawer general ya lleva el índice por cuartos desde 1.5.0; confirmar qué falta.)
- **Informe inicial: scroll-spy del índice** (resaltar la chip de la sección visible; `nav.toc` en `InitialReport.svelte`).
- **«Guía práctica de esta persona»:** segundo informe sin jerga HD (tendencias, fortalezas, puntos ciegos, comunicación, necesidades…).
- **Incluir en los prompts un enlace a la carta con datos legibles por máquina.** Probablemente cubierto por el enlace compartible de la 1.5.3; confirmar y, si es así, darlo por cerrado.
- **Icono del bicho** (solo icono, discreto, abajo a la derecha) al pie de cada texto explicativo para notificar fallos de texto.
- **PDF del informe sobre fondo blanco** en vez de tema oscuro (depende de recapturar la portada).
- **Bodygraph clicable: las puertas** (los centros ya abren su drawer desde 2026-07-06).
- **Textos por puerta.línea** (64×6 = 384 notas breves; enlaza con HD-L del plan).
- **Etiquetas de centros sobre el bodygraph** (nombre sobre la forma o conector desde la chip); cuidado con el desorden.
- **Mensajes de error del lugar de nacimiento:** colocación diferida hasta decidir el diseño (el mensaje de red es demasiado largo para ir junto a la etiqueta).
- **Peso/influencia estimada por activación planetaria** (el Sol pesa más); investigar primero los porcentajes habituales.
- **Social/descubrimiento:** `CONTRIBUTING.md` + CLA (la licencia ya lo exige); imagen OG por carta (ver Fase 11, nivel 5). Histórico: «Audit 2026-06-15», «To evaluate — distribution / docs».
- **Nota/etiqueta por carta guardada:** resuelta con las etiquetas (1.5.4); no queda nada.

Conscientemente **no** se añade (validado contra el alcance): variables/PHS, Dream Rave, Gene Keys, Penta, retornos, cuentas con nube como requisito, contenido de consejos diarios/afirmaciones.

## Fase 11 — Distribución y marketing (creada 2026-08-10)

Fase nueva, pedida por el autor: hasta ahora todo el esfuerzo ha ido a
construir la app y **nada** a darla a conocer. Lo que sigue es el resultado de
una revisión del estado real (2026-08-10) más búsqueda del panorama
competitivo, ordenado en cinco niveles por coste creciente.

**El diagnóstico que ordena todo lo demás.** La app **tiene 4 URLs
indexables** (`/en`, `/es`, `/en/privacy`, `/es/privacy`). Dentro de
`lib/hd/content/{es,en}.js` hay una enciclopedia de Diseño Humano **ya
escrita, original y legalmente limpia**: 64 puertas, 36 canales, 9 centros,
5 tipos, 7 autoridades, 12 líneas de perfil y 112 textos de cruces que cubren
las 192 — en dos idiomas. Del orden de **400-600 páginas de contenido único
que Google no ve**. Los competidores que ocupan la primera página de Google
(`humandesignhd.com`, `bodygraph.io`, `freehumandesignchart.com`) rankean
exactamente con ese patrón: calculadora gratis + muchas páginas de
referencia. Tenemos el contenido y no lo publicamos.

### Nivel 0 — Instrumentación (horas, gratis, va primero)

- ⬜ **Google Search Console + Bing Webmaster Tools.** Verificar el dominio y
  enviar `sitemap.xml`. La analítica propia (2026-08) mide **uso**; no hay
  **nada** que mida **adquisición** — ni qué se busca para llegar, ni si se
  llega. Sin esto, todos los niveles siguientes se hacen a ciegas y no se
  puede saber si funcionan. Requiere una acción del autor (verificar el
  dominio); el sitemap ya existe y es válido.

### Nivel 1 — Páginas de referencia prerenderizadas (el multiplicador)

- ⬜ **Publicar la enciclopedia como páginas propias**, prerenderizadas por
  idioma con su `hreflang`: `/es/puertas/41`, `/es/canales/34-57`,
  `/es/centros/garganta`, `/es/tipos/manifestador`, `/es/cruces/…`.
  **Aviso que condiciona el diseño (búsqueda 2026):** Google castiga el
  contenido fino; el listón práctico está en **≥500 palabras y 30-40% de
  diferenciación** por página. Así que **no vale volcar la esencia sola** —
  una página de puerta debe componer esencia + hexagrama + su centro + sus
  canales + las 6 líneas + enlaces cruzados, que pasa el listón de sobra.
  Es la cola larga real («puerta 41 diseño humano», «canal 34-57», «cruz de
  encarnación del edén»): lo que busca quien ya tiene su carta calculada en
  otro sitio. Cada página cierra con CTA a la calculadora — ese es el embudo.
  **Dependencia:** conviene resolver antes el peso de la home (ver los
  hallazgos de auditoría), porque estas páginas heredarían el mismo lastre.

### Nivel 2 — Lanzamiento puntual (picos, no tráfico sostenido)

- ⬜ Product Hunt, Show HN, Indie Hackers, r/SideProject, directorios de PWA,
  AlternativeTo. **Expectativa honesta:** pico de 48 h y decaimiento. El valor
  real son los **backlinks** —que son lo que hace despegar al Nivel 1— y los
  primeros usuarios, no el tráfico sostenido. Conviene hacerlo *después* del
  Nivel 1, para que los enlaces apunten a un sitio con contenido.

### Nivel 3 — Comunidad de Diseño Humano (donde está el público)

- ⬜ Discord *Human Design Direct* (~46.000 miembros), otros servidores de los
  directorios (DISBOARD, Discords.com), Reddit, grupos de Facebook, boletines
  de Substack de HD. **Aviso: estas comunidades detestan la autopromoción.**
  La vía de entrada no es «mirad mi app» sino los dos ángulos que **nadie más
  tiene**: (a) gratis, **sin registro y sin email**, y sobre todo (b) el
  **enlace de carta que una IA puede leer** — «pega el enlace de tu carta en
  ChatGPT y pregúntale lo que quieras» es una historia contable, no un
  anuncio. El enlace compartido es además viral por construcción.

### Nivel 4 — Tiendas de aplicaciones

- ⬜ Es la **Fase P** ya decidida (TWA → Google Play). **Bloqueada por** la
  falta de `screenshots` en el manifest: sin ellas ni Chrome muestra el diálogo
  de instalación enriquecido ni la ficha de Play queda presentable. Apple sigue
  aparcada a propósito (99 €/año).
- ⬜ **Capturas para el manifest — necesita assets del autor (2026-08-10).**
  Es lo único de la auditoría que **no** se pudo cerrar en la sesión de
  arreglos: son imágenes, y elegirlas es una decisión de diseño (qué carta se
  enseña, qué pantalla vende mejor la app), no algo que deba autogenerarse.
  Especificación exacta para cuando se hagan:
  - **Al menos una `form_factor: "wide"`** (escritorio, p. ej. 1280×800) y
    **al menos una estrecha** (móvil, p. ej. 390×844). Chrome exige las dos
    para el diálogo de instalación enriquecido.
  - PNG, `sizes` **debe coincidir exactamente** con los píxeles reales del
    fichero o Chrome descarta la entrada en silencio.
  - Candidatas obvias: la carta con el bodygraph (la imagen que vende), el
    informe inicial abierto, y la home con el formulario.
  - Van en `static/`, se declaran en `static/manifest.webmanifest` bajo
    `screenshots` (con `label` por captura) y **hay que añadirlas a la lista de
    precache** del service worker si se quieren offline.
  - Las mismas sirven para la ficha de Play Store, que pide además un
    *feature graphic* de 1024×500.

### Nivel 5 — El producto como motor de distribución

- ⬜ **Imagen OG por carta.** Hoy cada carta compartida enseña **la misma**
  `og-image.png` genérica. Renderizar el bodygraph en el edge convertiría cada
  enlace compartido en un anuncio visual distinto — de lejos lo de mayor
  retorno del catálogo en clave de difusión. Ya estaba anotado como diferido
  en § "To evaluate — distribution / docs"; aquí se registra su valor de
  marketing, que es lo que justifica el coste.
- ⬜ **«Puerta del día»** (ya en § "Functional gap analysis", ítem 5): es el
  único motivo recurrente para reabrir la app, y la retención es lo que hace
  que el tráfico ganado en los niveles anteriores no se evapore.

### Cómo se mide

Definir el éxito **antes** de empezar, o no se sabrá qué nivel funcionó: URLs
indexadas y clics/impresiones por consulta (Search Console), y del lado propio
los contadores que ya existen (`open`, `device`, `chart`, `install`) más la
ratio cartas/dispositivo, que ya se calcula en el panel.

## QA review before 1.4 (2026-07-22)

A full user-testing pass over the multi-language build, run before the 1.4
bump. What got fixed is in the commits and in `TASKS.md`; this records what was
**deliberately not** fixed, so it isn't rediscovered as if it were new.

### Deferred by the author — revisit later

- **Channel names to double-check against a reference.** `10-57` is called
  *"canal de la supervivencia"* / *"the channel of survival"*, but the canonical
  HD name is *Perfected Form*; "survival" is normally the keynote of gate 57 /
  the Spleen. `7-31` is *"canal del liderazgo"* where the canonical name is
  *The Alpha*. Both may be a deliberate plain-language choice — the project
  writes its own copy — but they should be confirmed once against a reference
  tool. Left as-is for now (author, 2026-07-22).
- **The report addresses a masculine reader in Spanish.** `es.js` uses
  "diseñado", "experto", "llamado", "por ti mismo", and `report.js` builds
  "Tú eres un {tipo}". Neutral phrasing would be ideal, but Spanish defaults to
  the masculine and the alternatives (–x, –e, doubling) all cost readability.
  Left as-is deliberately (author, 2026-07-22); worth revisiting if the app
  grows an audience that asks for it. English is already neutral.

### Reviewed and consciously accepted (no action)

- **Straight quotes (`"…"`) mixed with typographic dashes** across the content
  packs. Consistent enough in practice; converting them all is churn.
- **Saving an already-saved chart creates a duplicate.** Opening a chart from
  the saved list and pressing "save" adds a second identical row — the header
  never shows "saved ✓" for a chart that came *from* storage. Accepted for now.
- **Personal data travels in the share-link query string** (name, date, time,
  coordinates). That is the design — the recipient recomputes locally, there is
  no backend — but URLs get logged by edges, messaging previews and browser
  history. Not mentioned in `/privacy`. Accepted 2026-07-22.
- **`decodeBirth` falls back to `00:00`** when a share link has no `t` param,
  silently producing a *different* chart rather than refusing. Edge case; the
  app never generates such a link itself.
- **Native validation bubbles** (empty date/time on submit) appear in the
  browser's language, not the app's, and the custom error never gets a chance
  to show. Low impact.
- **The unknown-time slider maxes at 23:30 while its axis is labelled `24h`**,
  and it has no `aria-valuetext` (a screen reader announces "0", not "00:00").

### Latent, worth a fix if it ever bites

- ✅ **`toBlob()` timeout — DONE 2026-07-22.** A 30 s `Promise.race` in
  `captureBlob` turns the silent hang into the existing `shareError` path
  (`chart.errImageTimeout`), so the buttons recover instead of staying dead
  until a reload. Original entry below.
- **`toBlob()` (html-to-image) has no timeout and no recovery.** PNG and PDF
  export were confirmed working on real browsers (author, 2026-07-22), but in
  an embedded Chromium the call hung forever: it never resolves and never
  rejects, so `sharing` stays `true`, the button stays disabled and the only
  way out is a reload. A timeout that rejects into the existing `shareError`
  path would make the failure visible instead of silent.
