# Backlog

Deliberately deferred decisions and candidate improvements. Not an ordered
roadmap — just a list of things we know exist and will want to tackle at
some point.

> Note: this project is being implemented with AI assistance. All code,
> comments, and documentation are produced collaboratively between orangeman7557 (the
> author and decision-maker) and an AI coding assistant.

## Decision log — License change (AGPL-3.0 → PolyForm Noncommercial 1.0.0)

**Date:** 2026-05-17.

**What changed:** the project's license moved from AGPL-3.0-or-later to
[PolyForm Noncommercial 1.0.0](./LICENSE). The previous third-party attribution
(astronomy-engine, MIT) is now recorded explicitly in [`NOTICE`](./NOTICE).

**Why:** AGPL was inherited from the original plan to use Swiss Ephemeris,
whose copyleft license forced the whole derived work to be AGPL. Since
Phase 1.1 the engine is `astronomy-engine` (MIT), so the AGPL obligation
disappeared and the licensing decision became free again. The author
re-chose on its merits: source-available so the calculation stays auditable,
noncommercial so the author retains the optionality of monetising later
without competing against a clone of the same code.

**Consequences accepted:**

- This is no longer "open source" in the strict OSI sense. It is
  source-available. GitHub will not show the green license badge; it will
  show "Other" or "View license".
- Public/forks/mirrors that present the project as "open source" should be
  corrected in language: it is *source-available, noncommercial-only*.
- The author is currently the sole copyright holder. **Any future external
  contribution requires a CLA (Contributor License Agreement)** before merge,
  or the author loses the ability to relicense or grant commercial
  exemptions. Until a CLA is in place, do not accept third-party PRs that
  add or modify code.
- Past releases (none yet tagged) would remain under the previous license
  forever once published. Since no release was tagged under AGPL, this is
  moot for now.
- Commercial exemptions can be granted case-by-case in writing by the
  author. There is no public mechanism for this yet; if the project gains
  traction, consider a "commercial license" page with a contact route.
- "Noncommercial" boundaries can be ambiguous in edge cases. The PolyForm
  text defines it precisely; the author is the one who enforces it.

**Files touched in this change:**
`LICENSE`, `NOTICE` (new), `README.md`, `package.json`, `BACKLOG.md`.

## Known bugs & pre-MVP tasks (updated 2026-06-11)

Fixed in the 2026-06-11 batch:

- ✅ **GRAVE — chart calculation error** (1984-01-30, 01:00, Madrid gave
  Projector instead of Reflector). Root cause: the mean lunar node — see
  "Lunar node: mean vs true" below, now resolved.
- ✅ **Tooltips unreachable on touch.** `[data-tip]` was `:hover`-only;
  now a tap toggles them (global `.tip-open` class; buttons excluded —
  there the tap is the action itself).
- ✅ **Touch interaction round:** tapping a centre on the bodygraph SVG
  now pins the highlight (it was mouse-only); the pinned/hovered channel
  or gate chip now shows its own selected style; on mobile the save
  button sits at title height with share/download below, level with the
  date-place line.

Fixed in the second 2026-06-11 batch (Phase 5 close):

- ✅ **Desktop image download rendered wrong.** Root cause: html-to-image
  copies the live node's computed margin into the clone, so `<main>`'s
  desktop `margin: 0 auto` centring became a ~190px left shift that pushed
  the content off-canvas and clipped it. The clone now gets `margin: 0`, a
  small uniform 12px padding (mobile side margins were a huge 48px), and a
  height recomputed without the footer band (the old bottom gap). PNG file
  name is now `nombre carta YYYY-MM-DD-HHMM-ciudad.png` (city = label up
  to the first comma).
- ✅ **Chart header typography.** Date-time-place subtitle left-aligns
  with the title text on both breakpoints; title↔subtitle gap tightened.
- ✅ **Form pre-fill removed.** The form starts empty; clicking the "r"
  of "Chart" in the home title (hidden shortcut) pre-fills the author's
  smoke-test data.
- ✅ **Mobile form centring.** Labels, field text and the unknown-time
  checkbox centred on mobile; the checkbox sits below the time field
  there (top-right of the field label on desktop, as before).

## Possible improvements (not scheduled, not part of Phase 5)

- **Place search should match partial names.** Not about prefixes per se:
  the finder must work when the user hasn't typed the full city name —
  "mad" should surface Madrid, "barce" Barcelona, "dusse" Düsseldorf.
  Today the full name is needed. Related groundwork in "Known tech debt"
  (Nominatim `/search` is geared toward full-form geocoding; a Photon
  attempt was reverted).
- **Mobile date field: allow typing the numbers.** Besides the calendar
  picker, some users find typing the digits more comfortable than
  scrolling years in the calendar.
- **Birth-place error messages placement.** Shown below the field they
  look cramped; consider showing them to the right of the "Lugar de
  nacimiento" label instead.
- **Unknown-hour slider should respect the current time.** Checking
  "Hora desconocida" should start the slider at whatever hour was already
  entered (not always 12:00); unchecking should keep the slider's hour in
  the time field.
- **Back arrow on the chart page.** The ← glyph looks small and
  off-centre inside its circle; fix the sizing/centring.

## Astronomical precision (HD variables: color, tone, base)

**Current decision:** the app uses
[astronomy-engine](https://github.com/cosinekitty/astronomy) as its
astronomical engine. Precision: ±1 arcminute.

**Implication:** good enough to compute **gates** (5.6°) and **lines** (0.9°)
without error. Insufficient to reliably compute the **deeper HD variables**:

- Color (~9 arcminutes per unit) — usable, occasional errors.
- Tone (~1.9 arcminutes) — the ±1 arcmin error is already 53% of the unit
  width; would frequently fail near boundaries.
- Base (~22 arcseconds) — the ±1 arcmin error is almost 3× the base width.
  Unusable.

**When we revisit:** if HD variables (color/tone/base) ever enter scope.
While the app only covers the classic bodygraph, the technical cost isn't
worth it.

**Options when the time comes:**

1. Try a different Swiss Ephemeris wrapper that plays nicely with Vite
   (`sweph-wasm`, `@fusionstrings/swiss-eph`).
2. Fork `swisseph-wasm` and fix its WASM-path issue with Vite.
3. Move the astronomical computation to a small server (a Cloudflare Worker
   with a custom binding, or a Vercel Edge Function) that can use Swiss
   Ephemeris without browser bundling constraints.

## Lunar node: mean vs true — RESOLVED 2026-06-11

**Decision (2026-06-11):** switched from Meeus' mean node to the
**osculating true node** — the ascending node of the Moon's instantaneous
orbital plane, computed in `ephemeris.js` from `astronomy-engine`'s
`GeoMoonState` (position + velocity rotated to ecliptic of date, node
taken from the orbital angular momentum). Same value as Swiss Ephemeris
`TRUE_NODE`, which is what reference HD tools use.

**Why:** exactly the failure mode anticipated here. The mean node deviates
up to ~1.75° from the true node; for 1984-01-30, 01:00, Madrid that put
the design South Node 0.7° inside gate 26, creating a false 26-44 channel
(Projector instead of Reflector). With the true node it lands in gate 5
and the chart is correctly a Reflector. Re-validated against the author's
reference chart: same gates everywhere, and the personality node lines now
match the reference tool too (16.5/9.5 where the mean node gave .6).

## Features already identified for future phases

Roadmap renumbered 2026-06-10: 3 visual polish → 4 unknown hour →
5 PNG export (MVP closes) → 6 online sync → 7 composite → 8 transits.

- **Phase 6 (planned):** optional cloud sync (local-only stays the default).
- **Phase 7 (planned):** composite chart. **Advanced composite** beyond the
  combined visual: relationship dynamics (electromagnetic channels,
  dominance, compromise, companionship).
- **Phase 8 (planned):** **transits** view over a saved bodygraph.
- **Centre names on the bodygraph.** Decided 2026-06-10: instead of a lone
  "G" identifier, all centres will get proper name labels at some later
  point. Not scheduled yet.
- **Textual interpretations** of type, authority, profile, centers, channels.
  Written from scratch or from free sources — never copied from Jovian
  Archive.
- **Multi-language activation**: the architecture is already multi-language
  ready; English translation pending once there's traction.

## Bodygraph polish remaining (Phase 3)

La rebase de geometría (2026-05-21) reemplazó todo el sistema de coordenadas:
viewBox `1058×1630`, vértices explícitos de centros y 64 posiciones de puertas
tomadas directamente del referencial (`docs/bodygraph-reference-coordinates.txt`).

The pre-close review items requested 2026-06-10 (stronger type highlight,
info cards upper-left of the graph, centres list upper-right with pointer
line, plus a second batch of chip/hover/home-screen adjustments) are
tracked as **block 3.E in TASKS.md**.

What still remains in backlog for visual fidelity:

- **Rounded corners on centre shapes.** Los triángulos y el rombo tienen
  esquinas afiladas. Redondear suavemente los vértices (SVG `stroke-linejoin`
  o paths con `rx`) daría un acabado más pulido sin alterar la geometría.
  Evaluar centro a centro — probablemente más relevante en Corazón y Bazo.
  *Out of Phase 3 by user decision.*

- **Presentación visual de la información básica.** El tipo ya se muestra
  como chips (las 5 opciones visibles, la activa marcada — Fase 3,
  2026-06-10). Pendiente por decisión del usuario: aplicar el mismo patrón
  a **autoridad** y **definición** más adelante.

- ~~Optional decorative human silhouette behind the bodygraph~~ — added
  2026-06-11 (faint primitive figure drawn behind the channels layer).

## Dependency conflict: wrangler v4 vs adapter-cloudflare

`wrangler@^4.0.0` (proyecto) choca con el peer dep `wrangler@^3.28.4` que
declara `@sveltejs/adapter-cloudflare@4.9.0`. Cloudflare Workers Builds usa
`npm ci` (estricto) y falla sin workaround.

**Solución temporal (2026-05-21):** `.npmrc` con `legacy-peer-deps=true`.

**Solución permanente cuando proceda:** actualizar `@sveltejs/adapter-cloudflare`
a una versión que declare soporte explícito para wrangler v4, o bajar wrangler
a `^3.28.4`. Revisar el changelog de `@sveltejs/adapter-cloudflare` antes de
subir de versión.

## Known tech debt

- Files from the first commit ended up with macOS permissions that prevent
  the AI assistant's tools from modifying them. Current workaround: delete
  and recreate. Root cause not yet investigated.
- A handful of older source files still carry Spanish code comments from
  Phase 0/1.1. They get translated to English as they're touched.
- The Nominatim integration uses the public endpoint without an explicit
  User-Agent. For low traffic this is fine; if the app grows, we should
  switch to a self-identifying header or a self-hosted Nominatim mirror.
- City autocomplete uses Nominatim's `/search`, which is geared toward
  full-form geocoding rather than prefix autocomplete. Short prefixes
  ("cuen", "barc") don't always surface the obvious match. A first attempt
  at switching to Photon (komoot) failed in deployment and was reverted.
  Future work: investigate the Photon failure (possible CORS or response
  shape mismatch) or try a different autocomplete-friendly geocoder.
