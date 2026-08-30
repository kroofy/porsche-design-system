import {
  blurFrosted,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  ref,
  spacingStatic2Xs,
  spacingStaticSm,
  spacingStaticXs,
  typescaleXs,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { getColors } from '../../components/tag/tag-styles';
import { forcedColorsMediaQuery, getFocusBaseStyles, getTransition, hoverMediaQuery } from '../../styles';
import { getCss, mergeDeep } from '../../utils';
import { TAG_ICON_CLASS, TAG_ROOT_CLASS, TAG_VARIANTS, type TagVariant } from './tag.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const FROSTED: ReadonlySet<TagVariant> = new Set([
  'secondary',
  'info-frosted',
  'success-frosted',
  'warning-frosted',
  'error-frosted',
]);

const variantStyles = (variant: TagVariant): JssStyle => {
  const { textColor, backgroundColor, backgroundHoverColor } = getColors(variant);
  return {
    color: textColor,
    background: backgroundColor,
    ...(FROSTED.has(variant)
      ? {
          WebkitBackdropFilter: ref(blurFrosted),
          backdropFilter: ref(blurFrosted),
        }
      : {
          WebkitBackdropFilter: 'none',
          backdropFilter: 'none',
        }),
    ...hoverMediaQuery({
      '&:is(a):hover, &:is(button):hover': {
        background: backgroundHoverColor,
      },
    }),
  };
};

const getNativeTagStyles = (): Styles => {
  const variantOverrides: JssStyle = {};
  for (const variant of TAG_VARIANTS) {
    if (variant === 'secondary') {
      continue;
    }
    variantOverrides[`&[data-p-variant="${variant}"]`] = variantStyles(variant);
  }

  return {
    [TAG_ROOT_CLASS]: mergeDeep({
      all: 'unset',
      position: 'relative',
      display: 'inline-flex',
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      gap: '2px',
      padding: `${ref(spacingStaticXs)} calc(12 * ${ref(spacingStatic2Xs)})`,
      borderRadius: `calc(${ref(spacingStaticXs)} + (${ref(leadingNormal)} / 2))`,
      font: `${ref(fontWeightNormal)} ${ref(typescaleXs)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`,
      ...variantStyles('secondary'),
      '&[hidden]': {
        display: 'none !important',
      },
      '&[data-p-compact="true"]': {
        padding: `${ref(spacingStatic2Xs)} ${ref(spacingStaticSm)}`,
        borderRadius: `calc(1px + (${ref(leadingNormal)} / 2))`,
      },
      '&:is(a), &:is(button)': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
      '&:is(a):focus-visible, &:is(button):focus-visible': getFocusBaseStyles(),
      '& > br': {
        display: 'none',
      },
      [`& > .${TAG_ICON_CLASS}`]: {
        marginInlineStart: '-2px',
      },
      ...variantOverrides,
      ...forcedColorsMediaQuery({
        outline: '2px solid CanvasText',
        outlineOffset: '-2px',
        backgroundColor: 'Canvas',
        color: 'CanvasText',
      }),
    } as JssStyle),
  };
};

export const getNativeTagCss = (): string => inheritColorScheme('.p-tag', toLayeredCss(getNativeTagStyles()));
