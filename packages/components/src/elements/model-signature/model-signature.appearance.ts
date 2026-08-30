import type { NativeAppearance } from '../appearance';
import { DEFAULT_MODEL_SIGNATURE_MODEL } from './model-signature-url';

export const MODEL_SIGNATURE_ROOT_CLASS = 'p-model-signature' as const;

export const MODEL_SIGNATURE_SIZES = ['small', 'inherit'] as const;
export type ModelSignatureSize = (typeof MODEL_SIGNATURE_SIZES)[number];

export const MODEL_SIGNATURE_COLORS = [
  'primary',
  'contrast-low',
  'contrast-medium',
  'contrast-high',
  'inherit',
] as const;
export type ModelSignatureColor = (typeof MODEL_SIGNATURE_COLORS)[number];

export type ModelSignatureAppearanceProps = {
  model?: string;
  size?: ModelSignatureSize;
  color?: ModelSignatureColor;
  safeZone?: boolean;
};

const DEFAULT_SIZE: ModelSignatureSize = 'small';
const DEFAULT_COLOR: ModelSignatureColor = 'primary';

export const modelSignatureAppearance = (props: ModelSignatureAppearanceProps = {}): NativeAppearance => {
  const { model = DEFAULT_MODEL_SIGNATURE_MODEL, size = DEFAULT_SIZE, color = DEFAULT_COLOR, safeZone = true } = props;
  return {
    className: MODEL_SIGNATURE_ROOT_CLASS,
    attrs: {
      ...(model !== DEFAULT_MODEL_SIGNATURE_MODEL ? { 'data-p-model': model } : {}),
      ...(size !== DEFAULT_SIZE ? { 'data-p-size': size } : {}),
      ...(color !== DEFAULT_COLOR ? { 'data-p-color': color } : {}),
      ...(safeZone ? {} : { 'data-p-safe-zone': 'false' }),
    },
  };
};
