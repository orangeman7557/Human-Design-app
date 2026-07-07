// Shared body-scroll lock for overlays (iOS fix, 2026-07-06).
//
// iOS Safari lets touch scrolling bleed through a fixed overlay to the page
// behind it (`overflow: hidden` on body is ignored there). The robust fix is
// pinning the body with `position: fixed` while any overlay is open,
// preserving the scroll offset and restoring it on close.
//
// Svelte action: `use:scrollLock` on the overlay's root element. Ref-counted,
// so stacked overlays (a dialog over the report) lock once and unlock when
// the last one closes.

let locks = 0;
let savedY = 0;

function lock() {
  if (locks++ > 0) return;
  savedY = window.scrollY;
  const s = document.body.style;
  s.position = 'fixed';
  s.top = `-${savedY}px`;
  s.left = '0';
  s.right = '0';
  s.width = '100%';
  s.overflow = 'hidden';
}

function unlock() {
  if (--locks > 0) return;
  const s = document.body.style;
  s.position = '';
  s.top = '';
  s.left = '';
  s.right = '';
  s.width = '';
  s.overflow = '';
  window.scrollTo(0, savedY);
}

/** @param {HTMLElement} node */
export function scrollLock(node) {
  lock();
  return { destroy: unlock };
}
