# CLAUDE.md — Human Design Chart App

Contexto base para que el asistente de IA trabaje eficientemente en este proyecto.
Lee también `TASKS.md` y `BACKLOG.md` al inicio de cada sesión.

---

## 1. Qué es esta app

PWA de cálculo y visualización de cartas de **Diseño Humano** (Human Design).

El usuario introduce su fecha, hora y lugar de nacimiento → la app calcula su carta completa → muestra un **bodygraph SVG** interactivo más un resumen textual con tipo, estrategia, autoridad, perfil, definición, centros definidos, puertas activas y tabla de activaciones planetarias.

**Para quién:** personas interesadas en Human Design que quieren calcular y consultar su carta sin depender de servicios externos de pago. La app está orientada al uso personal y no comercial (ver licencia).

**Problema que resuelve:** las herramientas de referencia (MyBodyGraph, iHD) son de pago o requieren cuenta. Esta app es gratuita para uso no comercial y mantiene los datos exclusivamente en el dispositivo del usuario. Es **instalable** como PWA (iconos + service worker + enlace "instalar como app", Fase L jul 2026) y funciona **offline en modo básico**: el shell y los assets se cachean y el cálculo es 100% local; solo la búsqueda de ciudades (Photon) necesita red.

**Licencia:** PolyForm Noncommercial 1.0.0 — source-available, libre para uso no comercial. El autor es el único titular de copyright. Cualquier contribución externa requiere CLA antes del merge.

---

## 2. Stack técnico

| Capa | Tecnología |
|---|---|
| Framework UI | **SvelteKit 2** con **Svelte 5** (runes: `$state`, `$props`, `$derived`) |
| Modo de renderizado | SPA puro — `ssr: false` en `+layout.js` |
| Build | **Vite 5** |
| Deploy | **Cloudflare Workers** vía `@sveltejs/adapter-cloudflare` + Wrangler 4 |
| Astronomía | `astronomy-engine` (MIT) — precisión ±1 arcmin, suficiente para puertas y líneas HD |
| Fechas/zonas horarias | `luxon` (datetime timezone-aware) + `tz-lookup` (coords → IANA timezone, sin API) |
| Geocodificación | **Photon** (komoot, sobre OpenStreetMap) — typeahead por prefijo, endpoint público sin autenticación |
| Runtime | Node ≥ 22 (`.nvmrc` + `engines.node` en `package.json`) |
| Lenguaje | JavaScript (sin TypeScript; JSDoc para tipos internos) |

**URLs:**
- Live: `https://hdchart.app/` (custom domain; also served at the original `human-design-chart-app.orangeman7557.workers.dev` Workers origin)
- Repo: `https://github.com/orangeman7557/human-design-chart-app`

**CI/CD:** auto-deploy en cada push a `main` via Cloudflare Workers Builds.

---

## 3. Estructura del proyecto

```
/
├── CLAUDE.md            ← este archivo
├── TASKS.md             ← estado canónico del proyecto entre sesiones (leer siempre)
├── BACKLOG.md           ← decisiones técnicas diferidas, deuda conocida
├── package.json
├── svelte.config.js
├── vite.config.js
├── vitest.config.js     ← configuración de tests (vitest)
├── wrangler.jsonc       ← configuración de Cloudflare Workers
├── static/
│   ├── manifest.webmanifest
│   ├── favicon.svg + iconos PNG (32/180/192/512/maskable) + og-image.png
│   └── robots.txt · sitemap.xml
└── src/
    ├── app.html         ← shell HTML
    ├── app.css          ← tokens CSS globales (:root variables)
    ├── service-worker.js ← precache del shell + offline básico (Fase L)
    ├── hooks.server.js  ← Worker: negocia `/`, redirects legacy, OG por carta, <html lang>
    ├── params/
    │   └── locale.js    ← matcher de ruta: solo enrutan idiomas que existen (Fase M)
    ├── routes/
    │   ├── +layout.js   ← SPA mode por defecto (ssr: false, prerender: false)
    │   ├── +layout.svelte ← chrome global: selector de idioma, badge staging, Dialog
    │   ├── api/         ← endpoints del Worker (sin idioma: /api/backup, /api/love)
    │   └── [lang=locale]/   ← TODAS las páginas cuelgan del idioma (/en/…, /es/…)
    │       ├── +layout.js   ← activa el locale antes de renderizar
    │       ├── +page.js     ← la home se prerenderiza por idioma (SEO)
    │       ├── +page.svelte ← pantalla 1: formulario de nacimiento
    │       ├── privacy/     ← política de privacidad (prerenderizada, Fase L)
    │       └── chart/
    │           ├── +page.js      ← recoge datos de sessionStorage (SPA puro)
    │           └── +page.svelte  ← pantalla 2: bodygraph + resumen textual
    └── lib/
        ├── i18n/          ← motor multiidioma (Fase M; ver docs/fase-m-multilingue.md)
        │   ├── locales.js      ← FUENTE ÚNICA de idiomas (datos planos, la usa el Worker)
        │   ├── index.svelte.js ← locale activo + t(clave, params, locale?)
        │   ├── route-t.svelte.js ← routeT(): t() atado al idioma de la RUTA (obligatorio en prerender)
        │   └── ui/es.js · ui/en.js ← textos de chrome por idioma
        ├── hd/
        │   ├── constants.js           ← GATE_WHEEL, CENTERS, CHANNELS, GATES_BY_CENTER, etc.
        │   ├── ephemeris.js           ← cálculo astronómico (Julian Day, longitudes planetarias)
        │   ├── gates.js               ← longitud eclíptica → puerta HD + línea (1-6)
        │   ├── chart.js               ← orquestador principal: birth data → objeto chart completo
        │   ├── bodygraph-geometry.js  ← coordenadas SVG: centros, formas, posiciones de las 64 puertas
        │   ├── prompts.js             ← genera los prompts para la IA del usuario (handoff, Fase 6)
        │   ├── report.js              ← ensambla el informe inicial desde el chart (Fase 7)
        │   ├── report-pdf.js          ← maqueta el informe en PDF con jsPDF (import diferido)
        │   └── content/               ← textos propios por idioma (es.js base; en.js = deep-merge sobre es) + accesores (index.js): conceptos, tipos, centros, 64 puertas, informe
        ├── geo/
        │   ├── geocoder.js   ← geocodificación vía Photon (typeahead, debounce, abort, dedup)
        │   ├── place.js      ← helper de etiqueta "ciudad, país"
        │   └── timezone.js   ← resolución de timezone por coordenadas
        ├── db/
        │   └── charts.js     ← persistencia local (IndexedDB vía Dexie)
        ├── ai/
        │   └── handoff.js    ← deep-links a IAs + preferencia (sin API)
        ├── pwa/
        │   └── install.svelte.js ← captura beforeinstallprompt / detecta iOS ("instalar como app")
        ├── markup.js         ← renderInline: **negrita**/*cursiva*/[enlaces] → HTML (compartido)
        └── components/
            ├── CityAutocomplete.svelte  ← campo de ciudad con sugerencias de Photon
            ├── DateField.svelte         ← fecha como DD/MM/AAAA tecleables (sin picker nativo)
            ├── Bodygraph.svelte         ← SVG del bodygraph (centros, canales, marcadores)
            ├── Dialog.svelte            ← diálogos propios prompt/confirm/alert (vía dialog.svelte.js)
            ├── ElementInfo.svelte       ← panel "i" reutilizable (info + handoff IA)
            ├── InitialReport.svelte     ← overlay del informe inicial (Fase 7)
            ├── InfoDot.svelte           ← la "i" de información
            ├── About.svelte             ← modal "acerca de" (footer)
            ├── ReportBug.svelte         ← "notificar un fallo" → Web3Forms (footer)
            ├── StorageInfo.svelte       ← "saber más": dónde viven las cartas (bóveda de cookie)
            ├── LangSwitch.svelte        ← selector de idioma (pestaña colgando del borde superior)
            ├── focus-trap.js            ← acción compartida: foco dentro del overlay + restore al cerrar
            ├── scroll-lock.js           ← acción compartida: body pinned con overlay abierto (fix scroll iOS)
            └── select-on-focus.js       ← acción compartida: al enfocar un campo se selecciona su contenido (sobrescribir al teclear)
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
  3. **`labels` ≠ `promptLabels`** en el pack de contenido: `labels` son etiquetas de display (mayúscula inicial, sin artículos) y `promptLabels` está redactado para incrustarse en frases de prompt (minúsculas, "el Sol"). La UI usa `getDisplayLabels()`.
- **Voz de los textos (decisión 2026-07-03):** el **informe inicial** (y su PDF) habla en **2ª persona** — es un documento dirigido al dueño de la carta. **Todo lo demás** (drawers "i", prompts, tooltips) es **impersonal** — material de consulta del que mira, que puede estar viendo la carta guardada de otra persona. Las líneas de estado dicen "esta carta", nunca "tu carta". Excepción consciente: el prompt de cierre del informe va en 1ª persona (vive dentro del marco-documento).
- **Caso de prueba de validación:** la carta del autor (orangeman7557: 1984-03-13, 09:30, Madrid — Manifestor) es la referencia para validación manual. El atajo oculto de la home que rellenaba el formulario con esos datos se eliminó en el lanzamiento 1.0.0 (2026-07-03); para probar, introducir los datos a mano o usar los tests (`npm test`).
- **Tests con vitest** (`npm test`): 30 casos en 4 ficheros. El núcleo de cálculo (`src/lib/hd/chart.test.js`) tiene dos cartas de referencia validadas externamente (Reflector + autor) con snapshot completo de activaciones, seis anclas de regresión auto-congeladas que cubren los 5 tipos y las 7 autoridades (2026-07-03), y límites de `longitudeToGate`/`cityCountry`. `src/lib/i18n/catalog.test.js` vigila la paridad de claves entre idiomas y guarda contra un *fallback* masivo. El resto se valida manualmente contra la carta conocida del autor.
- **Regla de oro del i18n (Fase M).** El locale activo es un `$state` **de módulo**, es decir compartido, y el prerender construye `/en` y `/es` **en paralelo**: cualquier cosa que pueda renderizarse durante el prerender **debe atarse al idioma de la ruta**, no leer el estado de módulo. Las páginas usan `const tr = (k, p) => t(k, p, lang)` con `lang = $page.params.lang`; los componentes usan `const t = routeT()` (`lib/i18n/route-t.svelte.js`). Ojo: **no basta con que un componente sea "de cliente"** — si su disparador se pinta dentro de una página prerenderizada (los modales del pie: `About`, `ReportBug`, `StorageInfo`), también aplica. El síntoma es cruel: se autocorrige al hidratar, así que **nunca se ve en dev, solo en el build** — y los crawlers ven la versión rota. Detalle en `docs/fase-m-multilingue.md` §3.
- **Los catálogos no son traducciones espejo.** `ui/en.js` y `content/en.js` se escriben **desde el significado**, no palabra por palabra desde el español (el pase literal produjo inglés rígido, corregido en dos pasadas). Hay bloques con un comentario que lo dice explícitamente — no re-sincronizarlos con el español.
- **Nunca ejecutar `npm install` dentro de un worktree.** Las sesiones de IA trabajan en worktrees bajo `.claude/worktrees/` sin `node_modules` propio: Node resuelve las dependencias subiendo hasta el `node_modules` del checkout principal, y `vite.config.js` permite servirlas desde ahí. Si una tarea añade una dependencia nueva, instalarla en la carpeta principal del proyecto (`npm install <paquete>` en `/Users/i7up/Documents/Claude/Projects/human-design-app`).

---

## 5. Diseño visual

### Paleta (tokens CSS en `app.css`)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0b0b0d` | Fondo raíz (negro profundo) |
| `--surface` | `#161618` | Tarjetas, inputs |
| `--surface-2` | `#1e1e22` | Superficie elevada |
| `--border` | `#2a2a2e` | Bordes sutiles |
| `--text` | `#e8e8ea` | Texto principal |
| `--text-muted` | `#a0a0a8` | Labels, texto secundario |
| `--accent` | `#d4a657` | Oro ámbar — CTA, chips activos, links |
| `--accent-soft` | `#d4a65720` | Fondo suave de chips activos |
| `--danger` | `#e06262` | Errores |
| `--success` | `#6ec48a` | [sin uso activo aún] |

### Paleta del bodygraph SVG

| Uso | Valor |
|---|---|
| Personality | `#ffffff` (blanco puro) |
| Design | `#e84672` (rosa-rojo) |
| Both (Personality + Design) | rayas blancas sobre base `#e84672` (stroke-dasharray) |
| Inactive (skeleton) | `#606070` (gris tenue, siempre visible) |
| Marcador de puerta activa (fill) | `#4a2060` (morado oscuro) |
| Puertas inactivas (texto) | `#4a2060` en centro definido / `#aaaab4` en indefinido |
| Centros definidos (stroke) | color de fill del centro (sin borde separado) |
| Centros indefinidos (fill / stroke) | `#181823` / `#46465a` |

Colores de centros definidos: Head/G amarillo `#e5cf3d`, Ajna verde `#6cb46c`, Throat/Spleen/SP ámbar `#b87a35`, Heart/Sacral rojo `#c83838`, Root marrón `#5e3e1d`.

### Tipografía

- `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` — sin fuente externa.
- Labels en uppercase con `letter-spacing: 0.06em` y tamaño `0.72rem`.
- Fuente base `1rem`, peso 500 para títulos y CTAs.
- `-webkit-font-smoothing: antialiased` activado.

### Principios estéticos

- **Dark theme profundo** con acento en oro ámbar — evoca la estética mística del HD sin ser recargado.
- **Minimalista.** Sin decoración superflua. Similar en tono a Vercel/Linear.
- **Border radius uniforme** `10px` en todos los controles interactivos.
- **El bodygraph apunta al estilo Rave clásico** — referencia canónica del International Human Design School.
- `max-width: 460px` en formulario, `720px` en página de carta.

---

## 6. Estado actual del proyecto

### Completado

- **Fase 0 — Infraestructura:** repo + Cloudflare Workers auto-deploy + PWA manifest + dark theme base.
- **Fase 1.1 — Cálculo astronómico:** 13 cuerpos (Personality + Design), gate/line mapping, tipo/estrategia/autoridad/perfil/definición. Validado contra dos cartas reales.
- **Fase 1.2 — Autocomplete de ciudad + timezone automática:** geocoder con debounce/abort, `tz-lookup` para timezone, dedup y ranking de resultados (Nominatim en su día; migrado a **Photon** en jun 2026 para typeahead por prefijo).
- **Fase 1.3 — Bodygraph SVG funcional:** 9 centros en formas correctas, 36 canales gate-to-gate, color coding básico.
- **Fase 1.4 — Precisión visual del bodygraph:** centros y puertas con coordenadas del referencial (viewBox 1058×1630), circuito de integración como polilíneas calculadas, colores refinados, split-circle para puertas Both.
- **Fase 2 — Persistencia local:** IndexedDB vía Dexie.js (`src/lib/db/charts.js`). Guardar/listar/renombrar/borrar cartas (diálogos propios temáticos). Exportar/importar JSON. Se guarda el dato de nacimiento y la carta se recalcula al abrir.
- **Fase 3 — Pulido visual:** resumen y centros como overlays a los lados del bodygraph, tipo como chips con % de población, columnas de canales/colgantes con interacciones hover/tap hacia centros y activaciones (con chip seleccionada destacada y resto atenuado), canales Both rayados 70/30, cartas guardadas con tipo y reordenado drag & drop (Dexie schema v2). Detalle en TASKS.md.
- **Fase 4 — Modo hora desconocida:** formulario en orden fecha-lugar-hora; checkbox "Hora desconocida" que deshabilita el campo y muestra un slider 0-24h (pasos de 30 min) con banda de tipos del día y preview del tipo resultante; la hora del slider es la que usa "Calcular carta".
- **Fase 5 — Compartir imagen (cierra el MVP, validada 2026-06-12):** botones compartir/descargar en la página de carta que capturan toda la vista a PNG vía `html-to-image` (título y subtítulo centrados solo en la exportación); share sheet nativo en táctil, descarga en escritorio; fichero `nombre carta YYYY-MM-DD-HHMM-ciudad.png`. Durante el cierre se corrigió además el **bug grave de cálculo** (nodo lunar medio → nodo verdadero osculante en `ephemeris.js`).
- **Fase L — Preparación de lanzamiento (jun-jul 2026, cerrada con el 1.0.0 del 2026-07-03):** revisión de textos (gate OK 2026-07-02) → instalabilidad (iconos propios, service worker, manifest, enlace "instalar como app") → SEO (home y `/privacy` prerenderizadas, Open Graph, og-image, robots, sitemap, JSON-LD) → dominio propio **`hdchart.app`** (Cloudflare Registrar + Custom Domain) → "notificar un fallo" vía **Web3Forms** (`ReportBug.svelte`) → política de privacidad en `/privacy` → fila de apoyo en «Acerca de» («¡Mándame amor!» con contador global en Cloudflare KV + «Invítame a un café» → Buy Me a Coffee) → **bump a 1.0.0 y lanzamiento web (2026-07-03)**. **Queda:** la verificación en vivo post-deploy (contador KV, redirect `www` → root, offline/SW, cabeceras, iOS real). Detalle en BACKLOG ("Phase L — Launch plan").
- **Fase M — Multilingüe (COMPLETADA, 2026-07-21):** turno 1 (**estructura**) y turno 2 (**traducción**) cerrados; la app funciona entera en inglés y español. El idioma vive en la URL (`/en/…`, `/es/…`, sin contenido en la raíz: el Worker la negocia y redirige), con una **fuente única de idiomas** (`lib/i18n/locales.js`) de la que se derivan matcher de rutas, menú de idiomas, hreflang, entradas de prerender y fallback offline. Todo el contenido (conceptos, 64 puertas, 36 canales, informe, prompts) y todo el chrome están traducidos, incluida la política de privacidad (con las convenciones de una política inglesa, no traducción literal). Un test de paridad (`src/lib/i18n/catalog.test.js`) vigila que no falten claves al añadir idiomas. **Plan, regla de SSR y checklist de "cómo añadir un idioma" en [`docs/fase-m-multilingue.md`](./docs/fase-m-multilingue.md)** — leerlo antes de tocar nada de i18n.

### Pendiente

- **Estabilización post-MVP:** en curso. Aterrizado (jun 2026): tests del núcleo con vitest, diálogos propios, autocompletado por prefijo (Photon), flecha de volver y etiqueta "ciudad, país". Pendiente: pruebas con cartas reales y las mejoras menores de BACKLOG ("Possible improvements"). El TWA para Google Play pasó a ser fase propia (Fase P).
- **Fase 6 — Integración IA (handoff) + info de elementos:** generar desde cualquier elemento de la app un prompt listo para llevar a la IA del propio usuario (la IA no corre dentro de la app), más información textual básica de cada elemento (tipo, autoridad, perfil, centros, canales) — solo si es legalmente viable: redacción propia o fuentes libres, nunca copiado de Jovian Archive. **Funcionalmente completa** (6.A–6.F construidas y verificadas, jun 2026; revisión de textos del autor cerrada 2026-07-02 — el bump de versión llegará con el 1.0.0 de Fase L). Las **64 puertas** estrenan esencia propia (2-3 frases desde el hexagrama de dominio público + el centro + don/sombra) con **coda de 3 estados** según la carta (completa/colgante/inactiva); los canales heredan la misma lógica (jun 2026). Detalle en TASKS/BACKLOG.
- **Fase 7 — Informe inicial:** primer de HD en lenguaje llano para quien ve su carta sin saber nada del sistema. **Construida y verificada (jun 2026; revisión de textos del autor cerrada 2026-07-02).** Overlay `InitialReport.svelte` abierto por un botón "Informe" junto al nombre de la carta; `report.js` (`buildReport`) ensambla ~13 secciones desde el chart — Parte A (qué es HD + analogía de las hormigas + bodygraph/centros + condicionamiento + desacondicionamiento), Parte B personalizada (tipo y lugar en el colectivo, estrategia, autoridad/decisiones, energía·trampa·señales por tipo, perfil, definición, recorrido de centros con su estado real) y Parte C (handoff de carta completa) — reutilizando la biblioteca de Fase 6 + bloques `report`/`typeReport`; arquitectura **híbrida** (estático determinista + handoff para profundizar). Spec en `docs/informe-inicial.md`.
- **Fase P — Play Store (SIGUIENTE; decidida 2026-07-06, desbloqueada al cerrar la Fase M):** empaquetar la PWA como **TWA** y publicarla en **Google Play** (Bubblewrap/PWABuilder, cuenta de desarrollador de Google — pago único de 25 USD). **Apple App Store queda aparcada a propósito:** exige la cuota de ~99 €/año de la Apple Developer Program, que el autor no va a pagar salvo que la app demuestre recorrido más adelante.
- **Fase 8 — Carta compuesta:** overlay visual de dos cartas guardadas.
- **Fase 9 — Tránsitos:** vista de tránsitos en tiempo real sobre una carta guardada.
- **Fase 10 — Guardado en línea:** sincronización opcional en la nube (local-only sigue siendo el default).

### Deuda técnica conocida

- El geocoder usa la instancia pública de **Photon** (komoot); válido para bajo tráfico, a revisar (mirror propio) si crece.
- Algunos comentarios de código aún en español (legado de fases 0/1.1) — se migran al inglés cuando se toca el archivo.
- `toBlob()` (html-to-image, exportar PNG/PDF) **no tiene timeout ni recuperación**: si se cuelga, el botón queda deshabilitado para siempre sin error. Funciona en navegadores reales (verificado 2026-07-22); anotado en BACKLOG por si algún día da la cara.
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
