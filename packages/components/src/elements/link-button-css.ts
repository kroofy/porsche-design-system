import {
  blurFrosted,
  colorCanvas,
  colorContrastHigh,
  colorContrastLower,
  colorError,
  colorErrorMedium,
  colorFrosted,
  colorFrostedStrong,
  colorPrimary,
  durationXl,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  radiusLg,
  radiusXl,
  ref,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import {
  addImportantToRule,
  cssVariableAnimationDuration,
  forcedColorsMediaQuery,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hoverMediaQuery,
} from '../styles';
import { getCss, mergeDeep } from '../utils';
import { mediaQueryMin, RESPONSIVE_BREAKPOINTS } from './appearance';
import {
  BUTTON_ICON_CLASS,
  BUTTON_LABEL_CLASS,
  BUTTON_ROOT_CLASS,
  BUTTON_SPINNER_CLASS,
  BUTTON_VARIANTS,
} from './button/button.appearance';
import { getNativeFieldCss } from './field-css';
import { getNativeIconCss } from './icon/icon-css';
import { LINK_ICON_CLASS, LINK_LABEL_CLASS, LINK_ROOT_CLASS, LINK_VARIANTS } from './link/link.appearance';

const COMPACT_SCALE = 0.64285714;
const DEFAULT_SCALE = 1;

type VariantColors = {
  textColor: string;
  textColorHover: string;
  backgroundColor: string;
  backgroundColorHover: string;
};

type NativeLinkButtonConfig = {
  rootClass: string;
  labelClass: string;
  iconClass: string;
  spinnerClass: string;
  scalingVar: string;
  bgVar: string;
  fgVar: string;
  pxVar: string;
  pyVar: string;
  gapVar: string;
  radiusVar: string;
  variants: readonly string[];
  isButton: boolean;
};

const BUTTON_CONFIG: NativeLinkButtonConfig = {
  rootClass: BUTTON_ROOT_CLASS,
  labelClass: BUTTON_LABEL_CLASS,
  iconClass: BUTTON_ICON_CLASS,
  spinnerClass: BUTTON_SPINNER_CLASS,
  scalingVar: '--_p-button-a',
  bgVar: '--p-button-bg',
  fgVar: '--p-button-fg',
  pxVar: '--p-button-px',
  pyVar: '--p-button-py',
  gapVar: '--p-button-gap',
  radiusVar: '--p-button-radius',
  variants: BUTTON_VARIANTS,
  isButton: true,
};

const LINK_CONFIG: NativeLinkButtonConfig = {
  rootClass: LINK_ROOT_CLASS,
  labelClass: LINK_LABEL_CLASS,
  iconClass: LINK_ICON_CLASS,
  spinnerClass: 'p-link__spinner',
  scalingVar: '--_p-link-a',
  bgVar: '--p-link-bg',
  fgVar: '--p-link-fg',
  pxVar: '--p-link-px',
  pyVar: '--p-link-py',
  gapVar: '--p-link-gap',
  radiusVar: '--p-link-radius',
  variants: LINK_VARIANTS,
  isButton: false,
};

const getVariantColors = (variant: string, bgVar: string, fgVar: string): VariantColors => {
  const colors: Record<string, VariantColors> = {
    primary: {
      textColor: ref(fgVar, ref(colorCanvas)),
      textColorHover: ref(fgVar, ref(colorCanvas)),
      backgroundColor: ref(bgVar, ref(colorPrimary)),
      backgroundColorHover: ref(bgVar, ref(colorContrastHigh)),
    },
    secondary: {
      textColor: ref(fgVar, ref(colorPrimary)),
      textColorHover: ref(fgVar, ref(colorPrimary)),
      backgroundColor: ref(bgVar, ref(colorFrostedStrong)),
      backgroundColorHover: ref(bgVar, ref(colorFrosted)),
    },
    destructive: {
      textColor: ref(fgVar, ref(colorCanvas)),
      textColorHover: ref(fgVar, ref(colorPrimary)),
      backgroundColor: ref(bgVar, ref(colorError)),
      backgroundColorHover: ref(bgVar, ref(colorErrorMedium)),
    },
  };
  return colors[variant];
};

const compactVars = (scalingVar: string, compact: boolean): JssStyle => ({
  [scalingVar]: compact ? COMPACT_SCALE : DEFAULT_SCALE,
  '--_p-link-button-a': compact ? ref(radiusLg) : ref(radiusXl),
});

const responsiveAttrStyles = (name: string, apply: (value: boolean) => JssStyle): JssStyle => {
  const styles: JssStyle = {
    [`&[data-p-${name}="true"]`]: apply(true),
    [`&[data-p-${name}="false"]`]: apply(false),
  };
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    Object.assign(styles, {
      [mediaQueryMin(breakpoint)]: {
        [`&[data-p-${name}-${breakpoint}="true"]`]: apply(true),
        [`&[data-p-${name}-${breakpoint}="false"]`]: apply(false),
      },
    });
  }
  return styles;
};

const getNativeLinkButtonStyles = (config: NativeLinkButtonConfig): Styles => {
  const {
    rootClass,
    labelClass,
    iconClass,
    spinnerClass,
    scalingVar,
    bgVar,
    fgVar,
    pxVar,
    pyVar,
    gapVar,
    radiusVar,
    variants,
    isButton,
  } = config;

  const paddingBlock = `calc(28px * (${ref(scalingVar)} - 0.64285714) + 6px)`;
  const paddingInline = `calc(33.6px * (${ref(scalingVar)} - 0.64285714) + 16px)`;
  const gap = `calc(11.2px * (${ref(scalingVar)} - 0.64285714) + 4px)`;
  const iconMarginInlineStart = `calc(-1 * (11.2px * (${ref(scalingVar)} - 0.64285714) + 4px))`;
  const hoverSelector = isButton ? '&:hover:not(:disabled)' : '&:hover';

  const hideLabelStyles = (hide: boolean): JssStyle => ({
    borderRadius: addImportantToRule(ref(radiusVar, hide ? ref(radiusFull) : ref('--_p-link-button-a'))),
    padding: `${ref(pyVar, paddingBlock)} ${ref(pxVar, hide ? paddingBlock : paddingInline)}`,
    gap: ref(gapVar, hide ? 0 : gap),
    [`& .${labelClass}`]: {
      ...getHiddenTextJssStyle(hide),
      ...(isButton ? {} : { clip: addImportantToRule('unset') }),
    },
    [`& .${iconClass}`]: {
      marginInlineStart: hide ? 0 : iconMarginInlineStart,
    },
  });

  const variantStyles = (variant: string): JssStyle => {
    const colors = getVariantColors(variant, bgVar, fgVar);
    return {
      backgroundColor: colors.backgroundColor,
      color: colors.textColor,
      ...hoverMediaQuery({
        [hoverSelector]: {
          color: colors.textColorHover,
          backgroundColor: colors.backgroundColorHover,
          ...forcedColorsMediaQuery({
            background: 'Canvas',
          }),
        },
      }),
    };
  };

  const variantOverrides = variants
    .filter((variant) => variant !== 'primary')
    .reduce<JssStyle>((result, variant) => {
      Object.assign(result, { [`&[data-p-variant="${variant}"]`]: variantStyles(variant) });
      return result;
    }, {});

  return {
    ...(isButton
      ? {
          '@global': {
            '@keyframes p-spin-rotate': {
              '0%': { transform: 'rotateZ(0deg)' },
              '100%': { transform: 'rotateZ(360deg)' },
            },
            '@keyframes p-spin-dash': {
              '0%': { strokeDashoffset: 69, transform: 'rotateZ(0)' },
              '50%, 75%': { strokeDashoffset: 24, transform: 'rotateZ(80deg)' },
              '100%': { strokeDashoffset: 69, transform: 'rotateZ(360deg)' },
            },
          },
        }
      : {}),
    [rootClass]: mergeDeep(
      {
        all: 'unset',
        display: 'inline-flex',
        verticalAlign: 'top',
        justifyContent: 'center',
        position: 'relative',
        width: 'auto',
        minWidth: 'min-content',
        boxSizing: 'border-box',
        WebkitBackdropFilter: ref(blurFrosted),
        backdropFilter: ref(blurFrosted),
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        transform: 'translate3d(0,0,0)',
        cursor: 'pointer',
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
        ...compactVars(scalingVar, false),
        ...hideLabelStyles(false),
        ...variantStyles('primary'),
        ...forcedColorsMediaQuery({
          forcedColorAdjust: 'none',
          background: 'Canvas',
          color: isButton ? 'ButtonText' : 'LinkText',
          boxShadow: isButton ? 'inset 0 0 0 2px ButtonBorder' : 'inset 0 0 0 2px LinkText',
        }),
        '&:focus-visible': getFocusBaseStyles(),
        '&[hidden]': {
          display: 'none !important',
        },
        [`& .${labelClass}`]: {
          ...getHiddenTextJssStyle(false),
          ...(isButton ? {} : { clip: addImportantToRule('unset') }),
          transition: getTransition('opacity'),
        },
        [`& .${iconClass}`]: {
          font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`,
          width: ref(leadingNormal),
          height: ref(leadingNormal),
          marginInlineStart: iconMarginInlineStart,
          transition: getTransition('opacity'),
        },
        ...(isButton && {
          '&:disabled': {
            cursor: 'not-allowed',
          },
          '&:disabled:not([data-p-loading="true"])': {
            ...getDisabledBaseStyles({
              '&': {
                boxShadow: 'inset 0 0 0 2px GrayText !important',
              },
            }),
            [`& .${labelClass}`]: getDisabledBaseStyles(),
            [`& .${iconClass}`]: getDisabledBaseStyles(),
          },
          '&[data-p-loading="true"]': {
            [`& .${labelClass}`]: {
              opacity: 0,
            },
            [`& .${iconClass}`]: {
              opacity: 0,
            },
            [`& .${spinnerClass}`]: {
              '--p-spinner-color': 'currentcolor',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'inline-flex',
              width: ref(leadingNormal),
              height: ref(leadingNormal),
              '& svg': {
                display: 'block',
                fill: 'none',
                strokeWidth: 1.5,
                width: '100%',
                height: '100%',
                animation: `p-spin-rotate ${ref(cssVariableAnimationDuration, ref(durationXl))} steps(50) infinite`,
              },
              '& circle:first-child': {
                stroke: ref('--p-spinner-track-color', ref(colorContrastLower)),
                '@supports (color: oklch(from red l c h))': {
                  stroke: ref(
                    '--p-spinner-track-color',
                    `oklch(from ${ref('--p-spinner-color', 'currentcolor')} l c h/.2)`
                  ),
                },
                ...forcedColorsMediaQuery({
                  stroke: addImportantToRule('none'),
                }),
              },
              '& circle:last-child': {
                stroke: ref('--p-spinner-color', 'currentcolor'),
                strokeDasharray: ref('--p-temporary-spinner-stroke-dasharray', '69'),
                strokeLinecap: 'round',
                animation: `p-spin-dash ${ref(cssVariableAnimationDuration, ref(durationXl))} steps(50) infinite`,
                ...forcedColorsMediaQuery({
                  stroke: 'CanvasText',
                }),
              },
            },
          },
        }),
      } as JssStyle,
      responsiveAttrStyles('compact', (compact) => compactVars(scalingVar, compact)),
      responsiveAttrStyles('hide-label', hideLabelStyles),
      variantOverrides
    ),
  };
};

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

export const getNativeButtonCss = (): string =>
  inheritColorScheme('.p-button', toLayeredCss(getNativeLinkButtonStyles(BUTTON_CONFIG)));

export const getNativeLinkCss = (): string =>
  inheritColorScheme('.p-link', toLayeredCss(getNativeLinkButtonStyles(LINK_CONFIG)));

export const getElementsCss = (): string =>
  `${getNativeButtonCss()}${getNativeLinkCss()}${getNativeIconCss()}${getNativeFieldCss()}`;
