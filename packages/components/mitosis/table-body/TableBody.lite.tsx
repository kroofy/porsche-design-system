import { useMetadata, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-table-body' });

export default function LitTableBody() {
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
      <slot />
    </div>
  );
}
