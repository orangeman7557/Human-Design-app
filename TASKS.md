# Tasks

Source of truth for project progress. Any session resuming this project
(another window, another day, another assistant) **must read this file first**
to understand where we are.

It is the project's responsibility — and the AI assistant's responsibility —
to keep this file up to date with every meaningful change. If you finish a
sub-iteration, advance a status. If you uncover new tech debt, write it down
(here for cross-session continuity, in `BACKLOG.md` for the long view).

Statuses:
- ✅ done
- 🟡 in progress / partially done
- ⬜ pending

The deeper context (technical trade-offs, future ideas, deferred decisions)
lives in [`BACKLOG.md`](./BACKLOG.md).

Last updated: 2026-06-13.

> Latest change (2026-06-13): roadmap reordenado — la antigua Fase 9
> (handoff a IA) pasa a ser la **Fase 6** y amplía su alcance: además de
> los prompts para la IA del usuario incluirá información textual básica
> de cada elemento (tipo, autoridad, perfil, centros, canales), siempre
> que sea legalmente viable sin incurrir en plagio; el guardado en línea
> pasa de Fase 6 a **Fase 9**. Backlog depurado: mejoras visuales ya
> hechas o descartadas eliminadas (solo queda ajustar la flecha ← de
> volver en móvil) y retirada la deuda de permisos macOS.
>
> Previo (2026-06-13): tabla de activaciones plegada por defecto —
> solo Sol, Tierra y Luna visibles; botón sutil "Mostrar más ▾ / Mostrar
> menos ▴" bajo la tabla despliega los 13 cuerpos. Nota: el PNG
> compartido/descargado captura la tabla en el estado en que esté.
> Infra: los worktrees de sesión ya no instalan `node_modules` propio
> (~244 MB cada uno) — resuelven desde el checkout principal y
> `vite.config.js` lo permite en `server.fs.allow`; worktrees y ramas
> viejas purgadas (~980 MB recuperados). Regla en CLAUDE.md §4.
>
> Previo (2026-06-12, post-MVP batch **v0.1.1**): etiqueta git
> `v0.1.0` en el commit del cierre del MVP; versión del footer leída de
> package.json (fuente única vía Vite define); enlace sutil "Borrar
> formulario" bajo el CTA; campo nombre sin placeholder; al abrir una
> carta guardada se usa el nombre guardado/renombrado; cabeceras
> Personality/Design con circulito de color a la derecha + tooltip
> (nacimiento vs 88° de arco solar ≈ 88 días antes); chip de tipo activo
> con salto de línea (Manifesting Generator desbordaba en escritorio);
> bodygraph en dos pasadas de pintado (las mitades grises ya no tapan el
> tramo común de 20-34/10-34 cuando la 57 está indefinida); puertas
> inactivas legibles en Raíz definida (arena claro sobre marrón).
> Política de versiones acordada: patch para arreglos, minor para fases
> nuevas (Fase 6 → 0.2.0), 1.0.0 cuando se considere estable.
>
> Previo (2026-06-12): **MVP cerrado y validado en producción.**
> Últimos retoques tras la validación de Fase 5: título y subtítulo
> centrados en el PNG exportado, orden de la lista de centros (Sacral
> tras Bazo y Plexo Solar), y fecha/hora del formulario centradas en
> móvil mediante overlay propio (Android Chrome ignora `text-align` y
> todos los pseudo-elementos del widget nativo; el valor nativo se pinta
> transparente y un span centrado muestra el valor — el picker nativo
> sigue abriéndose igual). El cierre acumuló además (2026-06-11): nodo
> verdadero (bug GRAVE de cálculo), tooltips táctiles, tap en centros
> del SVG, chip seleccionada destacada + atenuado, PNG arreglado en
> escritorio y móvil (`nombre carta YYYY-MM-DD-HHMM-ciudad.png`),
> tipografía de cabecera, atajo oculto en el punto final del subtítulo,
> formulario móvil centrado, botones compartir/descargar en la esquina
> del bodygraph y conservación de datos al volver. Siguiente:
> estabilización (pruebas con cartas reales) y, cuando toquen, las
> mejoras menores de BACKLOG ("Possible improvements"). URL corta /
> dominio propio: comentado 2026-06-12, aplazado por decisión del
> usuario.

---

## ✅ Done

- **Phase 0 — Infrastructure.** GitHub repo
  (`orangeman7557/human-design-chart-app`) connected to Cloudflare Workers
  Builds. Auto-deploy on every push to `main`. Live at
  `https://human-design-chart-app.orangeman7557.workers.dev/`. Stack:
  SvelteKit + adapter-cloudflare, SPA mode (`ssr=false`), dark theme base.
- **Phase 1.1 — Astronomical calculation + textual chart output.** Birth-data
  form (date/time + manual lat/long/timezone at first), 13-body computation
  via `astronomy-engine`, gate/line mapping, derivation of type, strategy,
  authority, profile, definition, defined centers and active gates. Result
  page in text. Validated against orangeman7557's known chart and a second
  reference chart — both match expected values exactly.
- **Phase 1.2 — City autocomplete + automatic timezone.** Nominatim-backed
  city search with debounce and abort. `tz-lookup` resolves the IANA
  timezone from coordinates. Form no longer asks the user for lat/long or
  timezone. Client-side dedup + ranking surfaces the right city when names
  collide (e.g. Cuenca, Spain vs Cuenca, Ecuador). Country preference
  dominant over OSM class so the preferred-country city wins even when it
  comes back from Nominatim as a `boundary` entry.
- **Infrastructure maintenance (alongside Phase 1.2).** Fixed a latent data
  bug in `src/lib/hd/constants.js`: gate 11 belongs to Ajna, not Throat
  (does not change orangeman7557's chart because his channel 11-56 is
  incomplete, but it would have placed gate 11 in the wrong centre in the
  visual bodygraph and broken Ajna definition for other charts). Bumped
  Wrangler to v4 and Node to v22 (build env variable `NODE_VERSION=22` on
  Cloudflare + `.nvmrc` + `engines.node` in `package.json`).
- **Phase 1.3 — SVG bodygraph visualization.** Functional bodygraph above
  the textual chart data. 9 centres as geometric shapes (triangles, diamond,
  rects), filled when defined, outlined when open. All 36 channels drawn as
  lines gate-to-gate. Colour coding: Personality=white, Design=pink-red,
  Both=pink-red, inactive=muted gray. Active gates marked with a circle.
  Three new files: `src/lib/hd/bodygraph-geometry.js`,
  `src/lib/components/Bodygraph.svelte`, edit to `src/routes/chart/+page.svelte`.

## ✅ Phase 1.4 — Bodygraph visual accuracy (completada 2026-05-19)

Subtareas completadas:

- ✅ **1.4.A Centre sizes** — Centros reducidos ~25-30%. Head r45→32,
  Ajna r40→28, Throat 130×85→95×65, G r60→45, Heart r40→30,
  Sacral 130×85→95×65, Spleen r55→40, SolarPlexus r55→40,
  Root 130×80→95×58. Puertas reescaladas hacia sus centroides.
- ✅ **1.4.B Personality color** — Personality = blanco `#eaeaee`;
  inactivo = muy tenue `#252535` (antes ambos eran el mismo blanco).
- ✅ **1.4.C Canales paralelos** — 10 grupos (2-4 canales/grupo).
  Offset perpendicular ±N×4.5 px basado en dirección media del grupo.
  Sin cruces detectados (verificado analíticamente).
- ✅ **1.4.D Stroke width** — 6 px → 3.5 px; linecap butt → round.
- ✅ **1.4.E Centros indefinidos** — Fill `#101116` → `#181823`,
  stroke `#3a3a42` → `#46465a`. Centros más legibles y delimitados.
- ✅ **1.4.F Heart position** — Centroide y:325 → y:305 (se alínea con
  el hueco Throat↔G). Puertas Heart desplazadas −20 px en y.
- ✅ **1.4.G Marcador Both** — Split circle: semiciclo superior blanco
  (Personality), inferior rojo (Design). Número en navy sobre el split.
- **1.4.H** — Eliminada (etiqueta "G" diferida a pulido visual Fase 3).
- ✅ **1.4.I Borde definidos** — Stroke de centros definidos `'#c8a832'`
  (ámbar dorado), stroke-width 2. Antes era mismo color que el fill.
- ✅ **1.4.J Puertas Head** — Puertas 64/61/63 estaban en y:78, fuera
  del triángulo (borde en y:71). Corregidas a y:68. Verificado.
- ✅ **1.4.K Routing diagonal** — Verificado analíticamente: ningún
  canal diagonal Throat↔Spleen o Throat↔SolarPlexus se cruza con otro.
  Los pares paralelos están resueltos por 1.4.C.

## ✅ Geometry rebase + bodygraph polish (2026-05-21)

- ✅ ViewBox `380×620` → `1058×1630` (dimensiones del referencial).
- ✅ Centros: vértices explícitos del referencial (triángulos no equiláteros).
  Heart cambia de `triangle-left` a `triangle-up`.
- ✅ Las 64 posiciones de puertas desde el referencial; ajuste fino posterior
  de coordenadas en múltiples centros (segunda pasada del referencial).
- ✅ Offsets perpendiculares de canales paralelos eliminados — con las
  coordenadas del referencial los canales ya están naturalmente separados.
- ✅ Circuito de integración (10-20, 10-57, 10-34, 20-34, 20-57, 34-57)
  trazado como polilíneas calculadas vía `proyectarSobreRecta`. Los quiebres
  Q y Q2 derivan de las coordenadas de las puertas, sin literales numéricos.
- ✅ Colores refinados: Personality blanco `#ffffff`, Design rosa-rojo
  `#e84672`, inactivo gris tenue `#606070`, marcador de puerta morado
  `#4a2060`, stroke-width canales 12 px.
- ✅ Puertas inactivas en centros definidos: texto en morado `#4a2060`
  (antes gris claro, ilegible sobre fondos de color).
- ✅ `.npmrc` con `legacy-peer-deps=true` — arregla build en Cloudflare.

## ✅ Phase 2 — Local persistence (completada 2026-06-10)

- IndexedDB via Dexie (`src/lib/db/charts.js`). Stores the birth input
  data only; the chart is recomputed on load, so saved records benefit
  from future calculation improvements.
- "Guardar carta" button on the chart page (native `prompt()` for the
  name). "Cartas guardadas" list on the home page: open / rename / delete
  (native dialogs — visual polish deferred).
- Export all charts to one JSON file; import appends (no dedup).
- Fix found during testing: IndexedDB can't structured-clone Svelte 5
  `$state` proxies — records are saved via `$state.snapshot`.
- Validated by the user locally; merged to `main` and deployed.

## ✅ Phases 3-5 — Visual polish, unknown hour, share as image (MVP closed 2026-06-12)

- **Phase 3 — Visual polish.** Blocks:
  - ✅ **3.A** Summary above the bodygraph; bodygraph ~8% smaller; birth
    data line; chart title = chart name.
  - ✅ **3.B** Type as 5 always-visible chips, ordered by population share
    with the % shown small. (Authority/definition pattern deferred — BACKLOG.)
  - ✅ **3.C** Complete-channels and hanging-gates columns side by side;
    "Puertas activas" section removed; planet symbols in the activations
    table; icon export/import buttons on the home screen.
  - ✅ **3.D** Striped white/red "Both" channel halves; round joins fix the
    integration-polyline artifacts; inactive gate contrast raised;
    narrow-screen review (375px, no overflow).
  - ✅ **3.E** Layout + interaction round (2026-06-10):
    - Active type chip in solid amber (stronger highlight).
    - Four info cards overlay the upper-left of the bodygraph; centres
      list overlays the upper-right; hover/tap on a centre draws a
      temporary amber pointer line + outline marking it on the graph.
      On <680px both fall back to normal flow (cards grid, chips row).
    - Hanging-gates emphasis swapped: defined-centre gates in active
      style, undefined-centre ones in legible gray.
    - "Both" stripes at ~70% red / 30% white (dasharray 10/22).
    - Birth data line left-aligned with the title text.
    - Channel chips in active style, numbers only.
    - Hovering a channel/gate chip highlights its centre chip(s), dims
      the rest and highlights matching activations in the planets table.
    - Home: "Las cartas se guardan solo en este dispositivo" note;
      divider before "Cartas guardadas"; drag & drop reordering
      (HTML5 DnD, order persisted in a new `sortOrder` field — Dexie
      schema v2 with upgrade); chart type shown next to each saved name
      (denormalised `type` stored on save, lazily backfilled for older
      records).
  - ✅ **3.F** Docs closing pass — this update.
- **Phase 4 — Unknown birth time mode** (2026-06-10, validated).
  Form order now date → place → time. "Hora desconocida"
  checkbox disables the time field and reveals a 0-24h slider (30-min
  steps); scrubbing computes and shows the resulting type for that hour
  (debounced) and writes the hour into the disabled time field, which is
  what "Calcular carta" uses. Unchecking restores manual entry; changing
  date/place recomputes the preview.
- **Phase 5 — Share as image** (2026-06-11, validated 2026-06-12).
  Share/download buttons on the chart page capture the **whole chart
  view** (summary, bodygraph, centres, channels, gates, activations) to
  PNG via `html-to-image` — native share sheet on touch, download on
  desktop. Export-only layout centres the title and birth line in the
  image. File name: `nombre carta YYYY-MM-DD-HHMM-ciudad.png`. All
  pre-MVP items landed 2026-06-11 (PNG capture fixed on desktop and
  mobile, header typography, pre-fill removed behind a hidden shortcut,
  centred mobile form). **The MVP is closed.**

## ⬜ Pending

- **Stabilisation pass (post-MVP).** Hands-on testing against real
  charts, bug-fixing, optional TWA packaging for Google Play. Minor UX
  items live in BACKLOG ("Possible improvements").
- **Phase 6 — AI handoff + element info.** Lightweight AI integration:
  from any element of the app (profile, type, a channel…) generate a
  ready-made prompt the user can take to **their own** AI assistant — the
  AI does not run inside the app, the app just makes redirecting the
  question easy (e.g. select the profile and get the right prompt to
  learn about it). Also basic in-app textual info for each element (type,
  authority, profile, centres, channels) — only if legally viable: own
  wording or genuinely free sources, never copied from Jovian Archive.
  Exact UX to be designed when the phase starts.
- **Phase 7 — Composite chart.** Two saved charts rendered as a combined
  bodygraph (visual overlay distinguishing each person).
- **Phase 8 — Transits.** View live transits over a saved chart.
- **Phase 9 — Online sync.** Optional cloud persistence of saved charts
  (local-only stays the default).

---

## Useful pointers

- Live URL: <https://human-design-chart-app.orangeman7557.workers.dev/>
- Repo: <https://github.com/orangeman7557/human-design-chart-app>
- Validation case: orangeman7557's own chart — hidden shortcut: clicking
  the final period of the home tagline pre-fills the form
  (`fillAuthorData` in `src/routes/+page.svelte`).
- Decisions log + accepted trade-offs: [`BACKLOG.md`](./BACKLOG.md).
- Authorship + AI assistance disclosure: [`README.md`](./README.md).

## Working agreements for the AI assistant

- **Update this file with every meaningful change.** A new feature shipped,
  a sub-iteration completed, a bug fix landed, a decision taken — all of
  it should be reflected here before the conversation ends.
- **Read this file (and `BACKLOG.md`) at the start of every session.**
  Including the user's own messages may not be enough to reconstruct state;
  this file is the canonical record across conversations.
- **Refresh the `Last updated` date** above whenever you edit this file.
- **Prefer terse, factual entries.** Long descriptions belong in commit
  messages and code comments.
