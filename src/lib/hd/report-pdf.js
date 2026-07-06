// Initial-report PDF export (Phase 7 follow-up).
//
// Turns the assembled report (buildReport sections + buildReportPrompt) plus a
// pre-rendered "cover" image (the chart header + summary cards + bodygraph,
// captured on the chart page) into a downloadable PDF. The cover goes first
// (the chart's data + bodygraph), then the report is laid out as real,
// selectable text — so the file stays light and crisp instead of one long
// screenshot.
//
// Dark theme to match the app: the cover image already carries a dark
// background, so a dark page lets it sit seamlessly. jsPDF is imported lazily
// (it's heavy) so it never weighs on first paint.
//
// Pure layout: no calculation, no chart access — it only consumes the data the
// caller passes in, which keeps it testable in plain Node (see the cover image
// supplied as { dataUrl, width, height }).

// A4 in points (jsPDF unit 'pt').
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 48;
const MARGIN_TOP = 54;
const MARGIN_BOTTOM = 54;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const Y_MAX = PAGE_H - MARGIN_BOTTOM;

// App tokens (app.css), as RGB.
const C = {
  bg: [11, 11, 13], // --bg #0b0b0d
  surface2: [30, 30, 34], // --surface-2 #1e1e22
  border: [42, 42, 46], // --border #2a2a2e
  text: [232, 232, 234], // --text #e8e8ea
  muted: [160, 160, 168], // --text-muted #a0a0a8
  body: [196, 196, 202], // report body grey #c4c4ca
  accent: [212, 166, 87] // --accent #d4a657
};

/** Strip the in-text markup to styled runs: [{ text, bold, italic }].
 *  `[label](kind:key)` → label (links are meaningless in a PDF). */
function parseRuns(input) {
  const s = String(input).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  /** @type {{ text: string, bold: boolean, italic: boolean }[]} */
  const runs = [];
  let bold = false;
  let italic = false;
  let buf = '';
  const flush = () => {
    if (buf) runs.push({ text: buf, bold, italic });
    buf = '';
  };
  for (let i = 0; i < s.length; ) {
    if (s[i] === '*' && s[i + 1] === '*') {
      flush();
      bold = !bold;
      i += 2;
    } else if (s[i] === '*') {
      flush();
      italic = !italic;
      i += 1;
    } else {
      buf += s[i];
      i += 1;
    }
  }
  flush();
  return runs;
}

/** jsPDF layout engine over a single document, tracking the y cursor and
 *  paginating with the dark background repainted on every page. */
function makeLayout(doc) {
  let y = MARGIN_TOP;

  const paintBg = () => {
    doc.setFillColor(...C.bg);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
    // Discreet site attribution at the top of every page (sits above the
    // content, which starts at MARGIN_TOP).
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...C.accent);
    doc.text('hdchart.app', PAGE_W / 2, 30, { align: 'center', charSpace: 0.8 });
  };
  const newPage = () => {
    doc.addPage();
    paintBg();
    y = MARGIN_TOP;
  };
  // Make sure `space` points of vertical room remain; otherwise break.
  const ensure = (space) => {
    if (y + space > Y_MAX) newPage();
  };
  const setStyle = (bold, italic) =>
    doc.setFont('helvetica', bold && italic ? 'bolditalic' : bold ? 'bold' : italic ? 'italic' : 'normal');

  // Word-wrap a run list within [x, x+maxW], advancing y. Whitespace between
  // words collapses at line breaks. y is the baseline of the line being drawn.
  // Font size, style and colour are jsPDF document state that survives addPage,
  // so they're set per-paragraph / per-run, not per word.
  const richText = (runs, { size, color, lineHeight, x = MARGIN_X, maxW = CONTENT_W }) => {
    doc.setFontSize(size);
    doc.setTextColor(...color);
    ensure(lineHeight);
    let cx = x;
    let atLineStart = true;
    for (const run of runs) {
      setStyle(run.bold, run.italic);
      for (const tok of run.text.split(/(\s+)/)) {
        if (!tok) continue;
        if (/^\s+$/.test(tok)) {
          if (!atLineStart) cx += doc.getTextWidth(tok);
          continue;
        }
        const w = doc.getTextWidth(tok);
        if (!atLineStart && cx + w > x + maxW) {
          cx = x;
          y += lineHeight;
          ensure(lineHeight);
        }
        doc.text(tok, cx, y);
        cx += w;
        atLineStart = false;
      }
    }
    y += lineHeight;
  };

  const gap = (h) => {
    y += h;
  };
  const divider = () => {
    ensure(12);
    y += 6;
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.5);
    doc.line(MARGIN_X, y, MARGIN_X + CONTENT_W, y);
    y += 12;
  };

  return {
    paintBg,
    richText,
    gap,
    divider,
    ensure,
    setStyle,
    get y() {
      return y;
    },
    set y(v) {
      y = v;
    }
  };
}

/** Place the cover image fit to the content box, preserving aspect; returns nothing. */
function drawCover(doc, L, image) {
  if (!image?.dataUrl || !image.width || !image.height) return;
  const maxW = CONTENT_W;
  const maxH = Y_MAX - MARGIN_TOP;
  const scale = Math.min(maxW / image.width, maxH / image.height);
  const w = image.width * scale;
  const h = image.height * scale;
  const x = MARGIN_X + (maxW - w) / 2;
  const yTop = MARGIN_TOP + Math.max(0, (maxH - h) / 2);
  doc.addImage(image.dataUrl, 'PNG', x, yTop, w, h, undefined, 'FAST');
  // Subtle frame so the dark image reads as a contained figure.
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.5);
  doc.roundedRect(x - 6, yTop - 6, w + 12, h + 12, 6, 6, 'S');
}

/** Render a centre walk-through card (name chip + state tag + two lines). */
function drawCentre(doc, L, c) {
  L.ensure(40);
  L.gap(6);
  const x = MARGIN_X;
  // Left accent bar, gold when defined, grey when open.
  const barTop = L.y - 9;
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...C.text);
  doc.text(c.title, x + 10, L.y);
  const nameW = doc.getTextWidth(c.title);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...(c.defined ? C.accent : C.muted));
  doc.text((c.defined ? 'DEFINIDO' : 'ABIERTO'), x + 10 + nameW + 8, L.y, { charSpace: 0.5 });
  L.y += 14;
  L.richText(parseRuns(c.fn), { size: 9.5, color: C.body, lineHeight: 13, x: x + 10, maxW: CONTENT_W - 10 });
  L.richText(parseRuns(c.state), { size: 9.5, color: C.body, lineHeight: 13, x: x + 10, maxW: CONTENT_W - 10 });
  // The accent bar spans from the name down to the last text line.
  doc.setDrawColor(...(c.defined ? C.accent : C.border));
  doc.setLineWidth(2);
  doc.line(x + 2, barTop, x + 2, L.y - 11);
}

/**
 * Build the report PDF.
 * @param {{
 *   image?: { dataUrl: string, width: number, height: number } | null,
 *   sections: { id: string, title: string, paragraphs: any[], items?: any[] }[]
 * }} args
 * @returns {Promise<Blob>}
 */
export async function buildReportPdf({ image = null, sections = [] }) {
  const { jsPDF } = await import('jspdf');
  // compress: zlib-deflate the content streams (off by default) — the cover
  // image plus the word-by-word text would otherwise bloat the file.
  const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
  const L = makeLayout(doc);

  // ── Cover: the chart's data + bodygraph (page 1). ──
  L.paintBg();
  if (image) {
    drawCover(doc, L, image);
    doc.addPage();
    L.paintBg();
    L.y = MARGIN_TOP;
  }

  // ── Report header. ──
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...C.accent);
  doc.text('TU INFORME INICIAL PERSONALIZADO', MARGIN_X, L.y, { charSpace: 1 });
  L.y += 22;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(20);
  doc.setTextColor(...C.text);
  doc.text('Conoce tu diseño', MARGIN_X, L.y);
  L.y += 14;
  L.divider();

  // ── Sections. ──
  for (const s of sections) {
    L.gap(10);
    L.ensure(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...C.accent);
    // Section titles can be long ("Tus centros y tus condicionamientos") — wrap.
    for (const line of doc.splitTextToSize(s.title, CONTENT_W)) {
      L.ensure(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(...C.accent);
      doc.text(line, MARGIN_X, L.y);
      L.y += 18;
    }
    L.gap(4);

    for (const p of s.paragraphs ?? []) {
      if (typeof p === 'string') {
        L.richText(parseRuns(p), { size: 10.5, color: C.body, lineHeight: 15.5 });
        L.gap(3);
      } else if (p && p.subhead) {
        L.gap(6);
        L.ensure(18);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...C.text);
        doc.text(p.subhead, MARGIN_X, L.y);
        L.y += 16;
      }
    }

    if (s.items?.length) {
      for (const c of s.items) drawCentre(doc, L, c);
    }

    L.divider();
  }

  return doc.output('blob');
}
