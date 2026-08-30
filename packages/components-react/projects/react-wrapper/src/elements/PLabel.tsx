import { forwardRef, type LabelHTMLAttributes, type ReactNode } from 'react';
import {
  LABEL_REQUIRED_CLASS,
  type LabelAppearanceProps,
  labelAppearance,
} from '../../../../../components/src/elements/label/label.appearance';

export type PLabelProps = LabelAppearanceProps &
  Omit<LabelHTMLAttributes<HTMLLabelElement>, keyof LabelAppearanceProps> & {
    required?: boolean;
    children?: ReactNode;
  };

export const PLabel = forwardRef<HTMLLabelElement, PLabelProps>(function PLabel(
  { hideLabel, required = false, className, children, ...rest },
  ref
) {
  const appearance = labelAppearance({ hideLabel });

  return (
    <label
      {...rest}
      {...appearance.attrs}
      ref={ref}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {children}
      {required ? (
        <span className={LABEL_REQUIRED_CLASS} aria-hidden="true">
          {' '}
          *
        </span>
      ) : null}
    </label>
  );
});
