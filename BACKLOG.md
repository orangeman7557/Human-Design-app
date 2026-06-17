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

## Known bugs & pre-MVP tasks (updated 2026-06-13)

Open:

- **Compute effect retries ~8× on error.** When `computeChart` throws,
  the effect in `src/routes/chart/+page.svelte` re-runs and re-throws
  the same error about eight times (console noise only; the user-facing
  error message shows fine). Found in the 2026-06-13 QA pass.

Fixed in the 2026-06-13 batch:

- ✅ **Integration-circuit channels painted over highlighted halves on
  hover.** The opaque-`dimColor` dimming (commit `dcb09e9`) kept the
  single inactive→active two-pass z-order, so on the shared integration
  trunk (Q→Q2) a dimmed channel's opaque half painted over a highlighted
  channel's stretch, breaking its line on hover. Fixed by wrapping the
  two passes in an outer dim-first/kept-last loop (commit `196e9ea`);
  the non-dimmed view is unchanged. Repro was 19/11/1984, 12:00, Madrid.

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
- ✅ **Form pre-fill removed.** The form starts empty; clicking the final
  period of the home tagline (hidden shortcut) pre-fills the author's
  smoke-test data.
- ✅ **Mobile form centring.** Labels, field text and the unknown-time
  checkbox centred on mobile; the checkbox sits below the time field
  there (top-right of the field label on desktop, as before).

## Audit 2026-06-15 — improvement proposals (UNCONFIRMED)

External-style audit pass over what's built up to v0.1.1, across best
practices, maintainability/sustainability, distribution, clean code and UX
(it deliberately did **not** assess unbuilt future phases). **These are
proposals, not decisions.** The author has not confirmed most of them, so
they are parked here to triage later. The only item actioned from this pass
so far is the README refresh (stale status / phase numbering / `NODE_VERSION`
corrected).

### Confirmed as a project goal

- **Installable app (PWA install → TWA / Google Play).** Already part of the
  project's intent; recorded here so it's explicit, and it may deserve its
  own later phase. What's missing today:
  - The [manifest](./static/manifest.webmanifest) has **no icons**, and there
    are no favicon / apple-touch-icons in `static/`. Icons (≥192px and 512px)
    plus the existing manifest fields are the baseline for add-to-home-screen.
  - For the browser's "Install" prompt (and a quality TWA / Play build) a
    **minimal service worker** with a `fetch` handler is required — there is
    none today (verified: no service worker anywhere in the repo).
  - Open decision: a dedicated "installability / packaging" phase, or fold it
    into an existing later phase.

### Optional / potential

- **Offline support (POTENTIAL — may be dropped).** A service worker could
  cache the app shell so it runs without network. It's the same SW the install
  prompt needs, so the two are related but separable (you can be installable
  with minimal/network-first caching without committing to full offline).
  Author's note: offline is *potential / removable* and probably won't add
  much weight — that's correct: a shell-caching SW is light (it caches assets
  already downloaded; the SW file itself is tiny). **Caveat to resolve:**
  `CLAUDE.md` currently lists "works offline as a PWA" as part of the value
  prop, which is not true today — if offline is dropped, soften that wording;
  if kept, implement it. (`CLAUDE.md` not edited yet.)

### To evaluate — higher value

- **Automated tests for the calculation core.** None exist today. The whole
  value of the app is calculation correctness, and the core
  ([gates.js](./src/lib/hd/gates.js), [ephemeris.js](./src/lib/hd/ephemeris.js),
  [chart.js](./src/lib/hd/chart.js)) is pure functions with known
  input→output pairs — the easiest possible thing to test. A grave bug already
  shipped once (mean vs. true lunar node). *What "tests" means here, plainly:*
  a small script that computes a couple of known birth charts and checks the
  result still matches the expected gates / type — an automatic safety net so
  a future edit can't silently break the maths. A tiny `vitest` suite freezing
  the author's chart plus the ones already verified by hand would do it.

### To evaluate — distribution / docs

- Social / discovery metadata: Open Graph + Twitter Card tags in
  [app.html](./src/app.html) so a shared URL shows a title / description /
  image; favicon + touch icons (overlaps with installability above).
- Possibly prerender just the home route for SEO / first paint (the chart page
  stays SPA). Today both routes are `ssr:false` / `prerender:false`, so
  crawlers and link-preview bots see a near-empty shell.
- `CONTRIBUTING.md` + the CLA the license decision log already requires for
  external PRs; optional CSP / security headers via the Cloudflare adapter.

### To evaluate — clean code (low confidence; verify before acting)

- `await` on synchronous functions in [chart.js](./src/lib/hd/chart.js)
  (`dateToJd`, `getPlanetLongitudes`, `computeDesignJd` aren't async) — works,
  but misleading.
- Unused `activeChannels` parameter in `computeAuthority`
  ([chart.js](./src/lib/hd/chart.js)).
- Dangling JSDoc: [Bodygraph.svelte](./src/lib/components/Bodygraph.svelte)
  references `import('$lib/hd/chart.js').Chart`, but `chart.js` exports no
  `Chart` typedef, and the chart page types the chart as `any`. Define one
  `@typedef Chart` and reuse it.
- Label duplication (`TYPE_LABELS` / `TYPES` / `TYPE_ABBR`) across the home and
  chart pages; consolidate into one labels module (also needed for i18n).
- Stale comment in [+layout.js](./src/routes/+layout.js) (mentions
  "adapter-static" while the project uses adapter-cloudflare).
- Component size: home (~1006 lines) and chart (~1170) pages are large
  (~half is CSS); extracting subcomponents (saved-charts list, unknown-time
  slider, activations table) would help before Phase 6 / i18n.

### To evaluate — repo hygiene (low confidence; verify before acting)

- `src/lib/hd/bodygraph-geometry.js.bak` and
  `docs/bodygraph-reference-coordinates-backup.txt` are git-tracked manual
  backups (git history already covers this).
- `.wrangler/state/*.sqlite` (local miniflare cache) is git-tracked, and
  [.gitignore](./.gitignore) does not exclude `.wrangler/`. Add it and untrack
  the cache + backups.

### To evaluate — UX / accessibility (low confidence; verify before acting)

- Keyboard + screen-reader access to the rich hover / pin interaction: the
  channel, hanging-gate and "Definición" elements are
  `<span>` / `<div role="presentation">` with click/hover handlers and no
  keyboard path (the centres list already uses `<button>`, good). The place
  autocomplete isn't an ARIA combobox.
- Native `prompt` / `confirm` / `alert` for rename / delete / import (already
  known debt; clashes with the otherwise polished look).
- The dev shortcut (author pre-fill on the tagline period) ships in the
  production bundle.

### Contested / needs reproduction

- **Saved-chart reorder on touch.** The audit flagged HTML5 drag-and-drop as
  touch-unsupported, but the author reports it works on **Android 16 / Brave**.
  So it's likely a non-issue on Android Chromium; the historical gap is iOS
  Safari (no HTML5 DnD). **Verify on iOS specifically before treating it as a
  bug — may be nothing.**

### Performance (low confidence; measure first)

- Measure the production bundle, then consider lazy-loading rarely-first-used
  deps (`html-to-image` only on share; `astronomy-engine` / `luxon` /
  `tz-lookup` until a chart is computed) for faster first paint on mobile.
- The unknown-hour band computes 48 charts on the main thread
  ([+page.svelte](./src/routes/+page.svelte)); a web worker or chunked yielding
  would avoid potential jank (it's already sequence-guarded).

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
- ~~Unknown-hour slider should respect the current time~~ — done
  2026-06-13 (checking seeds the slider from the entered hour, rounded
  to the nearest half-hour; unchecking keeps the slider's hour).
- **Saved-chart list should show only "city, country".** The place label
  on each saved-chart chip currently includes the intermediate regions
  (province, autonomous community…); shorten it to city + country. The
  chart page header already does this trim — reuse it.
- **City autocomplete surfaces regions and counties as cities.**
  "Valencia" returns "Comunidad Valenciana, Comunidad Valenciana,
  España" (duplicated label) and "Valencia County, Nuevo México" among
  the suggestions. Filter or down-rank non-city entries and dedup
  labels.
- **Invalid-data error message mixes languages.** A chart with broken
  stored data shows "Fecha/hora inválida:" followed by Luxon's raw
  English message ("the zone … is not supported"). Nearly unreachable
  for real users; low priority.
- **Back arrow on the chart page (mobile).** The ← glyph looks small and
  off-centre inside its circle on the mobile version; fix the
  sizing/centring there.
- ~~Small, subtle clear-form button on the home screen~~ — done
  2026-06-12 (quiet "Borrar formulario" link under the CTA).
- **Estimated weight/influence per planetary activation.** Surface the
  commonly attributed relative weight of each activation (e.g. the Sun
  is said to weigh far more than any other body). Research the usual
  percentages before designing the UI.

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

## Phase 6 plan — AI handoff + element info (validated 2026-06-13)

Scope and approach agreed with the author. Not started; this is the plan
to resume from. Target version 0.2.0.

**Guiding idea.** The AI handoff is not a side feature next to the
explanatory text — it *is* the answer to the content problem. Writing
original text for every element (64 gates + 36 channels + the rest) is
both a legal risk and a large writing effort. So the app hosts only a
small, safe core of its own text and delegates depth to the user's own
AI. The AI never runs inside the app.

**Legal footing (verified 2026-06-13; not legal advice).** Keep three
layers apart:

- *System and facts* (your type is Generator; gate 34 sits in the Sacral;
  channel 34-57 links Sacral and Spleen) — NOT copyrightable. Facts and
  systems can't be owned, only their concrete expression. The app already
  exposes these freely.
- *Concrete expression* (the literal descriptions in Ra Uru Hu's
  books/courses, the exact official keynotes, the Rave I'Ching text) —
  Jovian Archive copyright. Do not copy or closely paraphrase; we write
  our own from scratch.
- *Trademarks* ("The Human Design System", "Rave BodyGraph™", "Rave
  Mandala™" — Jovian Archive Media, USPTO reg. 98217560). Nominative use
  is fine (describing what the app does); implying affiliation or
  endorsement is not.

So the legal path is: 100% original wording anchored in (a) the
mechanical facts and (b) genuinely free sources — the classic I Ching
(King Wen sequence; public-domain translations such as Legge 1899 are the
historical root of the 64 gates), plus general astrology/chakra/Kabbalah
concepts. Add a non-affiliation disclaimer in the app. Depth content goes
via handoff (generated by the user's AI, not hosted by us), which removes
the distribution risk. Using an AI to *draft* our own hosted text is fine
but must be reviewed (don't let it regurgitate protected text) and
rewritten in our own voice. If the app grows, a light legal review is
prudent.

**Handoff = deep links + copy, no API.** A server-side/API integration is
rejected: cost (the author would pay per user — breaks free/noncommercial),
key exposure (client-side SPA, no backend — an embedded key is
extractable), and it would force a backend. "Bring your own key" (BYOK) is
viable without a backend but niche; deferred as an optional future add-on.
Instead:

- "Copy prompt" is the always-present primary action (works with any AI,
  doesn't depend on third-party URL schemes, keeps the user in the app).
- Optional deep links that open the user's AI with the prompt prefilled:
  ChatGPT `chatgpt.com/?q=…`, Claude `claude.ai/new?q=…`, Perplexity
  `perplexity.ai/search?q=…`. Gemini has NO reliable native URL prefill
  (needs a browser extension) → falls back to "Copy".
- Remember the user's preferred AI (local setting).

The app's value here is building a good, chart-personalised prompt, e.g.
for a 5/1 profile: "Soy perfil 5/1 en Diseño Humano (línea 5 de
personalidad, línea 1 de diseño). Explícame en lenguaje sencillo qué
significa, cómo se manifiesta y qué tener en cuenta. No asumas que sé nada
del sistema."

**UX — approved 2026-06-15 (mockup v3).** Tapping a chip already pins the
highlight (graph emphasis + dimming + activation pills) and that stays. On
top of it:

- *Info affordance — a single "i" glyph*, not an icon per chip (per-chip
  icons would clutter, and there are many chips). It appears only on the
  selected element: superscript over the top-right corner of a chip, or in
  the top-right corner of a card (cajetín). Style: italic serif "i" in
  white (not amber). States: discreet white when selected → brighter white
  on hover/focus (affords click) → marked (solid white, inverted) while its
  panel is open.
- *Reusable panel* — bottom sheet on mobile, side panel on desktop; one
  component for every element kind, only the content changes. Reuses the
  existing hover/pin machinery. Holds: category eyebrow + element name +
  close; two short paragraphs of *general* info (schematic/informative
  tone); no visible disclaimer (we comply without stating it).
- *"Saber más" menu at the foot of the panel — two buttons in a row*:
  (1) "Copiar prompt" → expands the chart-personalised prompt + a Copy
  button; (2) "Abrir IA" → opens a picker (ChatGPT / Claude / Perplexity +
  a closing note: for other AIs, copy the prompt). Picking one opens it and
  stores it as preferred; the button then shows that AI's icon + name and
  opens it directly, with the chevron re-opening the picker to change it.
- *Open detail*: the AI icon — real brand logos (nominative use, like
  "share on…" buttons) vs. a generic AI glyph. Deferred to 6.C.

**6.A as built (2026-06-17) — final panel design.** The pilot (the Type
element) shipped after several refinement rounds; this is the pattern 6.B
replicates for the rest. It evolved from the mockup-v3 sketch above,
chiefly in the IA section:

- *Info "i"*: appears on hover (desktop) / tap (touch), on a chip or its
  card; only where content exists. Opens the panel; reused via
  `InfoDot.svelte`.
- *Panel* (`ElementInfo.svelte`): drawer from the right on desktop
  (≥680px), bottom sheet on mobile. Header (category + title) → info body →
  IA section.
- *Info body*: paragraphs in a capped-height scroll area (24rem mobile /
  26rem desktop) so the IA section below stays visible; scrollbar appears
  only on overflow. Generator ships with 3 paragraphs.
- *"Saber más usando IA" section*:
  - Inline angle selector right after the label (same size/typeface and
    grey as the label, amber chevron): "Sobre esta carta" / "Info general".
    Its menu floats up over the label so opening it doesn't shift the
    layout. Hidden when only one angle applies.
  - Two actions in a row: "Abrir IA" first (deep link; first tap opens the
    picker, then opens the chosen AI directly, chevron re-opens the picker)
    and "Copiar prompt" second (copies straight away, transient green
    "Copiado" feedback).
  - A subtle "Ver/editar prompt" text toggle reveals the editable prompt;
    both actions send/copy whatever that editable text holds.
- *Prompts* (`prompts.js`): `buildPrompts(kind, key, chart)` →
  `{ general, chart }`. Both impersonal ("Para un Generador con autoridad
  Sacral y perfil 3/5…") because the chart may belong to someone else;
  `chart` is null when the angle doesn't apply (e.g. a non-own type chip →
  general only).
- *Files*: `src/lib/hd/content/` (es.js + index.js), `src/lib/hd/prompts.js`,
  `src/lib/ai/handoff.js` (AIs Claude / ChatGPT / Perplexity, preference in
  localStorage), `src/lib/components/InfoDot.svelte` + `ElementInfo.svelte`;
  wired in `src/routes/chart/+page.svelte` (type chip + card).

**Architecture (multi-language ready from the start).**

- Content module, e.g. `src/lib/hd/content/` (Spanish first, shaped for
  i18n), separate from `constants.js` (mechanical facts). Each element:
  `{ id, title, description, [own keynote] }`.
- Prompt generator: templates combining an element + the user's chart data
  into the personalised prompt. Templates also i18n-keyed.
- Reusable panel component (e.g. `ElementInfo.svelte`).

**Content levels (so it's tractable).**

- Level 1 — core (~35 pieces, high value, doable): 5 types, 5 strategies,
  7 authorities, the 6 profile lines, 5 definitions, 9 centres.
- Level 2/3 — depth (64 gates + 36 channels): NOT written in full. Minimal
  own info (centre + public-domain I Ching root) + a "go deeper with your
  AI" button. The handoff carries the weight here.

**Sub-phases (one thing at a time; 0.2.0). Renumbered 2026-06-17 — the old
6.E (docs close) is now 6.F; a new 6.E covers activations info.**

- 6.A — Scaffolding + pilot: content module + reusable panel wired to ONE
  element kind (the Type) to validate the full flow end-to-end (info +
  copy + deep link) before writing more.
- 6.B — Core content (Level 1). **Built 2026-06-17; UX validated + merged
  to main, detailed text review pending (author).** Two info levels wired,
  each with its own "i":
  - *Concept* "i" on every card (Tipo, Estrategia, Autoridad, Perfil,
    Definición, Centros) — explains the category. Angle: general only,
    except **Centros**, which also offers "Sobre esta carta" (reads the
    chart's defined/undefined mix).
  - *Specific* "i" on the concrete value/chip: the active type chip, the
    Estrategia/Autoridad/Perfil/Definición values, and each Centro chip —
    explains that element, both angles. Profile is built on the fly from
    its two line descriptions (`getProfileInfo`).
  - **Only one "i" shows at a time** (refinement): hovering/tapping the card
    body shows the concept "i"; hovering/tapping an inner element shows only
    that element's "i". Driven by `cardReveal` vs `innerReveal` (mutually
    exclusive), set from a single `mouseover` per card that reads a
    `data-inner-key` on the inner element.
  - The value "i" sits **inline right after the value text** (and after the
    last line when the value wraps), vertically centred with it — not a
    superscript. A negative right margin cancels its advance so it reserves
    no horizontal space, and the value's `line-height` holds its height, so
    revealing it never shifts the layout. (A long value still wraps on its
    own on very narrow cards — that's the text, not the "i".)
  - All type chips (not just the active one) reveal an "i"; non-own types get
    the general angle only (`buildPrompts` returns `chart: null` for them).
  - Small refinements: the "i" + its circle shrank slightly (17px); the
    concept "i" tucks a touch closer to the card's top corner (top 4→2px, to
    offset the rounded-corner illusion); the angle selector's dropdown leads
    with a hint line ("Esta selección determina el prompt que se usa."); the
    prompt toggle reads "Ver/editar el prompt generado".
  - Content (`content/es.js`): own wording with `**bold**`/`*italic*`
    markers (rendered by `ElementInfo`), weighted toward energy management
    and decision-making. `prompts.js` extended to all kinds + `concept`.
  - `ElementInfo`: `elementKey` prop resets transient state when the element
    changes while the panel stays open; constant gap (margin, not padding)
    between header and the scrollable body so the title never touches the
    text; **angle memory** — the last "Sobre esta carta"/"Info general"
    choice is remembered (localStorage `hd:preferredAngle`) and reused as
    the default for the next panel that offers both angles (general-only
    panels show general without overwriting it); copy uses the Clipboard API
    with an execCommand fallback (note: both are blocked inside the sandboxed
    dev-preview iframe, so "Copiado" can't be shown there — it works on the
    real https app, as already validated in 6.A).
- 6.C — Handoff polish. **Built 2026-06-17 (text/UX review pending).** The
  provisional star glyph is replaced by **real brand logos** (one SVG path
  each, viewBox 0 0 24 24, `currentColor`) for Claude (the Anthropic burst —
  corrected after a first commit briefly used the "A" wordmark), ChatGPT
  (OpenAI) and Perplexity, carried as `icon` on each `AIS` entry in
  `ai/handoff.js` and rendered in the preferred-AI button and the picker
  list. AI list/order confirmed: Claude · ChatGPT · Perplexity (Gemini stays
  copy-only). The preferred-AI selector + remembered preference were already
  in place since 6.A and prompt templates were tuned in 6.B. Adding more
  deep-link AIs (Grok, DeepSeek, Copilot, Gemini-via-extension) stays
  possible later when feasible.
- 6.D — Gates & channels via handoff. **Built 2026-06-17 (text/UX review
  pending).** Level 2/3 info is **generated on the fly** instead of
  hand-written 64 + 36 times: `getGateInfo` / `getChannelInfo` in
  `content/index.js` compose `{ title, paragraphs }` from mechanical facts
  (centre via `CENTER_BY_GATE`, channel endpoints) + the **public-domain I
  Ching root** (King Wen hexagram name, Wilhelm/Vogelmann Spanish, from the
  64-name `iching` table in `es.js`; `getIchingName`); the depth goes to the
  AI prompt. `prompts.js` gained `gate`/`channel` kinds (both angles,
  impersonal) + concept `gate`/`channel`; `es.js` gained concept `channel`
  and `gate`. The "i" is wired to the **complete-channel chips, the
  hanging-gate chips** and the **section titles** "Canales completos" /
  "Puertas colgantes" (concept "i"), reusing the one-at-a-time reveal: each
  section is wrapped in a `.info-zone` presentation div (ids
  `channels`/`gates`) with `cardOver`/`cardClick`/`clearReveal`; each chip
  sits in a `.cc-wrap` with `data-inner-key="channel:g-g"`/`"gate:g"` and a
  `.dot-slot` "i" (same pattern as the centre chips); the concept "i" is
  inline in the `<h2>` (`.dot-h2`; `h2 { line-height: 1.35 }` reserves its
  height so revealing it never shifts the row). `openInfoFor` resolves
  `gate`/`channel` via the new generators.
  - **Open problem — full list of all 64 gates / 36 channels** (reach the
    info for ANY element, not only the active ones on the chart). Still
    **not built**. The author asked (2026-06-17) whether drawers could nest
    so in-text links open another element's info (e.g. channel 10-57's text
    links "puerta 10" → opens the gate-10 drawer). **Assessment / recommended
    path (agreed direction, not yet scheduled):** yes, feasible and it is the
    elegant solution — this is candidate (b) and it dissolves the browse-all
    problem. Build it as a **single drawer with a content stack**, NOT
    visually-stacked drawers: keep one `ElementInfo` instance and replace the
    single `infoData` with an `infoStack` (array) — opening an element
    *pushes*, a **back arrow next to the ✕** *pops*, the ✕ clears the stack.
    The existing `elementKey`-driven reset already swaps content in place, so
    the lift is small. Mechanics: extend `renderInline` (or the content) with
    a link syntax (e.g. `gate:10` / `channel:10-57`), delegate clicks on
    `.info-body` to push the target, and have the generators emit those links
    (a channel links its two gates, a gate links its channels/centre, a
    centre links its gates…). Caveats: keep links sparse so the text doesn't
    turn noisy; reset scroll per level; the ‹ back / ✕ pair is a known,
    legible pattern (fine on mobile bottom sheets). Visually-stacked drawers
    (multiple scrims/sheets piling up) are rejected as cluttered. Parked
    until the author greenlights.
- 6.E — **Activations info (new; may instead stay a possible improvement —
  decide when we get there).** Same pattern as everything else: a general
  "i" for the **Activaciones** section, plus an "i" for each element inside
  it — the Personality / Design column headers, the planets, and each
  individual activation (e.g. 30.3, 10.2). Ties in with the future
  per-planet weight/influence idea (see "Possible improvements") once that
  lands.
- 6.F — Legal disclaimer + docs close (formerly 6.E). Bump to 0.2.0.

Open question for 6.C: exact list of AIs offered as deep links. Confirmed
order: Claude, ChatGPT, Perplexity (Gemini has no reliable URL prefill →
copy). Add more popular AIs as deep links when feasible: Grok, DeepSeek,
Gemini (needs a browser extension), Copilot, etc.

**Future exploration (revisit after Phase 6).** The info panel carries two
kinds of content: *general* info (e.g. what the 5/1 profile means in the
abstract) and *chart-specific* info (the user's own profile read together
with their type, authority, etc.). Current plan: the panel text holds the
general info and the AI prompt carries the personalised reading. Fine for
now — worth exploring later whether to surface or highlight chart-specific
info directly in the app (not just via the prompt).

## Features already identified for future phases

Roadmap renumbered 2026-06-10: 3 visual polish → 4 unknown hour →
5 PNG export (MVP closes) → 6 online sync → 7 composite → 8 transits.
Reordered 2026-06-13: AI handoff + element info moves up to Phase 6;
online sync moves down to Phase 9.

- **Phase 6 (planned):** AI handoff + element info. Full plan validated
  2026-06-13 — see "Phase 6 plan" above. No-API handoff (deep links +
  copy), one reusable info panel opened by a single "ⓘ Saber más", own
  text for the core only, depth delegated to the user's AI, multi-language
  ready. Target 0.2.0.
- **Phase 7 (planned):** composite chart. **Advanced composite** beyond the
  combined visual: relationship dynamics (electromagnetic channels,
  dominance, compromise, companionship).
- **Phase 8 (planned):** **transits** view over a saved bodygraph.
- **Phase 9 (planned):** optional cloud sync (local-only stays the default).
- **Multi-language activation**: the architecture is already multi-language
  ready; English translation pending once there's traction.

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

- Channel **30-41** (half-channel edge case) still pending verification
  against a reference tool. Partial check 2026-06-13: the chart
  19/11/1984, 12:00, Madrid has 30-41 as a complete channel with Solar
  Plexus and Root defined and the channel painted — structurally
  consistent, but not yet contrasted with a reference chart.
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
