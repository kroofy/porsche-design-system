import { getMediaQueryMin } from '@porsche-design-system/emotion';
import type { ResponsiveBreakpoint } from './appearance';

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
