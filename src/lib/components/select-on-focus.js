// Shared action: select a field's content when it gains focus, so typing
// overwrites the previous value instead of appending to it (author request,
// 2026-07-06 — refilling an already-filled form field was uncomfortable).
//
// The mouseup that follows a focusing click would collapse the selection
// (Chrome/Safari behaviour), so exactly that one mouseup is swallowed; later
// clicks on an already-focused field reposition the caret as usual.

/** @param {HTMLInputElement} node */
export function selectOnFocus(node) {
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;
  const onUp = (e) => e.preventDefault();
  const onFocus = () => {
    node.select();
    node.addEventListener('mouseup', onUp, { once: true });
    // A keyboard focus has no mouseup; drop the guard so it can't swallow an
    // unrelated click later.
    clearTimeout(timer);
    timer = setTimeout(() => node.removeEventListener('mouseup', onUp), 400);
  };
  node.addEventListener('focus', onFocus);
  return {
    destroy() {
      clearTimeout(timer);
      node.removeEventListener('focus', onFocus);
      node.removeEventListener('mouseup', onUp);
    }
  };
}
