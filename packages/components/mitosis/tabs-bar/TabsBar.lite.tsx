import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-tabs-bar' });

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

export default function LitTabsBar(props: {
  background?: string;
  size?: any;
  compact?: any;
  weight?: string;
  activeTabIndex?: any;
  aria?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const compact = isTrue(props.compact);
      const background = props.background || 'none';
      const hasBackground = background !== 'none';
      const size = parse(props.size, 'small');
      const fontFor = (s: any) => (s === 'medium' ? 'var(--p-typescale-md)' : 'var(--p-typescale-sm)');
      const radiusButton = hasBackground
        ? compact
          ? 'var(--p-radius-md)'
          : 'var(--p-radius-lg)'
        : compact
          ? 'var(--p-radius-lg)'
          : 'var(--p-radius-xl)';
      const tabPad = hasBackground
        ? compact
          ? 'calc(7 * var(--p-spacing-static-2xs) - var(--p-spacing-static-xs)) calc(var(--p-spacing-static-md) - var(--p-spacing-static-xs))'
          : 'calc(var(--p-spacing-static-md) - var(--p-spacing-static-xs)) calc(28 * var(--p-spacing-static-2xs) - var(--p-spacing-static-xs))'
        : compact
          ? 'calc(6 * var(--p-spacing-static-2xs)) var(--p-spacing-static-md)'
          : 'var(--p-spacing-static-md) calc(28 * var(--p-spacing-static-2xs))';
      const vars: Record<string, string> = {
        '--p-tb-radius': radiusButton,
        '--p-tb-pad': tabPad,
      };
      if (typeof size === 'object' && size !== null) {
        let last = String(pick(size, 'base', 'small') || 'small');
        for (const bp of BREAKPOINTS) {
          if (size[bp] !== undefined) last = String(pick(size, bp, last));
          const key = bp === 'base' ? '--p-tb-fs' : `--p-tb-fs-${bp}`;
          vars[key] = fontFor(last);
        }
      } else {
        const fs = fontFor(size);
        vars['--p-tb-fs'] = fs;
        for (const bp of BREAKPOINTS) {
          if (bp === 'base') continue;
          vars[`--p-tb-fs-${bp}`] = fs;
        }
      }
      if (hasBackground) {
        const bgMap: any = {
          canvas: 'var(--p-color-canvas)',
          surface: 'var(--p-color-surface)',
          frosted: 'var(--p-color-frosted)',
        };
        vars['--p-tb-scroller-bg'] = bgMap[background] || '';
        vars['--p-tb-scroller-pad'] = compact
          ? 'calc(3 * var(--p-spacing-static-2xs))'
          : 'var(--p-spacing-static-xs)';
        vars['--p-tb-scroller-radius'] = compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)';
      } else {
        vars['--p-tb-scroller-bg'] = '';
        vars['--p-tb-scroller-pad'] = '';
        vars['--p-tb-scroller-radius'] = '';
      }
      return vars;
    },
    get isCompact(): any {
      return props.compact === true || props.compact === 'true' || props.compact === '';
    },
  });

  useStyle(`
    :host {
      display: grid;
    }
    :host([hidden]) {
      display: none !important;
    }
    .wrap {
      display: contents;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    ::slotted(a),
    ::slotted(button) {
      all: unset !important;
      white-space: nowrap !important;
      cursor: pointer !important;
      border-radius: var(--p-tb-radius) !important;
      padding: var(--p-tb-pad) !important;
      font: var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important;
      font-size: var(--p-tb-fs) !important;
      color: var(--p-color-primary) !important;
      background: 0 0 / 0% 100% no-repeat !important;
      transition: background-color var(--p-duration-sm) var(--p-ease-in-out) !important;
    }
    ::slotted(a:focus-visible),
    ::slotted(button:focus-visible) {
      outline: 2px solid var(--p-color-focus) !important;
      outline-offset: 2px !important;
    }
    ::slotted(a[aria-current="true"]),
    ::slotted(button[aria-selected="true"]) {
      background-image: linear-gradient(var(--p-color-frosted-strong), var(--p-color-frosted-strong)) !important;
      background-size: 100% 100% !important;
      transition: background-size 0s linear var(--p-duration-md) !important;
    }
    @media (forced-colors: active) {
      ::slotted(a),
      ::slotted(button) {
        forced-color-adjust: none !important;
        background: Canvas !important;
      }
      ::slotted(a) {
        color: LinkText !important;
        box-shadow: inset 0 0 0 2px LinkText !important;
      }
      ::slotted(button) {
        color: ButtonText !important;
        box-shadow: inset 0 0 0 2px ButtonBorder !important;
      }
      ::slotted(a:focus-visible),
      ::slotted(button:focus-visible) {
        outline-color: Highlight !important;
      }
      .bar {
        display: none;
      }
      :host([background]:not([background="none"])) .scroller {
        forced-color-adjust: none;
        outline: 1px solid CanvasText;
      }
    }
    @media (hover: hover) {
      ::slotted(a:not([aria-current="true"]):hover),
      ::slotted(button:not([aria-selected="true"]):hover) {
        background-color: var(--p-color-frosted) !important;
      }
    }
    .scroller {
      --_p-scroller-focus-ring-radius: var(--p-tb-radius);
      place-self: flex-start;
    }
    :host([background]:not([background="none"])) .scroller {
      background: var(--p-tb-scroller-bg);
      padding: var(--p-tb-scroller-pad);
      border-radius: var(--p-tb-scroller-radius);
    }
    :host([background="frosted"]) .scroller {
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
    }
    .bar {
      position: absolute;
      inset-inline-start: 0;
      width: 0px;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      border-radius: var(--p-tb-radius);
      background: var(--p-color-frosted-strong);
    }
  `);

  return (
    <div class="wrap">
      <p-scroller class="scroller">
        <slot />
        <span class="bar" />
      </p-scroller>
    </div>
  );
}
