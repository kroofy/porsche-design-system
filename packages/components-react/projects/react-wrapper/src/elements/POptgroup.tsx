import { forwardRef, type OptgroupHTMLAttributes, type ReactNode } from 'react';
import { optgroupAppearance } from '../../../../../components/src/elements/input/input.appearance';

export type POptgroupProps = OptgroupHTMLAttributes<HTMLOptGroupElement> & {
  children?: ReactNode;
};

export const POptgroup = forwardRef<HTMLOptGroupElement, POptgroupProps>(function POptgroup(
  { className, children, ...rest },
  ref
) {
  const appearance = optgroupAppearance();

  return (
    <optgroup
      {...rest}
      {...appearance.attrs}
      ref={ref}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {children}
    </optgroup>
  );
});
