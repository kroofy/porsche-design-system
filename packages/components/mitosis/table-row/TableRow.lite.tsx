import { useMetadata, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-table-row' });

export default function LitTableRow() {
  useStyle(`
    :host {
      display: table-row;
      border-bottom: var(--_p-table-d) solid var(--_p-table-c) !important;
      transition: background var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    @media (hover: hover) {
      :host(:hover) {
        background: var(--_p-table-b) !important;
      }
    }
  `);

  return (
    <div class="root">
      <slot />
    </div>
  );
}
