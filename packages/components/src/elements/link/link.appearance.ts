export const LINK_ROOT_CLASS = 'p-link' as const;
export const LINK_LABEL_CLASS = 'p-link__label' as const;

export const LINK_VARIANTS = ['primary', 'secondary'] as const;
export type LinkVariant = (typeof LINK_VARIANTS)[number];

export const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;
export type Breakpoint = (typeof BREAKPOINTS)[number];

export type Responsive<T extends string | boolean> = T | ({ base: T } & Partial<Record<Exclude<Breakpoint, 'base'>, T>>);

export type NativeAppearance = {
  className: typeof LINK_ROOT_CLASS;
  attrs: Readonly<Record<`data-p-${string}`, string>>;
};

export type LinkAppearanceProps = {
  variant?: LinkVariant;
  icon?: string | 'none';
  hideLabel?: Responsive<boolean>;
  compact?: Responsive<boolean>;
};

const DEFAULT_VARIANT: LinkVariant = 'primary';

export const serializeResponsive = (
  name: string,
  value: Responsive<string | boolean> | undefined,
  cssDefault: string | boolean
): Record<`data-p-${string}`, string> => {
  if (value === undefined) {
    return {};
  }

  if (typeof value !== 'object') {
    if (value === cssDefault) {
      return {};
    }
    return { [`data-p-${name}`]: String(value) };
  }

  const attrs: Record<`data-p-${string}`, string> = {};
  for (const breakpoint of BREAKPOINTS) {
    const token = value[breakpoint as keyof typeof value];
    if (token === undefined) {
      continue;
    }
    if (breakpoint === 'base') {
      if (token !== cssDefault) {
        attrs[`data-p-${name}`] = String(token);
      }
      continue;
    }
    attrs[`data-p-${name}-${breakpoint}`] = String(token);
  }
  return attrs;
};

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
