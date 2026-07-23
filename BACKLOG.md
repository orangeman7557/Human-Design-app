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

## Known bugs & pre-MVP tasks (updated 2026-07-06)

Open:

- ⬜ **Install link missing on mobile Chrome (betatester).** "instalar como app"
  shows on Mac Chrome but not on the phone (both Chrome). Only shows when
  `install.mode` is set (`beforeinstallprompt`, Chromium). Investigate Android
  install-eligibility criteria / timing, and confirm it was tested on the
  deployed HTTPS build (the SW isn't registered in dev). **Not reproducible
  locally — needs the deployed build + a real Android device.**

Triaged / fixed in the 2026-07-06 cleanup batch:

- ✅ **iOS: background scrolls behind the "acerca de" modal — FIXED
  2026-07-06 (pending device confirmation).** Classic iOS Safari scroll
  bleed-through. New shared Svelte action `scrollLock`
  (`src/lib/components/scroll-lock.js`): pins the body (`position: fixed`,
  preserving the scroll offset) while any overlay is open; ref-counted so
  stacked overlays (a dialog over the report) lock once. Applied to all five
  overlays: About, ReportBug, Dialog, InitialReport, ElementInfo. Module
  logic verified in-browser (lock / stacked / restore); the actual iOS
  bleed-through **needs confirmation on a real iPhone after deploy.**
- ✅ **PNG/PDF export title not centred — FIXED 2026-07-06.** Root cause:
  `html-to-image` copies each node's *computed width* into the clone, so
  `.title-wrap` measured with the "Informe" button still inside stayed too
  wide after the filter dropped the button from the clone — shifting the
  title left of centre (the `hdchart.app` brand line centres with
  `text-align` on a full-width block, so it was immune). Fix: `.capturing`
  now also hides the chrome (`.back`, `.report-btn`, `.actions`,
  `.img-actions`) in the live DOM during capture, so the copied widths are
  measured without it. Applies to the PNG and the PDF cover (same capture).
- ✅ **Profile drawer: 6 profile-line descriptions — was ALREADY DONE.**
  The six line texts exist in `content/es.js` (`profile['1'..'6']`, título +
  2 párrafos each) and `getProfileInfo` composes the profile drawer from
  them. Stale backlog entry; closed on verification.
- ✅ **PDF: stray gold paragraph at the end (author, 2026-07-06) — FIXED
  2026-07-06.** Introduced with the `hdchart.app` PDF header (2026-07-06
  batch): `paintBg` left the header's style (gold, 8pt) as jsPDF document
  state, so any paragraph that triggered a page break mid-flow drew its
  remaining words in gold — for the author's chart, the last "Vivir tu
  diseño" paragraph landed alone on the final page fully gold. `paintBg`
  now saves and restores font/size/colour around the header. Verified with
  a Node-generated PDF dump (final paragraph back to body grey).
- ✅ **PDF: bulleted lists were silently dropped — FIXED 2026-07-06.**
  Found during the same diagnosis: the report's "Tu tipo" section carries
  the five types as a `{ bullets }` paragraph, which the overlay renders as
  a `<ul>` but the PDF section loop skipped (only strings and subheads were
  handled). The PDF now renders bullets as indented lines with a gold dot.
- ✅ **PDF: cover top-aligned (author request 2026-07-06).** The cover image
  was vertically centred in the page, leaving a large empty band above the
  chart name on page 1 whenever the cover was width-constrained. It now
  sits top-aligned at 44pt, just under the `hdchart.app` page header.
- ✅ **Unknown-time checkbox resets the slider to 12:00 — FIXED 2026-07-07.**
  The 2026-07-06 pass only closed a secondary hole (browser back/forward form
  restoration repopulating the time *field* without input events, leaving the
  `time` state empty — the seed now falls back to the live input's value and
  tolerates single-digit hours / trailing seconds). The **primary case was
  still broken** (author repro 2026-07-07: enter 09:30, check the box → 12:00).
  Root cause found with in-browser logs: the `$effect(() => { if (unknownTime)
  time = sliderTime })` overwrites `time` with the slider's default (12:00) the
  instant `unknownTime` becomes true, and with `bind:checked` that effect ran
  *before* the `onchange` seed, so the seed read "12:00". Fix: the checkbox is
  now `checked={unknownTime}` + a manual `toggleUnknownTime` handler that seeds
  `sliderVal` from the entered hour BEFORE flipping `unknownTime`, so the sync
  effect finds `sliderTime` already pointing at the seeded hour. Verified
  in-browser: 09:30→09:30 (exact), 09:10→09:00, 09:20→09:30, 14:45→15:00,
  23:59→23:30 (no 24h overflow).
- ✅ **"instalar como app" inconsistent between home and chart (author,
  2026-07-03) — FIXED 2026-07-03.** Root cause: the chart page simply never
  rendered the footer install link — `install.mode` carries across SPA
  navigation fine. Fixed as item 2 of the 2026-07-03 audit (see below).
- ✅ **Personality/Design/Peso tooltips invisible on desktop (author,
  2026-07-03) — FIXED 2026-07-04.** Cause confirmed: the tip is an
  absolutely-positioned `::after` anchored above the trigger, but the header
  lives inside `.acts-scroll` (`overflow-x: auto`), which per spec also clips
  vertical overflow — anything above the scroller's box was cut off. Fix:
  the three header tooltips now open *downward* (over the table rows, inside
  the clip box), and the right-edge columns (Diseño/Peso) right-align theirs
  so they don't clip at the scroller's right edge. Applied to both the scoped
  `:hover` rules (chart page) and the global `.tip-open` touch rules
  (`app.css`). Verified with the `.tip-open` geometry in the browser.

Fixed in the 2026-07-02 batch (from the author's batch above):

- ✅ **Removed the type-% tooltips.** Dropped the `data-tip` on the type-chip
  `.pct` spans (`chart/+page.svelte`); the % still shows, just no hover tooltip.
- ✅ **Authority text: "la mente" added.** The "La autoridad" concept (`es.js`,
  3rd person) now reads "…pero **la mente no es de fiar para decidir sobre la
  propia vida**", matching the already-correct 2nd-person `report.authority`.
- ✅ **Ants analogy opening reworded.** The intro paragraph now starts "En cierta
  forma, podemos usar a las hormigas como símil: …" (`es.js` intro → `ants`).
- ✅ **Activations header "i" no longer overflows on mobile.** The column "i"
  (`chart/+page.svelte`) is now pinned absolutely inside `.side-head`: it overlays
  the Personality/Design colour dot (vertically centred) and rides as a small
  superscript over the "Peso" label, so revealing it never widens the cell or
  spills past the table's horizontal scroller. Verified at 375px and desktop.
- ✅ **Home form fields misaligned on iOS Safari (betatester).** iOS sized the
  native date/time inputs and the place autocomplete to their intrinsic width and,
  as flex items with `min-width:auto`, wouldn't shrink them, so the fields
  overflowed the form on a phone. Forced `width:100%` + `min-width:0` on every
  entry field (checkbox/range excluded) and `min-width:0` on the flex wrappers
  (`+page.svelte`, `CityAutocomplete.svelte`). Verified no regression in Chrome
  (375px + desktop); iOS not reproducible locally — **reopen if the betatester
  still sees it on the deployed build.** → REOPENED 2026-07-03: betatester still
  saw the overflow on the deployed 1.0.0 build (fix confirmed present in the
  live CSS, so it was insufficient on real iOS). Reinforced 2026-07-03:
  `-webkit-appearance: none` + explicit `box-sizing: border-box` on all entry
  fields strips the iOS UA sizing, plus a `::-webkit-date-and-time-value`
  min-height so empty date/time fields don't collapse without native
  appearance. **CONFIRMED by the betatester on device 2026-07-03** — no
  overflow. (Their confirmation screenshot looked edge-to-edge, but that was
  ~110% pinch-zoom cropping the margins; measured against their first
  screenshot the real 20px side padding was intact. The author asked for more
  side air anyway: `main` padding-inline bumped 1.25rem → 1.75rem same day.)

Fixed in the 2026-06-24 batch:

- ✅ **Compute effect retried ~8× on error** — found already resolved: the
  chart computation had since moved from a reactive `$effect` into `onMount`
  (a single run), so the retry loop no longer existed. Verified, no change
  needed.

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

## Functional gap analysis 2026-07-06 (vs. reference HD apps)

Functional/usage review of the app against the reference tools (myBodyGraph,
HumDes, Jenna Zoe's Align/My Human Design, the Spanish-language calculators),
focused on the app's two audiences: people new to Human Design and people who
save charts. Headline: the app is **above the free-tool baseline in
education** (initial report, drawers everywhere, own gate essences, AI
handoff) — but **one standard chart datum is genuinely missing** (the
incarnation cross). Items registered below in suggested priority order.

- ✅ **1. Incarnation cross — COMPLETE 2026-07-22 (names included).** The 192
  canonical names shipped, sourced from published Human Design material and
  **validated row by row against our own ephemeris**. The key insight that made
  it safe: a cross is fully determined by its Personality Sun gate and its
  angle, so `computeChart` can regenerate the whole (gate, angle) → quartet map
  independently of the table — 192 entries, no conflicts. All 192 sourced rows
  matched on the first run, and the check is now a permanent test
  (`src/lib/hd/cross-names.test.js`), so a mistyped row cannot ship silently.
  Structural facts worth keeping: there are **128 distinct gate quartets, two
  per Sun gate** — the left-angle and juxtaposition crosses share one quartet
  and the right angle has its own, which is why 128 quartets carry 192 names.
  Legal footing confirmed with the author: names and short titles are not
  copyrightable (same basis already agreed for the channel names, 2026-07-02);
  the only caveat noted was EU database right, which applies to lifting a whole
  compilation, not to using the names. Original entry below.
- 🟡 **1 (superseded). Incarnation cross — SHIPPED 2026-07-22 WITHOUT THE NAMES.** The datum
  is on the chart (`chart.cross = { angle, gates }`), with its own summary card,
  drawer and prompt, and a "Tu propósito" section in the initial report. What is
  **still open is the name table**: the ~192 named crosses × 4 angles (~768
  entries), which the author deliberately split into its own batch — sourcing
  and verifying 768 rows is more work than everything else in that batch
  combined, and a mis-copied row is something no test can catch. Until then the
  card shows the **angle** ("Cruz derecha") and the four gates, and the drawer
  **composes the meaning from the four gate essences** (grouped Personality /
  Design) — the same trick channels use in Phase 6.D, and it reads well on its
  own. When the table lands: it plugs into `content/<lang>.js` under `cross`,
  and `drawer.crossTitle` / `reportShell.purposeSubhead` already take a `{name}`
  placeholder, so nothing structural has to change. Legal footing = same as
  channel names (short titles, descriptive noncommercial use). Original entry
  kept below for the rationale.
- ⬜ **1 (original). Incarnation cross (the essential missing datum).** The only
  standard chart property the summary lacks — every reference calculator
  shows it (even the free Spanish ones), and for beginners it's the "life
  purpose" hook; the literature attributes ~70% of the chart's imprint to its
  four activations. Calculation is already done: the cross is the Sun/Earth
  gates of Personality and Design (in the activations table) plus the angle
  (Right/Left/Juxtaposition), derived mechanically from the profile. Missing
  pieces: the name mapping (192 named crosses, 768 variants), a summary row,
  and an "i" drawer + prompt like every other element. Legal footing = same
  as channel names (short titles not copyrightable, descriptive
  noncommercial use; decision 2026-07-02).
  **Report impact (noted 2026-07-21):** adding the cross means the initial
  report needs adjusting too — decide whether it gets its own section (the
  "life purpose" hook is a natural fit right after the profile) or a line
  inside an existing one. Don't bolt it on without re-reading the flow.
- ✅ **2. Signature + not-self theme as named summary fields — DONE 2026-07-22.**
  Shipped as **one "Señales" card with two values** (Alineamiento / Desalineamiento),
  each carrying its own "i" on top of the card's concept "i" — three drawers in
  the footprint of one. **Naming settled**: they are called *señales* /
  *signals*, and the canonical "firma" / "tema del no-yo" (signature /
  not-self theme) is mentioned **inside** the drawer, not on the card, exactly as
  the author asked. No per-signal content entry: `getSignalInfo(polarity, chart)`
  composes them from the chart's **type**, the way a profile composes from its
  two lines. The report's "Vivir tu diseño" signals bullet was reworked in all 5
  types × 2 languages to **name the two fields and link to their drawers**, which
  closes the duplication this entry warned about. Original entry below.
- ⬜ **2 (original). Signature + not-self theme as named summary fields.** Standard
  properties in the reference tools (satisfacción/frustración, paz/ira,
  éxito/amargura, sorpresa/decepción). The content already exists inside the
  type texts (the report's energy·trap·signals block); surface it as two more
  summary rows with their own "i" drawers. For a beginner this is the most
  *practical* tool in the system — the daily "am I in my signature or in my
  not-self?" barometer.
  **Naming (author, 2026-07-21):** "firma" / "tema del no-yo" are opaque jargon
  for a newcomer. Label them in plainer terms — something along the lines of
  *"señal de alineamiento"* / *"señal de desalineamiento"* (a symptom you can
  check yourself), keeping the canonical HD term as a secondary mention. Exact
  wording to be settled when the item is built.
  **Report impact (noted 2026-07-21):** the report's "Living your design"
  section already ends with a *signals* bullet (energy · trap · signals) that
  says essentially what signature/not-self say. When this ships, rework that
  section so the two don't repeat each other — the named fields should feed
  the signals bullet, not sit beside it.
- ✅ **NEXT AFTER PHASE M (author, 2026-07-21) — DONE 2026-07-22.** Items 1 and 2
  shipped together. The only remainder is the cross **name table**, now its own
  agreed next batch.
- ✅ **3. "¿Qué es el Diseño Humano?" entry point on the home — DONE 2026-07-23.**
  A discreet, centred link under the tagline (title-white, hover underline) opens
  a modal (`WhatIsHD.svelte`) with the initial report's **Part A** (what HD is +
  the ant analogy + the life experiment + the bodygraph) plus a closing paragraph
  inviting the visitor to fill the form. Route-bound so it survives prerender
  (`t(k,p,lang)` + `getReportSection(id,lang)`); in-text drawer links are stripped
  to plain text since the home has no drawer system. Original entry: all the
  educational material lived *after* calculating; someone landing on hdchart.app
  without knowing the system saw only a form and no reason to type their birth data.
- ✅ **4. iOS local-data loss (CRITICAL) — RESOLVED 2026-07-07.** Cookie
  vault + silent restore shipped; see the dedicated section below ("iOS
  storage eviction — investigation + mitigation plan"). Real-iPhone check
  pending after deploy.
- ⬜ **5. "Puerta del día" (gate of the day).** The cheap 80/20 of Phase 9:
  today's Sun gate + line, with the essence text and drawer the app already
  has (the ephemeris already computes longitudes; it's one extra call for
  "now"). The daily-transit angle is the most-cited beginner feature in app
  reviews and the only recurring reason to reopen the app. The full transit
  overlay stays Phase 9.
- ⬜ **6. Note/label per saved chart.** The saved list shows only name +
  type; with many charts (family, friends) a small free-text label ("madre",
  "pareja") keeps it scannable. Composite (Phase 8) is confirmed as the
  natural next feature for this audience (the "My People" pattern in other
  apps: saving others' charts leads to comparing them).

Consciously **not** added, validated against the app's scope: PHS/variables
(precision constraint already documented above + advanced material),
Dream Rave / Gene Keys / Penta / returns (other systems or audiences),
accounts-first cloud (local-first is the differentiator; Phase 10 stays
optional), and daily-tips/affirmations coaching content (the AI handoff
covers depth better and without hosting cost).

## iOS storage eviction — investigation + mitigation plan (2026-07-06)

**The problem.** Safari/WebKit (ITP) deletes **all script-writable storage**
(IndexedDB, localStorage, service worker registrations, Cache API) for a
website after **7 days of Safari use without the user interacting with that
site**. This applies to every website, not just trackers. The app's saved
charts live in IndexedDB, so an iOS user who saves family charts and comes
back a month later finds them silently gone. The counter advances only on
days Safari is actually used, so real-world loss takes longer than a calendar
week — but it is real, and it also wipes localStorage (AI preference,
love-sender flag) and the SW registration. (WebKit blog "Full Third-Party
Cookie Blocking and More", 2020.)

**Escape hatches investigated (2026-07-06):**

1. **`navigator.storage.persist()` — not a fix on iOS, still worth calling.**
   WebKit grants it heuristically (e.g. when running as a Home Screen web
   app) and it protects against *storage-pressure eviction*, but there is
   **no official statement that it exempts a site from the ITP 7-day
   deletion** (WebKit "Updates to Storage Policy", 2023; developer reports
   are mixed). On Chromium/Android it genuinely hardens persistence. Cheap
   insurance: call it once when the first chart is saved.
2. **Add to Home Screen — the real exemption.** Installed web apps are "not
   part of Safari": they keep their own days-of-use counter, which only
   advances when the app itself is used — so the cap effectively never fires
   for an installed app. Confirmed still available in the EU (Apple reversed
   the iOS 17.4 DMA removal on 2024-03-01). **Critical catch: the installed
   app's storage is ISOLATED from Safari's** — installing does NOT migrate
   charts already saved in the browser. The safe flow is: export (or
   re-save) → install → import inside the installed app.
3. **Server-set cookie vault — survives, but rejected by default.** HTTP
   cookies set via `Set-Cookie` are not script-writable storage and survive
   the 7-day deletion; a Worker endpoint could echo the saved charts into a
   long-lived, Path-scoped cookie (~4 KB ≈ 20-30 charts in share-link
   encoding). But birth data would transit the server, and `/privacy`
   explicitly promises "no cookies" — it contradicts the app's core stance
   for a partial gain. → **ACCEPTED by the author 2026-07-07**: losing saved
   charts after 7 days is not acceptable; implement the cookie vault
   (Path-scoped, server stores nothing, auto-restore on load when the local
   DB is empty) and update `/privacy` honestly. Mitigation copy must warn
   that clearing cookies/site data also deletes the charts, and keep JSON
   export as the manual backup.

**Mitigation plan — IMPLEMENTED 2026-07-07 (cookie vault as the primary fix;
full detail in TASKS):**

- ✅ **Cookie vault + silent restore (the fix, 2026-07-07).**
  `lib/db/backup.js` (deflate+base64url wire format) + `/api/backup`
  (`hdb1..hdb3` HttpOnly data cookies path-scoped to the endpoint so charts
  never travel with normal navigation; tiny `hdb` marker on `/`; 400-day
  Max-Age refreshed on every sync; empty POST clears; server stores nothing).
  Every chart mutation schedules a debounced sync; `ensureBackupRestored()`
  (kicked from the layout at boot) repopulates an empty DB from the vault and
  seeds the backup for pre-vault users. Capacity ≈ 3 cookies (~11 KB
  compressed, comfortably >100 charts); beyond that the POST answers 413 and
  the backup just goes stale (console warning only).
- ✅ **(b) Storage explainer — DONE 2026-07-07.** Second line under "las
  cartas se guardan solo en este dispositivo." + "saber más" modal
  (`StorageInfo.svelte`): local storage, the technical cookie + auto-restore,
  clearing cookies/site data deletes charts and copy, export/import as manual
  backup, install-as-app on iOS with the isolation caveat.
- ✅ **(c) `navigator.storage.persist()` on first save — DONE 2026-07-07.**
- ✖ **(a) One-per-session iOS save notice — DROPPED 2026-07-07 (author).**
  The silent restore makes a recurring warning noise; install promotion
  lives in the modal and the existing footer link.
- ✖ **(d) Export nudge — folded into the modal (2026-07-07).** No periodic
  nudge for now; the modal points at export/import.
- `/privacy` updated the same day: the app now sets exactly one first-party
  technical cookie; charts transit the server only on backup/restore and are
  never stored there.
- ⬜ **Post-deploy check on a real iPhone:** Secure cookie set on
  hdchart.app, marker visible, restore after clearing website data (keep
  cookies) — and the staging banner flow.

## Audit 2026-07-03 — full-app audit (triaged with the author)

Second external-style audit pass (the first was 2026-06-15), covering concept,
calculation, UX, PWA/offline, robustness, accessibility, code health and repo
hygiene. Headline: **no new grave bugs**; the calculation core is solid (the
type/authority derivation was re-verified by hand, including the subtle
self-projected case). The list below was triaged and accepted by the author
2026-07-03. One finding was **deliberately excluded** from the list:
`Bodygraph.svelte` computes activation state once at mount (not reactively
from the `chart` prop) — fine today, and transits/composite may well be new
pages rather than live updates of `/chart`, so nothing to prepare now.

### Decision log — text voice (2026-07-03)

**Rule:** the **initial report** (and its PDF) speaks in the **second person**
— it is a document addressed to the chart's owner, like a printed reading, so
the "tú" is correct even when someone else generates it. **Everything else**
(drawers, prompts, tooltips) stays **impersonal** — it is reference material
for the *viewer*, who may be looking at someone else's saved chart. Lines that
describe the on-screen chart's state say **"esta carta"**, never "tu carta".
Conscious exception: the report's closing handoff prompt is first person
("Según el Diseño Humano soy…") because it lives inside the document frame.
This resolves the inconsistency found in the gate/channel state codas
(`content/index.js`), which were second person.

### High

- ✅ **1. Tests: freeze reference charts for the untested types/authorities —
  DONE 2026-07-03.** Six self-frozen regression anchors added to
  `chart.test.js` (headline values + centres + channels), covering Generator,
  MG and Projector and the sacral / splenic / ego / self-projected / mental
  authorities — with the two externally-validated charts, all 5 types and all
  7 authorities are now pinned. 22/22 tests. (The anchors freeze current
  behaviour; only the two original charts are externally verified.)
- ✅ **2. "instalar como app" link missing from the chart page footer — DONE
  2026-07-03.** Root cause of the registered inconsistency bug confirmed by
  code: the chart footer simply never rendered the `{#if install.mode}` block
  the home has — not a `beforeinstallprompt` timing issue. Added the link with
  the same handler (native prompt on Chromium, iOS instructions dialog),
  first in the footer like the home. Verified in the browser by dispatching a
  synthetic `beforeinstallprompt`.
- ✅ **3. Update CLAUDE.md to reality — DONE 2026-07-03.** §1 now describes
  the shipped installability + basic offline; §3's tree gained
  `service-worker.js`, `pwa/install.svelte.js`, `report-pdf.js`, `privacy/`,
  About/ReportBug and the static assets; §4 records the text-voice rule and
  the real test coverage; §6 gained the Phase L summary and drops the stale
  "text review pending" notes (gate closed 2026-07-02).
- ✅ **4. Gate/channel state codas → impersonal ("esta carta") — DONE
  2026-07-03.** The 6 coda templates in `content/index.js` now follow the
  voice rule ("En esta carta forma parte…", "No está activa en esta carta…",
  etc.). Verified in the browser for the three gate states and a complete
  channel.

### Medium

- ✅ **5. Validate + dedupe in `importCharts` — DONE 2026-07-03.** Records
  missing date/time/timezone are rejected (`invalid`), records identical to an
  already saved chart (same name + birth data) are skipped (`duplicates`), and
  the import dialog reports all three counts. Verified in the browser:
  re-importing the same file imports 0.
- ✅ **6. Autocomplete service errors + geometry guard — DONE 2026-07-03.**
  A failed Photon call now shows "No se pudo buscar. Revisa tu conexión…"
  instead of the misleading "Sin resultados"; features without real
  coordinates are dropped in `geocoder.js` (NaN coords would make `tzLookup`
  throw on pick).
- ✅ **7. Modal focus management + autocomplete keyboard nav — DONE
  2026-07-03.** New shared Svelte action `focusTrap`
  (`src/lib/components/focus-trap.js`): moves focus into the overlay on open,
  cycles Tab/Shift+Tab inside it, restores focus to the opener on close.
  Applied to ElementInfo, InitialReport, About, ReportBug and Dialog (whose
  own input/confirm focus still wins). The place autocomplete gained
  ArrowUp/Down + Enter + Escape handling and combobox/listbox ARIA
  (`aria-expanded`, `aria-activedescendant`, `role="option"`). Verified in the
  browser (focus in/restore on About and the gate drawer; arrow+Enter picks
  Madrid). Keyboard access for the channel/gate *chips* remains open under the
  2026-06-15 a11y item.
- ✅ **Full text & prompt improvement pass with Fable — DONE 2026-07-04.**
  Audit presented 2026-07-04 and the approved batch implemented the same day
  (see TASKS latest entry): typo/wording fixes across `es.js`, everything in
  Spanish (type names, Personalidad/Diseño columns), the impersonal-voice rule
  enforced in concept/planet/column drawers (the initial report keeps "tú"),
  schematic facts blocks in gate/channel drawers, closed-set schemas at the
  end of value drawers, richer prompts (definition in the chart descriptor,
  gate activations, "de forma práctica y aterrizada"), plus the header
  tooltip fix and assorted UI polish. The mixed-language invalid-data error
  under "Possible improvements" remains open (not part of this batch).

### Low

- ✅ **9. Sanitise `imageFileName()` — DONE 2026-07-03.** `safeFilePart`
  replaces filename-illegal characters (`/ \ : * ? " < > |`) with a dash in
  the chart name and city before composing the PNG/PDF filename.
- ✅ **10. Share-image errors — DONE 2026-07-03.** Image/PDF export failures
  now land in their own `shareError` state with accurate messages ("No se pudo
  compartir la imagen / descargar la imagen / generar el PDF: …") instead of
  reusing `saveError`'s "No se pudo guardar:" prefix.
- ✅ **11. `/chart` without history — DONE 2026-07-03.** The back arrow falls
  back to `goto('/')` when there is no history to go back to, and the "No hay
  datos de nacimiento" error state shows an explicit "Volver al formulario"
  link.
- ✅ **12. Saved-charts list date — DONE 2026-07-03.** Now formatted like the
  chart subtitle ("13/03/1984, 09:30"), not raw ISO.
- ✅ **13. "Mental (sounding board)" label → Spanish — DONE 2026-07-03.** Now
  "Mental (ambiental)", matching the app's own authority texts ("mental/
  ambiental", "autoridad ambiental") in `es.js`.
- ✅ **14. iOS non-Safari install affordance — DONE 2026-07-03.** `install.mode
  = 'ios'` now covers every iOS browser (all WebKit; iOS ≥16.4 offers Add to
  Home Screen from Chrome/Firefox/Edge too), and the instructions dialog says
  "el menú de compartir del navegador" instead of naming Safari. Not
  verifiable locally — **check on a real iPhone after deploy.**
- ✅ **15. Backup files untracked — DONE 2026-07-03.**
  `bodygraph-geometry.js.bak` and `docs/…-backup.txt` removed from git
  (history keeps them); `.gitignore` gained `*.bak` + the docs backup.
- ✅ **16. Security headers — PARTIALLY DONE 2026-07-03.** New
  `static/_headers` with the safe baseline (`X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy`).
  Note: Cloudflare applies `_headers` to **static assets only** (the
  prerendered `/` and `/privacy`; `/chart` runs through the worker), and
  SvelteKit's service worker had to stop precaching it
  (`kit.serviceWorker.files` filter in `svelte.config.js` — Cloudflare
  consumes `_headers` without serving it, so precaching would 404 and abort
  the SW install; verified excluded in the build). **A real CSP is deferred**:
  it needs SvelteKit's `kit.csp` (hashed inline scripts) + careful testing
  against the worker — do it as its own task, not blind.
- ✅ **17. Offline navigation fallback — IMPROVED 2026-07-03.** The SW now
  precaches `/privacy` alongside `/`, and offline navigations to any other URL
  **redirect to `/`** instead of serving the home HTML under a foreign URL
  (e.g. `/chart`). Known remaining limitation: offline, the chart itself isn't
  restorable by URL — the user lands on the (fully functional) home. Not
  verifiable in dev (the SW only registers in production builds) — **smoke-test
  offline after deploy.**
- ✅ **18. Install-prompt dismissal — REVIEWED 2026-07-03, no change.** Hiding
  the link after a dismissed prompt matches platform guidance: the captured
  `beforeinstallprompt` event cannot be reused after `prompt()`, and Chromium
  re-fires it on a later visit (the listener then re-shows the link).

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
  - ~~Open decision: a dedicated "installability / packaging" phase, or fold it
    into an existing later phase.~~ Resolved: installability shipped with
    Phase L (1.0.0); Google Play via TWA is now its own **Fase P** (decided
    2026-07-06, after the multilingual Fase M). The Apple App Store is
    deliberately deferred — the author won't pay the ~99 €/year developer fee
    unless the app proves traction.

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

- ✅ **Automated tests for the calculation core — DONE 2026-06-24** (a
  `vitest` suite, `npm test`: the two reference charts frozen — Reflector +
  author — plus `longitudeToGate` and `cityCountry`, and a dedicated guard
  for the mean-vs-true lunar-node regression). Original rationale kept below.
  None existed before. The whole
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

- Social / discovery metadata: Open Graph + Twitter Card tags — **home done**
  (Phase L, step 2) and **`/chart` share links done 2026-07-05** via
  [`src/hooks.server.js`](./src/hooks.server.js), which rewrites the `/chart`
  `<head>` at the Worker (scraper-visible) with the shared chart's name + type
  (marker `<!--%og%-->` in [app.html](./src/app.html)). **Deferred**: a
  *per-chart preview image* (the bodygraph) — would need server-side SVG→PNG
  rendering at the edge (Workers + a rasteriser, or a satori-style OG image
  route); today every chart link uses the brand `og-image.png`.
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
- ✅ **Replace native `prompt` / `confirm` / `alert` with in-app dialogs —
  DONE 2026-06-24.** A promise-based controller (`dialog.svelte.js`) + one
  themed host (`Dialog.svelte`) mounted in `+layout.svelte`, with a native
  fallback if no host is present. Wired to the save-chart name (chart page)
  and rename / delete / import (home). Supports prompt / confirm / alert
  modes; the delete confirm uses the danger style. (Author request,
  2026-06-18.)
- ~~The dev shortcut (author pre-fill on the tagline period) ships in the
  production bundle.~~ Resolved: the shortcut was removed at the 1.0.0
  launch (2026-07-03).

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

- ⬜ **Initial report: scroll-spy the table of contents (author, 2026-07-23).**
  As the reader scrolls down the report, highlight the TOC chip of the section
  currently in view, so the index doubles as a "you are here" marker. Today the
  TOC (`nav.toc` in `InitialReport.svelte`) only jumps to a section on click; it
  never reflects the scroll position. Implementation notes for when it's picked
  up: an `IntersectionObserver` over the `section[id^="report-"]` elements inside
  the scroll container (`bodyEl`), tracking the top-most visible section and
  toggling an `active` class on the matching `.toc-chip`; watch the handoff
  section at the end and the smooth-scroll already wired to the chips. Keep it
  cheap — one observer, not a scroll listener.

- ⬜ **"Guía práctica de esta persona" — a second, jargon-free report (author,
  2026-07-21).** A report aimed at somebody who knows nothing about Human Design
  *and doesn't care to*: no HD vocabulary on the surface, just clear, usable
  guidance about the person whose chart it is. Suggested sections: tendencies,
  strengths, weaknesses/blind spots, how they communicate, what they need,
  how to deal with/work with them, what drains them, and — when the chart is a
  child's — how to raise/educate them. It's a **different product from the
  initial report**: the initial report teaches the system and speaks to the chart
  owner (2nd person); this one is a practical dossier *about* a person, for
  whoever is reading (impersonal), and would work as the natural thing to share
  with a partner, a manager or a parent.
  Notes: the substance is largely derivable from what the app already computes
  (type · strategy · authority · profile · definition · defined vs open centres),
  so it's mostly a **content-writing** job on top of the existing engine, plus a
  second `buildReport`-style assembler. Decide whether it ships as its own
  overlay/PDF next to "Informe" or as a mode of it. Watch the child variant: it
  should read as parenting guidance, not diagnosis.
- ⬜ **Include a chart link in the prompts, backed by machine-readable chart
  data (requested 2026-07-08).** Add to the generated AI prompts a URL to the
  chart so that, when the user takes the prompt to their own AI, the AI can
  fetch the full chart data from that URL instead of relying only on what the
  prompt spells out. This gives the assistant every datum of the chart
  (activations, centres, channels, gates, profile, definition…) without
  bloating the prompt. **Implication — the web has to serve the data in a form
  an AI can consume:** a chart URL that returns the chart as **JSON** (or
  another agreed machine format) when requested, alongside the normal HTML
  view. Open questions to design when picked up:
  - **Where the data comes from.** The chart is computed client-side from the
    birth data carried in the share link (`buildShareUrl`); a bot fetching the
    URL runs no JS, so either (a) a Worker endpoint (e.g. `/chart.json?…` or a
    content-negotiated `/chart`) recomputes the chart server-side from the same
    encoded birth data and returns JSON, reusing the `computeChart` core, or
    (b) the prompt links to a dedicated data endpoint rather than the HTML page.
    Note `hooks.server.js` already rewrites the `/chart` `<head>` at the Worker
    for OG tags — the same server-side entry point could emit JSON.
  - **Privacy.** Birth data would then be reconstructable server-side on
    request (today the Worker only reads the encoded params to build OG tags,
    stores nothing). Keep the "server stores nothing" stance, and review
    `/privacy` wording — this is a real change in what the server can see.
  - **Stability of the format.** A documented, versioned JSON schema so a
    linked AI (or third-party tool) can rely on it.
  - **Discoverability.** Whether to hint the JSON alternative via a
    `<link rel="alternate" type="application/json">`, an HTTP header, or just
    the prompt's URL text.

- ✅ **Review the English translation for naturalness (author, 2026-07-21) — DONE 2026-07-21 (two passes).**
  The Phase M translation is complete and accurate, but the author flagged that
  parts read as *translated* rather than *written in English* — grammatically
  fine, yet not how an English speaker would put it. Example given:
  > "As in the ant simile, the Human Design types describe the different ways of
  > being designed to use energy. None is better, and the whole works precisely
  > because we are not all the same. Just as the colony works because every role
  > exists, the human collective needs all the different kinds of person."

  Diagnosis: the pass stayed too close to the Spanish sentence structure
  (calques like "the ant simile" for *el símil de las hormigas*, "the whole
  works" for *el conjunto funciona*, "kinds of person"), instead of re-expressing
  the idea. The project's priority is the **user, clarity and a certain warmth**,
  so the English should be *adapted*, not mirrored: shorter sentences, natural
  idiom, contractions where the tone allows.

  Scope when picked up: a read-through of `hd/content/en.js` (concepts, types,
  and above all the initial report — the longest prose) plus `i18n/ui/en.js`.
  Highest value first: the report's Part A (intro, ants, experiment, collective),
  which is what a newcomer reads first. Best done as a **rewrite in English from
  the meaning**, not a diff against the Spanish.
  **Done in the first pass (2026-07-21):** the report's Part A (intro, ants,
  bodygraph, conditioning, experiment), the collective comparison and its
  lead-ins, the ten concept drawers, the five type drawers and the per-type
  practical block were **rewritten from the meaning** rather than edited against
  the Spanish. The author's example paragraph now reads "Back to the ants. …".
  Capitalisation was also settled: English uses Title Case (see
  docs/fase-m-multilingue.md); "Solar Plexus" and friends are fixed.

  **Second pass (2026-07-21):** the rest was rewritten too — the strategy /
  authority / profile / definition / center drawers, their second-person bodies
  inside `report`, the 36 channel essences and the 64 gate essences. Two things
  were fixed along the way: the drawers had drifted into second person (they are
  impersonal by rule, since the chart on screen may be someone else's), and the
  gate essences were composed as "Gate N is …" which broke grammatically once
  rewritten — they now open with their own statement.

  **Terminology settled:** "Complete Channels" stays (author, 2026-07-21).

  What remains is only the author's own read-through; there is no known block
  still translated literally.

- ⬜ **Bug glyph at the foot of every explanatory text (author, 2026-07-22).**
  Put the "report a bug" bug icon — **icon only, no label, very discreet, bottom
  right** — at the end of the explanatory bodies (element drawers, and probably
  the initial report's sections), so whoever wants to send feedback *about a
  text* finds a route without hunting for the footer link. Findable on purpose,
  not advertised: the point is that someone already looking for it succeeds.
  Notes for when it's picked up: `ReportBug.svelte` is already a modal opened
  from the footer on both routes, so this is a second trigger for the same
  component, not new machinery — but it will need to sit *above* the drawer in
  the stack, and it would be worth passing which text the reader was on (element
  kind + key) as context so the report says what it is about.

- ✅ **Element drawer: pin the "Saber más usando IA" block to the bottom, and let
  the user widen the drawer (author, 2026-07-22) — DONE 2026-07-23.** Both parts
  shipped in `ElementInfo.svelte`:
  1. The panel is now a bounded flex column (`overflow:hidden` + info body
     `flex:1; min-height:0`): the IA section is **pinned at the bottom** and the
     text fills the space up to it (on desktop and mobile). When "Ver/editar el
     prompt" opens, the body **shrinks and scrolls** (text pushed up, like mobile)
     and the textarea is capped (`max-height:40vh` + its own scroll), so a long
     prompt never pushes the layout off-screen.
  2. A **user-resizable drawer width on desktop** via a left-edge drag handle,
     clamped 340–820px and **remembered** in localStorage (`hd:drawer-width`).
     Mobile is unaffected (bottom sheet, no handle).

- ⬜ **PDF report on a white background instead of dark mode (requested
  2026-07-06).** The initial-report PDF (`report-pdf.js`) currently mirrors the
  app's dark theme (dark page + light text, and a dark cover image). Consider a
  light variant — white page, dark text — which prints better and reads more
  like a conventional document. Note the dependency: the cover image is captured
  from the (dark) chart view, so a white PDF would also need a light capture (or
  a reworked cover) to avoid a dark block on a white page. Not to implement now.

- ✅ **`hdchart.app` mark on the downloaded PNG and PDF — DONE 2026-07-06.**
  A discreet gold `hdchart.app` header sits at the very top of both exports. In
  the **PNG** it's an export-only `.export-brand` line in `chart/+page.svelte`,
  shown while `.capturing` but hidden under `.pdf-shot` (so it isn't baked into
  the PDF cover twice). In the **PDF** it's a native header drawn centred at the
  top of every page in `report-pdf.js`'s `paintBg`.

- ✅ **Share button in the initial report → link straight to the report — DONE
  2026-07-06.** A gold share button sits to the left of the "PDF" button in
  `InitialReport.svelte`'s header (new `onshare` prop). It calls
  `shareReportLink` in `chart/+page.svelte`, which shares the same
  `buildShareUrl` link plus `&r=1`; on arrival `onMount` reads `r=1` and sets
  `reportOpen = true`. `hooks.server.js` unchanged.

- 🟡 **Clickable bodygraph — centres DONE 2026-07-06, gates pending.**
  Clicking a **centre shape** in the bodygraph now pins its highlight AND
  opens its element drawer (`onSvgCenterClick` in `chart/+page.svelte` calls
  `openInfoFor('Centro','center',key)`); verified in-browser (Throat →
  "Garganta" drawer). **Pending: the gate numbers** as click targets opening
  their gate drawers (author decision 2026-07-06: gates deferred for now),
  plus hover/tap affordance + keyboard access to match the existing chips.
  Deliberately **not channels**: the integration channels (10-20, 10-34,
  10-57, 20-34, 20-57, 34-57) overlap visually, so a click on that cluster
  can't be resolved to a single channel without extra UI — skip them.
  (Consolidates the duplicate "Click a centre or gate…" entry from
  2026-07-02, removed.)

- ⬜ **Per gate.line texts (64×6 brief notes; requested 2026-07-04).** Clicking
  an activation's line number already opens the generic line (1-6) drawer
  (reusing the profile-line content) and its AI prompt ("la línea N del
  perfil") is already built. The enrichment: write a short own-voice note for
  each **gate.line** combination (64 gates × 6 lines = 384 brief texts) so the
  line drawer, when reached from a specific activation, can show that gate's
  line rather than the generic archetype. Scoped small on purpose — 2-3
  sentences each, no new prompt needed. Would live in `content/es.js` keyed
  `gateLine[gate][line]`, consumed by a chart-aware line drawer.

- ✅ **Done 2026-07-04 — "Bodygraph" label + drawer, no type percentages,
  mobile type-chip alignment.** The chart page now shows a **"Bodygraph"**
  label above the graph with its own concept "i"/drawer (`concept.bodygraph`
  in `content/es.js`): impersonal version of the initial report's "El
  bodygraph" section plus a short defined-vs-open explanation, with "centros",
  "canales" and "puertas" as in-text links to their drawers. Desktop centres
  the label over the Head centre (extra top gap on the graph); mobile pins it
  to the graph's empty top-left corner (`height:0`, absolute) so it doesn't
  push the graph down. The **population percentages were removed** from the
  type chips. On mobile the selected (taller) type chip was vertically
  off-centre in its row — fixed with `align-items: center` on `.type-list`.

- ✅ **KV: staging counters split from production — DONE 2026-07-06 (via key
  suffix, no new namespace).** Originally planned as a separate
  `hd-love-staging` namespace (blocked: the dashboard hung when creating
  namespaces). Resolved differently: `env.staging` in `wrangler.jsonc` sets
  `LOVE_KEY_SUFFIX="-staging"`, and `/api/love` appends it to both keys — so
  staging reads/writes `love-clicks-staging` / `love-senders-staging` inside
  the **same** `hd-love` namespace and never touches the real counters.
  Creating a separate namespace is no longer needed. Not verifiable locally
  (no platform bindings in dev) — **check on staging.hdchart.app after
  deploy** (its About counter should start from 0).

- ✅ **Love counter: track unique senders — DONE 2026-07-06.** Implemented as
  sketched, inside the **existing `hd-love` namespace** (second key
  `love-senders`, no new namespace needed): the client keeps a "this device
  already sent love" flag in `localStorage` (`hd:love-sent`) and includes
  `first: true` in its first batched POST; the endpoint increments the
  senders key (clamped to +1 per request, same junk-proofing as `n`) and GET
  returns both keys. The About modal line now reads **"1.234 amores
  recibidos de 56 queridos humanos."** (singular-aware; falls back to
  "N amores recibidos." while senders is 0/unknown). Approximate by design:
  counts devices/browsers, not true humans. Verified in-browser with a
  stubbed API; **check against real KV after deploy.**

- ✅ **Gate drawers: list the associated channel(s) and harmonic gate(s) —
  was ALREADY DONE** (jul 2026 text-audit batch): the schematic `facts`
  block in every gate drawer lists Centro / Canal(es) / Puerta(s)
  armónica(s) as tappable chips, plural-aware (`gateFacts` in
  `content/index.js`), and centre drawers likewise list their channels and
  gates (`centerFacts`). Stale backlog entry; closed on verification.

- **Centre labels on the bodygraph (requested 2026-07-01).** Make the link between
  the **Centros** chips and the graph explicit: either render each centre's name
  **on/over its shape** in the bodygraph, or draw an **elegant connector line** from
  each centre chip to its figure. Today the chip↔shape relation only shows as the
  temporary amber pointer on hover/tap. Watch for clutter — the shapes are small and
  already carry their gate numbers, so labels likely want to sit just outside each
  shape (or appear on hover) rather than inside.

- ✅ **Gate & channel drawer: "Sobre esta carta" angle for any element, with a
  state-aware prompt — DONE 2026-07-01.** Reversed the Phase 6.D decision that the
  chart angle only showed when the element was active. Now the "Saber más usando IA"
  section offers **both angles ("Sobre esta carta" / "Info general") for every gate
  and channel**, and the chart-angle prompt names **how the element sits in this
  chart**: a gate as *forma parte de un canal completo* / *está colgante (activa sin
  la otra mitad de su canal)* / *no está activa*; a channel as *está completo* /
  *medio canal (solo una de sus dos puertas)* / *no está activo*. So even a gate or
  channel reached through the full index (not on the chart) gets a useful reading.
  Built by exporting `gateState` and adding `channelState` in `content/index.js`,
  and rebuilding the `gate`/`channel` chart prompts in `prompts.js`
  (`gateChartSubject` / `channelChartSubject`). Verified in the browser for the
  complete / hanging / inactive gate cases and complete / half / none channel cases.

- **Full-app text review (in progress — first pass applied 2026-07-02).** A pass
  over **all** user-facing copy in the app, with special attention to the
  **initial report** (Parte A/B, the "Tú eres un X" sub-headings, the centre
  cards, the «Saber más» prompt) and the **64 gate essences + channel codas**.
  Workflow: the copy is exported to a two-column Word (Original | Editada) via a
  `docx` generator; the author edits the right column offline and hands it back;
  the edits are diffed against a saved manifest and re-applied to `es.js` /
  `index.js`. The working files live outside the repo in `revision-textos/`
  (`Revision-de-textos-HD.docx` + `revision-textos.manifest.json`) — regenerate
  the manifest deterministically if it's ever lost.
  - **First pass (2026-07-02):** 108/598 rows edited → 72 substantive `es.js`
    edits + 4 in `index.js` + 2 in `chart/+page.svelte`. Decisions taken when
    re-applying: (a) Word's **curly quotes “”** (autoformat) reverted to the
    repo's **«»**; quote-only rows left untouched. (b) Global rename **"Plexo
    Solar" → "Plexo solar"** (author changed even the centre title/labels) and
    **`[garganta]` → `[Garganta]`** (8 link labels), applied app-wide for
    consistency. (c) Two bracketed instructions resolved as links: *bodygraph* →
    `section:chart` (report intro), "perfil" → `concept:profile` (activations
    concept — first in-text use of the `concept:` link kind, which the resolver
    already supports). The handoff closing line was standardised to «…puedes
    utilizar la opción de «saber más usando IA».».
  - Still a working draft: more rounds may follow. Supersedes the per-phase
    "author's text review" notes for 6 and 7.

- ~~**Place search should match partial names.**~~ — done 2026-06-24.
  Switched the geocoder from Nominatim to **Photon** (a typeahead index): a
  prefix like "madr" now surfaces Madrid, "stuttg" Stuttgart. The earlier
  Photon revert was caused by sending `lang=es` (HTTP 400); that param is now
  omitted.
- ✅ **Mobile date field: allow typing the numbers — DONE 2026-07-06 (own
  pass, author's request).** The native `type=date` input (whose Android
  picker leads with a ~100-year scroll) is replaced **on all viewports** by
  `DateField.svelte`: three numeric segments **DD / MM / AAAA** inside one
  field-looking container. Numeric keypad (`inputmode`), auto-advance when a
  segment fills, `/`-key jumps, backspace walks back, single digits pad on
  blur, impossible dates (31/02) mark the field red and block submit with a
  Spanish error. Binds the same ISO string, so restore / share links / the
  unknown-time band are untouched; cleared via the `{#key formEpoch}`
  remount (same pattern as CityAutocomplete — half-typed segments compose to
  the same '' as a cleared value). Segment order is markup-only → swappable
  per locale in Phase M. Killed in passing: the mobile transparent-value
  overlay hack for the date input (the time input keeps its own). **Check on
  real Android/iOS after deploy** (keyboard type, autofill `bday-*` hints).
- **Birth-place error messages placement.** Shown below the field they
  look cramped; consider showing them to the right of the "Lugar de
  nacimiento" label instead. **Deliberately deferred (2026-07-06 triage):
  needs a design decision first** — the network-failure message ("No se
  pudo buscar. Revisa tu conexión…") is far too long to sit beside the
  label at 375px, so "to the right of the label" only works for the short
  messages; decide the treatment for long ones before touching it.
- ~~Unknown-hour slider should respect the current time~~ — done
  2026-06-13 (checking seeds the slider from the entered hour, rounded
  to the nearest half-hour; unchecking keeps the slider's hour).
- ~~**Saved-chart list should show only "city, country".**~~ — done
  2026-06-24. Extracted the trim into a shared `cityCountry` helper
  (`src/lib/geo/place.js`) and applied it to both the saved-chart list (was
  showing the full label with the region) and the chart subtitle.
- ~~**City autocomplete surfaces regions and counties as cities.**~~ — done
  2026-06-24. Photon's `osm_tag=place:city/town/village/hamlet/municipality`
  filter keeps only settlements server-side, so regions, counties and the
  duplicated-label admin boundaries no longer appear.
- ✅ **Invalid-data error message mixes languages — DONE 2026-07-06.**
  `chart.js` no longer appends Luxon's English `invalidExplanation`; the
  message is all-Spanish and names the offending stored values ("Los datos
  de nacimiento guardados no son válidos (fecha …, hora …, zona horaria
  …).") — more useful in a bug report than Luxon's prose anyway.
- ~~**Back arrow on the chart page (mobile).**~~ — done 2026-06-24. Replaced
  the off-centre "←" text glyph with a flex-centred 18px SVG arrow (matching
  the share/download buttons); verified dx=dy=0 at 375px.
- ~~Small, subtle clear-form button on the home screen~~ — done
  2026-06-12 (quiet "Borrar formulario" link under the CTA).
- **Estimated weight/influence per planetary activation.** Surface the
  commonly attributed relative weight of each activation (e.g. the Sun
  is said to weigh far more than any other body). Research the usual
  percentages before designing the UI.
- ✅ **Gate & channel info text is too thin (Phase 6.D follow-up) — DONE
  2026-06-30.** Each of the 64 gates now carries an own-wording **essence**
  (2-3 sentences: the public-domain I Ching hexagram theme + the gate's centre
  function + a gift/shadow polarity), written neutrally so it reads right
  whether or not the gate is active; stored as `gate` (with a short `theme`) in
  `content/es.js`. `getGateInfo` / `getChannelInfo` append a **3-state coda**
  from the chart (gate: complete / hanging / inactive — a hanging gate completes
  only temporarily, via another person or a transit, **not** places; channel:
  complete / half / none), and channels compose a synthesis line from their two
  gate themes. Legally safe: own voice on mechanical facts + public-domain I
  Ching, never Jovian Archive wording. Pending the author's review of the 64
  texts.

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
- 6.C — Handoff polish. **Built 2026-06-17/18 (text/UX review pending).** The
  provisional star glyph is replaced by **real brand logos** (one SVG path
  each, viewBox 0 0 24 24, `currentColor`) for Claude (the **Claude burst**,
  not the Anthropic "A" — a first pass used the wrong mark, corrected
  2026-06-18), ChatGPT (OpenAI) and Perplexity, carried as `icon` on each
  `AIS` entry in `ai/handoff.js`. Button layout (per the author): the
  preferred-AI button keeps the **external-link "opens outside the app" icon
  leading** and shows the **chosen AI's logo after the name**; the picker list
  shows each AI's logo as its leading identifier. AI list/order confirmed:
  Claude · ChatGPT · Perplexity (Gemini stays copy-only). The preferred-AI
  selector + remembered preference were already in place since 6.A and prompt
  templates were tuned in 6.B. Adding more deep-link AIs (Grok, DeepSeek,
  Copilot, Gemini-via-extension) stays possible later when feasible.
- 6.D — Gates & channels via handoff. **Built 2026-06-17/18 (text/UX review
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
  inline in the `<h2>` inside an **always-present fixed-size `.dot-h2` slot**
  (only the "i" inside it toggles) so revealing it never grows the line box
  nor shifts the chips below. `openInfoFor` resolves `gate`/`channel` via the
  new generators.
  - **Full list of all 64 gates / 36 channels — RESOLVED 2026-06-18 (built).**
    The concept "i" of **«Canales completos»** and **«Puertas colgantes»** now
    opens a panel whose body includes a **clickable index of every channel /
    gate** (`getConceptInfo` attaches a `list`; `ElementInfo` renders it as
    chips inside the capped-height scroll area). So any element is reachable,
    not only the active ones. Implemented together with **nested drawers** and
    **in-text links** (candidate (b), the chosen shape):
    - *Nested drawers*: the panel is a **content stack**, not visually-stacked
      drawers. `chart/+page.svelte` replaces the single `infoData` with an
      `infoStack` (array); opening from a chip/title starts a fresh stack, an
      in-text link or an index chip **pushes**, a **back arrow next to the ✕**
      (and Escape) **pops**, the ✕ clears it. One `ElementInfo` renders the
      top; the `elementKey`-driven reset swaps content in place and resets the
      body scroll. `infoIsOpen` tracks the stack *origin* so the originating
      chip stays marked while a deeper element shows. `navigateInfo(kind,key)`
      derives the category from `CATEGORY_BY_KIND`.
    - *In-text links*: markup `[label](kind:key)` in the content →
      `renderInline` renders a **subtle underline** (`.ilink`, kept light on
      purpose) and clicks are delegated from `.info-body` to `onnavigate`. The
      generated gate/channel info emits links to its **centre** and **gates**;
      a manual cross-link pass added **centre- and type-name** links across the
      core `es.js` texts (e.g. "garganta", the five type names). Remaining
      mentions are left for the author's text review — the markup is trivial
      to extend (any element with info can be `[label](kind:key)`).
    - *Correctness*: the **"Sobre esta carta" angle for a gate/channel only
      shows when that element is actually active in the chart**
      (`activeGates` / `activeChannels` in `prompts.js`) — elements reached via
      the index that aren't on the chart show **general only**. (**Reversed
      2026-07-01**: the chart angle now shows for any gate/channel and its prompt
      names the element's state — see the done item under "Possible improvements".)
- 6.E — **Activations info. Built 2026-06-18 (text/UX review pending).** Same
  pattern as everything else, on the **Activaciones** table: a concept "i" on
  the section title; an "i" on the **Personality / Design** headers and on the
  new **Peso** header; an "i" on each **planet** (13 own-voice keynotes); and
  each **activation cell is a button that opens its gate drawer** (reusing 6.D)
  — that's how "each individual activation" is reached, instead of a separate
  "i" per cell. New content in `es.js` (`concept.activation`, `activationCol`,
  `planet`, `promptLabels.planet`) + `prompts.js` kinds (`activationCol`,
  `planet`, concept `activation`, all general-only for now — a chart angle per
  planet is a future nicety). **Per-planet weight delivered:** a discreet last
  column **"Peso"** (smaller, muted, faint tier gradient) with a header tooltip
  + "i". Weights are **PROVISIONAL pending the author's review**
  (`activationWeight` in `es.js`, `getActivationWeight`): the only firm HD
  figure is **Sun+Earth ≈ 70%**, so the per-planet tiers (high = Sun/Earth,
  mid = Nodes, low = the rest) are a defensible ordering, not an official
  table — the "i"/tooltip say so. The Peso column is pinned (`min-width`) so
  "medio" rows can't jitter the table on expand.
- 6.F — **Built 2026-06-18: footer "acerca de" modal** (`About.svelte`, used on
  home + chart). The footer reads `v{version} · source-available · free for
  noncommercial use · acerca de` — kept discreet (small, dim by colour not
  opacity; the licence terms stay in English as terms of art, only "acerca de"
  is Spanish, lowercase, underlined). The link opens a **light** modal (a few
  lines, no narrative, refined 2026-06-18 per the author): *Creado por
  orangeman7557*, *Hecho con asistencia de IA*, *Proyecto independiente ·
  source-available (PolyForm Noncommercial 1.0.0)*, *Free for noncommercial
  use*, and minimal **disclaimers** (no affiliation, trademarks belong to their
  owners, informational content that's not professional advice — kept mainly
  for the stricter US market). Bug fixed while building: the `footer` had
  `opacity: 0.6`, which makes it a stacking context and rendered the fixed modal
  **semi-transparent and trapped below the page** — switched the footer to dim
  by **colour**, not opacity (both pages).
  - **Deferred (in the "acerca de" modal):** a working **"reportar un fallo"**
    action (e.g. link to the repo issues) and a **"donar / invitar a un café"**
    option. Disabled for now (no links shown); design and wire when ready.
  **Phase 6 is functionally complete**; only the author's text review (6.B–6.E)
  and an optional **bump to 0.2.0** remain (version still 0.1.1).

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

## Phase 7 — initial report (built 2026-06-30)

Built and verified (browser + 16/16 tests); pending the author's text review.
Hybrid architecture, as the roadmap anticipated: a deterministic static report
assembled in-app + the Phase 6 AI handoff for personalised depth. Full spec in
[`docs/informe-inicial.md`](./docs/informe-inicial.md).

- **Entry point**: an "Informe" pill button next to the chart name (`report-btn`
  in `chart/+page.svelte`, added to the PNG-capture filter so it doesn't leak
  into the shared image). Opens `InitialReport.svelte`, a full-screen overlay
  with a short table of contents + scrolling sections.
- **Assembly**: `src/lib/hd/report.js` — `buildReport(chart)` returns the
  ordered `{ id, title, paragraphs }[]`; `buildReportPrompt(chart)` composes the
  whole-chart handoff prompt. Pure data, no calculation; the personalised
  substance is reused from the content library.
- **Sections** (~13): Part A general (qué es HD + ant analogy + bodygraph &
  centres + conditioning + de-conditioning); Part B personalised (type + place
  in the collective, strategy, authority = decision-making, per-type
  energy/trap/signposts, profile, definition, a walk through the nine centres in
  their real state); Part C handoff ("Abrir IA" / "Copiar prompt").
- **Content**: new `report` (general sections + lead-ins) and `typeReport`
  (energy/trap/signposts × 5 types) blocks in `es.js`; the author's "qué es HD"
  intro + ant analogy reused verbatim. Centres were **split** from `paragraphs`
  to `{ fn, defined, open }` so the report shows only the chart's state, while
  `getElementInfo` recomposes function + both states for the chip "i" (no
  regression). `renderInline` was extracted to `src/lib/markup.js`, shared by
  `ElementInfo` and the report; in-text `[label](kind:key)` links open the
  element drawers (z-stacked over the report).
- **Polish (2026-06-30)**: report restructured after a review pass — the ant
  analogy folded into "Qué es Human Design" (no own heading); new order/titles
  (Un experimento vital → El bodygraph → Tu tipo: X → Tus centros y tus
  condicionamientos → Estrategia → Autoridad → Perfil → Tu definición: split →
  Vivir tu diseño → Saber más); **gold section headings** + less bold (1-2 per
  section) to break the wall-of-text; centres rendered as **cards with a
  name chip + state tag**; the definition title shows the variant; the authority
  lead-in opens with "your correct way to make decisions". The closing **"Saber
  más"** now mirrors the drawers' "Saber más usando IA" (single "Sobre esta
  carta" angle) with the **prompt visible by default**, pre-filled with the
  chart's essentials in the first person and left **open-ended** ("…Me gustaría
  saber más sobre "). Also: the report button is icon-only; the chart-name
  header truncates with "…" instead of pushing the buttons; centre drawer titles
  shortened ("Garganta", not "Centro de la Garganta").
- **Pending**: the author's review of the new texts; an optional bump to 0.2.0;
  the commit to main.

### PDF export (added 2026-06-30)

A **«PDF»** button (gold pill, top-right of the overlay header, next to the ✕)
downloads the initial report as a PDF. Shape: a **cover page** — the chart header
with the name + date·place **centred**, the summary cards (type, strategy,
authority, profile, definition, centres) and the **bodygraph** — followed by the
**report as real, selectable text** (gold headings, bold/italic, the centre
walk-through as cards with a defined/open tag). The closing "Saber más"/AI handoff
is **deliberately omitted** from the document (it stays in the on-screen overlay
only — a printed prompt reads oddly).

- New `src/lib/hd/report-pdf.js` lays the PDF out with **jsPDF** —
  **dynamic-imported** so it never weighs on first paint, and built with
  `compress: true` (jsPDF leaves streams uncompressed by default; the cover image
  + word-by-word text would otherwise bloat the file ~8×). Dark theme (the app
  tokens) so the dark cover image sits seamlessly. `parseRuns` turns the in-text
  `**bold**`/`*italic*`/`[label](kind:key)` markup into styled runs (links render
  as plain labels — they point at in-app drawers).
- The cover reuses the chart page's `html-to-image` capture via a new
  **`summaryOnly`** mode that crops at the bodygraph's bottom and drops
  `.cols`/`.activations` (those go in as text, not as one long screenshot), plus a
  **`pdf-shot`** capture-only class that **forces the desktop layout even on a
  phone** (a PDF is a document, so it should carry the wide arrangement, not the
  stacked mobile one). `pdf-shot` undoes the `@media (max-width: 679px)` block on
  specificity and is applied together with `.capturing` (which centres the title +
  birth line); **keep the two in sync** if the responsive layout changes.
- `jspdf` added to `dependencies` (installed in the main checkout per the
  worktree rule). Verified: 16/16 tests + browser — the cover is centred and
  pixel-identical at mobile (375px) and desktop widths, the report is 6 pages with
  no "Saber más", ~360 KB with the cover.

### Second-person text pass (2026-07-01)

After the author read the report, the personalised sections were rewritten in the
**second person** ("tú"). Root cause they were generic: the report reused the same
text blocks that feed the drawer "i" panels, which are written impersonally on
purpose (the chart may be someone else's). Two consequences fixed: the sections
read in third person ("La estrategia del Manifestador. Como su energía…") right
after a second-person lead-in, and the centre state lines were planted without
context.

- The report now has its **own second-person bodies** for type / strategy /
  authority / profile / definition, plus second-person centre state lines, stored
  under a new `report.{type,strategy,authority,profile,definition,center}` namespace
  in `es.js` (faithful conversions of the shared texts — same meaning, second
  person, without the "La X del…" openers). The shared `type`/`strategy`/… blocks
  (and the drawer "i") **stay impersonal** — verified unchanged.
- `report.js` consumes them via new accessors `getReportBody` / `getReportProfile`
  in `content/index.js`; `getCenterReport` now returns the second-person state
  (falling back to the shared one). The centre `fn` (a general description of what
  the centre *is*) stays shared. The old `stripState` helper is gone.
- The centre cards now read "Es uno de tus centros **definidos/abiertos**: …" so it's
  clear it's *your* chart.

## Phase L — Launch plan (→ 1.0) — added 2026-07-01

The pre-launch hardening pass that gates the 1.0 release. Decided with the author
2026-07-01. **The web launch is 1.0; the app stores are later, separate phases.**
Rationale for a dedicated pseudo-phase: the remaining content work (the full-app text
review) is the *content* gate, but "publishing" also needs a small *technical* checklist
that doesn't exist yet (icons, service worker, SEO, domain) plus wiring the two deferred
About-modal actions (report-a-bug, donations).

**Decisions locked (2026-07-01):**

- Report a bug/suggestion → **Web3Forms** (embeddable, no backend, no user account, keeps
  the author's email hidden). GitHub Issues optionally as a secondary technical route.
- Donations → **Ko-fi** ("invítame a un café"; 0% platform fee, connects PayPal/Stripe).
  **Non-blocking for 1.0** — may ship after. Voluntary tips don't conflict with the
  PolyForm Noncommercial license (no sale, no paywall; keep the "voluntary support" framing).
  **Switched 2026-07-03: the author opened a Buy Me a Coffee account instead**
  (`buymeacoffee.com/orangeman7557`); same voluntary-support framing applies.
- 1.0 is **web-only**. Play Store next, Apple after.

**Ordered checklist:**

0. **Full-app text review** — the content gate (see "Full-app text review" above).
1. **Installability** — app icons (192/512 + maskable), favicon, apple-touch-icon; a
   minimal service worker with a fetch handler; complete the manifest (icons array,
   screenshots). Today the manifest has no icons and there's no SW (2026-06-15 audit).
   Unblocks add-to-home-screen, the SEO icons, and a future TWA.
2. **SEO / discovery** — prerender the **home route only** (real HTML for crawlers and AI
   bots; the chart page stays SPA); Open Graph + Twitter Card + a share image; tuned
   title/description; robots.txt, sitemap.xml, canonical, JSON-LD (`WebApplication`);
   landing copy with the keywords people search. Both routes are ssr:false/prerender:false
   today, so crawlers see an empty shell — this is the key fix. Realistic outcome:
   long-tail traffic (Spanish queries, "free chart no signup"), not the top of
   "human design".
3. **Custom domain** — buy via Cloudflare Registrar (at-cost) and attach as a Worker Custom
   Domain (auto DNS + TLS). Required before the TWA (Digital Asset Links).
   **Done 2026-07-03**: bought `hdchart.app` in Cloudflare Registrar; `SITE_URL` +
   robots + sitemap updated to `https://hdchart.app`. `hdchart.app` (root) is the
   canonical host. **`www` redirect: rule + proxied DNS record for `www` created
   by the author 2026-07-03** (Cloudflare Redirect Rule; the DNS record was the
   missing piece the dashboard warned about) — **pending live verification**
   that `www.hdchart.app` resolves and redirects to the root.
4. **Report a bug** — wire the deferred "Reportar un fallo" (`About.svelte`) to Web3Forms.
5. **Donations (optional, may ship post-1.0)** — wire "Invítame a un café" to Ko-fi.
   **Done 2026-07-03 (as Buy Me a Coffee)**: the About modal gained a support row
   with two sober cards — a "¡Mándame amor!" heart (click → colour-cycling fill,
   WAAPI pop, ~12 confetti particles, and a global click counter that bumps as part
   of the animation; rapid re-clicks welcome, batched into one POST after 900 ms)
   and "Invítame a un café" → `buymeacoffee.com/orangeman7557`. The counter is the
   app's first server endpoint, `/api/love` (GET/POST), backed by a Cloudflare KV
   namespace (binding `LOVE`). Graceful degradation: no KV / offline → `count: null`
   → the counter hides; the heart never needs the network; `prefers-reduced-motion`
   skips the animations. **KV namespace created by the author 2026-07-03**
   (`hd-love`, id `93a9c82535d44143bd16b10147ddde29`) and wired live in
   `wrangler.jsonc`; verified end-to-end in dev via the adapter's platform proxy
   (miniflare emulates the binding locally). Second pass same day: gold icons,
   the counter moved into an "*Amores* recibidos: N" line (number keeps the
   heart's colour), full-screen party (confetti across the viewport + emoji
   flyers, ~3-5 s) and an escalating thank-you label sequence on the button.
   Third pass same day: exclamations + hearts in the thank-you labels (more
   exaggerated deeper into the spree), two intensity jumps (~8 clicks add
   fireworks — rocket + radial sparks + apex flash; ~16 add a second rocket,
   stray light glints and longer-lived confetti), the resting label becomes
   "¡Mándame más amor!" after the first party, and "Amores recibidos:" lost
   its italics.
   Known trade-off, fine for a love counter: KV read-modify-write can drop a few
   counts under simultaneous clicks from different visitors (no atomic increment
   in KV; Durable Objects would fix it if it ever matters). The POST rejects
   invalid/empty `n` (adds nothing) and clamps at 50 per request.
6. **Privacy policy** — a simple page; both stores require one, and it's trivial here
   (nothing leaves the device; local-only storage).
   **Done 2026-07-03**: prerendered page at `/privacy` (`src/routes/privacy/`),
   plain-language + RGPD (Spain/EU). Honest about the real touchpoints — local-first
   calculation, Photon (city search), Web3Forms (bug form), AI handoff, Cloudflare
   edge logs — and about what's absent (no cookies/analytics/accounts/data sale).
   Controller: "Javi G.O., autor de la app"; contact via the in-app bug form.
   Linked as "privacidad" in both footers; added to `sitemap.xml`.
7. **Bump to 1.0.0**, tag, deploy — the web launch.
   **Done 2026-07-03**: version bumped to 1.0.0, tagged `v1.0.0`, pushed to
   `main` (auto-deploy publishes it). The hidden home-tagline shortcut
   (author pre-fill) was removed as part of the release. Post-deploy live
   checks: ✅ KV counter and ✅ `www` redirect confirmed live by the author
   the same day; still pending — SW offline/redirect, security headers,
   real iOS.

**Dependencies:** installability (1) unblocks the SEO icons and the TWA; the domain (3)
unblocks assetlinks for Play. So 1 and 3 come before the store phases.

**Sustainability / cost (confirmed 2026-07-01):** the app is 100% client-side, so there's
no server cost that scales with users. Cloudflare Workers free tier (100k req/day; static
assets unmetered) covers it comfortably; only the domain (~10 €/yr) is a real recurring
cost, and the paid Workers plan ($5/mo, 10M req) is a distant ceiling. The one shared
external dependency is the public Photon geocoder — see the note below.

**Photon public instance — usage headroom (answered 2026-07-01).** Unlike Nominatim
(hard limit: 1 req/s, no bulk), komoot's public Photon has a **fair-use** policy with **no
published numeric limit**; the concern is **bulk/automated** geocoding, not interactive
typeahead. Our requests are human-paced and already debounced + aborted + deduped in
`CityAutocomplete`, so a chart creation is only a handful of requests. Even at thousands of
daily users that's a few thousand requests/day — negligible. **Worry only** if the
*pattern* changes (bulk batch geocoding) or if komoot starts returning 429/errors.
Self-hosting a Photon mirror (needs a large OSM/Elasticsearch index) is a "only if traffic
really grows" move, not a launch task.

### Step 1 — installability, built 2026-07-01

- **App icon (own mark).** A "bodygraph column" glyph in amber (`#d4a657`) on the deep-black
  tile (`#0b0b0d`): an equilateral triangle, a square, and a diamond (rotated square) with
  slightly rounded corners, joined by two short "channel" strokes, vertically centred.
  Geometry iterated with the author (v4): sized so the three read about equal, with a smaller
  gap triangle→square than square→rhombus. Master SVG in `static/favicon.svg`; the PNGs
  (`favicon-32`, `apple-touch-icon` 180, `icon-192`, `icon-512`, `icon-maskable-512`) render
  from the same mark with `sharp` (a throwaway `_gen-icons.mjs`, run from the worktree and
  deleted — `sharp` resolves from the main checkout, not added as a dependency).
- **Service worker** (`src/service-worker.js`, auto-registered by SvelteKit): precache the
  built shell + static files; cache-first for immutable assets; network-first for navigations
  with a cached-shell fallback (basic offline). Same-origin only — never intercepts Photon.
- **Manifest** gained `id` + an `icons` array (svg + 192/512 `any` + 512 `maskable`);
  **app.html** gained favicon / apple-touch-icon links + iOS meta tags.
- **"instalar como app" link** at the top of the home ("view in browser" style, same
  size/colour as the footer). Logic in `src/lib/pwa/install.svelte.js`: captures
  `beforeinstallprompt` (Chromium → native prompt), detects iOS Safari (→ manual "Add to Home
  Screen" instructions via the app dialog), hides when already standalone or unsupported. The
  link only shows when `install.mode` is set.
- **About modal tweaks** (author request): gold title, "gratis para uso no comercial" in bold,
  and the credit now reads "Creado por Javi G.O.".
- **Verified**: production build compiles the SW; icons at correct dimensions; no browser
  console errors; the install link and About changes render correctly. The real install prompt
  only fires on the deployed HTTPS build (the SW isn't registered in dev by design).

### Step 0 — full-app text review, marked OK 2026-07-02

The content gate. The author's first review pass (the two-column Word in `revision-textos/`) plus
the follow-up passes (quotes → straight `"`, 2nd/3rd-person sync, gate/channel names + essences,
sentence-case titles) are considered good enough to ship. **Marked OK by the author 2026-07-02;
further tandas may still land, but the gate no longer blocks 1.0.**

### Step 2 — SEO / discovery, built 2026-07-02

- **Prerender the home only.** New `src/routes/+page.js` sets `prerender = true` + `ssr = true`,
  overriding the app-wide `ssr = false` in `+layout.js` for this route. Prerendering needs server
  rendering, so `ssr` must be re-enabled here. The whole home component tree is SSR-safe: browser
  APIs (`sessionStorage`, IndexedDB, `window`) are only touched inside `onMount`/`$effect`/handlers,
  and the one module-level risk — `new Dexie()` in `db/charts.js` — was verified harmless in Node
  (Dexie 4 only touches `indexedDB` on `.open()`, not at construction). The chart route keeps its
  SPA setup (`chart/+page.js` stays ssr:false/prerender:false); it's per-user and not indexable.
  adapter-cloudflare emits `/` (and the static assets below) as excluded from the worker in
  `_routes.json`, serving them as static files; `/chart` still runs through the worker.
- **`svelte:head` SEO on the home** (baked into the prerendered HTML): tuned `<title>` +
  `description`, `<link rel="canonical">`, Open Graph (`type`, `site_name`, `title`, `description`,
  `url`, `image` 1200×630 + `width`/`height`/`alt`, `locale` es_ES), Twitter Card
  (`summary_large_image`), and a `WebApplication` JSON-LD block (free/`price: 0`, author Javi G.O.).
  Constants `SITE_URL`/`SEO_TITLE`/`SEO_DESC` live at the top of `+page.svelte`.
- **`app.html`**: removed the static `<title>` and `<meta name="description">` so the prerendered
  home doesn't end up with two of each (Svelte doesn't dedupe app.html's static tags against
  `svelte:head`). The chart route got its own minimal `svelte:head` (title "Tu carta · Human Design
  Chart") as the per-route baseline.
- **Share image** `static/og-image.png` (1200×630): the bodygraph glyph in amber + wordmark +
  tagline on the deep-black tile, rendered from an SVG with `sharp` via a throwaway `_gen-og.mjs`
  (run from the worktree, deleted — same pattern as the icons).
- **`static/robots.txt`** (allow all, points at the sitemap) and **`static/sitemap.xml`** (just the
  home; the chart is per-user, no public URL to index).
- **Domain caveat**: every absolute URL (canonical, og:url, og:image, robots Sitemap, sitemap loc)
  uses the current `https://human-design-chart-app.orangeman7557.workers.dev` origin. **Step 3
  (custom domain) must update `SITE_URL` in `src/routes/+page.svelte` and the two `static/` files.**
- **Verified**: build prerenders `/` with real content (h1 + form) and exactly one
  `<title>`/`description`; OG/canonical/JSON-LD present and the JSON-LD parses; `_routes.json`
  excludes `/` from the worker; 16/16 vitest; a clean dev server serves the tuned head; the chart
  route still loads as SPA (bodygraph renders, no console errors).

#### Multilingual SEO — deferred to Phase 11 (i18n)

Today all language signals hardcode Spanish: `<html lang="es">` (`app.html`), `og:locale` `es_ES`
and JSON-LD `inLanguage: 'es'` (home + `/privacy`), and Spanish copy throughout. There are **no
`hreflang` tags** and no per-language URLs. This is **correct for the Spanish-first 1.0** — the pages
declare one language unambiguously, which is what a crawler needs — but it makes the site invisible to
non-Spanish queries. It is *not* something to "prepare" now; done prematurely it would just be dead
scaffolding.

When the UI/content become multilingual (Phase 11), the SEO half of that work is:

- **One URL per language** (path prefix `/es`, `/en`, …). A single URL can only rank for one language;
  serving two languages off the same URL makes Google pick one and drop the other.
- **Per-page language declaration**: each locale's pages set their own `lang` / `og:locale` /
  `inLanguage` to match the actual content (not the hardcoded `es`).
- **`hreflang` alternates** cross-linking the translations (`<link rel="alternate" hreflang="en"
  href="…/en/">`, plus `x-default`), on the home **and** `/privacy`, so Google serves the right one
  per user instead of treating them as duplicates competing with each other.
- **Sitemap** listing the alternates per URL.
- Real translations, not machine-generated thin pages (Google can demote autogenerated low-quality
  locale copies).

No rework on the domain: `hdchart.app` is language-neutral by design. The pattern is additive — the
current Spanish home becomes the `/es` variant and `/en` is added alongside.

### Step 4 — report a bug, done 2026-07-03

Wires the deferred About-modal action into its own footer component. **Built, browser-verified and
committed 2026-07-03; the author confirmed the test emails arrive.**

- **`src/lib/components/ReportBug.svelte`** — a footer link "reportar un fallo" with a bug glyph
  *after* the text, rotated 45° clockwise so it reads as crawling up-right (`transform:
  rotate(45deg)`). Rendered on both the home and chart footers, next to "acerca de". The link is a
  plain inline-block `<button>` (like About's) so it baseline-aligns with the rest of the footer —
  an earlier `inline-flex` version dropped the row's vertical alignment.
- **Modal "Reportar un fallo o enviar una sugerencia"**, chrome mirroring `About.svelte`:
  - A "¿De qué se trata?" toggle → **Reportar un fallo/bug** | **Enviar una sugerencia/mensaje**;
    switching it swaps the intro copy, the textarea label ("¿Qué ha pasado?" / "Escribe tu
    sugerencia") and its placeholder. The intro is a **CSS grid stack** (both paragraphs share one
    cell, the inactive one `visibility: hidden`) so the box always keeps the taller height and the
    modal never resizes when toggling.
  - Required description (`message`); optional name + email; a hidden honeypot (`botcheck`).
  - Sending / success / error states; the success panel wipes the draft (name/email included) on
    close.
- **Auto-captured context** (so the reporter never describes their setup) sent as hidden fields:
  `Navegador` (userAgent), `Idioma`, `Pantalla`, `Ventana`, `Modo` (PWA vs browser), `App` (version).
- **Web3Forms**: `POST https://api.web3forms.com/submit` as `multipart/form-data` (`FormData`), with
  `access_key` (public, hides the author's email), `subject` = "HD Chart · Fallo/Sugerencia" and
  `from_name`.
- **Screenshot attachment dropped.** The docs claimed the free plan allows small attachments, but a
  live test with an `attachment` field returned **400** — `"You are trying to use a Pro feature,
  Please upgrade to use file uploads."` Attachments are Web3Forms **Pro** (paid); the author chose
  not to upgrade, so the form is **text-only**. (If images are ever wanted for free, a provider like
  FormSubmit.co supports attachments on its free tier — a future switch, not done here.)
- **Text fixes** on the author's supplied copy: "el sugerencia" → "la sugerencia", "Cuánto más" →
  "Cuanto más" (both orthographic).

## Post-1.0 packaging — Google Play (TWA) then Apple

Separate from the web 1.0. Prerequisite for both: Phase L installability (icons + SW) done.

- **Google Play (TWA — Trusted Web Activity).** A thin Android wrapper over the PWA, built
  with **Bubblewrap** or **PWABuilder** from the manifest. Needs: an installable PWA, a
  `/.well-known/assetlinks.json` on the custom domain (Digital Asset Links → hides the URL
  bar), a Google Play developer account (**one-time $25**), and store assets (screenshots,
  description, privacy policy). ~1–2 days once the PWA is installable.
- **Apple App Store (optional, later).** WKWebView/Capacitor/PWABuilder-iOS wrapper +
  **Apple Developer Program ($99/yr, recurring)** + a Mac with Xcode. Higher friction:
  Apple rejects "just a wrapped website" under review guideline **4.2 (minimum
  functionality)**, so it needs some native value (offline, notifications, native share).
  Lowest priority — iOS "Add to Home Screen" already gives an app-like PWA once
  apple-touch-icons exist.

## Features already identified for future phases

Roadmap renumbered 2026-06-10: 3 visual polish → 4 unknown hour →
5 PNG export (MVP closes) → 6 online sync → 7 composite → 8 transits.
Reordered 2026-06-13: AI handoff + element info moves up to Phase 6;
online sync moves down to Phase 9.
Reordered 2026-06-22: a new **Phase 7 — initial report** (an HD primer for
first-timers) is inserted as the next phase; composite → 8, transits → 9,
online sync → 10.

- **Phase 6 (planned):** AI handoff + element info. Full plan validated
  2026-06-13 — see "Phase 6 plan" above. No-API handoff (deep links +
  copy), one reusable info panel opened by a single "ⓘ Saber más", own
  text for the core only, depth delegated to the user's AI, multi-language
  ready. Target 0.2.0.
- **Phase 7 (planned):** **initial report — an HD primer for first-timers.**
  A simple, up-front report for someone seeing their chart with no prior
  Human Design knowledge: a plain-language explanation of what HD is, plus a
  general read of *their* chart derived from its type and strategy, with the
  Phase 6 AI handoff to go deeper. Presented clearly and early — e.g. a
  "report"/info button next to the chart title or beside the share/download
  buttons — so the first encounter is legible to a complete newcomer. The own
  text reuses the Phase 6 content module (`content/es.js`); the personalised
  depth still goes via the AI prompt, so no new legal surface.
- **Phase 8 (planned):** composite chart. **Advanced composite** beyond the
  combined visual: relationship dynamics (electromagnetic channels,
  dominance, compromise, companionship).
- **Phase 9 (planned):** **transits** view over a saved bodygraph.
- **Phase 10 (planned):** optional cloud sync (local-only stays the default).
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

## Known tech debt

- A handful of older source files still carry Spanish code comments from
  Phase 0/1.1. They get translated to English as they're touched.
- (Obsolete 2026-06-24 — the geocoder is now Photon, not Nominatim.) Photon's
  public instance has its own fair-use policy; the existing debounce + abort
  in `CityAutocomplete` keeps us well within it. Consider a self-hosted Photon
  mirror only if traffic grows.
- ✅ **City autocomplete now uses Photon (resolved 2026-06-24).** The switch
  from Nominatim's `/search` (full-form geocoding, weak on prefixes) to
  Photon's typeahead index is done. The earlier Photon attempt's "failure in
  deployment" was simply `lang=es` → HTTP 400 (Photon accepts only
  de/en/fr/it/default); the param is now omitted and CORS (`*`) was verified.
  The file was renamed from `nominatim.js` to `geocoder.js` (2026-06-24),
  with importers, comments and docs updated.
