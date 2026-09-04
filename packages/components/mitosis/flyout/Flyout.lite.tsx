import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-flyout' });

const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

const parse = (raw: any, fallback: any) => {
  if (raw === undefined || raw === null || raw === '') return fallback;
  if (typeof raw === 'string' && raw.trim().charAt(0) === '{') {
    try {
      return JSON.parse(raw.replace(/'/g, '"'));
    } catch {
      try {
        return JSON.parse(raw.replace(/'/g, '"').replace(/([{,]\s*)([A-Za-z_]\w*)\s*:/g, '$1"$2":'));
      } catch {
        return fallback;
      }
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

const boxFor = (stretched: any, isStart: any) => {
  if (stretched === true || stretched === 'true') {
    return {
      w: '100dvw',
      minW: 'auto',
      maxW: 'none',
      clip: 'none',
      clipRtl: 'none',
      rss: '0',
      rse: '0',
      res: '0',
      ree: '0',
      hcmIs: '',
      hcmIe: '',
    };
  }
  if (isStart) {
    return {
      w: 'var(--p-flyout-width, auto)',
      minW: '320px',
      maxW: '100vw',
      clip: 'inset(0 round 0 var(--p-radius-3xl) var(--p-radius-3xl) 0)',
      clipRtl: 'inset(0 round var(--p-radius-3xl) 0 0 var(--p-radius-3xl))',
      rss: '0',
      rse: 'var(--p-radius-3xl)',
      res: '0',
      ree: 'var(--p-radius-3xl)',
      hcmIs: '',
      hcmIe: '2px solid CanvasText',
    };
  }
  return {
    w: 'var(--p-flyout-width, auto)',
    minW: '320px',
    maxW: '100vw',
    clip: 'inset(0 round var(--p-radius-3xl) 0 0 var(--p-radius-3xl))',
    clipRtl: 'inset(0 round 0 var(--p-radius-3xl) var(--p-radius-3xl) 0)',
    rss: 'var(--p-radius-3xl)',
    rse: '0',
    res: 'var(--p-radius-3xl)',
    ree: '0',
    hcmIs: '2px solid CanvasText',
    hcmIe: '',
  };
};

export default function LitFlyout(props: {
  open?: any;
  position?: string;
  disableBackdropClick?: any;
  background?: string;
  backdrop?: string;
  footerBehavior?: string;
  fullscreen?: any;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const isOpen = isTrue(props.open);
      const background = props.background === 'surface' ? 'surface' : 'canvas';
      const backdrop = props.backdrop === 'shading' ? 'shading' : 'blur';
      const position = props.position === 'start' ? 'start' : 'end';
      const isStart = position === 'start';
      const isFooterFixed = props.footerBehavior === 'fixed';
      const fullscreen = parse(props.fullscreen, false);
      const dialogBg = background === 'surface' ? 'var(--p-color-surface)' : 'var(--p-color-canvas)';
      const dismissHover = background === 'surface' ? 'var(--p-color-canvas)' : 'var(--p-color-surface)';
      const durMd = 'var(--p-transition-duration, var(--p-duration-md))';
      const durSm = 'var(--p-transition-duration, var(--p-duration-sm))';
      const durLg = 'var(--p-transition-duration, var(--p-duration-lg))';
      const blurOn = isOpen && backdrop === 'blur';
      const vars: Record<string, string> = {
        '--p-fo-w-dialog': isOpen ? '100dvw' : '0px',
        '--p-fo-h-dialog': isOpen ? '100dvh' : '0px',
        '--p-fo-vis': isOpen ? 'inherit' : 'hidden',
        '--p-fo-pe': isOpen ? 'auto' : 'none',
        '--p-fo-db': isOpen ? 'var(--p-color-backdrop)' : 'transparent',
        '--p-fo-bf': blurOn ? 'var(--p-blur-frosted)' : '',
        '--p-fo-delay': isOpen ? 'var(--p-transition-duration, 0s)' : durMd,
        '--p-fo-ease': isOpen ? 'var(--p-ease-in)' : 'var(--p-ease-out)',
        '--p-fo-ddur': isOpen ? durLg : durMd,
        '--p-fo-pdur': isOpen ? durMd : durSm,
        '--p-fo-sc-op': isOpen ? '1' : '0',
        '--p-fo-sc-tf': isOpen ? 'translate3d(0, 0, 0)' : isStart ? 'translate3d(-100%, 0, 0)' : 'translate3d(100%, 0, 0)',
        '--p-fo-sc-tf-rtl': isOpen
          ? 'translate3d(0, 0, 0)'
          : isStart
            ? 'translate3d(100%, 0, 0)'
            : 'translate3d(-100%, 0, 0)',
        '--p-fo-in-s': isStart ? '0' : 'auto',
        '--p-fo-in-e': isStart ? 'auto' : '0',
        '--p-fo-rows': isFooterFixed ? 'auto 1fr auto' : 'auto',
        '--p-fo-hdr-ss': isStart ? '0' : 'var(--p-radius-3xl)',
        '--p-fo-hdr-se': isStart ? 'var(--p-radius-3xl)' : '0',
        '--p-fo-dialog-bg': dialogBg,
        '--p-fo-dismiss-bg': dialogBg,
        '--p-fo-dismiss-hover': dismissHover,
      };
      const writeBox = (bp: string, stretched: any) => {
        const box = boxFor(stretched, isStart);
        const s = bp === 'base' ? '' : `-${bp}`;
        vars[`--p-fo-w${s}`] = box.w;
        vars[`--p-fo-min-w${s}`] = box.minW;
        vars[`--p-fo-max-w${s}`] = box.maxW;
        vars[`--p-fo-clip${s}`] = box.clip;
        vars[`--p-fo-clip-rtl${s}`] = box.clipRtl;
        vars[`--p-fo-r-ss${s}`] = box.rss;
        vars[`--p-fo-r-se${s}`] = box.rse;
        vars[`--p-fo-r-es${s}`] = box.res;
        vars[`--p-fo-r-ee${s}`] = box.ree;
        vars[`--p-fo-hcm-is${s}`] = box.hcmIs;
        vars[`--p-fo-hcm-ie${s}`] = box.hcmIe;
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
      --ref-p-flyout-pt: var(--p-spacing-fluid-md) !important;
      --ref-p-flyout-pb: calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) !important;
      --ref-p-flyout-px: var(--p-spacing-fluid-lg) !important;
      --pds-internal-grid-outer-column: calc(var(--p-spacing-fluid-lg) - clamp(16px, 1.25vw + 12px, 36px)) !important;
      --pds-internal-grid-margin: calc(var(--p-spacing-fluid-lg) * -1) !important;
      --pds-internal-grid-width-min: auto !important;
      --pds-internal-grid-width-max: none !important;
      --_p-dialog-a: var(--p-fo-dialog-bg) !important;
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
      grid-column: 1/-1;
      z-index: 1;
      position: sticky;
      top: 0;
      margin-block: calc(-1 * var(--p-spacing-fluid-md)) calc(-1 * var(--p-spacing-static-md));
      padding: var(--p-spacing-fluid-md) var(--p-spacing-fluid-lg) var(--p-spacing-static-md);
      background: linear-gradient(180deg, var(--_p-dialog-a) 0%, var(--_p-dialog-a) 80%, transparent 100%);
      border-start-start-radius: var(--p-fo-hdr-ss);
      border-start-end-radius: var(--p-fo-hdr-se);
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
    slot[name="sub-footer"] {
      grid-column: 1/-1;
      z-index: 3;
      padding-inline: var(--p-spacing-fluid-lg);
      background-color: var(--_p-dialog-a);
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
      width: var(--p-fo-w-dialog, 0px);
      height: var(--p-fo-h-dialog, 0px);
      visibility: var(--p-fo-vis, hidden);
      pointer-events: var(--p-fo-pe, none);
      background: var(--p-fo-db, transparent);
      -webkit-backdrop-filter: var(--p-fo-bf);
      backdrop-filter: var(--p-fo-bf);
      transition: visibility 0s linear var(--p-fo-delay), width 0s linear var(--p-fo-delay), height 0s linear var(--p-fo-delay), background-color var(--p-fo-ddur) var(--p-fo-ease), -webkit-backdrop-filter var(--p-fo-ddur) var(--p-fo-ease), backdrop-filter var(--p-fo-ddur) var(--p-fo-ease);
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
        transition: visibility 0s linear var(--p-fo-delay), width 0s linear var(--p-fo-delay), height 0s linear var(--p-fo-delay), background-color var(--p-fo-ddur) var(--p-fo-ease), -webkit-backdrop-filter var(--p-fo-ddur) var(--p-fo-ease), backdrop-filter var(--p-fo-ddur) var(--p-fo-ease), overlay var(--p-fo-ddur) var(--p-fo-ease) allow-discrete;
      }
    }
    .scroller {
      position: absolute;
      isolation: isolate;
      display: grid;
      inset-block: 0;
      inset-inline-start: var(--p-fo-in-s);
      inset-inline-end: var(--p-fo-in-e);
      overflow: hidden auto;
      overscroll-behavior-y: none;
      background: rgba(255, 255, 255, .01);
      opacity: var(--p-fo-sc-op, 0);
      transform: var(--p-fo-sc-tf, translate3d(100%, 0, 0));
      transition: opacity var(--p-fo-pdur) var(--p-fo-ease), transform var(--p-fo-pdur) var(--p-fo-ease);
    }
    .scroller:dir(rtl) {
      transform: var(--p-fo-sc-tf-rtl, translate3d(-100%, 0, 0));
    }
    .scroller:focus-visible {
      outline: none;
    }
    .flyout {
      position: relative;
      display: grid;
      grid-template: auto / var(--p-spacing-fluid-sm) minmax(0, 1fr) var(--p-spacing-fluid-sm);
      grid-template-rows: var(--p-fo-rows, auto);
      gap: var(--p-spacing-fluid-md) calc(var(--p-spacing-fluid-lg) - var(--p-spacing-fluid-sm));
      padding-top: var(--p-spacing-fluid-md);
      padding-bottom: calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md));
      align-content: flex-start;
      transform: translate3d(0, 0, 0);
      color: var(--p-color-primary);
      background: var(--_p-dialog-a);
      width: var(--p-fo-w);
      min-width: var(--p-fo-min-w);
      max-width: var(--p-fo-max-w);
      clip-path: var(--p-fo-clip);
      border-start-start-radius: var(--p-fo-r-ss);
      border-start-end-radius: var(--p-fo-r-se);
      border-end-start-radius: var(--p-fo-r-es);
      border-end-end-radius: var(--p-fo-r-ee);
    }
    .flyout:dir(rtl) {
      clip-path: var(--p-fo-clip-rtl);
    }
    :host([footer-behavior="fixed"]) .flyout {
      grid-template-rows: auto 1fr auto;
    }
    @media (forced-colors: active) {
      .flyout {
        border-inline-start: var(--p-fo-hcm-is);
        border-inline-end: var(--p-fo-hcm-ie);
      }
    }
    @media (min-width: 480px) {
      .flyout {
        width: var(--p-fo-w-xs);
        min-width: var(--p-fo-min-w-xs);
        max-width: var(--p-fo-max-w-xs);
        clip-path: var(--p-fo-clip-xs);
        border-start-start-radius: var(--p-fo-r-ss-xs);
        border-start-end-radius: var(--p-fo-r-se-xs);
        border-end-start-radius: var(--p-fo-r-es-xs);
        border-end-end-radius: var(--p-fo-r-ee-xs);
      }
      .flyout:dir(rtl) {
        clip-path: var(--p-fo-clip-rtl-xs);
      }
      @media (forced-colors: active) {
        .flyout {
          border-inline-start: var(--p-fo-hcm-is-xs);
          border-inline-end: var(--p-fo-hcm-ie-xs);
        }
      }
    }
    @media (min-width: 760px) {
      .flyout {
        width: var(--p-fo-w-s);
        min-width: var(--p-fo-min-w-s);
        max-width: var(--p-fo-max-w-s);
        clip-path: var(--p-fo-clip-s);
        border-start-start-radius: var(--p-fo-r-ss-s);
        border-start-end-radius: var(--p-fo-r-se-s);
        border-end-start-radius: var(--p-fo-r-es-s);
        border-end-end-radius: var(--p-fo-r-ee-s);
      }
      .flyout:dir(rtl) {
        clip-path: var(--p-fo-clip-rtl-s);
      }
      @media (forced-colors: active) {
        .flyout {
          border-inline-start: var(--p-fo-hcm-is-s);
          border-inline-end: var(--p-fo-hcm-ie-s);
        }
      }
    }
    @media (min-width: 1000px) {
      .flyout {
        width: var(--p-fo-w-m);
        min-width: var(--p-fo-min-w-m);
        max-width: var(--p-fo-max-w-m);
        clip-path: var(--p-fo-clip-m);
        border-start-start-radius: var(--p-fo-r-ss-m);
        border-start-end-radius: var(--p-fo-r-se-m);
        border-end-start-radius: var(--p-fo-r-es-m);
        border-end-end-radius: var(--p-fo-r-ee-m);
      }
      .flyout:dir(rtl) {
        clip-path: var(--p-fo-clip-rtl-m);
      }
      @media (forced-colors: active) {
        .flyout {
          border-inline-start: var(--p-fo-hcm-is-m);
          border-inline-end: var(--p-fo-hcm-ie-m);
        }
      }
    }
    @media (min-width: 1300px) {
      .flyout {
        width: var(--p-fo-w-l);
        min-width: var(--p-fo-min-w-l);
        max-width: var(--p-fo-max-w-l);
        clip-path: var(--p-fo-clip-l);
        border-start-start-radius: var(--p-fo-r-ss-l);
        border-start-end-radius: var(--p-fo-r-se-l);
        border-end-start-radius: var(--p-fo-r-es-l);
        border-end-end-radius: var(--p-fo-r-ee-l);
      }
      .flyout:dir(rtl) {
        clip-path: var(--p-fo-clip-rtl-l);
      }
      @media (forced-colors: active) {
        .flyout {
          border-inline-start: var(--p-fo-hcm-is-l);
          border-inline-end: var(--p-fo-hcm-ie-l);
        }
      }
    }
    @media (min-width: 1760px) {
      .flyout {
        width: var(--p-fo-w-xl);
        min-width: var(--p-fo-min-w-xl);
        max-width: var(--p-fo-max-w-xl);
        clip-path: var(--p-fo-clip-xl);
        border-start-start-radius: var(--p-fo-r-ss-xl);
        border-start-end-radius: var(--p-fo-r-se-xl);
        border-end-start-radius: var(--p-fo-r-es-xl);
        border-end-end-radius: var(--p-fo-r-ee-xl);
      }
      .flyout:dir(rtl) {
        clip-path: var(--p-fo-clip-rtl-xl);
      }
      @media (forced-colors: active) {
        .flyout {
          border-inline-start: var(--p-fo-hcm-is-xl);
          border-inline-end: var(--p-fo-hcm-ie-xl);
        }
      }
    }
    @media (min-width: 1920px) {
      .flyout {
        width: var(--p-fo-w-xxl);
        min-width: var(--p-fo-min-w-xxl);
        max-width: var(--p-fo-max-w-xxl);
        clip-path: var(--p-fo-clip-xxl);
        border-start-start-radius: var(--p-fo-r-ss-xxl);
        border-start-end-radius: var(--p-fo-r-se-xxl);
        border-end-start-radius: var(--p-fo-r-es-xxl);
        border-end-end-radius: var(--p-fo-r-ee-xxl);
      }
      .flyout:dir(rtl) {
        clip-path: var(--p-fo-clip-rtl-xxl);
      }
      @media (forced-colors: active) {
        .flyout {
          border-inline-start: var(--p-fo-hcm-is-xxl);
          border-inline-end: var(--p-fo-hcm-ie-xxl);
        }
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
      background-color: var(--p-fo-dismiss-bg);
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
        background-color: var(--p-fo-dismiss-hover);
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
        <div class="flyout">
          <button class="dismiss" type="button">
            <span>Dismiss flyout</span>
          </button>
          <slot name="header" />
          <slot />
          <slot name="footer" />
          <slot name="sub-footer" />
        </div>
      </div>
    </dialog>
  );
}
