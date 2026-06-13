# CLAUDE.md — Human Design Chart App

Contexto base para que el asistente de IA trabaje eficientemente en este proyecto.
Lee también `TASKS.md` y `BACKLOG.md` al inicio de cada sesión.

---

## 1. Qué es esta app

PWA de cálculo y visualización de cartas de **Diseño Humano** (Human Design).

El usuario introduce su fecha, hora y lugar de nacimiento → la app calcula su carta completa → muestra un **bodygraph SVG** interactivo más un resumen textual con tipo, estrategia, autoridad, perfil, definición, centros definidos, puertas activas y tabla de activaciones planetarias.

**Para quién:** personas interesadas en Human Design que quieren calcular y consultar su carta sin depender de servicios externos de pago. La app está orientada al uso personal y no comercial (ver licencia).

**Problema que resuelve:** las herramientas de referencia (MyBodyGraph, iHD) son de pago o requieren cuenta. Esta app es gratuita para uso no comercial, funciona offline como PWA, y mantiene los datos exclusivamente en el dispositivo del usuario.

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
| Geocodificación | **Nominatim** (OpenStreetMap) — endpoint público, sin autenticación |
| Runtime | Node ≥ 22 (`.nvmrc` + `engines.node` en `package.json`) |
| Lenguaje | JavaScript (sin TypeScript; JSDoc para tipos internos) |

**URLs:**
- Live: `https://human-design-chart-app.orangeman7557.workers.dev/`
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
├── wrangler.jsonc       ← configuración de Cloudflare Workers
├── static/
│   └── manifest.webmanifest
└── src/
    ├── app.html         ← shell HTML
    ├── app.css          ← tokens CSS globales (:root variables)
    ├── routes/
    │   ├── +layout.js   ← SPA mode (ssr: false, prerender: false)
    │   ├── +layout.svelte
    │   ├── +page.svelte ← pantalla 1: formulario de nacimiento
    │   └── chart/
    │       ├── +page.js      ← recoge datos de sessionStorage
    │       └── +page.svelte  ← pantalla 2: bodygraph + resumen textual
    └── lib/
        ├── hd/
        │   ├── constants.js           ← GATE_WHEEL, CENTERS, CHANNELS, GATES_BY_CENTER, etc.
        │   ├── ephemeris.js           ← cálculo astronómico (Julian Day, longitudes planetarias)
        │   ├── gates.js               ← longitud eclíptica → puerta HD + línea (1-6)
        │   ├── chart.js               ← orquestador principal: birth data → objeto chart completo
        │   └── bodygraph-geometry.js  ← coordenadas SVG: centros, formas, posiciones de las 64 puertas
        ├── geo/
        │   ├── nominatim.js  ← llamadas a la API de Nominatim (debounce, abort, dedup)
        │   └── timezone.js   ← resolución de timezone por coordenadas
        └── components/
            ├── CityAutocomplete.svelte  ← campo de ciudad con sugerencias de Nominatim
            └── Bodygraph.svelte         ← SVG del bodygraph (centros, canales, marcadores)
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
- **Idioma de los comentarios:** inglés en el código. El usuario se comunica en español; la UI también está en español (pendiente de internacionalización formal en fases futuras).
- **Caso de prueba de validación:** atajo oculto — pinchar el punto final del subtítulo de la home ("…datos de nacimiento.") rellena el formulario con los datos de orangeman7557 (1984-03-13, 09:30, Madrid) como smoke test rápido.
- **No hay tests automatizados.** Validación manual contra la carta conocida del autor.
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
- **Fase 1.2 — Autocomplete de ciudad + timezone automática:** Nominatim con debounce/abort, `tz-lookup` para timezone, dedup y ranking de resultados.
- **Fase 1.3 — Bodygraph SVG funcional:** 9 centros en formas correctas, 36 canales gate-to-gate, color coding básico.
- **Fase 1.4 — Precisión visual del bodygraph:** centros y puertas con coordenadas del referencial (viewBox 1058×1630), circuito de integración como polilíneas calculadas, colores refinados, split-circle para puertas Both.
- **Fase 2 — Persistencia local:** IndexedDB vía Dexie.js (`src/lib/db/charts.js`). Guardar/listar/renombrar/borrar cartas (diálogos nativos por ahora). Exportar/importar JSON. Se guarda el dato de nacimiento y la carta se recalcula al abrir.
- **Fase 3 — Pulido visual:** resumen y centros como overlays a los lados del bodygraph, tipo como chips con % de población, columnas de canales/colgantes con interacciones hover/tap hacia centros y activaciones (con chip seleccionada destacada y resto atenuado), canales Both rayados 70/30, cartas guardadas con tipo y reordenado drag & drop (Dexie schema v2). Detalle en TASKS.md.
- **Fase 4 — Modo hora desconocida:** formulario en orden fecha-lugar-hora; checkbox "Hora desconocida" que deshabilita el campo y muestra un slider 0-24h (pasos de 30 min) con banda de tipos del día y preview del tipo resultante; la hora del slider es la que usa "Calcular carta".
- **Fase 5 — Compartir imagen (cierra el MVP, validada 2026-06-12):** botones compartir/descargar en la página de carta que capturan toda la vista a PNG vía `html-to-image` (título y subtítulo centrados solo en la exportación); share sheet nativo en táctil, descarga en escritorio; fichero `nombre carta YYYY-MM-DD-HHMM-ciudad.png`. Durante el cierre se corrigió además el **bug grave de cálculo** (nodo lunar medio → nodo verdadero osculante en `ephemeris.js`).

### Pendiente

- **Estabilización post-MVP:** pruebas con cartas reales, bug-fixing, opcional TWA para Google Play. Mejoras menores de UX en BACKLOG ("Possible improvements").
- **Fase 6 — Guardado en línea:** sincronización opcional en la nube (local-only sigue siendo el default).
- **Fase 7 — Carta compuesta:** overlay visual de dos cartas guardadas.
- **Fase 8 — Tránsitos:** vista de tránsitos en tiempo real sobre una carta guardada.
- **Fase 9 — Integración IA (handoff):** generar desde cualquier elemento de la app un prompt listo para llevar a la IA del propio usuario (la IA no corre dentro de la app). UX por diseñar.

### Deuda técnica conocida

- Canal **30-41** (caso edge de medio canal) pendiente de verificar en B2.
- Nominatim usa el endpoint público sin `User-Agent` explícito — válido para bajo tráfico; a revisar si crece.
- Algunos comentarios de código aún en español (legado de fases 0/1.1) — se migran al inglés cuando se toca el archivo.
- Archivos del primer commit tienen permisos macOS que bloquean edición directa — workaround: borrar y recrear.

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
