<script>
  // Language layer: the locale is set in +layout.js (load); this component only
  // keeps it in sync on client-side navigations between languages, where the
  // same layout instance persists and the load may be cached. Belt-and-braces
  // over the load's setLocale — a no-op when the language hasn't changed.
  import { setLocale } from '$lib/i18n/index.svelte.js';

  let { data, children } = $props();

  $effect.pre(() => {
    setLocale(data.lang);
  });
</script>

{@render children()}
