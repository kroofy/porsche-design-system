import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'lit-table-body' });

export default function LitTableBody() {
  const state = useStore({
    get cssText(): string {
      return ':host{display:table-row-group}:host([hidden]){display:none !important}';
    },
  });

  useStyle(`
    :host {
      display: table-row-group;
    }
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
