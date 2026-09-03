import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-table' });

export default function LitTable(props: {
  caption?: string;
  compact?: any;
  layout?: string;
  sticky?: any;
}) {
  const state = useStore({
    get cssText(): string {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const compact = isTrue(props.compact);
      const layout = props.layout || 'auto';
      const pad = compact ? 'var(--p-spacing-static-sm)' : 'var(--p-spacing-fluid-sm)';
      let out =
        ':host{display:block;' +
        '--p-scroller-indicator-top:var(--p-table-scroll-indicator-top,0px) !important;' +
        '--p-scroller-indicator-bottom:var(--p-table-scroll-indicator-bottom,0px) !important;' +
        '--_p-table-b:var(--p-color-frosted) !important;' +
        '--_p-table-c:var(--p-color-contrast-low) !important;' +
        '--_p-table-a:' +
        pad +
        ' !important;' +
        '--_p-table-d:1px !important;' +
        'font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important;' +
        'color:var(--p-color-primary) !important;' +
        'text-align:start !important}' +
        ':host([hidden]){display:none !important}' +
        ':not(:defined,[data-ssr]){visibility:hidden}' +
        '.caption{margin-bottom:var(--p-spacing-fluid-md)}' +
        '.table{display:table;border-collapse:collapse;white-space:nowrap';
      if (layout === 'fixed') {
        out += ';table-layout:fixed;min-width:100%}';
      } else {
        out += ';width:100%}';
      }
      return out;
    },
    get captionText(): string {
      return props.caption || '';
    },
  });

  useStyle(`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none !important;
    }
  `);

  return (
    <div class="table" role="table">
      <style innerHTML={state.cssText} />
      <slot />
    </div>
  );
}
