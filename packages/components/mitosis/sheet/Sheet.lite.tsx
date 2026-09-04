import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-sheet' });

export default function LitSheet(props: {
  open?: any;
  dismissButton?: any;
  disableBackdropClick?: any;
  background?: string;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const isOpen = isTrue(props.open);
      const background = props.background === 'surface' ? 'surface' : 'canvas';
      const dialogBg = background === 'surface' ? 'var(--p-color-surface)' : 'var(--p-color-canvas)';
      const dismissHover = background === 'surface' ? 'var(--p-color-canvas)' : 'var(--p-color-surface)';
      const durMd = 'var(--p-transition-duration, var(--p-duration-md))';
      const durSm = 'var(--p-transition-duration, var(--p-duration-sm))';
      const durLg = 'var(--p-transition-duration, var(--p-duration-lg))';
      return {
        '--p-sh-w': isOpen ? '100dvw' : '0px',
        '--p-sh-h': isOpen ? '100dvh' : '0px',
        '--p-sh-vis': isOpen ? 'inherit' : 'hidden',
        '--p-sh-pe': isOpen ? 'auto' : 'none',
        '--p-sh-db': isOpen ? 'var(--p-color-backdrop)' : 'transparent',
        '--p-sh-delay': isOpen ? 'var(--p-transition-duration, 0s)' : durMd,
        '--p-sh-ease': isOpen ? 'var(--p-ease-in)' : 'var(--p-ease-out)',
        '--p-sh-ddur': isOpen ? durLg : durMd,
        '--p-sh-pdur': isOpen ? durMd : durSm,
        '--p-sh-op': isOpen ? '1' : '0',
        '--p-sh-tf': isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 25vh, 0)',
        '--p-sh-dialog-bg': dialogBg,
        '--p-sh-dismiss-bg': dialogBg,
        '--p-sh-dismiss-hover': dismissHover,
      };
    },
    get isOpenFlag(): any {
      const open = props.open;
      return open === true || open === 'true' || open === '';
    },
    get showDismiss(): any {
      const dismiss = props.dismissButton;
      if (dismiss === false || dismiss === 'false') return false;
      return true;
    },
    get ariaLabelText(): string {
      const raw = props.aria;
      if (raw && typeof raw === 'object' && raw['aria-label']) return raw['aria-label'];
      if (typeof raw === 'string' && raw.charAt(0) === '{') {
        try {
          const parsed = JSON.parse(raw.replace(/'/g, '"'));
          return parsed['aria-label'] || '';
        } catch (e) {
          return '';
        }
      }
      return '';
    },
  });

  useStyle(`
    :host {
      display: contents;
      --ref-p-sheet-pt: var(--p-spacing-fluid-md) !important;
      --ref-p-sheet-pb: calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) !important;
      --ref-p-sheet-px: var(--p-spacing-fluid-lg) !important;
      --pds-internal-grid-outer-column: calc(var(--p-spacing-fluid-lg) - clamp(16px, 1.25vw + 12px, 36px)) !important;
      --pds-internal-grid-margin: calc(var(--p-spacing-fluid-lg) * -1) !important;
      --pds-internal-grid-width-min: auto !important;
      --pds-internal-grid-width-max: none !important;
      --_p-dialog-a: var(--p-sh-dialog-bg) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    slot {
      display: block;
    }
    slot:first-of-type {
      grid-row-start: 1;
    }
    slot:not([name]) {
      grid-column: 2/3;
      z-index: 0;
    }
    slot[name="header"] {
      grid-column: 2/3;
      z-index: 0;
    }
    dialog {
      all: unset;
      position: fixed;
      inset: 0;
      max-width: 100dvw;
      max-height: 100dvh;
      overflow: hidden;
      display: block;
      user-select: text;
      outline: 0;
      width: var(--p-sh-w, 0px);
      height: var(--p-sh-h, 0px);
      visibility: var(--p-sh-vis, hidden);
      pointer-events: var(--p-sh-pe, none);
      background: var(--p-sh-db, transparent);
      transition: visibility 0s linear var(--p-sh-delay), width 0s linear var(--p-sh-delay), height 0s linear var(--p-sh-delay), background-color var(--p-sh-ddur) var(--p-sh-ease), -webkit-backdrop-filter var(--p-sh-ddur) var(--p-sh-ease), backdrop-filter var(--p-sh-ddur) var(--p-sh-ease);
      overlay: none;
    }
    dialog:modal {
      overlay: auto;
    }
    dialog::backdrop {
      display: none;
    }
    @supports (overlay: auto) and (transition-behavior: allow-discrete) {
      dialog {
        transition: visibility 0s linear var(--p-sh-delay), width 0s linear var(--p-sh-delay), height 0s linear var(--p-sh-delay), background-color var(--p-sh-ddur) var(--p-sh-ease), -webkit-backdrop-filter var(--p-sh-ddur) var(--p-sh-ease), backdrop-filter var(--p-sh-ddur) var(--p-sh-ease), overlay var(--p-sh-ddur) var(--p-sh-ease) allow-discrete;
      }
    }
    .scroller {
      position: absolute;
      isolation: isolate;
      display: grid;
      inset: 0;
      overflow: hidden auto;
      overscroll-behavior-y: none;
      background: rgba(255, 255, 255, .01);
      transform: translate3d(0, 0, 0);
    }
    .sheet {
      position: relative;
      display: grid;
      grid-template: auto / var(--p-spacing-fluid-sm) minmax(0, 1fr) var(--p-spacing-fluid-sm);
      gap: var(--p-spacing-fluid-md) calc(var(--p-spacing-fluid-lg) - var(--p-spacing-fluid-sm));
      padding-top: var(--p-spacing-fluid-md);
      padding-bottom: calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md));
      align-content: flex-start;
      opacity: var(--p-sh-op, 0);
      transform: var(--p-sh-tf, translate3d(0, 25vh, 0));
      transition: opacity var(--p-sh-pdur) var(--p-sh-ease), transform var(--p-sh-pdur) var(--p-sh-ease);
      color: var(--p-color-primary);
      background: var(--_p-dialog-a);
      width: 100%;
      align-self: flex-end;
      margin-block-start: var(--p-spacing-fluid-lg);
      border-top-left-radius: var(--p-radius-3xl);
      border-top-right-radius: var(--p-radius-3xl);
      clip-path: inset(0 round var(--p-radius-3xl) var(--p-radius-3xl) 0 0);
    }
    .sheet:dir(rtl) {
      transform: var(--p-sh-tf, translate3d(0, 25vh, 0));
    }
    @media (forced-colors: active) {
      .sheet {
        border-top: 2px solid CanvasText;
      }
    }
    .dismiss {
      all: unset;
      box-sizing: border-box;
      display: grid;
      place-items: center;
      padding: 6px;
      border-radius: var(--p-radius-full);
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      background-color: var(--p-sh-dismiss-bg);
      color: var(--p-color-primary);
      cursor: pointer;
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      grid-area: 1/3;
      z-index: 5;
      position: sticky;
      top: var(--p-spacing-fluid-sm);
      margin-top: calc(-1 * var(--p-spacing-fluid-md) + var(--p-spacing-fluid-sm));
      margin-inline-end: var(--p-spacing-fluid-sm);
      place-self: flex-start flex-end;
    }
    .dismiss:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    .dismiss::before {
      content: "";
      width: var(--p-leading-normal);
      height: var(--p-leading-normal);
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>') center/contain no-repeat;
      background: currentColor;
    }
    .dismiss span {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
    @media (forced-colors: active) {
      .dismiss {
        forced-color-adjust: none;
        background: Canvas;
        box-shadow: inset 0 0 0 2px ButtonBorder;
        color: ButtonText;
      }
      .dismiss:focus-visible {
        outline-color: Highlight;
      }
    }
    @media (hover: hover) {
      .dismiss:hover {
        background-color: var(--p-sh-dismiss-hover);
      }
      @media (forced-colors: active) {
        .dismiss:hover {
          background: Canvas;
        }
      }
    }
  `);

  return (
    <dialog inert tabIndex={-1} aria-modal="true">
      <div class="scroller">
        <div class="sheet">
          <button class="dismiss" type="button">
            <span>Dismiss sheet</span>
          </button>
          <slot name="header" />
          <slot />
        </div>
      </div>
    </dialog>
  );
}
