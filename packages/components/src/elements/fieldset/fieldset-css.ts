import {
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  ref,
  spacingStaticMd,
  typescaleMd,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { getCss, mergeDeep } from '../../utils';
import { MESSAGE_ROOT_CLASS } from '../label/label.appearance';
import { FIELDSET_ROOT_CLASS } from './fieldset.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const legendFont = (labelSize: 'small' | 'medium'): JssStyle => ({
  font: `${labelSize === 'small' ? ref(fontWeightSemibold) : ref(fontWeightNormal)} ${labelSize === 'small' ? ref(typescaleSm) : ref(typescaleMd)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
});

const getNativeFieldsetStyles = (): Styles => ({
  [FIELDSET_ROOT_CLASS]: mergeDeep({
    all: 'unset',
    display: 'block',
    '&[hidden]': {
      display: 'none !important',
    },
    '& > legend': {
      all: 'unset',
      marginBottom: ref(spacingStaticMd),
      color: ref(colorPrimary),
      ...legendFont('medium'),
    },
    '&[data-p-label-size="small"] > legend': legendFont('small'),
    '&[data-p-required="true"] > legend::after': {
      content: '" *"',
      userSelect: 'none',
    },
    [`& > .${MESSAGE_ROOT_CLASS}`]: {
      marginTop: ref(spacingStaticMd),
    },
  } as JssStyle),
});

export const getNativeFieldsetCss = (): string =>
  inheritColorScheme('.p-fieldset', toLayeredCss(getNativeFieldsetStyles()));
