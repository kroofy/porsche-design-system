import { forwardRef, type LiHTMLAttributes, type ReactNode } from 'react';
import { textListItemAppearance } from '../../../../../components/src/elements/text-list/text-list.appearance';

export type PTextListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  children?: ReactNode;
};

export const PTextListItem = forwardRef<HTMLLIElement, PTextListItemProps>(function PTextListItem(
  { className, children, ...rest },
  ref
) {
  const appearance = textListItemAppearance();

  return (
    <li
      {...rest}
      {...appearance.attrs}
      ref={ref}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {children}
    </li>
  );
});
