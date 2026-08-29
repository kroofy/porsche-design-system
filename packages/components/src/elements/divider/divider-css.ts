import type { JssStyle, Styles } from 'jss';
import { forcedColorsMediaQuery } from '../../styles';
import { colorMap } from '../../styles/maps';
import { getCss, mergeDeep } from '../../utils';
import { RESPONSIVE_BREAKPOINTS } from '../appearance';
import { mediaQueryMin } from '../appearance-mq';
import { DIVIDER_COLORS, DIVIDER_DIRECTIONS, DIVIDER_ROOT_CLASS } from './divider.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const directionStyles = (direction: string): JssStyle =>
  direction === 'vertical' ? { height: '100%', width: '1px' } : { height: '1px', width: '100%' };

const colorStyles = (color: string): JssStyle => ({
  background: colorMap[color as keyof typeof colorMap],
  ...forcedColorsMediaQuery({
    background: 'CanvasText',
  }),
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

const getNativeDividerStyles = (): Styles => ({
  [DIVIDER_ROOT_CLASS]: mergeDeep(
    {
      all: 'unset',
      display: 'block',
      ...directionStyles('horizontal'),
      ...colorStyles('contrast-lower'),
      '&[hidden]': {
        display: 'none !important',
      },
    } as JssStyle,
    responsiveTokenStyles('direction', DIVIDER_DIRECTIONS, directionStyles),
    responsiveTokenStyles('color', DIVIDER_COLORS, colorStyles)
  ),
});

export const getNativeDividerCss = (): string =>
  inheritColorScheme('.p-divider', toLayeredCss(getNativeDividerStyles()));
