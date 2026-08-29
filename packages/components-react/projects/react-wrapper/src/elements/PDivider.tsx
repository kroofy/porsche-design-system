import { forwardRef, type HTMLAttributes } from 'react';
import {
  type DividerAppearanceProps,
  dividerAppearance,
} from '../../../../../components/src/elements/divider/divider.appearance';

export type PDividerProps = DividerAppearanceProps & Omit<HTMLAttributes<HTMLHRElement>, keyof DividerAppearanceProps>;

export const PDivider = forwardRef<HTMLHRElement, PDividerProps>(function PDivider(
  { color, direction, className, ...rest },
  ref
) {
  const appearance = dividerAppearance({ color, direction });

  return (
    <hr
      {...rest}
      {...appearance.attrs}
      ref={ref}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    />
  );
});
