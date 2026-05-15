<script>
  // Placeholder home screen for Fase 0.
  // In Fase 1 this will be replaced with the birth-data form + bodygraph render.
</script>

<main>
  <header>
    <h1>Human Design Chart</h1>
    <p class="tagline">Calcular, guardar y consultar cartas de Human Design.</p>
  </header>

  <section class="status">
    <span class="dot"></span>
    Esqueleto en pie. Próximo paso: cálculo astronómico y bodygraph.
  </section>

  <footer>
    <small>v0.0.1 · open source · AGPL-3.0</small>
  </footer>
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 4rem 1.5rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  header h1 {
    font-size: clamp(1.75rem, 5vw, 2.25rem);
    font-weight: 600;
    margin: 0 0 0.5rem;
    letter-spacing: -0.01em;
  }

  .tagline {
    color: var(--text-muted);
    margin: 0 0 3rem;
    line-height: 1.5;
  }

  .status {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem 1.25rem;
    color: var(--text-muted);
    font-size: 0.95rem;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0 auto;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent-soft);
    flex-shrink: 0;
  }

  footer {
    margin-top: 4rem;
    color: var(--text-muted);
    opacity: 0.6;
  }
</style>
