import { MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/assets';
import { ref } from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { forcedColorsMediaQuery } from '../../styles';
import { colorMap } from '../../styles/maps';
import { getCss } from '../../utils';
import {
  MODEL_SIGNATURE_COLORS,
  MODEL_SIGNATURE_ROOT_CLASS,
  type ModelSignatureColor,
} from './model-signature.appearance';
import { DEFAULT_MODEL_SIGNATURE_MODEL, nativeModelSignatureUrl } from './model-signature-url';

const cssVariableWidth = '--p-model-signature-width';
const cssVariableHeight = '--p-model-signature-height';
const cssVariableColor = '--p-model-signature-color';
const maskVar = '--_p-ms-mask';
const SAFE_ZONE_HEIGHT = 36;

const colorStyles = (color: ModelSignatureColor): JssStyle => ({
  background: ref(cssVariableColor, color === 'inherit' ? 'currentcolor' : colorMap[color]),
});

const maskStyles = (url: string): JssStyle => ({
  [maskVar]: `url("${url}")`,
});

const modelBox = (model: keyof typeof MODEL_SIGNATURES_MANIFEST, safeZone: boolean): JssStyle => {
  const { width, height } = MODEL_SIGNATURES_MANIFEST[model];
  return {
    width: ref(cssVariableWidth, `${width}px`),
    aspectRatio: `${width} / ${safeZone ? SAFE_ZONE_HEIGHT : height}`,
    ...maskStyles(nativeModelSignatureUrl(model)),
  };
};

const colorOverrides = (): JssStyle => {
  const styles: JssStyle = {};
  for (const color of MODEL_SIGNATURE_COLORS) {
    if (color === 'primary') {
      continue;
    }
    Object.assign(styles, { [`&[data-p-color="${color}"]`]: colorStyles(color) });
  }
  return styles;
};

const modelOverrides = (): JssStyle => {
  const styles: JssStyle = {};
  for (const model of Object.keys(MODEL_SIGNATURES_MANIFEST) as (keyof typeof MODEL_SIGNATURES_MANIFEST)[]) {
    if (model === DEFAULT_MODEL_SIGNATURE_MODEL) {
      continue;
    }
    Object.assign(styles, {
      [`&[data-p-model="${model}"]`]: modelBox(model, true),
      [`&[data-p-model="${model}"][data-p-safe-zone="false"]`]: {
        aspectRatio: `${MODEL_SIGNATURES_MANIFEST[model].width} / ${MODEL_SIGNATURES_MANIFEST[model].height}`,
      },
    });
  }
  const { width, height } = MODEL_SIGNATURES_MANIFEST[DEFAULT_MODEL_SIGNATURE_MODEL];
  Object.assign(styles, {
    '&[data-p-safe-zone="false"]': {
      aspectRatio: `${width} / ${height}`,
    },
  });
  return styles;
};

const getNativeModelSignatureStyles = (): Styles => ({
  [MODEL_SIGNATURE_ROOT_CLASS]: {
    display: 'inline-block',
    verticalAlign: 'top',
    maxWidth: '100%',
    maxHeight: '100%',
    height: ref(cssVariableHeight, 'auto'),
    overflow: 'hidden',
    objectPosition: '-9999px -9999px',
    ...modelBox(DEFAULT_MODEL_SIGNATURE_MODEL, true),
    ...colorStyles('primary'),
    WebkitMask: `${ref(maskVar)} no-repeat left top / contain`,
    mask: `${ref(maskVar)} no-repeat left top / contain`,
    ...forcedColorsMediaQuery({
      background: 'CanvasText',
    }),
    '&[hidden]': {
      display: 'none !important',
    },
    '&[data-p-size="inherit"]': {
      width: ref(cssVariableWidth, 'auto'),
    },
    ...colorOverrides(),
    ...modelOverrides(),
  } as JssStyle,
});

export const getNativeModelSignatureCss = (): string =>
  `.p-model-signature{color-scheme:inherit}\n@layer pds.elements {\n${getCss(getNativeModelSignatureStyles()).trim()}\n}\n`;
