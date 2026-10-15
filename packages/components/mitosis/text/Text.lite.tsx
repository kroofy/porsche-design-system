import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-text' });

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

const WEIGHT_MAP: Record<string, string> = {
  regular: 'var(--p-font-weight-normal)',
  normal: 'var(--p-font-weight-normal)',
  'semi-bold': 'var(--p-font-weight-semibold)',
  semibold: 'var(--p-font-weight-semibold)',
  bold: 'var(--p-font-weight-bold)',
};

const COLOR_MAP: Record<string, string> = {
  primary: 'var(--p-color-primary)',
  'contrast-higher': 'var(--p-color-contrast-higher)',
  'contrast-high': 'var(--p-color-contrast-high)',
  'contrast-medium': 'var(--p-color-contrast-medium)',
  success: 'var(--p-color-success)',
  warning: 'var(--p-color-warning)',
  error: 'var(--p-color-error)',
  info: 'var(--p-color-info)',
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
  const value = font === 'inherit' ? '' : font;
  if (bp === 'base') {
    vars['--p-text-fs'] = value;
    return;
  }
  vars[`--p-text-fs-${bp}`] = value;
};

export default function LitText(props: {
  tag?: string;
  size?: any;
  weight?: string;
  align?: string;
  color?: string;
  hyphens?: string;
  ellipsis?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const hyphens = props.hyphens || 'inherit';
      const ellipsis = props.ellipsis === true || props.ellipsis === 'true' || props.ellipsis === '';
      const vars: Record<string, string> = {
        '--p-text-weight': WEIGHT_MAP[props.weight || 'normal'] || WEIGHT_MAP.normal,
        '--p-text-fg': COLOR_MAP[props.color || 'primary'] || COLOR_MAP.primary,
        '--p-text-align': props.align || 'start',
        '--p-text-hyphens': hyphens === 'inherit' ? '' : hyphens,
        '--p-text-wrap': hyphens === 'auto' || hyphens === 'manual' ? 'break-word' : '',
        '--p-text-max': ellipsis ? '100%' : '',
        '--p-text-overflow': ellipsis ? 'hidden' : '',
        '--p-text-ellipsis': ellipsis ? 'ellipsis' : '',
        '--p-text-ws': ellipsis ? 'nowrap' : '',
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
  });

  useStyle(`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none !important;
    }
    ::slotted(:is(p, span, div, address, blockquote, figcaption, cite, time, legend)) {
      all: unset;
    }
    p {
      all: unset;
      display: block;
      font: var(--p-text-weight) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      font-size: inherit;
      font-size: var(--p-text-fs);
      color: var(--p-text-fg);
      text-align: var(--p-text-align);
      hyphens: inherit;
      hyphens: var(--p-text-hyphens);
      overflow-wrap: var(--p-text-wrap);
      max-width: var(--p-text-max);
      overflow: var(--p-text-overflow);
      text-overflow: var(--p-text-ellipsis);
      white-space: var(--p-text-ws);
    }
    @media (min-width: 480px) {
      p {
        font-size: var(--p-text-fs-xs, var(--p-text-fs));
      }
    }
    @media (min-width: 760px) {
      p {
        font-size: var(--p-text-fs-s, var(--p-text-fs));
      }
    }
    @media (min-width: 1000px) {
      p {
        font-size: var(--p-text-fs-m, var(--p-text-fs));
      }
    }
    @media (min-width: 1300px) {
      p {
        font-size: var(--p-text-fs-l, var(--p-text-fs));
      }
    }
    @media (min-width: 1760px) {
      p {
        font-size: var(--p-text-fs-xl, var(--p-text-fs));
      }
    }
    @media (min-width: 1920px) {
      p {
        font-size: var(--p-text-fs-xxl, var(--p-text-fs));
      }
    }
  `);

  return (
    <p>
      <slot></slot>
    </p>
  );
}
