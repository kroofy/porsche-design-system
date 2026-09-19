import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-icon' });

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
  'contrast-higher': 'var(--p-color-contrast-higher)',
  'contrast-high': 'var(--p-color-contrast-high)',
  'contrast-medium': 'var(--p-color-contrast-medium)',
  'contrast-low': 'var(--p-color-contrast-low)',
  'contrast-lower': 'var(--p-color-contrast-lower)',
  success: 'var(--p-color-success)',
  warning: 'var(--p-color-warning)',
  error: 'var(--p-color-error)',
  info: 'var(--p-color-info)',
  inherit: 'currentcolor',
};

const FLIPPABLE: Record<string, number> = {
  'arrow-compact-left': 1,
  'arrow-compact-right': 1,
  'arrow-double-left': 1,
  'arrow-double-right': 1,
  'arrow-first': 1,
  'arrow-head-left': 1,
  'arrow-head-right': 1,
  'arrow-last': 1,
  'arrow-left': 1,
  'arrow-right': 1,
  chart: 1,
  chat: 1,
  copy: 1,
  external: 1,
  increase: 1,
  list: 1,
  logout: 1,
  return: 1,
  send: 1,
};

const FILES: Record<string, string> = {
  car: 'car.35229c9.svg',
  'arrow-right': 'arrow-right.872716b.svg',
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
    vars['--p-icon-fs'] = value;
    return;
  }
  vars[`--p-icon-fs-${bp}`] = value;
};

const resolveSrc = (name?: string, source?: string) => {
  if (source && /(\/)/.test(source)) return source;
  const key = name || 'arrow-right';
  return 'http://localhost:3001/icons/' + (FILES[key] || FILES['arrow-right']);
};

export default function LitIcon(props: { name?: string; source?: string; color?: string; size?: any; aria?: any }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const source = props.source || '';
      const name = props.name || 'arrow-right';
      const src = resolveSrc(name, source);
      const vars: Record<string, string> = {
        '--p-icon-fallback': COLOR_MAP[props.color || 'primary'] || COLOR_MAP.primary,
        '--p-icon-mask': 'url("' + src + '") center/contain no-repeat',
        '--p-icon-flip': !source && FLIPPABLE[name] ? 'scaleX(-1)' : 'none',
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
    get src(): string {
      return resolveSrc(props.name, props.source);
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
      padding: 0;
      border: 0;
      outline: 0;
      overflow: hidden;
      object-position: -9999px -9999px;
      pointer-events: none;
      width: var(--p-icon-size, var(--p-leading-normal));
      height: var(--p-icon-size, var(--p-leading-normal));
      font-family: var(--p-font-porsche-next);
      font-size: inherit;
      font-size: var(--p-icon-fs);
      -webkit-mask: var(--p-icon-mask);
      mask: var(--p-icon-mask);
      background: var(--p-icon-color, var(--p-icon-fallback, var(--p-color-primary)));
    }
    @media (forced-colors: active) {
      img {
        background: CanvasText;
      }
    }
    img:dir(rtl) {
      transform: var(--p-icon-flip, none);
    }
    @media (min-width: 480px) {
      img {
        font-size: var(--p-icon-fs-xs, var(--p-icon-fs));
      }
    }
    @media (min-width: 760px) {
      img {
        font-size: var(--p-icon-fs-s, var(--p-icon-fs));
      }
    }
    @media (min-width: 1000px) {
      img {
        font-size: var(--p-icon-fs-m, var(--p-icon-fs));
      }
    }
    @media (min-width: 1300px) {
      img {
        font-size: var(--p-icon-fs-l, var(--p-icon-fs));
      }
    }
    @media (min-width: 1760px) {
      img {
        font-size: var(--p-icon-fs-xl, var(--p-icon-fs));
      }
    }
    @media (min-width: 1920px) {
      img {
        font-size: var(--p-icon-fs-xxl, var(--p-icon-fs));
      }
    }
  `);

  return <img src={state.src} width="24" height="24" loading="lazy" alt={state.alt} />;
}
