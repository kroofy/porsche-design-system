import {
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  ref,
  spacingStaticMd,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { getCss, mergeDeep } from '../../utils';
import { TEXT_LIST_ITEM_CLASS, TEXT_LIST_ROOT_CLASS } from './text-list.appearance';

const cssVariableOrderedGridColumn = '--_p-text-list-a';
const cssVariableOrderedPseudoSuffix = '--_p-text-list-b';
const cssVariablePaddingBottom = '--_p-text-list-c';
const cssVariablePaddingTop = '--_p-text-list-d';
const cssVariablePseudoSpace = '--_p-text-list-e';
const cssVariableUnorderedGridColumn = '--_p-text-list-f';
const cssVariableUnorderedPseudoContent = '--_p-text-list-g';
const counter = 'p-text-list-counter';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const orderedBefore = (listStyle: 'decimal' | 'lower-latin'): JssStyle => ({
  content: `counters(${counter},'.',${listStyle}) ${ref(cssVariableOrderedPseudoSuffix, "'.'")}`,
  counterIncrement: counter,
  justifySelf: 'flex-end',
  whiteSpace: 'nowrap',
});

const getNativeTextListStyles = (): Styles => ({
  [TEXT_LIST_ROOT_CLASS]: mergeDeep({
    display: 'block',
    counterReset: counter,
    font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
    margin: 0,
    padding: `${ref(cssVariablePaddingTop, '0')} 0 ${ref(cssVariablePaddingBottom, '0')} 0`,
    listStyleType: 'none',
    color: ref(colorPrimary),
    '&[hidden]': {
      display: 'none !important',
    },
    [`& > .${TEXT_LIST_ITEM_CLASS}`]: {
      [cssVariablePaddingTop]: ref(spacingStaticXs),
      [cssVariablePaddingBottom]: ref(spacingStaticMd),
      [cssVariablePseudoSpace]: ref(cssVariableUnorderedGridColumn, '.375rem'),
      '&::before': {
        content: ref(cssVariableUnorderedPseudoContent, "'•'"),
      },
    },
    [`&[data-p-type="numbered"] > .${TEXT_LIST_ITEM_CLASS}`]: {
      [cssVariablePseudoSpace]: ref(cssVariableOrderedGridColumn, '1.5rem'),
      '&::before': orderedBefore('decimal'),
    },
    [`&[data-p-type="alphabetically"] > .${TEXT_LIST_ITEM_CLASS}`]: {
      [cssVariablePseudoSpace]: ref(cssVariableOrderedGridColumn, '1.5rem'),
      '&::before': orderedBefore('lower-latin'),
    },
  } as JssStyle),
  [TEXT_LIST_ITEM_CLASS]: mergeDeep({
    display: 'grid',
    listStyle: 'none',
    gridTemplateColumns: `${ref(cssVariablePseudoSpace)} 1fr`,
    columnGap: ref(spacingStaticMd),
    font: 'inherit',
    color: 'inherit',
    '&[hidden]': {
      display: 'none !important',
    },
    [`& > .${TEXT_LIST_ROOT_CLASS}`]: {
      [cssVariableUnorderedGridColumn]: '.625rem',
      [cssVariableUnorderedPseudoContent]: '"–"',
      [cssVariableOrderedGridColumn]: '2rem',
      [cssVariableOrderedPseudoSuffix]: '""',
    },
    [`& > .${TEXT_LIST_ROOT_CLASS}:last-child`]: {
      gridColumn: 2,
    },
  } as JssStyle),
});

export const getNativeTextListCss = (): string =>
  inheritColorScheme('.p-text-list,.p-text-list-item', toLayeredCss(getNativeTextListStyles()));
