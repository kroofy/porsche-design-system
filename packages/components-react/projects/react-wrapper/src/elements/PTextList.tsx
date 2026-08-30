import { createElement, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  type TextListAppearanceProps,
  type TextListTag,
  textListAppearance,
  textListTagForType,
} from '../../../../../components/src/elements/text-list/text-list.appearance';

export type PTextListProps = TextListAppearanceProps &
  Omit<HTMLAttributes<HTMLUListElement>, keyof TextListAppearanceProps | 'type'> & {
    children?: ReactNode;
  };

export const PTextList = forwardRef<HTMLUListElement | HTMLOListElement, PTextListProps>(function PTextList(
  { type, className, children, ...rest },
  ref
) {
  const appearance = textListAppearance({ type });
  const Tag: TextListTag = textListTagForType(type);

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
