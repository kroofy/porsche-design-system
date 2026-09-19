import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-popover' });

export default function LitPopover(props: {
  open?: any;
  direction?: string;
  description?: string;
  compact?: any;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const isOpen = isTrue(props.open);
      const compact = isTrue(props.compact);
      return {
        '--p-pop-pad': compact ? 'var(--p-spacing-static-sm)' : 'var(--p-spacing-static-md)',
        '--p-pop-radius': compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)',
        '--p-pop-ease': isOpen ? 'var(--p-ease-in)' : 'var(--p-ease-out)',
        '--p-pop-opacity': isOpen ? '1' : '0',
        '--p-pop-btn-bg': isOpen ? 'var(--p-color-frosted)' : '',
        '--p-pop-btn-blur': isOpen ? 'var(--p-blur-frosted)' : '',
      };
    },
    get descriptionText(): string {
      return props.description || '';
    },
  });

  useStyle(`
    :host {
      display: contents;
      margin: 0;
    }
    :host([hidden]) {
      display: none !important;
    }
    .wrap {
      display: contents;
    }
    slot:not([name]),
    p {
      display: block;
      margin: 0;
      min-width: 0;
      min-height: 0;
      max-width: inherit;
      max-height: inherit;
      box-sizing: border-box;
      padding-block: var(--p-popover-py, var(--p-pop-pad));
      padding-inline: var(--p-popover-px, var(--p-pop-pad));
      overflow: hidden auto;
      overscroll-behavior-y: none;
    }
    button {
      all: unset;
      margin: inherit;
      display: inline-grid;
      vertical-align: top;
      font: var(--p-typescale-sm) var(--p-font-porsche-next);
      width: var(--p-leading-normal);
      height: var(--p-leading-normal);
      flex: none;
      cursor: pointer;
    }
    button:focus-visible::before {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    button::before {
      grid-area: 1/1;
      content: "";
      margin: -2px;
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      border-radius: var(--p-radius-full);
      background: var(--p-pop-btn-bg);
      -webkit-backdrop-filter: var(--p-pop-btn-blur);
      backdrop-filter: var(--p-pop-btn-blur);
    }
    button::after {
      grid-area: 1/1;
      content: "";
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.5 10v6h-1v-6zm0-2v1h-1V8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16m0-1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.5 10v6h-1v-6zm0-2v1h-1V8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16m0-1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9"/></svg>') center/contain no-repeat;
      background: var(--p-color-primary);
    }
    [popover] {
      all: unset;
      position: fixed;
      top: 0;
      left: 0;
      filter: drop-shadow(0 0 16px rgba(0, 0, 0, .3));
      backdrop-filter: drop-shadow(0 0 transparent);
      border-radius: var(--p-popover-radius, var(--p-pop-radius));
      background: var(--p-color-canvas);
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-primary);
      width: var(--p-popover-w, max-content);
      height: var(--p-popover-h, auto);
      min-width: var(--p-popover-min-w, 0px);
      min-height: var(--p-popover-min-h, auto);
      max-width: var(--p-popover-max-w, min(calc(100dvw - 16px), 48ch));
      max-height: var(--p-popover-max-h, calc(100dvh - 16px));
      opacity: var(--p-pop-opacity);
      transition: opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-pop-ease);
      overlay: none;
      display: none;
    }
    [popover]:popover-open {
      overlay: auto;
      display: grid;
    }
    [popover]::backdrop {
      display: none;
    }
    @media (forced-colors: active) {
      button::after {
        background: ButtonText;
      }
      button:focus-visible::before {
        outline-color: Highlight;
      }
      [popover] {
        outline: 2px solid CanvasText;
        outline-offset: -2px;
      }
    }
    @media (hover: hover) {
      button:hover::before {
        background: var(--p-color-frosted-strong);
        -webkit-backdrop-filter: var(--p-blur-frosted);
        backdrop-filter: var(--p-blur-frosted);
      }
    }
    @supports (color: oklch(from red l c h)) {
      [popover] {
        background: hsl(from var(--p-color-canvas) h 0% calc(l + 14));
      }
    }
    @supports (overlay: auto) and (transition-behavior: allow-discrete) {
      [popover] {
        transition: opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-pop-ease), overlay var(--p-transition-duration, var(--p-duration-sm)) var(--p-pop-ease) allow-discrete, display var(--p-transition-duration, var(--p-duration-sm)) var(--p-pop-ease) allow-discrete;
      }
    }
    .arrow {
      position: absolute;
      width: 24px;
      height: 12px;
      clip-path: polygon(50% 0, 100% 110%, 0 110%);
      background: inherit;
    }
    @media (forced-colors: active) {
      .arrow {
        background: CanvasText;
      }
    }
    @starting-style {
      [popover] {
        opacity: 0;
      }
    }
  `);

  return (
    <div class="wrap">
      <button type="button" aria-label="More information" aria-details="popover" />
      <div id="popover" popover="manual">
        <div class="arrow"></div>
        <p>{state.descriptionText}</p>
        <slot />
      </div>
    </div>
  );
}
