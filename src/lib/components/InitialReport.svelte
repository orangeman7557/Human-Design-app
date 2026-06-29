<!-- Initial report (Phase 7). Full-screen overlay that assembles a plain-language -->
<!-- first reading of the chart from buildReport(), with a short table of contents, -->
<!-- in-text links that open the element drawers (delegated to the parent via -->
<!-- onnavigate), and a closing AI-handoff for a personalised reading. -->
<script>
  import { fly, fade } from 'svelte/transition';
  import { renderInline } from '$lib/markup.js';
  import { buildReport, buildReportPrompt } from '$lib/hd/report.js';
  import { AIS, getPreferredAI, openAI } from '$lib/ai/handoff.js';

  /**
   * @type {{
   *   open?: boolean,
   *   chart?: any,
   *   onclose: () => void,
   *   onnavigate?: (kind: string, key: string) => void
   * }}
   */
  let { open = false, chart = null, onclose, onnavigate } = $props();

  const sections = $derived(open && chart ? buildReport(chart) : []);
  const prompt = $derived(open && chart ? buildReportPrompt(chart) : '');

  // Short labels for the table of contents (the section titles are longer).
  const TOC = {
    intro: 'Qué es', ants: 'Hormigas', chart: 'La carta', conditioning: 'Condicionamiento',
    experiment: 'Desacondicionar', type: 'Tu tipo', collective: 'El colectivo',
    strategy: 'Estrategia', authority: 'Autoridad', practice: 'En la práctica',
    profile: 'Perfil', definition: 'Definición', centers: 'Centros'
  };

  /** @type {HTMLDivElement | undefined} */
  let bodyEl = $state();
  let copied = $state(false);
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let copyTimer;

  $effect(() => {
    if (open && bodyEl) bodyEl.scrollTop = 0;
  });

  function onkeydown(e) {
    if (e.key === 'Escape' && open) onclose?.();
  }

  function scrollTo(id) {
    bodyEl?.querySelector(`#report-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // In-text links ([label](kind:key)) open the matching element drawer; the
  // parent owns that drawer, so we just hand it the kind/key.
  function navFromEvent(e) {
    const link = e.target.closest?.('[data-link]');
    if (!link) return;
    e.preventDefault();
    const raw = link.dataset.link;
    const i = raw.indexOf(':');
    onnavigate?.(raw.slice(0, i), raw.slice(i + 1));
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
      navigator.clipboard.writeText(prompt).then(flagCopied).catch(() => flagCopied());
    } else {
      flagCopied();
    }
  }
  function openInAI() {
    openAI(getPreferredAI() ?? AIS[0], prompt);
  }
</script>

<svelte:window {onkeydown} />

{#if open && chart}
  <div class="scrim" onclick={onclose} role="presentation" transition:fade={{ duration: 150 }}></div>
  <aside class="report" role="dialog" aria-modal="true" aria-label="Informe inicial" transition:fly={{ y: 30, duration: 220 }}>
    <header>
      <div>
        <div class="eyebrow">Informe inicial</div>
        <h2>Una primera lectura de tu carta</h2>
      </div>
      <button class="close" type="button" onclick={onclose} aria-label="Cerrar">✕</button>
    </header>

    <nav class="toc" aria-label="Secciones del informe">
      {#each sections as s}
        <button class="toc-chip" type="button" onclick={() => scrollTo(s.id)}>{TOC[s.id] ?? s.title}</button>
      {/each}
      <button class="toc-chip" type="button" onclick={() => scrollTo('handoff')}>Tu IA</button>
    </nav>

    <div class="body" bind:this={bodyEl} role="presentation" onclick={navFromEvent} onkeydown={onContentKeydown}>
      {#each sections as s}
        <section id={`report-${s.id}`}>
          <h3>{s.title}</h3>
          {#each s.paragraphs as p}
            <p>{@html renderInline(p)}</p>
          {/each}
        </section>
      {/each}

      <section id="report-handoff" class="handoff">
        <h3>Profundiza con tu IA</h3>
        <p>Este informe es una primera impresión. Para una lectura personalizada que conecte todas tus piezas, lleva tu carta a tu IA; y para el detalle de cada elemento, toca su «i» en la carta.</p>
        <div class="actions">
          <button class="act go" type="button" onclick={openInAI}>
            <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" />
            </svg>
            Abrir IA
          </button>
          <button class="act" type="button" onclick={copyPrompt}>{copied ? 'Copiado' : 'Copiar prompt'}</button>
        </div>
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
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0.2rem 0 0;
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
    padding: 0.4rem 1.2rem 2rem;
  }
  section {
    padding: 1.2rem 0;
    border-bottom: 1px solid var(--border);
    scroll-margin-top: 0.5rem;
  }
  section:last-child {
    border-bottom: none;
  }
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
    margin: 0 0 0.6rem;
  }
  p {
    font-size: 0.92rem;
    line-height: 1.65;
    color: #c4c4ca;
    margin: 0.7rem 0 0;
  }
  p:first-of-type {
    margin-top: 0;
  }
  /* {@html} content isn't scoped — target globally inside the body. */
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
  .handoff {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem 1.1rem 1.2rem;
    margin-top: 1.2rem;
  }
  .actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.9rem;
  }
  .act {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    flex: 1;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 9px;
    padding: 0.55rem 0.5rem;
    color: var(--text);
    font-family: inherit;
    font-size: 0.82rem;
    cursor: pointer;
  }
  .act:hover {
    border-color: var(--accent);
  }
  .ic {
    width: 15px;
    height: 15px;
    color: var(--accent);
    flex: none;
  }
</style>
