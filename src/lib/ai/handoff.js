// AI handoff — Phase 6.A.
//
// No API, no backend, no cost: the app builds the prompt and hands it off.
// "Copy prompt" works with any AI; the deep links open the user's own AI
// with the prompt prefilled. Verified 2026-06: ChatGPT, Claude and
// Perplexity accept a query param that prefills the composer. Gemini has no
// reliable native prefill (needs a browser extension) → it falls back to
// copy, so it is intentionally not listed here.

/** @type {{ id: string, label: string, url: (prompt: string) => string }[]} */
export const AIS = [
  { id: 'claude', label: 'Claude', url: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}` },
  { id: 'chatgpt', label: 'ChatGPT', url: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}` },
  { id: 'perplexity', label: 'Perplexity', url: (p) => `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}` }
];

const PREF_KEY = 'hd:preferredAI';

/** The remembered AI, or null. localStorage may throw in private mode. */
export function getPreferredAI() {
  try {
    const id = localStorage.getItem(PREF_KEY);
    return AIS.find((a) => a.id === id) ?? null;
  } catch {
    return null;
  }
}

export function setPreferredAI(id) {
  try {
    localStorage.setItem(PREF_KEY, id);
  } catch {
    // Ignore — preference is a nicety, not required.
  }
}

/** Open an AI in a new tab with the prompt prefilled. */
export function openAI(ai, prompt) {
  window.open(ai.url(prompt), '_blank', 'noopener');
}
