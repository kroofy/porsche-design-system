import { getMediaQueryMin } from '@porsche-design-system/emotion';
import { ICONS_MANIFEST } from '@porsche-design-system/icons';
import { fontPorscheNext, leadingNormal, ref } from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { ICON_COLORS, type IconColor, type IconSize } from '../../components/icon/icon-utils';
import { forcedColorsMediaQuery } from '../../styles';
import { colorMap, sizeMap } from '../../styles/maps';
import { getCss } from '../../utils';
import { BREAKPOINTS } from '../appearance';
import { ICON_ROOT_CLASS } from './icon.appearance';
import { DEFAULT_ICON_NAME, nativeIconUrl } from './icon-url';

const cssVarSize = '--p-icon-size';
const cssVarColor = '--p-icon-color';
const RESPONSIVE_BREAKPOINTS = BREAKPOINTS.filter((breakpoint) => breakpoint !== 'base');

const FLIPPABLE_ICONS = new Set([
  'arrow-compact-left',
  'arrow-compact-right',
  'arrow-double-left',
  'arrow-double-right',
  'arrow-first',
  'arrow-head-left',
  'arrow-head-right',
  'arrow-last',
  'arrow-left',
  'arrow-right',
  'chart',
  'chat',
  'copy',
  'external',
  'increase',
  'list',
  'logout',
  'return',
  'send',
]);

const sizeStyles = (size: IconSize): JssStyle => ({
  fontSize: sizeMap[size],
});

const colorStyles = (color: IconColor): JssStyle => ({
  background: ref(cssVarColor, colorMap[color]),
});

const maskVar = (name: string): JssStyle => ({
  '--_p-icon-mask': `url("${nativeIconUrl(name)}")`,
});

const rtlFlip: JssStyle = {
  transform: 'scaleX(-1)',
};

const responsiveSizeStyles = (): JssStyle => {
  const styles: JssStyle = {};
  for (const size of Object.keys(sizeMap) as IconSize[]) {
    if (size === 'sm') {
      continue;
    }
    styles[`&[data-p-size="${size}"]`] = sizeStyles(size);
  }
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    const query = getMediaQueryMin(breakpoint as Exclude<typeof breakpoint, 'base'>);
    const atBreakpoint: JssStyle = {};
    for (const size of Object.keys(sizeMap) as IconSize[]) {
      atBreakpoint[`&[data-p-size-${breakpoint}="${size}"]`] = sizeStyles(size);
    }
    styles[query] = atBreakpoint;
  }
  return styles;
};

const colorOverrides = (): JssStyle => {
  const styles: JssStyle = {};
  for (const color of ICON_COLORS) {
    if (color === 'primary') {
      continue;
    }
    styles[`&[data-p-color="${color}"]`] = colorStyles(color);
  }
  return styles;
};

const nameOverrides = (): JssStyle => {
  const styles: JssStyle = {};
  for (const name of Object.keys(ICONS_MANIFEST)) {
    if (name === DEFAULT_ICON_NAME) {
      continue;
    }
    styles[`&[data-p-name="${name}"]`] = {
      ...maskVar(name),
      ...(FLIPPABLE_ICONS.has(name) ? { '&:dir(rtl)': rtlFlip } : {}),
    };
  }
  return styles;
};

const getNativeIconStyles = (): Styles => ({
  [ICON_ROOT_CLASS]: {
    display: 'block',
    margin: 0,
    padding: 0,
    border: 0,
    outline: 0,
    overflow: 'hidden',
    objectPosition: '-9999px -9999px',
    pointerEvents: 'none',
    width: ref(cssVarSize, ref(leadingNormal)),
    height: ref(cssVarSize, ref(leadingNormal)),
    fontFamily: ref(fontPorscheNext),
    ...sizeStyles('sm'),
    ...colorStyles('primary'),
    ...maskVar(DEFAULT_ICON_NAME),
    WebkitMask: `${ref('--_p-icon-mask')} center / contain no-repeat`,
    mask: `${ref('--_p-icon-mask')} center / contain no-repeat`,
    ...(FLIPPABLE_ICONS.has(DEFAULT_ICON_NAME)
      ? {
          '&:dir(rtl):not([data-p-name])': rtlFlip,
        }
      : {}),
    ...forcedColorsMediaQuery({
      background: 'CanvasText',
    }),
    '&[hidden]': {
      display: 'none !important',
    },
    ...colorOverrides(),
    ...responsiveSizeStyles(),
    ...nameOverrides(),
  } as JssStyle,
});

export const getNativeIconCss = (): string => `@layer pds.elements {\n${getCss(getNativeIconStyles()).trim()}\n}\n`;
