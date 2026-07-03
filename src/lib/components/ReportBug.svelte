<!-- AI-authored — "notificar un fallo" footer link + report form modal (Phase L, step 4). -->
<!-- Posts to Web3Forms (no backend, no account for the reporter); the author's email -->
<!-- stays hidden behind the public access key. Device / OS / app context is captured -->
<!-- automatically so the reporter never has to describe their setup. Covers both bugs -->
<!-- and suggestions via a small type toggle. Modal chrome mirrors About.svelte. -->
<script>
  import { fade, fly } from 'svelte/transition';
  import { focusTrap } from './focus-trap.js';

  /** @type {{ version?: string }} */
  let { version = '' } = $props();

  const ACCESS_KEY = 'fb633af3-659b-4e93-acb8-9ba3417132fa';
  const ENDPOINT = 'https://api.web3forms.com/submit';

  let open = $state(false);
  let kind = $state('fallo'); // 'fallo' | 'sugerencia'
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let botcheck = $state(''); // honeypot — real users leave it empty
  let status = $state('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  let errorMsg = $state('');

  function close() {
    open = false;
  }

  function finish() {
    // Called after a successful send: wipe the draft (including name/email) and close.
    open = false;
    kind = 'fallo';
    name = '';
    email = '';
    message = '';
    errorMsg = '';
    status = 'idle';
  }

  function context() {
    if (typeof navigator === 'undefined') return {};
    const standalone =
      window.matchMedia?.('(display-mode: standalone)')?.matches ||
      window.navigator.standalone === true;
    return {
      Navegador: navigator.userAgent,
      Idioma: navigator.language ?? '',
      Pantalla: `${window.screen?.width}×${window.screen?.height} @${window.devicePixelRatio || 1}x`,
      Ventana: `${window.innerWidth}×${window.innerHeight}`,
      Modo: standalone ? 'app instalada (PWA)' : 'navegador',
      App: version ? `v${version}` : '(desconocida)'
    };
  }

  async function submit(e) {
    e.preventDefault();
    if (botcheck) return; // a bot filled the honeypot
    if (!message.trim()) {
      errorMsg = 'Cuéntame qué ha pasado antes de enviar.';
      status = 'error';
      return;
    }
    status = 'sending';
    errorMsg = '';

    const form = new FormData();
    form.append('access_key', ACCESS_KEY);
    form.append('subject', `HD Chart · ${kind === 'fallo' ? 'Fallo' : 'Sugerencia'}`);
    form.append('from_name', 'Human Design Chart · reportes');
    form.append('Tipo', kind === 'fallo' ? 'Fallo' : 'Sugerencia');
    if (name.trim()) form.append('name', name.trim());
    if (email.trim()) form.append('email', email.trim());
    form.append('message', message.trim());
    for (const [k, v] of Object.entries(context())) form.append(k, v);

    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        status = 'sent';
      } else {
        status = 'error';
        errorMsg = data.message || 'No se pudo enviar. Inténtalo de nuevo en un momento.';
      }
    } catch {
      status = 'error';
      errorMsg = 'Sin conexión o el envío falló. Inténtalo de nuevo en un momento.';
    }
  }

  function onkeydown(e) {
    if (e.key === 'Escape' && open) close();
  }
</script>

<svelte:window {onkeydown} />

<button class="link" type="button" onclick={() => (open = true)}>notificar un fallo<svg class="bug" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 5a4 4 0 0 1 8 0" />
    <rect x="7" y="7" width="10" height="12" rx="5" />
    <path d="M12 10v8M4 11h3M4 16h3.2M17 11h3M16.8 16H20M6 7 4.5 5.5M18 7l1.5-1.5M6 19l-1.6 1.6M18 19l1.6 1.6" />
  </svg></button>

{#if open}
  <div class="scrim" onclick={close} role="presentation" transition:fade={{ duration: 120 }}></div>
  <div class="modal" role="dialog" aria-modal="true" aria-label="Notificar un fallo o sugerencia" use:focusTrap transition:fly={{ y: 12, duration: 180 }}>
    <header>
      <h2>Notificar un fallo o enviar una sugerencia</h2>
      <button class="close" type="button" onclick={close} aria-label="Cerrar">✕</button>
    </header>

    {#if status === 'sent'}
      <div class="done">
        <p class="thanks">¡Gracias! Lo he recibido.</p>
        <p class="thanks-sub">Le echaré un vistazo en cuanto pueda. No hay respuesta automática, así que no te preocupes si no recibes nada de vuelta.</p>
        <button class="submit" type="button" onclick={finish}>Cerrar</button>
      </div>
    {:else}
      <form onsubmit={submit}>
        <div class="field">
          <span>¿De qué se trata?</span>
          <div class="toggle" role="group" aria-label="Tipo de reporte">
            <button type="button" class:active={kind === 'fallo'} onclick={() => (kind = 'fallo')}>Notificar un fallo/bug</button>
            <button type="button" class:active={kind === 'sugerencia'} onclick={() => (kind = 'sugerencia')}>Enviar una sugerencia/mensaje</button>
          </div>
        </div>

<!-- Both texts are stacked in one grid cell so the box always keeps the height
             of the tallest (fallo); switching type never resizes the modal. -->
        <div class="intro">
          <p class:hidden={kind !== 'fallo'} aria-hidden={kind !== 'fallo'}>
            Describe el problema con tanto detalle como puedas. Cuanto más claro,
            más fácil me será entenderlo y arreglarlo. Los datos de tu
            dispositivo y navegador se incluyen solos, no hace falta que los
            escribas.
          </p>
          <p class:hidden={kind !== 'sugerencia'} aria-hidden={kind !== 'sugerencia'}>
            Describe la sugerencia con tanto detalle como puedas. Cuanto más
            claro, más fácil me será entenderlo y ver si puedo implementarlo. Los
            datos de tu dispositivo y navegador se incluyen solos, no hace falta
            que los escribas.
          </p>
        </div>

        <label class="field">
          <span>{kind === 'fallo' ? '¿Qué ha pasado?' : 'Escribe tu sugerencia'}</span>
          <textarea
            bind:value={message}
            rows="5"
            placeholder={kind === 'fallo'
              ? 'Qué hacías, qué esperabas, qué pasó, y cómo repetirlo si sabes cómo…'
              : 'Cuéntame :)'}
          ></textarea>
        </label>

        <div class="row">
          <label class="field">
            <span>Nombre (opcional)</span>
            <input type="text" bind:value={name} autocomplete="name" />
          </label>
          <label class="field">
            <span>Email (opcional)</span>
            <input type="email" bind:value={email} autocomplete="email" />
          </label>
        </div>

        <!-- honeypot: hidden from real users -->
        <input class="honeypot" type="text" tabindex="-1" autocomplete="off" bind:value={botcheck} aria-hidden="true" />

        {#if status === 'error'}<p class="err send-err">{errorMsg}</p>{/if}

        <button class="submit" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Enviar'}
        </button>
      </form>
    {/if}
  </div>
{/if}

<style>
  /* The footer sets the size/colour; the link matches About's (plain inline-block
     button so it baseline-aligns with "acerca de"), plus a trailing bug glyph. */
  .link {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  .link:hover {
    color: var(--text-muted);
  }
  /* After the text, tilted diagonally up-right so the bug reads as crawling away. */
  .bug {
    width: 1.05em;
    height: 1.05em;
    margin-left: 0.35em;
    vertical-align: -0.18em;
    transform: rotate(45deg);
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
    max-height: 88vh;
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

  /* Grid stack: both paragraphs share one cell, the inactive one hidden but
     still occupying space, so the box keeps the tallest (fallo) height. */
  .intro {
    display: grid;
    margin-top: -0.35rem; /* less air between the buttons and the copy */
  }
  .intro p {
    grid-area: 1 / 1;
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.5;
    color: #c4c4ca;
  }
  .intro p.hidden {
    visibility: hidden;
  }

  form {
    margin-top: 1.35rem; /* more air before "¿de qué se trata?" */
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .toggle {
    display: flex;
    gap: 0.4rem;
  }
  .toggle button {
    flex: 1;
    padding: 0.5rem;
    font: inherit;
    font-size: 0.82rem;
    color: var(--text-muted);
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 10px;
    cursor: pointer;
  }
  .toggle button.active {
    color: var(--accent);
    background: var(--accent-soft);
    border-color: var(--accent);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.32rem;
  }
  .field > span {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
  }
  textarea,
  .field input[type='text'],
  .field input[type='email'] {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: 0.9rem;
    color: var(--text);
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.55rem 0.65rem;
  }
  textarea {
    resize: vertical;
    min-height: 5.5rem;
  }
  textarea:focus,
  .field input:focus {
    outline: none;
    border-color: var(--accent);
  }
  .row {
    display: flex;
    gap: 0.7rem;
  }
  .row .field {
    flex: 1;
    min-width: 0;
  }

  .honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  .err {
    color: var(--danger);
    font-size: 0.78rem;
  }
  .send-err {
    margin: 0;
  }

  .submit {
    align-self: stretch;
    padding: 0.65rem;
    font: inherit;
    font-weight: 500;
    color: #1a1305;
    background: var(--accent);
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  .submit:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .done {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  .thanks {
    font-size: 0.95rem;
    color: var(--text);
    margin: 0;
  }
  .thanks-sub {
    font-size: 0.84rem;
    line-height: 1.5;
    color: #c4c4ca;
    margin: 0;
  }
</style>
