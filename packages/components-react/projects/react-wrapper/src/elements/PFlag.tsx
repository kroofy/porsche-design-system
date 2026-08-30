import { forwardRef, type ImgHTMLAttributes } from 'react';
import { type FlagAppearanceProps, flagAppearance } from '../../../../../components/src/elements/flag/flag.appearance';
import { DEFAULT_FLAG_NAME, nativeFlagUrl } from '../../../../../components/src/elements/flag/flag-url';

export type PFlagProps = FlagAppearanceProps &
  Omit<ImgHTMLAttributes<HTMLImageElement>, keyof FlagAppearanceProps | 'src'> & {
    name?: string;
  };

export const PFlag = forwardRef<HTMLImageElement, PFlagProps>(function PFlag(
  { name = DEFAULT_FLAG_NAME, size, className, alt, ...rest },
  ref
) {
  const appearance = flagAppearance({ size });

  return (
    <img
      {...rest}
      {...appearance.attrs}
      ref={ref}
      src={nativeFlagUrl(name)}
      alt={alt ?? ''}
      width={24}
      height={24}
      loading="lazy"
      className={[appearance.className, className].filter(Boolean).join(' ')}
    />
  );
});
