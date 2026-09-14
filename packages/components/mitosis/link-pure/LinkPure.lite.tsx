import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-link-pure' });

const SIZE_MAP: Record<string, string> = {
  'xx-small': 'var(--p-typescale-2xs)',
  'x-small': 'var(--p-typescale-xs)',
  small: 'var(--p-typescale-sm)',
  medium: 'var(--p-typescale-md)',
  large: 'var(--p-typescale-lg)',
  'x-large': 'var(--p-typescale-xl)',
  'xx-large': 'var(--p-typescale-2xl)',
  '2xs': 'var(--p-typescale-2xs)',
  xs: 'var(--p-typescale-xs)',
  sm: 'var(--p-typescale-sm)',
  md: 'var(--p-typescale-md)',
  lg: 'var(--p-typescale-lg)',
  xl: 'var(--p-typescale-xl)',
  '2xl': 'var(--p-typescale-2xl)',
  '3xl': 'var(--p-typescale-3xl)',
  '4xl': 'var(--p-typescale-4xl)',
  '5xl': 'var(--p-typescale-5xl)',
};

const COLOR_MAP: Record<string, string> = {
  primary: 'var(--p-color-primary)',
  'contrast-higher': 'var(--p-color-contrast-higher)',
  'contrast-high': 'var(--p-color-contrast-high)',
  'contrast-medium': 'var(--p-color-contrast-medium)',
  inherit: 'currentcolor',
};

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

const fontFor = (size: any) => {
  if (size === 'inherit') return '';
  return SIZE_MAP[String(size)] || SIZE_MAP.sm;
};

const assignBp = (vars: Record<string, string>, bp: string, size: any, stretch: any, hide: any, align: any) => {
  const s = bp === 'base' ? '' : `-${bp}`;
  const hidden = isTrue(hide);
  const stretched = isTrue(stretch);
  vars[`--p-lp-host-d${s}`] = stretched ? 'block' : 'inline-block';
  vars[`--p-lp-host-w${s}`] = stretched ? '100%' : 'auto';
  vars[`--p-lp-fs${s}`] = fontFor(size);
  vars[`--p-lp-gap${s}`] = hidden ? '0' : 'var(--p-spacing-static-xs)';
  vars[`--p-lp-just${s}`] = stretched ? 'space-between' : 'flex-start';
  vars[`--p-lp-ai${s}`] = stretched ? 'center' : 'flex-start';
  vars[`--p-lp-inset${s}`] = hidden ? '-2px' : '-4px';
  vars[`--p-lp-rad${s}`] = hidden ? 'var(--p-radius-full)' : 'var(--p-radius-lg)';
  vars[`--p-lp-l-ws${s}`] = hidden ? 'nowrap' : '';
  vars[`--p-lp-l-ti${s}`] = hidden ? '-999999px' : '0';
  vars[`--p-lp-l-ov${s}`] = hidden ? 'hidden' : 'visible';
  vars[`--p-lp-l-ord${s}`] = align === 'start' || align === 'left' ? '-1' : '0';
};

export default function LitLinkPure(props: {
  size?: any;
  color?: string;
  underline?: any;
  active?: any;
  stretch?: any;
  hideLabel?: any;
  alignLabel?: any;
  icon?: string;
  iconSource?: string;
  href?: string;
  target?: string;
  download?: string;
  rel?: string;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const size = parse(props.size, 'sm');
      const stretch = parse(props.stretch, false);
      const hideLabel = parse(props.hideLabel, false);
      const alignLabel = parse(props.alignLabel, 'end');
      const vars: Record<string, string> = {
        '--p-lp-fg': COLOR_MAP[props.color || 'primary'] || COLOR_MAP.primary,
      };
      const objecty =
        typeof size === 'object' ||
        typeof stretch === 'object' ||
        typeof hideLabel === 'object' ||
        typeof alignLabel === 'object';
      if (objecty) {
        const sizeObj = typeof size === 'object' && size !== null ? size : null;
        const stretchObj = typeof stretch === 'object' && stretch !== null ? stretch : null;
        const hideObj = typeof hideLabel === 'object' && hideLabel !== null ? hideLabel : null;
        const alignObj = typeof alignLabel === 'object' && alignLabel !== null ? alignLabel : null;
        let lastS = sizeObj ? pick(sizeObj, 'base', 'sm') : size;
        let lastSt = stretchObj ? pick(stretchObj, 'base', false) : stretch;
        let lastH = hideObj ? pick(hideObj, 'base', false) : hideLabel;
        let lastA = alignObj ? pick(alignObj, 'base', 'end') : alignLabel;
        for (const bp of BREAKPOINTS) {
          if (sizeObj && sizeObj[bp] !== undefined) lastS = pick(sizeObj, bp, lastS);
          if (stretchObj && stretchObj[bp] !== undefined) lastSt = pick(stretchObj, bp, lastSt);
          if (hideObj && hideObj[bp] !== undefined) lastH = pick(hideObj, bp, lastH);
          if (alignObj && alignObj[bp] !== undefined) lastA = pick(alignObj, bp, lastA);
          assignBp(vars, bp, lastS, lastSt, lastH, lastA);
        }
      } else {
        for (const bp of BREAKPOINTS) assignBp(vars, bp, size, stretch, hideLabel, alignLabel);
      }
      return vars;
    },
    get iconName(): string {
      const icon = props.icon || 'arrow-right';
      if (icon === 'none') return '';
      return icon;
    },
    get iconSrc(): string {
      return props.iconSource || '';
    },
  });

  useStyle(`
    :host {
      transform: translate3d(0, 0, 0) !important;
      display: var(--p-lp-host-d);
      width: var(--p-lp-host-w);
      vertical-align: top;
      --p-lp-slot-in: var(--p-lp-inset);
      --p-lp-slot-r: var(--p-lp-rad);
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
      inset-block: -2px !important;
      inset-inline: var(--p-lp-slot-in) !important;
      border-radius: var(--p-lp-slot-r) !important;
    }
    ::slotted(a:focus-visible)::before {
      outline: 2px solid var(--p-color-focus) !important;
      outline-offset: 2px !important;
    }
    .root {
      all: unset;
      display: flex;
      width: 100%;
      cursor: pointer;
      color: var(--p-lp-fg);
      text-decoration: none;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      font-size: inherit;
      font-size: var(--p-lp-fs);
      gap: var(--p-lp-gap);
      justify-content: var(--p-lp-just);
      align-items: var(--p-lp-ai);
    }
    :host([underline]) .root {
      text-decoration: underline;
    }
    .root::before {
      content: "";
      position: absolute;
      top: -2px;
      bottom: -2px;
      right: var(--p-lp-inset);
      left: var(--p-lp-inset);
      border-radius: var(--p-lp-rad);
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    :host([active]) .root::before {
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
      background-color: var(--p-color-frosted);
    }
    :host([href]) .root:focus-visible::before {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    .icon,
    p-icon {
      position: relative;
      flex-shrink: 0;
    }
    .label {
      z-index: 1;
      white-space: inherit;
      white-space: var(--p-lp-l-ws);
      text-indent: var(--p-lp-l-ti);
      overflow: var(--p-lp-l-ov);
      order: var(--p-lp-l-ord);
    }
    :host([icon="none"]:not([icon-source])) p-icon {
      display: none;
    }
    @media (forced-colors: active) {
      .root {
        color: LinkText;
      }
      .root:is(button) {
        color: ButtonText;
      }
      :host([href]) .root:focus-visible::before {
        outline-color: Highlight;
      }
      ::slotted(a:focus-visible)::before {
        outline-color: Highlight !important;
      }
    }
    @media (hover: hover) {
      .root:hover::before {
        -webkit-backdrop-filter: var(--p-blur-frosted);
        backdrop-filter: var(--p-blur-frosted);
        background-color: var(--p-color-frosted-strong);
      }
    }
    @media (min-width: 480px) {
      :host {
        display: var(--p-lp-host-d-xs);
        width: var(--p-lp-host-w-xs);
        --p-lp-slot-in: var(--p-lp-inset-xs);
        --p-lp-slot-r: var(--p-lp-rad-xs);
      }
      .root {
        font-size: var(--p-lp-fs-xs, var(--p-lp-fs));
        gap: var(--p-lp-gap-xs);
        justify-content: var(--p-lp-just-xs);
        align-items: var(--p-lp-ai-xs);
      }
      .root::before {
        right: var(--p-lp-inset-xs);
        left: var(--p-lp-inset-xs);
        border-radius: var(--p-lp-rad-xs);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-lp-l-ws-xs);
        text-indent: var(--p-lp-l-ti-xs);
        overflow: var(--p-lp-l-ov-xs);
        order: var(--p-lp-l-ord-xs);
      }
    }
    @media (min-width: 760px) {
      :host {
        display: var(--p-lp-host-d-s);
        width: var(--p-lp-host-w-s);
        --p-lp-slot-in: var(--p-lp-inset-s);
        --p-lp-slot-r: var(--p-lp-rad-s);
      }
      .root {
        font-size: var(--p-lp-fs-s, var(--p-lp-fs));
        gap: var(--p-lp-gap-s);
        justify-content: var(--p-lp-just-s);
        align-items: var(--p-lp-ai-s);
      }
      .root::before {
        right: var(--p-lp-inset-s);
        left: var(--p-lp-inset-s);
        border-radius: var(--p-lp-rad-s);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-lp-l-ws-s);
        text-indent: var(--p-lp-l-ti-s);
        overflow: var(--p-lp-l-ov-s);
        order: var(--p-lp-l-ord-s);
      }
    }
    @media (min-width: 1000px) {
      :host {
        display: var(--p-lp-host-d-m);
        width: var(--p-lp-host-w-m);
        --p-lp-slot-in: var(--p-lp-inset-m);
        --p-lp-slot-r: var(--p-lp-rad-m);
      }
      .root {
        font-size: var(--p-lp-fs-m, var(--p-lp-fs));
        gap: var(--p-lp-gap-m);
        justify-content: var(--p-lp-just-m);
        align-items: var(--p-lp-ai-m);
      }
      .root::before {
        right: var(--p-lp-inset-m);
        left: var(--p-lp-inset-m);
        border-radius: var(--p-lp-rad-m);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-lp-l-ws-m);
        text-indent: var(--p-lp-l-ti-m);
        overflow: var(--p-lp-l-ov-m);
        order: var(--p-lp-l-ord-m);
      }
    }
    @media (min-width: 1300px) {
      :host {
        display: var(--p-lp-host-d-l);
        width: var(--p-lp-host-w-l);
        --p-lp-slot-in: var(--p-lp-inset-l);
        --p-lp-slot-r: var(--p-lp-rad-l);
      }
      .root {
        font-size: var(--p-lp-fs-l, var(--p-lp-fs));
        gap: var(--p-lp-gap-l);
        justify-content: var(--p-lp-just-l);
        align-items: var(--p-lp-ai-l);
      }
      .root::before {
        right: var(--p-lp-inset-l);
        left: var(--p-lp-inset-l);
        border-radius: var(--p-lp-rad-l);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-lp-l-ws-l);
        text-indent: var(--p-lp-l-ti-l);
        overflow: var(--p-lp-l-ov-l);
        order: var(--p-lp-l-ord-l);
      }
    }
    @media (min-width: 1760px) {
      :host {
        display: var(--p-lp-host-d-xl);
        width: var(--p-lp-host-w-xl);
        --p-lp-slot-in: var(--p-lp-inset-xl);
        --p-lp-slot-r: var(--p-lp-rad-xl);
      }
      .root {
        font-size: var(--p-lp-fs-xl, var(--p-lp-fs));
        gap: var(--p-lp-gap-xl);
        justify-content: var(--p-lp-just-xl);
        align-items: var(--p-lp-ai-xl);
      }
      .root::before {
        right: var(--p-lp-inset-xl);
        left: var(--p-lp-inset-xl);
        border-radius: var(--p-lp-rad-xl);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-lp-l-ws-xl);
        text-indent: var(--p-lp-l-ti-xl);
        overflow: var(--p-lp-l-ov-xl);
        order: var(--p-lp-l-ord-xl);
      }
    }
    @media (min-width: 1920px) {
      :host {
        display: var(--p-lp-host-d-xxl);
        width: var(--p-lp-host-w-xxl);
        --p-lp-slot-in: var(--p-lp-inset-xxl);
        --p-lp-slot-r: var(--p-lp-rad-xxl);
      }
      .root {
        font-size: var(--p-lp-fs-xxl, var(--p-lp-fs));
        gap: var(--p-lp-gap-xxl);
        justify-content: var(--p-lp-just-xxl);
        align-items: var(--p-lp-ai-xxl);
      }
      .root::before {
        right: var(--p-lp-inset-xxl);
        left: var(--p-lp-inset-xxl);
        border-radius: var(--p-lp-rad-xxl);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-lp-l-ws-xxl);
        text-indent: var(--p-lp-l-ti-xxl);
        overflow: var(--p-lp-l-ov-xxl);
        order: var(--p-lp-l-ord-xxl);
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
