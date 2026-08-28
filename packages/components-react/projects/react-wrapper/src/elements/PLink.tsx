import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import {
  LINK_LABEL_CLASS,
  linkAppearance,
  type LinkAppearanceProps,
} from '../../../../../components/src/elements/link';

export type PLinkProps = LinkAppearanceProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkAppearanceProps> & {
    children?: ReactNode;
  };

export const PLink = forwardRef<HTMLAnchorElement, PLinkProps>(function PLink(
  { variant, icon, hideLabel, compact, className, children, ...rest },
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
      <span className={LINK_LABEL_CLASS}>{children}</span>
    </a>
  );
});
