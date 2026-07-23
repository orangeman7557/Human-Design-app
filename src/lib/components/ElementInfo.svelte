<!-- AI-authored — reusable element info panel (Phase 6.A). -->
<!-- Bottom sheet on mobile (slides up), right-hand drawer on desktop -->
<!-- (slides in from the right). Holds the element's general info (its own -->
<!-- scroll area, so the IA section below stays visible) plus a "Saber más -->
<!-- usando IA" section: -->
<!--   - an inline angle selector ("Sobre esta carta" / "Info general") whose -->
<!--     menu floats up over the label (hidden when only one applies). -->
<!--   - two actions: "Abrir IA" (deep link, remembers the choice) and -->
<!--     "Copiar prompt" (copies straight away, green "Copiado" feedback). -->
<!--   - a subtle "Ver/editar prompt" text toggle that reveals the editable -->
<!--     text; both actions send/copy whatever that editable text holds. -->
<!-- One instance serves every element kind; only the props change. -->
<script>
  import { untrack } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { t } from '$lib/i18n/index.svelte.js';
  import {
    AIS,
    getPreferredAI,
    setPreferredAI,
    openAI,
    getPreferredAngle,
    setPreferredAngle
  } from '$lib/ai/handoff.js';
  import { renderInline } from '$lib/markup.js';
  import { focusTrap } from './focus-trap.js';
  import { scrollLock } from './scroll-lock.js';

  /**
   * @type {{
   *   open?: boolean,
   *   category?: string,
   *   info?: {
   *     title: string,
   *     paragraphs: string[],
   *     facts?: { label: string, tip?: string, rows: { chip: { label: string, kind: string, key: string }, note?: string }[] }[],
   *     after?: string[],
   *     related?: { heading: string, items: { kind: string, key: string, label: string, note?: string, current?: boolean }[] },
   *     list?: { label: string, kind: string, key: string }[]
   *   } | null,
   *   prompts?: { general: string, chart: string | null } | null,
   *   elementKey?: string,
   *   canBack?: boolean,
   *   onback?: () => void,
   *   onnavigate?: (kind: string, key: string) => void,
   *   onclose: () => void
   * }}
   */
  let { open = false, category = '', info = null, prompts = null, elementKey = '', canBack = false, onback, onnavigate, onclose } = $props();

  let aiOpen = $state(false);
  let showPrompt = $state(false);
  let copied = $state(false);
  /** @type {{ id: string, label: string, icon: string } | null} */
  let preferred = $state(null);
  /** Active prompt angle: 'chart' | 'general'. */
  let angle = $state('chart');
  let angleOpen = $state(false);
  let editedPrompt = $state('');
  let wide = $state(false);

  // Desktop: the drawer width is user-resizable (drag the left edge) and the
  // choice is remembered — some drawers (the 192-cross index, the 64-gate index)
  // are dense enough that a wider panel genuinely helps.
  const DRAWER_W_KEY = 'hd:drawer-width';
  const DRAWER_W_MIN = 340;
  const DRAWER_W_MAX = 820;
  function loadWidth() {
    try {
      const v = parseInt(localStorage.getItem(DRAWER_W_KEY) || '', 10);
      if (v >= DRAWER_W_MIN) return Math.min(v, DRAWER_W_MAX);
    } catch {
      // Private mode / storage disabled: fall back to the default.
    }
    return 420;
  }
  let panelWidth = $state(loadWidth());
  let resizing = $state(false);
  function startResize(e) {
    e.preventDefault();
    resizing = true;
    document.body.style.userSelect = 'none';
    const move = (ev) => {
      const max = Math.min(DRAWER_W_MAX, window.innerWidth - 60);
      panelWidth = Math.max(DRAWER_W_MIN, Math.min(max, window.innerWidth - ev.clientX));
    };
    const up = () => {
      resizing = false;
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      try {
        localStorage.setItem(DRAWER_W_KEY, String(Math.round(panelWidth)));
      } catch {
        // Non-fatal: the width just won't persist.
      }
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }
  /** @type {HTMLTextAreaElement | undefined} */
  let promptEl = $state();
  /** @type {HTMLDivElement | undefined} */
  let bodyEl = $state();
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let copyTimer;

  const hasAngles = $derived(!!prompts?.chart);

  // Track the breakpoint live so the open direction is right without a race.
  $effect(() => {
    const mq = window.matchMedia('(min-width: 680px)');
    const update = () => (wide = mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  });

  // Reset transient state and pick the default angle each time it opens — and
  // also when the element changes while the panel stays open (reading
  // elementKey here is what makes that re-run). untrack so reading
  // angle/prompts inside doesn't re-run the effect when the user switches angle.
  $effect(() => {
    elementKey;
    if (!open) return;
    untrack(() => {
      aiOpen = false;
      showPrompt = false;
      angleOpen = false;
      copied = false;
      preferred = getPreferredAI();
      // Reuse the remembered angle when both apply; a general-only panel shows
      // 'general' without overwriting that memory.
      angle = prompts?.chart ? getPreferredAngle() : 'general';
      editedPrompt = prompts?.[angle] ?? '';
      // Each stacked element starts scrolled to the top.
      if (bodyEl) bodyEl.scrollTop = 0;
      // The new text has a different length — recheck the "more below" cue
      // once it has been laid out.
      requestAnimationFrame(updateHasMore);
    });
  });

  // "There is more text below" cue. macOS hides overlay scrollbars until the
  // pointer moves, so the drawer looked like it ended at the fold and the
  // tables underneath (the five types, the centre index) went unnoticed. A
  // fade at the bottom edge says it without depending on OS scrollbar
  // settings; it disappears once you reach the end.
  // Touch has no hover, so a tap on a fact's label or body word reveals its
  // "i"; a second tap on the "i" opens the drawer. Same two-step the chart
  // cards use.
  let shownFact = $state(null);
  function tapFact(id) {
    shownFact = shownFact === id ? null : id;
  }

  let hasMore = $state(false);
  function updateHasMore() {
    if (!bodyEl) return;
    hasMore = bodyEl.scrollHeight - bodyEl.scrollTop - bodyEl.clientHeight > 4;
  }

  // Keep the textarea sized to its content — also when switching angle
  // swaps the text under it.
  $effect(() => {
    editedPrompt;
    if (promptEl) {
      promptEl.style.height = 'auto';
      promptEl.style.height = promptEl.scrollHeight + 'px';
    }
  });

  function setAngle(a) {
    angle = a;
    angleOpen = false;
    setPreferredAngle(a);
    editedPrompt = prompts?.[a] ?? '';
  }

  function flagCopied() {
    copied = true;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copied = false), 2000);
  }

  // Prefer the async Clipboard API; fall back to a hidden textarea +
  // execCommand for contexts where it's blocked (e.g. some iframes / non-https
  // previews), so the "Copiado" feedback is reliable.
  function copyPrompt() {
    const text = editedPrompt;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(flagCopied).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok) flagCopied();
    } catch {
      // Give up silently — the prompt is still visible to copy by hand.
    }
  }

  // First time (no preference) the button opens the picker; once an AI is
  // chosen it opens that AI directly, and the chevron re-opens the picker.
  function aiButtonClick() {
    if (preferred) {
      openAI(preferred, editedPrompt);
    } else {
      aiOpen = !aiOpen;
      if (aiOpen) showPrompt = false;
    }
  }

  function toggleAiList() {
    aiOpen = !aiOpen;
    if (aiOpen) showPrompt = false;
  }

  function chooseAI(ai) {
    setPreferredAI(ai.id);
    preferred = ai;
    aiOpen = false;
    openAI(ai, editedPrompt);
  }

  function toggleShowPrompt() {
    showPrompt = !showPrompt;
    if (showPrompt) aiOpen = false;
  }

  function onkeydown(e) {
    // Escape steps back through the stack, then closes at the root.
    if (e.key === 'Escape' && open) canBack ? onback?.() : onclose();
  }

  // In-text links (`[label](kind:key)`) are rendered as a subtle underline and
  // open the linked element in a nested drawer. Clicks are delegated here from
  // the content area.
  function navFromEvent(e) {
    const link = e.target.closest?.('[data-link]');
    if (!link) return false;
    e.preventDefault();
    const raw = link.dataset.link;
    const i = raw.indexOf(':');
    onnavigate?.(raw.slice(0, i), raw.slice(i + 1));
    return true;
  }
  function onContentClick(e) {
    navFromEvent(e);
  }
  function onContentKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') navFromEvent(e);
  }

  // Inline markup (**bold**, *italic*, [label](kind:key)) → HTML lives in
  // $lib/markup.js, shared with the report so both render identically.
</script>

<svelte:window {onkeydown} />

{#if open && info}
  <div class="scrim" onclick={onclose} role="presentation" transition:fly={{ duration: 150, opacity: 0 }}></div>
  <aside
    class="panel"
    class:resizing
    role="dialog"
    aria-modal="true"
    aria-label={info.title}
    style:width={wide ? `${panelWidth}px` : null}
    use:focusTrap
    use:scrollLock
    transition:fly={{ x: wide ? 460 : 0, y: wide ? 0 : 60, duration: 240, opacity: 1 }}
  >
    <div class="resize" role="presentation" onpointerdown={startResize} title={t('drawerUi.resize')}></div>
    <div class="grabber" aria-hidden="true"></div>

    <header>
      <div>
        {#if category}<div class="eyebrow">{category}</div>{/if}
        <h2>{info.title}</h2>
      </div>
      <div class="head-actions">
        {#if canBack}
          <button class="hbtn" type="button" onclick={onback} aria-label={t('drawerUi.back')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
        {/if}
        <button class="hbtn close" type="button" onclick={onclose} aria-label={t('drawerUi.close')}>✕</button>
      </div>
    </header>

    <div class="info-scroll" class:more={hasMore}>
    <div
      class="info-body"
      bind:this={bodyEl}
      role="presentation"
      onscroll={updateHasMore}
      onclick={onContentClick}
      onkeydown={onContentKeydown}
    >
      {#each info.paragraphs as p}
        {#if p?.bullets}
          <ul class="para blist">
            {#each p.bullets as b}<li>{@html renderInline(b)}</li>{/each}
          </ul>
        {:else if p?.subhead}
          <!-- A heading inside the body (same shape the initial report uses):
               used where a drawer opens with general framing and then moves on
               to the concrete element, so the switch is visible. -->
          <p class="subhead">{p.subhead}</p>
        {:else}
          <p class="para">{@html renderInline(p)}</p>
        {/if}
      {/each}
      {#if info.facts}
        <!-- Schematic identity block (gates/channels/centres): one row per
             element, gold chips aligned left under a shared label. Rows with a
             note stack one per line; note-less rows (centres) go inline. -->
        <div class="facts" class:aligned={info.factsAlign}>
          {#each info.facts as f, fi}
            <div class="fact">
              <span class="fact-label" class:fact-shown={shownFact === `l${fi}`} onclick={() => tapFact(`l${fi}`)} role="presentation">{f.label}{#if f.tip}<sup class="fact-i" data-tip={f.tip}>i</sup>{/if}:{#if f.info}<button class="fact-dot" type="button" aria-label={f.label} onclick={() => onnavigate?.(f.info.kind, f.info.key)}>i</button>{/if}</span>
              <span class="fact-rows" class:inline={f.inline}>
                {#each f.rows as r, ri}
                  <span class="fact-row">
                    {#if r.pre}<span class="fact-pre" class:fact-shown={shownFact === `r${fi}-${ri}`} onclick={() => tapFact(`r${fi}-${ri}`)} role="presentation">{r.pre}{#if r.info}<button class="fact-dot" type="button" aria-label={r.pre} onclick={() => onnavigate?.(r.info.kind, r.info.key)}>i</button>{/if}</span>{/if}
                    <button class="index-chip gold" type="button" onclick={() => onnavigate?.(r.chip.kind, r.chip.key)}>{r.chip.label}</button>
                    {#if r.note}<span class="fact-note">{r.note}</span>{/if}
                  </span>
                {/each}
              </span>
            </div>
          {/each}
        </div>
      {/if}
      {#if info.centerStates}
        <!-- The nine centres, each a gold chip + its brief function. -->
        <div class="cstates">
          {#each info.centerStates as it}
            <div class="cstate">
              <button
                class="index-chip gold"
                type="button"
                onclick={() => onnavigate?.(it.kind, it.key)}
              >{it.label}</button>
              <span class="fact-note">{it.note}</span>
            </div>
          {/each}
        </div>
      {/if}
      {#if info.after}
        {#each info.after as p}
          <p class="para">{@html renderInline(p)}</p>
        {/each}
      {/if}
      {#if info.related}
        <!-- Closed-set schema as a borderless table: chip · phrase · (%). The
             current element(s) are highlighted gold. -->
        <div class="related">
          <div class="rel-head">{info.related.heading}</div>
          <table class="rel-table">
            <tbody>
              {#each info.related.items as it}
                <tr>
                  <td class="rt-chip"><button class="index-chip" class:gold={it.current} type="button" onclick={() => onnavigate?.(it.kind, it.key)}>{it.label}</button></td>
                  <td class="rt-note">{it.note}</td>
                  {#if info.related.hasPct}<td class="rt-pct">{it.pct ?? ''}</td>{/if}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
      {#if info.crossIndex}
        <!-- All 192 crosses, grouped by quarter: sun gate · name + gates ·
             angle tag. The sun gate is the clickable part (it opens that gate),
             which is also the column the reference tables key on. -->
        <div class="related">
          <div class="rel-head">{info.crossIndex.heading}</div>
          {#each info.crossIndex.quarters as q}
            <p class="subhead">{q.title}</p>
            <p class="para qnote">{@html renderInline(q.note)}</p>
            <table class="rel-table xtable">
              <tbody>
                {#each q.rows as r}
                  <tr>
                    <td class="rt-chip"><button class="index-chip" type="button" onclick={() => onnavigate?.(r.kind, r.key)}>{r.sun}</button></td>
                    <td class="rt-note"><button class="index-chip xname-chip" type="button" onclick={() => onnavigate?.('cross', r.crossKey)}>{r.name}</button> <span class="xgates">{r.gates}</span></td>
                    <td class="rt-pct">{r.tag}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          {/each}
        </div>
      {/if}
      {#if info.list}
        {#if info.list[0]?.note}
          <!-- Full index as "[chip] name" rows (gates / channels). -->
          <div class="index-rows">
            {#each info.list as item}
              <div class="cstate">
                <button class="index-chip" type="button" onclick={() => onnavigate?.(item.kind, item.key)}>{item.label}</button>
                <span class="fact-note">{item.note}</span>
              </div>
            {/each}
          </div>
        {:else}
          <div class="index-list">
            {#each info.list as item}
              <button class="index-chip" type="button" onclick={() => onnavigate?.(item.kind, item.key)}>{item.label}</button>
            {/each}
          </div>
        {/if}
      {/if}
    </div>
    </div>

    <div class="sep"></div>

    <div class="menu-head">
      <span class="eyebrow">{t('ai.heading')}</span>
      {#if hasAngles}
        <span class="eyebrow dash" aria-hidden="true">—</span>
        <span class="angle-wrap">
          <button class="angle" type="button" onclick={() => (angleOpen = !angleOpen)} aria-expanded={angleOpen}>
            {angle === 'chart' ? t('ai.angleChart') : t('ai.angleGeneral')}
            <svg class="chev" class:up={angleOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {#if angleOpen}
            <ul class="angle-dd">
              <li class="dd-hint">{t('ai.angleHint')}</li>
              <li><button type="button" class:on={angle === 'chart'} onclick={() => setAngle('chart')}>{t('ai.angleChart')}</button></li>
              <li><button type="button" class:on={angle === 'general'} onclick={() => setAngle('general')}>{t('ai.angleGeneral')}</button></li>
            </ul>
          {/if}
        </span>
      {/if}
    </div>

    <div class="menu">
      {#if preferred}
        <div class="split" class:act={aiOpen}>
          <button class="split-go" type="button" onclick={() => openAI(preferred, editedPrompt)}>
            <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" />
            </svg>
            {preferred.label}
            <svg class="ai-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={preferred.icon} />
            </svg>
          </button>
          <button class="split-toggle" type="button" onclick={toggleAiList} aria-label={t('ai.switchAi')}>
            <svg class="chev" class:up={aiOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      {:else}
        <button class="mbtn" class:act={aiOpen} type="button" onclick={aiButtonClick}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" />
          </svg>
          {t('ai.openAi')}
          <svg class="chev" class:up={aiOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      {/if}
      <button class="mbtn" type="button" onclick={copyPrompt}>
        <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {t('ai.copyPrompt')}
      </button>
    </div>

    {#if aiOpen}
      <ul class="ai-list">
        {#each AIS as ai}
          <li>
            <button type="button" onclick={() => chooseAI(ai)}>
              <svg class="ai-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={ai.icon} />
              </svg>
              {ai.label}
            </button>
          </li>
        {/each}
        <li class="note">{t('ai.otherNote')}</li>
      </ul>
    {/if}

    <div class="subrow">
      <button class="vedit" type="button" onclick={toggleShowPrompt} aria-expanded={showPrompt}>
        {showPrompt ? t('ai.hidePrompt') : t('ai.showPrompt')}
      </button>
      {#if copied}
        <span class="copied" transition:fade={{ duration: 120 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 6" /></svg>
          {t('ai.copied')}
        </span>
      {/if}
    </div>

    {#if showPrompt}
      <textarea class="pbox" bind:this={promptEl} bind:value={editedPrompt}></textarea>
    {/if}
  </aside>
{/if}

<style>
  .scrim {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 60;
  }
  .panel {
    position: fixed;
    z-index: 61;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background: var(--surface);
    color: var(--text);
    border-top: 1px solid var(--border);
    border-radius: 16px 16px 0 0;
    /* dvh so the sheet's top (grabber + header) never hides behind the mobile
       address bar — see the same fix in InitialReport. */
    max-height: 88vh;
    max-height: 88dvh;
    /* The panel is a bounded flex column; the info body (flex:1) fills it and
       scrolls internally, so the IA section always sits at the bottom and the
       text uses every spare pixel above it. `hidden`, not `auto`: the inner
       body owns the scroll. */
    overflow: hidden;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    padding: 0.6rem 1.1rem 1.6rem;
  }
  @media (min-width: 680px) {
    .panel {
      left: auto;
      top: 0;
      bottom: 0;
      right: 0;
      width: 420px;
      max-height: none;
      border-top: none;
      border-left: 1px solid var(--border);
      border-radius: 0;
      padding: 1.2rem 1.3rem;
    }
  }
  /* Left-edge drag handle to resize the desktop drawer (hidden on mobile). */
  .resize {
    display: none;
  }
  @media (min-width: 680px) {
    .resize {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 11px;
      margin-left: -6px;
      cursor: ew-resize;
      z-index: 62;
    }
    .resize::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: transparent;
      transition: background 120ms;
    }
    .resize:hover::before,
    .panel.resizing .resize::before {
      background: var(--accent);
    }
  }
  .grabber {
    width: 40px;
    height: 4px;
    border-radius: 999px;
    background: #3a3a40;
    margin: 0.3rem auto 0.7rem;
    flex: none;
  }
  @media (min-width: 680px) {
    .grabber {
      display: none;
    }
  }
  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
    flex: none;
  }
  .eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #8a8a93;
  }
  h2 {
    font-size: 1.15rem;
    font-weight: 500;
    margin: 0.15rem 0 0;
    color: var(--text);
  }
  .head-actions {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    flex: none;
  }
  .hbtn {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 1rem;
    cursor: pointer;
    padding: 0.15rem 0.3rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
  }
  .hbtn:hover {
    color: var(--text);
  }
  .hbtn svg {
    width: 18px;
    height: 18px;
  }
  /* The info text gets its own scroll area, capped so the IA section below
     stays visible. ~3 paragraphs on mobile, ~4 on desktop. */
  /* Holds the bottom fade over the scroll box (see `hasMore`). */
  .info-scroll {
    position: relative;
    /* Grow to fill the panel so the text area reaches down to the IA section
       instead of stopping at a fixed cap. */
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
  .info-scroll::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2.5rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 140ms;
    background: linear-gradient(to bottom, transparent, var(--surface) 85%);
  }
  .info-scroll.more::after {
    opacity: 1;
  }
  .info-body {
    /* The margin (not padding) keeps a constant gap below the header even
       when the body is scrolled — the scroll box starts below the header. */
    margin-top: 0.85rem;
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: scroll;
    overscroll-behavior: contain;
    /* `scroll`, not `auto`, plus a permanently visible thumb: the overlay
       scrollbar Chromium/macOS hide until you move the pointer meant the
       drawer looked like it ended at the fold, and the tables underneath
       (the five types, the centre index) went unnoticed. A reserved track
       also stops the text reflowing when the bar appears. */
    scrollbar-width: thin;
    scrollbar-color: #4a4a54 transparent;
  }
  .info-body::-webkit-scrollbar {
    width: 8px;
  }
  .info-body::-webkit-scrollbar-thumb {
    background: #4a4a54;
    border-radius: 4px;
  }
  .info-body::-webkit-scrollbar-track {
    background: transparent;
  }
  .para {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #c4c4ca;
    margin: 0.7rem 0 0;
  }
  .qnote {
    margin-top: 0.25rem;
  }
  .xtable {
    margin-top: 0.4rem;
  }
  /* The cross name as a chip that opens that cross's own drawer (it holds only
     the name; the four gates sit beside it as plain text). */
  .xname-chip {
    white-space: normal;
    text-align: left;
    line-height: 1.3;
  }
  .xgates {
    color: var(--text-muted);
    white-space: nowrap;
    margin-left: 0.15rem;
  }
  .blist {
    padding-left: 1.05rem;
  }
  .blist li {
    margin-top: 0.3rem;
  }
  .subhead {
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--accent);
    margin: 1.1rem 0 -0.35rem;
  }
  .info-body .para:first-child {
    margin-top: 0;
  }
  /* Emphasis comes from {@html}, so it isn't scoped — target it globally. */
  .para :global(strong) {
    color: var(--text);
    font-weight: 600;
  }
  .para :global(em) {
    font-style: italic;
  }
  /* In-text cross-reference links: a subtle underline (kept light so the text
     doesn't feel cluttered), brightening on hover/focus. Rendered via {@html},
     so not scoped. */
  .para :global(.ilink) {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: #6a6a72;
    text-underline-offset: 2px;
    cursor: pointer;
  }
  .para :global(.ilink:hover),
  .para :global(.ilink:focus-visible) {
    color: var(--text);
    text-decoration-color: var(--accent);
    outline: none;
  }
  /* Full clickable index (all gates / all channels) inside the concept panel. */
  .index-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 1rem;
  }
  .index-chip {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text-muted);
    font-family: inherit;
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    cursor: pointer;
  }
  .index-chip:hover,
  .index-chip:focus-visible {
    border-color: var(--accent);
    color: var(--text);
    outline: none;
  }

  /* Schematic facts block (gates/channels): label column + chip rows aligned
     left with the first chip. */
  .facts {
    margin: 0.9rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .fact {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .fact-label {
    flex: none;
    /* Snug by default: the label sits right next to its chips (channels / gates
       / centres) so they don't drift far to the right. */
    font-size: 0.8rem;
    color: var(--text-muted);
    padding-top: 0.24rem;
    white-space: nowrap;
  }
  /* Only the cross needs a fixed-width label column, so its two blocks start
     their rows at the same x ("sol"/"tierra" line up under each other). */
  .facts.aligned .fact-label {
    width: 6.6rem;
  }
  .fact-rows {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 0;
  }
  /* Note-less facts (e.g. a channel's two centres) sit inline on one line. */
  .fact-rows.inline {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
  }
  /* Row prefix ("sol" / "tierra" on the cross): fixed width so the chips of
     both rows line up under each other. */
  /* Small italic "i" matching InfoDot, opening the label's own drawer. Hidden
     until the row is hovered, like the "i" on the chart's cards — otherwise six
     of them shout at once. Touch has no hover, so there it stays visible. */
  .fact-dot {
    opacity: 0;
    transition: opacity 0.12s;
    margin-left: 0.15rem;
    padding: 0;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 1px solid #4a4a54;
    background: var(--surface-2);
    color: var(--text-muted);
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
    font-size: 9px;
    line-height: 1;
    cursor: pointer;
    vertical-align: middle;
  }
  .fact-row:hover .fact-dot,
  .fact-label:hover .fact-dot,
  .fact-dot:focus-visible,
  .fact-shown .fact-dot {
    opacity: 1;
  }
  .fact-dot:hover,
  .fact-dot:focus-visible {
    color: var(--accent);
    border-color: var(--accent);
  }
  .fact-pre {
    flex: none;
    /* Just wide enough for the longest body word plus its "i". */
    width: 3.9rem;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  .fact-row {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    flex-wrap: wrap;
  }
  .fact-note {
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  /* Tiny passive "i" (superscript) with a tooltip — not the interactive
     InfoDot; it only clarifies the label ("completa el canal"). */
  .fact-i {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 13px;
    margin-left: 3px;
    border-radius: 50%;
    border: 1px solid #4a4a54;
    background: var(--surface-2);
    color: var(--text-muted);
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
    font-size: 9px;
    line-height: 1;
    vertical-align: super;
    cursor: help;
    position: relative;
  }
  .fact-i[data-tip]:hover::after {
    content: attr(data-tip);
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: system-ui, sans-serif;
    font-style: normal;
    font-size: 0.75rem;
    font-weight: 400;
    padding: 0.3rem 0.55rem;
    border-radius: 7px;
    white-space: pre;
    pointer-events: none;
    z-index: 40;
  }

  /* Gold chip — schematic facts and the current element of a closed set. */
  .index-chip.gold {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  /* The nine-centre list + the "[chip] name" full index: one item/line. */
  .cstates,
  .index-rows {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .cstate {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Closed-set schema table at the end of a value/concept drawer. Borderless;
     chip · phrase · optional %. */
  .index-chip:hover,
  .index-chip:focus-visible {
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  .related {
    margin-top: 1.1rem;
    padding-top: 0.9rem;
    border-top: 1px solid var(--border);
  }
  .rel-head {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }
  .rel-table {
    border-collapse: collapse;
    width: 100%;
  }
  .rel-table td {
    padding: 0.22rem 0.5rem 0.22rem 0;
    vertical-align: middle;
  }
  .rt-chip {
    white-space: nowrap;
    width: 1%;
  }
  .rt-note {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.35;
  }
  .rt-pct {
    white-space: nowrap;
    text-align: right;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  .sep {
    border-top: 1px solid var(--border);
    margin: 1.3rem 0 0.95rem;
    flex: none;
  }
  .menu-head {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.4rem;
    flex: none;
  }
  .angle-wrap {
    position: relative;
    display: inline-flex;
  }
  /* Same size/typeface and colour as the section label; only the chevron
     is amber to mark it as interactive. */
  .angle {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: 0.7rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #8a8a93;
    cursor: pointer;
  }
  .angle .chev {
    width: 13px;
    height: 13px;
    color: var(--accent);
    transition: transform 120ms;
  }
  .angle .chev.up {
    transform: rotate(180deg);
  }
  /* Floats up over the label so opening it doesn't shift the rest. */
  .angle-dd {
    position: absolute;
    bottom: calc(100% + 6px);
    left: -0.5rem;
    list-style: none;
    margin: 0;
    padding: 4px;
    border: 1px solid var(--border);
    border-radius: 9px;
    background: #1b1b1f;
    white-space: nowrap;
    z-index: 5;
  }
  /* Leading explanatory line: what this selector actually changes. */
  .angle-dd .dd-hint {
    padding: 0.35rem 0.55rem 0.45rem;
    max-width: 14rem;
    font-size: 0.68rem;
    line-height: 1.35;
    letter-spacing: normal;
    text-transform: none;
    color: #8a8a93;
    border-bottom: 1px solid var(--border);
    margin-bottom: 4px;
    white-space: normal;
  }
  .angle-dd li button {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    color: #cfcfd4;
    font-family: inherit;
    font-size: 0.7rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.4rem 0.55rem;
    border-radius: 6px;
    cursor: pointer;
  }
  .angle-dd li button:hover {
    background: var(--surface-2);
  }
  .angle-dd li button.on {
    color: var(--accent);
  }
  .menu {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.9rem;
    flex: none;
  }
  .mbtn,
  .split {
    flex: 1;
    min-width: 0;
  }
  .mbtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 9px;
    padding: 0.55rem 0.5rem;
    color: var(--text);
    font-size: 0.8rem;
    cursor: pointer;
    white-space: nowrap;
  }
  .mbtn:hover {
    border-color: #3a3a42;
  }
  .mbtn.act {
    border-color: var(--accent);
  }
  .split {
    display: flex;
    border: 1px solid var(--border);
    border-radius: 9px;
    overflow: hidden;
  }
  .split.act {
    border-color: var(--accent);
  }
  .split-go {
    flex: 1;
    min-width: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    background: var(--surface-2);
    border: none;
    color: var(--text);
    font-size: 0.8rem;
    padding: 0.55rem 0.4rem;
    cursor: pointer;
    white-space: nowrap;
  }
  .split-toggle {
    background: var(--surface-2);
    border: none;
    border-left: 1px solid var(--border);
    color: var(--text-muted);
    padding: 0 0.45rem;
    cursor: pointer;
  }
  .split-toggle:hover {
    color: var(--text);
  }
  .ic {
    width: 15px;
    height: 15px;
    color: var(--accent);
    flex: none;
  }
  /* Real brand logos — keep their own colour (currentColor = text) rather
     than the amber accent, so each mark reads as itself. */
  .ai-logo {
    width: 15px;
    height: 15px;
    color: var(--text);
    flex: none;
  }
  .chev {
    width: 14px;
    height: 14px;
    color: var(--text-muted);
    transition: transform 120ms;
    flex: none;
  }
  .chev.up {
    transform: rotate(180deg);
    color: var(--accent);
  }
  .ai-list {
    list-style: none;
    margin: 0.6rem 0 0;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 9px;
    overflow: hidden;
    flex: none;
  }
  .ai-list li {
    border-bottom: 1px solid var(--border);
  }
  .ai-list li:last-child {
    border-bottom: none;
  }
  .ai-list button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: var(--text);
    font-size: 0.82rem;
    padding: 0.6rem 0.7rem;
    cursor: pointer;
  }
  .ai-list button:hover {
    background: var(--surface-2);
  }
  .note {
    font-size: 0.72rem;
    line-height: 1.5;
    color: #76767e;
    padding: 0.55rem 0.7rem;
  }
  /* "Ver/editar prompt" toggle (same grey as the section label, no chevron)
     on the left; the transient green "Copiado" feedback on the right, kept
     close under the copy button. */
  .subrow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-top: 0.5rem;
    flex: none;
  }
  .vedit {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: 0.78rem;
    color: #8a8a93;
    cursor: pointer;
  }
  .vedit:hover {
    color: var(--text);
  }
  .copied {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--success);
    font-size: 0.78rem;
  }
  .copied svg {
    width: 14px;
    height: 14px;
  }
  .pbox {
    width: 100%;
    box-sizing: border-box;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 9px;
    padding: 0.6rem 0.7rem;
    margin-top: 0.6rem;
    font-family: inherit;
    font-size: 0.8rem;
    line-height: 1.55;
    color: var(--text);
    resize: vertical;
    /* Pinned at the bottom, the IA section must not push the layout off-screen
       when a long prompt is revealed: cap the box and let it scroll instead. */
    flex: none;
    max-height: 40vh;
    overflow-y: auto;
  }
  .pbox:focus {
    outline: none;
    border-color: var(--accent);
  }
</style>
