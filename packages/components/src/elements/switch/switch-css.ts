import {
  colorContrastLow,
  colorFrostedSoft,
  colorPrimary,
  colorSuccess,
  colorSuccessFrostedSoft,
  colorSuccessLow,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  ref,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import {
  forcedColorsMediaQuery,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hoverMediaQuery,
} from '../../styles';
import { getCss, mergeDeep } from '../../utils';
import { RESPONSIVE_BREAKPOINTS } from '../appearance';
import { mediaQueryMin } from '../appearance-mq';
import {
  SWITCH_ALIGN_LABELS,
  SWITCH_KNOB_CLASS,
  SWITCH_LABEL_CLASS,
  SWITCH_ROOT_CLASS,
  SWITCH_SPINNER_CLASS,
  SWITCH_TOGGLE_CLASS,
} from './switch.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const COMPACT_SCALE = 0.64285714;
const cssVarInternalSwitchScaling = '--_p-switch-a';

const gap = `calc(11.2px * (${ref(cssVarInternalSwitchScaling)} - ${COMPACT_SCALE}) + 4px)`;
const buttonBorderWidth = '1px';
const buttonWidth = `calc(${ref(cssVarInternalSwitchScaling)} * 3rem)`;
const buttonHeight = `calc(${ref(cssVarInternalSwitchScaling)} * 1.75rem)`;
const buttonMarginBlock = `max(0px, calc((${ref(leadingNormal)} - ${buttonHeight}) / 2))`;
const buttonTouchInset = `calc(-${buttonBorderWidth} - max(0px, calc(24px - ${buttonHeight}) / 2))`;
const labelPaddingTop = `max(0px, calc((${buttonHeight} - ${ref(leadingNormal)}) / 2))`;
const toggleDimension = `calc(${ref(cssVarInternalSwitchScaling)} * 1.25rem)`;
const toggleTranslateX = `calc(${ref(cssVarInternalSwitchScaling)} * .1875rem)`;
const toggleCheckedX = `calc(${buttonWidth} - ${buttonBorderWidth} * 2 - 100% - ${toggleTranslateX})`;

const compactStyles = (compact: boolean): JssStyle => ({
  [cssVarInternalSwitchScaling]: compact ? COMPACT_SCALE : 1,
});

const stretchStyles = (stretch: boolean): JssStyle => ({
  display: stretch ? 'flex' : 'inline-flex',
  justifyContent: stretch ? 'space-between' : 'flex-start',
  width: stretch ? '100%' : 'auto',
  ...(!stretch && { verticalAlign: 'top' }),
});

const hideLabelStyles = (hide: boolean): JssStyle => ({
  [`& .${SWITCH_LABEL_CLASS}`]: hide
    ? getHiddenTextJssStyle(true)
    : getHiddenTextJssStyle(false, { paddingTop: labelPaddingTop }),
});

const alignLabelStyles = (align: string): JssStyle => ({
  [`& .${SWITCH_LABEL_CLASS}`]: {
    order: align === 'start' ? -1 : 0,
  },
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

const getNativeSwitchStyles = (): Styles => ({
  [SWITCH_ROOT_CLASS]: mergeDeep(
    {
      all: 'unset',
      [cssVarInternalSwitchScaling]: 1,
      ...stretchStyles(false),
      boxSizing: 'border-box',
      outline: 0,
      font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`,
      gap,
      cursor: 'pointer',
      '&[hidden]': {
        display: 'none !important',
      },
      '&:disabled': {
        cursor: 'not-allowed',
      },
      '&:disabled:not([data-p-loading])': getDisabledBaseStyles(),
      [`&:focus-visible .${SWITCH_TOGGLE_CLASS}`]: getFocusBaseStyles(),
      [`& .${SWITCH_TOGGLE_CLASS}`]: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        boxSizing: 'border-box',
        width: buttonWidth,
        height: buttonHeight,
        marginBlock: buttonMarginBlock,
        font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`,
        border: `${buttonBorderWidth} solid ${ref(colorContrastLow)}`,
        borderRadius: ref(radiusFull),
        background: ref(colorFrostedSoft),
        cursor: 'inherit',
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: buttonTouchInset,
        },
      },
      [`&[aria-checked="true"] .${SWITCH_TOGGLE_CLASS}`]: {
        borderColor: ref(colorSuccessLow),
        background: ref(colorSuccessFrostedSoft),
      },
      [`&:disabled .${SWITCH_TOGGLE_CLASS}`]: forcedColorsMediaQuery({
        borderColor: 'GrayText',
      }),
      ...hoverMediaQuery({
        [`&:hover:not(:disabled) .${SWITCH_TOGGLE_CLASS}`]: {
          borderColor: ref(colorPrimary),
        },
        [`&[aria-checked="true"]:hover:not(:disabled) .${SWITCH_TOGGLE_CLASS}`]: {
          borderColor: ref(colorSuccess),
        },
      }),
      [`& .${SWITCH_KNOB_CLASS}`]: {
        display: 'flex',
        placeItems: 'center',
        placeContent: 'center',
        width: toggleDimension,
        height: toggleDimension,
        borderRadius: ref(radiusFull),
        background: ref(colorPrimary),
        transition: getTransition('transform'),
        transform: `translate3d(${toggleTranslateX}, 0, 0)`,
        ...forcedColorsMediaQuery({
          background: 'CanvasText',
        }),
        '&:dir(rtl)': {
          transform: `translate3d(calc(${toggleTranslateX} * -1), 0, 0)`,
        },
      },
      [`&[aria-checked="true"] .${SWITCH_KNOB_CLASS}`]: {
        background: ref(colorSuccess),
        transform: `translate3d(${toggleCheckedX}, 0, 0)`,
        ...forcedColorsMediaQuery({
          background: 'CanvasText',
        }),
        '&:dir(rtl)': {
          transform: `translate3d(calc(${toggleCheckedX} * -1), 0, 0)`,
        },
      },
      [`&[data-p-loading] .${SWITCH_KNOB_CLASS}`]: {
        background: 'transparent',
        ...forcedColorsMediaQuery({
          background: 'CanvasText',
        }),
      },
      [`& .${SWITCH_SPINNER_CLASS}`]: {
        '--p-spinner-size': buttonHeight,
      },
      [`& .${SWITCH_LABEL_CLASS}`]: {
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        minWidth: 0,
        minHeight: 0,
        cursor: 'inherit',
        color: ref(colorPrimary),
        ...getHiddenTextJssStyle(false, {
          paddingTop: labelPaddingTop,
        }),
      },
      [`&:disabled .${SWITCH_LABEL_CLASS}`]: forcedColorsMediaQuery({
        color: 'GrayText',
      }),
    } as JssStyle,
    responsiveBooleanStyles('compact', compactStyles),
    responsiveBooleanStyles('stretch', stretchStyles),
    responsiveBooleanStyles('hide-label', hideLabelStyles),
    responsiveTokenStyles('align-label', SWITCH_ALIGN_LABELS, alignLabelStyles)
  ),
});

export const getNativeSwitchCss = (): string => inheritColorScheme('.p-switch', toLayeredCss(getNativeSwitchStyles()));
