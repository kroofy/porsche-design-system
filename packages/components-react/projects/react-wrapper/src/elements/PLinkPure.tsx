import { type AnchorHTMLAttributes, forwardRef, type ReactNode } from 'react';
import {
  LINK_PURE_ICON_CLASS,
  LINK_PURE_LABEL_CLASS,
  type LinkPureAppearanceProps,
  linkPureAppearance,
} from '../../../../../components/src/elements/link-pure/link-pure.appearance';
import { PIcon } from './PIcon';

export type PLinkPureProps = LinkPureAppearanceProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkPureAppearanceProps> & {
    iconSource?: string;
    children?: ReactNode;
  };

export const PLinkPure = forwardRef<HTMLAnchorElement, PLinkPureProps>(function PLinkPure(
  {
    size,
    color,
    icon = 'arrow-right',
    iconSource,
    hideLabel,
    alignLabel,
    stretch,
    underline = false,
    active = false,
    className,
    children,
    ...rest
  },
  ref
) {
  const appearance = linkPureAppearance({
    size,
    color,
    icon,
    hideLabel,
    alignLabel,
    stretch,
    underline,
    active,
  });
  const showIcon = icon !== 'none' || Boolean(iconSource);

  return (
    <a
      {...rest}
      {...appearance.attrs}
      ref={ref}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {showIcon && (
        <PIcon
          className={LINK_PURE_ICON_CLASS}
          name={icon === 'none' ? 'arrow-right' : icon}
          source={iconSource}
          size="inherit"
          color="inherit"
          aria-hidden="true"
        />
      )}
      <span className={LINK_PURE_LABEL_CLASS}>{children}</span>
    </a>
  );
});
