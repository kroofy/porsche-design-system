import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-link-tile-product' });

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

export default function LitLinkTileProduct(props: {
  heading?: string;
  price?: string;
  priceOriginal?: string;
  description?: string;
  likeButton?: any;
  liked?: any;
  href?: string;
  aspectRatio?: any;
  target?: string;
  rel?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const aspectRatio = parse(props.aspectRatio, '3/4');
      const vars: Record<string, string> = {};
      if (typeof aspectRatio === 'object' && aspectRatio !== null) {
        let last = pick(aspectRatio, 'base', '3/4');
        for (const bp of BREAKPOINTS) {
          if (aspectRatio[bp] !== undefined) last = pick(aspectRatio, bp, last);
          const s = bp === 'base' ? '' : `-${bp}`;
          vars[`--p-ltp-ar${s}`] = String(last);
        }
      } else {
        for (const bp of BREAKPOINTS) {
          const s = bp === 'base' ? '' : `-${bp}`;
          vars[`--p-ltp-ar${s}`] = String(aspectRatio || '3/4');
        }
      }
      return vars;
    },
    get headingText(): string {
      return props.heading || '';
    },
    get priceText(): string {
      return props.price || '';
    },
  });

  useStyle(`
    :host {
      display: block;
      position: relative;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    slot[name="header"] {
      display: block;
    }
    ::slotted([slot="header"]) {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: var(--p-spacing-fluid-xs) !important;
    }
    ::slotted(:is(img, picture)) {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      border-radius: var(--p-radius-2xl) !important;
      overflow: hidden !important;
    }
    :host(:not([href])) ::slotted(a[slot="anchor"]) {
      position: absolute !important;
      inset: 0 !important;
      z-index: 1 !important;
      border-radius: var(--p-radius-3xl) !important;
      text-indent: -999999px !important;
    }
    :host(:not([href])) ::slotted(a[slot="anchor"]:focus-visible) {
      outline: 2px solid var(--p-color-focus) !important;
      outline-offset: 2px !important;
    }
    :host([price-original]) s {
      color: var(--p-color-contrast-medium);
    }
    .root {
      display: flex;
      flex-direction: column;
      aspect-ratio: var(--p-ltp-ar);
      overflow: hidden;
      box-sizing: border-box;
      border-radius: var(--p-radius-3xl);
      padding: var(--p-spacing-fluid-sm);
      color: var(--p-color-primary);
      background-color: var(--p-color-surface);
    }
    :host([href]) .anchor {
      position: absolute;
      inset: 0;
      z-index: 1;
      border-radius: var(--p-radius-3xl);
    }
    :host([href]) .anchor:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    .header {
      display: flex;
      gap: var(--p-spacing-fluid-sm);
      justify-content: space-between;
      align-items: flex-start;
    }
    .button {
      position: relative;
      z-index: 2;
    }
    :host([like-button="false"]) .button {
      display: none;
    }
    .image {
      aspect-ratio: 8 / 9;
      margin: var(--p-spacing-fluid-sm) auto var(--p-spacing-fluid-xs);
      overflow: hidden;
      transition: transform var(--p-transition-duration, var(--p-duration-md)) var(--p-ease-in-out);
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      margin: auto;
      text-align: center;
    }
    .heading {
      margin: 0 0 2px;
      font: var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .price {
      margin: 0;
      font: var(--p-font-weight-normal) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next);
    }
    :host([price-original]) .price {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      column-gap: var(--p-spacing-fluid-xs);
    }
    .description {
      margin: 0;
      font: var(--p-font-weight-normal) var(--p-typescale-2xs) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-contrast-high);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
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
    @media (min-width: 760px) {
      .image {
        padding: 0 var(--p-spacing-fluid-md);
      }
      .root {
        aspect-ratio: var(--p-ltp-ar-s, var(--p-ltp-ar));
      }
    }
    @media (min-width: 480px) {
      .root {
        aspect-ratio: var(--p-ltp-ar-xs, var(--p-ltp-ar));
      }
    }
    @media (min-width: 1000px) {
      .root {
        aspect-ratio: var(--p-ltp-ar-m, var(--p-ltp-ar));
      }
    }
    @media (min-width: 1300px) {
      .root {
        aspect-ratio: var(--p-ltp-ar-l, var(--p-ltp-ar));
      }
    }
    @media (min-width: 1760px) {
      .root {
        aspect-ratio: var(--p-ltp-ar-xl, var(--p-ltp-ar));
      }
    }
    @media (min-width: 1920px) {
      .root {
        aspect-ratio: var(--p-ltp-ar-xxl, var(--p-ltp-ar));
      }
    }
    @media (forced-colors: active) {
      :host(:not([href])) ::slotted(a[slot="anchor"]:focus-visible) {
        outline-color: Highlight !important;
      }
      :host(:not([href])) ::slotted(a[slot="anchor"]) {
        forced-color-adjust: none !important;
        box-shadow: inset 0 0 0 2px LinkText !important;
      }
      :host([href]) .anchor {
        forced-color-adjust: none;
        box-shadow: inset 0 0 0 2px LinkText;
      }
      :host([href]) .anchor:focus-visible {
        outline-color: Highlight;
      }
    }
    @media (hover: hover) {
      .root:hover .image {
        transform: scale3d(1.05, 1.05, 1.05);
      }
    }
  `);

  return (
    <div class="root">
      <div class="image">
        <slot />
      </div>
      <div class="wrapper">
        <h3 class="heading">{state.headingText}</h3>
        <p class="price">{state.priceText}</p>
      </div>
    </div>
  );
}
