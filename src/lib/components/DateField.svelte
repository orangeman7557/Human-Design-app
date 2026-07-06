<!-- AI-authored — day/month/year date entry (2026-07-06).
     Replaces the native `type=date` input on the home form: birth dates are
     known, not picked, and Android's native picker makes the user scroll a
     ~100-year list. Three numeric segments (DD / MM / AAAA) inside one
     field-looking container: numeric keypad on mobile, auto-advance when a
     segment fills, backspace walks back, single digits pad on blur.
     Binds an ISO `YYYY-MM-DD` string (or '' while incomplete/impossible), so
     the rest of the app is untouched. Field order is per-component markup —
     ready to swap for locales that write month first (Phase M). -->
<script>
  import { untrack } from 'svelte';

  /** @type {{ value?: string }} value: ISO YYYY-MM-DD, '' when incomplete */
  let { value = $bindable('') } = $props();

  let day = $state('');
  let month = $state('');
  let year = $state('');
  /** @type {HTMLInputElement[]} segment elements in visual order */
  let els = [];

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

  const SEGMENTS = [
    { get: () => day, set: (v) => (day = v), max: 2 },
    { get: () => month, set: (v) => (month = v), max: 2 },
    { get: () => year, set: (v) => (year = v), max: 4 }
  ];

  function onInput(e, i) {
    const seg = SEGMENTS[i];
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
    const seg = SEGMENTS[i];
    const v = seg.get();
    if (seg.max === 2 && v.length === 1) {
      seg.set('0' + v);
      sync();
    }
  }
</script>

<div class="datefield" class:invalid role="group" aria-label="Fecha de nacimiento (día, mes y año)">
  <input
    bind:this={els[0]}
    value={day}
    oninput={(e) => onInput(e, 0)}
    onkeydown={(e) => onKeydown(e, 0)}
    onblur={() => onBlur(0)}
    type="text"
    class="seg"
    inputmode="numeric"
    pattern="[0-9]*"
    maxlength="2"
    placeholder="dd"
    autocomplete="bday-day"
    aria-label="Día"
    required
  />
  <span class="sep" aria-hidden="true">/</span>
  <input
    bind:this={els[1]}
    value={month}
    oninput={(e) => onInput(e, 1)}
    onkeydown={(e) => onKeydown(e, 1)}
    onblur={() => onBlur(1)}
    type="text"
    class="seg"
    inputmode="numeric"
    pattern="[0-9]*"
    maxlength="2"
    placeholder="mm"
    autocomplete="bday-month"
    aria-label="Mes"
    required
  />
  <span class="sep" aria-hidden="true">/</span>
  <input
    bind:this={els[2]}
    value={year}
    oninput={(e) => onInput(e, 2)}
    onkeydown={(e) => onKeydown(e, 2)}
    onblur={() => onBlur(2)}
    type="text"
    class="seg year"
    inputmode="numeric"
    pattern="[0-9]*"
    maxlength="4"
    placeholder="aaaa"
    autocomplete="bday-year"
    aria-label="Año"
    required
  />
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
  .seg {
    flex: 1;
    min-width: 0;
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
    flex: 1.6;
  }
  .sep {
    color: var(--text-muted);
    opacity: 0.6;
    flex: none;
    padding: 0 0.15rem;
  }
</style>
