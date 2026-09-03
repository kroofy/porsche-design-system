import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-table-head-row' });

export default function LitTableHeadRow() {
  const state = useStore({
    get cssText(): string {
      return ':host{display:table-row}:host([hidden]){display:none !important}';
    },
  });

  useStyle(`
    :host {
      display: table-row;
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
