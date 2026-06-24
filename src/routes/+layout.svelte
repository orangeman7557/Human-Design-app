<script>
  import '../app.css';
  import Dialog from '$lib/components/Dialog.svelte';
  let { children } = $props();
</script>

{@render children()}

<!-- Single themed-dialog host for the whole app (prompt / confirm / alert). -->
<Dialog />
