import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-link' });

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
  const compactOn = isTrue(compact);
  vars[`--p-lnk-scale${s}`] = compactOn ? '0.64285714' : '1';
  vars[`--p-lnk-br${s}`] = compactOn ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)';
  vars[`--p-lnk-host-r${s}`] = hidden
    ? 'var(--p-link-radius, var(--p-radius-full))'
    : 'var(--p-link-radius, var(--_p-link-button-a))';
  vars[`--p-lnk-slot-r${s}`] = hidden
    ? 'var(--p-link-radius, var(--p-radius-full))'
    : compactOn
      ? 'var(--p-link-radius, var(--p-radius-lg))'
      : 'var(--p-link-radius, var(--p-radius-xl))';
  vars[`--p-lnk-pad${s}`] = hidden
    ? 'var(--p-link-py, calc(28px * (var(--_p-link-a) - 0.64285714) + 6px)) var(--p-link-px, calc(28px * (var(--_p-link-a) - 0.64285714) + 6px))'
    : 'var(--p-link-py, calc(28px * (var(--_p-link-a) - 0.64285714) + 6px)) var(--p-link-px, calc(33.6px * (var(--_p-link-a) - 0.64285714) + 16px))';
  vars[`--p-lnk-gap${s}`] = hidden
    ? 'var(--p-link-gap, 0)'
    : 'var(--p-link-gap, calc(11.2px * (var(--_p-link-a) - 0.64285714) + 4px))';
  vars[`--p-lnk-icon-m${s}`] = hidden ? '0' : 'calc(-1 * (11.2px * (var(--_p-link-a) - 0.64285714) + 4px))';
  if (hidden) {
    vars[`--p-lnk-l-pos${s}`] = 'absolute';
    vars[`--p-lnk-l-w${s}`] = '1px';
    vars[`--p-lnk-l-h${s}`] = '1px';
    vars[`--p-lnk-l-pad${s}`] = '0';
    vars[`--p-lnk-l-m${s}`] = '-1px';
    vars[`--p-lnk-l-ov${s}`] = 'hidden';
    vars[`--p-lnk-l-clip${s}`] = bp === 'base' ? 'unset' : 'rect(0, 0, 0, 0)';
    vars[`--p-lnk-l-ws${s}`] = 'nowrap';
    return;
  }
  vars[`--p-lnk-l-pos${s}`] = 'static';
  vars[`--p-lnk-l-w${s}`] = 'auto';
  vars[`--p-lnk-l-h${s}`] = 'auto';
  vars[`--p-lnk-l-pad${s}`] = '0';
  vars[`--p-lnk-l-m${s}`] = '0';
  vars[`--p-lnk-l-ov${s}`] = 'visible';
  vars[`--p-lnk-l-clip${s}`] = bp === 'base' ? 'unset' : 'auto';
  vars[`--p-lnk-l-ws${s}`] = 'normal';
};

export default function LitLink(props: {
  variant?: string;
  icon?: string;
  iconSource?: string;
  href?: string;
  target?: string;
  download?: string;
  rel?: string;
  hideLabel?: any;
  compact?: any;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const variant = props.variant || 'primary';
      const hideLabel = parse(props.hideLabel, false);
      const compact = parse(props.compact, false);
      const secondary = variant === 'secondary';
      const vars: Record<string, string> = {
        '--p-lnk-bg': secondary
          ? 'var(--p-link-bg, var(--p-color-frosted-strong))'
          : 'var(--p-link-bg, var(--p-color-primary))',
        '--p-lnk-fg': secondary
          ? 'var(--p-link-fg, var(--p-color-primary))'
          : 'var(--p-link-fg, var(--p-color-canvas))',
        '--p-lnk-hbg': secondary
          ? 'var(--p-link-bg, var(--p-color-frosted))'
          : 'var(--p-link-bg, var(--p-color-contrast-high))',
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
  });

  useStyle(`
    :host {
      display: inline-block;
      vertical-align: top;
      --_p-link-a: var(--p-lnk-scale);
      --_p-link-button-a: var(--p-lnk-br);
      --p-lnk-slot-cur: var(--p-lnk-slot-r);
      border-radius: var(--p-lnk-host-r) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    ::slotted(a) {
      all: unset !important;
    }
    ::slotted(a)::before {
      content: "" !important;
      position: fixed !important;
      inset: 0 !important;
      border-radius: var(--p-lnk-slot-cur) !important;
    }
    ::slotted(a:focus-visible)::before {
      outline: 2px solid var(--p-color-focus) !important;
      outline-offset: 2px !important;
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
      background-color: var(--p-lnk-bg);
      color: var(--p-lnk-fg);
      cursor: pointer;
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      padding: var(--p-lnk-pad);
      gap: var(--p-lnk-gap);
    }
    :host([href]) .root:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    .label {
      position: var(--p-lnk-l-pos);
      width: var(--p-lnk-l-w);
      height: var(--p-lnk-l-h);
      padding: var(--p-lnk-l-pad);
      margin: var(--p-lnk-l-m);
      overflow: var(--p-lnk-l-ov);
      clip: var(--p-lnk-l-clip);
      white-space: var(--p-lnk-l-ws);
    }
    .icon,
    p-icon {
      font: var(--p-typescale-sm) var(--p-font-porsche-next);
      width: var(--p-leading-normal);
      height: var(--p-leading-normal);
      margin-inline-start: var(--p-lnk-icon-m);
    }
    :host(:not([icon-source]):not([icon])) p-icon,
    :host([icon="none"]:not([icon-source])) p-icon,
    :host([icon=""]:not([icon-source])) p-icon {
      display: none;
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
      :host([href]) .root:focus-visible {
        outline-color: Highlight;
      }
      ::slotted(a:focus-visible)::before {
        outline-color: Highlight !important;
      }
    }
    @media (hover: hover) {
      .root:hover {
        color: var(--p-lnk-fg);
        background-color: var(--p-lnk-hbg);
      }
      @media (forced-colors: active) {
        .root:hover {
          background: Canvas;
        }
      }
    }
    @media (min-width: 480px) {
      :host {
        --_p-link-a: var(--p-lnk-scale-xs);
        --_p-link-button-a: var(--p-lnk-br-xs);
        --p-lnk-slot-cur: var(--p-lnk-slot-r-xs);
        border-radius: var(--p-lnk-host-r-xs) !important;
      }
      .root {
        padding: var(--p-lnk-pad-xs);
        gap: var(--p-lnk-gap-xs);
      }
      .label {
        position: var(--p-lnk-l-pos-xs);
        width: var(--p-lnk-l-w-xs);
        height: var(--p-lnk-l-h-xs);
        padding: var(--p-lnk-l-pad-xs);
        margin: var(--p-lnk-l-m-xs);
        overflow: var(--p-lnk-l-ov-xs);
        clip: var(--p-lnk-l-clip-xs);
        white-space: var(--p-lnk-l-ws-xs);
      }
      .icon,
      p-icon {
        margin-inline-start: var(--p-lnk-icon-m-xs);
      }
    }
    @media (min-width: 760px) {
      :host {
        --_p-link-a: var(--p-lnk-scale-s);
        --_p-link-button-a: var(--p-lnk-br-s);
        --p-lnk-slot-cur: var(--p-lnk-slot-r-s);
        border-radius: var(--p-lnk-host-r-s) !important;
      }
      .root {
        padding: var(--p-lnk-pad-s);
        gap: var(--p-lnk-gap-s);
      }
      .label {
        position: var(--p-lnk-l-pos-s);
        width: var(--p-lnk-l-w-s);
        height: var(--p-lnk-l-h-s);
        padding: var(--p-lnk-l-pad-s);
        margin: var(--p-lnk-l-m-s);
        overflow: var(--p-lnk-l-ov-s);
        clip: var(--p-lnk-l-clip-s);
        white-space: var(--p-lnk-l-ws-s);
      }
      .icon,
      p-icon {
        margin-inline-start: var(--p-lnk-icon-m-s);
      }
    }
    @media (min-width: 1000px) {
      :host {
        --_p-link-a: var(--p-lnk-scale-m);
        --_p-link-button-a: var(--p-lnk-br-m);
        --p-lnk-slot-cur: var(--p-lnk-slot-r-m);
        border-radius: var(--p-lnk-host-r-m) !important;
      }
      .root {
        padding: var(--p-lnk-pad-m);
        gap: var(--p-lnk-gap-m);
      }
      .label {
        position: var(--p-lnk-l-pos-m);
        width: var(--p-lnk-l-w-m);
        height: var(--p-lnk-l-h-m);
        padding: var(--p-lnk-l-pad-m);
        margin: var(--p-lnk-l-m-m);
        overflow: var(--p-lnk-l-ov-m);
        clip: var(--p-lnk-l-clip-m);
        white-space: var(--p-lnk-l-ws-m);
      }
      .icon,
      p-icon {
        margin-inline-start: var(--p-lnk-icon-m-m);
      }
    }
    @media (min-width: 1300px) {
      :host {
        --_p-link-a: var(--p-lnk-scale-l);
        --_p-link-button-a: var(--p-lnk-br-l);
        --p-lnk-slot-cur: var(--p-lnk-slot-r-l);
        border-radius: var(--p-lnk-host-r-l) !important;
      }
      .root {
        padding: var(--p-lnk-pad-l);
        gap: var(--p-lnk-gap-l);
      }
      .label {
        position: var(--p-lnk-l-pos-l);
        width: var(--p-lnk-l-w-l);
        height: var(--p-lnk-l-h-l);
        padding: var(--p-lnk-l-pad-l);
        margin: var(--p-lnk-l-m-l);
        overflow: var(--p-lnk-l-ov-l);
        clip: var(--p-lnk-l-clip-l);
        white-space: var(--p-lnk-l-ws-l);
      }
      .icon,
      p-icon {
        margin-inline-start: var(--p-lnk-icon-m-l);
      }
    }
    @media (min-width: 1760px) {
      :host {
        --_p-link-a: var(--p-lnk-scale-xl);
        --_p-link-button-a: var(--p-lnk-br-xl);
        --p-lnk-slot-cur: var(--p-lnk-slot-r-xl);
        border-radius: var(--p-lnk-host-r-xl) !important;
      }
      .root {
        padding: var(--p-lnk-pad-xl);
        gap: var(--p-lnk-gap-xl);
      }
      .label {
        position: var(--p-lnk-l-pos-xl);
        width: var(--p-lnk-l-w-xl);
        height: var(--p-lnk-l-h-xl);
        padding: var(--p-lnk-l-pad-xl);
        margin: var(--p-lnk-l-m-xl);
        overflow: var(--p-lnk-l-ov-xl);
        clip: var(--p-lnk-l-clip-xl);
        white-space: var(--p-lnk-l-ws-xl);
      }
      .icon,
      p-icon {
        margin-inline-start: var(--p-lnk-icon-m-xl);
      }
    }
    @media (min-width: 1920px) {
      :host {
        --_p-link-a: var(--p-lnk-scale-xxl);
        --_p-link-button-a: var(--p-lnk-br-xxl);
        --p-lnk-slot-cur: var(--p-lnk-slot-r-xxl);
        border-radius: var(--p-lnk-host-r-xxl) !important;
      }
      .root {
        padding: var(--p-lnk-pad-xxl);
        gap: var(--p-lnk-gap-xxl);
      }
      .label {
        position: var(--p-lnk-l-pos-xxl);
        width: var(--p-lnk-l-w-xxl);
        height: var(--p-lnk-l-h-xxl);
        padding: var(--p-lnk-l-pad-xxl);
        margin: var(--p-lnk-l-m-xxl);
        overflow: var(--p-lnk-l-ov-xxl);
        clip: var(--p-lnk-l-clip-xxl);
        white-space: var(--p-lnk-l-ws-xxl);
      }
      .icon,
      p-icon {
        margin-inline-start: var(--p-lnk-icon-m-xxl);
      }
    }
  `);

  return (
    <span class="root">
      <p-icon
        class="icon"
        name={state.iconName}
        source={state.iconSrc}
        size="inherit"
        color="inherit"
        aria-hidden="true"
      />
      <span class="label">
        <slot></slot>
      </span>
    </span>
  );
}
