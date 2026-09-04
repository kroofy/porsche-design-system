import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-flag' });

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
    vars['--p-flag-fs'] = value;
    return;
  }
  vars[`--p-flag-fs-${bp}`] = value;
};

export default function LitFlag(props: { name?: string; size?: any; aria?: any }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const vars: Record<string, string> = {};
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
    get src(): string {
      const files: any = {
        de: 'de.b575e11.svg',
        ch: 'ch.1cc9a58.svg',
        pt: 'pt.c903b10.svg',
        xx: 'xx.acc7ae8.svg',
      };
      const name = props.name || 'de';
      return 'http://localhost:3001/flags/' + (files[name] || files.xx);
    },
    get alt(): string {
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
    img {
      display: block;
      margin: 0;
      padding: 1px;
      border: 0;
      outline: 0;
      overflow: hidden;
      box-sizing: border-box;
      pointer-events: none;
      width: var(--p-flag-size, var(--p-leading-normal));
      height: var(--p-flag-size, var(--p-leading-normal));
      font-family: var(--p-font-porsche-next);
      font-size: inherit;
      font-size: var(--p-flag-fs);
    }
    @media (min-width: 480px) {
      img {
        font-size: var(--p-flag-fs-xs, var(--p-flag-fs));
      }
    }
    @media (min-width: 760px) {
      img {
        font-size: var(--p-flag-fs-s, var(--p-flag-fs));
      }
    }
    @media (min-width: 1000px) {
      img {
        font-size: var(--p-flag-fs-m, var(--p-flag-fs));
      }
    }
    @media (min-width: 1300px) {
      img {
        font-size: var(--p-flag-fs-l, var(--p-flag-fs));
      }
    }
    @media (min-width: 1760px) {
      img {
        font-size: var(--p-flag-fs-xl, var(--p-flag-fs));
      }
    }
    @media (min-width: 1920px) {
      img {
        font-size: var(--p-flag-fs-xxl, var(--p-flag-fs));
      }
    }
  `);

  return <img src={state.src} width="24" height="24" loading="lazy" alt={state.alt} />;
}
