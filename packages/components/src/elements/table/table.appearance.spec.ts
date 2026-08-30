import {
  TABLE_BODY_CLASS,
  TABLE_CELL_CLASS,
  TABLE_HEAD_CELL_CLASS,
  TABLE_HEAD_CLASS,
  TABLE_ROOT_CLASS,
  TABLE_ROW_CLASS,
  tableAppearance,
  tableBodyAppearance,
  tableCellAppearance,
  tableHeadAppearance,
  tableHeadCellAppearance,
  tableRowAppearance,
} from './table.appearance';

describe('tableAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(tableAppearance()).toEqual({ className: TABLE_ROOT_CLASS, attrs: {} });
  });

  it('omits default layout and compact', () => {
    expect(tableAppearance({ compact: false, layout: 'auto' }).attrs).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(tableAppearance({ compact: true, layout: 'fixed' })).toEqual({
      className: 'p-table',
      attrs: { 'data-p-compact': 'true', 'data-p-layout': 'fixed' },
    });
  });
});

describe('table part appearance', () => {
  it('emits only the part class', () => {
    expect(tableHeadAppearance()).toEqual({ className: TABLE_HEAD_CLASS, attrs: {} });
    expect(tableBodyAppearance()).toEqual({ className: TABLE_BODY_CLASS, attrs: {} });
    expect(tableRowAppearance()).toEqual({ className: TABLE_ROW_CLASS, attrs: {} });
  });

  it('encodes head cell hide-label and multiline', () => {
    expect(tableHeadCellAppearance({ hideLabel: true, multiline: true })).toEqual({
      className: TABLE_HEAD_CELL_CLASS,
      attrs: { 'data-p-hide-label': 'true', 'data-p-multiline': 'true' },
    });
  });

  it('encodes cell multiline', () => {
    expect(tableCellAppearance({ multiline: true })).toEqual({
      className: TABLE_CELL_CLASS,
      attrs: { 'data-p-multiline': 'true' },
    });
  });
});
