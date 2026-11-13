# CLAUDE.md — Human Design Chart App

Contexto base para que el asistente de IA trabaje eficientemente en este proyecto.
Al inicio de cada sesión lee `TASKS.md` (corto) y `docs/plan-mejora.md`. `BACKLOG.md` y `docs/archivo/` (histórico congelado) solo se consultan con `grep` cuando haga falta; no se leen enteros.

**Plan de mejora en curso (desde 2026-11-13):** [`docs/plan-mejora.md`](./docs/plan-mejora.md) es la lista de trabajo priorizada que salió de la revisión global de la 1.5.7; los seis informes que la sustentan están en `docs/revision-2026-11/`. Se trabaja de arriba abajo, una pieza por turno.

---

## 1. Qué es esta app

PWA de cálculo y visualización de cartas de **Diseño Humano** (Human Design).

El usuario introduce su fecha, hora y lugar de nacimiento → la app calcula su carta completa → muestra un **bodygraph SVG** interactivo más un resumen textual con tipo, estrategia, autoridad, perfil, definición, centros definidos, puertas activas y tabla de activaciones planetarias.

**Para quién:** personas interesadas en Human Design que quieren calcular y consultar su carta sin depender de servicios externos de pago. La app está orientada al uso personal y no comercial (ver licencia).

**Problema que resuelve:** las herramientas de referencia (MyBodyGraph, iHD) son de pago o requieren cuenta. Esta app es gratuita para uso no comercial y mantiene los datos exclusivamente en el dispositivo del usuario. Es **instalable** como PWA (iconos + service worker + enlace "instalar como app", Fase L jul 2026) y funciona **offline en modo básico**: el shell y los assets se cachean y el cálculo es 100% local; solo la búsqueda de ciudades (Photon) necesita red.

**Licencia:** PolyForm Noncommercial 1.0.0 — source-available, libre para uso no comercial. El autor es el único titular de copyright. Cualquier contribución externa requiere CLA antes del merge.

---

## 2. Stack técnico

- **UI:** SvelteKit 2 con Svelte 5 (runes `$state`, `$props`, `$derived`), SPA puro (`ssr: false` en `+layout.js`), Vite 5. JavaScript sin TypeScript (JSDoc).
- **Deploy:** Cloudflare Workers vía `@sveltejs/adapter-cloudflare` + Wrangler 4. Node ≥ 22 (`.nvmrc` + `engines.node`).
- **Astronomía:** `astronomy-engine` (MIT), ±1 arcmin: suficiente para puertas y líneas. **Fechas/zonas:** `luxon` + `tz-lookup` (coords → IANA, sin API).
- **Geocodificación:** **Photon** (komoot, OpenStreetMap): typeahead por prefijo, endpoint público sin autenticación.

**URLs:** live `https://hdchart.app/` (también en el origen antiguo `human-design-chart-app.orangeman7557.workers.dev`) · repo `https://github.com/orangeman7557/human-design-chart-app`

**CI/CD:** auto-deploy en cada push a `main` via Cloudflare Workers Builds.

---

## 3. Estructura del proyecto

```
/
├── CLAUDE.md            ← este archivo
├── TASKS.md             ← estado actual de un vistazo (corto; leer siempre)
├── BACKLOG.md           ← solo lo vivo: decisiones diferidas, deuda, fases futuras (grep)
├── docs/
│   ├── plan-mejora.md       ← lista de trabajo viva (revisión global nov 2026)
│   ├── revision-2026-11/    ← los seis informes de la revisión (código, HD, UX, textos, marketing, producto)
│   ├── archivo/             ← histórico congelado de TASKS y BACKLOG hasta 2026-11 (grep)
│   ├── fase-m-multilingue.md · informe-inicial.md · referencias del bodygraph
├── package.json · svelte.config.js · vite.config.js · vitest.config.js · wrangler.jsonc
├── static/              ← manifest.webmanifest, favicon.svg + iconos PNG + og-image.png, robots.txt, sitemap.xml
└── src/
    ├── app.html · app.css ← shell HTML · tokens CSS globales (:root)
    ├── service-worker.js ← precache del shell + offline básico (Fase L)
    ├── hooks.server.js  ← Worker: negocia `/`, redirects legacy, OG por carta, <html lang>
    ├── params/
    │   └── locale.js    ← matcher de ruta: solo enrutan idiomas que existen (Fase M)
    ├── routes/
    │   ├── +layout.js   ← SPA mode por defecto (ssr: false, prerender: false)
    │   ├── +layout.svelte ← chrome global: selector de idioma, badge staging, Dialog
    │   ├── api/         ← endpoints del Worker (sin idioma): /api/backup (bóveda-cookie), /api/love (contador),
    │   │                  /api/stat (escritura de analítica propia, KV) y /api/stats (lectura; solo en hosts staging)
    │   ├── stats/       ← panel de uso (`+page.svelte`); solo responde en staging, en producción muestra «no disponible»
    │   └── [lang=locale]/   ← TODAS las páginas cuelgan del idioma (/en/…, /es/…)
    │       ├── +layout.js · +page.js ← activa el locale · la home se prerenderiza por idioma (SEO)
    │       ├── +page.svelte ← pantalla 1: formulario de nacimiento
    │       ├── privacy/     ← política de privacidad (prerenderizada, Fase L)
    │       └── chart/
    │           └── +page.js · +page.svelte ← datos de sessionStorage (SPA puro) · pantalla 2: bodygraph + resumen
    └── lib/
        ├── i18n/          ← motor multiidioma (Fase M; ver docs/fase-m-multilingue.md)
        │   ├── locales.js · index.svelte.js ← FUENTE ÚNICA de idiomas (la usa el Worker) · locale activo + t(clave, params, locale?)
        │   ├── route-t.svelte.js ← routeT(): t() atado al idioma de la RUTA (obligatorio en prerender)
        │   └── ui/es.js · ui/en.js ← textos de chrome por idioma
        ├── analytics.js      ← analítica propia sin cookies: contadores agregados, un único sendBeacon por sesión (→ /api/stat)
        ├── hd/
        │   ├── constants.js           ← GATE_WHEEL, CENTERS, CHANNELS, GATES_BY_CENTER, etc.
        │   ├── ephemeris.js           ← cálculo astronómico (Julian Day, longitudes planetarias)
        │   ├── gates.js               ← longitud eclíptica → puerta HD + línea (1-6)
        │   ├── chart.js               ← orquestador principal: birth data → objeto chart completo
        │   ├── bodygraph-geometry.js  ← coordenadas SVG: centros, formas, posiciones de las 64 puertas
        │   ├── prompts.js             ← genera los prompts para la IA del usuario (handoff, Fase 6)
        │   ├── report.js              ← ensambla el informe inicial desde el chart (Fase 7)
        │   ├── report-pdf.js          ← maqueta el informe en PDF con jsPDF (import diferido)
        │   ├── share-link.js          ← codifica/decodifica el enlace compartible (`/chart?…`, claves terse, validación)
        │   ├── profile-json.js        ← perfil calculado como JSON/texto legible por IA (lo embebe el Worker en el enlace compartido)
        │   ├── day-range.js           ← modo hora desconocida: las 48 cartas posibles del día y lo estable/variable (HD-1)
        │   └── content/               ← textos propios por idioma (es.js base; en.js = deep-merge sobre es) + accesores (index.js): conceptos, tipos, centros, 64 puertas, informe
        ├── geo/
        │   ├── geocoder.js · place.js ← Photon (typeahead, debounce, abort, dedup) · etiqueta "ciudad, país"
        │   └── timezone.js   ← timezone por coordenadas; `localToUtc` corrige además desfases anteriores a 1970 (HD-2)
        ├── db/
        │   ├── charts.js     ← persistencia local (IndexedDB vía Dexie)
        │   └── backup.js     ← formato de la bóveda-cookie (lista guardada comprimida, cookie-safe)
        ├── ai/handoff.js     ← deep-links a IAs + preferencia (sin API)
        ├── pwa/install.svelte.js ← captura beforeinstallprompt / detecta iOS ("instalar como app")
        ├── markup.js         ← renderInline: **negrita**/*cursiva*/[enlaces] → HTML (compartido)
        └── components/        ← Svelte: Bodygraph (SVG), CityAutocomplete, DateField, Dialog, ElementInfo ("i" + handoff IA),
                                  InitialReport (overlay del informe), InfoDot, About, ReportBug, StorageInfo, WhatIsHD, LangSwitch;
                                  acciones compartidas: focus-trap, scroll-lock, select-on-focus
```

**Flujo de datos:** formulario → `sessionStorage` → `computeChart()` → SVG + texto. Sin backend, todo client-side.

---

## 4. Convenciones de código

- **Sin TypeScript.** Tipos definidos con JSDoc (`@typedef`, `@param`, `@returns`).
- **Svelte 5 runes** en todos los componentes: `$state()`, `$props()`, `$derived()`. No usar la API de Svelte 4.
- **Sin CSS framework.** Estilos en bloques `<style>` por componente + variables globales en `app.css`.
- **Sin comentarios de rutina.** Solo cuando el *por qué* no es obvio. Nunca comentar el *qué*.
- **Constantes y datos de referencia** viven en `constants.js`. La lógica no importa datos fijos de otros archivos.
- **Comentarios de cabecera en archivos de geometría/cálculo** documentan las fases que los modificaron (registro de cambios arquitectónico).
- **Idioma de los comentarios:** inglés en el código. El usuario se comunica en español; la UI es multiidioma desde la Fase M (inglés y español).
- **Textos de UI (Fase M):** nada de cadenas sueltas en componentes. El chrome va en `lib/i18n/ui/<lang>.js` vía `t()`; el contenido de Diseño Humano, en `lib/hd/content/<lang>.js`. Dos reglas que se aprendieron a golpes (detalle en `docs/fase-m-multilingue.md`):
  1. **En páginas prerenderizadas** (home, privacy) el idioma se pasa **explícito** — `const tr = (k, p) => t(k, p, lang)` con `lang = $page.params.lang` — porque el prerender construye páginas en paralelo y el locale de módulo puede sangrar. En páginas/componentes de cliente basta `t()`.
  2. **Capitalización por idioma**: el español va en *sentence case* (solo la primera letra); el **inglés en Title Case** para nombres y encabezados ("Solar Plexus", "Complete Channels", "Wait for the Invitation"), no para prosa ni mensajes de error. Los nombres propios de HD van en mayúscula también dentro de frase en inglés.
  3. **Los nombres establecidos de HD se contrastan, no se traducen.** Cuando un elemento tiene un nombre estándar en la comunidad de Diseño Humano (las 192 cruces de encarnación, y lo mismo valdrá para cualquier idioma futuro), **se busca cómo lo llama esa comunidad en ese idioma y se usa eso** — no una traducción propia por buena que suene. Se descubrió a golpes: la primera pasada de las cruces tradujo *Right Angle Cross* como «Cruz Derecha» cuando el estándar español es **«Cruz de ángulo derecho»**, y *The Vessel of Love* como «de la vasija del amor» cuando se dice **«del receptáculo del amor»**. Ojo también con la capitalización: el español va en **sentence case** también aquí («Cruz de ángulo derecho de la explicación»), y solo conservan mayúscula los **nombres propios de verdad** (Edén, Maya). *Revisión 2026-08: la esfinge y el alfa pasan a minúscula (decisión del autor) — se leen como comunes, no como nombres propios.*
  4. **`labels` ≠ `promptLabels`** en el pack de contenido: `labels` son etiquetas de display (mayúscula inicial, sin artículos) y `promptLabels` está redactado para incrustarse en frases de prompt (minúsculas, "el Sol"). La UI usa `getDisplayLabels()`.
- **Voz de los textos (decisión 2026-07-03, revisada 2026-08):** el **informe inicial** (y su PDF) habla en **2ª persona** — es un documento dirigido al dueño de la carta. Los **drawers de puertas y canales** también van en **2ª persona** (revisión 2026-08): la esencia se ancla ("cuando la tienes activa…") para que siga siendo cierta con puertas/canales que la carta no tiene, y las **líneas de estado (codas) dicen "tu carta"**. El resto de drawers "i" (tipo, estrategia, autoridad, perfil, señales, cruz, conceptos), prompts y tooltips siguen siendo **impersonales** — el que mira puede estar viendo la carta guardada de otro, y ahí sí chirría leer "tú" (p. ej. la estrategia de un tipo que no es el suyo). *Observación del autor (2026-08): en puertas/canales leer en 2ª persona no molesta aunque sea la carta de otro; incluso queda bien, como curioseando lo que a esa persona le dicen.* Excepción consciente: el prompt de cierre del informe va en 1ª persona (vive dentro del marco-documento).
- **Caso de prueba de validación:** la carta del autor (orangeman7557: 1984-03-13, 09:30, Madrid — Manifestor) es la referencia para validación manual. El atajo oculto de la home que rellenaba el formulario con esos datos se eliminó en el lanzamiento 1.0.0 (2026-07-03); para probar, introducir los datos a mano o usar los tests (`npm test`).
- **Tests con vitest** (`npm test`): 75 casos en 9 ficheros. El núcleo de cálculo (`src/lib/hd/chart.test.js`) tiene dos cartas de referencia validadas externamente (Reflector + autor) con snapshot completo de activaciones, seis anclas de regresión auto-congeladas que cubren los 5 tipos y las 7 autoridades (2026-07-03), y límites de `longitudeToGate`/`cityCountry`. `src/lib/i18n/catalog.test.js` vigila la paridad de claves entre idiomas y guarda contra un *fallback* masivo. `src/lib/hd/cross-names.test.js` (1.5.0) valida los **datos de las cruces contra la efeméride** (192 cruces, nombre↔cuarteto, geometría Sol↔Tierra, `crossQuartet()`, 192 interpretaciones en ambos idiomas). Otros: `share-link.test.js` (enlaces compartidos, incluida basura), `timezone.test.js` (desfases históricos), `day-range.test.js` y `time-unknown.test.js` (modo hora desconocida), `db/backup.test.js` (bóveda-cookie) y `geo/place.test.js`. El resto se valida manualmente contra la carta conocida del autor.
- **Regla de oro del i18n (Fase M).** El locale activo es un `$state` **de módulo**, es decir compartido, y el prerender construye `/en` y `/es` **en paralelo**: cualquier cosa que pueda renderizarse durante el prerender **debe atarse al idioma de la ruta**, no leer el estado de módulo. Las páginas usan `const tr = (k, p) => t(k, p, lang)` con `lang = $page.params.lang`; los componentes usan `const t = routeT()` (`lib/i18n/route-t.svelte.js`). Ojo: **no basta con que un componente sea "de cliente"** — si su disparador se pinta dentro de una página prerenderizada (los modales del pie: `About`, `ReportBug`, `StorageInfo`), también aplica. El síntoma es cruel: se autocorrige al hidratar, así que **nunca se ve en dev, solo en el build** — y los crawlers ven la versión rota. Detalle en `docs/fase-m-multilingue.md` §3.
- **Los catálogos no son traducciones espejo.** `ui/en.js` y `content/en.js` se escriben **desde el significado**, no palabra por palabra desde el español (el pase literal produjo inglés rígido, corregido en dos pasadas). Hay bloques con un comentario que lo dice explícitamente — no re-sincronizarlos con el español. **La regla vale también para las plantillas con huecos** (`promptTemplates`, `drawer`, `reportShell`), no solo para la prosa: el orden de palabras del español puede ser correcto en inglés con un relleno corto y romperse con uno largo. Ocurrió en `ask`/`askChart` (2026-08-19), calcadas de «¿me explicas en detalle {subject}?» como `can you explain {subject} in detail?`: con un sujeto que acaba en subordinada, el "in detail" quedaba colgando veinte palabras después del verbo. **Toda plantilla nueva se prueba con el relleno más largo que admita.**
- **Nada de texto de UI congelado en `$state`.** Un `$state(t('…'))` guarda las *palabras* del idioma en que se creó el componente, y cambiar de idioma es una **navegación por cliente**: los componentes que sobreviven (los modales del pie, montados con la home) se quedan en el idioma anterior. Se descubrió a golpes con el botón «¡Mándame amor!» (ago 2026), que seguía en español sobre una página en inglés. La regla: guardar **qué** se muestra (un estado simbólico) y derivar el texto con `t()`/`routeT()`; lo mismo vale para cualquier trabajo que dependa del idioma y cuelgue de `onMount` — debe colgar del idioma de la ruta.
- **Etiquetas de cartas: las por defecto llevan clave, las del usuario no.** Las sembradas (`labels.defaults`, un objeto **keyed**, nunca una lista) guardan su clave en la fila y siguen el idioma de la app; crear o **renombrar** una la convierte en palabra del usuario (clave a `null`) y ya no se traduce nunca. Como las cartas guardan sus etiquetas **por nombre**, traducir una es un renombrado que reescribe todas las cartas que la llevan (`syncDefaultLabels` en `db/charts.js`).
- **Nunca ejecutar `npm install` dentro de un worktree.** Las sesiones de IA trabajan en worktrees bajo `.claude/worktrees/` sin `node_modules` propio: Node resuelve las dependencias subiendo hasta el `node_modules` del checkout principal, y `vite.config.js` permite servirlas desde ahí. Si una tarea añade una dependencia nueva, instalarla en la carpeta principal del proyecto (`npm install <paquete>` en `/Users/i7up/Documents/Claude/Projects/human-design-app`).

---

## 5. Diseño visual

- **Tokens CSS** (`app.css`): `--bg #0b0b0d`, `--surface #161618`, `--surface-2 #1e1e22`, `--border #2a2a2e`, `--text #e8e8ea`, `--text-muted #a0a0a8`, `--accent #d4a657` (oro ámbar: CTA, chips activos, enlaces), `--accent-soft #d4a65720`, `--danger #e06262`, `--success #6ec48a` (sin uso activo).
- **Bodygraph SVG:** Personality `#ffffff`; Design `#e84672`; Both = rayas blancas sobre `#e84672` (`stroke-dasharray`); esqueleto inactivo `#606070`; marcador de puerta activa `#4a2060`; texto de puertas inactivas `#4a2060` en centro definido / `#aaaab4` en indefinido; centros indefinidos fill `#181823`, stroke `#46465a`; centros definidos sin borde separado, con el color de su fill. Colores de centros definidos: Head/G amarillo `#e5cf3d`, Ajna verde `#6cb46c`, Throat/Spleen/SP ámbar `#b87a35`, Heart/Sacral rojo `#c83838`, Root marrón `#5e3e1d`.
- **Tipografía:** `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`, sin fuente externa. Labels en uppercase con `letter-spacing: 0.06em` y `0.72rem`. Base `1rem`, peso 500 en títulos y CTAs. `-webkit-font-smoothing: antialiased`.
- **Principios:** dark theme profundo con acento ámbar (místico sin ser recargado); minimalista, tono Vercel/Linear; `border-radius: 10px` uniforme en controles; el bodygraph apunta al estilo Rave clásico (referencia del International Human Design School); `max-width` 460px en formulario y 720px en carta.

---

## 6. Estado actual del proyecto

Versión en producción: **1.5.7** (2026-11-12). La crónica completa de cada fase y versión está en `docs/archivo/TASKS-hasta-2026-11.md` (grep).

### Completado
- **Fases 0-2 (may-jun 2026):** infraestructura (Cloudflare Workers, PWA), cálculo astronómico validado, autocompletado de ciudad + zona horaria (Photon), bodygraph SVG preciso y persistencia local (Dexie).
- **Fases 3-5 (MVP, 2026-06-12):** pulido visual, modo hora desconocida, compartir imagen PNG; corregido el nodo lunar (medio → verdadero).
- **Fase 6 — Handoff a IA + info de elementos** y **Fase 7 — Informe inicial** (+ PDF): construidas jun 2026, textos revisados 2026-07-02.
- **Fase L — Lanzamiento 1.0.0 (2026-07-03):** instalable, SEO, dominio `hdchart.app`, notificar fallo, privacidad, «agradecer». Verificación en vivo cerrada 2026-08-10.
- **Fase M — Multilingüe en/es (2026-07-21):** idioma en la URL, fuente única de idiomas, contenido y chrome traducidos. Leer `docs/fase-m-multilingue.md` antes de tocar i18n.
- **1.4-1.5 (jul-sep 2026):** señales y cruz de encarnación (192 nombres validados contra la efeméride, 192 interpretaciones), enlace de perfil compartible legible por IA, analítica propia y panel `/stats`, etiquetas y filtro de cartas guardadas, copia de seguridad por correo, drawer con gestos.
- **1.5.7 (2026-11-12):** menú ☰ de acciones de la carta (informe, compartir, guardar, imagen, instalar y enlaces del pie).
- **Revisión global y plan de mejora (nov 2026):** seis informes en `docs/revision-2026-11/` y lista de trabajo en `docs/plan-mejora.md`. Hecho el 2026-11-13, pendiente de validación del autor: COD-1 (enlace con fecha imposible ya no da 500), MKT-3 (título/H1/descripción en español con «Diseño Humano»), HD-2a (desfases pre-1970 corregidos de forma invisible), HD-1 (la hora desconocida se guarda y se avisa en carta, enlace e informe), UX-3 (objetivos táctiles mayores), UX-1 (números de puerta legibles), COD-9 (esta reorganización de la documentación) y PRO-1 (Play Store aparcada).

### Pendiente
- **Siguiente: el plan de mejora** (`docs/plan-mejora.md`), de arriba abajo, una pieza por turno.
- **Fase P — Play Store: APARCADA por decisión del autor el 2026-11-13.** Una cuenta personal nueva exige 12 testers durante 14 días seguidos, publica el nombre legal y obliga a actualizar cada año; se retomará solo si hay 12 voluntarios. Apple App Store, aparcada también (99 €/año).
- **Fase 8 — Carta compuesta**, **Fase 9 — Tránsitos** (con la «puerta del día» como versión barata), **Fase 10 — Guardado en línea** (el plan propone descartarla) y **Fase 11 — Distribución y marketing** (Search Console, páginas de referencia prerenderizadas, comunidad HD): resumen en `BACKLOG.md`.
- **Validación en dispositivo físico:** iPhone real (bóveda-cookie, restauración, scroll iOS) y enlace «instalar como app» en Chrome Android.

### Deuda técnica conocida
- El geocoder usa la instancia pública de **Photon** (komoot); válido para bajo tráfico, a revisar (mirror propio) si crece.
- Algunos comentarios de código aún en español (legado de fases 0/1.1) — se migran al inglés cuando se toca el archivo.
- `toBlob()` (html-to-image, exportar PNG/PDF) ya lleva un timeout de 30 s que convierte un cuelgue en error visible (2026-07-22); en navegadores reales funciona.
- Lo revisado y **aceptado a propósito** en la batería de testeo previa al 1.4 (guardado duplicado, datos personales en la query del enlace compartido, comillas rectas, lector masculino en español…) está en BACKLOG § "QA review before 1.4" — leerlo antes de "descubrirlo" otra vez.

---

## 7. Cómo trabajar conmigo

**Antes de actuar:**

- Si una instrucción contiene una referencia ambigua (ej. "la tarea C1", "esa parte que vimos", "el componente del otro día"), búscala explícitamente en TASKS.md, BACKLOG.md o el código antes de hacer nada. Si no la encuentras, para y pregunta.

- Diagnóstico antes de acción. Si te pido revisar/arreglar algo, primero analiza y dime qué has encontrado. No modifiques sin confirmación.

- Si vas a tocar más de dos archivos, lista cuáles antes de tocarlos y espera confirmación.

**Durante el trabajo:**

- Una cosa por turno. Si la instrucción contiene varias acciones (ej. "arregla X y actualiza TASKS.md"), hazlas en pasos separados.

- Prefiero más turnos cortos y baratos que un turno largo y caro. No intentes resolver todo en una sola pasada.

- Si te pierdes en exploración (más de 5 minutos leyendo sin proponer), para y dime qué necesitas saber.

**Al terminar:**

- No actualices TASKS.md hasta que yo confirme que la tarea está realmente hecha y validada.

- Resume lo hecho en una o dos líneas, no me hagas informes.

- Si has dejado algo a medias o has tomado una decisión que merece discusión, dilo explícitamente al final.

**Sobre el proyecto:**

- El usuario no es desarrollador profesional. Asume conocimientos conceptuales pero no fluidez técnica operativa. Explica brevemente cuando uses términos o comandos no obvios.

- Cuando propongas cambios estéticos o de diseño, justifica brevemente el "por qué" además del "qué". El usuario valora entender la lógica.
