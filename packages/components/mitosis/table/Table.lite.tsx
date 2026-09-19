import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-table' });

export default function LitTable(props: {
  caption?: string;
  compact?: any;
  layout?: string;
  sticky?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const compact = isTrue(props.compact);
      const layout = props.layout || 'auto';
      const fixed = layout === 'fixed';
      return {
        '--p-table-pad': compact ? 'var(--p-spacing-static-sm)' : 'var(--p-spacing-fluid-sm)',
        '--p-table-layout': fixed ? 'fixed' : '',
        '--p-table-w': fixed ? '' : '100%',
        '--p-table-min-w': fixed ? '100%' : '',
      };
    },
    get captionText(): string {
      return props.caption || '';
    },
  });

  useStyle(`
    :host {
      display: block;
      --p-scroller-indicator-top: var(--p-table-scroll-indicator-top, 0px) !important;
      --p-scroller-indicator-bottom: var(--p-table-scroll-indicator-bottom, 0px) !important;
      --_p-table-b: var(--p-color-frosted) !important;
      --_p-table-c: var(--p-color-contrast-low) !important;
      --_p-table-a: var(--p-table-pad, var(--p-spacing-fluid-sm)) !important;
      --_p-table-d: 1px !important;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important;
      color: var(--p-color-primary) !important;
      text-align: start !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    .caption {
      margin-bottom: var(--p-spacing-fluid-md);
    }
    .table {
      display: table;
      border-collapse: collapse;
      white-space: nowrap;
      table-layout: var(--p-table-layout, auto);
      width: var(--p-table-w, auto);
      min-width: var(--p-table-min-w, auto);
    }
  `);

  return (
    <div class="table" role="table">
      <slot />
    </div>
  );
}
