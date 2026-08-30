import { type DetailsHTMLAttributes, forwardRef, type ReactNode } from 'react';
import {
  type AccordionAppearanceProps,
  accordionAppearance,
} from '../../../../../components/src/elements/accordion/accordion.appearance';

export type PAccordionProps = AccordionAppearanceProps &
  Omit<DetailsHTMLAttributes<HTMLDetailsElement>, keyof AccordionAppearanceProps> & {
    children?: ReactNode;
  };

export const PAccordion = forwardRef<HTMLDetailsElement, PAccordionProps>(function PAccordion(
  { alignMarker, background, compact = false, indent, sticky = false, size, className, children, ...rest },
  ref
) {
  const appearance = accordionAppearance({ alignMarker, background, compact, indent, sticky, size });

  return (
    <details
      {...rest}
      {...appearance.attrs}
      ref={ref}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {children}
    </details>
  );
});
