import {
  colorContrastLower,
  durationXl,
  fontPorscheNext,
  leadingNormal,
  ref,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { addImportantToRule, cssVariableAnimationDuration, forcedColorsMediaQuery } from '../../styles';
import { colorMap, sizeMap } from '../../styles/maps';
import { getCss } from '../../utils';
import { RESPONSIVE_BREAKPOINTS } from '../appearance';
import { mediaQueryMin } from '../appearance-mq';
import {
  SPINNER_COLORS,
  SPINNER_ROOT_CLASS,
  SPINNER_SIZES,
  type SpinnerColor,
  type SpinnerSize,
} from './spinner.appearance';

const cssVarSize = '--p-spinner-size';
const cssVarColor = '--p-spinner-color';
const cssVarTrackColor = '--p-spinner-track-color';
const animationDuration = ref(cssVariableAnimationDuration, ref(durationXl));

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const sizeStyles = (size: SpinnerSize): JssStyle => ({
  fontSize: sizeMap[size],
});

const responsiveSizeStyles = (): JssStyle => {
  const styles: JssStyle = {};
  for (const size of SPINNER_SIZES) {
    if (size === 'sm') {
      continue;
    }
    Object.assign(styles, { [`&[data-p-size="${size}"]`]: sizeStyles(size) });
  }
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    const atBreakpoint: JssStyle = {};
    for (const size of SPINNER_SIZES) {
      Object.assign(atBreakpoint, { [`&[data-p-size-${breakpoint}="${size}"]`]: sizeStyles(size) });
    }
    Object.assign(styles, { [mediaQueryMin(breakpoint)]: atBreakpoint });
  }
  return styles;
};

const fg = (color: SpinnerColor): string => ref(cssVarColor, colorMap[color]);

const trackStyles = (color: SpinnerColor): JssStyle => ({
  stroke: ref(cssVarTrackColor, ref(colorContrastLower)),
  '@supports (color: oklch(from red l c h))': {
    stroke: ref(cssVarTrackColor, `oklch(from ${fg(color)} l c h/.2)`),
  },
  ...forcedColorsMediaQuery({
    stroke: addImportantToRule('none'),
  }),
});

const lastCircleMotion: JssStyle = {
  strokeDasharray: ref('--p-temporary-spinner-stroke-dasharray', '69'),
  strokeLinecap: 'round',
  animation: `p-spin-dash ${animationDuration} steps(50) infinite`,
};

const spinStyles = (color: SpinnerColor): JssStyle => ({
  '& > circle:first-child': trackStyles(color),
  '& > circle:last-child': {
    ...(color === 'primary' ? lastCircleMotion : {}),
    stroke: fg(color),
    ...forcedColorsMediaQuery({
      stroke: 'CanvasText',
    }),
  },
});

const getNativeSpinnerStyles = (): Styles => {
  const colorOverrides: JssStyle = {};
  for (const color of SPINNER_COLORS) {
    if (color === 'primary') {
      continue;
    }
    colorOverrides[`&[data-p-color="${color}"]`] = spinStyles(color);
  }

  return {
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
    [SPINNER_ROOT_CLASS]: {
      display: 'inline-flex',
      verticalAlign: 'top',
      width: ref(cssVarSize, ref(leadingNormal)),
      height: ref(cssVarSize, ref(leadingNormal)),
      fontFamily: ref(fontPorscheNext),
      ...sizeStyles('sm'),
      fill: 'none',
      strokeWidth: 1.5,
      animation: `p-spin-rotate ${animationDuration} steps(50) infinite`,
      '&[hidden]': {
        display: 'none !important',
      },
      ...spinStyles('primary'),
      ...colorOverrides,
      ...responsiveSizeStyles(),
    } as JssStyle,
  };
};

export const getNativeSpinnerCss = (): string =>
  inheritColorScheme('.p-spinner', toLayeredCss(getNativeSpinnerStyles()));
