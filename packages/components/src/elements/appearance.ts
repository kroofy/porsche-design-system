import { getMediaQueryMin } from '@porsche-design-system/emotion';

export const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;
export type Breakpoint = (typeof BREAKPOINTS)[number];
export type ResponsiveBreakpoint = Exclude<Breakpoint, 'base'>;

export const RESPONSIVE_BREAKPOINTS = BREAKPOINTS.filter(
  (breakpoint): breakpoint is ResponsiveBreakpoint => breakpoint !== 'base'
);

export const mediaQueryMin = (breakpoint: ResponsiveBreakpoint): string => {
  switch (breakpoint) {
    case 'xs':
      return getMediaQueryMin('xs');
    case 's':
      return getMediaQueryMin('s');
    case 'm':
      return getMediaQueryMin('m');
    case 'l':
      return getMediaQueryMin('l');
    case 'xl':
      return getMediaQueryMin('xl');
    case 'xxl':
      return getMediaQueryMin('xxl');
    default: {
      const _exhaustive: never = breakpoint;
      return _exhaustive;
    }
  }
};

export type Responsive<T extends string | boolean> =
  | T
  | ({ base: T } & Partial<Record<Exclude<Breakpoint, 'base'>, T>>);

export type NativeAppearance = {
  className: string;
  attrs: Readonly<Record<`data-p-${string}`, string>>;
};

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
