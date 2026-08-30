import { SHEET_ROOT_CLASS, sheetAppearance } from './sheet.appearance';

describe('sheetAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(sheetAppearance()).toEqual({ className: SHEET_ROOT_CLASS, attrs: {} });
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(sheetAppearance({ background: 'surface' })).toEqual({
      className: 'p-sheet',
      attrs: {
        'data-p-background': 'surface',
      },
    });
  });
});
