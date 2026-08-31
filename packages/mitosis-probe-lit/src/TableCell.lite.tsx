import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'lit-table-cell' });

export default function LitTableCell(props: { multiline?: any }) {
  const state = useStore({
    get cssText(): string {
      const multiline = props.multiline === true || props.multiline === 'true' || props.multiline === '';
      const whiteSpace = multiline ? 'normal' : 'nowrap';
      return (
        ':host{display:table-cell;vertical-align:middle;' +
        'padding:var(--_p-table-a) !important;' +
        'margin:0 !important;' +
        'white-space:' +
        whiteSpace +
        ' !important}' +
        ':host([hidden]){display:none !important}'
      );
    },
  });

  useStyle(`
    :host {
      display: table-cell;
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
