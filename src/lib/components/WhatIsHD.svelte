<!-- AI-authored — "¿Qué es el Diseño Humano?" home entry point (2026-07-23). -->
<!-- A discreet, centred link under the home tagline that opens a simple modal -->
<!-- (same pattern as StorageInfo/About) with the initial report's opening — -->
<!-- Part A: what HD is, the ant analogy, the life experiment, the bodygraph — -->
<!-- plus a closing line inviting the visitor to fill the form. Aimed at someone -->
<!-- who lands without knowing the system (BACKLOG functional-gap item 3). -->
<script>
  import { fade, fly } from 'svelte/transition';
  import { t } from '$lib/i18n/index.svelte.js';
  import { renderInline } from '$lib/markup.js';
  import { focusTrap } from './focus-trap.js';
  import { scrollLock } from './scroll-lock.js';

  // Rendered inside the PRERENDERED home, so the language is bound to the route
  // (a `lang` prop), never read from the shared module state — see the SSR rule
  // in docs/fase-m-multilingue.md.
  /** @type {{ lang: string }} */
  let { lang } = $props();

  let open = $state(false);

  // The content library is loaded ON DEMAND, not imported at the top (audit aug
  // 2026): this modal is the only thing on the home that needs real content, and
  // a static import dragged both full language packs (~526 KB of prose) into the
  // home's eager bundle for a panel most visitors never open. The home is
  // prerendered, so this import only ever runs on a real click in the browser.
  /** @type {((id: string, lang: string) => any) | null} */
  let getReportSection = $state(null);

  async function openModal() {
    if (!getReportSection) {
      const mod = await import('$lib/hd/content/index.js');
      getReportSection = mod.getReportSection;
    }
    open = true;
  }

  // The report's opening sections. The intro's own title is the modal heading,
  // so it is dropped; the rest keep theirs as sub-headings. In-text drawer links
  // ([label](kind:key)) are stripped to plain text — there is no drawer system
  // on the home.
  const blocks = $derived.by(() => {
    if (!getReportSection) return [];
    const out = [];
    const push = (id, withTitle) => {
      const s = getReportSection(id, lang);
      if (!s) return;
      if (withTitle && s.title) out.push({ subhead: s.title });
      for (const p of s.paragraphs ?? []) out.push({ text: stripLinks(p) });
    };
    push('intro', false);
    // The ant analogy runs on as prose (no heading), the way the report reads it.
    push('ants', false);
    push('experiment', true);
    // The bodygraph section is left out of this intro modal on purpose.
    return out;
  });

  const stripLinks = (s) => String(s).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  function onkeydown(e) {
    if (e.key === 'Escape' && open) open = false;
  }
</script>

<svelte:window {onkeydown} />

<button class="link" type="button" onclick={openModal}>{t('whatHd.link', null, lang)}</button>

{#if open}
  <div class="scrim" onclick={() => (open = false)} role="presentation" transition:fade={{ duration: 120 }}></div>
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-label={t('whatHd.link', null, lang)}
    use:focusTrap
    use:scrollLock
    transition:fly={{ y: 12, duration: 180 }}
  >
    <header>
      <h2>{t('whatHd.link', null, lang)}</h2>
      <button class="close" type="button" onclick={() => (open = false)} aria-label={t('drawerUi.close', null, lang)}>✕</button>
    </header>

    <div class="body">
      {#each blocks as b}
        {#if b.subhead}
          <p class="subhead">{b.subhead}</p>
        {:else}
          <p>{@html renderInline(b.text)}</p>
        {/if}
      {/each}
      <p class="invite"><button class="invite-link" type="button" onclick={() => (open = false)}>{t('whatHd.inviteLink', null, lang)}</button>{t('whatHd.inviteRest', null, lang)}</p>
    </div>
  </div>
{/if}

<style>
  /* Same discreet aesthetic as the "borrar formulario" link, but in the title's
     white (not dimmed grey) since this is an entry point; the underline on hover
     signals it's clickable. */
  .link {
    display: inline-block;
    background: none;
    border: none;
    padding: 0.2rem 0.4rem;
    margin: 0;
    font-family: inherit;
    /* Match the tagline's size (set on `.what-hd` in the home, responsive). */
    font-size: inherit;
    /* Same muted colour as the tagline it hangs under (author, aug 2026); the
       accent hover below still highlights it as a link. */
    color: var(--text-muted);
    cursor: pointer;
  }
  .link:hover,
  .link:focus-visible {
    color: var(--accent);
    outline: none;
  }
  .scrim {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 70;
  }
  .modal {
    position: fixed;
    z-index: 71;
    /* Centre with inset + margin (not transform): the fly transition also drives
       `transform`, and combining the two left the panel off-centre. */
    inset: 0;
    margin: auto;
    width: min(480px, calc(100vw - 2rem));
    height: max-content;
    max-height: 85vh;
    overflow-y: auto;
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1rem 1.3rem 1.3rem;
    text-align: left;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  h2 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    color: var(--accent);
  }
  .close {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1;
    padding: 0.15rem 0.3rem;
    cursor: pointer;
  }
  .close:hover {
    color: var(--text);
  }
  .body {
    margin-top: 0.9rem;
  }
  .body p {
    font-size: 0.88rem;
    line-height: 1.6;
    color: #c4c4ca;
    margin: 0.6rem 0 0;
  }
  /* `.body p.subhead` (not just `.subhead`) so it out-specifies `.body p`'s
     grey body colour and the section title reads in accent orange. */
  .body p.subhead {
    font-weight: 600;
    color: var(--accent);
    margin-top: 1.3rem;
  }
  .body p.invite {
    margin-top: 1.3rem;
    color: var(--text);
  }
  /* "Rellena el formulario" — a link that just closes the modal, dropping the
     visitor back on the form. Accent-coloured, no underline. */
  .invite-link {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: var(--accent);
    cursor: pointer;
  }
  .invite-link:hover,
  .invite-link:focus-visible {
    text-decoration: underline;
    outline: none;
  }
  .body :global(strong) {
    color: var(--text);
    font-weight: 600;
  }
  .body :global(em) {
    font-style: italic;
  }
</style>
