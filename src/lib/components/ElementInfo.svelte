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
  import { AIS, getPreferredAI, setPreferredAI, openAI } from '$lib/ai/handoff.js';

  /**
   * @type {{
   *   open?: boolean,
   *   category?: string,
   *   info?: { title: string, paragraphs: string[] } | null,
   *   prompts?: { general: string, chart: string | null } | null,
   *   elementKey?: string,
   *   onclose: () => void
   * }}
   */
  let { open = false, category = '', info = null, prompts = null, elementKey = '', onclose } = $props();

  let aiOpen = $state(false);
  let showPrompt = $state(false);
  let copied = $state(false);
  /** @type {{ id: string, label: string } | null} */
  let preferred = $state(null);
  /** Active prompt angle: 'chart' | 'general'. */
  let angle = $state('chart');
  let angleOpen = $state(false);
  let editedPrompt = $state('');
  let wide = $state(false);
  /** @type {HTMLTextAreaElement | undefined} */
  let promptEl = $state();
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
      angle = prompts?.chart ? 'chart' : 'general';
      editedPrompt = prompts?.[angle] ?? '';
    });
  });

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
    editedPrompt = prompts?.[a] ?? '';
  }

  function copyPrompt() {
    navigator.clipboard
      .writeText(editedPrompt)
      .then(() => {
        copied = true;
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => (copied = false), 2000);
      })
      .catch(() => {});
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
    if (e.key === 'Escape' && open) onclose();
  }

  // The content uses Markdown-style emphasis: **bold** and *italic*. Render it
  // safely — the text is all ours, but we still escape HTML first and only
  // then turn the markers into <strong>/<em>.
  function renderInline(text) {
    const esc = String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return esc
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }
</script>

<svelte:window {onkeydown} />

{#if open && info}
  <div class="scrim" onclick={onclose} role="presentation" transition:fly={{ duration: 150, opacity: 0 }}></div>
  <aside
    class="panel"
    role="dialog"
    aria-modal="true"
    aria-label={info.title}
    transition:fly={{ x: wide ? 460 : 0, y: wide ? 0 : 60, duration: 240, opacity: 1 }}
  >
    <div class="grabber" aria-hidden="true"></div>

    <header>
      <div>
        {#if category}<div class="eyebrow">{category}</div>{/if}
        <h2>{info.title}</h2>
      </div>
      <button class="close" type="button" onclick={onclose} aria-label="Cerrar">✕</button>
    </header>

    <div class="info-body">
      {#each info.paragraphs as p}
        <p class="para">{@html renderInline(p)}</p>
      {/each}
    </div>

    <div class="sep"></div>

    <div class="menu-head">
      <span class="eyebrow">Saber más usando IA</span>
      {#if hasAngles}
        <span class="eyebrow dash" aria-hidden="true">—</span>
        <span class="angle-wrap">
          <button class="angle" type="button" onclick={() => (angleOpen = !angleOpen)} aria-expanded={angleOpen}>
            {angle === 'chart' ? 'Sobre esta carta' : 'Info general'}
            <svg class="chev" class:up={angleOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {#if angleOpen}
            <ul class="angle-dd">
              <li><button type="button" class:on={angle === 'chart'} onclick={() => setAngle('chart')}>Sobre esta carta</button></li>
              <li><button type="button" class:on={angle === 'general'} onclick={() => setAngle('general')}>Info general</button></li>
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
            <svg class="ai-glyph" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
            </svg>
          </button>
          <button class="split-toggle" type="button" onclick={toggleAiList} aria-label="Cambiar IA">
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
          Abrir IA
          <svg class="chev" class:up={aiOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      {/if}
      <button class="mbtn" type="button" onclick={copyPrompt}>
        <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        Copiar prompt
      </button>
    </div>

    {#if aiOpen}
      <ul class="ai-list">
        {#each AIS as ai}
          <li>
            <button type="button" onclick={() => chooseAI(ai)}>
              <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" />
              </svg>
              {ai.label}
            </button>
          </li>
        {/each}
        <li class="note">Para otras IA, usa «Copiar prompt» y pégalo donde quieras.</li>
      </ul>
    {/if}

    <div class="subrow">
      <button class="vedit" type="button" onclick={toggleShowPrompt} aria-expanded={showPrompt}>
        {showPrompt ? 'Ocultar prompt' : 'Ver/editar prompt'}
      </button>
      {#if copied}
        <span class="copied" transition:fade={{ duration: 120 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 6" /></svg>
          Copiado
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
    max-height: 88vh;
    overflow-y: auto;
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
  .close {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 1rem;
    cursor: pointer;
    padding: 0.1rem 0.3rem;
    line-height: 1;
  }
  .close:hover {
    color: var(--text);
  }
  /* The info text gets its own scroll area, capped so the IA section below
     stays visible. ~3 paragraphs on mobile, ~4 on desktop. */
  .info-body {
    max-height: 24rem;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  @media (min-width: 680px) {
    .info-body {
      max-height: 26rem;
    }
  }
  .para {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #c4c4ca;
    margin: 0.7rem 0 0;
  }
  /* Emphasis comes from {@html}, so it isn't scoped — target it globally. */
  .para :global(strong) {
    color: var(--text);
    font-weight: 600;
  }
  .para :global(em) {
    font-style: italic;
  }
  .sep {
    border-top: 1px solid var(--border);
    margin: 1.9rem 0 0.95rem;
    flex: none;
  }
  /* Twice the air above the IA section on desktop. */
  @media (min-width: 680px) {
    .sep {
      margin-top: 3.8rem;
    }
  }
  .menu-head {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.4rem;
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
  .ai-glyph {
    width: 14px;
    height: 14px;
    color: var(--accent);
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
    overflow: hidden;
  }
  .pbox:focus {
    outline: none;
    border-color: var(--accent);
  }
</style>
