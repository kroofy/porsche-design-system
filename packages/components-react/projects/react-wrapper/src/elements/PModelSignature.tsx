import { forwardRef, type ImgHTMLAttributes } from 'react';
import {
  type ModelSignatureAppearanceProps,
  modelSignatureAppearance,
} from '../../../../../components/src/elements/model-signature/model-signature.appearance';
import {
  DEFAULT_MODEL_SIGNATURE_MODEL,
  nativeModelSignatureUrl,
} from '../../../../../components/src/elements/model-signature/model-signature-url';

export type PModelSignatureProps = ModelSignatureAppearanceProps &
  Omit<ImgHTMLAttributes<HTMLImageElement>, keyof ModelSignatureAppearanceProps | 'src'>;

export const PModelSignature = forwardRef<HTMLImageElement, PModelSignatureProps>(function PModelSignature(
  { model = DEFAULT_MODEL_SIGNATURE_MODEL, size, color, safeZone, className, alt, ...rest },
  ref
) {
  const appearance = modelSignatureAppearance({ model, size, color, safeZone });

  return (
    <img
      {...rest}
      {...appearance.attrs}
      ref={ref}
      src={nativeModelSignatureUrl(model)}
      alt={alt ?? model}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    />
  );
});
