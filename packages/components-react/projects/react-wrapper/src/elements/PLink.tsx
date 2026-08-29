import { type AnchorHTMLAttributes, forwardRef, type ReactNode } from 'react';
import {
  LINK_ICON_CLASS,
  LINK_LABEL_CLASS,
  type LinkAppearanceProps,
  linkAppearance,
} from '../../../../../components/src/elements/link';
import { PIcon } from './PIcon';

export type PLinkProps = LinkAppearanceProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkAppearanceProps> & {
    children?: ReactNode;
  };

export const PLink = forwardRef<HTMLAnchorElement, PLinkProps>(function PLink(
  { variant, icon = 'none', hideLabel, compact, className, children, ...rest },
  ref
) {
  const appearance = linkAppearance({ variant, icon, hideLabel, compact });

  return (
    <a
      {...rest}
      {...appearance.attrs}
      ref={ref}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {icon !== 'none' && (
        <PIcon className={LINK_ICON_CLASS} name={icon} size="inherit" color="inherit" aria-hidden="true" />
      )}
      <span className={LINK_LABEL_CLASS}>{children}</span>
    </a>
  );
});
