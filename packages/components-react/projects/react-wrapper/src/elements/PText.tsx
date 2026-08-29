import { createElement, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  type TextAppearanceProps,
  type TextTag,
  textAppearance,
} from '../../../../../components/src/elements/text/text.appearance';

export type PTextProps = TextAppearanceProps &
  Omit<HTMLAttributes<HTMLElement>, keyof TextAppearanceProps> & {
    tag?: TextTag;
    children?: ReactNode;
  };

export const PText = forwardRef<HTMLElement, PTextProps>(function PText(
  { size, weight, align, color, hyphens, ellipsis = false, tag = 'p', className, children, ...rest },
  ref
) {
  const appearance = textAppearance({ size, weight, align, color, hyphens, ellipsis });

  return createElement(
    tag,
    {
      ...rest,
      ...appearance.attrs,
      ref,
      className: [appearance.className, className].filter(Boolean).join(' '),
    },
    children
  );
});
