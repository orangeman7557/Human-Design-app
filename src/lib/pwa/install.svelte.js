// PWA install helper (Phase L — installability).
//
// Captures the browser's `beforeinstallprompt` on Chromium (Android + desktop)
// so we can trigger installation from our own "instalar como app" link rather
// than relying on the easily-missed native affordance. iOS Safari has no such
// event (install is a manual "Add to Home Screen"), so we detect it and fall
// back to showing instructions. When already running installed (standalone),
// nothing is offered.
//
// `install.mode` drives the UI:
//   'prompt' → Chromium: call promptInstall()
//   'ios'    → iOS Safari: show manual instructions
//   null     → nothing to offer (already installed, or unsupported browser)

let deferred = null;

export const install = $state({ mode: /** @type {'prompt' | 'ios' | null} */ (null) });

function isStandalone() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches === true ||
    // iOS Safari's non-standard flag when launched from the home screen
    window.navigator.standalone === true
  );
}

function isIosSafari() {
  const ua = window.navigator.userAgent;
  const iOS =
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS 13+ presents as desktop Safari; detect the touch Mac instead
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const otherIosBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua); // Chrome/FF/Edge/Opera on iOS
  return iOS && /WebKit/.test(ua) && !otherIosBrowser;
}

if (typeof window !== 'undefined' && !isStandalone()) {
  if (isIosSafari()) install.mode = 'ios';

  window.addEventListener('beforeinstallprompt', (e) => {
    // Suppress the mini-infobar; we surface our own affordance instead.
    e.preventDefault();
    deferred = e;
    install.mode = 'prompt';
  });

  window.addEventListener('appinstalled', () => {
    deferred = null;
    install.mode = null;
  });
}

/** Trigger the native install prompt (Chromium only). @returns {Promise<boolean>} accepted */
export async function promptInstall() {
  if (!deferred) return false;
  deferred.prompt();
  const { outcome } = await deferred.userChoice;
  deferred = null;
  install.mode = null;
  return outcome === 'accepted';
}
