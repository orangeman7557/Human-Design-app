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

Last updated: 2026-06-10.

> Latest change: Phase 2 (persistencia local) completada y validada por el
> usuario. Roadmap renumerado: 3 pulido visual → 4 hora desconocida →
> 5 export PNG (cierre MVP) → 6 guardado en línea → 7 carta compuesta →
> 8 tránsitos.

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

## ⬜ Pending

- **Phase 3 — Visual polish (next up).** Scope agreed 2026-06-10:
  - Key summary (type, strategy, authority, profile, definition) moved
    **above** the bodygraph in a compact horizontal layout.
  - Bodygraph ~5-10% smaller so the full chart fits one screen height.
  - Birth data (name, date, place) shown compactly on the chart page.
  - Type as 5 always-visible options with the active one highlighted
    (same visual language as defined/undefined centres); if it works
    well, extend the pattern to authority and definition.
  - List of complete channels (numbers + centres only — no Jovian
    keynote names) and list of hanging gates.
  - Striped white/red "Both" channels; colour artifacts at the
    integration-circuit polyline joints; inactive gate contrast on
    undefined centres; narrow-screen review at the end.
  - Out of scope (user decision): centre labels (proper centre names
    deferred to later — see BACKLOG), decorative silhouette, rounded
    centre corners.
- **Phase 4 — Unknown birth time mode.** Chart at local noon with visual
  disclaimers + a slider to scrub the hour and see which large markers
  (type, authority, profile) shift.
- **Phase 5 — PNG export.** Share the bodygraph as an image. **Closes the
  MVP.** Followed by a stabilisation pass: hands-on testing against real
  charts, bug-fixing, optional TWA packaging for Google Play.
- **Phase 6 — Online sync.** Optional cloud persistence of saved charts
  (local-only stays the default).
- **Phase 7 — Composite chart.** Two saved charts rendered as a combined
  bodygraph (visual overlay distinguishing each person).
- **Phase 8 — Transits.** View live transits over a saved chart.

---

## Useful pointers

- Live URL: <https://human-design-chart-app.orangeman7557.workers.dev/>
- Repo: <https://github.com/orangeman7557/human-design-chart-app>
- Validation case: orangeman7557's own chart, hard-coded as pre-fill in
  `src/routes/+page.svelte` for quick smoke-testing.
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
