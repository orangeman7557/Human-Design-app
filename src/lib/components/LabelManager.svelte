<!-- Manage-labels modal (2026-08-09): create, rename, reorder and delete the -->
<!-- global label list. Mutations go straight to the DB; onChanged tells the -->
<!-- parent to reload (a rename/delete also rewrites charts). routeT because the -->
<!-- trigger lives on the prerendered home (see route-t.svelte.js). -->
<script>
  import { fade, fly } from 'svelte/transition';
  import { routeT } from '$lib/i18n/route-t.svelte.js';
  import { focusTrap } from './focus-trap.js';
  import { scrollLock } from './scroll-lock.js';
  import { dialog } from './dialog.svelte.js';
  import { createLabel, renameLabel, deleteLabel, reorderLabels } from '$lib/db/charts.js';

  /**
   * @type {{
   *   labels: import('$lib/db/charts.js').Label[],
   *   onClose: () => void,
   *   onChanged: () => (void | Promise<void>)
   * }}
   */
  let { labels, onClose, onChanged } = $props();

  const t = routeT();

  let newName = $state('');
  /** @type {HTMLInputElement | undefined} */
  let newInput = $state();

  // Local working copy so drag reordering feels immediate; resynced from the
  // prop whenever the parent reloads (but never mid-drag).
  let items = $state([]);
  $effect(() => {
    if (dragIndex === null) items = [...labels];
  });

  /** @type {number | null} */
  let dragIndex = $state(null);
  function dragStart(i) {
    dragIndex = i;
  }
  function dragOver(e, i) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    const arr = [...items];
    const [moved] = arr.splice(dragIndex, 1);
    arr.splice(i, 0, moved);
    items = arr;
    dragIndex = i;
  }
  async function dragEnd() {
    if (dragIndex === null) return;
    dragIndex = null;
    await reorderLabels(items.map((l) => l.id));
    await onChanged();
  }

  async function add() {
    const res = await createLabel(newName);
    if ('error' in res) {
      if (res.error === 'duplicate') await dialog.alert({ message: t('labels.duplicate') });
      return;
    }
    newName = '';
    await onChanged();
    newInput?.focus();
  }

  async function rename(label) {
    const name = await dialog.prompt({
      title: t('labels.renameTitle'),
      defaultValue: label.name,
      placeholder: t('labels.renamePlaceholder'),
      confirmLabel: t('labels.renameConfirm')
    });
    if (name === null) return;
    const res = await renameLabel(label.id, name);
    if ('error' in res && res.error === 'duplicate') {
      await dialog.alert({ message: t('labels.duplicate') });
      return;
    }
    await onChanged();
  }

  async function remove(label) {
    const ok = await dialog.confirm({
      title: t('labels.deleteTitle'),
      message: t('labels.deleteMessage', { name: label.name }),
      confirmLabel: t('labels.deleteConfirm'),
      danger: true
    });
    if (!ok) return;
    await deleteLabel(label.id);
    await onChanged();
  }

  function onkeydown(e) {
    if (e.key === 'Escape') onClose();
  }
</script>

<svelte:window {onkeydown} />

<div class="scrim" onclick={onClose} role="presentation" transition:fade={{ duration: 120 }}></div>
<div
  class="modal"
  role="dialog"
  aria-modal="true"
  aria-label={t('labels.managerAria')}
  use:focusTrap
  use:scrollLock
  transition:fly={{ y: 12, duration: 180 }}
>
  <header>
    <h2>{t('labels.managerTitle')}</h2>
    <button class="close" type="button" onclick={onClose} aria-label={t('labels.close')}>✕</button>
  </header>

  <p class="sub">{t('labels.managerSubtitle')}</p>

  {#if items.length === 0}
    <p class="empty">{t('labels.emptyList')}</p>
  {:else}
    <ul>
      {#each items as label, i (label.id)}
        <li
          draggable="true"
          class:dragging={dragIndex === i}
          ondragstart={() => dragStart(i)}
          ondragover={(e) => dragOver(e, i)}
          ondragend={dragEnd}
        >
          <span class="drag" aria-hidden="true">⠿</span>
          <span class="name">{label.name}</span>
          <button class="act" type="button" onclick={() => rename(label)} aria-label={t('labels.rename')}>✎</button>
          <button class="act danger" type="button" onclick={() => remove(label)} aria-label={t('labels.delete')}>✕</button>
        </li>
      {/each}
    </ul>
  {/if}

  <form class="add" onsubmit={(e) => { e.preventDefault(); add(); }}>
    <input
      bind:this={newInput}
      bind:value={newName}
      type="text"
      maxlength="40"
      placeholder={t('labels.newPlaceholder')}
    />
    <button type="submit" class="add-btn" aria-label={t('labels.add')}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
    </button>
  </form>

  <div class="foot">
    <button type="button" class="done" onclick={onClose}>{t('labels.close')}</button>
  </div>
</div>

<style>
  .scrim {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 70;
  }
  .modal {
    position: fixed;
    z-index: 71;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(420px, calc(100vw - 2rem));
    max-height: 85dvh;
    overflow-y: auto;
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1rem 1.3rem 1.3rem;
    text-align: left;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  h2 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    color: var(--accent);
  }
  .close {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1;
    padding: 0.15rem 0.3rem;
    cursor: pointer;
  }
  .close:hover {
    color: var(--text);
  }
  .sub {
    margin: 0.6rem 0 1rem;
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--text-muted);
  }
  .empty {
    margin: 0 0 1rem;
    font-size: 0.88rem;
    color: var(--text-muted);
  }
  ul {
    list-style: none;
    margin: 0 0 0.9rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }
  li {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.5rem 0.55rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }
  li.dragging {
    opacity: 0.5;
  }
  .drag {
    color: var(--text-muted);
    opacity: 0.5;
    cursor: grab;
    font-size: 0.85rem;
    user-select: none;
  }
  .name {
    flex: 1;
    min-width: 0;
    font-size: 0.92rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .act {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.15rem 0.3rem;
    font-size: 0.85rem;
    line-height: 1;
  }
  .act:hover {
    color: var(--text);
  }
  .act.danger:hover {
    color: var(--danger);
  }
  .add {
    display: flex;
    gap: 0.4rem;
  }
  .add input {
    flex: 1;
    min-width: 0;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    font-family: inherit;
    font-size: 0.9rem;
    padding: 0.5rem 0.6rem;
    outline: none;
  }
  .add input:focus {
    border-color: var(--accent);
  }
  .add input::placeholder {
    color: var(--text-muted);
  }
  .add-btn {
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    flex: none;
    background: var(--accent-soft);
    border: 1px solid transparent;
    border-radius: var(--radius);
    color: var(--accent);
    cursor: pointer;
  }
  .add-btn:hover {
    border-color: var(--accent);
  }
  .foot {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.1rem;
  }
  .done {
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: var(--radius);
    padding: 0.5rem 1.1rem;
    font-family: inherit;
    font-size: 0.85rem;
    cursor: pointer;
  }
  .done:hover {
    border-color: var(--accent);
  }
</style>
