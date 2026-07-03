// Shared focus management for the app's overlays (audit 2026-07-03, item 7).
//
// Svelte action (`use:focusTrap`): on mount it remembers the previously
// focused element, moves focus into the overlay (the node itself, via
// tabindex="-1", so nothing looks "selected"), keeps Tab / Shift+Tab cycling
// inside it, and restores focus to the opener on unmount. Deliberately small:
// no ARIA wiring here — each component owns its own roles/labels. Components
// that focus a specific control on open (Dialog's input) still work: their
// own focus call runs after this mount and simply wins.

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

/** @param {HTMLElement} node */
export function focusTrap(node) {
  const prev = /** @type {HTMLElement | null} */ (document.activeElement);
  if (!node.hasAttribute('tabindex')) node.setAttribute('tabindex', '-1');
  node.focus({ preventScroll: true });

  function onKeydown(e) {
    if (e.key !== 'Tab') return;
    const items = [...node.querySelectorAll(FOCUSABLE)].filter(
      (el) => el.getClientRects().length > 0
    );
    if (!items.length) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const current = document.activeElement;
    if (e.shiftKey && (current === first || current === node)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && current === last) {
      e.preventDefault();
      first.focus();
    }
  }

  node.addEventListener('keydown', onKeydown);
  return {
    destroy() {
      node.removeEventListener('keydown', onKeydown);
      prev?.focus?.({ preventScroll: true });
    }
  };
}
