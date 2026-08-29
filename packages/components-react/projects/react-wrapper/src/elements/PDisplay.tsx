import { createElement, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  type DisplayAppearanceProps,
  type DisplayTag,
  displayAppearance,
  displayTagForSize,
} from '../../../../../components/src/elements/display/display.appearance';

export type PDisplayProps = DisplayAppearanceProps &
  Omit<HTMLAttributes<HTMLHeadingElement>, keyof DisplayAppearanceProps> & {
    tag?: DisplayTag;
    children?: ReactNode;
  };

export const PDisplay = forwardRef<HTMLHeadingElement, PDisplayProps>(function PDisplay(
  { size, align, color, ellipsis = false, tag, className, children, ...rest },
  ref
) {
  const appearance = displayAppearance({ size, align, color, ellipsis });
  const Tag = displayTagForSize(size, tag);

  return createElement(
    Tag,
    {
      ...rest,
      ...appearance.attrs,
      ref,
      className: [appearance.className, className].filter(Boolean).join(' '),
    },
    children
  );
});
