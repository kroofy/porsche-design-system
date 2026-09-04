import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-spinner' });

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
  inherit: 'inherit',
};

const COLOR_MAP: Record<string, string> = {
  primary: 'var(--p-color-primary)',
  inherit: 'currentcolor',
};

const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

const fontFor = (size: unknown) => SIZE_MAP[String(size)] || SIZE_MAP.sm;

const parseSize = (raw: unknown) => {
  if (raw === undefined || raw === null || raw === '') return 'sm';
  if (typeof raw === 'string' && raw.charAt(0) === '{') {
    try {
      return JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));
    } catch {
      return 'sm';
    }
  }
  return raw;
};

const assignFont = (vars: Record<string, string>, bp: string, font: string) => {
  if (bp === 'base') {
    vars['--p-spinner-fs'] = font;
    return;
  }
  vars[`--p-spinner-fs-${bp}`] = font;
};

export default function LitSpinner(props: { color?: string; size?: any; aria?: any }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const vars: Record<string, string> = {
        '--p-spinner-fallback': COLOR_MAP[props.color || 'primary'] || COLOR_MAP.primary,
      };
      const size = parseSize(props.size);
      if (typeof size === 'object' && size !== null) {
        let last = fontFor(size.base || 'sm');
        for (const bp of BREAKPOINTS) {
          if (size[bp] !== undefined) last = fontFor(size[bp]);
          assignFont(vars, bp, last);
        }
      } else {
        assignFont(vars, 'base', fontFor(size));
      }
      return vars;
    },
    get ariaLabel(): string {
      let raw: any = props.aria;
      if (!raw) return '';
      if (typeof raw === 'string') {
        try {
          raw = JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));
        } catch (e) {
          raw = null;
        }
      }
      if (typeof raw === 'object' && raw !== null) return raw['aria-label'] || '';
      return '';
    },
  });

  useStyle(`
    :host {
      display: inline-flex;
      vertical-align: top;
    }
    :host([hidden]) {
      display: none !important;
    }
    @keyframes rotate {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
    @keyframes dash {
      0% {
        stroke-dashoffset: 69;
        transform: rotateZ(0);
      }
      50%,
      75% {
        stroke-dashoffset: 24;
        transform: rotateZ(80deg);
      }
      100% {
        stroke-dashoffset: 69;
        transform: rotateZ(360deg);
      }
    }
    div {
      width: var(--p-spinner-size, var(--p-leading-normal));
      height: var(--p-spinner-size, var(--p-leading-normal));
      font-family: var(--p-font-porsche-next);
      font-size: var(--p-spinner-fs, var(--p-typescale-sm));
    }
    svg {
      display: block;
      fill: none;
      stroke-width: 1.5;
      animation: rotate var(--p-animation-duration, var(--p-duration-xl)) steps(50) infinite;
    }
    circle:first-child {
      stroke: var(--p-spinner-track-color, var(--p-color-contrast-lower));
    }
    circle:last-child {
      stroke: var(--p-spinner-color, var(--p-spinner-fallback, var(--p-color-primary)));
      stroke-dasharray: var(--p-temporary-spinner-stroke-dasharray, 69);
      stroke-linecap: round;
      animation: dash var(--p-animation-duration, var(--p-duration-xl)) steps(50) infinite;
    }
    @media (forced-colors: active) {
      circle:last-child {
        stroke: CanvasText;
      }
      circle:first-child {
        stroke: none !important;
      }
    }
    @supports (color: oklch(from red l c h)) {
      circle:first-child {
        stroke: var(--p-spinner-track-color, oklch(from var(--p-spinner-color, var(--p-spinner-fallback, var(--p-color-primary))) l c h/.2));
      }
    }
    span,
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
    @media (min-width: 480px) {
      div {
        font-size: var(--p-spinner-fs-xs, var(--p-spinner-fs, var(--p-typescale-sm)));
      }
    }
    @media (min-width: 760px) {
      div {
        font-size: var(--p-spinner-fs-s, var(--p-spinner-fs, var(--p-typescale-sm)));
      }
    }
    @media (min-width: 1000px) {
      div {
        font-size: var(--p-spinner-fs-m, var(--p-spinner-fs, var(--p-typescale-sm)));
      }
    }
    @media (min-width: 1300px) {
      div {
        font-size: var(--p-spinner-fs-l, var(--p-spinner-fs, var(--p-typescale-sm)));
      }
    }
    @media (min-width: 1760px) {
      div {
        font-size: var(--p-spinner-fs-xl, var(--p-spinner-fs, var(--p-typescale-sm)));
      }
    }
    @media (min-width: 1920px) {
      div {
        font-size: var(--p-spinner-fs-xxl, var(--p-spinner-fs, var(--p-typescale-sm)));
      }
    }
  `);

  return (
    <div role="alert" aria-live="assertive" aria-label={state.ariaLabel}>
      <span class="sr-only">{'\u00A0'}</span>
      <svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
        <circle r="11" />
        <circle r="11" />
      </svg>
    </div>
  );
}
