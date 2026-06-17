<!-- AI-authored — the info "i" affordance (Phase 6.A). -->
<!-- A small italic "i" that sits on a selected element (the container -->
<!-- positions it: superscript over a chip, or a card's top-right corner). -->
<!-- States: discreet white when idle, brighter on hover/focus, marked -->
<!-- (inverted) while its panel is open (`active`). -->
<script>
  /**
   * @type {{
   *   active?: boolean,
   *   label?: string,
   *   onclick: (e: MouseEvent) => void
   * }}
   */
  let { active = false, label = 'Más información', onclick } = $props();
</script>

<button
  class="info-dot"
  class:active
  type="button"
  aria-label={label}
  aria-pressed={active}
  {onclick}
>i</button>

<style>
  .info-dot {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 1px solid #4a4a54;
    background: var(--surface-2);
    color: var(--text);
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
    font-size: 11px;
    line-height: 1;
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 120ms, border-color 120ms, color 120ms;
  }
  .info-dot:hover,
  .info-dot:focus-visible {
    background: #3a3a42;
    border-color: var(--text);
    color: #ffffff;
    outline: none;
  }
  /* Marked while its panel is open. */
  .info-dot.active {
    background: var(--text);
    border-color: var(--text);
    color: #1a1a1e;
  }
</style>
