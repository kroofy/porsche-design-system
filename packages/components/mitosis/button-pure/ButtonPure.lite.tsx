import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-button-pure' });

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
  vars[`--p-bp-host-d${s}`] = stretched ? 'block' : 'inline-block';
  vars[`--p-bp-host-w${s}`] = stretched ? '100%' : 'auto';
  vars[`--p-bp-fs${s}`] = fontFor(size);
  vars[`--p-bp-gap${s}`] = hidden ? '0' : 'var(--p-spacing-static-xs)';
  vars[`--p-bp-just${s}`] = stretched ? 'space-between' : 'flex-start';
  vars[`--p-bp-ai${s}`] = stretched ? 'center' : 'flex-start';
  vars[`--p-bp-inset${s}`] = hidden ? '-2px' : '-4px';
  vars[`--p-bp-rad${s}`] = hidden ? 'var(--p-radius-full)' : 'var(--p-radius-lg)';
  vars[`--p-bp-l-ws${s}`] = hidden ? 'nowrap' : '';
  vars[`--p-bp-l-ti${s}`] = hidden ? '-999999px' : '0';
  vars[`--p-bp-l-ov${s}`] = hidden ? 'hidden' : 'visible';
  vars[`--p-bp-l-ord${s}`] = align === 'start' || align === 'left' ? '-1' : '0';
};

export default function LitButtonPure(props: {
  type?: string;
  size?: any;
  color?: string;
  underline?: any;
  active?: any;
  stretch?: any;
  hideLabel?: any;
  alignLabel?: any;
  icon?: string;
  iconSource?: string;
  disabled?: any;
  loading?: any;
  name?: string;
  value?: string;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const disabled = isTrue(props.disabled);
      const size = parse(props.size, 'sm');
      const stretch = parse(props.stretch, false);
      const hideLabel = parse(props.hideLabel, false);
      const alignLabel = parse(props.alignLabel, 'end');
      const vars: Record<string, string> = {
        '--p-bp-fg': disabled
          ? 'var(--p-color-contrast-low)'
          : COLOR_MAP[props.color || 'primary'] || COLOR_MAP.primary,
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
      if (props.iconSource) return props.iconSource;
      const files: any = {
        copy: 'copy.0fcd086.svg',
        like: 'like.a7468cd.svg',
      };
      const icon = props.icon || 'arrow-right';
      if (files[icon]) return 'http://localhost:3001/icons/' + files[icon];
      return '';
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
      transform: translate3d(0, 0, 0) !important;
      display: var(--p-bp-host-d);
      width: var(--p-bp-host-w);
      vertical-align: top;
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
      width: 100%;
      cursor: pointer;
      color: var(--p-bp-fg);
      text-decoration: none;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      font-size: inherit;
      font-size: var(--p-bp-fs);
      gap: var(--p-bp-gap);
      justify-content: var(--p-bp-just);
      align-items: var(--p-bp-ai);
    }
    :host([underline]) .root {
      text-decoration: underline;
    }
    :host([disabled]) .root,
    :host([loading]) .root {
      cursor: not-allowed;
    }
    .root::before {
      content: "";
      position: absolute;
      top: -2px;
      bottom: -2px;
      right: var(--p-bp-inset);
      left: var(--p-bp-inset);
      border-radius: var(--p-bp-rad);
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    :host([active]) .root::before {
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
      background-color: var(--p-color-frosted);
    }
    .root:focus-visible::before {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    .loading,
    #loading {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
    .icon,
    p-icon,
    p-spinner {
      position: relative;
      flex-shrink: 0;
    }
    .label {
      z-index: 1;
      white-space: inherit;
      white-space: var(--p-bp-l-ws);
      text-indent: var(--p-bp-l-ti);
      overflow: var(--p-bp-l-ov);
      order: var(--p-bp-l-ord);
    }
    :host(:not([loading])) p-spinner {
      display: none;
    }
    :host([loading]) p-icon {
      display: none;
    }
    :host([icon="none"]:not([icon-source]):not([loading])) p-icon {
      display: none;
    }
    @media (forced-colors: active) {
      .root {
        color: LinkText;
      }
      .root:is(button) {
        color: ButtonText;
      }
      .root:focus-visible::before {
        outline-color: Highlight;
      }
    }
    @media (hover: hover) {
      :host(:not([disabled]):not([loading])) .root:hover::before {
        -webkit-backdrop-filter: var(--p-blur-frosted);
        backdrop-filter: var(--p-blur-frosted);
        background-color: var(--p-color-frosted-strong);
      }
    }
    @media (min-width: 480px) {
      :host {
        display: var(--p-bp-host-d-xs);
        width: var(--p-bp-host-w-xs);
      }
      .root {
        font-size: var(--p-bp-fs-xs, var(--p-bp-fs));
        gap: var(--p-bp-gap-xs);
        justify-content: var(--p-bp-just-xs);
        align-items: var(--p-bp-ai-xs);
      }
      .root::before {
        right: var(--p-bp-inset-xs);
        left: var(--p-bp-inset-xs);
        border-radius: var(--p-bp-rad-xs);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-bp-l-ws-xs);
        text-indent: var(--p-bp-l-ti-xs);
        overflow: var(--p-bp-l-ov-xs);
        order: var(--p-bp-l-ord-xs);
      }
    }
    @media (min-width: 760px) {
      :host {
        display: var(--p-bp-host-d-s);
        width: var(--p-bp-host-w-s);
      }
      .root {
        font-size: var(--p-bp-fs-s, var(--p-bp-fs));
        gap: var(--p-bp-gap-s);
        justify-content: var(--p-bp-just-s);
        align-items: var(--p-bp-ai-s);
      }
      .root::before {
        right: var(--p-bp-inset-s);
        left: var(--p-bp-inset-s);
        border-radius: var(--p-bp-rad-s);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-bp-l-ws-s);
        text-indent: var(--p-bp-l-ti-s);
        overflow: var(--p-bp-l-ov-s);
        order: var(--p-bp-l-ord-s);
      }
    }
    @media (min-width: 1000px) {
      :host {
        display: var(--p-bp-host-d-m);
        width: var(--p-bp-host-w-m);
      }
      .root {
        font-size: var(--p-bp-fs-m, var(--p-bp-fs));
        gap: var(--p-bp-gap-m);
        justify-content: var(--p-bp-just-m);
        align-items: var(--p-bp-ai-m);
      }
      .root::before {
        right: var(--p-bp-inset-m);
        left: var(--p-bp-inset-m);
        border-radius: var(--p-bp-rad-m);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-bp-l-ws-m);
        text-indent: var(--p-bp-l-ti-m);
        overflow: var(--p-bp-l-ov-m);
        order: var(--p-bp-l-ord-m);
      }
    }
    @media (min-width: 1300px) {
      :host {
        display: var(--p-bp-host-d-l);
        width: var(--p-bp-host-w-l);
      }
      .root {
        font-size: var(--p-bp-fs-l, var(--p-bp-fs));
        gap: var(--p-bp-gap-l);
        justify-content: var(--p-bp-just-l);
        align-items: var(--p-bp-ai-l);
      }
      .root::before {
        right: var(--p-bp-inset-l);
        left: var(--p-bp-inset-l);
        border-radius: var(--p-bp-rad-l);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-bp-l-ws-l);
        text-indent: var(--p-bp-l-ti-l);
        overflow: var(--p-bp-l-ov-l);
        order: var(--p-bp-l-ord-l);
      }
    }
    @media (min-width: 1760px) {
      :host {
        display: var(--p-bp-host-d-xl);
        width: var(--p-bp-host-w-xl);
      }
      .root {
        font-size: var(--p-bp-fs-xl, var(--p-bp-fs));
        gap: var(--p-bp-gap-xl);
        justify-content: var(--p-bp-just-xl);
        align-items: var(--p-bp-ai-xl);
      }
      .root::before {
        right: var(--p-bp-inset-xl);
        left: var(--p-bp-inset-xl);
        border-radius: var(--p-bp-rad-xl);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-bp-l-ws-xl);
        text-indent: var(--p-bp-l-ti-xl);
        overflow: var(--p-bp-l-ov-xl);
        order: var(--p-bp-l-ord-xl);
      }
    }
    @media (min-width: 1920px) {
      :host {
        display: var(--p-bp-host-d-xxl);
        width: var(--p-bp-host-w-xxl);
      }
      .root {
        font-size: var(--p-bp-fs-xxl, var(--p-bp-fs));
        gap: var(--p-bp-gap-xxl);
        justify-content: var(--p-bp-just-xxl);
        align-items: var(--p-bp-ai-xxl);
      }
      .root::before {
        right: var(--p-bp-inset-xxl);
        left: var(--p-bp-inset-xxl);
        border-radius: var(--p-bp-rad-xxl);
      }
      .label {
        white-space: inherit;
        white-space: var(--p-bp-l-ws-xxl);
        text-indent: var(--p-bp-l-ti-xxl);
        overflow: var(--p-bp-l-ov-xxl);
        order: var(--p-bp-l-ord-xxl);
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
      <p-spinner class="icon" size="inherit" color="inherit" aria-hidden="true" />
      <span class="label">
        <slot></slot>
      </span>
      <span class="loading" id="loading" role="status">
        {state.loadingText}
      </span>
    </button>
  );
}
