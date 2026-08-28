import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export { BREAKPOINTS, serializeResponsive } from '../appearance';
export type { Breakpoint, NativeAppearance, Responsive } from '../appearance';

export const LINK_ROOT_CLASS = 'p-link' as const;
export const LINK_LABEL_CLASS = 'p-link__label' as const;

export const LINK_VARIANTS = ['primary', 'secondary'] as const;
export type LinkVariant = (typeof LINK_VARIANTS)[number];

export type LinkAppearanceProps = {
  variant?: LinkVariant;
  icon?: string | 'none';
  hideLabel?: Responsive<boolean>;
  compact?: Responsive<boolean>;
};

const DEFAULT_VARIANT: LinkVariant = 'primary';

export const linkAppearance = (props: LinkAppearanceProps = {}): NativeAppearance => {
  const { variant = DEFAULT_VARIANT, icon = 'none', hideLabel, compact } = props;
  return {
    className: LINK_ROOT_CLASS,
    attrs: {
      ...(variant !== DEFAULT_VARIANT ? { 'data-p-variant': variant } : {}),
      ...(icon !== 'none' ? { 'data-p-icon': icon } : {}),
      ...serializeResponsive('hide-label', hideLabel, false),
      ...serializeResponsive('compact', compact, false),
    },
  };
};
