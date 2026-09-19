import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-drilldown-item' });

export default function LitDrilldownItem(props: {
  identifier?: any;
  label?: any;
  primary?: any;
  secondary?: any;
  cascade?: any;
}) {
  const state = useStore({
    get labelValue(): any {
      return props.label || '';
    },
  });

  useStyle(`
    @keyframes slide-up-mobile {
      from {
        transform: translate3d(0, var(--p-spacing-fluid-md), 0);
      }
      to {
        transform: translate3d(0, 0, 0);
      }
    }
    @keyframes slide-up-desktop-primary {
      from {
        margin-block-start: var(--p-spacing-fluid-md);
      }
      to {
        margin-block-start: 0px;
      }
    }
    @keyframes slide-up-desktop-secondary {
      from {
        margin-block-start: var(--p-spacing-fluid-md);
      }
      to {
        margin-block-start: 0px;
      }
    }
    :host {
      display: contents;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    slot[name="header"] {
      display: none;
    }
    :host([primary]) slot[name="button"],
    :host([cascade]) slot[name="button"] {
      display: none;
    }
    slot:not([name]) {
      display: none;
    }
    h2 {
      display: none;
    }
    :host([cascade]) ::slotted(*:not([primary], [cascade])) {
      display: none !important;
    }
    ::slotted(*) {
      --p-drilldown-grid-template: auto/auto;
      --p-drilldown-gap: var(--p-spacing-fluid-xs);
    }
    .scroller {
      display: none;
      overflow: hidden auto;
      background: var(--_p-drilldown-f);
    }
    .button {
      grid-column: 1/-1;
      padding: var(--p-spacing-fluid-sm);
      margin: 0 calc(var(--p-spacing-fluid-sm) * -1);
    }
    :host([primary]) .button,
    :host([cascade]) .button {
      display: none;
    }
    :host(:not([primary])) .back {
      display: none;
    }
    .drawer {
      display: none;
    }
    @media (max-width: 759px) {
      :host([secondary]) slot[name="header"] {
        grid-area: 2/3;
        display: grid;
        place-items: center;
        z-index: 2;
      }
      :host([secondary]) slot[name="button"] {
        display: none;
      }
      :host([secondary]) slot:not([name]) {
        grid-area: 4/2/auto/-2;
        z-index: 0;
        display: grid;
        grid-template: var(--p-drilldown-grid-template, auto/auto);
        gap: var(--p-drilldown-gap, var(--p-spacing-fluid-xs));
        align-content: start;
        align-items: start;
        box-sizing: border-box;
        min-height: 100%;
        height: fit-content;
        padding-block-end: var(--p-spacing-fluid-lg);
        animation: slide-up-mobile var(--p-animation-duration, var(--p-duration-md)) var(--p-ease-in-out);
      }
      :host([primary]) slot:not([name]),
      :host([cascade]) slot:not([name]) {
        display: contents;
      }
      :host([secondary]) h2 {
        font: var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
        display: block;
        grid-area: 2/3;
        place-self: center;
        z-index: 2;
        margin: 0;
        padding-inline: var(--p-spacing-static-md);
        max-width: 100%;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--_p-drilldown-a);
      }
      :host([primary]) ::slotted(*:not([secondary])) {
        display: none;
      }
      :host([secondary]) .scroller {
        display: grid;
        grid-template-rows: subgrid;
        grid-template-columns: subgrid;
        grid-area: 1/1/-1/-1;
      }
      :host([secondary]) .scroller::before {
        z-index: 1;
        content: "";
        position: sticky;
        top: 0;
        grid-area: 1/1/4/-1;
        background: linear-gradient(180deg, var(--_p-drilldown-b) 0%, var(--_p-drilldown-b) 65%, transparent 100%);
      }
      :host([primary]) .scroller,
      :host([cascade]) .scroller {
        display: contents;
      }
      :host([secondary]) .button {
        display: none;
      }
      :host([primary]) .back {
        grid-area: 2/2;
        margin-top: 2px;
        width: fit-content;
        height: fit-content;
        place-self: start;
        z-index: 2;
      }
      :host([secondary]) .drawer {
        display: contents;
      }
      :host([primary]) .drawer,
      :host([cascade]) .drawer {
        display: contents;
      }
    }
    @media (min-width: 760px) {
      :host([primary]) slot:not([name]) {
        grid-area: 3/2/auto/-2;
        display: grid;
        grid-template: var(--p-drilldown-grid-template, auto/auto);
        gap: var(--p-drilldown-gap, var(--p-spacing-fluid-xs));
        align-content: start;
        align-items: start;
        box-sizing: border-box;
        min-height: 100%;
        height: fit-content;
        padding-block-end: var(--p-spacing-fluid-lg);
        animation: slide-up-desktop-primary var(--p-animation-duration, var(--p-duration-md)) var(--p-ease-in-out);
      }
      :host([secondary]) slot:not([name]) {
        grid-area: 2/2/auto/-2;
        display: grid;
        grid-template: var(--p-drilldown-grid-template, auto/auto);
        gap: var(--p-drilldown-gap, var(--p-spacing-fluid-xs));
        align-content: start;
        align-items: start;
        box-sizing: border-box;
        min-height: 100%;
        height: fit-content;
        padding-block-end: var(--p-spacing-fluid-lg);
        animation: slide-up-desktop-secondary var(--p-animation-duration, var(--p-duration-md)) var(--p-ease-in-out);
      }
      :host([cascade]) slot:not([name]) {
        display: contents;
      }
      :host([secondary]) .scroller {
        grid-area: 1/1/-1/-1;
        display: grid;
        grid-template-rows: subgrid;
        grid-template-columns: subgrid;
      }
      :host([primary]) .scroller,
      :host([cascade]) .scroller {
        display: contents;
      }
      :host([primary]) .back {
        grid-area: 2/2;
        margin-bottom: var(--p-spacing-fluid-md);
        width: fit-content;
        height: fit-content;
        margin-inline-start: -4px;
      }
      :host([secondary]) .drawer {
        position: absolute;
        inset: 0;
        inset-inline-start: clamp(338px, 210px + 18vw, 640px);
        display: grid;
        grid-template: var(--p-spacing-fluid-md) minmax(0, 1fr)/var(--p-spacing-fluid-lg) minmax(0, 1fr) var(--p-spacing-fluid-lg);
      }
      :host([primary]) .drawer,
      :host([cascade]) .drawer {
        display: contents;
      }
    }
  `);

  return (
    <p-button-pure
      class="button"
      type="button"
      size="medium"
      align-label="start"
      stretch="true"
      icon="arrow-head-right"
    >
      {props.label}
    </p-button-pure>
  );
}
