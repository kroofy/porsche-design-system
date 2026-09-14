import { useMetadata, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-table-head-row' });

export default function LitTableHeadRow() {
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
      <slot />
    </div>
  );
}
