import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-model-signature' });

const MANIFEST: Record<string, { src: string; width: number; height: number }> = {
  '718': { src: '718.493a9e3.svg', width: 79, height: 26 },
  '911': { src: '911.b68f913.svg', width: 94, height: 25 },
  boxster: { src: 'boxster.c321738.svg', width: 239, height: 26 },
  cayenne: { src: 'cayenne.2556201.svg', width: 245, height: 35 },
  cayman: { src: 'cayman.cc89196.svg', width: 229, height: 35 },
  'gt3-rs': { src: 'gt3-rs.03ac3ee.svg', width: 238, height: 25 },
  gt3: { src: 'gt3.bd3186c.svg', width: 151, height: 25 },
  gts: { src: 'gts.99bd35e.svg', width: 121, height: 25 },
  macan: { src: 'macan.a1844f4.svg', width: 196, height: 26 },
  panamera: { src: 'panamera.6dae809.svg', width: 260, height: 25 },
  taycan: { src: 'taycan.df444c6.svg', width: 167, height: 36 },
  'turbo-s': { src: 'turbo-s.73f1e10.svg', width: 199, height: 25 },
  turbo: { src: 'turbo.6a4084a.svg', width: 143, height: 25 },
};

const COLOR_MAP: Record<string, string> = {
  primary: 'var(--p-color-primary)',
  'contrast-low': 'var(--p-color-contrast-low)',
  'contrast-medium': 'var(--p-color-contrast-medium)',
  'contrast-high': 'var(--p-color-contrast-high)',
  inherit: 'currentcolor',
};

const isSafeZone = (raw: unknown) => {
  if (raw === undefined || raw === null || raw === '') return true;
  if (raw === false || raw === 'false') return false;
  return true;
};

export default function LitModelSignature(props: {
  model?: string;
  safeZone?: any;
  fetchPriority?: string;
  lazy?: any;
  size?: string;
  color?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const model = props.model || '911';
      const entry = MANIFEST[model] || MANIFEST['911'];
      const size = props.size || 'small';
      const color = props.color || 'primary';
      const src = 'http://localhost:3001/model-signatures/' + entry.src;
      return {
        '--p-model-signature-w': size === 'inherit' ? 'auto' : entry.width + 'px',
        '--p-model-signature-aspect': entry.width + ' / ' + (isSafeZone(props.safeZone) ? 36 : entry.height),
        '--p-model-signature-mask': 'url(' + src + ') no-repeat left top / contain',
        '--p-model-signature-fallback': COLOR_MAP[color] || COLOR_MAP.primary,
      };
    },
    get src(): string {
      const model = props.model || '911';
      const entry = MANIFEST[model] || MANIFEST['911'];
      return 'http://localhost:3001/model-signatures/' + entry.src;
    },
    get alt(): string {
      return props.model || '911';
    },
    get fetchPriorityAttr(): string | undefined {
      const fp = props.fetchPriority || 'auto';
      return fp !== 'auto' ? fp : undefined;
    },
    get loadingAttr(): string | undefined {
      const lazy = props.lazy;
      if (lazy === true || lazy === 'true' || lazy === '') return 'lazy';
      return undefined;
    },
  });

  useStyle(`
    :host {
      display: inline-block;
      vertical-align: top;
      max-width: 100%;
      max-height: 100%;
      width: var(--p-model-signature-width, var(--p-model-signature-w));
      height: var(--p-model-signature-height, auto);
      mask: var(--p-model-signature-mask) !important;
      aspect-ratio: var(--p-model-signature-aspect) !important;
      background: var(--p-model-signature-color, var(--p-model-signature-fallback, var(--p-color-primary))) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    ::slotted(:is(img, video)) {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
    }
    img {
      position: absolute;
      opacity: 0;
      width: 1px;
      height: 1px;
    }
    @media (forced-colors: active) {
      :host {
        background: CanvasText !important;
      }
    }
  `);

  return (
    <>
      <slot />
      <img src={state.src} alt={state.alt} fetchpriority={state.fetchPriorityAttr} loading={state.loadingAttr} />
    </>
  );
}
