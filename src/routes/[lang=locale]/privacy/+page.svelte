<!-- Privacy policy (Phase L, step 6; translated Phase M). Plain-language,
     GDPR-aware, tailored to what the app actually does: local-first
     calculation, and the few external touchpoints (Photon geocoder, Web3Forms
     bug form, AI handoff, Cloudflare hosting). Prerendered — see +page.js.
     All wording lives in the i18n catalogs (ui/<lang>.js → `privacy`), so a new
     language is a text-only change. -->
<script>
  import ReportBug from '$lib/components/ReportBug.svelte';
  import { page } from '$app/stores';
  import { t } from '$lib/i18n/index.svelte.js';

  // Injected by Vite's `define` from package.json (see vite.config.js).
  const version = __APP_VERSION__;
  // Prerendered page: the language MUST come from the route param and be passed
  // explicitly to t() — the shared module locale can race at build time (see
  // docs/fase-m-multilingue.md, "la regla de oro del SSR").
  const lang = $derived($page.params.lang);
  const tr = (key) => t(key, undefined, lang);

  const SITE_URL = 'https://hdchart.app';

  // Minimal inline renderer for this page only: **bold**, `code` and external
  // [label](https://…) links. Deliberately NOT $lib/markup.js — that one turns
  // [x](kind:key) into in-app links and would swallow "https:" as a kind.
  function md(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }
</script>

<svelte:head>
  <title>{tr('privacy.seoTitle')}</title>
  <meta name="description" content={tr('privacy.seoDesc')} />
  <link rel="canonical" href="{SITE_URL}/{lang}/privacy" />
  <meta property="og:title" content={tr('privacy.seoTitle')} />
  <meta property="og:description" content={tr('privacy.seoDesc')} />
  <meta property="og:url" content="{SITE_URL}/{lang}/privacy" />
</svelte:head>

<main>
  <a class="back" href="/{lang}">{tr('privacy.back')}</a>

  <h1>{tr('privacy.title')}</h1>
  <p class="lead">{tr('privacy.lead')}</p>

  <section>
    <h2>{tr('privacy.h1')}</h2>
    <p>{@html md(tr('privacy.p1'))}</p>
    <p>{@html md(tr('privacy.p2'))}</p>
    <p>{@html md(tr('privacy.p3'))}</p>
  </section>

  <section>
    <h2>{tr('privacy.h2')}</h2>
    <ul>
      {#each ['l1', 'l2', 'l3', 'l4'] as key}
        <li>{@html md(tr('privacy.' + key))}</li>
      {/each}
    </ul>
  </section>

  <section>
    <h2>{tr('privacy.h3')}</h2>
    <p>{@html md(tr('privacy.p4'))}</p>
  </section>

  <section>
    <h2>{tr('privacy.h4')}</h2>
    <p>{@html md(tr('privacy.p5'))}</p>
  </section>

  <section>
    <h2>{tr('privacy.h5')}</h2>
    <p>{@html md(tr('privacy.p6'))}</p>
    <p class="resp">{tr('privacy.controller')}</p>
  </section>

  <p class="updated">{tr('privacy.updated')}</p>

  <footer>
    <a class="foot-link" href="/{lang}">{tr('privacy.home')}</a>
    <span aria-hidden="true">·</span>
    <ReportBug {version} />
  </footer>
</main>

<style>
  main {
    max-width: 640px;
    margin: 0 auto;
    padding: 2rem 1.25rem 3rem;
  }
  .back {
    display: inline-block;
    margin-bottom: 1.5rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.85rem;
  }
  .back:hover {
    color: var(--text);
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0 0 0.75rem;
    color: var(--accent);
  }
  .lead {
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0 0 1.5rem;
  }
  section {
    margin-top: 1.75rem;
  }
  h2 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 0.5rem;
    color: var(--text);
  }
  p {
    line-height: 1.6;
    margin: 0.6rem 0 0;
    color: #c4c4ca;
  }
  ul {
    margin: 0.6rem 0 0;
    padding-left: 1.15rem;
  }
  li {
    line-height: 1.6;
    margin-top: 0.6rem;
    color: #c4c4ca;
  }
  /* The body prose is injected with {@html} (it comes from the i18n catalog),
     so its inline elements never receive Svelte's scoping class — they must be
     addressed with :global or they lose their styling entirely. */
  main :global(strong) {
    color: var(--text);
    font-weight: 600;
  }
  main :global(code) {
    font-size: 0.85em;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 0.05em 0.35em;
  }
  main :global(a) {
    color: var(--accent);
    text-underline-offset: 2px;
  }
  .resp {
    color: var(--text-muted);
    font-size: 0.9rem;
  }
  .updated {
    margin-top: 2rem;
    font-size: 0.8rem;
    color: #82828a;
  }
  footer {
    margin-top: 2.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);
    text-align: center;
    font-size: 0.8rem;
    color: #64646a;
  }
  .foot-link {
    color: inherit;
    text-decoration: none;
  }
  .foot-link:hover {
    color: var(--text-muted);
  }
</style>
