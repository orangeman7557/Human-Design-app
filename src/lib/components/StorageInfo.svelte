<!-- AI-authored — "saber más" storage explainer (cookie vault, 2026-07-07). -->
<!-- Inline trigger for the saved-charts note on the home: opens a compact -->
<!-- modal (same pattern as About) telling, without drama, where the charts -->
<!-- live, how the automatic cookie backup protects them, what does delete -->
<!-- them, and the manual export/install routes. -->
<script>
  import { fade, fly } from 'svelte/transition';
  import { focusTrap } from './focus-trap.js';
  import { scrollLock } from './scroll-lock.js';

  let open = $state(false);

  function onkeydown(e) {
    if (e.key === 'Escape' && open) open = false;
  }
</script>

<svelte:window {onkeydown} />

<button class="link" type="button" onclick={() => (open = true)}>saber más</button>

{#if open}
  <div class="scrim" onclick={() => (open = false)} role="presentation" transition:fade={{ duration: 120 }}></div>
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-label="Cómo se guardan las cartas"
    use:focusTrap
    use:scrollLock
    transition:fly={{ y: 12, duration: 180 }}
  >
    <header>
      <h2>Cómo se guardan las cartas</h2>
      <button class="close" type="button" onclick={() => (open = false)} aria-label="Cerrar">✕</button>
    </header>

    <div class="body">
      <p>
        Las cartas guardadas viven en este dispositivo, dentro del almacenamiento
        del navegador. No hay cuentas ni nube: nadie más puede verlas.
      </p>
      <p>
        Para tener una copia manual, o para llevar las cartas a otro navegador o
        dispositivo, usa los botones de exportar e importar junto a esta nota.
      </p>
      <p>
        Algunos navegadores limpian ese almacenamiento de vez en cuando — Safari
        en iPhone y iPad, por ejemplo, borra los datos de las webs que llevan
        unos días sin visitarse. Para que eso no se lleve las cartas, la app
        guarda una copia de seguridad en una <strong>cookie técnica propia</strong>
        (sin rastreo ni terceros) y las restaura sola si el navegador las borra.
        La copia solo viaja, cifrada, al crearse o restaurarse, y el servidor no
        la almacena.
      </p>
      <p>
        Lo que sí las borra del todo: <strong>limpiar las cookies o los datos de
        este sitio</strong> en el navegador (desaparecen las cartas y su copia).
      </p>
    </div>
  </div>
{/if}

<style>
  /* The note sets size/colour; the trigger just adds a discreet underline. */
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
    color: var(--text);
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
    line-height: 1.5;
    color: #c4c4ca;
    margin: 0.55rem 0 0;
  }
  .body strong {
    color: var(--text);
    font-weight: 600;
  }
</style>
