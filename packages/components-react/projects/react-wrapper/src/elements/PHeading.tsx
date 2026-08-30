import { createElement, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  type HeadingAppearanceProps,
  type HeadingTag,
  headingAppearance,
  headingTagForSize,
} from '../../../../../components/src/elements/heading/heading.appearance';

export type PHeadingProps = HeadingAppearanceProps &
  Omit<HTMLAttributes<HTMLHeadingElement>, keyof HeadingAppearanceProps> & {
    tag?: HeadingTag;
    children?: ReactNode;
  };

export const PHeading = forwardRef<HTMLHeadingElement, PHeadingProps>(function PHeading(
  { size, weight, align, color, hyphens, ellipsis = false, tag, className, children, ...rest },
  ref
) {
  const appearance = headingAppearance({ size, weight, align, color, hyphens, ellipsis });
  const Tag = headingTagForSize(size, tag);

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
