import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-tabs' });

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

export default function LitTabs(props: {
  size?: any;
  activeTabIndex?: any;
  background?: string;
  compact?: any;
  weight?: string;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const size = parse(props.size, 'small');
      const vars: Record<string, string> = {};
      if (typeof size === 'object' && size !== null) {
        let last = String(pick(size, 'base', 'small') || 'small');
        for (const bp of BREAKPOINTS) {
          if (size[bp] !== undefined) last = String(pick(size, bp, last));
          const key = bp === 'base' ? '--p-tabs-size' : `--p-tabs-size-${bp}`;
          vars[key] = last;
        }
      }
      return vars;
    },
    get sizeValue(): any {
      return props.size || 'small';
    },
    get backgroundValue(): any {
      return props.background || 'none';
    },
    get isCompact(): any {
      return props.compact === true || props.compact === 'true' || props.compact === '';
    },
    get activeIndex(): any {
      const raw = props.activeTabIndex;
      if (raw === undefined || raw === null || raw === '') return 0;
      const n = Number(raw);
      return Number.isInteger(n) ? n : 0;
    },
  });

  useStyle(`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    .root {
      margin-bottom: var(--p-spacing-static-sm);
    }
    .wrap {
      display: contents;
    }
  `);

  return (
    <div class="wrap">
      <p-tabs-bar class="root" size={state.sizeValue} background={state.backgroundValue} compact={state.isCompact} activeTabIndex={state.activeIndex}></p-tabs-bar>
      <slot />
    </div>
  );
}
