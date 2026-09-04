import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-button' });

const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

const parse = (raw: any, fallback: any) => {
  if (raw === undefined || raw === null || raw === '') return fallback;
  if (typeof raw === 'string' && raw.charAt(0) === '{') {
    try {
      return JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));
    } catch {
      return fallback;
    }
  }
  return raw;
};

const isTrue = (v: any) => v === true || v === 'true' || v === '';

const pick = (obj: any, key: any, fallback: any) => {
  if (obj && typeof obj === 'object') {
    if (obj[key] === undefined) return fallback;
    return obj[key];
  }
  return obj;
};

const assignBp = (vars: Record<string, string>, bp: string, hide: any, compact: any) => {
  const s = bp === 'base' ? '' : `-${bp}`;
  const hidden = isTrue(hide);
  vars[`--p-btn-scale${s}`] = isTrue(compact) ? '0.64285714' : '1';
  vars[`--p-btn-br${s}`] = isTrue(compact) ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)';
  vars[`--p-btn-host-r${s}`] = hidden
    ? 'var(--p-button-radius, var(--p-radius-full))'
    : 'var(--p-button-radius, var(--_p-link-button-a))';
  vars[`--p-btn-pad${s}`] = hidden
    ? 'var(--p-button-py, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px)) var(--p-button-px, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px))'
    : 'var(--p-button-py, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px)) var(--p-button-px, calc(33.6px * (var(--_p-button-a) - 0.64285714) + 16px))';
  vars[`--p-btn-gap${s}`] = hidden
    ? 'var(--p-button-gap, 0)'
    : 'var(--p-button-gap, calc(11.2px * (var(--_p-button-a) - 0.64285714) + 4px))';
  vars[`--p-btn-icon-m${s}`] = hidden ? '0' : 'calc(-1 * (11.2px * (var(--_p-button-a) - 0.64285714) + 4px))';
  if (hidden) {
    vars[`--p-btn-l-pos${s}`] = 'absolute';
    vars[`--p-btn-l-w${s}`] = '1px';
    vars[`--p-btn-l-h${s}`] = '1px';
    vars[`--p-btn-l-pad${s}`] = '0';
    vars[`--p-btn-l-m${s}`] = '-1px';
    vars[`--p-btn-l-ov${s}`] = 'hidden';
    vars[`--p-btn-l-clip${s}`] = 'rect(0, 0, 0, 0)';
    vars[`--p-btn-l-ws${s}`] = 'nowrap';
    return;
  }
  vars[`--p-btn-l-pos${s}`] = 'static';
  vars[`--p-btn-l-w${s}`] = 'auto';
  vars[`--p-btn-l-h${s}`] = 'auto';
  vars[`--p-btn-l-pad${s}`] = '0';
  vars[`--p-btn-l-m${s}`] = '0';
  vars[`--p-btn-l-ov${s}`] = 'visible';
  vars[`--p-btn-l-clip${s}`] = 'auto';
  vars[`--p-btn-l-ws${s}`] = 'normal';
};

export default function LitButton(props: {
  type?: string;
  variant?: string;
  icon?: string;
  iconSource?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  loading?: any;
  name?: string;
  value?: string;
  form?: string;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const variant = props.variant || 'primary';
      const hideLabel = parse(props.hideLabel, false);
      const compact = parse(props.compact, false);
      const colors: any = {
        primary: {
          bg: 'var(--p-button-bg, var(--p-color-primary))',
          fg: 'var(--p-button-fg, var(--p-color-canvas))',
          hoverBg: 'var(--p-button-bg, var(--p-color-contrast-high))',
          hoverFg: 'var(--p-button-fg, var(--p-color-canvas))',
        },
        secondary: {
          bg: 'var(--p-button-bg, var(--p-color-frosted-strong))',
          fg: 'var(--p-button-fg, var(--p-color-primary))',
          hoverBg: 'var(--p-button-bg, var(--p-color-frosted))',
          hoverFg: 'var(--p-button-fg, var(--p-color-primary))',
        },
        destructive: {
          bg: 'var(--p-button-bg, var(--p-color-error))',
          fg: 'var(--p-button-fg, var(--p-color-canvas))',
          hoverBg: 'var(--p-button-bg, var(--p-color-error-medium))',
          hoverFg: 'var(--p-button-fg, var(--p-color-primary))',
        },
      };
      const palette = colors[variant] || colors.primary;
      const vars: Record<string, string> = {
        '--p-btn-bg': palette.bg,
        '--p-btn-fg': palette.fg,
        '--p-btn-hbg': palette.hoverBg,
        '--p-btn-hfg': palette.hoverFg,
      };
      if (typeof hideLabel === 'object' || typeof compact === 'object') {
        const hideObj = typeof hideLabel === 'object' && hideLabel !== null ? hideLabel : null;
        const compactObj = typeof compact === 'object' && compact !== null ? compact : null;
        let lastH = hideObj ? pick(hideObj, 'base', false) : hideLabel;
        let lastC = compactObj ? pick(compactObj, 'base', false) : compact;
        for (const bp of BREAKPOINTS) {
          if (hideObj && hideObj[bp] !== undefined) lastH = pick(hideObj, bp, lastH);
          if (compactObj && compactObj[bp] !== undefined) lastC = pick(compactObj, bp, lastC);
          assignBp(vars, bp, lastH, lastC);
        }
      } else {
        for (const bp of BREAKPOINTS) assignBp(vars, bp, hideLabel, compact);
      }
      return vars;
    },
    get iconName(): string {
      if (props.iconSource) return '';
      const icon = props.icon || 'none';
      if (icon === 'none' || icon === '') return '';
      return icon;
    },
    get iconSrc(): string {
      return props.iconSource || '';
    },
    get buttonType(): string {
      return props.type || 'submit';
    },
    get ariaDisabled(): string {
      const disabled = props.disabled === true || props.disabled === 'true' || props.disabled === '';
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return disabled || loading ? 'true' : '';
    },
    get loadingText(): string {
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return loading ? 'Loading' : '';
    },
  });

  useStyle(`
    :host {
      display: inline-block;
      vertical-align: top;
      --_p-button-a: var(--p-btn-scale);
      --_p-link-button-a: var(--p-btn-br);
      border-radius: var(--p-btn-host-r) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    .root {
      all: unset;
      display: flex;
      justify-content: center;
      width: 100%;
      min-width: min-content;
      box-sizing: border-box;
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      border-radius: inherit;
      transform: translate3d(0, 0, 0);
      background-color: var(--p-btn-bg);
      color: var(--p-btn-fg);
      cursor: pointer;
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      padding: var(--p-btn-pad);
      gap: var(--p-btn-gap);
    }
    :host([disabled]) .root,
    :host([loading]) .root {
      cursor: not-allowed;
    }
    :host([disabled]) .root {
      opacity: 0.4;
    }
    .root:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    .label {
      position: var(--p-btn-l-pos);
      width: var(--p-btn-l-w);
      height: var(--p-btn-l-h);
      padding: var(--p-btn-l-pad);
      margin: var(--p-btn-l-m);
      overflow: var(--p-btn-l-ov);
      clip: var(--p-btn-l-clip);
      white-space: var(--p-btn-l-ws);
      transition: opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    :host([loading]:not([disabled])) .label,
    :host([loading]:not([disabled])) .icon {
      opacity: 0;
    }
    :host([disabled]) .label,
    :host([disabled]) .icon {
      opacity: 0.4;
    }
    .icon {
      font: var(--p-typescale-sm) var(--p-font-porsche-next);
      width: var(--p-leading-normal);
      height: var(--p-leading-normal);
      margin-inline-start: var(--p-btn-icon-m);
      transition: opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    :host(:not([icon-source]):not([icon])) p-icon,
    :host([icon="none"]:not([icon-source])) p-icon,
    :host([icon=""]:not([icon-source])) p-icon {
      display: none;
    }
    .spinner {
      --p-spinner-color: currentcolor;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    :host(:not([loading])) p-spinner {
      display: none;
    }
    .loading {
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
      .root {
        forced-color-adjust: none;
        background: Canvas;
        color: LinkText;
        box-shadow: inset 0 0 0 2px LinkText;
      }
      .root:is(button) {
        box-shadow: inset 0 0 0 2px ButtonBorder;
        color: ButtonText;
      }
      .root:focus-visible {
        outline-color: Highlight;
      }
      :host([disabled]) .root {
        color: GrayText;
        box-shadow: inset 0 0 0 2px GrayText !important;
        opacity: 1;
      }
      :host([disabled]) .root:is(button) {
        box-shadow: inset 0 0 0 2px ButtonBorder;
        color: ButtonText;
      }
      :host([disabled]) .label,
      :host([disabled]) .icon {
        opacity: 1;
        color: GrayText;
      }
    }
    @media (hover: hover) {
      :host(:not([disabled]):not([loading])) .root:hover {
        color: var(--p-btn-hfg);
        background-color: var(--p-btn-hbg);
      }
      @media (forced-colors: active) {
        :host(:not([disabled]):not([loading])) .root:hover {
          background: Canvas;
        }
      }
    }
    @media (min-width: 480px) {
      :host {
        --_p-button-a: var(--p-btn-scale-xs);
        --_p-link-button-a: var(--p-btn-br-xs);
        border-radius: var(--p-btn-host-r-xs) !important;
      }
      .root {
        padding: var(--p-btn-pad-xs);
        gap: var(--p-btn-gap-xs);
      }
      .label {
        position: var(--p-btn-l-pos-xs);
        width: var(--p-btn-l-w-xs);
        height: var(--p-btn-l-h-xs);
        padding: var(--p-btn-l-pad-xs);
        margin: var(--p-btn-l-m-xs);
        overflow: var(--p-btn-l-ov-xs);
        clip: var(--p-btn-l-clip-xs);
        white-space: var(--p-btn-l-ws-xs);
      }
      .icon {
        margin-inline-start: var(--p-btn-icon-m-xs);
      }
    }
    @media (min-width: 760px) {
      :host {
        --_p-button-a: var(--p-btn-scale-s);
        --_p-link-button-a: var(--p-btn-br-s);
        border-radius: var(--p-btn-host-r-s) !important;
      }
      .root {
        padding: var(--p-btn-pad-s);
        gap: var(--p-btn-gap-s);
      }
      .label {
        position: var(--p-btn-l-pos-s);
        width: var(--p-btn-l-w-s);
        height: var(--p-btn-l-h-s);
        padding: var(--p-btn-l-pad-s);
        margin: var(--p-btn-l-m-s);
        overflow: var(--p-btn-l-ov-s);
        clip: var(--p-btn-l-clip-s);
        white-space: var(--p-btn-l-ws-s);
      }
      .icon {
        margin-inline-start: var(--p-btn-icon-m-s);
      }
    }
    @media (min-width: 1000px) {
      :host {
        --_p-button-a: var(--p-btn-scale-m);
        --_p-link-button-a: var(--p-btn-br-m);
        border-radius: var(--p-btn-host-r-m) !important;
      }
      .root {
        padding: var(--p-btn-pad-m);
        gap: var(--p-btn-gap-m);
      }
      .label {
        position: var(--p-btn-l-pos-m);
        width: var(--p-btn-l-w-m);
        height: var(--p-btn-l-h-m);
        padding: var(--p-btn-l-pad-m);
        margin: var(--p-btn-l-m-m);
        overflow: var(--p-btn-l-ov-m);
        clip: var(--p-btn-l-clip-m);
        white-space: var(--p-btn-l-ws-m);
      }
      .icon {
        margin-inline-start: var(--p-btn-icon-m-m);
      }
    }
    @media (min-width: 1300px) {
      :host {
        --_p-button-a: var(--p-btn-scale-l);
        --_p-link-button-a: var(--p-btn-br-l);
        border-radius: var(--p-btn-host-r-l) !important;
      }
      .root {
        padding: var(--p-btn-pad-l);
        gap: var(--p-btn-gap-l);
      }
      .label {
        position: var(--p-btn-l-pos-l);
        width: var(--p-btn-l-w-l);
        height: var(--p-btn-l-h-l);
        padding: var(--p-btn-l-pad-l);
        margin: var(--p-btn-l-m-l);
        overflow: var(--p-btn-l-ov-l);
        clip: var(--p-btn-l-clip-l);
        white-space: var(--p-btn-l-ws-l);
      }
      .icon {
        margin-inline-start: var(--p-btn-icon-m-l);
      }
    }
    @media (min-width: 1760px) {
      :host {
        --_p-button-a: var(--p-btn-scale-xl);
        --_p-link-button-a: var(--p-btn-br-xl);
        border-radius: var(--p-btn-host-r-xl) !important;
      }
      .root {
        padding: var(--p-btn-pad-xl);
        gap: var(--p-btn-gap-xl);
      }
      .label {
        position: var(--p-btn-l-pos-xl);
        width: var(--p-btn-l-w-xl);
        height: var(--p-btn-l-h-xl);
        padding: var(--p-btn-l-pad-xl);
        margin: var(--p-btn-l-m-xl);
        overflow: var(--p-btn-l-ov-xl);
        clip: var(--p-btn-l-clip-xl);
        white-space: var(--p-btn-l-ws-xl);
      }
      .icon {
        margin-inline-start: var(--p-btn-icon-m-xl);
      }
    }
    @media (min-width: 1920px) {
      :host {
        --_p-button-a: var(--p-btn-scale-xxl);
        --_p-link-button-a: var(--p-btn-br-xxl);
        border-radius: var(--p-btn-host-r-xxl) !important;
      }
      .root {
        padding: var(--p-btn-pad-xxl);
        gap: var(--p-btn-gap-xxl);
      }
      .label {
        position: var(--p-btn-l-pos-xxl);
        width: var(--p-btn-l-w-xxl);
        height: var(--p-btn-l-h-xxl);
        padding: var(--p-btn-l-pad-xxl);
        margin: var(--p-btn-l-m-xxl);
        overflow: var(--p-btn-l-ov-xxl);
        clip: var(--p-btn-l-clip-xxl);
        white-space: var(--p-btn-l-ws-xxl);
      }
      .icon {
        margin-inline-start: var(--p-btn-icon-m-xxl);
      }
    }
  `);

  return (
    <button class="root" type={state.buttonType}>
      <p-icon
        class="icon"
        name={state.iconName}
        source={state.iconSrc}
        size="inherit"
        color="inherit"
        aria-hidden="true"
      />
      <p-spinner class="spinner" size="inherit" aria-hidden="true" />
      <span class="label">
        <slot></slot>
      </span>
      <span class="loading" id="loading" role="status">
        {state.loadingText}
      </span>
    </button>
  );
}
