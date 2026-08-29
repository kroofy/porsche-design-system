import {
  colorCanvas,
  colorContrastHigh,
  colorContrastLower,
  colorContrastMedium,
  colorFrosted,
  colorPrimary,
  durationXl,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  radiusLg,
  radiusMd,
  radiusXl,
  ref,
  spacingStaticXs,
  typescaleSm,
  typescaleXs,
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
import { getCheckboxBaseStyles } from '../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../styles/checkbox/checkbox-checked-base-styles';
import { cssVarInternalCheckboxScaling } from '../styles/checkbox/checkbox-css-vars';
import { getCheckboxIndeterminateBaseStyles } from '../styles/checkbox/checkbox-indeterminate-base-styles';
import { getThemedFormStateColors } from '../styles/form-state-color-styles';
import { getCss } from '../utils';
import { getInlineSVGBackgroundImage } from '../utils/svg/getInlineSVGBackgroundImage';
import { mediaQueryMin, RESPONSIVE_BREAKPOINTS } from './appearance';
import {
  CHECKBOX_ROOT_CLASS,
  CHECKBOX_SPINNER_CLASS,
  FIELD_ROOT_CLASS,
  type FieldState,
  INPUT_ROOT_CLASS,
  RADIO_ROOT_CLASS,
  RADIO_SPINNER_CLASS,
  RADIOS_ROOT_CLASS,
  SELECT_ROOT_CLASS,
  TEXTAREA_ROOT_CLASS,
} from './input';
import { DESCRIPTION_ROOT_CLASS, LABEL_REQUIRED_CLASS, LABEL_ROOT_CLASS, MESSAGE_ROOT_CLASS } from './label';

const SCALING_VAR = '--_p-input-base-a';
const TEXTAREA_SCALING_VAR = '--_p-textarea-a';
const SELECT_SCALING_VAR = '--_p-select-a';
const RADIO_SCALING_VAR = '--_p-radio-a';
const DEFAULT_SCALE = 1;
const COMPACT_SCALE = 0.64285714;

const selectChevron = getInlineSVGBackgroundImage(
  `<path fill="CanvasText" d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/>`
);
const radioCheckedIcon = getInlineSVGBackgroundImage(`<circle cx="12" cy="12" r="6"/>`);

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

const choiceCompactVars = (scalingVar: string, compact: boolean): JssStyle => ({
  [scalingVar]: compact ? COMPACT_SCALE : DEFAULT_SCALE,
  borderRadius: compact ? ref(radiusMd) : ref(radiusLg),
});

const choiceLabelPadding = (scalingVar: string): JssStyle => {
  const dimension = `calc(${ref(scalingVar)} * 1.75rem)`;
  return {
    paddingTop: `max(0px, calc((${dimension} - ${ref(leadingNormal)}) / 2))`,
    paddingInlineStart: `calc(11.2px * (${ref(scalingVar)} - 0.64285714) + 4px)`,
  };
};

const choiceFieldLayout = (controlClass: string, scalingVar: string, spinnerClass: string): JssStyle => ({
  [`.${FIELD_ROOT_CLASS}:has(> .${controlClass})`]: {
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    [scalingVar]: DEFAULT_SCALE,
  },
  [`.${FIELD_ROOT_CLASS}:has(> .${controlClass}[data-p-compact="true"])`]: {
    [scalingVar]: COMPACT_SCALE,
  },
  [`.${FIELD_ROOT_CLASS}:has(> .${controlClass}) > .${controlClass}`]: {
    gridColumn: 1,
    gridRow: 1,
  },
  [`.${FIELD_ROOT_CLASS}:has(> .${controlClass}) > .${LABEL_ROOT_CLASS}`]: {
    gridColumn: 2,
    gridRow: 1,
    ...choiceLabelPadding(scalingVar),
  },
  [`.${FIELD_ROOT_CLASS}:has(> .${controlClass}) > .${DESCRIPTION_ROOT_CLASS}`]: {
    gridColumn: '1 / -1',
  },
  [`.${FIELD_ROOT_CLASS}:has(> .${controlClass}) > .${MESSAGE_ROOT_CLASS}`]: {
    gridColumn: '1 / -1',
  },
  [`.${FIELD_ROOT_CLASS}:has(> .${controlClass}) > .${spinnerClass}`]: {
    gridColumn: 1,
    gridRow: 1,
    alignSelf: 'center',
    justifySelf: 'center',
    pointerEvents: 'none',
    width: `calc(${ref(scalingVar)} * 1.75rem - 2px)`,
    height: `calc(${ref(scalingVar)} * 1.75rem - 2px)`,
    '--p-spinner-color': 'currentcolor',
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
});

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

const checkboxStateOverrides = (): JssStyle => {
  const styles: JssStyle = {};
  for (const state of ['error', 'success'] as const) {
    const colors = stateColors(state);
    Object.assign(styles, {
      [`&[data-p-state="${state}"]`]: {
        borderColor: colors.formStateBorderColor,
        background: colors.formStateBackgroundColor,
        ...hoverMediaQuery({
          '&:hover:not(:disabled):not([data-p-loading="true"])': {
            borderColor: colors.formStateBorderHoverColor,
          },
        }),
        '&:checked': getCheckboxCheckedBaseStyles(false, state),
        '&:indeterminate, &[data-p-indeterminate="true"]': getCheckboxIndeterminateBaseStyles(false, state),
      },
    });
  }
  return styles;
};

const radioStateOverrides = (): JssStyle => {
  const styles: JssStyle = {};
  for (const state of ['error', 'success'] as const) {
    const colors = stateColors(state);
    Object.assign(styles, {
      [`&[data-p-state="${state}"]`]: {
        borderColor: colors.formStateBorderColor,
        background: colors.formStateBackgroundColor,
        ...hoverMediaQuery({
          '&:hover:not(:disabled):not([data-p-loading="true"])': {
            borderColor: colors.formStateBorderHoverColor,
          },
        }),
        '&:checked': {
          background: colors.formStateBorderColor,
        },
      },
    });
  }
  return styles;
};

const checkboxChrome = (): JssStyle => ({
  ...getCheckboxBaseStyles(false, false, false, 'none'),
  [cssVarInternalCheckboxScaling]: DEFAULT_SCALE,
  cursor: 'pointer',
  '&:checked': getCheckboxCheckedBaseStyles(false, 'none'),
  '&:indeterminate, &[data-p-indeterminate="true"]': getCheckboxIndeterminateBaseStyles(false, 'none'),
  '&:focus-visible': getFocusBaseStyles(),
  '&:disabled, &[data-p-loading="true"]': {
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  '&:disabled:not([data-p-loading="true"])': getDisabledBaseStyles({
    borderColor: 'GrayText',
  }),
  '&[data-p-loading="true"]:checked::before, &[data-p-loading="true"]:indeterminate::before': {
    mask: 'none',
    background: 'none',
  },
  ...checkboxStateOverrides(),
  ...responsiveAttrStyles('compact', (compact) => choiceCompactVars(cssVarInternalCheckboxScaling, compact)),
});

const radioChrome = (): JssStyle => {
  const none = stateColors('none');
  const radioDimension = `calc(${ref(RADIO_SCALING_VAR)} * 1.75rem)`;
  const radioMarginBlock = `max(0px, calc((${ref(leadingNormal)} - ${radioDimension}) / 2))`;
  const radioTouchInset = 'calc(-1px - max(0px, calc(24px - ' + radioDimension + ') / 2))';

  return {
    all: 'unset',
    display: 'grid',
    width: radioDimension,
    height: radioDimension,
    marginBlock: radioMarginBlock,
    boxSizing: 'border-box',
    font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`,
    background: none.formStateBackgroundColor,
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
    border: `1px solid ${none.formStateBorderColor}`,
    borderRadius: ref(radiusFull),
    cursor: 'pointer',
    [RADIO_SCALING_VAR]: DEFAULT_SCALE,
    '&::before': {
      content: '""',
      gridArea: '1/1',
    },
    '&::after': {
      content: '""',
      margin: radioTouchInset,
      gridArea: '1/1',
    },
    '&:checked': {
      background: ref(colorPrimary),
      '&::before': {
        WebkitMask: `${radioCheckedIcon} center/contain no-repeat`,
        mask: `${radioCheckedIcon} center/contain no-repeat`,
        backgroundColor: ref(colorCanvas),
        ...forcedColorsMediaQuery({
          background: 'CanvasText',
        }),
      },
    },
    '&:focus-visible': getFocusBaseStyles(),
    '&:disabled, &[data-p-loading="true"]': {
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    '&:disabled:not([data-p-loading="true"])': getDisabledBaseStyles({
      borderColor: 'GrayText',
    }),
    '&[data-p-loading="true"]:checked::before': {
      mask: 'none',
      background: 'none',
    },
    ...hoverMediaQuery({
      '&:hover:not(:disabled):not([data-p-loading="true"])': {
        borderColor: none.formStateBorderHoverColor,
      },
    }),
    ...radioStateOverrides(),
    ...responsiveAttrStyles('compact', (compact) => ({
      [RADIO_SCALING_VAR]: compact ? COMPACT_SCALE : DEFAULT_SCALE,
    })),
    '&[hidden]': {
      display: 'none !important',
    },
  };
};

const selectChrome = (): JssStyle => {
  const paddingInline = `calc(22.4px * (${ref(SELECT_SCALING_VAR)} - 0.64285714) + 8px)`;
  return {
    ...controlChrome(SELECT_SCALING_VAR, false),
    cursor: 'pointer',
    appearance: 'none',
    paddingInlineEnd: `calc(${paddingInline} + 1.5rem)`,
    backgroundImage: selectChevron,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `right ${paddingInline} center`,
    backgroundSize: '1.5rem',
    ...stateOverrides(),
    ...responsiveAttrStyles('compact', (compact) => compactVars(SELECT_SCALING_VAR, compact)),
  };
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
    ...choiceFieldLayout(CHECKBOX_ROOT_CLASS, cssVarInternalCheckboxScaling, CHECKBOX_SPINNER_CLASS),
    ...choiceFieldLayout(RADIO_ROOT_CLASS, RADIO_SCALING_VAR, RADIO_SPINNER_CLASS),
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
  [SELECT_ROOT_CLASS]: selectChrome(),
  [CHECKBOX_ROOT_CLASS]: checkboxChrome(),
  [RADIO_ROOT_CLASS]: radioChrome(),
  [RADIOS_ROOT_CLASS]: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    rowGap: `calc(11.2px * (${ref(RADIO_SCALING_VAR)} - 0.64285714) + 4px)`,
    [RADIO_SCALING_VAR]: DEFAULT_SCALE,
    '&[data-p-compact="true"]': {
      [RADIO_SCALING_VAR]: COMPACT_SCALE,
    },
  },
});

export const getNativeFieldCss = (): string =>
  inheritColorScheme(
    `.${INPUT_ROOT_CLASS},.${TEXTAREA_ROOT_CLASS},.${SELECT_ROOT_CLASS},.${CHECKBOX_ROOT_CLASS},.${RADIO_ROOT_CLASS},.${LABEL_ROOT_CLASS}`,
    toLayeredCss(getNativeFieldStyles())
  );
