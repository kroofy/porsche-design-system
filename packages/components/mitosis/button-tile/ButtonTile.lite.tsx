import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-button-tile' });

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

const WEIGHT_MAP: Record<string, string> = {
  regular: 'var(--p-font-weight-normal)',
  'semi-bold': 'var(--p-font-weight-semibold)',
  normal: 'var(--p-font-weight-normal)',
  semibold: 'var(--p-font-weight-semibold)',
  bold: 'var(--p-font-weight-bold)',
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
  if (raw === 'true') return true;
  if (raw === 'false') return false;
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
  return SIZE_MAP[String(size)] || SIZE_MAP.medium;
};

const weightFor = (weight: any) => WEIGHT_MAP[String(weight)] || WEIGHT_MAP['semi-bold'];

const assignBp = (vars: Record<string, string>, bp: string, size: any, weight: any, ratio: any, compact: any) => {
  const s = bp === 'base' ? '' : `-${bp}`;
  const on = compact === true || compact === 'true';
  vars[`--p-bt-fs${s}`] = fontFor(size);
  vars[`--p-bt-fw${s}`] = weightFor(weight);
  vars[`--p-bt-ar${s}`] = String(ratio || '4/3');
  vars[`--p-bt-foot-d${s}`] = on ? 'grid' : 'flex';
  vars[`--p-bt-foot-cols${s}`] = on ? 'minmax(0, 1fr) auto' : 'none';
  vars[`--p-bt-foot-gap${s}`] = on ? 'var(--p-spacing-static-md)' : '0';
  vars[`--p-bt-foot-dir${s}`] = on ? 'row' : 'column';
  vars[`--p-bt-foot-ai${s}`] = on ? 'stretch' : 'start';
  vars[`--p-bt-pure-d${s}`] = on ? 'inline-block' : 'none';
  vars[`--p-bt-btn-d${s}`] = on ? 'none' : 'inline-block';
};

export default function LitButtonTile(props: {
  size?: any;
  weight?: any;
  aspectRatio?: any;
  label?: string;
  description?: string;
  align?: string;
  gradient?: any;
  compact?: any;
  type?: string;
  disabled?: any;
  loading?: any;
  icon?: string;
  iconSource?: string;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const size = parse(props.size, 'medium');
      const weight = parse(props.weight, 'semi-bold');
      const aspectRatio = parse(props.aspectRatio, '4/3');
      let compact: any = parse(props.compact, false);
      if (props.compact === 'true') compact = true;
      if (props.compact === 'false') compact = false;
      const hasFooterSlot = false;
      const vars: Record<string, string> = {
        '--p-bt-pure-row': hasFooterSlot ? '1 / 3' : '1 / 2',
      };
      const objecty =
        typeof size === 'object' ||
        typeof weight === 'object' ||
        typeof aspectRatio === 'object' ||
        typeof compact === 'object';
      if (objecty) {
        const sizeObj = typeof size === 'object' && size !== null ? size : null;
        const weightObj = typeof weight === 'object' && weight !== null ? weight : null;
        const ratioObj = typeof aspectRatio === 'object' && aspectRatio !== null ? aspectRatio : null;
        const compactObj = typeof compact === 'object' && compact !== null ? compact : null;
        let lastS = sizeObj ? pick(sizeObj, 'base', 'medium') : size;
        let lastW = weightObj ? pick(weightObj, 'base', 'semi-bold') : weight;
        let lastR = ratioObj ? pick(ratioObj, 'base', '4/3') : aspectRatio;
        let lastC = compactObj ? pick(compactObj, 'base', false) : compact;
        for (const bp of BREAKPOINTS) {
          if (sizeObj && sizeObj[bp] !== undefined) lastS = pick(sizeObj, bp, lastS);
          if (weightObj && weightObj[bp] !== undefined) lastW = pick(weightObj, bp, lastW);
          if (ratioObj && ratioObj[bp] !== undefined) lastR = pick(ratioObj, bp, lastR);
          if (compactObj && compactObj[bp] !== undefined) lastC = pick(compactObj, bp, lastC);
          assignBp(vars, bp, lastS, lastW, lastR, lastC);
        }
      } else {
        for (const bp of BREAKPOINTS) assignBp(vars, bp, size, weight, aspectRatio, compact);
      }
      return vars;
    },
    get descriptionText(): string {
      return props.description || '';
    },
    get labelText(): string {
      return props.label || '';
    },
  });

  useStyle(`
    :host {
      display: flex;
      align-items: stretch;
      color-scheme: dark;
      hyphens: auto;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    slot {
      display: block;
    }
    slot:not([name]) {
      width: 100%;
      height: 100%;
      transition: transform var(--p-transition-duration, var(--p-duration-md)) var(--p-ease-in-out);
    }
    slot[name="header"] {
      grid-area: 2 / 2;
      z-index: 5;
    }
    :host([align="top"]) slot[name="header"] {
      grid-area: 4 / 2;
    }
    slot[name="footer"] {
      grid-row: 2;
      z-index: 3;
    }
    ::slotted(:is(img, video, picture)) {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
    }
    ::slotted(:is(img, video)) {
      object-fit: cover !important;
    }
    a {
      grid-area: 1 / 1 / -1 / -1;
      z-index: 4;
      outline: 0;
    }
    p {
      all: unset;
      z-index: 3;
      max-width: 34.375rem;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-primary);
      hyphens: inherit;
      font-size: inherit;
      font-size: var(--p-bt-fs);
      font-weight: var(--p-bt-fw);
    }
    @supports (-webkit-hyphens: auto) {
      :host {
        align-items: baseline;
      }
    }
    .root {
      display: grid;
      grid-template: var(--p-spacing-fluid-md) auto minmax(0px, 1fr) auto var(--p-spacing-fluid-md) / var(--p-spacing-fluid-md) minmax(0px, 1fr) var(--p-spacing-fluid-md);
      width: 100%;
      border-radius: var(--p-radius-3xl);
      aspect-ratio: var(--p-bt-ar);
      cursor: pointer;
    }
    :host([disabled]) .root,
    :host([loading]) .root {
      cursor: not-allowed;
    }
    .root::after {
      content: "";
      z-index: 2;
      grid-area: 4 / 1 / 6 / -1;
      background: linear-gradient(to top, hsla(from var(--p-color-canvas) h s l / .8) 0%, hsla(from var(--p-color-canvas) h s l / .8) 8.1%, hsla(from var(--p-color-canvas) h s l / .8) 15.5%, hsla(from var(--p-color-canvas) h s l / .8) 22.5%, hsla(from var(--p-color-canvas) h s l / .78) 29%, hsla(from var(--p-color-canvas) h s l / .73) 35.3%, hsla(from var(--p-color-canvas) h s l / .67) 41.2%, hsla(from var(--p-color-canvas) h s l / .6) 47.1%, hsla(from var(--p-color-canvas) h s l / .52) 52.9%, hsla(from var(--p-color-canvas) h s l / .44) 58.8%, hsla(from var(--p-color-canvas) h s l / .33) 64.7%, hsla(from var(--p-color-canvas) h s l / .22) 71%, hsla(from var(--p-color-canvas) h s l / .12) 77.5%, hsla(from var(--p-color-canvas) h s l / .05) 84.5%, hsla(from var(--p-color-canvas) h s l / .011) 91.9%, hsla(from var(--p-color-canvas) h s l / 0) 100%);
      margin-top: calc(var(--p-spacing-fluid-lg) * -1);
      border-end-start-radius: inherit;
      border-end-end-radius: inherit;
    }
    :host([align="top"]) .root::after {
      grid-area: 1 / 1 / 3 / -1;
      background: linear-gradient(to bottom, hsla(from var(--p-color-canvas) h s l / .8) 0%, hsla(from var(--p-color-canvas) h s l / .8) 8.1%, hsla(from var(--p-color-canvas) h s l / .8) 15.5%, hsla(from var(--p-color-canvas) h s l / .8) 22.5%, hsla(from var(--p-color-canvas) h s l / .78) 29%, hsla(from var(--p-color-canvas) h s l / .73) 35.3%, hsla(from var(--p-color-canvas) h s l / .67) 41.2%, hsla(from var(--p-color-canvas) h s l / .6) 47.1%, hsla(from var(--p-color-canvas) h s l / .52) 52.9%, hsla(from var(--p-color-canvas) h s l / .44) 58.8%, hsla(from var(--p-color-canvas) h s l / .33) 64.7%, hsla(from var(--p-color-canvas) h s l / .22) 71%, hsla(from var(--p-color-canvas) h s l / .12) 77.5%, hsla(from var(--p-color-canvas) h s l / .05) 84.5%, hsla(from var(--p-color-canvas) h s l / .011) 91.9%, hsla(from var(--p-color-canvas) h s l / 0) 100%);
      margin-top: 0;
      margin-bottom: calc(var(--p-spacing-fluid-lg) * -1);
      border-end-start-radius: 0;
      border-end-end-radius: 0;
      border-start-start-radius: inherit;
      border-start-end-radius: inherit;
    }
    :host(:not([gradient])) .root::after {
      content: none;
    }
    .media {
      position: relative;
      grid-area: 1 / 1 / -1 / -1;
      z-index: 1;
      overflow: hidden;
      border-radius: inherit;
    }
    .footer {
      grid-area: 4 / 2;
      display: var(--p-bt-foot-d);
      grid-template-columns: var(--p-bt-foot-cols);
      column-gap: var(--p-bt-foot-gap);
      flex-direction: var(--p-bt-foot-dir);
      align-items: var(--p-bt-foot-ai);
    }
    :host([align="top"]) .footer {
      grid-area: 2 / 2;
    }
    .link-or-button-pure {
      z-index: 5;
      grid-column: 2;
      grid-row: var(--p-bt-pure-row);
      align-self: flex-end;
      display: var(--p-bt-pure-d);
    }
    :host([align="top"]) .link-or-button-pure {
      align-self: flex-start;
    }
    .link-or-button {
      min-height: 54px;
      z-index: 5;
      margin-top: var(--p-spacing-static-md);
      display: var(--p-bt-btn-d);
    }
    @media (hover: hover) {
      :host(:not([disabled])) .root:hover slot:not([name]) {
        transform: scale3d(1.05, 1.05, 1.05);
      }
    }
    @supports (-webkit-hyphens: auto) {
      .root {
        height: 100%;
      }
    }
    @media (min-width: 480px) {
      .root {
        aspect-ratio: var(--p-bt-ar-xs, var(--p-bt-ar));
      }
      p {
        font-size: var(--p-bt-fs-xs, var(--p-bt-fs));
        font-weight: var(--p-bt-fw-xs, var(--p-bt-fw));
      }
      .footer {
        display: var(--p-bt-foot-d-xs);
        grid-template-columns: var(--p-bt-foot-cols-xs);
        column-gap: var(--p-bt-foot-gap-xs);
        flex-direction: var(--p-bt-foot-dir-xs);
        align-items: var(--p-bt-foot-ai-xs);
      }
      .link-or-button-pure {
        display: var(--p-bt-pure-d-xs);
      }
      .link-or-button {
        display: var(--p-bt-btn-d-xs);
      }
    }
    @media (min-width: 760px) {
      .root {
        aspect-ratio: var(--p-bt-ar-s, var(--p-bt-ar));
      }
      p {
        font-size: var(--p-bt-fs-s, var(--p-bt-fs));
        font-weight: var(--p-bt-fw-s, var(--p-bt-fw));
      }
      .footer {
        display: var(--p-bt-foot-d-s);
        grid-template-columns: var(--p-bt-foot-cols-s);
        column-gap: var(--p-bt-foot-gap-s);
        flex-direction: var(--p-bt-foot-dir-s);
        align-items: var(--p-bt-foot-ai-s);
      }
      .link-or-button-pure {
        display: var(--p-bt-pure-d-s);
      }
      .link-or-button {
        display: var(--p-bt-btn-d-s);
      }
    }
    @media (min-width: 1000px) {
      .root {
        aspect-ratio: var(--p-bt-ar-m, var(--p-bt-ar));
      }
      p {
        font-size: var(--p-bt-fs-m, var(--p-bt-fs));
        font-weight: var(--p-bt-fw-m, var(--p-bt-fw));
      }
      .footer {
        display: var(--p-bt-foot-d-m);
        grid-template-columns: var(--p-bt-foot-cols-m);
        column-gap: var(--p-bt-foot-gap-m);
        flex-direction: var(--p-bt-foot-dir-m);
        align-items: var(--p-bt-foot-ai-m);
      }
      .link-or-button-pure {
        display: var(--p-bt-pure-d-m);
      }
      .link-or-button {
        display: var(--p-bt-btn-d-m);
      }
    }
    @media (min-width: 1300px) {
      .root {
        aspect-ratio: var(--p-bt-ar-l, var(--p-bt-ar));
      }
      p {
        font-size: var(--p-bt-fs-l, var(--p-bt-fs));
        font-weight: var(--p-bt-fw-l, var(--p-bt-fw));
      }
      .footer {
        display: var(--p-bt-foot-d-l);
        grid-template-columns: var(--p-bt-foot-cols-l);
        column-gap: var(--p-bt-foot-gap-l);
        flex-direction: var(--p-bt-foot-dir-l);
        align-items: var(--p-bt-foot-ai-l);
      }
      .link-or-button-pure {
        display: var(--p-bt-pure-d-l);
      }
      .link-or-button {
        display: var(--p-bt-btn-d-l);
      }
    }
    @media (min-width: 1760px) {
      .root {
        aspect-ratio: var(--p-bt-ar-xl, var(--p-bt-ar));
      }
      p {
        font-size: var(--p-bt-fs-xl, var(--p-bt-fs));
        font-weight: var(--p-bt-fw-xl, var(--p-bt-fw));
      }
      .footer {
        display: var(--p-bt-foot-d-xl);
        grid-template-columns: var(--p-bt-foot-cols-xl);
        column-gap: var(--p-bt-foot-gap-xl);
        flex-direction: var(--p-bt-foot-dir-xl);
        align-items: var(--p-bt-foot-ai-xl);
      }
      .link-or-button-pure {
        display: var(--p-bt-pure-d-xl);
      }
      .link-or-button {
        display: var(--p-bt-btn-d-xl);
      }
    }
    @media (min-width: 1920px) {
      .root {
        aspect-ratio: var(--p-bt-ar-xxl, var(--p-bt-ar));
      }
      p {
        font-size: var(--p-bt-fs-xxl, var(--p-bt-fs));
        font-weight: var(--p-bt-fw-xxl, var(--p-bt-fw));
      }
      .footer {
        display: var(--p-bt-foot-d-xxl);
        grid-template-columns: var(--p-bt-foot-cols-xxl);
        column-gap: var(--p-bt-foot-gap-xxl);
        flex-direction: var(--p-bt-foot-dir-xxl);
        align-items: var(--p-bt-foot-ai-xxl);
      }
      .link-or-button-pure {
        display: var(--p-bt-pure-d-xxl);
      }
      .link-or-button {
        display: var(--p-bt-btn-d-xxl);
      }
    }
  `);

  return (
    <div class="root">
      <slot name="header" />
      <div class="media">
        <slot />
      </div>
      <div class="footer">
        <p>{state.descriptionText}</p>
        <slot name="footer" />
      </div>
    </div>
  );
}
