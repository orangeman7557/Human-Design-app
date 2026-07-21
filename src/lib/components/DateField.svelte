<!-- AI-authored — day/month/year date entry (2026-07-06; localized Phase M).
     Replaces the native `type=date` input on the home form: birth dates are
     known, not picked, and Android's native picker makes the user scroll a
     ~100-year list. Three numeric segments inside one field-looking container:
     numeric keypad on mobile, auto-advance when a segment fills, backspace
     walks back, single digits pad on blur.
     Binds an ISO `YYYY-MM-DD` string (or '' while incomplete/impossible), so
     the rest of the app is untouched. Segment ORDER is data-driven: DD/MM/YYYY
     everywhere, except MM/DD/YYYY for US English (navigator en-US) — other
     English locales (UK, AU, CA…) keep day-first. -->
<script>
  import { untrack } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { t } from '$lib/i18n/index.svelte.js';
  import { selectOnFocus } from './select-on-focus.js';

  /** @type {{ value?: string }} value: ISO YYYY-MM-DD, '' when incomplete */
  let { value = $bindable('') } = $props();

  const lang = $derived($page.params.lang);
  const tr = (key) => t(key, undefined, lang);

  // Month-first only for US English; every other locale is day-first. Decided
  // client-side (navigator), so SSR/first paint is day-first and en-US swaps on
  // hydration while the field is still empty.
  let monthFirst = $state(false);
  $effect(() => {
    monthFirst = browser && lang === 'en' && (navigator.language || '').toLowerCase() === 'en-us';
  });

  let day = $state('');
  let month = $state('');
  let year = $state('');
  /** @type {HTMLInputElement[]} segment elements in visual order */
  let els = [];

  // Segment descriptors keyed by field; the visual `order` arranges them.
  const D = {
    day: { get: () => day, set: (v) => (day = v), max: 2, ph: 'date.phDay', aria: 'date.day', ac: 'bday-day' },
    month: { get: () => month, set: (v) => (month = v), max: 2, ph: 'date.phMonth', aria: 'date.month', ac: 'bday-month' },
    year: { get: () => year, set: (v) => (year = v), max: 4, ph: 'date.phYear', aria: 'date.year', ac: 'bday-year' }
  };
  const order = $derived(monthFirst ? ['month', 'day', 'year'] : ['day', 'month', 'year']);

  // A calendar-real date (rejects 31/02 etc.).
  function realDate(y, m, d) {
    const dt = new Date(y, m - 1, d);
    return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
  }
  function compose() {
    if (!day || !month || year.length !== 4) return '';
    const d = Number(day);
    const m = Number(month);
    const y = Number(year);
    if (!realDate(y, m, d)) return '';
    return `${year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
  function sync() {
    value = compose();
  }

  // Decompose external writes (form restore, clear) into the segments; skip
  // when the incoming value is what the segments already compose.
  $effect(() => {
    const v = value;
    untrack(() => {
      if (v === compose()) return;
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
        year = v.slice(0, 4);
        month = v.slice(5, 7);
        day = v.slice(8, 10);
      } else if (!v) {
        day = month = year = '';
      }
    });
  });

  // All three segments filled but not a real date → mark the field.
  const invalid = $derived(!!(day && month && year.length === 4) && !compose());

  function onInput(e, i) {
    const seg = D[order[i]];
    const clean = e.currentTarget.value.replace(/\D/g, '').slice(0, seg.max);
    e.currentTarget.value = clean; // drop non-digits even when state is unchanged
    seg.set(clean);
    sync();
    if (clean.length === seg.max) els[i + 1]?.focus();
  }

  function onKeydown(e, i) {
    const el = e.currentTarget;
    // Typing the separator jumps to the next segment (people type "13/3/1984").
    if (e.key === '/' || e.key === '.' || e.key === '-' || e.key === ' ') {
      e.preventDefault();
      if (el.value) els[i + 1]?.focus();
      return;
    }
    if (e.key === 'Backspace' && !el.value) {
      e.preventDefault();
      els[i - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && el.selectionStart === 0) {
      els[i - 1]?.focus();
    } else if (e.key === 'ArrowRight' && el.selectionStart === el.value.length) {
      els[i + 1]?.focus();
    }
  }

  // "3" → "03" on leave (day and month only; a 2-digit year stays incomplete
  // rather than guessing the century).
  function onBlur(i) {
    const seg = D[order[i]];
    const v = seg.get();
    if (seg.max === 2 && v.length === 1) {
      seg.set('0' + v);
      sync();
    }
  }
</script>

<div class="datefield" class:invalid role="group" aria-label={tr('date.group')}>
  {#each order as key, i (key)}
    {#if i > 0}<span class="sep" aria-hidden="true">/</span>{/if}
    <input
      bind:this={els[i]}
      use:selectOnFocus
      value={D[key].get()}
      oninput={(e) => onInput(e, i)}
      onkeydown={(e) => onKeydown(e, i)}
      onblur={() => onBlur(i)}
      type="text"
      class="seg"
      class:year={key === 'year'}
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength={D[key].max}
      placeholder={tr(D[key].ph)}
      autocomplete={D[key].ac}
      aria-label={tr(D[key].aria)}
      required
    />
  {/each}
</div>

<style>
  /* One field-looking container (same tokens/height as the form inputs, see
     +page.svelte); the segments are chromeless inputs inside it. */
  .datefield {
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    height: 2.75rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0 0.85rem;
  }
  .datefield:focus-within {
    border-color: var(--accent);
  }
  .datefield.invalid {
    border-color: var(--danger);
  }
  /* Segments size to their content (2 or 4 digits) instead of stretching, so
     the date reads as one compact "13 / 03 / 1984": left-aligned on desktop,
     centred on mobile like the rest of the form. Widths carry a little slack
     beyond the digits so the "dd"/"mm" placeholders (whose letters are wider
     than the digits) fit; the year box slack is matched to the short boxes so
     the gap after each "/" is even. */
  .seg {
    flex: none;
    width: 3.4ch;
    height: 100%;
    background: none;
    border: none;
    padding: 0;
    color: var(--text);
    font-size: 1rem;
    font-family: inherit;
    text-align: center;
    -webkit-appearance: none;
    appearance: none;
  }
  .seg:focus {
    outline: none;
  }
  .seg::placeholder {
    color: var(--text-muted);
    opacity: 0.7;
  }
  .seg.year {
    width: 4.1ch;
  }
  .sep {
    color: var(--text-muted);
    opacity: 0.6;
    flex: none;
    padding: 0 0.2rem;
  }
  @media (max-width: 520px) {
    .datefield {
      justify-content: center;
    }
  }
</style>
