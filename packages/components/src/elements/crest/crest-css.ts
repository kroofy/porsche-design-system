import type { JssStyle, Styles } from 'jss';
import { getFocusBaseStyles } from '../../styles';
import { getCss } from '../../utils';
import { CREST_ROOT_CLASS } from './crest.appearance';
import { CREST_HEIGHT, CREST_WIDTH } from './crest-url';

const pictureStyles: JssStyle = {
  display: 'block',
  width: `min(${CREST_WIDTH}px, 100%)`,
  height: `min(${CREST_HEIGHT}px, 100%)`,
};

const imgStyles: JssStyle = {
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  width: 'auto',
  height: 'auto',
};

const getNativeCrestStyles = (): Styles => ({
  [CREST_ROOT_CLASS]: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top',
    boxSizing: 'content-box',
    maxWidth: `${CREST_WIDTH}px`,
    maxHeight: `${CREST_HEIGHT}px`,
    width: 'inherit',
    height: 'inherit',
    '&[hidden]': {
      display: 'none !important',
    },
    '& picture, &:is(picture)': pictureStyles,
    '& img': imgStyles,
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

export const getNativeCrestCss = (): string =>
  `.p-crest{color-scheme:inherit}\n@layer pds.elements {\n${getCss(getNativeCrestStyles()).trim()}\n}\n`;
