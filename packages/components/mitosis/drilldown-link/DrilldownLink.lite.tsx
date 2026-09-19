import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-drilldown-link' });

export default function LitDrilldownLink(props: {
  href?: any;
  active?: any;
  target?: any;
  download?: any;
  rel?: any;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const isActive = isTrue(props.active);
      return {
        '--p-ddl-deco': isActive ? '' : 'transparent',
        '--p-ddl-cursor': isActive ? 'default' : 'pointer',
      };
    },
  });

  useStyle(`
    :host {
      display: grid;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    a {
      all: unset;
      padding: calc(var(--p-spacing-fluid-sm) + 2px) calc(var(--p-spacing-fluid-sm) + 4px);
      margin: -2px calc(var(--p-spacing-fluid-sm) * -1 - 4px);
      border-radius: var(--p-radius-sm);
      font: var(--p-font-weight-normal) var(--p-typescale-md) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--_p-drilldown-a);
      text-decoration: underline;
      text-decoration-color: var(--p-ddl-deco, inherit);
      cursor: var(--p-ddl-cursor, pointer);
      transition: text-decoration-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    ::slotted(a) {
      all: unset !important;
      padding: calc(var(--p-spacing-fluid-sm) + 2px) calc(var(--p-spacing-fluid-sm) + 4px) !important;
      margin: -2px calc(var(--p-spacing-fluid-sm) * -1 - 4px) !important;
      border-radius: var(--p-radius-sm) !important;
      font: var(--p-font-weight-normal) var(--p-typescale-md) / var(--p-leading-normal) var(--p-font-porsche-next) !important;
      color: var(--_p-drilldown-a) !important;
      text-decoration: underline !important;
      text-decoration-color: var(--p-ddl-deco, inherit) !important;
      cursor: var(--p-ddl-cursor, pointer) !important;
      transition: text-decoration-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out) !important;
    }
    a:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    ::slotted(a:focus-visible) {
      outline: 2px solid var(--p-color-focus) !important;
      outline-offset: 2px !important;
    }
    @media (forced-colors: active) {
      a:focus-visible {
        outline-color: Highlight;
      }
      ::slotted(a:focus-visible) {
        outline-color: Highlight !important;
      }
    }
    @media (hover: hover) {
      a:hover {
        text-decoration-color: inherit;
      }
      ::slotted(a:hover) {
        text-decoration-color: inherit !important;
      }
    }
  `);

  return <slot />;
}
