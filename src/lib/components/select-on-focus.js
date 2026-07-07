// Shared action: select a field's content when it gains focus, so typing
// overwrites the previous value instead of appending to it (author request,
// 2026-07-06 — refilling an already-filled form field was uncomfortable).
//
// The mouseup that follows a focusing click would collapse the selection
// (Chrome/Safari behaviour), so exactly that one mouseup is swallowed; later
// clicks on an already-focused field reposition the caret as usual.
//
// A framework re-render triggered by the focus itself can also write back to
// the input (a two-way `bind:value` re-asserting its value moves the caret to
// the end), which silently collapses the selection before the user types —
// so the first keystroke appended instead of overwriting (place field,
// 2026-07-07). To cover that, the selection is re-asserted on the next frame,
// but only when it actually collapsed and nothing else changed meanwhile.

/** @param {HTMLInputElement} node */
export function selectOnFocus(node) {
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;
  /** @type {number | undefined} */
  let raf;
  const onUp = (e) => e.preventDefault();
  const onFocus = () => {
    const initial = node.value;
    node.select();
    node.addEventListener('mouseup', onUp, { once: true });
    // A keyboard focus has no mouseup; drop the guard so it can't swallow an
    // unrelated click later.
    clearTimeout(timer);
    timer = setTimeout(() => node.removeEventListener('mouseup', onUp), 400);
    // Re-assert the selection after any synchronous post-focus re-render that
    // collapsed it — a no-op when the selection already held or the user has
    // started typing (value changed).
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      if (
        document.activeElement === node &&
        node.value === initial &&
        initial.length > 0 &&
        node.selectionStart === node.selectionEnd
      ) {
        node.select();
      }
    });
  };
  node.addEventListener('focus', onFocus);
  return {
    destroy() {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      node.removeEventListener('focus', onFocus);
      node.removeEventListener('mouseup', onUp);
    }
  };
}
