import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-text-list-item' });

export default function LitTextListItem() {
  const state = useStore({
    get cssText(): string {
      return (
        ':host{display:grid;grid-template-columns:var(--_p-text-list-e) 1fr !important;column-gap:var(--p-spacing-static-md) !important;font:inherit !important;color:inherit !important}' +
        ':host([hidden]){display:none !important}' +
        'slot{display:inline}' +
        '::slotted(*){--_p-text-list-f:.625rem !important;--_p-text-list-g:"–" !important;--_p-text-list-a:2rem !important;--_p-text-list-b:"" !important}' +
        '::slotted(*:last-child){grid-column:2 !important}'
      );
    },
  });

  useStyle(`
    :host([hidden]) {
      display: none !important;
    }
  `);

  return (
    <div class="root">
      <style innerHTML={state.cssText} />
      <slot />
    </div>
  );
}
