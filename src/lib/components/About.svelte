<!-- AI-authored — "acerca de" footer link + light info modal (Phase 6.F). -->
<!-- A discreet, underlined footer link opens a compact modal: a few credit / -->
<!-- license lines plus minimal disclaimers (kept mainly for the US market). -->
<!-- "Reportar un fallo" and "donar / invitar a un café" are deferred (BACKLOG). -->
<script>
  import { fade, fly } from 'svelte/transition';

  /**
   * @type {{ onElement?: (kind: string, key: string) => void }}
   * onElement (chart page only) opens an element's drawer — used by the
   * "Manifestor" link. Where it's not provided (home page, no drawer system)
   * the word renders as plain text.
   */
  let { onElement } = $props();

  let open = $state(false);

  function openElement(kind, key) {
    open = false;
    onElement?.(kind, key);
  }

  function onkeydown(e) {
    if (e.key === 'Escape' && open) open = false;
  }
</script>

<svelte:window {onkeydown} />

<button class="link" type="button" onclick={() => (open = true)}>acerca de</button>

{#if open}
  <div class="scrim" onclick={() => (open = false)} role="presentation" transition:fade={{ duration: 120 }}></div>
  <div class="modal" role="dialog" aria-modal="true" aria-label="Acerca de" transition:fly={{ y: 12, duration: 180 }}>
    <header>
      <h2>Acerca de</h2>
      <button class="close" type="button" onclick={() => (open = false)} aria-label="Cerrar">✕</button>
    </header>

    <div class="facts">
      <p>Proyecto source-available (PolyForm Noncommercial 1.0.0), gratis para uso no comercial</p>
      <p>
        Creado por orangeman7557 con asistencia de IA (mucha).<br />
        Creado sin ánimo de lucro ni ánimo de nada, creado simplemente porque me
        dio la gana, como buen {#if onElement}<button type="button" class="tlink" onclick={() => openElement('type', 'manifestor')}>Manifestor</button>{:else}Manifestor{/if} que soy :)
      </p>
      <p>Ojalá que te sea útil. ¡Que vivas bien y feliz!</p>
    </div>

    <p class="fine">
      Proyecto independiente sin afiliación a ninguna organización. Cualquier
      marca es propiedad de sus respectivos titulares. Todo el contenido
      presentado es de carácter divulgativo y no sustituye al asesoramiento
      profesional.
    </p>
  </div>
{/if}

<style>
  /* The footer sets the size/colour; the link just adds a discreet underline. */
  .link {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .link:hover {
    color: var(--text-muted);
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
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(420px, calc(100vw - 2rem));
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
  .facts {
    margin-top: 0.9rem;
  }
  .facts p {
    font-size: 0.88rem;
    line-height: 1.5;
    color: #c4c4ca;
    margin: 0.35rem 0 0;
  }
  /* "Manifestor" link → opens the type drawer (chart page only). Subtle
     underline, like the in-text links elsewhere. */
  .tlink {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: #6a6a72;
    text-underline-offset: 2px;
  }
  .tlink:hover {
    color: var(--text);
    text-decoration-color: var(--accent);
  }
  .fine {
    margin: 1rem 0 0;
    padding-top: 0.85rem;
    border-top: 1px solid var(--border);
    font-size: 0.76rem;
    line-height: 1.55;
    color: #82828a;
  }
</style>
