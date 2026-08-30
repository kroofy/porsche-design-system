import type { NativeAppearance } from '../appearance';

export const TAG_DISMISSIBLE_ROOT_CLASS = 'p-tag-dismissible' as const;
export const TAG_DISMISSIBLE_SR_CLASS = 'p-tag-dismissible__sr' as const;
export const TAG_DISMISSIBLE_CONTENT_CLASS = 'p-tag-dismissible__content' as const;
export const TAG_DISMISSIBLE_LABEL_CLASS = 'p-tag-dismissible__label' as const;
export const TAG_DISMISSIBLE_ICON_CLASS = 'p-tag-dismissible__icon' as const;
export const TAG_DISMISSIBLE_SR_TEXT = 'Remove:' as const;
export const TAG_DISMISSIBLE_CLOSE_ICON = 'close' as const;

export type TagDismissibleAppearanceProps = {
  compact?: boolean;
};

export const tagDismissibleAppearance = (props: TagDismissibleAppearanceProps = {}): NativeAppearance => {
  const { compact = false } = props;
  return {
    className: TAG_DISMISSIBLE_ROOT_CLASS,
    attrs: {
      ...(compact ? { 'data-p-compact': 'true' } : {}),
    },
  };
};
