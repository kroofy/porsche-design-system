import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({
  tagName: 'p-inline-notification',
});

const MASKS: Record<string, string> = {
  info: 'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/></svg>\') center/contain no-repeat',
  success:
    'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/></svg>\') center/contain no-repeat',
  warning:
    'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/></svg>\') center/contain no-repeat',
  error:
    'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/></svg>\') center/contain no-repeat',
};

const BGS: Record<string, string> = {
  info: 'var(--p-color-info-frosted)',
  success: 'var(--p-color-success-frosted)',
  warning: 'var(--p-color-warning-frosted)',
  error: 'var(--p-color-error-frosted)',
};

const COLORS: Record<string, string> = {
  info: 'var(--p-color-info)',
  success: 'var(--p-color-success)',
  warning: 'var(--p-color-warning)',
  error: 'var(--p-color-error)',
};

export default function LitInlineNotification(props: {
  heading?: string;
  headingTag?: string;
  description?: string;
  state?: string;
  dismissButton?: any;
  actionLabel?: string;
  actionLoading?: any;
  actionIcon?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const visual = props.state || 'info';
      const heading = props.heading || '';
      const hasHeadingSlot = state.hasHeadingSlot;
      const hasHeading = !!(heading || hasHeadingSlot);
      return {
        '--p-in-bg': BGS[visual] || BGS.info,
        '--p-in-icon': COLORS[visual] || COLORS.info,
        '--p-in-mask': MASKS[visual] || MASKS.info,
        '--p-in-place': hasHeading ? 'center' : 'flex-start',
        '--p-in-desc-grid': hasHeading ? '2/2' : '1/2',
        '--p-in-desc-mt': hasHeading ? 'var(--p-spacing-static-xs)' : '0px',
      };
    },
    get hasHeadingSlot(): any {
      return false;
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
    get actionLabelText(): string {
      return props.actionLabel || '';
    },
    get actionIconName(): string {
      return props.actionIcon || 'arrow-right';
    },
    get actionLoadingFlag(): any {
      const loading = props.actionLoading;
      return loading === true || loading === 'true' || loading === '';
    },
    get showDismiss(): any {
      const dismiss = props.dismissButton;
      if (dismiss === false || dismiss === 'false') return false;
      return true;
    },
    get hasAction(): any {
      return !!(props.actionLabel || '');
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
  });

  useStyle(`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    slot[name="heading"],
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      all: unset;
      grid-area: 1 / 2;
      font: var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-primary);
    }
    slot:not([name]),
    slot[name="description"],
    p {
      all: unset;
      grid-area: var(--p-in-desc-grid, 1 / 2);
      margin-top: var(--p-in-desc-mt, 0px);
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-primary);
    }
    .notification {
      display: grid;
      grid-template: repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto);
      padding: calc(var(--p-spacing-static-sm) + var(--p-spacing-fluid-sm));
      border-radius: var(--p-radius-2xl);
      background: var(--p-in-bg);
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
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
      grid-area: 1 / 4 / -1;
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
    .action {
      grid-area: 3 / 1 / auto / -1;
      margin-top: var(--p-spacing-static-md);
      align-self: flex-start;
    }
    @media (min-width: 760px) {
      .notification::before {
        grid-area: 1 / 1;
        place-self: var(--p-in-place, flex-start);
        content: "";
        width: 1.5rem;
        height: 1.5rem;
        margin-inline-end: var(--p-spacing-static-sm);
        background: var(--p-in-icon);
        -webkit-mask: var(--p-in-mask);
        mask: var(--p-in-mask);
      }
      .action {
        grid-area: 1 / 3;
        margin-top: 0px;
        margin-inline-start: var(--p-spacing-static-md);
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
    @media (min-width: 760px) and (forced-colors: active) {
      .notification::before {
        background: CanvasText;
      }
    }
    @media (hover: hover) {
      .dismiss:hover {
        background-color: var(--p-color-frosted);
      }
    }
    @media (hover: hover) and (forced-colors: active) {
      .dismiss:hover {
        background: Canvas;
      }
    }
  `);

  return (
    <div class="notification">
      <h5>{state.headingText}</h5>
      <p>{state.descriptionText}</p>
      <slot name="heading" />
      <slot />
      <p-button-pure class="action" icon={state.actionIconName}>
        {state.actionLabelText}
      </p-button-pure>
      <button class="dismiss" type="button">
        <span>Close notification</span>
      </button>
    </div>
  );
}
