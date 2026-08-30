import type { NativeAppearance } from '../appearance';

export const SHEET_ROOT_CLASS = 'p-sheet' as const;
export const SHEET_SCROLLER_CLASS = 'p-sheet__scroller' as const;
export const SHEET_PANEL_CLASS = 'p-sheet__panel' as const;
export const SHEET_DISMISS_CLASS = 'p-sheet__dismiss' as const;
export const SHEET_HEADER_CLASS = 'p-sheet__header' as const;

export const SHEET_BACKGROUNDS = ['canvas', 'surface'] as const;
export type SheetBackground = (typeof SHEET_BACKGROUNDS)[number];

export type SheetAppearanceProps = {
  background?: SheetBackground;
};

const DEFAULT_BACKGROUND: SheetBackground = 'canvas';

export const sheetAppearance = (props: SheetAppearanceProps = {}): NativeAppearance => {
  const { background = DEFAULT_BACKGROUND } = props;
  return {
    className: SHEET_ROOT_CLASS,
    attrs: {
      ...(background !== DEFAULT_BACKGROUND ? { 'data-p-background': background } : {}),
    },
  };
};
