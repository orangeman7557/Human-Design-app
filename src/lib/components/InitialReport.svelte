<!-- Initial report (Phase 7). Full-screen overlay that assembles a plain-language -->
<!-- first reading of the chart from buildReport(), with a short table of contents, -->
<!-- in-text links that open the element drawers (delegated to the parent via -->
<!-- onnavigate), a card walk-through of the centres, and a closing "Saber más" -->
<!-- AI-handoff (modelled on the drawers' IA section) whose prompt is pre-filled -->
<!-- with the chart's essentials and left open-ended for the user to complete. -->
<script>
  import { untrack } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { renderInline } from '$lib/markup.js';
  import { buildReport, buildReportPrompt } from '$lib/hd/report.js';
  import { AIS, getPreferredAI, setPreferredAI, openAI } from '$lib/ai/handoff.js';
  import { focusTrap } from './focus-trap.js';

  /**
   * @type {{
   *   open?: boolean,
   *   chart?: any,
   *   onclose: () => void,
   *   onnavigate?: (kind: string, key: string) => void,
   *   ondownloadpdf?: (data: { sections: any[] }) => Promise<void> | void,
   *   onshare?: () => void
   * }}
   */
  let { open = false, chart = null, onclose, onnavigate, ondownloadpdf, onshare } = $props();

  const sections = $derived(open && chart ? buildReport(chart) : []);
  const prompt = $derived(open && chart ? buildReportPrompt(chart) : '');

  // Short labels for the table of contents (section titles are longer).
  const TOC = {
    intro: 'Qué es Human Design', experiment: 'Un experimento vital', chart: 'Bodygraph',
    type: 'Tu tipo', centers: 'Tus centros', strategy: 'Tu estrategia', authority: 'Tu autoridad',
    profile: 'Tu perfil', definition: 'Tu definición', practice: 'Vivir tu diseño'
  };

  /** @type {HTMLDivElement | undefined} */
  let bodyEl = $state();

  // ── "Saber más usando IA" handoff state (same machinery as the drawers). ──
  let aiOpen = $state(false);
  let showPrompt = $state(true); // visible by default here
  let copied = $state(false);
  let pdfBusy = $state(false);
  /** @type {{ id: string, label: string, icon: string } | null} */
  let preferred = $state(null);
  let editedPrompt = $state('');
  /** @type {HTMLTextAreaElement | undefined} */
  let promptEl = $state();
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let copyTimer;

  $effect(() => {
    if (!open) return;
    untrack(() => {
      if (bodyEl) bodyEl.scrollTop = 0;
      aiOpen = false;
      showPrompt = true;
      copied = false;
      pdfBusy = false;
      preferred = getPreferredAI();
    });
    // Re-seed the editable prompt whenever the chart's prompt changes.
    editedPrompt = prompt;
  });

  // Keep the textarea sized to its content.
  $effect(() => {
    editedPrompt;
    if (promptEl) {
      promptEl.style.height = 'auto';
      promptEl.style.height = promptEl.scrollHeight + 'px';
    }
  });

  function onkeydown(e) {
    if (e.key === 'Escape' && open) onclose?.();
  }

  function scrollTo(id) {
    bodyEl?.querySelector(`#report-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // In-text links ([label](kind:key)) open the matching element drawer.
  function navFromEvent(e) {
    const link = e.target.closest?.('[data-link]');
    if (!link) return;
    e.preventDefault();
    const raw = link.dataset.link;
    const i = raw.indexOf(':');
    const kind = raw.slice(0, i);
    const key = raw.slice(i + 1);
    // `section:` links scroll within the report; everything else opens the
    // matching element drawer (owned by the parent).
    if (kind === 'section') scrollTo(key);
    else onnavigate?.(kind, key);
  }
  function onContentKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') navFromEvent(e);
  }

  function flagCopied() {
    copied = true;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copied = false), 2000);
  }
  function copyPrompt() {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(editedPrompt).then(flagCopied).catch(() => fallbackCopy(editedPrompt));
    } else {
      fallbackCopy(editedPrompt);
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
      // Give up silently — the prompt is visible to copy by hand.
    }
  }
  async function downloadPdf() {
    if (pdfBusy) return;
    pdfBusy = true;
    try {
      // The parent owns the chart capture (the cover image) and the jsPDF call;
      // we hand it the assembled report sections so it doesn't re-derive them.
      // (The on-screen "Saber más" prompt below is intentionally not in the PDF.)
      await ondownloadpdf?.({ sections });
    } finally {
      pdfBusy = false;
    }
  }
  function aiButtonClick() {
    if (preferred) openAI(preferred, editedPrompt);
    else aiOpen = !aiOpen;
  }
  function chooseAI(ai) {
    setPreferredAI(ai.id);
    preferred = ai;
    aiOpen = false;
    openAI(ai, editedPrompt);
  }
</script>

<svelte:window {onkeydown} />

{#if open && chart}
  <div class="scrim" onclick={onclose} role="presentation" transition:fade={{ duration: 150 }}></div>
  <aside class="report" role="dialog" aria-modal="true" aria-label="Tu informe inicial personalizado" use:focusTrap transition:fly={{ y: 30, duration: 220 }}>
    <header>
      <div>
        <div class="eyebrow">Tu informe inicial personalizado</div>
        <h2>Conoce tu diseño</h2>
      </div>
      <div class="head-actions">
        <button
          class="share-btn"
          type="button"
          onclick={() => onshare?.()}
          title="Compartir enlace al informe"
          aria-label="Compartir enlace al informe"
        >
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
        <button
          class="pdf-btn"
          type="button"
          onclick={downloadPdf}
          disabled={pdfBusy}
          title={pdfBusy ? 'Generando PDF…' : 'Descargar el informe en PDF'}
          aria-label="Descargar el informe en PDF"
        >
          {#if pdfBusy}
            <svg class="ic spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          {:else}
            <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 3v12" /><path d="m8 11 4 4 4-4" /><path d="M4 21h16" />
            </svg>
          {/if}
          <span class="pdf-lbl">PDF</span>
        </button>
        <button class="close" type="button" onclick={onclose} aria-label="Cerrar">✕</button>
      </div>
    </header>

    <nav class="toc" aria-label="Secciones del informe">
      {#each sections as s}
        <button class="toc-chip" type="button" onclick={() => scrollTo(s.id)}>{TOC[s.id] ?? s.title}</button>
      {/each}
      <button class="toc-chip" type="button" onclick={() => scrollTo('handoff')}>Saber más</button>
    </nav>

    <div class="body" bind:this={bodyEl} role="presentation" onclick={navFromEvent} onkeydown={onContentKeydown}>
      {#each sections as s}
        <section id={`report-${s.id}`}>
          <h3>{s.title}</h3>
          {#each s.paragraphs as p}
            {#if typeof p === 'string'}
              <p>{@html renderInline(p)}</p>
            {:else if p.bullets}
              <ul class="rbullets">
                {#each p.bullets as b}<li>{@html renderInline(b)}</li>{/each}
              </ul>
            {:else if p.subhead}
              <p class="subhead">{@html renderInline(p.subhead)}</p>
            {/if}
          {/each}
          {#if s.items}
            <div class="centres">
              {#each s.items as c}
                <div class="ccard" class:open={!c.defined}>
                  <div class="cchip">
                    <span class="cname">{c.title}</span>
                    <span class="ctag">{c.defined ? 'definido' : 'abierto'}</span>
                  </div>
                  <p>{@html renderInline(c.fn)}</p>
                  <p>{@html renderInline(c.state)}</p>
                </div>
              {/each}
            </div>
          {/if}
        </section>
      {/each}

      <!-- Closing handoff, styled like the drawers' "Saber más usando IA". -->
      <section id="report-handoff" class="handoff">
        <h3>Saber más</h3>
        <p>Este informe es una primera impresión. Para profundizar en lo que más te interese, lleva tu carta a tu IA: el prompt ya lleva tus datos esenciales; complétalo con lo que quieras explorar.</p>

        <div class="menu-head">
          <span class="ia-label">Saber más usando IA</span>
          <span class="ia-dash" aria-hidden="true">—</span>
          <span class="ia-angle">Sobre esta carta</span>
        </div>

        <div class="menu">
          {#if preferred}
            <div class="split" class:act={aiOpen}>
              <button class="split-go" type="button" onclick={() => openAI(preferred, editedPrompt)}>
                <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" />
                </svg>
                {preferred.label}
                <svg class="ai-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={preferred.icon} /></svg>
              </button>
              <button class="split-toggle" type="button" onclick={() => (aiOpen = !aiOpen)} aria-label="Cambiar IA">
                <svg class="chev" class:up={aiOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </button>
            </div>
          {:else}
            <button class="mbtn" class:act={aiOpen} type="button" onclick={aiButtonClick}>
              <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" />
              </svg>
              Abrir IA
              <svg class="chev" class:up={aiOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
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
                  <svg class="ai-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={ai.icon} /></svg>
                  {ai.label}
                </button>
              </li>
            {/each}
            <li class="note">Para otras IA, usa "Copiar prompt" y pégalo donde quieras.</li>
          </ul>
        {/if}

        <div class="subrow">
          <button class="vedit" type="button" onclick={() => (showPrompt = !showPrompt)} aria-expanded={showPrompt}>
            {showPrompt ? 'Ocultar el prompt' : 'Ver/editar el prompt'}
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
      </section>
    </div>
  </aside>
{/if}

<style>
  .scrim {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 50;
  }
  .report {
    position: fixed;
    z-index: 51;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 100%;
    max-width: 680px;
    height: 92vh;
    display: flex;
    flex-direction: column;
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 16px 16px 0 0;
    overflow: hidden;
  }
  @media (min-width: 720px) {
    .report {
      top: 50%;
      bottom: auto;
      transform: translate(-50%, -50%);
      height: 88vh;
      border-radius: 16px;
    }
  }
  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 1.1rem 1.2rem 0.8rem;
    border-bottom: 1px solid var(--border);
    flex: none;
  }
  .eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
  }
  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0.2rem 0 0;
  }
  .head-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: none;
  }
  /* Primary action in the header: a gold pill, matching the chart page's
     report button and the overlay's gold accents. */
  .pdf-btn,
  .share-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: var(--accent-soft);
    border: 1px solid var(--accent);
    color: var(--accent);
    border-radius: 999px;
    padding: 0.32rem 0.7rem;
    font-family: inherit;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
  }
  .share-btn {
    padding: 0.32rem 0.55rem;
  }
  .pdf-btn:hover:not(:disabled),
  .share-btn:hover {
    background: var(--accent);
    color: #1a1408;
  }
  .pdf-btn:disabled {
    cursor: progress;
    opacity: 0.7;
  }
  .pdf-btn .ic,
  .share-btn .ic {
    width: 15px;
    height: 15px;
    flex: none;
  }
  .spin {
    animation: report-spin 0.8s linear infinite;
  }
  @keyframes report-spin {
    to {
      transform: rotate(360deg);
    }
  }
  .close {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0.2rem 0.4rem;
    line-height: 1;
  }
  .close:hover {
    color: var(--text);
  }
  .toc {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    padding: 0.7rem 1.2rem;
    border-bottom: 1px solid var(--border);
    flex: none;
  }
  .toc-chip {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text-muted);
    font-family: inherit;
    font-size: 0.74rem;
    padding: 0.2rem 0.6rem;
    cursor: pointer;
  }
  .toc-chip:hover,
  .toc-chip:focus-visible {
    border-color: var(--accent);
    color: var(--text);
    outline: none;
  }
  .body {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    padding: 0.5rem 1.2rem 2rem;
  }
  section {
    padding: 1.6rem 0;
    border-bottom: 1px solid #202024;
    scroll-margin-top: 0.5rem;
  }
  section:last-child {
    border-bottom: none;
  }
  /* Gold section titles, larger, with a touch of tracking, so the report reads
     as a sequence of clear chapters rather than a wall of text. */
  h3 {
    font-size: 1.12rem;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 0.01em;
    margin: 0 0 0.8rem;
  }
  /* Sub-heading inside a section (e.g. "Tú eres un Manifestador"). Styled as a
     soft accent pill — clearly a highlight, but distinct from the gold section
     titles so it can't be mistaken for one. */
  .subhead {
    display: inline-block;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
    background: var(--accent-soft);
    border: 1px solid var(--accent);
    border-radius: 999px;
    padding: 0.25rem 0.8rem;
    margin: 1.6rem 0 0.2rem;
  }
  /* Bulleted list (the five types in "Tu tipo"). */
  .rbullets {
    margin: 0.75rem 0 0;
    padding-left: 1.15rem;
  }
  .rbullets li {
    font-size: 0.92rem;
    line-height: 1.6;
    color: #c4c4ca;
    margin: 0.5rem 0 0;
  }
  .rbullets li::marker {
    color: var(--accent);
  }
  p {
    font-size: 0.92rem;
    line-height: 1.65;
    color: #c4c4ca;
    margin: 0.75rem 0 0;
  }
  p:first-of-type {
    margin-top: 0;
  }
  /* {@html} content isn't scoped — target it globally inside the body. */
  .body :global(strong) {
    color: var(--text);
    font-weight: 600;
  }
  .body :global(em) {
    font-style: italic;
  }
  .body :global(.ilink) {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: #6a6a72;
    text-underline-offset: 2px;
    cursor: pointer;
  }
  .body :global(.ilink:hover),
  .body :global(.ilink:focus-visible) {
    color: var(--text);
    text-decoration-color: var(--accent);
    outline: none;
  }
  /* Centre walk-through as cards with a name chip + state tag. */
  .centres {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-top: 1rem;
  }
  .ccard {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    border-radius: 10px;
    padding: 0.8rem 0.9rem 0.9rem;
  }
  .ccard.open {
    border-left-color: #46465a;
  }
  .cchip {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.3rem;
  }
  .cname {
    font-size: 0.98rem;
    font-weight: 600;
    color: var(--text);
  }
  .ctag {
    font-size: 0.64rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .ccard.open .ctag {
    color: #8a8a93;
  }
  .ccard p {
    font-size: 0.88rem;
    margin-top: 0.45rem;
  }
  /* ── Handoff ("Saber más usando IA"), mirrors ElementInfo. ── */
  .handoff {
    margin-top: 0.4rem;
  }
  .menu-head {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 1.2rem;
  }
  .ia-label,
  .ia-angle {
    font-size: 0.7rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #8a8a93;
  }
  .ia-dash {
    color: #8a8a93;
  }
  .ia-angle {
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
    font-family: inherit;
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
    font-family: inherit;
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
    font-family: inherit;
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
    min-height: 5rem;
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
