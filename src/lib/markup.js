// Inline markup → HTML for our own content strings (Phase 6/7).
//
// The content uses Markdown-style emphasis: **bold** and *italic*, plus the
// cross-reference link markup `[label](kind:key)`. The text is all ours, but we
// still escape HTML first and only then turn the markers into
// <strong>/<em>/<span class="ilink">. Shared by ElementInfo and InitialReport
// so both render identically; links carry `data-link="kind:key"` for the host
// to delegate clicks (open the linked element).

/**
 * @param {string} text
 * @returns {string} HTML safe to inject with {@html}
 */
export function renderInline(text) {
  const esc = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return esc
    .replace(
      // The kind is camelCase for some elements (`activationCol:personality`),
      // so it must accept capitals — with `[a-z]+` those links never matched and
      // the raw `[label](kind:key)` leaked into the rendered text.
      /\[([^\]]+)\]\(([a-zA-Z]+:[^)]+)\)/g,
      '<span class="ilink" role="link" tabindex="0" data-link="$2">$1</span>'
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
