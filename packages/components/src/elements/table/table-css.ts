import {
  colorContrastLow,
  colorFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  ref,
  spacingFluidMd,
  spacingFluidSm,
  spacingStaticSm,
  typescaleSm,
  typescaleXs,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { getTransition, hoverMediaQuery } from '../../styles';
import { getCss, mergeDeep } from '../../utils';
import {
  TABLE_BODY_CLASS,
  TABLE_CELL_CLASS,
  TABLE_HEAD_CELL_CLASS,
  TABLE_HEAD_CLASS,
  TABLE_ROOT_CLASS,
  TABLE_ROW_CLASS,
} from './table.appearance';

const cssVariableTablePadding = '--_p-table-a';
const cssVariableTableHoverColor = '--_p-table-b';
const cssVariableTableBorderColor = '--_p-table-c';
const cssVariableTableBorderWidth = '--_p-table-d';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const hidden: JssStyle = {
  '&[hidden]': {
    display: 'none !important',
  },
};

const getNativeTableStyles = (): Styles => ({
  [TABLE_ROOT_CLASS]: mergeDeep({
    [cssVariableTableHoverColor]: ref(colorFrosted),
    [cssVariableTableBorderColor]: ref(colorContrastLow),
    [cssVariableTablePadding]: ref(spacingFluidSm),
    [cssVariableTableBorderWidth]: '1px',
    display: 'table',
    borderCollapse: 'collapse',
    width: '100%',
    whiteSpace: 'nowrap',
    font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
    color: ref(colorPrimary),
    textAlign: 'start',
    ...hidden,
    '& > caption': {
      marginBottom: ref(spacingFluidMd),
      whiteSpace: 'normal',
      textAlign: 'start',
    },
    '&[data-p-compact="true"]': {
      [cssVariableTablePadding]: ref(spacingStaticSm),
    },
    '&[data-p-layout="fixed"]': {
      tableLayout: 'fixed',
      minWidth: '100%',
      width: 'auto',
    },
  } as JssStyle),
  [TABLE_HEAD_CLASS]: mergeDeep({
    font: `${ref(fontWeightSemibold)} ${ref(typescaleXs)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
    borderBottom: `1px solid ${ref(cssVariableTableBorderColor)}`,
    ...hidden,
    [`& > .${TABLE_ROW_CLASS}`]: {
      [cssVariableTableBorderWidth]: '0px',
      [cssVariableTableHoverColor]: 'none',
    },
  } as JssStyle),
  [TABLE_BODY_CLASS]: mergeDeep({
    ...hidden,
  } as JssStyle),
  [TABLE_ROW_CLASS]: mergeDeep(
    {
      borderBottom: `${ref(cssVariableTableBorderWidth)} solid ${ref(cssVariableTableBorderColor)}`,
      transition: getTransition('background'),
      ...hidden,
    } as JssStyle,
    hoverMediaQuery({
      '&:hover': {
        background: ref(cssVariableTableHoverColor),
      },
    })
  ),
  [TABLE_HEAD_CELL_CLASS]: mergeDeep({
    font: 'inherit',
    textAlign: 'inherit',
    padding: `2px ${ref(cssVariableTablePadding, ref(spacingFluidSm))} ${ref(cssVariableTablePadding, ref(spacingFluidSm))}`,
    verticalAlign: 'bottom',
    whiteSpace: 'nowrap',
    ...hidden,
    '&[data-p-multiline="true"]': {
      whiteSpace: 'normal',
    },
    '&[data-p-hide-label="true"]': {
      fontSize: 0,
      lineHeight: 0,
    },
  } as JssStyle),
  [TABLE_CELL_CLASS]: mergeDeep({
    font: 'inherit',
    textAlign: 'inherit',
    padding: ref(cssVariableTablePadding),
    margin: 0,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    ...hidden,
    '&[data-p-multiline="true"]': {
      whiteSpace: 'normal',
    },
  } as JssStyle),
});

export const getNativeTableCss = (): string =>
  inheritColorScheme(
    '.p-table,.p-table-head,.p-table-body,.p-table-row,.p-table-head-cell,.p-table-cell',
    toLayeredCss(getNativeTableStyles())
  );
