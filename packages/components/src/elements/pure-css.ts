import {
  blurFrosted,
  colorContrastLow,
  colorContrastLower,
  colorFrosted,
  colorFrostedStrong,
  durationXl,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  radiusLg,
  ref,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import {
  addImportantToRule,
  cssVariableAnimationDuration,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getTransition,
  hoverMediaQuery,
} from '../styles';
import { colorMap, sizeMap } from '../styles/maps';
import { getCss, mergeDeep } from '../utils';
import { RESPONSIVE_BREAKPOINTS } from './appearance';
import { mediaQueryMin } from './appearance-mq';
import {
  BUTTON_PURE_ALIGN_LABELS,
  BUTTON_PURE_COLORS,
  BUTTON_PURE_ICON_CLASS,
  BUTTON_PURE_LABEL_CLASS,
  BUTTON_PURE_ROOT_CLASS,
  BUTTON_PURE_SIZES,
  BUTTON_PURE_SPINNER_CLASS,
} from './button-pure/button-pure.appearance';
import {
  LINK_PURE_ALIGN_LABELS,
  LINK_PURE_COLORS,
  LINK_PURE_ICON_CLASS,
  LINK_PURE_LABEL_CLASS,
  LINK_PURE_ROOT_CLASS,
  LINK_PURE_SIZES,
} from './link-pure/link-pure.appearance';

const OFFSET_VERTICAL = '-2px';
const OFFSET_HORIZONTAL = '-4px';

type NativePureConfig = {
  rootClass: string;
  labelClass: string;
  iconClass: string;
  spinnerClass: string;
  sizes: readonly string[];
  colors: readonly string[];
  alignLabels: readonly string[];
  isButton: boolean;
};

const BUTTON_PURE_CONFIG: NativePureConfig = {
  rootClass: BUTTON_PURE_ROOT_CLASS,
  labelClass: BUTTON_PURE_LABEL_CLASS,
  iconClass: BUTTON_PURE_ICON_CLASS,
  spinnerClass: BUTTON_PURE_SPINNER_CLASS,
  sizes: BUTTON_PURE_SIZES,
  colors: BUTTON_PURE_COLORS,
  alignLabels: BUTTON_PURE_ALIGN_LABELS,
  isButton: true,
};

const LINK_PURE_CONFIG: NativePureConfig = {
  rootClass: LINK_PURE_ROOT_CLASS,
  labelClass: LINK_PURE_LABEL_CLASS,
  iconClass: LINK_PURE_ICON_CLASS,
  spinnerClass: 'p-link-pure__spinner',
  sizes: LINK_PURE_SIZES,
  colors: LINK_PURE_COLORS,
  alignLabels: LINK_PURE_ALIGN_LABELS,
  isButton: false,
};

const hideLabelVisibility = (hide: boolean): JssStyle =>
  hide
    ? {
        whiteSpace: 'nowrap',
        textIndent: '-999999px',
        overflow: 'hidden',
      }
    : {
        whiteSpace: 'inherit',
        textIndent: 0,
        overflow: 'visible',
      };

const hideLabelStyles = (hide: boolean, labelClass: string): JssStyle => ({
  gap: hide ? 0 : ref(spacingStaticXs),
  '&::before': {
    insetInline: hide ? OFFSET_VERTICAL : OFFSET_HORIZONTAL,
    borderRadius: hide ? ref(radiusFull) : ref(radiusLg),
  },
  [`&:not([data-p-icon="none"]) .${labelClass}`]: hideLabelVisibility(hide),
});

const stretchStyles = (stretch: boolean): JssStyle => ({
  display: stretch ? 'flex' : 'inline-flex',
  width: stretch ? '100%' : 'auto',
  justifyContent: stretch ? 'space-between' : 'flex-start',
  alignItems: stretch ? 'center' : 'flex-start',
  ...(!stretch && { verticalAlign: 'top' }),
});

const responsiveBooleanStyles = (name: string, apply: (value: boolean) => JssStyle): JssStyle => {
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

const spinnerStyles = (spinnerClass: string): JssStyle => ({
  [`& .${spinnerClass}`]: {
    '--p-spinner-color': 'currentcolor',
    position: 'relative',
    flexShrink: 0,
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
        stroke: ref('--p-spinner-track-color', `oklch(from ${ref('--p-spinner-color', 'currentcolor')} l c h/.2)`),
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
  [`&[data-p-loading="true"][data-p-icon="none"]`]: {
    [`& .${BUTTON_PURE_LABEL_CLASS}`]: {
      opacity: 0,
    },
    [`& .${spinnerClass}`]: {
      position: 'absolute',
      top: 0,
      left: `calc(50% - ${ref(leadingNormal)} / 2)`,
    },
  },
});

const getNativePureStyles = (config: NativePureConfig): Styles => {
  const { rootClass, labelClass, iconClass, spinnerClass, sizes, colors, alignLabels, isButton } = config;
  const hoverSelector = isButton ? '&:hover:not(:disabled)::before' : '&:hover::before';

  return {
    [rootClass]: mergeDeep(
      {
        all: 'unset',
        ...stretchStyles(false),
        position: 'relative',
        boxSizing: 'border-box',
        cursor: 'pointer',
        color: colorMap.primary,
        textDecoration: 'none',
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)}/${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        gap: ref(spacingStaticXs),
        transform: 'translate3d(0,0,0)',
        ...forcedColorsMediaQuery({
          color: isButton ? 'ButtonText' : 'LinkText',
        }),
        '&::before': {
          content: '""',
          position: 'absolute',
          top: OFFSET_VERTICAL,
          bottom: OFFSET_VERTICAL,
          left: OFFSET_HORIZONTAL,
          right: OFFSET_HORIZONTAL,
          borderRadius: ref(radiusLg),
          transition: getTransition('background-color'),
        },
        ...hoverMediaQuery({
          [hoverSelector]: {
            WebkitBackdropFilter: ref(blurFrosted),
            backdropFilter: ref(blurFrosted),
            backgroundColor: ref(colorFrostedStrong),
          },
        }),
        '&:focus-visible::before': getFocusBaseStyles(),
        '&[hidden]': {
          display: 'none !important',
        },
        '&[data-p-underline="true"]': {
          textDecoration: 'underline',
        },
        '&[data-p-active="true"]::before': {
          WebkitBackdropFilter: ref(blurFrosted),
          backdropFilter: ref(blurFrosted),
          backgroundColor: ref(colorFrosted),
        },
        [`& .${iconClass}`]: {
          position: 'relative',
          flexShrink: 0,
          width: ref(leadingNormal),
          height: ref(leadingNormal),
        },
        [`& .${labelClass}`]: {
          zIndex: 1,
        },
        [`&[data-p-icon="none"] .${labelClass}`]: {
          position: 'relative',
          zIndex: 'auto',
        },
        ...(isButton ? spinnerStyles(spinnerClass) : {}),
      } as JssStyle,
      responsiveBooleanStyles('hide-label', (hide) => hideLabelStyles(hide, labelClass)),
      responsiveBooleanStyles('stretch', stretchStyles),
      responsiveTokenStyles('align-label', alignLabels, (align) => ({
        [`& .${labelClass}`]: {
          order: align === 'start' ? -1 : 0,
        },
      })),
      responsiveTokenStyles('size', sizes, (size) => ({
        fontSize: sizeMap[size as keyof typeof sizeMap],
      })),
      responsiveTokenStyles('color', colors, (color) => ({
        color: colorMap[color as keyof typeof colorMap],
        ...forcedColorsMediaQuery({
          color: isButton ? 'ButtonText' : 'LinkText',
        }),
      })),
      isButton
        ? {
            '&:disabled': {
              color: ref(colorContrastLow),
              cursor: 'not-allowed',
            },
          }
        : {}
    ),
  };
};

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

export const getNativeButtonPureCss = (): string =>
  inheritColorScheme('.p-button-pure', toLayeredCss(getNativePureStyles(BUTTON_PURE_CONFIG)));

export const getNativeLinkPureCss = (): string =>
  inheritColorScheme('.p-link-pure', toLayeredCss(getNativePureStyles(LINK_PURE_CONFIG)));
