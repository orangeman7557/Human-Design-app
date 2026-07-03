<!-- Privacy policy (Phase L, step 6). Plain-language, RGPD-aware (Spain/EU),
     tailored to what the app actually does: local-first calculation, and the
     few external touchpoints (Photon geocoder, Web3Forms bug form, AI handoff,
     Cloudflare hosting). Prerendered — see +page.js. -->
<script>
  import ReportBug from '$lib/components/ReportBug.svelte';

  // Injected by Vite's `define` from package.json (see vite.config.js).
  const version = __APP_VERSION__;

  const SITE_URL = 'https://hdchart.app';
  const SEO_TITLE = 'Privacidad · Human Design Chart';
  const SEO_DESC =
    'Cómo trata tus datos la app de Human Design Chart: la carta se calcula en tu dispositivo, sin cuentas, sin analítica y sin venta de datos.';
</script>

<svelte:head>
  <title>{SEO_TITLE}</title>
  <meta name="description" content={SEO_DESC} />
  <link rel="canonical" href="{SITE_URL}/privacy" />
  <meta property="og:title" content={SEO_TITLE} />
  <meta property="og:description" content={SEO_DESC} />
  <meta property="og:url" content="{SITE_URL}/privacy" />
</svelte:head>

<main>
  <a class="back" href="/">← volver</a>

  <h1>Privacidad</h1>
  <p class="lead">
    Esta app está pensada para funcionar en tu dispositivo. Tu carta se calcula
    en tu propio navegador y tus datos de nacimiento se guardan solo en tu
    equipo. Aquí te explicamos, en lenguaje llano, qué ocurre con tus datos.
  </p>

  <section>
    <h2>Lo que se queda en tu dispositivo</h2>
    <p>
      Los datos que introduces (nombre, fecha, hora y lugar de nacimiento) y las
      cartas que guardas se almacenan <strong>localmente en tu navegador</strong>
      (mediante <code>sessionStorage</code> e <code>IndexedDB</code>). No se
      envían a ningún servidor para calcular la carta: todo el cálculo
      astronómico ocurre en tu propio dispositivo.
    </p>
    <p>
      Puedes borrarlos cuando quieras: elimina cada carta guardada desde la
      propia app, o borra los datos del sitio en los ajustes de tu navegador. Al
      hacerlo desaparecen por completo.
    </p>
  </section>

  <section>
    <h2>Lo que sale de tu dispositivo (y cuándo)</h2>
    <ul>
      <li>
        <strong>Buscador de ciudad.</strong> Cuando escribes el lugar de
        nacimiento, el texto que tecleas se envía a
        <a href="https://photon.komoot.io/" target="_blank" rel="noopener noreferrer">Photon</a>
        (un servicio de komoot sobre OpenStreetMap) para ofrecerte sugerencias.
        Solo viaja ese texto; no se acompaña de tu fecha ni tu hora.
      </li>
      <li>
        <strong>Formulario para reportar fallos.</strong> Si decides usarlo, se
        envía lo que escribas (y, opcionalmente, tu nombre y email) junto con
        datos técnicos de tu navegador, a través del servicio
        <a href="https://web3forms.com/" target="_blank" rel="noopener noreferrer">Web3Forms</a>,
        para que podamos leer tu mensaje. Esto solo ocurre si tú lo envías.
      </li>
      <li>
        <strong>Llevar tu carta a una IA.</strong> Si usas la opción de
        consultar tu carta con una IA, la app abre el servicio de IA que elijas
        con un texto de tu carta ya preparado. A partir de ahí tus datos se
        rigen por la política de privacidad de ese servicio, no por esta.
      </li>
    </ul>
  </section>

  <section>
    <h2>Alojamiento</h2>
    <p>
      La app se sirve a través de <strong>Cloudflare</strong>. Como cualquier
      servidor web, su red puede registrar de forma temporal datos técnicos de
      la conexión (como la dirección IP) por seguridad y funcionamiento. No
      usamos esos registros para identificarte ni para seguirte.
    </p>
  </section>

  <section>
    <h2>Lo que no hacemos</h2>
    <p>
      No usamos cookies de seguimiento, ni analítica, ni publicidad. No hay
      cuentas de usuario. No vendemos ni cedemos tus datos a terceros.
    </p>
  </section>

  <section>
    <h2>Tus derechos</h2>
    <p>
      Como los datos de tu carta viven en tu dispositivo, tienes el control
      directo: puedes consultarlos, modificarlos o borrarlos en cualquier
      momento desde la app. Conforme al Reglamento General de Protección de
      Datos (RGPD) y a la normativa española y europea, tienes derecho de
      acceso, rectificación, supresión, oposición y portabilidad sobre cualquier
      dato personal. Para ejercerlos, o para cualquier duda sobre privacidad,
      escríbenos con el botón <strong>«notificar un fallo»</strong> de aquí abajo.
    </p>
    <p class="resp">Responsable: Javi G.O., autor de la app.</p>
  </section>

  <p class="updated">Última actualización: 3 de julio de 2026.</p>

  <footer>
    <a class="foot-link" href="/">inicio</a>
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
  strong {
    color: var(--text);
    font-weight: 600;
  }
  code {
    font-size: 0.85em;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 0.05em 0.35em;
  }
  a {
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
