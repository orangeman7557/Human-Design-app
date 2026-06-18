<!-- AI-authored — "acerca de" footer link + light info modal (Phase 6.F). -->
<!-- A discreet, underlined footer link opens a compact modal: a few credit / -->
<!-- license lines plus minimal disclaimers (kept mainly for the US market). -->
<!-- "Reportar un fallo" and "donar / invitar a un café" are deferred (BACKLOG). -->
<script>
  import { fade, fly } from 'svelte/transition';

  let open = $state(false);

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
      <h2>acerca de</h2>
      <button class="close" type="button" onclick={() => (open = false)} aria-label="Cerrar">✕</button>
    </header>

    <div class="facts">
      <p>Creado por <strong>orangeman7557</strong></p>
      <p>Hecho con asistencia de IA</p>
      <p>Proyecto independiente · source-available (PolyForm Noncommercial 1.0.0)</p>
      <p>Free for noncommercial use</p>
    </div>

    <p class="fine">
      Sin afiliación a ninguna organización. Cualquier marca es propiedad de sus
      respectivos titulares. Contenido divulgativo que no sustituye al
      asesoramiento profesional.
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
  .facts :global(strong) {
    color: var(--text);
    font-weight: 600;
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
