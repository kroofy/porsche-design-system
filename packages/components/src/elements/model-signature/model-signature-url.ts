import { MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/assets';

export const PDS_CDN = 'https://cdn.ui.porsche.com/porsche-design-system';
export const DEFAULT_MODEL_SIGNATURE_MODEL = '911' as const;

export type ModelSignatureModel = keyof typeof MODEL_SIGNATURES_MANIFEST;

export const nativeModelSignatureUrl = (model: string): string => {
  const entry =
    MODEL_SIGNATURES_MANIFEST[model as ModelSignatureModel] ?? MODEL_SIGNATURES_MANIFEST[DEFAULT_MODEL_SIGNATURE_MODEL];
  return `${PDS_CDN}/model-signatures/${entry.src}`;
};
