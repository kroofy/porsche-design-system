import {
  colorContrastHigh,
  colorContrastMedium,
  colorFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusLg,
  radiusXl,
  ref,
  spacingStaticXs,
  typescaleSm,
  typescaleXs,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import {
  forcedColorsMediaQuery,
  getDisabledBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hoverMediaQuery,
} from '../styles';
import { getThemedFormStateColors } from '../styles/form-state-color-styles';
import { getCss } from '../utils';
import { mediaQueryMin, RESPONSIVE_BREAKPOINTS } from './appearance';
import { FIELD_ROOT_CLASS, type FieldState, INPUT_ROOT_CLASS, TEXTAREA_ROOT_CLASS } from './input';
import { DESCRIPTION_ROOT_CLASS, LABEL_REQUIRED_CLASS, LABEL_ROOT_CLASS, MESSAGE_ROOT_CLASS } from './label';

const SCALING_VAR = '--_p-input-base-a';
const TEXTAREA_SCALING_VAR = '--_p-textarea-a';
const DEFAULT_SCALE = 1;
const COMPACT_SCALE = 0.64285714;

const inheritColorScheme = (selectors: string, layered: string): string =>
  `${selectors}{color-scheme:inherit}\n${layered}`;

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const compactVars = (scalingVar: string, compact: boolean): JssStyle => ({
  [scalingVar]: compact ? COMPACT_SCALE : DEFAULT_SCALE,
  borderRadius: compact ? ref(radiusLg) : ref(radiusXl),
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

const hideLabelStyles = (hide: boolean): JssStyle => getHiddenTextJssStyle(hide);

const stateColors = (state: FieldState) => getThemedFormStateColors(state);

const hiddenDescriptionAfterLabel = (): JssStyle => {
  const styles: JssStyle = {
    [`.${LABEL_ROOT_CLASS}[data-p-hide-label="true"] + .${DESCRIPTION_ROOT_CLASS}`]: getHiddenTextJssStyle(true),
    [`.${LABEL_ROOT_CLASS}[data-p-hide-label="false"] + .${DESCRIPTION_ROOT_CLASS}`]: getHiddenTextJssStyle(false),
  };
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    Object.assign(styles, {
      [mediaQueryMin(breakpoint)]: {
        [`.${LABEL_ROOT_CLASS}[data-p-hide-label-${breakpoint}="true"] + .${DESCRIPTION_ROOT_CLASS}`]:
          getHiddenTextJssStyle(true),
        [`.${LABEL_ROOT_CLASS}[data-p-hide-label-${breakpoint}="false"] + .${DESCRIPTION_ROOT_CLASS}`]:
          getHiddenTextJssStyle(false),
      },
    });
  }
  return styles;
};

const controlChrome = (scalingVar: string, isTextarea: boolean): JssStyle => {
  const none = stateColors('none');
  const height = `calc(${ref(scalingVar)} * 3.5rem)`;
  const paddingInline = `calc(22.4px * (${ref(scalingVar)} - 0.64285714) + 8px)`;
  const paddingBlock = `calc(28px * (${ref(scalingVar)} - 0.64285714) + 5px)`;

  return {
    all: 'unset',
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    minWidth: '2ch',
    ...(isTextarea
      ? {
          minHeight: height,
          padding: `${paddingBlock} ${paddingInline}`,
          resize: 'vertical',
          fieldSizing: ref('--p-textarea-field-sizing', 'unset'),
          font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        }
      : {
          height,
          paddingInline,
          font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / calc(${ref(leadingNormal)} + 6px) ${ref(fontPorscheNext)}`,
          textOverflow: 'ellipsis',
        }),
    border: `1px solid ${none.formStateBorderColor}`,
    background: none.formStateBackgroundColor,
    color: ref(colorPrimary),
    cursor: 'text',
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
    ...compactVars(scalingVar, false),
    ...forcedColorsMediaQuery({
      forcedColorAdjust: 'none',
      background: 'Canvas',
      color: 'FieldText',
      borderColor: 'FieldText',
    }),
    '&:focus, &:focus-visible': {
      borderColor: none.formStateBorderHoverColor,
      ...forcedColorsMediaQuery({
        outline: '2px solid Highlight',
        outlineOffset: '2px',
      }),
    },
    '&:disabled, &[data-p-loading="true"]': {
      cursor: 'not-allowed',
      ...getDisabledBaseStyles({
        '&': {
          borderColor: 'GrayText',
        },
      }),
    },
    '&[readonly]': {
      borderColor: 'transparent',
      background: ref(colorFrosted),
      color: ref(colorContrastMedium),
      cursor: 'default',
    },
    ...hoverMediaQuery({
      '&:hover:not(:disabled):not([readonly]):not([data-p-loading="true"])': {
        borderColor: none.formStateBorderHoverColor,
      },
    }),
    '&::placeholder': {
      color: ref(colorContrastMedium),
    },
    '&:dir(rtl)::placeholder': {
      direction: 'rtl',
      textAlign: 'end',
    },
    '&[hidden]': {
      display: 'none !important',
    },
  };
};

const stateOverrides = (): JssStyle => {
  const styles: JssStyle = {};
  for (const state of ['error', 'success'] as const) {
    const colors = stateColors(state);
    Object.assign(styles, {
      [`&[data-p-state="${state}"]`]: {
        borderColor: colors.formStateBorderColor,
        background: colors.formStateBackgroundColor,
        '&:focus, &:focus-visible': {
          borderColor: colors.formStateBorderHoverColor,
        },
        ...hoverMediaQuery({
          '&:hover:not(:disabled):not([readonly]):not([data-p-loading="true"])': {
            borderColor: colors.formStateBorderHoverColor,
          },
        }),
      },
    });
  }
  return styles;
};

const getNativeFieldStyles = (): Styles => ({
  '@global': {
    [`.${FIELD_ROOT_CLASS}:has(:disabled) .${LABEL_ROOT_CLASS}`]: {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      ...getDisabledBaseStyles(),
    },
    [`.${FIELD_ROOT_CLASS}:has(:disabled) .${DESCRIPTION_ROOT_CLASS}`]: getDisabledBaseStyles(),
    ...hiddenDescriptionAfterLabel(),
  },
  [FIELD_ROOT_CLASS]: {
    display: 'grid',
    gap: ref(spacingStaticXs),
  },
  [LABEL_ROOT_CLASS]: {
    font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
    color: ref(colorPrimary),
    cursor: 'pointer',
    display: 'inline',
    minWidth: 'fit-content',
    transition: getTransition('color'),
    ...getHiddenTextJssStyle(false),
    ...responsiveAttrStyles('hide-label', hideLabelStyles),
    '&:empty': {
      display: 'none',
    },
    [`& .${LABEL_REQUIRED_CLASS}`]: {
      userSelect: 'none',
    },
  },
  [DESCRIPTION_ROOT_CLASS]: {
    display: 'block',
    font: `${ref(fontWeightNormal)} ${ref(typescaleXs)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
    color: ref(colorContrastHigh),
    cursor: 'unset',
    marginTop: `calc(-1 * ${ref(spacingStaticXs)})`,
  },
  [MESSAGE_ROOT_CLASS]: {
    display: 'flex',
    gap: ref(spacingStaticXs),
    alignItems: 'flex-start',
    font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
    '&:empty': {
      opacity: 0,
      position: 'absolute',
    },
    '&[data-p-state="error"]': {
      color: stateColors('error').formStateColor,
    },
    '&[data-p-state="success"]': {
      color: stateColors('success').formStateColor,
    },
  },
  [INPUT_ROOT_CLASS]: {
    ...controlChrome(SCALING_VAR, false),
    ...stateOverrides(),
    ...responsiveAttrStyles('compact', (compact) => compactVars(SCALING_VAR, compact)),
  },
  [TEXTAREA_ROOT_CLASS]: {
    ...controlChrome(TEXTAREA_SCALING_VAR, true),
    ...stateOverrides(),
    ...responsiveAttrStyles('compact', (compact) => compactVars(TEXTAREA_SCALING_VAR, compact)),
  },
});

export const getNativeFieldCss = (): string =>
  inheritColorScheme(
    `.${INPUT_ROOT_CLASS},.${TEXTAREA_ROOT_CLASS},.${LABEL_ROOT_CLASS}`,
    toLayeredCss(getNativeFieldStyles())
  );
