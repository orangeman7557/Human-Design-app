<script>
  // Birth-data entry form. The form starts empty.

  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { t, LOCALES, localeMeta } from '$lib/i18n/index.svelte.js';
  // Deliberately ./labels.js, not ./index.js: the home needs only the type
  // names, and going through index.js pulled both full content packs into the
  // home's eager bundle (audit aug 2026).
  import { getDisplayLabels } from '$lib/hd/content/labels.js';
  // The active language for URLs and text. Read from the route param (not the
  // i18n module state), since the home is prerendered (concurrent at build) and
  // the shared module locale can race; `tr` passes it explicitly to t().
  const lang = $derived($page.params.lang);
  const tr = (key, params) => t(key, params, lang);
  // Full type names come from the content pack (translated in Phase M turn 2).
  const typeLabels = $derived(getDisplayLabels(lang).type);

  // Injected by Vite's `define` from package.json (see vite.config.js).
  const version = __APP_VERSION__;
  import CityAutocomplete from '$lib/components/CityAutocomplete.svelte';
  import DateField from '$lib/components/DateField.svelte';
  import { selectOnFocus } from '$lib/components/select-on-focus.js';
  import About from '$lib/components/About.svelte';
  import ReportBug from '$lib/components/ReportBug.svelte';
  import { install, promptInstall } from '$lib/pwa/install.svelte.js';
  import { dialog } from '$lib/components/dialog.svelte.js';
  import { cityCountry } from '$lib/geo/place.js';
  import { track } from '$lib/analytics.js';
  import {
    listCharts,
    renameChart,
    deleteChart,
    exportCharts,
    importCharts,
    syncDefaultLabels,
    reorderCharts,
    setChartType,
    ensureBackupRestored,
    listLabels,
    seedDefaultLabels,
    setChartLabels,
    createLabel
  } from '$lib/db/charts.js';
  import StorageInfo from '$lib/components/StorageInfo.svelte';
  import LabelManager from '$lib/components/LabelManager.svelte';
  import WhatIsHD from '$lib/components/WhatIsHD.svelte';
  import { computeChart } from '$lib/hd/chart.js';

  // ── SEO (Phase L, step 2 · per-language in Phase M) ───────────────────
  // The home is prerendered (see +page.js), so these tags land in the real
  // static HTML that crawlers and social scrapers read. Absolute URLs use the
  // custom domain (Phase L, step 3). Each language has its own canonical URL;
  // hreflang alternates cross-link them, with x-default on the bare root (the
  // Worker negotiates it). www redirects to the root at Cloudflare.
  const SITE_URL = 'https://hdchart.app';
  const seoTitle = $derived(tr('seo.title'));
  const seoDesc = $derived(tr('seo.description'));
  const canonical = $derived(`${SITE_URL}/${lang}`);
  const ogLocale = $derived(localeMeta(lang).ogLocale);
  const jsonLd = $derived(
    `<script type="application/ld+json">` +
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Human Design Chart',
        url: canonical,
        description: seoDesc,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        inLanguage: lang,
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        author: { '@type': 'Person', name: 'Javi G.O.' }
      }) +
      `<\/script>`
  );

  let name = $state('');
  let date = $state('');
  let time = $state('');

  // Footer: the donate modal's "send me a message" reaches into the ReportBug
  // component to open it with the suggestion type preselected.
  let reportBug = $state();

  /** @type {{ label: string, latitude: number, longitude: number, timezone: string } | null} */
  let place = $state(null);

  // Remounts CityAutocomplete on form clear (its free-text query is
  // internal state that a null `place` deliberately doesn't wipe).
  let formEpoch = $state(0);

  function clearForm() {
    name = '';
    date = '';
    time = '';
    place = null;
    unknownTime = false;
    sliderVal = 24;
    error = null;
    sessionStorage.removeItem('birthData');
    formEpoch++;
  }

  // From the About modal's "Manifestor" link (no drawer system on the home
  // page): open the author's own chart — a Manifestor — titled orangeman7557,
  // and ask the chart page to open the matching element drawer on arrival.
  function openAuthorChartWithInfo(kind, key) {
    const birth = {
      name: 'Javi G.O.',
      date: '1984-03-13',
      time: '09:30',
      timezone: 'Europe/Madrid',
      latitude: 40.4168,
      longitude: -3.7038,
      placeLabel: 'Madrid, Comunidad de Madrid, España'
    };
    sessionStorage.setItem('birthData', JSON.stringify(birth));
    sessionStorage.setItem('hd:openInfo', `${kind}:${key}`);
    goto(`/${lang}/chart`);
  }

  // "instalar como app" link (top of the home). Chromium → native prompt;
  // iOS Safari → manual "Add to Home Screen" instructions. The link only shows
  // when install.mode is set (see install.svelte.js).
  async function onInstallClick() {
    if (install.mode === 'prompt') {
      await promptInstall();
    } else if (install.mode === 'ios') {
      await dialog.alert({
        title: tr('install.iosTitle'),
        message: tr('install.iosMessage')
      });
    }
  }

  let submitting = $state(false);
  /** @type {string | null} */
  let error = $state(null);

  // Clear a submit error as soon as the user fixes what it complained about.
  // Otherwise "select a city from the list" stayed on screen, in red, next to
  // a field already showing its green confirmation tick, until the next
  // submit — the form looked broken after the user had done the right thing.
  $effect(() => {
    if (date && place) error = null;
  });

  // ── Unknown birth time (Phase 4) ──────────────────────────────────────
  // Checking the box disables manual time entry and reveals a 0-24h
  // slider (half-hour steps). The slider hour is written into `time`, so
  // submitting works unchanged; a live preview shows the resulting type.
  // Checking seeds the slider from any manually entered hour (nearest
  // half-hour); unchecking leaves the slider's hour in the time field.
  let unknownTime = $state(false);
  let sliderVal = $state(24); // half-hours → 12:00
  /** @type {HTMLInputElement | undefined} */
  let timeEl = $state();

  // Toggling "unknown time": when checking the box, seed the slider from the
  // hour already entered (nearest half-hour) BEFORE flipping `unknownTime` —
  // the `time = sliderTime` sync effect below runs the instant `unknownTime`
  // becomes true and would otherwise clobber the entered hour with the
  // slider's default (12:00). `unknownTime` is set manually (not `bind:checked`)
  // so the seed is guaranteed to run first. The hour is read from the state
  // AND from the live input as fallback: the browser's own form restoration
  // (back/forward) can repopulate the field without input events, leaving
  // `time` empty while the field visibly shows an hour (author repro,
  // 2026-07-06). Single-digit hours and trailing seconds are tolerated.
  function toggleUnknownTime(e) {
    const checked = e.currentTarget.checked;
    if (checked) {
      const raw = /^\d{1,2}:\d{2}/.test(time) ? time : timeEl?.value || '';
      const m = /^(\d{1,2}):(\d{2})/.exec(raw);
      if (m) sliderVal = Math.min(47, Number(m[1]) * 2 + Math.round(Number(m[2]) / 30));
    }
    unknownTime = checked;
  }
  /** @type {string | null} */
  let previewType = $state(null);
  let previewBusy = $state(false);
  let previewSeq = 0;

  const sliderTime = $derived(
    `${String(Math.floor(sliderVal / 2)).padStart(2, '0')}:${sliderVal % 2 === 0 ? '00' : '30'}`
  );

  // Map of the whole day: which type results from each half-hour. Computed
  // once per date/place (48 chart computations) and rendered as a segmented
  // band over the slider, like classic HD birth-time rectifiers.
  /** @type {{ type: string | null, span: number, from: number }[]} */
  let typeBands = $state([]);
  let bandsBusy = $state(false);
  let bandSeq = 0;

  $effect(() => {
    if (!unknownTime || !place) {
      typeBands = [];
      bandsBusy = false;
      return;
    }
    const d = date;
    const pl = place;
    const seq = ++bandSeq;
    bandsBusy = true;
    typeBands = [];
    (async () => {
      const types = [];
      for (let v = 0; v <= 47; v++) {
        const t = `${String(Math.floor(v / 2)).padStart(2, '0')}:${v % 2 === 0 ? '00' : '30'}`;
        try {
          const { type } = await computeChart({
            name: null,
            date: d,
            time: t,
            timezone: pl.timezone,
            latitude: pl.latitude,
            longitude: pl.longitude
          });
          types.push(type);
        } catch {
          types.push(null);
        }
        if (seq !== bandSeq) return;
      }
      const bands = [];
      for (let i = 0; i < types.length; i++) {
        const last = bands[bands.length - 1];
        if (last && last.type === types[i]) last.span++;
        else bands.push({ type: types[i], span: 1, from: i });
      }
      typeBands = bands;
      bandsBusy = false;
    })();
  });

  $effect(() => {
    if (unknownTime) time = sliderTime;
  });

  $effect(() => {
    if (!unknownTime || !place) {
      previewType = null;
      previewBusy = false;
      return;
    }
    const birth = {
      name: null,
      date,
      time: sliderTime,
      timezone: place.timezone,
      latitude: place.latitude,
      longitude: place.longitude
    };
    const seq = ++previewSeq;
    previewBusy = true;
    const t = setTimeout(async () => {
      try {
        const { type } = await computeChart(birth);
        if (seq === previewSeq) previewType = type;
      } catch {
        if (seq === previewSeq) previewType = null;
      } finally {
        if (seq === previewSeq) previewBusy = false;
      }
    }, 150);
    return () => clearTimeout(t);
  });

  function submit(e) {
    e.preventDefault();
    error = null;

    // The DateField segments are `required` (empty blocks natively), but a
    // filled-yet-impossible date (31/02) composes to '' — catch it here.
    if (!date) {
      error = tr('form.errInvalidDate');
      return;
    }

    if (!place) {
      error = tr('form.errNoCity');
      return;
    }

    submitting = true;
    try {
      const birth = {
        name: name.trim() || null,
        date,
        time,
        timezone: place.timezone,
        latitude: place.latitude,
        longitude: place.longitude,
        placeLabel: place.label
      };
      sessionStorage.setItem('birthData', JSON.stringify(birth));
      // A chart created from the form (not a shared-link open or a re-opened
      // saved chart). `notime` additionally flags the unknown-time path.
      track('chart');
      if (unknownTime) track('notime');
      goto(`/${lang}/chart`);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      submitting = false;
    }
  }

  /** @type {import('$lib/db/charts.js').SavedChart[]} */
  let savedCharts = $state([]);
  /** @type {string | null} */
  let listError = $state(null);
  /** @type {HTMLInputElement | undefined} */
  let importInput = $state();

  // ── Labels + search (2026-08-09) ──────────────────────────────────────────
  /** @type {import('$lib/db/charts.js').Label[]} global list, in order */
  let labels = $state([]);
  let search = $state('');
  let searchOpen = $state(false);
  /** @type {string[]} last searches (max 3, most recent first) */
  let recentSearches = $state([]);
  /** chart id whose label menu is open, or null */
  let labelMenuFor = $state(null);
  let labelManagerOpen = $state(false);
  /** inline "new label" field inside the assign menu */
  let menuNewName = $state('');
  /** @type {HTMLInputElement | undefined} */
  let searchInput = $state();
  // Non-reactive: true right after a suggestion (recent/label/type) was applied,
  // so the following blur doesn't record it as a recent search.
  let suggestionApplied = false;

  const RECENTS_KEY = 'hd:recent-searches';
  // Accent- and case-insensitive: "alva" must find "Álvaro".
  const norm = (s) =>
    (s ?? '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const isFiltering = $derived(!!search.trim());

  // The five HD types, in the community's canonical order (G, MG, P, M, R).
  const TYPE_ORDER = ['generator', 'manifesting-generator', 'projector', 'manifestor', 'reflector'];
  const typeEntries = $derived(
    TYPE_ORDER.filter((k) => typeLabels[k]).map((k) => ({ key: k, label: typeLabels[k] }))
  );

  // Filter over what the chip shows: name, type, date, place, labels.
  const filteredCharts = $derived.by(() => {
    const q = norm(search).trim();
    if (!q) return savedCharts;
    return savedCharts.filter((c) =>
      [c.name, typeLabels[c.type] ?? c.type, formatDate(c), cityCountry(c.birth?.placeLabel), ...(c.labels ?? [])]
        .some((v) => norm(v).includes(q))
    );
  });

  // Keep the search box from moving while filtering: reserve the list's natural
  // (unfiltered) height so the whole centred block doesn't re-center as rows drop.
  /** @type {HTMLElement | undefined} */
  let listWrap = $state();
  let reservedH = $state(0);
  $effect(() => {
    savedCharts.length; // re-measure when the full set changes
    if (!isFiltering && listWrap) reservedH = listWrap.offsetHeight;
  });

  onMount(() => {
    restoreLastBirth();
    loadRecents();
    initLists();
  });

  async function initLists() {
    // refreshList runs the cookie-vault restore first (which may bring labels
    // back too); only then does seeding get a chance, and it no-ops unless the
    // table is genuinely untouched.
    await refreshList();
    await seedDefaultLabels(defaultLabels());
    // The cookie-vault restore inside refreshList may have brought labels back,
    // so run the language pass again over whatever is there now.
    syncedLang = null;
    await syncLabels();
  }

  // Switching language is a client-side navigation between /es and /en: the
  // page's load runs again but onMount does not, so the sync hangs off `lang`
  // instead — the labels change with everything else, no reload.
  let syncedLang = null;
  async function syncLabels() {
    if (syncedLang === lang) return;
    syncedLang = lang;
    // A translated label is a rename, so the charts already listed still carry
    // the old word: reload them too.
    if (await syncDefaultLabels(defaultLabels(), defaultLabelsByLocale())) await refreshList();
    await refreshLabels();
  }
  $effect(() => {
    lang;
    syncLabels();
  });

  // The seeded labels ("Familia", "Trabajo"…) are UI text, so they follow the
  // app's language — this runs on every load, which is also every language
  // switch (the language lives in the URL, so the home remounts). A label the
  // user writes, or renames, is their word and is never touched: the DB layer
  // decides, from the `def` key each seeded row carries.
  const defaultLabels = () =>
    Object.entries(tr('labels.defaults') ?? {}).map(([key, name]) => ({ key, name }));
  const defaultLabelsByLocale = () =>
    Object.fromEntries(LOCALES.map((l) => [l.code, t('labels.defaults', null, l.code) ?? {}]));

  async function refreshLabels() {
    try {
      labels = await listLabels();
    } catch {
      // leave the previous list; the manage modal surfaces real failures
    }
  }

  function loadRecents() {
    try {
      const arr = JSON.parse(localStorage.getItem(RECENTS_KEY) ?? '[]');
      if (Array.isArray(arr)) recentSearches = arr.filter((s) => typeof s === 'string').slice(0, 3);
    } catch {
      // ignore malformed storage
    }
  }

  function pushRecent(text) {
    const v = text.trim();
    if (!v) return;
    recentSearches = [v, ...recentSearches.filter((s) => s.toLowerCase() !== v.toLowerCase())].slice(0, 3);
    try {
      localStorage.setItem(RECENTS_KEY, JSON.stringify(recentSearches));
    } catch {
      // ignore — recents are a convenience, not data
    }
  }

  function removeRecent(text) {
    recentSearches = recentSearches.filter((s) => s !== text);
    try {
      localStorage.setItem(RECENTS_KEY, JSON.stringify(recentSearches));
    } catch {
      // ignore
    }
  }

  // Applying a suggestion (a recent, a label or a type): fills the field and
  // filters, but is NOT recorded as a recent (only typed searches are).
  function applySearch(text) {
    search = text;
    suggestionApplied = true;
    searchOpen = false;
  }

  function clearSearch() {
    search = '';
    suggestionApplied = false;
    // Drop focus so the dropdown closes and the full list shows again.
    searchOpen = false;
    searchInput?.blur();
  }

  // A chart chip's label, tapped: fill the search with it and filter, without
  // opening the dropdown (applySearch leaves it closed and doesn't focus).
  function pickChipLabel(name) {
    applySearch(name);
  }
  function onChipKey(e, name) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pickChipLabel(name);
    }
  }

  function onSearchInput() {
    searchOpen = true;
    suggestionApplied = false;
  }

  function onSearchBlur() {
    if (search.trim() && !suggestionApplied) pushRecent(search);
    setTimeout(() => (searchOpen = false), 150);
  }

  function onSearchKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      pushRecent(search);
      searchOpen = false;
    } else if (e.key === 'Escape') {
      searchOpen = false;
    }
  }

  // Labels in the global order, restricted to those assigned to this chart
  // (plus any name not in the global list — e.g. imported — appended).
  function assignedNames(c) {
    const set = new Set(c.labels ?? []);
    const ordered = labels.filter((l) => set.has(l.name)).map((l) => l.name);
    for (const n of c.labels ?? []) if (!ordered.includes(n)) ordered.push(n);
    return ordered;
  }

  const isAssigned = (c, name) => (c.labels ?? []).includes(name);

  function toggleLabelMenu(id) {
    labelMenuFor = labelMenuFor === id ? null : id;
    menuNewName = '';
    searchOpen = false;
  }

  // Assigning/unassigning closes the menu (reopen to add more — author, aug 2026).
  async function toggleLabel(c, name) {
    const cur = c.labels ?? [];
    const next = cur.includes(name) ? cur.filter((n) => n !== name) : [...cur, name];
    c.labels = next;
    savedCharts = [...savedCharts];
    labelMenuFor = null;
    await setChartLabels(c.id, next);
  }

  // Create a label from the inline field at the bottom of the assign menu, then
  // assign it to this chart (which closes the menu, like any other assignment).
  async function createFromMenu(c) {
    const res = await createLabel(menuNewName);
    if ('error' in res) {
      if (res.error === 'duplicate') await dialog.alert({ message: tr('labels.duplicate') });
      return;
    }
    const name = menuNewName.trim();
    menuNewName = '';
    await refreshLabels();
    await toggleLabel(c, name);
  }

  function openManager() {
    labelMenuFor = null;
    labelManagerOpen = true;
  }

  async function onLabelsChanged() {
    // A rename/delete rewrites chart labels, so reload both lists.
    await refreshLabels();
    await refreshList();
  }

  // Coming back from the chart page, the form keeps the data of the last
  // chart that was on screen.
  function restoreLastBirth() {
    try {
      const b = JSON.parse(sessionStorage.getItem('birthData'));
      if (!b?.date) return;
      name = b.name ?? '';
      date = b.date;
      time = b.time ?? '';
      if (b.placeLabel && b.timezone) {
        place = {
          label: b.placeLabel,
          latitude: b.latitude,
          longitude: b.longitude,
          timezone: b.timezone
        };
      }
    } catch {
      // ignore malformed storage
    }
  }

  async function refreshList() {
    try {
      // If the browser purged the local DB, the cookie-vault restore must
      // land before listing (charts.js) — a no-op after the first await.
      await ensureBackupRestored();
      savedCharts = await listCharts();
      backfillTypes();
    } catch (e) {
      listError = e instanceof Error ? e.message : String(e);
    }
  }

  // Charts saved before 3.E (or imported without it) lack the denormalised
  // type — compute it once and persist it.
  async function backfillTypes() {
    for (const c of savedCharts) {
      if (c.type) continue;
      try {
        const { type } = await computeChart(c.birth);
        await setChartType(c.id, type);
        c.type = type;
      } catch {
        // leave untyped; the chart page will surface any real data problem
      }
    }
  }

  // Drag & drop reordering (HTML5 DnD; list order persisted on drop).
  /** @type {number | null} */
  let dragIndex = $state(null);

  function dragStart(i) {
    dragIndex = i;
  }
  function dragOver(e, i) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    const arr = [...savedCharts];
    const [moved] = arr.splice(dragIndex, 1);
    arr.splice(i, 0, moved);
    savedCharts = arr;
    dragIndex = i;
  }
  async function dragEnd() {
    if (dragIndex === null) return;
    dragIndex = null;
    await reorderCharts(savedCharts.map((c) => c.id));
  }

  function openSaved(c) {
    // The saved (possibly renamed) chart name wins over whatever name was
    // typed in the form before saving.
    sessionStorage.setItem('birthData', JSON.stringify({ ...c.birth, name: c.name }));
    goto(`/${lang}/chart`);
  }

  async function renameSaved(c) {
    const name = await dialog.prompt({
      title: tr('dialog.rename.title'),
      defaultValue: c.name,
      placeholder: tr('dialog.rename.placeholder'),
      confirmLabel: tr('dialog.rename.confirm')
    });
    if (name === null || !name.trim()) return;
    await renameChart(c.id, name.trim());
    await refreshList();
  }

  async function deleteSaved(c) {
    const ok = await dialog.confirm({
      title: tr('dialog.delete.title'),
      message: tr('dialog.delete.message', { name: c.name }),
      confirmLabel: tr('dialog.delete.confirm'),
      danger: true
    });
    if (!ok) return;
    await deleteChart(c.id);
    await refreshList();
  }

  // Backups are JSON *inside a .txt* (aug 2026). Chromium's Web Share checks
  // both the file extension and the MIME type against allowlists, and neither
  // ".json" nor "application/json" is on them — so a .json backup can't be sent
  // through a share sheet at all, while ".txt" + "text/plain" (declared exactly
  // like that, no charset suffix) passes everywhere. Same bytes either way, so
  // download and send share one file; import still accepts the old .json.
  async function backupFile() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const name = `hdchart-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.txt`;
    return new File([await exportCharts()], name, { type: 'text/plain' });
  }

  function downloadFile(file) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function doExport() {
    downloadFile(await backupFile());
  }

  // "Send the charts": hands the backup to the OS share sheet, where mail apps
  // sit alongside everything else — a backup by email without any mail plumbing
  // on our side. The subject/body travel as share title/text; whether the
  // receiving app uses them is its call. No share sheet (desktop Firefox) or a
  // refused file falls back to the plain download.
  async function doSend() {
    listError = null;
    const file = await backupFile();
    if (!navigator.canShare?.({ files: [file] })) {
      downloadFile(file);
      return;
    }
    try {
      await navigator.share({
        files: [file],
        title: tr('saved.sendSubject'),
        text: tr('saved.sendBody')
      });
    } catch (err) {
      if (err?.name !== 'AbortError') {
        listError = tr('saved.errSend', { msg: err instanceof Error ? err.message : String(err) });
      }
    }
  }

  async function doImport(e) {
    listError = null;
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { imported, duplicates, invalid } = await importCharts(await file.text());
      await refreshList();
      const parts = [tr('dialog.importImported', { n: imported })];
      if (duplicates) parts.push(tr('dialog.importDuplicates', { n: duplicates }));
      if (invalid) parts.push(tr('dialog.importInvalid', { n: invalid }));
      await dialog.alert({ message: parts.join(' ') });
    } catch (err) {
      listError =
        err?.code === 'BAD_FORMAT'
          ? tr('dialog.importBadFormat')
          : err instanceof Error
            ? err.message
            : String(err);
    } finally {
      e.target.value = '';
    }
  }

  // A saved chart's row must stay on ONE line (author request 2026-08-24).
  // The type gives way first — "Generador" → "Gen." — and only if the name is
  // still too long does CSS clip it with an ellipsis. The widths are measured
  // on a canvas rather than by rendering and re-measuring, so changing the
  // label can't feed back into the measurement. The search keeps matching the
  // full words: it reads the chart, not the row.
  /** @type {{ name: string, type: string, gap: number } | null} */
  let rowFont = $state(null);
  let nameBoxW = $state(0);
  /** @type {CanvasRenderingContext2D | null} */
  let textCanvas = null;

  function textWidth(text, font) {
    textCanvas ??= document.createElement('canvas').getContext('2d');
    if (!textCanvas) return 0;
    textCanvas.font = font;
    return textCanvas.measureText(text ?? '').width;
  }

  /** Action on the name row: the first one to mount publishes the two fonts
   *  (name and type) and the gap between them — every row shares them. */
  function rowMetrics(node) {
    if (rowFont) return;
    const font = (el) => {
      const cs = getComputedStyle(el);
      return `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    };
    const type = node.querySelector('.chart-type');
    rowFont = {
      name: font(node),
      type: type ? font(type) : font(node),
      gap: parseFloat(getComputedStyle(node).columnGap) || 0
    };
  }

  function rowType(c) {
    const full = typeLabels[c.type] ?? c.type;
    if (!c.type || !rowFont || !nameBoxW) return full;
    const short = tr('types.short.' + c.type);
    if (!short || short === full) return full;
    const wide =
      textWidth(c.name, rowFont.name) + rowFont.gap + textWidth(full, rowFont.type) > nameBoxW;
    return wide ? short : full;
  }

  // Same date shape as the chart subtitle ("13/03/1984, 09:30").
  function formatDate(c) {
    const [y, m, d] = (c.birth?.date ?? '').split('-');
    const date = d ? `${d}/${m}/${y}` : (c.birth?.date ?? '');
    const t = c.birth?.time ?? '';
    return [date, t].filter(Boolean).join(', ');
  }

  // Touch has no hover, so there a tap toggles the tooltip via the global
  // .tip-open class (see app.css). Buttons are excluded: on them the tap
  // already runs the action and the tooltip would linger on top of it.
  function tipTap(e) {
    const touch = window.matchMedia('(pointer: coarse)').matches;
    const el = touch ? e.target.closest('[data-tip]:not(button)') : null;
    for (const open of document.querySelectorAll('.tip-open')) {
      if (open !== el) open.classList.remove('tip-open');
    }
    el?.classList.toggle('tip-open');
  }
</script>

<svelte:window onclick={tipTap} />

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDesc} />
  <link rel="canonical" href={canonical} />
  {#each LOCALES as l}
    <link rel="alternate" hreflang={l.htmlLang} href="{SITE_URL}/{l.code}" />
  {/each}
  <link rel="alternate" hreflang="x-default" href={SITE_URL} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Human Design Chart" />
  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={seoDesc} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content="{SITE_URL}/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Human Design Chart" />
  <meta property="og:locale" content={ogLocale} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seoTitle} />
  <meta name="twitter:description" content={seoDesc} />
  <meta name="twitter:image" content="{SITE_URL}/og-image.png" />

  {@html jsonLd}
</svelte:head>

<main>
  <header>
    <div class="brand">
      <h1>Human Design Chart</h1>
      <!-- The app icon doubles as the "instalar como app" affordance. -->
      <button class="app-icon" type="button" onclick={onInstallClick} aria-label={tr('install.aria')} title={tr('install.aria')}>
        <img src="/favicon.svg" alt="" width="28" height="28" />
      </button>
    </div>
    <p class="tagline">{tr('home.tagline')}</p>
    <div class="what-hd"><WhatIsHD {lang} /></div>
  </header>

  <form onsubmit={submit}>
    <label>
      <span>{tr('form.name')}</span>
      <input type="text" bind:value={name} maxlength="50" autocomplete="off" use:selectOnFocus />
    </label>

    <!-- Own day/month/year entry (DateField) instead of the native date
         input: Android's picker leads with a ~100-year scroll, and a birth
         date is typed, not picked. -->
    <div class="field">
      <span class="field-head"><span>{tr('form.birthDate')}</span></span>
      <!-- {#key}: same pattern as CityAutocomplete — half-typed segments
           compose to the same '' as a cleared value, so clearing the form
           remounts the field instead of trying to signal it. -->
      {#key formEpoch}
        <DateField bind:value={date} />
      {/key}
    </div>

    <label>
      <span>{tr('form.birthPlace')}</span>
      {#key formEpoch}
        <CityAutocomplete bind:value={place} />
      {/key}
    </label>

    <div class="field">
      <span class="field-head">
        <span>{tr('form.birthTime')}</span>
      </span>
      {#if !unknownTime}
        <span class="dtwrap">
          <input type="time" bind:this={timeEl} bind:value={time} required aria-label={tr('form.birthTime')} />
          <span class="dt-value" class:muted={!time} aria-hidden="true">{time || '--:--'}</span>
        </span>
      {:else}
        <div class="slider-block">
          <p class="slider-hint">{tr('form.approxHint')}</p>
          <input
            type="range"
            min="0"
            max="47"
            step="1"
            bind:value={sliderVal}
            aria-label={tr('form.estimatedHour')}
          />
          {#if typeBands.length}
            <div class="bands" aria-hidden="true">
              {#each typeBands as b}
                {@const label = typeLabels[b.type] ?? '—'}
                {@const fits = label.length <= b.span * 1.3}
                <span
                  class="band"
                  class:active={sliderVal >= b.from && sliderVal < b.from + b.span}
                  style={`flex-grow:${b.span}`}
                  data-tip={fits ? undefined : label}
                >{fits ? label : b.type ? tr('types.abbr.' + b.type) : ''}</span>
              {/each}
            </div>
          {:else if bandsBusy}
            <p class="bands-busy">{tr('form.calcTypesBusy')}</p>
          {/if}
          <div class="slider-scale" aria-hidden="true">
            <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span>
          </div>
          <div class="slider-info">
            <span class="slider-time">{sliderTime}</span>
            <span class="slider-type">
              {#if !place}
                {tr('form.selectCity')}
              {:else if previewBusy}
                …
              {:else}
                {typeLabels[previewType] ?? '—'}
              {/if}
            </span>
          </div>
        </div>
      {/if}
      <label class="check">
        <input type="checkbox" checked={unknownTime} onchange={toggleUnknownTime} />
        {tr('form.unknownTime')}
      </label>
    </div>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <button type="submit" disabled={submitting}>
      {submitting ? tr('form.calculating') : tr('form.calculate')}
    </button>

    <!-- onclickcapture: direct listener, also usable when the page is
         driven programmatically (delegated handlers need trusted events). -->
    <button type="button" class="clear-link" onclickcapture={clearForm}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" />
      </svg>
      {tr('form.clearForm')}
    </button>
  </form>

  {#snippet tagIcon(size, filled = false)}
    <svg class="tag-ic" width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <g transform="translate(24,0) scale(-1,1)">
        <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592-5.592a2.41 2.41 0 0 0 0-3.408l-7.71-7.71A2 2 0 0 0 11.172 3H6a3 3 0 0 0-3 3z" />
        {#if !filled}<circle cx="7.5" cy="7.5" r="1.2" />{/if}
      </g>
    </svg>
  {/snippet}

  {#snippet personIcon(size)}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
  {/snippet}

  {#snippet gearIcon(size)}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  {/snippet}

  <section class="saved">
    <div class="saved-head">
      <h2>{tr('saved.heading')}</h2>
      {#if savedCharts.length > 0}
        <div class="search">
          <svg class="search-ic" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            bind:this={searchInput}
            class:has-value={search}
            type="text"
            bind:value={search}
            aria-label={tr('saved.searchAria')}
            onfocus={() => { searchOpen = true; labelMenuFor = null; }}
            onclick={() => (searchOpen = true)}
            oninput={onSearchInput}
            onblur={onSearchBlur}
            onkeydown={onSearchKeydown}
          />
          {#if search}
            <button type="button" class="search-clear" onmousedown={(e) => e.preventDefault()} onclick={clearSearch} aria-label={tr('saved.searchClear')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
            </button>
          {/if}
          {#if searchOpen && (recentSearches.length || labels.length || typeEntries.length)}
            <div class="search-dd">
              {#if recentSearches.length}
                <div class="dd-head">{tr('saved.searchRecents')}</div>
                {#each recentSearches as r}
                  <div class="dd-recent">
                    <button type="button" class="dd-item" onmousedown={(e) => e.preventDefault()} onclick={() => applySearch(r)}>
                      <span class="dd-ic">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></svg>
                      </span>
                      <span class="dd-name">{r}</span>
                    </button>
                    <button type="button" class="dd-x" onmousedown={(e) => e.preventDefault()} onclick={() => removeRecent(r)} aria-label={tr('saved.searchRecentsClear')}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
                    </button>
                  </div>
                {/each}
              {/if}
              {#if labels.length}
                {#if recentSearches.length}<div class="dd-sep"></div>{/if}
                <div class="dd-head-row">
                  <span class="dd-head">{tr('saved.searchLabels')}</span>
                  <button type="button" class="dd-gear" onmousedown={(e) => e.preventDefault()} onclick={openManager} aria-label={tr('labels.managerAria')}>
                    {@render gearIcon(13)}
                  </button>
                </div>
                {#each labels as l}
                  <button type="button" class="dd-item" onmousedown={(e) => e.preventDefault()} onclick={() => applySearch(l.name)}>
                    <span class="dd-ic">{@render tagIcon(14)}</span>
                    <span class="dd-name">{l.name}</span>
                  </button>
                {/each}
              {/if}
              {#if typeEntries.length}
                <div class="dd-sep"></div>
                <div class="dd-head">{tr('saved.searchTypes')}</div>
                {#each typeEntries as ty}
                  <button type="button" class="dd-item" onmousedown={(e) => e.preventDefault()} onclick={() => applySearch(ty.label)}>
                    <span class="dd-ic">{@render personIcon(14)}</span>
                    <span class="dd-name">{ty.label}</span>
                  </button>
                {/each}
              {/if}
            </div>
          {/if}
        </div>
      {/if}
    </div>

    {#if listError}
      <p class="error">{listError}</p>
    {/if}

    <div class="list-wrap" bind:this={listWrap} style:min-height={isFiltering ? reservedH + 'px' : null}>
    {#if savedCharts.length === 0}
      <p class="empty">{tr('saved.empty')}</p>
    {:else if filteredCharts.length === 0}
      <p class="empty">{tr('saved.noMatches')}</p>
    {:else}
      <ul>
        {#each filteredCharts as c, i (c.id)}
          <li
            draggable={!isFiltering}
            class:dragging={dragIndex === i}
            ondragstart={() => dragStart(i)}
            ondragover={(e) => dragOver(e, i)}
            ondragend={dragEnd}
          >
            <span class="drag" aria-hidden="true">⠿</span>
            <div class="chart-card">
              <button class="chart-open" onclick={() => openSaved(c)}>
                <span class="chart-name" use:rowMetrics bind:clientWidth={nameBoxW}>
                  <span class="chart-name-text">{c.name}</span>
                  {#if c.type}
                    <span class="chart-type">{rowType(c)}</span>
                  {/if}
                </span>
                <span class="chart-meta">{formatDate(c)} · {cityCountry(c.birth?.placeLabel)}</span>
              </button>
              {#if assignedNames(c).length}
                <div class="chart-labels">
                  {@render tagIcon(12)}
                  <span class="chart-labels-text">{#each assignedNames(c) as n, li}<span class="chip-label" role="button" tabindex="0" onclick={() => pickChipLabel(n)} onkeydown={(e) => onChipKey(e, n)}>{n}</span>{#if li < assignedNames(c).length - 1}{', '}{/if}{/each}</span>
                </div>
              {/if}
            </div>
            <div class="actions">
              <button class="icon half edit" onclick={() => renameSaved(c)} aria-label={tr('saved.rename')}>✎</button>
              <button
                class="icon half labels-btn"
                class:on={labelMenuFor === c.id}
                onclick={() => toggleLabelMenu(c.id)}
                aria-label={tr('saved.labelsAria')}
                aria-haspopup="true"
                aria-expanded={labelMenuFor === c.id}
              >
                {@render tagIcon(13, assignedNames(c).length > 0)}
              </button>
              <button class="icon del" onclick={() => deleteSaved(c)} aria-label={tr('saved.delete')}>✕</button>

              {#if labelMenuFor === c.id}
                <div class="label-menu" role="menu">
                  <div class="dd-head-row">
                    <span class="dd-head">{tr('saved.searchLabels')}</span>
                    <button type="button" class="dd-gear" onclick={openManager} aria-label={tr('labels.managerAria')}>
                      {@render gearIcon(14)}
                    </button>
                  </div>
                  {#each labels as l}
                    <button
                      type="button"
                      class="lm-item"
                      class:sel={isAssigned(c, l.name)}
                      role="menuitemcheckbox"
                      aria-checked={isAssigned(c, l.name)}
                      onclick={() => toggleLabel(c, l.name)}
                    >
                      {@render tagIcon(14, isAssigned(c, l.name))}
                      <span class="lm-name">{l.name}</span>
                    </button>
                  {/each}
                  <div class="dd-sep"></div>
                  <form class="lm-add" onsubmit={(e) => { e.preventDefault(); createFromMenu(c); }}>
                    <input
                      bind:value={menuNewName}
                      type="text"
                      maxlength="40"
                      placeholder={tr('labels.newPlaceholder')}
                      aria-label={tr('labels.newPlaceholder')}
                    />
                    <button type="button" class="lm-add-btn" onclick={() => createFromMenu(c)} aria-label={tr('labels.add')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </button>
                  </form>
                </div>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    {/if}
    </div>

    <div class="saved-foot">
      <div class="local-note">
        <p>{tr('saved.localNote')} <StorageInfo /></p>
      </div>
      <div class="io">
        <button
          class="io-btn"
          onclick={doExport}
          disabled={savedCharts.length === 0}
          data-tip={tr('saved.export')}
          aria-label={tr('saved.export')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v12" /><path d="m8 11 4 4 4-4" /><path d="M4 21h16" />
          </svg>
        </button>
        <button
          class="io-btn"
          onclick={() => importInput?.click()}
          data-tip={tr('saved.import')}
          aria-label={tr('saved.import')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 15V3" /><path d="m8 7 4-4 4 4" /><path d="M4 21h16" />
          </svg>
        </button>
        <button
          class="io-btn"
          onclick={doSend}
          disabled={savedCharts.length === 0}
          data-tip={tr('saved.send')}
          aria-label={tr('saved.send')}
        >
          <!-- The plane's mass sits up and to the right of the 24×24 box's
               centre, so squared in the button it reads as off-centre. The
               group re-centres it on its own centroid and shrinks it 10% to
               fit (stroke bumped to 2.2 so it keeps the siblings' weight). -->
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <g transform="translate(12 12) scale(0.92) translate(-12.9 -11.1)" stroke-width="2.2">
              <path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" />
            </g>
          </svg>
        </button>
        <input
          type="file"
          accept="text/plain,.txt,application/json,.json"
          bind:this={importInput}
          onchange={doImport}
          hidden
        />
      </div>
    </div>
  </section>

  {#if labelMenuFor !== null}
    <div class="menu-scrim" role="presentation" onclick={() => (labelMenuFor = null)}></div>
  {/if}

  {#if labelManagerOpen}
    <LabelManager {labels} onClose={() => (labelManagerOpen = false)} onChanged={onLabelsChanged} />
  {/if}

  <footer>
    {#if install.mode}
      <div class="foot-install">
        <button class="install-link" type="button" onclick={onInstallClick}>{tr('install.link')}</button>
      </div>
    {/if}
    <div class="foot-line">
      <ReportBug bind:this={reportBug} version={version} />
      <span aria-hidden="true">·</span>
      <a class="foot-link" href={`/${lang}/privacy`}>{tr('footer.privacy')}</a>
      <span aria-hidden="true">·</span>
      <About version={version} onElement={openAuthorChartWithInfo} onMessage={() => reportBug?.openWith('sugerencia')} />
    </div>
  </footer>
</main>

<style>
  main {
    position: relative;
    max-width: 460px;
    margin: 0 auto;
    /* 1.75rem side air (author request 2026-07-03): fields and CTA breathe
       instead of running near the phone edge; only visible below max-width. */
    padding: 3rem 1.75rem 4rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  /* Title + app icon on one centred row. */
  .brand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    margin-bottom: 0.4rem;
  }
  h1 {
    font-size: clamp(1.6rem, 5vw, 2rem);
    font-weight: 500;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .app-icon {
    display: inline-flex;
    align-items: center;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    line-height: 0;
    border-radius: 7px;
  }
  .app-icon img {
    width: 1.7rem;
    height: 1.7rem;
    display: block;
    /* A subtle frame so the icon reads as an app tile (its own background is
       the page colour, so without a border it looks like a floating glyph). */
    border: 1px solid var(--border);
    border-radius: 7px;
  }
  .app-icon:hover img {
    border-color: var(--accent);
  }
  .tagline {
    color: var(--text-muted);
    margin: 0;
    font-size: 0.9rem;
  }
  .what-hd {
    text-align: center;
    /* Hugs the tagline — reads as a line break under it, not a new paragraph. */
    margin-top: 0.15rem;
    /* Same size as the tagline (the link inherits it); 0.8rem on mobile below. */
    font-size: 0.9rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    min-width: 0;
  }
  label span {
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.72rem;
  }
  input {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.7rem 0.85rem;
    border-radius: var(--radius);
    font-size: 1rem;
    font-family: inherit;
    color-scheme: dark;
  }
  input:focus {
    outline: none;
    border-color: var(--accent);
  }
  input:disabled {
    opacity: 0.45;
  }
  /* Full-width, shrinkable entry fields. iOS Safari otherwise sizes native
     date/time inputs (and any input without an explicit width) to their
     intrinsic width and, as flex items with min-width:auto, refuses to shrink
     them — so on a phone the date/time/place fields misalign and overflow the
     form to the right. Checkbox and range keep their own sizing.
     appearance:none + border-box strip the iOS UA sizing entirely: real
     devices still overflowed with width/min-width alone (betatester, jul
     2026); without native appearance iOS honours the authored width. */
  input:not([type='checkbox']):not([type='range']) {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
    /* Uniform height: without native appearance each input type picks its
       own; 2.75rem ≈ 44px, the iOS minimum tap-target size. */
    height: 2.75rem;
  }
  /* The compact search box and the inline "new label" field opt out of the
     44px form-field min-height above (needs the higher specificity to win). */
  .saved-head .search input,
  .label-menu .lm-add input {
    height: auto;
  }
  /* iOS renders date/time values in a shadow div that collapses to zero
     height when empty once appearance is stripped; keep a text line alive. */
  input::-webkit-date-and-time-value {
    min-height: 1.2em;
    text-align: inherit;
  }

  /* Wrapper for date/time inputs: anchors the mobile-only centred value
     overlay (.dt-value, hidden on desktop — see the media query). */
  .dtwrap {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .dtwrap input {
    width: 100%;
  }
  .dt-value {
    display: none;
  }

  .field {
    /* Anchor for the absolutely-positioned checkbox on desktop. */
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    min-width: 0;
  }
  .field-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.72rem;
  }
  .check {
    /* Desktop: in the label row, top right (its classic spot). */
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.35rem;
    text-transform: none;
    letter-spacing: normal;
    font-size: 0.78rem;
    cursor: pointer;
    white-space: nowrap;
  }
  .check input[type='checkbox'] {
    accent-color: var(--accent);
    margin: 0;
    cursor: pointer;
  }

  /* Mobile: labels, field text and the checkbox centred; the checkbox
     moves below the time field, reading as the alternative to filling
     it in. */
  @media (max-width: 520px) {
    /* Fit the tagline on one line so "registro" doesn't wrap. At 375px the line
       needs a hair more than the full width at 0.9rem, so we both widen it past
       the fields (a small negative margin, not to the edge) and trim the font a
       touch — subtle enough not to read as a different size. */
    .tagline {
      margin-inline: -1rem;
      font-size: 0.8rem;
    }
    .what-hd {
      font-size: 0.8rem;
    }
    label span,
    .field-head {
      text-align: center;
      justify-content: center;
    }
    form :global(input:not([type='checkbox']):not([type='range'])) {
      text-align: center;
    }
    /* Native date/time widgets ignore text-align and the shadow-part
       hacks on Android Chrome, so on small screens the real value is
       painted transparent and our own centred overlay shows it instead.
       The input keeps the taps, so the native picker opens as always. */
    .dtwrap input {
      color: transparent;
    }
    .dt-value {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      color: var(--text);
      font-size: 1rem;
      text-transform: none;
      letter-spacing: normal;
    }
    .dt-value.muted {
      color: var(--text-muted);
      opacity: 0.7;
    }
    .slider-hint {
      text-align: center;
    }
    .check {
      position: static;
      justify-content: center;
      margin-top: 0.15rem;
    }
  }

  /* Tablet range (incl. iPad portrait): the absolute top-right checkbox can ride
     over the time field on iOS Safari (its label metrics differ just enough).
     Drop it below the field, in flow, the same way mobile does — overlap-proof
     whatever the text width. Desktop (wider) keeps the classic top-right spot. */
  @media (min-width: 521px) and (max-width: 834px) {
    .check {
      position: static;
      margin-top: 0.3rem;
    }
  }

  .slider-block {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.7rem 0.85rem 0.55rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .slider-hint {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  /* overflow must stay visible so the [data-tip] tooltip isn't clipped;
     the rounded ends are applied per segment instead. */
  .bands {
    display: flex;
    width: 100%;
    height: 1.5rem;
    gap: 1px;
  }
  .band {
    flex-basis: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.68rem;
    color: var(--text-muted);
    background: var(--surface-2);
    min-width: 0;
    overflow: hidden;
  }
  .band:first-child {
    border-radius: 6px 0 0 6px;
  }
  .band:last-child {
    border-radius: 0 6px 6px 0;
  }
  .band[data-tip] {
    overflow: visible;
  }
  .band.active {
    background: var(--accent-soft);
    color: var(--accent);
    font-weight: 600;
  }
  .bands-busy {
    margin: 0;
    font-size: 0.72rem;
    color: var(--text-muted);
    opacity: 0.7;
  }
  .slider-scale {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: var(--text-muted);
    opacity: 0.8;
    margin-top: -0.3rem;
    font-variant-numeric: tabular-nums;
  }

  /* Instant tooltip (no native title delay). */
  [data-tip] {
    position: relative;
  }
  [data-tip]:hover::after {
    content: attr(data-tip);
    position: absolute;
    bottom: calc(100% + 7px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    font-size: 0.75rem;
    padding: 0.3rem 0.55rem;
    border-radius: 7px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 5;
  }
  .slider-block input[type='range'] {
    width: 100%;
    accent-color: var(--accent);
    padding: 0;
    margin: 0;
    background: none;
    border: none;
  }
  .slider-info {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .slider-time {
    font-size: 0.95rem;
    color: var(--text);
    font-variant-numeric: tabular-nums;
  }
  .slider-type {
    font-size: 0.85rem;
    color: var(--accent);
  }

  button[type='submit'] {
    margin-top: 1rem;
    width: 100%;
    background: var(--accent);
    color: #1a1408;
    border: none;
    padding: 0.85rem 1rem;
    border-radius: var(--radius);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
  }
  button[type='submit']:disabled {
    opacity: 0.6;
    cursor: progress;
  }

  .error {
    color: var(--danger);
    font-size: 0.9rem;
    margin: 0;
  }
  /* Deliberately understated: a quiet escape hatch under the CTA, not a
     competing action. */
  .clear-link {
    align-self: center;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    margin-top: -0.25rem;
    background: none;
    border: none;
    padding: 0.2rem 0.4rem;
    font-family: inherit;
    font-size: 0.72rem;
    color: var(--text-muted);
    opacity: 0.6;
    cursor: pointer;
  }
  .clear-link:hover {
    opacity: 1;
    color: var(--text);
  }

  .saved {
    margin-top: 2.75rem;
    border-top: 1px solid var(--border);
    padding-top: 1.75rem;
  }
  .saved li.dragging {
    opacity: 0.5;
  }
  .drag {
    align-self: center;
    color: var(--text-muted);
    opacity: 0.55;
    cursor: grab;
    font-size: 0.85rem;
    user-select: none;
  }
  .chart-type {
    flex: none;
    white-space: nowrap;
    color: var(--text-muted);
    font-weight: 400;
    font-size: 0.78rem;
  }
  .saved-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-top: 0.9rem;
  }
  .local-note {
    /* Dim colour instead of opacity: the StorageInfo modal renders inside
       this container, and opacity would bleed into the whole subtree. */
    color: #6f6f76;
    font-size: 0.75rem;
    margin: 0;
  }
  .local-note p {
    margin: 0;
  }
  .saved-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }
  .saved h2 {
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin: 0;
  }
  .io-btn {
    display: grid;
    place-items: center;
    width: 1.9rem;
    height: 1.9rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text-muted);
    cursor: pointer;
  }
  .io-btn:hover:not(:disabled) {
    color: var(--text);
    border-color: var(--accent);
  }
  .io-btn:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .empty {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin: 0;
  }
  .saved ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .saved li {
    display: flex;
    align-items: stretch;
    gap: 0.4rem;
  }
  /* The card carries the surface/border/hover; all cards share one height
     (sized for the tallest, 3-line, case) with the content centred — tight so
     2-line cards don't feel airy and 3-line ones read as denser (author, aug
     2026). The name/meta open the chart; the labels row is separately clickable. */
  .chart-card {
    flex: 1;
    min-width: 0;
    min-height: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.45rem 0.8rem;
  }
  .chart-card:hover {
    border-color: var(--accent);
  }
  .chart-open {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    text-align: left;
    background: none;
    border: none;
    color: var(--text);
    padding: 0;
    font-family: inherit;
    cursor: pointer;
  }
  .chart-name {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    min-width: 0;
    font-size: 0.95rem;
    font-weight: 500;
    line-height: 1.3;
  }
  /* The name yields, the type never wraps — see rowType(). */
  .chart-name-text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chart-meta {
    font-size: 0.78rem;
    line-height: 1.3;
    color: var(--text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chart-labels {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.78rem;
    line-height: 1.3;
    color: var(--text-muted);
    min-width: 0;
  }
  .chart-labels-text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* Each assigned label is a filter shortcut: no link chrome on desktop (just an
     accent hover), a plain underline on touch where there is no hover. */
  .chip-label {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  @media (hover: hover) {
    .chip-label:hover {
      color: var(--accent);
    }
  }
  @media (hover: none) {
    .chip-label {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
  .tag-ic {
    flex: none;
    color: var(--text-muted);
  }

  /* Right-hand controls on a 2×2 grid: editar over etiquetas on the left, and
     borrar on the right spanning both rows but sized like one of them, so it
     sits halfway between the two (author request 2026-08-24) — three buttons
     of the same size read better than a tall one beside two short ones. */
  .actions {
    position: relative;
    display: grid;
    grid-template-columns: 2.4rem 2.4rem;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'edit del'
      'labels del';
    gap: 0.4rem;
  }
  .icon {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-muted);
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 0.9rem;
    display: grid;
    place-items: center;
  }
  .icon.half {
    min-height: 0;
  }
  .icon.edit {
    grid-area: edit;
  }
  .labels-btn {
    grid-area: labels;
  }
  .icon.del {
    grid-area: del;
    /* One row tall — half the stack minus the gap between its two buttons —
       and centred against them. */
    height: calc(50% - 0.2rem);
    align-self: center;
  }
  .icon:hover {
    color: var(--text);
    border-color: var(--accent);
  }
  .labels-btn {
    position: relative;
    grid-area: labels;
  }
  .icon.on {
    color: var(--accent);
    border-color: var(--accent);
  }

  /* Search box (top-right of the saved section) + its dropdown. Kept short —
     roughly the height of the "cartas guardadas" title — and narrow. */
  .search {
    position: relative;
    /* Wrap the field, don't stretch to the heading's row height: the lupa is
       centred against THIS box, so a stretched one left it sitting high. */
    align-self: center;
    flex: 0 1 140px;
    min-width: 0;
  }
  .search-ic {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    pointer-events: none;
  }
  .search input {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    font-family: inherit;
    font-size: 0.82rem;
    line-height: 1.15;
    /* Short field — a bit shorter on touch, much shorter on desktop (override
       below). The lupa alone signals "search", so there's no placeholder. */
    padding: 0.22rem 0.55rem 0.22rem 1.6rem;
    outline: none;
  }
  .search input.has-value {
    padding-right: 1.5rem;
  }
  .search input:focus {
    border-color: var(--accent);
  }
  .search input::placeholder {
    color: var(--text-muted);
  }
  /* Clear "x", same right-hand slot pattern as the city field. */
  .search-clear {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    display: grid;
    place-items: center;
    width: 1.35rem;
    height: 1.35rem;
    padding: 0;
    border: none;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: 50%;
  }
  .search-clear:hover {
    color: var(--text);
  }
  /* Desktop: notably shorter still (author, aug 2026) — but not cramped: a
     couple of pixels back on each side (2026-08-24). */
  @media (min-width: 835px) {
    .search input {
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
    }
  }

  /* Shared dropdown look for the search box and the chip label menu. */
  .search-dd,
  .label-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    z-index: 45;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 4px;
    box-shadow: 0 10px 30px #0009;
    max-height: 60vh;
    overflow-y: auto;
  }
  .search-dd {
    width: 230px;
    max-width: 80vw;
  }
  .label-menu {
    width: 200px;
  }
  .dd-head {
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-muted);
    padding: 0.35rem 0.55rem 0.2rem;
  }
  /* "Etiquetas" header: the gear sits right after the title (small gap), not
     pushed to the far edge. */
  .dd-head-row {
    display: flex;
    align-items: center;
    gap: 0.15rem;
  }
  .dd-gear {
    display: grid;
    place-items: center;
    width: 1.2rem;
    height: 1.2rem;
    padding: 0;
    border: none;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: 6px;
  }
  .dd-gear:hover {
    color: var(--text);
  }
  /* Recent row: the search shortcut fills the row, a discreet per-item "x"
     (no button chrome) removes just that entry. */
  .dd-recent {
    display: flex;
    align-items: center;
  }
  .dd-recent .dd-item {
    flex: 1;
    min-width: 0;
  }
  .dd-x {
    display: grid;
    place-items: center;
    width: 1.5rem;
    height: 1.5rem;
    flex: none;
    padding: 0;
    border: none;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: 6px;
  }
  .dd-x:hover {
    color: var(--text);
  }
  .dd-item,
  .lm-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    text-align: left;
    padding: 0.42rem 0.5rem;
    border: none;
    border-radius: 7px;
    background: none;
    color: var(--text);
    font-family: inherit;
    font-size: 0.84rem;
    cursor: pointer;
  }
  .dd-item:hover,
  .lm-item:hover {
    background: #ffffff08;
  }
  .dd-ic {
    width: 15px;
    height: 15px;
    flex: none;
    display: grid;
    place-items: center;
    color: var(--text-muted);
  }
  .dd-name,
  .lm-name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* Assigned label: no check column — the tag icon itself turns filled + accent. */
  .lm-item .tag-ic {
    flex: none;
  }
  .lm-item.sel .tag-ic {
    color: var(--accent);
  }
  /* Inline "new label" field, last row of the assign menu. `.lm-add` is a
     <form>, so it must override the birth form's column flex explicitly. */
  .lm-add {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;
    padding: 0.15rem 0.15rem 0.15rem 0.35rem;
  }
  .lm-add input {
    flex: 1;
    min-width: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 7px;
    color: var(--text);
    font-family: inherit;
    font-size: 0.82rem;
    line-height: 1.15;
    /* Left-aligned everywhere (some mobile UAs centre a bare input) and short —
       a touch less on mobile, much less on desktop (override below). */
    text-align: left;
    padding: 0.26rem 0.45rem;
    outline: none;
  }
  @media (min-width: 835px) {
    .lm-add input {
      padding-top: 0.12rem;
      padding-bottom: 0.12rem;
    }
    .lm-add-btn {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .lm-add input:focus {
    border-color: var(--accent);
  }
  .lm-add input::placeholder {
    color: var(--text-muted);
    text-align: left;
  }
  .lm-add-btn {
    display: grid;
    place-items: center;
    width: 1.7rem;
    height: 1.7rem;
    flex: none;
    background: var(--accent-soft);
    border: 1px solid transparent;
    border-radius: 7px;
    color: var(--accent);
    cursor: pointer;
  }
  .lm-add-btn:hover {
    border-color: var(--accent);
  }
  .dd-sep {
    height: 1px;
    background: var(--border);
    margin: 4px 2px;
  }
  .menu-scrim {
    position: fixed;
    inset: 0;
    z-index: 40;
  }
  .io {
    display: flex;
    gap: 0.4rem;
  }

  /* Footer links ("instalar como app" · "acerca de"): the footer sets the
     size/colour; this just matches About's link. */
  .install-link {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  .install-link:hover {
    color: var(--text-muted);
  }

  /* Footer "privacidad" link: overrides the global accent-coloured anchor so it
     matches the muted "acerca de" / "notificar un fallo" siblings. */
  .foot-link {
    color: inherit;
    text-decoration: none;
  }
  .foot-link:hover {
    color: var(--text-muted);
  }

  /* "Instalar como app" sits on its own line above the rest of the footer
     links (author request aug 2026); it hides entirely when already installed
     (the {#if install.mode} guard). */
  .foot-install {
    margin-bottom: 0.5rem;
  }

  footer {
    margin-top: 4rem;
    text-align: center;
    font-size: 0.8rem;
    /* Dim via colour, not opacity: opacity<1 makes the footer a stacking
       context and would render the About modal (a descendant) semi-transparent
       and trapped below the page. This colour matches the old muted-at-0.6 look. */
    color: #64646a;
  }
</style>
