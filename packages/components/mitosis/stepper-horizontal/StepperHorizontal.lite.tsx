import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-stepper-horizontal' });

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

const pick = (obj: any, key: any, fallback: any) => {
  if (obj && typeof obj === 'object') {
    if (obj[key] === undefined) return fallback;
    return obj[key];
  }
  return obj;
};

const fontFor = (s: any) => (s === 'medium' ? 'var(--p-typescale-md)' : 'var(--p-typescale-sm)');

const assignFont = (vars: Record<string, string>, bp: string, font: string) => {
  if (bp === 'base') {
    vars['--p-sh-fs'] = font;
    return;
  }
  vars[`--p-sh-fs-${bp}`] = font;
};

export default function LitStepperHorizontal(props: { size?: any }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const size = parse(props.size, 'small');
      const vars: Record<string, string> = {};
      if (typeof size === 'object' && size !== null) {
        let last = fontFor(pick(size, 'base', 'small'));
        for (const bp of BREAKPOINTS) {
          if (size[bp] !== undefined) last = fontFor(pick(size, bp, 'small'));
          assignFont(vars, bp, last);
        }
      } else {
        const font = fontFor(size);
        for (const bp of BREAKPOINTS) assignFont(vars, bp, font);
      }
      return vars;
    },
  });

  useStyle(`
    :host {
      display: grid;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    .wrap {
      display: contents;
    }
    .scroller {
      place-self: flex-start;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      font-size: var(--p-sh-fs, var(--p-typescale-sm));
    }
    @media (min-width: 480px) {
      .scroller {
        font-size: var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)));
      }
    }
    @media (min-width: 760px) {
      .scroller {
        font-size: var(--p-sh-fs-s, var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm))));
      }
    }
    @media (min-width: 1000px) {
      .scroller {
        font-size: var(--p-sh-fs-m, var(--p-sh-fs-s, var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)))));
      }
    }
    @media (min-width: 1300px) {
      .scroller {
        font-size: var(--p-sh-fs-l, var(--p-sh-fs-m));
      }
    }
    @media (min-width: 1760px) {
      .scroller {
        font-size: var(--p-sh-fs-xl, var(--p-sh-fs-l));
      }
    }
    @media (min-width: 1920px) {
      .scroller {
        font-size: var(--p-sh-fs-xxl, var(--p-sh-fs-xl));
      }
    }
  `);

  return (
    <div class="wrap">
      <p-scroller class="scroller">
        <slot />
      </p-scroller>
    </div>
  );
}
