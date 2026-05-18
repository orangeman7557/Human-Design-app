<script>
  // Birth-data entry form.
  //
  // Pre-filled with orangeman7557's chart as the validation test case. The
  // `place` state carries pre-resolved latitude/longitude/timezone so the
  // form can be submitted as-is without going through the autocomplete on
  // first load.

  import { goto } from '$app/navigation';
  import CityAutocomplete from '$lib/components/CityAutocomplete.svelte';

  let name = $state('orangeman7557');
  let date = $state('1984-03-13');
  let time = $state('09:30');

  /** @type {{ label: string, latitude: number, longitude: number, timezone: string } | null} */
  let place = $state({
    label: 'Madrid, Comunidad de Madrid, España',
    latitude: 40.4168,
    longitude: -3.7038,
    timezone: 'Europe/Madrid'
  });

  let submitting = $state(false);
  /** @type {string | null} */
  let error = $state(null);

  function submit(e) {
    e.preventDefault();
    error = null;

    if (!place) {
      error = 'Selecciona una ciudad de la lista de sugerencias.';
      return;
    }

    submitting = true;
    try {
      const birth = {
        name: name.trim() || null,
        date,
        time,
        timezone: place.timezone,
        latitude: place.latitude,
        longitude: place.longitude,
        placeLabel: place.label
      };
      sessionStorage.setItem('birthData', JSON.stringify(birth));
      goto('/chart');
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      submitting = false;
    }
  }
</script>

<main>
  <header>
    <h1>Human Design Chart</h1>
    <p class="tagline">Introduce tus datos de nacimiento.</p>
  </header>

  <form onsubmit={submit}>
    <label>
      <span>Nombre</span>
      <input type="text" bind:value={name} placeholder="Opcional" autocomplete="off" />
    </label>

    <label>
      <span>Fecha de nacimiento</span>
      <input type="date" bind:value={date} required />
    </label>

    <label>
      <span>Hora local de nacimiento</span>
      <input type="time" bind:value={time} required />
    </label>

    <label>
      <span>Lugar de nacimiento</span>
      <CityAutocomplete bind:value={place} />
    </label>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <button type="submit" disabled={submitting}>
      {submitting ? 'Calculando…' : 'Calcular carta'}
    </button>
  </form>

  <footer>
    <small>v0.1.0 · source-available · free for noncommercial use · Built with AI assistance</small>
  </footer>
</main>

<style>
  main {
    max-width: 460px;
    margin: 0 auto;
    padding: 3rem 1.25rem 4rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  h1 {
    font-size: clamp(1.6rem, 5vw, 2rem);
    font-weight: 500;
    margin: 0 0 0.4rem;
    letter-spacing: -0.01em;
  }
  .tagline {
    color: var(--text-muted);
    margin: 0;
    font-size: 0.9rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  label span {
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.72rem;
  }
  input {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.7rem 0.85rem;
    border-radius: var(--radius);
    font-size: 1rem;
    font-family: inherit;
    color-scheme: dark;
  }
  input:focus {
    outline: none;
    border-color: var(--accent);
  }

  button[type='submit'] {
    margin-top: 1rem;
    background: var(--accent);
    color: #1a1408;
    border: none;
    padding: 0.85rem 1rem;
    border-radius: var(--radius);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
  }
  button[type='submit']:disabled {
    opacity: 0.6;
    cursor: progress;
  }

  .error {
    color: var(--danger);
    font-size: 0.9rem;
    margin: 0;
  }

  footer {
    margin-top: 4rem;
    text-align: center;
    color: var(--text-muted);
    opacity: 0.6;
  }
</style>
