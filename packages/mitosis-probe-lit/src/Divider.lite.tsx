import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

export type DividerColor = 'contrast-lower' | 'contrast-low' | 'contrast-medium' | 'contrast-high';
export type DividerDirection = 'horizontal' | 'vertical';

useMetadata({ tagName: 'lit-divider' });

const COLOR: Record<string, string> = {
  'contrast-lower': 'var(--p-color-contrast-lower)',
  'contrast-low': 'var(--p-color-contrast-low)',
  'contrast-medium': 'var(--p-color-contrast-medium)',
  'contrast-high': 'var(--p-color-contrast-high)',
};

const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

const sizeFor = (direction: string) =>
  direction === 'vertical' ? { h: '100%', w: '1px' } : { h: '1px', w: '100%' };

const parseDirection = (raw: unknown) => {
  if (raw === undefined || raw === null || raw === '') return 'horizontal';
  if (typeof raw === 'string' && raw.charAt(0) === '{') {
    try {
      return JSON.parse(raw);
    } catch {
      return 'horizontal';
    }
  }
  return raw;
};

const assignSize = (vars: Record<string, string>, bp: string, size: { h: string; w: string }) => {
  if (bp === 'base') {
    vars['--p-divider-h'] = size.h;
    vars['--p-divider-w'] = size.w;
    return;
  }
  vars[`--p-divider-h-${bp}`] = size.h;
  vars[`--p-divider-w-${bp}`] = size.w;
};

useStyle(`
  :host {
    display: block;
  }
  :host([hidden]) {
    display: none !important;
  }
  hr {
    all: unset;
    display: block;
    background: var(--p-divider-bg);
    height: var(--p-divider-h, 1px);
    width: var(--p-divider-w, 100%);
  }
  @media (forced-colors: active) {
    hr {
      background: CanvasText;
    }
  }
  @media (min-width: 480px) {
    hr {
      height: var(--p-divider-h-xs, var(--p-divider-h, 1px));
      width: var(--p-divider-w-xs, var(--p-divider-w, 100%));
    }
  }
  @media (min-width: 760px) {
    hr {
      height: var(--p-divider-h-s, var(--p-divider-h, 1px));
      width: var(--p-divider-w-s, var(--p-divider-w, 100%));
    }
  }
  @media (min-width: 1000px) {
    hr {
      height: var(--p-divider-h-m, var(--p-divider-h, 1px));
      width: var(--p-divider-w-m, var(--p-divider-w, 100%));
    }
  }
  @media (min-width: 1300px) {
    hr {
      height: var(--p-divider-h-l, var(--p-divider-h, 1px));
      width: var(--p-divider-w-l, var(--p-divider-w, 100%));
    }
  }
  @media (min-width: 1760px) {
    hr {
      height: var(--p-divider-h-xl, var(--p-divider-h, 1px));
      width: var(--p-divider-w-xl, var(--p-divider-w, 100%));
    }
  }
  @media (min-width: 1920px) {
    hr {
      height: var(--p-divider-h-xxl, var(--p-divider-h, 1px));
      width: var(--p-divider-w-xxl, var(--p-divider-w, 100%));
    }
  }
`);

export default function LitDivider(props: { color?: DividerColor; direction?: any }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const vars: Record<string, string> = {
        '--p-divider-bg': COLOR[props.color || 'contrast-lower'] || COLOR['contrast-lower'],
      };
      const direction = parseDirection(props.direction);
      if (typeof direction === 'object' && direction !== null) {
        let last = sizeFor(direction.base || 'horizontal');
        for (const bp of BREAKPOINTS) {
          if (direction[bp] !== undefined) last = sizeFor(direction[bp]);
          assignSize(vars, bp, last);
        }
      } else {
        assignSize(vars, 'base', sizeFor(String(direction)));
      }
      return vars;
    },
  });

  return <hr />;
}
