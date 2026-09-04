import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-table-cell' });

export default function LitTableCell(props: { multiline?: any }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const multiline = props.multiline === true || props.multiline === 'true' || props.multiline === '';
      return {
        '--p-table-cell-ws': multiline ? 'normal' : 'nowrap',
      };
    },
  });

  useStyle(`
    :host {
      display: table-cell;
      vertical-align: middle;
      padding: var(--_p-table-a) !important;
      margin: 0 !important;
      white-space: var(--p-table-cell-ws, nowrap) !important;
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
