import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-banner' });

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

const TOP_A =
  'translate3d(-50%, calc(-100% - var(--p-banner-top, var(--p-banner-position-top, 56px))), 0)';
const TOP_INSET = 'var(--p-banner-top, var(--p-banner-position-top, 56px)) auto';
const BOT_A =
  'translate3d(-50%, calc(var(--p-banner-bottom, var(--p-banner-position-bottom, 56px)) + 100%), 0)';
const BOT_INSET = 'auto var(--p-banner-bottom, var(--p-banner-position-bottom, 56px))';

export default function LitBanner(props: {
  open?: any;
  heading?: string;
  headingTag?: string;
  description?: string;
  position?: any;
  state?: string;
  dismissButton?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      let position: any = parse(props.position, { base: 'bottom', s: 'top' });
      if (position == null || position === '') position = { base: 'bottom', s: 'top' };
      const posPair = (v: any) =>
        v === 'top' ? { a: TOP_A, inset: TOP_INSET } : { a: BOT_A, inset: BOT_INSET };
      const vars: Record<string, string> = {};
      if (typeof position === 'object' && position !== null) {
        let last = String(pick(position, 'base', 'bottom') || 'bottom');
        for (const bp of BREAKPOINTS) {
          if (position[bp] !== undefined) last = String(pick(position, bp, last));
          const pair = posPair(last);
          if (bp === 'base') {
            vars['--p-ban-a'] = pair.a;
            vars['--p-ban-inset'] = pair.inset;
          } else {
            vars[`--p-ban-a-${bp}`] = pair.a;
            vars[`--p-ban-inset-${bp}`] = pair.inset;
          }
        }
      } else {
        const pair = posPair(position);
        vars['--p-ban-a'] = pair.a;
        vars['--p-ban-inset'] = pair.inset;
        for (const bp of BREAKPOINTS) {
          if (bp === 'base') continue;
          vars[`--p-ban-a-${bp}`] = pair.a;
          vars[`--p-ban-inset-${bp}`] = pair.inset;
        }
      }
      return vars;
    },
    get headingText(): string {
      return props.heading || '';
    },
    get headingTagValue(): string {
      return props.headingTag || 'h5';
    },
    get descriptionText(): string {
      return props.description || '';
    },
    get showDismiss(): any {
      const dismiss = props.dismissButton;
      if (dismiss === false || dismiss === 'false') return false;
      return true;
    },
    get hasHeadingSlot(): any {
      return false;
    },
    get hasDescriptionSlot(): any {
      return false;
    },
    get headingAria(): string {
      return props.heading || '';
    },
    get roleName(): string {
      const visual = props.state || 'info';
      return visual === 'warning' || visual === 'error' ? 'alert' : 'status';
    },
    get ariaLive(): string {
      const visual = props.state || 'info';
      return visual === 'warning' || visual === 'error' ? 'assertive' : 'polite';
    },
    get isOpenFlag(): any {
      const open = props.open;
      return open === true || open === 'true' || open === '';
    },
  });

  useStyle(`
    :host {
      display: contents;
    }
    :host([hidden]) {
      display: none !important;
    }
    [popover] {
      all: unset;
      position: fixed;
      --_p-banner-a: var(--p-ban-a);
      inset-block: var(--p-ban-inset);
      left: 50vw;
      width: min(calc(100vw - 2 * var(--p-banner-inset-x, max(22px, 10.625vw - 12px))), var(--p-banner-max-w, 100ch));
      transform: var(--_p-banner-a);
      transition: transform var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-out);
      overlay: none;
      display: none;
    }
    :host([open]) [popover] {
      transform: translate3d(-50%, 0, 0);
      transition: transform var(--p-transition-duration, var(--p-duration-md)) var(--p-ease-in);
    }
    [popover]:popover-open {
      overlay: auto;
      display: grid;
    }
    [popover]::backdrop {
      display: none;
    }
    @media (min-width: 480px) {
      [popover] {
        --_p-banner-a: var(--p-ban-a-xs, var(--p-ban-a));
        inset-block: var(--p-ban-inset-xs, var(--p-ban-inset));
      }
    }
    @media (min-width: 760px) {
      [popover] {
        --_p-banner-a: var(--p-ban-a-s, var(--p-ban-a-xs, var(--p-ban-a)));
        inset-block: var(--p-ban-inset-s, var(--p-ban-inset-xs, var(--p-ban-inset)));
      }
    }
    @media (min-width: 1000px) {
      [popover] {
        --_p-banner-a: var(--p-ban-a-m, var(--p-ban-a-s, var(--p-ban-a)));
        inset-block: var(--p-ban-inset-m, var(--p-ban-inset-s, var(--p-ban-inset)));
      }
    }
    @media (min-width: 1300px) {
      [popover] {
        --_p-banner-a: var(--p-ban-a-l, var(--p-ban-a-m, var(--p-ban-a)));
        inset-block: var(--p-ban-inset-l, var(--p-ban-inset-m, var(--p-ban-inset)));
      }
    }
    @media (min-width: 1760px) {
      [popover] {
        --_p-banner-a: var(--p-ban-a-xl, var(--p-ban-a-l, var(--p-ban-a)));
        inset-block: var(--p-ban-inset-xl, var(--p-ban-inset-l, var(--p-ban-inset)));
      }
    }
    @media (min-width: 1920px) {
      [popover] {
        --_p-banner-a: var(--p-ban-a-xxl, var(--p-ban-a-xl, var(--p-ban-a)));
        inset-block: var(--p-ban-inset-xxl, var(--p-ban-inset-xl, var(--p-ban-inset)));
      }
    }
    @supports (overlay: auto) and (transition-behavior: allow-discrete) {
      [popover] {
        transition: transform var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-out), overlay var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-out) allow-discrete, display var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-out) allow-discrete;
      }
      :host([open]) [popover] {
        transition: transform var(--p-transition-duration, var(--p-duration-md)) var(--p-ease-in), overlay var(--p-transition-duration, var(--p-duration-md)) var(--p-ease-in) allow-discrete, display var(--p-transition-duration, var(--p-duration-md)) var(--p-ease-in) allow-discrete;
      }
    }
    @starting-style {
      [popover] {
        transform: var(--_p-banner-a);
      }
      .notification {
        opacity: 0;
      }
    }
    slot[name="heading"],
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      all: unset;
      grid-area: 1/2;
      font: var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-primary);
    }
    slot:not([name]),
    slot[name="description"],
    p {
      all: unset;
      grid-area: 1/2;
      margin-top: 0px;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-primary);
    }
    :host([data-heading]) slot:not([name]),
    :host([data-heading]) slot[name="description"],
    :host([data-heading]) p {
      grid-area: 2/2;
      margin-top: var(--p-spacing-static-xs);
    }
    .notification {
      box-shadow: var(--p-shadow-lg);
      opacity: 0;
      transition: opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-out);
      display: grid;
      grid-template: repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto);
      padding: calc(var(--p-spacing-static-sm) + var(--p-spacing-fluid-sm));
      border-radius: var(--p-radius-2xl);
      background: var(--p-color-info-frosted);
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
    }
    :host([open]) .notification {
      opacity: 1;
      transition: opacity var(--p-transition-duration, var(--p-duration-md)) var(--p-ease-in);
    }
    :host([state="success"]) .notification {
      background: var(--p-color-success-frosted);
    }
    :host([state="warning"]) .notification {
      background: var(--p-color-warning-frosted);
    }
    :host([state="error"]) .notification {
      background: var(--p-color-error-frosted);
    }
    .dismiss {
      all: unset;
      box-sizing: border-box;
      display: grid;
      place-items: center;
      padding: 6px;
      border-radius: var(--p-radius-full);
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      background-color: var(--p-color-frosted-strong);
      color: var(--p-color-primary);
      cursor: pointer;
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      grid-area: 1/4/-1;
      align-self: flex-start;
      margin-block: calc(-6 * var(--p-spacing-static-2xs));
      margin-inline: var(--p-spacing-static-md) calc(-6 * var(--p-spacing-static-2xs));
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
    @media (min-width: 760px) {
      .notification::before {
        grid-area: 1/1;
        place-self: flex-start;
        content: "";
        width: 1.5rem;
        height: 1.5rem;
        margin-inline-end: var(--p-spacing-static-sm);
        background: var(--p-color-info);
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/></svg>') center/contain no-repeat;
        mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/></svg>') center/contain no-repeat;
      }
      :host([data-heading]) .notification::before {
        place-self: center;
      }
      :host([state="success"]) .notification::before {
        background: var(--p-color-success);
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/></svg>') center/contain no-repeat;
        mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/></svg>') center/contain no-repeat;
      }
      :host([state="warning"]) .notification::before {
        background: var(--p-color-warning);
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/></svg>') center/contain no-repeat;
        mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/></svg>') center/contain no-repeat;
      }
      :host([state="error"]) .notification::before {
        background: var(--p-color-error);
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/></svg>') center/contain no-repeat;
        mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/></svg>') center/contain no-repeat;
      }
      @media (forced-colors: active) {
        .notification::before {
          background: CanvasText;
        }
      }
    }
    @media (forced-colors: active) {
      .notification {
        outline: 2px solid CanvasText;
        outline-offset: -2px;
      }
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
        background-color: var(--p-color-frosted);
      }
      @media (forced-colors: active) {
        .dismiss:hover {
          background: Canvas;
        }
      }
    }
  `);

  return (
    <div popover="manual">
      <div class="notification">
        <h5>{state.headingText}</h5>
        <p>{state.descriptionText}</p>
        <slot name="heading" />
        <slot name="description" />
        <button class="dismiss" type="button">
          <span>Close banner</span>
        </button>
      </div>
    </div>
  );
}
