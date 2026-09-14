import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-table-head-cell' });

export default function LitTableHeadCell(props: { sort?: any; hideLabel?: any; multiline?: any }) {
  const state = useStore({
    parseSort(): any {
      let sort: any = props.sort;
      if (typeof sort === 'string' && sort.charAt(0) === '{') {
        try {
          sort = JSON.parse(sort);
        } catch (e) {
          sort = undefined;
        }
      }
      return sort;
    },
    get sortable(): boolean {
      const sort: any = state.parseSort();
      if (!sort) return false;
      return sort.active !== undefined && sort.direction !== undefined;
    },
    get hostStyle(): Record<string, string> {
      const sort: any = state.parseSort();
      const hideLabel = props.hideLabel === true || props.hideLabel === 'true' || props.hideLabel === '';
      const multiline = props.multiline === true || props.multiline === 'true' || props.multiline === '';
      const active = sort ? sort.active : undefined;
      const direction = sort ? sort.direction : undefined;
      return {
        '--p-table-head-cell-ws': multiline ? 'normal' : 'nowrap',
        '--p-table-head-cell-icon-opacity': active ? '1' : '0',
        '--p-table-head-cell-icon-deg': direction === 'asc' ? '0deg' : '180deg',
        '--p-table-head-cell-span-pos': hideLabel ? 'absolute' : '',
        '--p-table-head-cell-span-w': hideLabel ? '1px' : '',
        '--p-table-head-cell-span-h': hideLabel ? '1px' : '',
        '--p-table-head-cell-span-pad': hideLabel ? '0' : '',
        '--p-table-head-cell-span-m': hideLabel ? '-1px' : '',
        '--p-table-head-cell-span-overflow': hideLabel ? 'hidden' : '',
        '--p-table-head-cell-span-clip': hideLabel ? 'rect(0, 0, 0, 0)' : '',
        '--p-table-head-cell-span-ws': hideLabel ? 'nowrap' : '',
        '--p-table-head-cell-span-display': hideLabel ? 'block' : '',
        '--p-table-head-cell-span-border': hideLabel ? '0' : '',
      };
    },
  });

  useStyle(`
    :host {
      display: table-cell;
      padding: 2px var(--_p-table-a, var(--p-spacing-fluid-sm)) var(--_p-table-a, var(--p-spacing-fluid-sm)) !important;
      vertical-align: bottom !important;
      white-space: var(--p-table-head-cell-ws, nowrap) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    button {
      position: relative;
      display: flex;
      gap: var(--p-spacing-static-xs);
      width: auto;
      margin: 0;
      padding: 0;
      font: inherit;
      color: inherit;
      align-items: flex-end;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      text-align: start;
      border: 0;
      z-index: 0;
      cursor: pointer;
    }
    button:focus,
    button:focus-visible {
      outline: none;
    }
    button::before {
      content: "";
      position: absolute;
      inset: -2px -4px;
      border-radius: var(--p-radius-sm);
      z-index: -1;
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    button:focus-visible::before {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    @media (forced-colors: active) {
      button:focus-visible::before {
        outline-color: Highlight;
      }
    }
    @media (hover: hover) {
      button:hover::before {
        -webkit-backdrop-filter: var(--p-blur-frosted);
        backdrop-filter: var(--p-blur-frosted);
        background-color: var(--p-color-frosted);
      }
      button:hover .icon,
      button:focus-visible .icon {
        opacity: 1;
      }
    }
    .icon {
      transition: opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      opacity: var(--p-table-head-cell-icon-opacity, 0);
      transform: rotate3d(0, 0, 1, var(--p-table-head-cell-icon-deg, 0deg));
      transform-origin: 50% 50%;
    }
    span {
      position: var(--p-table-head-cell-span-pos);
      width: var(--p-table-head-cell-span-w);
      height: var(--p-table-head-cell-span-h);
      padding: var(--p-table-head-cell-span-pad);
      margin: var(--p-table-head-cell-span-m);
      overflow: var(--p-table-head-cell-span-overflow);
      clip: var(--p-table-head-cell-span-clip);
      white-space: var(--p-table-head-cell-span-ws);
      display: var(--p-table-head-cell-span-display);
      border: var(--p-table-head-cell-span-border);
    }
  `);

  return (
    <span>
      <slot />
    </span>
  );
}
