import type { NativeAppearance } from '../appearance';

export const TAG_ROOT_CLASS = 'p-tag' as const;
export const TAG_ICON_CLASS = 'p-tag__icon' as const;

export const TAG_VARIANTS = [
  'primary',
  'secondary',
  'info',
  'info-frosted',
  'success',
  'success-frosted',
  'warning',
  'warning-frosted',
  'error',
  'error-frosted',
] as const;
export type TagVariant = (typeof TAG_VARIANTS)[number];

export type TagAppearanceProps = {
  variant?: TagVariant;
  compact?: boolean;
};

const DEFAULT_VARIANT: TagVariant = 'secondary';

export const tagAppearance = (props: TagAppearanceProps = {}): NativeAppearance => {
  const { variant = DEFAULT_VARIANT, compact = false } = props;
  return {
    className: TAG_ROOT_CLASS,
    attrs: {
      ...(variant !== DEFAULT_VARIANT ? { 'data-p-variant': variant } : {}),
      ...(compact ? { 'data-p-compact': 'true' } : {}),
    },
  };
};
