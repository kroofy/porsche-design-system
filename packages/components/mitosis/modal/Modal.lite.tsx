import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-modal' });

const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

const parse = (raw: any, fallback: any) => {
  if (raw === undefined || raw === null || raw === '') return fallback;
  if (typeof raw === 'string' && raw.charAt(0) === '{') {
    try {
      return JSON.parse(raw.replace(/'/g, '"'));
    } catch {
      return fallback;
    }
  }
  return raw;
};

const pick = (obj: any, key: any, fallback: any) => {
  if (obj && typeof obj === 'object') {
    if (obj[key] === undefined) return fallback;
    return obj[key];
  }
  return obj;
};

const boxFor = (stretched: any) => {
  if (stretched === true || stretched === 'true') {
    return {
      w: 'auto',
      minW: 'auto',
      maxW: 'none',
      place: 'stretch',
      margin: '0',
      radius: '0',
      clip: 'none',
    };
  }
  return {
    w: 'var(--p-modal-width, auto)',
    minW: '276px',
    maxW: '1535.5px',
    place: 'center',
    margin:
      'var(--p-modal-spacing-top, clamp(16px, 10vh, 192px)) max(22px, 10.625vw - 12px) var(--p-modal-spacing-bottom, clamp(16px, 10vh, 192px))',
    radius: 'var(--p-radius-3xl)',
    clip: 'inset(0 round var(--p-radius-3xl))',
  };
};

export default function LitModal(props: {
  open?: any;
  dismissButton?: any;
  disableBackdropClick?: any;
  background?: string;
  backdrop?: string;
  fullscreen?: any;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const isOpen = isTrue(props.open);
      const background = props.background === 'surface' ? 'surface' : 'canvas';
      const backdrop = props.backdrop === 'shading' ? 'shading' : 'blur';
      const fullscreen = parse(props.fullscreen, false);
      const dialogBg = background === 'surface' ? 'var(--p-color-surface)' : 'var(--p-color-canvas)';
      const dismissHover = background === 'surface' ? 'var(--p-color-canvas)' : 'var(--p-color-surface)';
      const durMd = 'var(--p-transition-duration, var(--p-duration-md))';
      const durSm = 'var(--p-transition-duration, var(--p-duration-sm))';
      const durLg = 'var(--p-transition-duration, var(--p-duration-lg))';
      const blurOn = isOpen && backdrop === 'blur';
      const vars: Record<string, string> = {
        '--p-mo-w-dialog': isOpen ? '100dvw' : '0px',
        '--p-mo-h-dialog': isOpen ? '100dvh' : '0px',
        '--p-mo-vis': isOpen ? 'inherit' : 'hidden',
        '--p-mo-pe': isOpen ? 'auto' : 'none',
        '--p-mo-db': isOpen ? 'var(--p-color-backdrop)' : 'transparent',
        '--p-mo-bf': blurOn ? 'var(--p-blur-frosted)' : '',
        '--p-mo-delay': isOpen ? 'var(--p-transition-duration, 0s)' : durMd,
        '--p-mo-ease': isOpen ? 'var(--p-ease-in)' : 'var(--p-ease-out)',
        '--p-mo-ddur': isOpen ? durLg : durMd,
        '--p-mo-pdur': isOpen ? durMd : durSm,
        '--p-mo-op': isOpen ? '1' : '0',
        '--p-mo-tf': isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 25vh, 0)',
        '--p-mo-hcm': isTrue(fullscreen) ? '' : '2px solid CanvasText',
        '--p-mo-dialog-bg': dialogBg,
        '--p-mo-dismiss-bg': dialogBg,
        '--p-mo-dismiss-hover': dismissHover,
      };
      const writeBox = (bp: string, stretched: any) => {
        const box = boxFor(stretched);
        const s = bp === 'base' ? '' : `-${bp}`;
        vars[`--p-mo-w${s}`] = box.w;
        vars[`--p-mo-min-w${s}`] = box.minW;
        vars[`--p-mo-max-w${s}`] = box.maxW;
        vars[`--p-mo-place${s}`] = box.place;
        vars[`--p-mo-margin${s}`] = box.margin;
        vars[`--p-mo-radius${s}`] = box.radius;
        vars[`--p-mo-clip${s}`] = box.clip;
      };
      if (typeof fullscreen === 'object' && fullscreen !== null) {
        let last = pick(fullscreen, 'base', false);
        for (const bp of BREAKPOINTS) {
          if (fullscreen[bp] !== undefined) last = pick(fullscreen, bp, last);
          writeBox(bp, last);
        }
      } else {
        for (const bp of BREAKPOINTS) writeBox(bp, isTrue(fullscreen));
      }
      return vars;
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
      --ref-p-modal-pt: var(--p-spacing-fluid-md) !important;
      --ref-p-modal-pb: calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) !important;
      --ref-p-modal-px: var(--p-spacing-fluid-lg) !important;
      --pds-internal-grid-outer-column: calc(var(--p-spacing-fluid-lg) - clamp(16px, 1.25vw + 12px, 36px)) !important;
      --pds-internal-grid-margin: calc(var(--p-spacing-fluid-lg) * -1) !important;
      --pds-internal-grid-width-min: auto !important;
      --pds-internal-grid-width-max: none !important;
      --_p-dialog-a: var(--p-mo-dialog-bg) !important;
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
    slot[name="footer"] {
      grid-column: 1/-1;
      z-index: 2;
      position: sticky;
      bottom: -.1px;
      margin-block: calc(-1 * calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) - var(--p-radius-3xl)));
      padding: calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) - var(--p-radius-3xl)) var(--p-spacing-fluid-lg);
      background: linear-gradient(0deg, var(--_p-dialog-a) 0%, var(--_p-dialog-a) 20%, transparent 80%);
    }
    slot[name="footer"][data-stuck]::after {
      content: "";
      z-index: -1;
      position: absolute;
      inset: calc(calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) - var(--p-radius-3xl)) - 12 * var(--p-spacing-static-2xs)) calc(var(--p-spacing-fluid-lg) - 12 * var(--p-spacing-static-2xs));
      background: var(--p-color-frosted);
      border-radius: var(--p-radius-2xl);
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
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
      width: var(--p-mo-w-dialog, 0px);
      height: var(--p-mo-h-dialog, 0px);
      visibility: var(--p-mo-vis, hidden);
      pointer-events: var(--p-mo-pe, none);
      background: var(--p-mo-db, transparent);
      -webkit-backdrop-filter: var(--p-mo-bf);
      backdrop-filter: var(--p-mo-bf);
      transition: visibility 0s linear var(--p-mo-delay), width 0s linear var(--p-mo-delay), height 0s linear var(--p-mo-delay), background-color var(--p-mo-ddur) var(--p-mo-ease), -webkit-backdrop-filter var(--p-mo-ddur) var(--p-mo-ease), backdrop-filter var(--p-mo-ddur) var(--p-mo-ease);
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
        transition: visibility 0s linear var(--p-mo-delay), width 0s linear var(--p-mo-delay), height 0s linear var(--p-mo-delay), background-color var(--p-mo-ddur) var(--p-mo-ease), -webkit-backdrop-filter var(--p-mo-ddur) var(--p-mo-ease), backdrop-filter var(--p-mo-ddur) var(--p-mo-ease), overlay var(--p-mo-ddur) var(--p-mo-ease) allow-discrete;
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
    .modal {
      position: relative;
      display: grid;
      grid-template: auto / var(--p-spacing-fluid-sm) minmax(0, 1fr) var(--p-spacing-fluid-sm);
      gap: var(--p-spacing-fluid-md) calc(var(--p-spacing-fluid-lg) - var(--p-spacing-fluid-sm));
      padding-top: var(--p-spacing-fluid-md);
      padding-bottom: calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md));
      align-content: flex-start;
      color: var(--p-color-primary);
      background: var(--_p-dialog-a);
      opacity: var(--p-mo-op, 0);
      transform: var(--p-mo-tf, translate3d(0, 25vh, 0));
      transition: opacity var(--p-mo-pdur) var(--p-mo-ease), transform var(--p-mo-pdur) var(--p-mo-ease);
      width: var(--p-mo-w);
      min-width: var(--p-mo-min-w);
      max-width: var(--p-mo-max-w);
      place-self: var(--p-mo-place);
      margin: var(--p-mo-margin);
      border-radius: var(--p-mo-radius);
      clip-path: var(--p-mo-clip);
    }
    .modal:dir(rtl) {
      transform: var(--p-mo-tf, translate3d(0, 25vh, 0));
    }
    @media (forced-colors: active) {
      .modal {
        outline: var(--p-mo-hcm);
        outline-offset: -2px;
      }
    }
    @media (min-width: 480px) {
      .modal {
        width: var(--p-mo-w-xs);
        min-width: var(--p-mo-min-w-xs);
        max-width: var(--p-mo-max-w-xs);
        place-self: var(--p-mo-place-xs);
        margin: var(--p-mo-margin-xs);
        border-radius: var(--p-mo-radius-xs);
        clip-path: var(--p-mo-clip-xs);
      }
    }
    @media (min-width: 760px) {
      .modal {
        width: var(--p-mo-w-s);
        min-width: var(--p-mo-min-w-s);
        max-width: var(--p-mo-max-w-s);
        place-self: var(--p-mo-place-s);
        margin: var(--p-mo-margin-s);
        border-radius: var(--p-mo-radius-s);
        clip-path: var(--p-mo-clip-s);
      }
    }
    @media (min-width: 1000px) {
      .modal {
        width: var(--p-mo-w-m);
        min-width: var(--p-mo-min-w-m);
        max-width: var(--p-mo-max-w-m);
        place-self: var(--p-mo-place-m);
        margin: var(--p-mo-margin-m);
        border-radius: var(--p-mo-radius-m);
        clip-path: var(--p-mo-clip-m);
      }
    }
    @media (min-width: 1300px) {
      .modal {
        width: var(--p-mo-w-l);
        min-width: var(--p-mo-min-w-l);
        max-width: var(--p-mo-max-w-l);
        place-self: var(--p-mo-place-l);
        margin: var(--p-mo-margin-l);
        border-radius: var(--p-mo-radius-l);
        clip-path: var(--p-mo-clip-l);
      }
    }
    @media (min-width: 1760px) {
      .modal {
        width: var(--p-mo-w-xl);
        min-width: var(--p-mo-min-w-xl);
        max-width: var(--p-mo-max-w-xl);
        place-self: var(--p-mo-place-xl);
        margin: var(--p-mo-margin-xl);
        border-radius: var(--p-mo-radius-xl);
        clip-path: var(--p-mo-clip-xl);
      }
    }
    @media (min-width: 1920px) {
      .modal {
        width: var(--p-mo-w-xxl);
        min-width: var(--p-mo-min-w-xxl);
        max-width: var(--p-mo-max-w-xxl);
        place-self: var(--p-mo-place-xxl);
        margin: var(--p-mo-margin-xxl);
        border-radius: var(--p-mo-radius-xxl);
        clip-path: var(--p-mo-clip-xxl);
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
      background-color: var(--p-mo-dismiss-bg);
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
        background-color: var(--p-mo-dismiss-hover);
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
        <div class="modal">
          <button class="dismiss" type="button">
            <span>Dismiss modal</span>
          </button>
          <slot name="header" />
          <slot />
          <slot name="footer" />
        </div>
      </div>
    </dialog>
  );
}
