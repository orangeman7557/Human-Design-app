<!-- AI-authored — reusable element info panel (Phase 6.A). -->
<!-- Bottom sheet on mobile (slides up), right-hand drawer on desktop -->
<!-- (slides in from the right). Holds the element's general info plus a -->
<!-- "Saber más usando IA" section with: -->
<!--   - an inline angle selector ("Sobre esta carta" / "Info general") that -->
<!--     picks which prompt the actions use (hidden when only one applies). -->
<!--   - "Copiar prompt": copies straight away and shows an editable copy; -->
<!--     editing clears the tick until copied again. -->
<!--   - "Abrir IA": opens the user's AI with the prompt prefilled and -->
<!--     remembers the choice (chevron re-opens the picker to change it). -->
<!-- One instance serves every element kind; only the props change. -->
<script>
  import { untrack } from 'svelte';
  import { fly } from 'svelte/transition';
  import { AIS, getPreferredAI, setPreferredAI, openAI } from '$lib/ai/handoff.js';

  /**
   * @type {{
   *   open?: boolean,
   *   category?: string,
   *   info?: { title: string, paragraphs: string[] } | null,
   *   prompts?: { general: string, chart: string | null } | null,
   *   onclose: () => void
   * }}
   */
  let { open = false, category = '', info = null, prompts = null, onclose } = $props();

  /** Which tool is expanded: 'prompt' | 'ai' | null. */
  let expanded = $state(null);
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

  const hasAngles = $derived(!!prompts?.chart);

  // Track the breakpoint live so the open direction is right without a race.
  $effect(() => {
    const mq = window.matchMedia('(min-width: 680px)');
    const update = () => (wide = mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  });

  // Reset transient state and pick the default angle each time it opens.
  // Wrapped in untrack so reading angle/prompts here doesn't make the effect
  // re-run (and reset the angle) every time the user switches angle.
  $effect(() => {
    if (!open) return;
    untrack(() => {
      expanded = null;
      angleOpen = false;
      copied = false;
      preferred = getPreferredAI();
      angle = prompts?.chart ? 'chart' : 'general';
      editedPrompt = prompts?.[angle] ?? '';
    });
  });

  // Keep the textarea sized to its content — also when switching angle
  // swaps the text under it (a plain input listener wouldn't catch that).
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
    copied = false;
    editedPrompt = prompts?.[a] ?? '';
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(editedPrompt);
      copied = true;
    } catch {
      copied = false;
    }
  }

  // Opening the prompt tool copies straight away (the common intent).
  function togglePrompt() {
    if (expanded === 'prompt') {
      expanded = null;
      return;
    }
    expanded = 'prompt';
    copyPrompt();
  }

  function toggleAiList() {
    expanded = expanded === 'ai' ? null : 'ai';
  }

  function chooseAI(ai) {
    setPreferredAI(ai.id);
    preferred = ai;
    expanded = null;
    openAI(ai, editedPrompt);
  }

  function onkeydown(e) {
    if (e.key === 'Escape' && open) onclose();
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

    {#each info.paragraphs as p}
      <p class="para">{p}</p>
    {/each}

    <div class="sep"></div>

    <div class="menu-head">
      <span class="eyebrow">Saber más usando IA</span>
      {#if hasAngles}
        <span class="eyebrow dash" aria-hidden="true">—</span>
        <button class="angle" type="button" onclick={() => (angleOpen = !angleOpen)} aria-expanded={angleOpen}>
          {angle === 'chart' ? 'Sobre esta carta' : 'Info general'}
          <svg class="chev" class:up={angleOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      {/if}
    </div>

    {#if angleOpen}
      <ul class="angle-dd">
        <li>
          <button type="button" class:on={angle === 'chart'} onclick={() => setAngle('chart')}>
            Sobre esta carta
            {#if angle === 'chart'}<svg class="ck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 6" /></svg>{/if}
          </button>
        </li>
        <li>
          <button type="button" class:on={angle === 'general'} onclick={() => setAngle('general')}>
            Info general
            {#if angle === 'general'}<svg class="ck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 6" /></svg>{/if}
          </button>
        </li>
      </ul>
    {/if}

    <div class="menu">
      <button class="mbtn" class:act={expanded === 'prompt'} type="button" onclick={togglePrompt}>
        <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        Copiar prompt
      </button>

      {#if preferred}
        <div class="split" class:act={expanded === 'ai'}>
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
            <svg class="chev" class:up={expanded === 'ai'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      {:else}
        <button class="mbtn" class:act={expanded === 'ai'} type="button" onclick={toggleAiList}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" />
          </svg>
          Abrir IA
          <svg class="chev" class:up={expanded === 'ai'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      {/if}
    </div>

    {#if expanded === 'prompt'}
      <textarea class="pbox" bind:this={promptEl} bind:value={editedPrompt} oninput={() => (copied = false)}></textarea>
      <div class="copy-row">
        <span class="hint">Copia el texto y pégalo en tu app de IA.</span>
        <button class="copy" type="button" onclick={copyPrompt}>{copied ? 'Copiado ✓' : 'Copiar'}</button>
      </div>
    {/if}

    {#if expanded === 'ai'}
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
  .para {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #c4c4ca;
    margin: 0.7rem 0 0;
  }
  /* Air between the info text and the "Saber más" divider. */
  .sep {
    border-top: 1px solid var(--border);
    margin: 1.9rem 0 0.95rem;
  }
  /* Inline angle selector: same size/typeface as the section label, only
     the colour differs so the selectable value stands out. */
  .menu-head {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
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
    color: var(--text);
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
  .angle-dd {
    list-style: none;
    margin: 0.55rem 0 0;
    padding: 4px;
    border: 1px solid var(--border);
    border-radius: 9px;
    background: #1b1b1f;
    width: 200px;
  }
  .angle-dd li button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    background: none;
    border: none;
    color: #cfcfd4;
    font-family: inherit;
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    border-radius: 6px;
    cursor: pointer;
  }
  .angle-dd li button:hover {
    background: var(--surface-2);
  }
  .angle-dd li button.on {
    background: var(--accent-soft);
    color: var(--accent);
  }
  .angle-dd .ck {
    width: 14px;
    height: 14px;
    flex: none;
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
  .pbox {
    width: 100%;
    box-sizing: border-box;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 9px;
    padding: 0.6rem 0.7rem;
    margin-top: 0.65rem;
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
  .copy-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-top: 0.45rem;
  }
  .hint {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin: 0;
  }
  .copy {
    background: var(--accent);
    color: #1a1408;
    border: none;
    border-radius: 8px;
    padding: 0.4rem 0.9rem;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
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
</style>
