import { type CSSProperties, forwardRef, type ImgHTMLAttributes } from 'react';
import { type IconAppearanceProps, iconAppearance, nativeIconUrl } from '../../../../../components/src/elements/icon';

export type PIconProps = IconAppearanceProps &
  Omit<ImgHTMLAttributes<HTMLImageElement>, keyof IconAppearanceProps | 'src'> & {
    source?: string;
  };

export const PIcon = forwardRef<HTMLImageElement, PIconProps>(function PIcon(
  { name = 'arrow-right', source, color, size, className, alt, style, ...rest },
  ref
) {
  const appearance = iconAppearance({
    name: source ? undefined : name,
    color,
    size,
  });
  const url = source || nativeIconUrl(name);
  const maskStyle = {
    ['--_p-icon-mask' as string]: `url("${url}")`,
    ...style,
  } as CSSProperties;

  return (
    <img
      {...rest}
      {...appearance.attrs}
      ref={ref}
      src={url}
      alt={alt ?? ''}
      width={24}
      height={24}
      loading="lazy"
      className={[appearance.className, className].filter(Boolean).join(' ')}
      style={source ? maskStyle : style}
    />
  );
});
