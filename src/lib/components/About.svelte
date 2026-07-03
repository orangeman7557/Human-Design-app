<!-- AI-authored — "acerca de" footer link + light info modal (Phase 6.F). -->
<!-- A discreet, underlined footer link opens a compact modal: a few credit / -->
<!-- license lines plus minimal disclaimers (kept mainly for the US market). -->
<!-- "Reportar un fallo" lives in its own footer link; the support row (send -->
<!-- love + buy me a coffee) was added closing Phase L (jul 2026). -->
<script>
  import { fade, fly } from 'svelte/transition';
  import { focusTrap } from './focus-trap.js';

  /**
   * @type {{
   *   version?: string,
   *   onElement?: (kind: string, key: string) => void
   * }}
   * onElement (chart page only) opens an element's drawer — used by the
   * "Manifestador" link. Where it's not provided (home page, no drawer system)
   * the word renders as plain text.
   */
  let { onElement, version = '' } = $props();

  let open = $state(false);

  const COFFEE_URL = 'https://buymeacoffee.com/orangeman7557';

  // "Send love": each click cycles the heart through vivid colours, pops it,
  // and throws a deliberately over-the-top full-screen party (confetti burst
  // from the heart + emoji flyers) that breaks the app's sobriety for a few
  // seconds. A global click counter lives in Cloudflare KV (/api/love); the
  // party is fully local — if the API is unreachable the counter line hides.
  const BURST_COLORS = ['#e84672', '#d4a657', '#8e6cf0', '#6ec48a', '#5aa9e6', '#e8788a'];
  // No square-tile emojis here (e.g. 🌠 renders as a framed picture on Apple).
  const FLYERS = ['🌟', '⭐', '✨', '🌈', '🦄', '💫', '💖', '🎉'];
  const BASE_LABEL = '¡Mándame amor!';
  // Escalating thank-yous: one step every 4 clicks so each stays readable.
  const THANKS = ['gracias', 'lo recibo', 'qué gusto', 'cuánto cariño', 'ole ole ole', 'voy a explotar'];

  /** @type {number | null} global click count; null = unknown → line hidden */
  let loveCount = $state(null);
  let heartColor = $state('');
  let heartLabel = $state(BASE_LABEL);
  let clicks = 0;
  let partyClicks = 0;
  let pending = 0;
  let flushTimer;
  let labelTimer;
  let heartEl;
  let partyHost;
  let numEl;

  const reducedMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  $effect(() => {
    if (open) loadCount();
  });

  async function loadCount() {
    try {
      const res = await fetch('/api/love');
      const data = await res.json();
      if (typeof data.count === 'number') loveCount = data.count;
    } catch {
      // offline or counter not provisioned — the heart still works
    }
  }

  // Clicks are batched (900 ms of quiet) so a burst of taps is one request.
  function flushLater() {
    clearTimeout(flushTimer);
    flushTimer = setTimeout(async () => {
      const n = pending;
      pending = 0;
      if (n < 1) return;
      try {
        const res = await fetch('/api/love', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ n })
        });
        const data = await res.json();
        if (typeof data.count === 'number' && data.count > (loveCount ?? 0)) loveCount = data.count;
      } catch {
        // keep the optimistic local count
      }
    }, 900);
  }

  function sendLove() {
    const color = BURST_COLORS[clicks++ % BURST_COLORS.length];
    heartColor = color;
    if (loveCount !== null) loveCount += 1;
    pending += 1;
    flushLater();

    heartLabel = THANKS[Math.min(Math.floor(partyClicks / 4), THANKS.length - 1)];
    partyClicks += 1;
    clearTimeout(labelTimer);
    labelTimer = setTimeout(() => {
      heartLabel = BASE_LABEL;
      partyClicks = 0;
    }, 4000);

    if (reducedMotion) return;
    heartEl?.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.35) rotate(-7deg)', offset: 0.35 },
        { transform: 'scale(0.94)', offset: 0.7 },
        { transform: 'scale(1)' }
      ],
      { duration: 450, easing: 'ease-out' }
    );
    numEl?.animate(
      [
        { transform: 'scale(1.45)' },
        { transform: 'scale(1)' }
      ],
      { duration: 450, easing: 'ease-out' }
    );
    explode(color);
  }

  // Full-screen party: confetti shot from the heart across the viewport plus
  // emoji flyers crossing the screen. Elements are plain spans styled inline
  // (Svelte scoping can't reach JS-created nodes), animated with WAAPI and
  // removed when done; a cap keeps runaway clicking cheap.
  function explode(baseColor) {
    if (!partyHost || !heartEl) return;
    if (partyHost.childElementCount > 160) return;
    const rect = heartEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const W = window.innerWidth;
    const H = window.innerHeight;

    for (let i = 0; i < 28; i++) {
      const p = document.createElement('span');
      const color = i % 3 === 0 ? baseColor : BURST_COLORS[(Math.random() * BURST_COLORS.length) | 0];
      const size = 5 + Math.random() * 7;
      const round = Math.random() < 0.4;
      p.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;background:${color};border-radius:${round ? '50%' : '2px'};`;
      partyHost.appendChild(p);
      const angle = Math.random() * 2 * Math.PI;
      const dist = (0.25 + Math.random() * 0.55) * Math.max(W, H);
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist * 0.7;
      const fall = 140 + Math.random() * 320;
      p.animate(
        [
          { transform: 'translate(-50%, -50%)', opacity: 1 },
          {
            transform: `translate(calc(-50% + ${dx * 0.7}px), calc(-50% + ${dy * 0.7}px)) rotate(${(Math.random() * 360) | 0}deg)`,
            opacity: 1,
            offset: 0.55
          },
          {
            transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + fall}px)) rotate(${(Math.random() * 720 - 360) | 0}deg) scale(0.5)`,
            opacity: 0
          }
        ],
        { duration: 1800 + Math.random() * 1800, easing: 'cubic-bezier(0.2, 0.5, 0.4, 1)', fill: 'forwards' }
      ).onfinish = () => p.remove();
    }

    for (let i = 0; i < 5; i++) {
      const e = document.createElement('span');
      e.textContent = FLYERS[(Math.random() * FLYERS.length) | 0];
      const fromLeft = Math.random() < 0.5;
      const y0 = Math.random() * H * 0.85;
      const drift = (Math.random() * 0.5 - 0.25) * H;
      e.style.cssText = `position:absolute;left:${fromLeft ? -70 : W + 70}px;top:${y0}px;font-size:${22 + Math.random() * 22}px;line-height:1;`;
      partyHost.appendChild(e);
      const dx = (fromLeft ? 1 : -1) * (W + 160);
      const tilt = ((Math.random() * 60 - 30) | 0) * (fromLeft ? 1 : -1);
      e.animate(
        [
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 0 },
          { opacity: 1, offset: 0.1 },
          { opacity: 1, offset: 0.85 },
          { transform: `translate(${dx}px, ${drift}px) rotate(${tilt}deg)`, opacity: 0 }
        ],
        { duration: 1600 + Math.random() * 2600, easing: 'linear', fill: 'forwards' }
      ).onfinish = () => e.remove();
    }
  }

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
  <div class="modal" role="dialog" aria-modal="true" aria-label="Acerca de" use:focusTrap transition:fly={{ y: 12, duration: 180 }}>
    <header>
      <h2>Acerca de</h2>
      <button class="close" type="button" onclick={() => (open = false)} aria-label="Cerrar">✕</button>
    </header>

    <div class="facts">
      <p>Proyecto source-available, <strong>gratis para uso no comercial</strong>. (PolyForm Noncommercial 1.0.0)</p>
      <p>
        App creada por Javi G.O. con asistencia de IA, sin ánimo de lucro y sin
        ánimo de nada, la creé porque me dio la gana, como buen
        {#if onElement}<button type="button" class="tlink" onclick={() => openElement('type', 'manifestor')}>Manifestador</button>{:else}Manifestador{/if} que soy :)
      </p>
      <p>Ojalá que te sea útil, ¡y que vivas bien y feliz con tu diseño, querido humano!</p>
    </div>

    <div class="support">
      <button type="button" class="scard" onclick={sendLove}>
        <span class="icon" bind:this={heartEl}>
          <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={heartColor || 'none'}
              stroke={heartColor || 'currentColor'}
              stroke-width="1.6"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span class="slabel">{heartLabel}</span>
      </button>

      <a class="scard" href={COFFEE_URL} target="_blank" rel="noopener noreferrer">
        <span class="icon">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 10h12v5.5a4.5 4.5 0 0 1-4.5 4.5h-3A4.5 4.5 0 0 1 4 15.5V10z" />
            <path d="M16 11.5h1.5a2.75 2.75 0 0 1 0 5.5H16" />
            <path d="M7.5 7V5.5M10 7V5M12.5 7V5.5" />
          </svg>
        </span>
        <span class="slabel">Invítame a un café</span>
      </a>
    </div>

    {#if loveCount !== null}
      <p class="lovecount">
        <em>Amores</em> recibidos:
        <span class="num" bind:this={numEl} style:color={heartColor || null}>{loveCount.toLocaleString('es')}</span>
      </p>
    {/if}

    <p class="fine">
      Proyecto independiente sin afiliación a ninguna organización. Cualquier
      marca es propiedad de sus respectivos titulares. Todo el contenido
      presentado es de carácter divulgativo y no sustituye al asesoramiento
      profesional.
    </p>

    {#if version}<p class="fine ver">v{version}</p>{/if}
  </div>
  <!-- Party layer: sibling of .modal (its transform would trap position:fixed
       children and its overflow would clip the confetti). -->
  <div class="party" bind:this={partyHost} aria-hidden="true"></div>
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
  .facts {
    margin-top: 0.9rem;
  }
  .facts p {
    font-size: 0.88rem;
    line-height: 1.5;
    color: #c4c4ca;
    margin: 0.35rem 0 0;
  }
  .facts strong {
    font-weight: 600;
  }
  /* "Manifestador" link → opens the type drawer (chart page only). Subtle
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
  /* Support row: two sober cards; the heart deliberately breaks the sobriety
     when clicked (colour + full-screen party), the coffee card links to BMC. */
  .support {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }
  .scard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 0.45rem;
    padding: 0.85rem 0.5rem 0.75rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-muted);
    font: inherit;
    font-size: 0.82rem;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .scard:hover {
    border-color: #3f3f46;
    color: var(--text);
  }
  .icon {
    display: inline-flex;
    color: var(--accent);
  }
  .icon svg {
    display: block;
  }
  .icon path {
    transition: fill 0.25s, stroke 0.25s;
  }
  /* Counter line: same voice/size as the credits above; the number takes (and
     keeps) the heart's current colour once clicked. */
  .lovecount {
    margin: 0.6rem 0 0;
    font-size: 0.88rem;
    line-height: 1.5;
    color: #c4c4ca;
  }
  .num {
    display: inline-block;
    font-variant-numeric: tabular-nums;
    transition: color 0.25s;
  }
  .party {
    position: fixed;
    inset: 0;
    z-index: 72;
    pointer-events: none;
    overflow: hidden;
  }
  .fine {
    margin: 1rem 0 0;
    padding-top: 0.85rem;
    border-top: 1px solid var(--border);
    font-size: 0.76rem;
    line-height: 1.55;
    color: #82828a;
  }
  /* Version line: same muted disclaimer text, closing the modal — no second
     divider, just a small gap under the disclaimer. */
  .ver {
    margin-top: 0.6rem;
    padding-top: 0;
    border-top: none;
  }
</style>
