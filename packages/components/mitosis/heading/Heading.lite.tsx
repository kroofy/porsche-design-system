import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-heading' });

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
  inherit: 'currentcolor',
};

const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

const fontFor = (size: unknown) => SIZE_MAP[String(size)] || SIZE_MAP['2xl'];

const parseSize = (raw: unknown) => {
  if (raw === undefined || raw === null || raw === '') return '2xl';
  if (typeof raw === 'string' && raw.charAt(0) === '{') {
    try {
      return JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));
    } catch {
      return '2xl';
    }
  }
  return raw;
};

const assignFont = (vars: Record<string, string>, bp: string, font: string) => {
  const value = font === 'inherit' ? '' : font;
  if (bp === 'base') {
    vars['--p-heading-fs'] = value;
    return;
  }
  vars[`--p-heading-fs-${bp}`] = value;
};

export default function LitHeading(props: {
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
      const hyphens = props.hyphens || 'none';
      const ellipsis = props.ellipsis === true || props.ellipsis === 'true' || props.ellipsis === '';
      const vars: Record<string, string> = {
        '--p-heading-weight': WEIGHT_MAP[props.weight || 'normal'] || WEIGHT_MAP.normal,
        '--p-heading-fg': COLOR_MAP[props.color || 'primary'] || COLOR_MAP.primary,
        '--p-heading-align': props.align || 'start',
        '--p-heading-hyphens': hyphens,
        '--p-heading-wrap': hyphens === 'auto' || hyphens === 'manual' ? 'break-word' : '',
        '--p-heading-max': ellipsis ? '100%' : '',
        '--p-heading-overflow': ellipsis ? 'hidden' : '',
        '--p-heading-ellipsis': ellipsis ? 'ellipsis' : '',
        '--p-heading-ws': ellipsis ? 'nowrap' : '',
      };
      const size = parseSize(props.size);
      if (typeof size === 'object' && size !== null) {
        let last = fontFor(size.base || '2xl');
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
    ::slotted(:is(h1, h2, h3, h4, h5, h6)) {
      all: unset;
    }
    h2 {
      all: unset;
      display: block;
      font: var(--p-heading-weight) var(--p-typescale-2xl) / var(--p-leading-normal) var(--p-font-porsche-next);
      font-size: inherit;
      font-size: var(--p-heading-fs);
      color: var(--p-heading-fg);
      text-align: var(--p-heading-align);
      hyphens: var(--p-heading-hyphens);
      overflow-wrap: var(--p-heading-wrap);
      max-width: var(--p-heading-max);
      overflow: var(--p-heading-overflow);
      text-overflow: var(--p-heading-ellipsis);
      white-space: var(--p-heading-ws);
    }
    @media (min-width: 480px) {
      h2 {
        font-size: var(--p-heading-fs-xs, var(--p-heading-fs));
      }
    }
    @media (min-width: 760px) {
      h2 {
        font-size: var(--p-heading-fs-s, var(--p-heading-fs));
      }
    }
    @media (min-width: 1000px) {
      h2 {
        font-size: var(--p-heading-fs-m, var(--p-heading-fs));
      }
    }
    @media (min-width: 1300px) {
      h2 {
        font-size: var(--p-heading-fs-l, var(--p-heading-fs));
      }
    }
    @media (min-width: 1760px) {
      h2 {
        font-size: var(--p-heading-fs-xl, var(--p-heading-fs));
      }
    }
    @media (min-width: 1920px) {
      h2 {
        font-size: var(--p-heading-fs-xxl, var(--p-heading-fs));
      }
    }
  `);

  return (
    <h2>
      <slot></slot>
    </h2>
  );
}
