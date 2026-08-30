import { CRESTS_MANIFEST } from '@porsche-design-system/assets';

export const PDS_CDN = 'https://cdn.ui.porsche.com/porsche-design-system';

export const CREST_WIDTH = 30;
export const CREST_HEIGHT = 40;

export const nativeCrestSrcSet = (format: 'png' | 'webp'): string =>
  Object.entries(CRESTS_MANIFEST.porscheCrest)
    .map(([resolution, fileName]) => `${PDS_CDN}/crest/${fileName[format]} ${resolution}`)
    .join();

export const nativeCrestImgSrc = (): string => `${PDS_CDN}/crest/${CRESTS_MANIFEST.porscheCrest['2x'].png}`;
