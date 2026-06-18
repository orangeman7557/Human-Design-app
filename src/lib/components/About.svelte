<!-- AI-authored — "Acerca de" footer link + info modal (Phase 6.F). -->
<!-- A subtle footer link opens a centered modal holding the disclaimers, the -->
<!-- "made with AI assistance" note (moved here from the footer), author and -->
<!-- license, and a report-a-bug link. Contents will grow (donate, etc.). -->
<script>
  import { fade, fly } from 'svelte/transition';

  const REPO = 'https://github.com/orangeman7557/human-design-chart-app';

  let open = $state(false);

  function onkeydown(e) {
    if (e.key === 'Escape' && open) open = false;
  }
</script>

<svelte:window {onkeydown} />

<button class="link" type="button" onclick={() => (open = true)}>Acerca de</button>

{#if open}
  <div class="scrim" onclick={() => (open = false)} role="presentation" transition:fade={{ duration: 120 }}></div>
  <div class="modal" role="dialog" aria-modal="true" aria-label="Acerca de" transition:fly={{ y: 12, duration: 180 }}>
    <header>
      <h2>Acerca de</h2>
      <button class="close" type="button" onclick={() => (open = false)} aria-label="Cerrar">✕</button>
    </header>

    <div class="body">
      <p>
        Calculadora de cartas de <strong>Diseño Humano</strong>. Introduces tus
        datos de nacimiento y la app calcula tu carta completa en tu propio
        dispositivo: tus datos no se envían a ningún servidor.
      </p>
      <p>
        Proyecto <strong>independiente</strong>, sin afiliación ni respaldo de
        Jovian Archive ni de ninguna organización oficial de Diseño Humano.
        «Human Design», «BodyGraph» y otros nombres son marcas de sus
        respectivos titulares; aquí se usan de forma meramente descriptiva.
      </p>
      <p>
        Su contenido es <strong>divulgativo y orientado al autoconocimiento</strong>;
        no sustituye el asesoramiento de un profesional (médico, psicológico,
        legal o financiero).
      </p>
      <div class="meta">
        <span>Hecho con asistencia de IA.</span>
        <span>Autor: orangeman7557.</span>
        <span>Código disponible para uso no comercial (PolyForm Noncommercial 1.0.0).</span>
      </div>
      <a class="report" href={`${REPO}/issues`} target="_blank" rel="noopener">Reportar un fallo</a>
    </div>
  </div>
{/if}

<style>
  .link {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: #555;
    text-underline-offset: 2px;
  }
  .link:hover {
    color: var(--text);
    text-decoration-color: var(--accent);
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
    width: min(440px, calc(100vw - 2rem));
    max-height: 85vh;
    overflow-y: auto;
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.1rem 1.3rem 1.4rem;
    text-align: left;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  h2 {
    font-size: 1.1rem;
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
  .body p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #c4c4ca;
    margin: 0.9rem 0 0;
  }
  .body :global(strong) {
    color: var(--text);
    font-weight: 600;
  }
  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-top: 1.1rem;
    padding-top: 0.9rem;
    border-top: 1px solid var(--border);
    font-size: 0.78rem;
    line-height: 1.5;
    color: #82828a;
  }
  .report {
    display: inline-block;
    margin-top: 0.9rem;
    font-size: 0.82rem;
    color: var(--accent);
    text-decoration: none;
  }
  .report:hover {
    text-decoration: underline;
  }
</style>
