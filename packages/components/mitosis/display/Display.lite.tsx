import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-display' });

const SIZE_MAP: Record<string, string> = {
  small: 'var(--p-typescale-3xl)',
  medium: 'var(--p-typescale-4xl)',
  large: 'var(--p-typescale-5xl)',
  inherit: 'inherit',
  '3xl': 'var(--p-typescale-3xl)',
  '4xl': 'var(--p-typescale-4xl)',
  '5xl': 'var(--p-typescale-5xl)',
};

const COLOR_MAP: Record<string, string> = {
  primary: 'var(--p-color-primary)',
  inherit: 'currentcolor',
};

const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

const fontFor = (size: unknown) => SIZE_MAP[String(size)] || SIZE_MAP.large;

const parseSize = (raw: unknown) => {
  if (raw === undefined || raw === null || raw === '') return 'large';
  if (typeof raw === 'string' && raw.charAt(0) === '{') {
    try {
      return JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));
    } catch {
      return 'large';
    }
  }
  return raw;
};

const assignFont = (vars: Record<string, string>, bp: string, font: string) => {
  const value = font === 'inherit' ? '' : font;
  if (bp === 'base') {
    vars['--p-display-fs'] = value;
    return;
  }
  vars[`--p-display-fs-${bp}`] = value;
};

export default function LitDisplay(props: { tag?: string; size?: any; align?: string; color?: string; ellipsis?: any }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const ellipsis = props.ellipsis === true || props.ellipsis === 'true' || props.ellipsis === '';
      const vars: Record<string, string> = {
        '--p-display-fg': COLOR_MAP[props.color || 'primary'] || COLOR_MAP.primary,
        '--p-display-align': props.align || 'start',
        '--p-display-max': ellipsis ? '100%' : '',
        '--p-display-overflow': ellipsis ? 'hidden' : '',
        '--p-display-ellipsis': ellipsis ? 'ellipsis' : '',
        '--p-display-ws': ellipsis ? 'nowrap' : '',
      };
      const size = parseSize(props.size);
      if (typeof size === 'object' && size !== null) {
        let last = fontFor(size.base || 'large');
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
      all: unset !important;
    }
    h3 {
      all: unset;
      display: block;
      font: var(--p-font-weight-normal) var(--p-typescale-5xl) / var(--p-leading-normal) var(--p-font-porsche-next);
      font-size: inherit;
      font-size: var(--p-display-fs);
      color: var(--p-display-fg);
      text-align: var(--p-display-align);
      max-width: var(--p-display-max);
      overflow: var(--p-display-overflow);
      text-overflow: var(--p-display-ellipsis);
      white-space: var(--p-display-ws);
    }
    @media (min-width: 480px) {
      h3 {
        font-size: var(--p-display-fs-xs, var(--p-display-fs));
      }
    }
    @media (min-width: 760px) {
      h3 {
        font-size: var(--p-display-fs-s, var(--p-display-fs));
      }
    }
    @media (min-width: 1000px) {
      h3 {
        font-size: var(--p-display-fs-m, var(--p-display-fs));
      }
    }
    @media (min-width: 1300px) {
      h3 {
        font-size: var(--p-display-fs-l, var(--p-display-fs));
      }
    }
    @media (min-width: 1760px) {
      h3 {
        font-size: var(--p-display-fs-xl, var(--p-display-fs));
      }
    }
    @media (min-width: 1920px) {
      h3 {
        font-size: var(--p-display-fs-xxl, var(--p-display-fs));
      }
    }
  `);

  return (
    <h3>
      <slot></slot>
    </h3>
  );
}
