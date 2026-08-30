import type { NativeAppearance } from '../appearance';

export const TEXT_LIST_ROOT_CLASS = 'p-text-list' as const;
export const TEXT_LIST_ITEM_CLASS = 'p-text-list-item' as const;

export const TEXT_LIST_TYPES = ['unordered', 'numbered', 'alphabetically'] as const;
export type TextListType = (typeof TEXT_LIST_TYPES)[number];

export const TEXT_LIST_TAGS = ['ul', 'ol'] as const;
export type TextListTag = (typeof TEXT_LIST_TAGS)[number];

export type TextListAppearanceProps = {
  type?: TextListType;
};

const DEFAULT_TYPE: TextListType = 'unordered';

export const textListTagForType = (type?: TextListType): TextListTag => (type && type !== 'unordered' ? 'ol' : 'ul');

export const textListAppearance = (props: TextListAppearanceProps = {}): NativeAppearance => {
  const { type = DEFAULT_TYPE } = props;
  return {
    className: TEXT_LIST_ROOT_CLASS,
    attrs: {
      ...(type !== DEFAULT_TYPE ? { 'data-p-type': type } : {}),
    },
  };
};

export const textListItemAppearance = (): NativeAppearance => ({
  className: TEXT_LIST_ITEM_CLASS,
  attrs: {},
});
