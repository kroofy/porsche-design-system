import { forwardRef, type ReactNode, type Ref, type SVGAttributes } from 'react';
import {
  SPINNER_VIEWBOX,
  type SpinnerAppearanceProps,
  spinnerAppearance,
} from '../../../../../components/src/elements/spinner/spinner.appearance';

export type PSpinnerProps = SpinnerAppearanceProps &
  Omit<SVGAttributes<SVGSVGElement>, keyof SpinnerAppearanceProps> & {
    children?: ReactNode;
  };

export const PSpinner = forwardRef<SVGSVGElement, PSpinnerProps>(function PSpinner(
  { color, size, className, children, ...rest },
  ref
) {
  const appearance = spinnerAppearance({ color, size });
  const classNames = [appearance.className, className].filter(Boolean).join(' ');

  return (
    <svg
      role="alert"
      aria-live="assertive"
      focusable="false"
      {...rest}
      {...appearance.attrs}
      ref={ref as Ref<SVGSVGElement>}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={SPINNER_VIEWBOX}
      className={classNames}
    >
      <circle r="11" />
      <circle r="11" />
      {children}
    </svg>
  );
});
