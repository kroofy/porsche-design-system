import { colorPrimary, ref } from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { forcedColorsMediaQuery, getFocusBaseStyles } from '../../styles';
import { getCss } from '../../utils';
import { WORDMARK_ROOT_CLASS } from './wordmark.appearance';

const wordmarkHeight = 'clamp(0.63rem, 0.42vw + 0.5rem, 1rem)';

const svgStyles: JssStyle = {
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  fill: ref(colorPrimary),
  ...forcedColorsMediaQuery({
    fill: 'CanvasText',
  }),
};

const childSvgStyles: JssStyle = {
  ...svgStyles,
  height: 'inherit',
};

const getNativeWordmarkStyles = (): Styles => ({
  [WORDMARK_ROOT_CLASS]: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top',
    maxWidth: '100%',
    maxHeight: '100%',
    boxSizing: 'content-box',
    height: wordmarkHeight,
    '@supports (height: round(down, 1px, 1px))': {
      height: `round(down, ${wordmarkHeight}, 1px)`,
    },
    '&[hidden]': {
      display: 'none !important',
    },
    '&[data-p-size="inherit"]': {
      height: 'inherit',
      '@supports (height: round(down, 1px, 1px))': {
        height: 'inherit',
      },
    },
    '& svg': childSvgStyles,
    '&:is(svg)': svgStyles,
    '&:is(a)': {
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '1px',
      },
      '&:focus-visible::before': getFocusBaseStyles(),
    },
  } as JssStyle,
});

export const getNativeWordmarkCss = (): string =>
  `.p-wordmark{color-scheme:inherit}\n@layer pds.elements {\n${getCss(getNativeWordmarkStyles()).trim()}\n}\n`;
