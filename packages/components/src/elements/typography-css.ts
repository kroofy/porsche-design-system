import {
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  ref,
  typescale2Xl,
  typescale3Xl,
  typescale4Xl,
  typescale5Xl,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { colorMap, sizeMap, weightMap } from '../styles/maps';
import { getCss, mergeDeep } from '../utils';
import { RESPONSIVE_BREAKPOINTS } from './appearance';
import { mediaQueryMin } from './appearance-mq';
import { DISPLAY_ALIGNS, DISPLAY_COLORS, DISPLAY_ROOT_CLASS, DISPLAY_SIZES } from './display/display.appearance';
import {
  HEADING_ALIGNS,
  HEADING_COLORS,
  HEADING_HYPHENS,
  HEADING_ROOT_CLASS,
  HEADING_SIZES,
  HEADING_WEIGHTS,
} from './heading/heading.appearance';
import {
  TEXT_ALIGNS,
  TEXT_COLORS,
  TEXT_HYPHENS,
  TEXT_ROOT_CLASS,
  TEXT_SIZES,
  TEXT_WEIGHTS,
} from './text/text.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const ellipsisStyles: JssStyle = {
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const hyphensStyles = (hyphens: string): JssStyle => ({
  hyphens,
  ...((hyphens === 'auto' || hyphens === 'manual') && { overflowWrap: 'break-word' }),
});

const responsiveTokenStyles = (
  name: string,
  tokens: readonly string[],
  apply: (value: string) => JssStyle
): JssStyle => {
  const styles: JssStyle = {};
  for (const token of tokens) {
    styles[`&[data-p-${name}="${token}"]`] = apply(token);
  }
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    const mq: JssStyle = {};
    for (const token of tokens) {
      mq[`&[data-p-${name}-${breakpoint}="${token}"]`] = apply(token);
    }
    Object.assign(styles, { [mediaQueryMin(breakpoint)]: mq });
  }
  return styles;
};

const DISPLAY_SIZE_MAP: Record<(typeof DISPLAY_SIZES)[number], string> = {
  small: ref(typescale3Xl),
  medium: ref(typescale4Xl),
  large: ref(typescale5Xl),
  inherit: 'inherit',
};

type TypographyConfig = {
  rootClass: string;
  font: string;
  defaultFontSize: string;
  defaultColor: string;
  defaultAlign: string;
  defaultHyphens?: string;
  sizes: readonly string[];
  colors: readonly string[];
  aligns: readonly string[];
  weights?: readonly string[];
  hyphens?: readonly string[];
  sizeLookup: Record<string, string>;
};

const getNativeTypographyStyles = (config: TypographyConfig): Styles => {
  const {
    rootClass,
    font,
    defaultFontSize,
    defaultColor,
    defaultAlign,
    defaultHyphens,
    sizes,
    colors,
    aligns,
    weights,
    hyphens,
    sizeLookup,
  } = config;

  return {
    [rootClass]: mergeDeep(
      {
        all: 'unset',
        display: 'block',
        font,
        fontSize: defaultFontSize,
        color: defaultColor,
        textAlign: defaultAlign,
        ...(defaultHyphens ? { hyphens: defaultHyphens } : {}),
        '&[hidden]': {
          display: 'none !important',
        },
        '&[data-p-ellipsis="true"]': ellipsisStyles,
      } as JssStyle,
      responsiveTokenStyles('size', sizes, (size) => ({ fontSize: sizeLookup[size] })),
      responsiveTokenStyles('color', colors, (color) => ({
        color: colorMap[color as keyof typeof colorMap],
      })),
      responsiveTokenStyles('align', aligns, (align) => ({ textAlign: align })),
      weights
        ? responsiveTokenStyles('weight', weights, (weight) => ({
            fontWeight: weightMap[weight as keyof typeof weightMap],
          }))
        : {},
      hyphens ? responsiveTokenStyles('hyphens', hyphens, hyphensStyles) : {}
    ),
  };
};

export const getNativeHeadingCss = (): string =>
  inheritColorScheme(
    '.p-heading',
    toLayeredCss(
      getNativeTypographyStyles({
        rootClass: HEADING_ROOT_CLASS,
        font: `${weightMap.normal} ${ref(typescale2Xl)}/${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        defaultFontSize: sizeMap['2xl'],
        defaultColor: colorMap.primary,
        defaultAlign: 'start',
        defaultHyphens: 'none',
        sizes: HEADING_SIZES,
        colors: HEADING_COLORS,
        aligns: HEADING_ALIGNS,
        weights: HEADING_WEIGHTS,
        hyphens: HEADING_HYPHENS,
        sizeLookup: sizeMap,
      })
    )
  );

export const getNativeTextCss = (): string =>
  inheritColorScheme(
    '.p-text',
    toLayeredCss(
      getNativeTypographyStyles({
        rootClass: TEXT_ROOT_CLASS,
        font: `${weightMap.normal} ${ref(typescaleSm)}/${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        defaultFontSize: sizeMap.sm,
        defaultColor: colorMap.primary,
        defaultAlign: 'start',
        defaultHyphens: 'inherit',
        sizes: TEXT_SIZES,
        colors: TEXT_COLORS,
        aligns: TEXT_ALIGNS,
        weights: TEXT_WEIGHTS,
        hyphens: TEXT_HYPHENS,
        sizeLookup: sizeMap,
      })
    )
  );

export const getNativeDisplayCss = (): string =>
  inheritColorScheme(
    '.p-display',
    toLayeredCss(
      getNativeTypographyStyles({
        rootClass: DISPLAY_ROOT_CLASS,
        font: `${ref(fontWeightNormal)} ${ref(typescale5Xl)}/${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        defaultFontSize: ref(typescale5Xl),
        defaultColor: colorMap.primary,
        defaultAlign: 'start',
        sizes: DISPLAY_SIZES,
        colors: DISPLAY_COLORS,
        aligns: DISPLAY_ALIGNS,
        sizeLookup: DISPLAY_SIZE_MAP,
      })
    )
  );
