import { useMetadata, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-table-head' });

export default function LitTableHead() {
  useStyle(`
    :host {
      display: table-header-group;
      font: var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next) !important;
      border-bottom: 1px solid var(--_p-table-c) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    ::slotted(*) {
      --_p-table-d: 0px !important;
      --_p-table-b: none !important;
    }
  `);

  return (
    <div class="root">
      <slot />
    </div>
  );
}
