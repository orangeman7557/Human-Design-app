<script>
  // Themed modal host. Mounted once in +layout.svelte; renders whatever the
  // `dialog` controller (dialog.svelte.js) has marked active. See that file
  // for the promise-based API the rest of the app calls.
  import { tick } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { dialog } from './dialog.svelte.js';

  let inputValue = $state('');
  /** @type {HTMLInputElement | null} */
  let inputEl = $state(null);
  /** @type {HTMLButtonElement | null} */
  let confirmEl = $state(null);
  let lastSeen = null;

  // On each newly-opened request: seed the text field and move focus.
  $effect(() => {
    const a = dialog.active;
    if (a && a !== lastSeen) {
      lastSeen = a;
      if (a.mode === 'prompt') {
        inputValue = a.defaultValue ?? '';
        tick().then(() => {
          inputEl?.focus();
          inputEl?.select();
        });
      } else {
        tick().then(() => confirmEl?.focus());
      }
    } else if (!a) {
      lastSeen = null;
    }
  });

  // Tell the controller a host is mounted (so it renders in-app instead of
  // falling back to the native dialogs).
  $effect(() => dialog._register());

  function confirm() {
    const a = dialog.active;
    if (!a) return;
    dialog._resolve(a.mode === 'prompt' ? inputValue : true);
  }
  function cancel() {
    const a = dialog.active;
    if (!a) return;
    dialog._resolve(a.mode === 'prompt' ? null : a.mode === 'confirm' ? false : undefined);
  }
  function onScrim(e) {
    if (e.target === e.currentTarget) cancel();
  }
  function onWindowKey(e) {
    const a = dialog.active;
    if (!a) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    } else if (e.key === 'Enter' && a.mode !== 'prompt') {
      // In prompt mode the input handles Enter itself.
      e.preventDefault();
      confirm();
    }
  }
</script>

<svelte:window onkeydown={onWindowKey} />

{#if dialog.active}
  {@const a = dialog.active}
  <div
    class="scrim"
    onclick={onScrim}
    role="presentation"
    transition:fade={{ duration: 120 }}
  >
    <div
      class="dialog"
      role={a.mode === 'alert' ? 'alertdialog' : 'dialog'}
      aria-modal="true"
      aria-label={a.title || a.message || 'Diálogo'}
      transition:scale={{ duration: 130, start: 0.96, opacity: 0 }}
    >
      {#if a.title}<h2>{a.title}</h2>{/if}
      {#if a.message}<p>{a.message}</p>{/if}

      {#if a.mode === 'prompt'}
        <!-- svelte-ignore a11y_autofocus -->
        <input
          bind:this={inputEl}
          bind:value={inputValue}
          type="text"
          placeholder={a.placeholder}
          spellcheck="false"
          autocomplete="off"
          onkeydown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              confirm();
            }
          }}
        />
      {/if}

      <div class="row">
        {#if a.mode !== 'alert'}
          <button class="btn cancel" onclick={cancel}>{a.cancelLabel}</button>
        {/if}
        <button
          class="btn confirm"
          class:danger={a.danger}
          bind:this={confirmEl}
          onclick={confirm}
        >
          {a.confirmLabel}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .scrim {
    position: fixed;
    inset: 0;
    z-index: 70;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  .dialog {
    z-index: 71;
    width: 100%;
    max-width: 360px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  }
  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.05rem;
    font-weight: 500;
    color: var(--text);
  }
  p {
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.45;
  }
  input {
    width: 100%;
    margin-top: 0.5rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.7rem 0.85rem;
    border-radius: var(--radius);
    font-size: 1rem;
    font-family: inherit;
    color-scheme: dark;
  }
  input:focus {
    outline: none;
    border-color: var(--accent);
  }
  .row {
    display: flex;
    justify-content: flex-end;
    gap: 0.6rem;
    margin-top: 1.1rem;
  }
  .btn {
    padding: 0.55rem 1rem;
    border-radius: var(--radius);
    font-size: 0.85rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    border: 1px solid transparent;
  }
  .cancel {
    background: transparent;
    border-color: var(--border);
    color: var(--text-muted);
  }
  .cancel:hover {
    color: var(--text);
    border-color: var(--text-muted);
  }
  .confirm {
    background: var(--accent);
    color: #1a1408;
  }
  .confirm.danger {
    background: var(--danger);
    color: #2a0d0d;
  }
  .btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
</style>
