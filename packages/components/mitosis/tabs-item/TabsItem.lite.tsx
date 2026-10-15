import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-tabs-item' });

export default function LitTabsItem(props: { label?: string }) {
  const state = useStore({
    get labelValue(): any {
      return props.label || '';
    },
  });

  useStyle(`
    :host {
      display: block;
      color: var(--p-color-primary) !important;
      border-radius: 2px !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    :host(:focus-visible) {
      outline: 2px solid var(--p-color-focus) !important;
      outline-offset: 2px !important;
    }
    @media (forced-colors: active) {
      :host(:focus-visible) {
        outline-color: Highlight !important;
      }
    }
  `);

  return (
    <div class="root">
      <slot />
    </div>
  );
}
