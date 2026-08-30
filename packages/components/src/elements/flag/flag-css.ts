import { fontPorscheNext, leadingNormal, ref } from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { sizeMap } from '../../styles/maps';
import { getCss } from '../../utils';
import { RESPONSIVE_BREAKPOINTS } from '../appearance';
import { mediaQueryMin } from '../appearance-mq';
import { FLAG_ROOT_CLASS, type FlagSize } from './flag.appearance';

const cssVarSize = '--p-flag-size';

const sizeStyles = (size: FlagSize): JssStyle => ({
  fontSize: sizeMap[size],
});

const responsiveSizeStyles = (): JssStyle => {
  const styles: JssStyle = {};
  for (const size of Object.keys(sizeMap) as FlagSize[]) {
    if (size === 'sm') {
      continue;
    }
    Object.assign(styles, { [`&[data-p-size="${size}"]`]: sizeStyles(size) });
  }
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    const atBreakpoint: JssStyle = {};
    for (const size of Object.keys(sizeMap) as FlagSize[]) {
      Object.assign(atBreakpoint, { [`&[data-p-size-${breakpoint}="${size}"]`]: sizeStyles(size) });
    }
    Object.assign(styles, { [mediaQueryMin(breakpoint)]: atBreakpoint });
  }
  return styles;
};

const getNativeFlagStyles = (): Styles => ({
  [FLAG_ROOT_CLASS]: {
    display: 'inline-flex',
    verticalAlign: 'top',
    margin: 0,
    padding: '1px',
    border: 0,
    outline: 0,
    overflow: 'hidden',
    boxSizing: 'border-box',
    pointerEvents: 'none',
    width: ref(cssVarSize, ref(leadingNormal)),
    height: ref(cssVarSize, ref(leadingNormal)),
    fontFamily: ref(fontPorscheNext),
    ...sizeStyles('sm'),
    '&[hidden]': {
      display: 'none !important',
    },
    ...responsiveSizeStyles(),
  } as JssStyle,
});

export const getNativeFlagCss = (): string =>
  `.p-flag{color-scheme:inherit}\n@layer pds.elements {\n${getCss(getNativeFlagStyles()).trim()}\n}\n`;
