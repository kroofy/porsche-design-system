import { type FieldsetHTMLAttributes, forwardRef, type ReactNode } from 'react';
import {
  type FieldsetAppearanceProps,
  fieldsetAppearance,
} from '../../../../../components/src/elements/fieldset/fieldset.appearance';

export type PFieldsetProps = FieldsetAppearanceProps &
  Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, keyof FieldsetAppearanceProps> & {
    children?: ReactNode;
  };

export const PFieldset = forwardRef<HTMLFieldSetElement, PFieldsetProps>(function PFieldset(
  { labelSize, required = false, state, className, children, ...rest },
  ref
) {
  const appearance = fieldsetAppearance({ labelSize, required, state });

  return (
    <fieldset
      {...rest}
      {...appearance.attrs}
      ref={ref}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {children}
    </fieldset>
  );
});
