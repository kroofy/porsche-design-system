import {
  TEXT_LIST_ITEM_CLASS,
  TEXT_LIST_ROOT_CLASS,
  textListAppearance,
  textListItemAppearance,
  textListTagForType,
} from './text-list.appearance';

describe('textListAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(textListAppearance()).toEqual({ className: TEXT_LIST_ROOT_CLASS, attrs: {} });
  });

  it('omits default unordered type', () => {
    expect(textListAppearance({ type: 'unordered' }).attrs).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(textListAppearance({ type: 'numbered' })).toEqual({
      className: 'p-text-list',
      attrs: { 'data-p-type': 'numbered' },
    });
    expect(textListAppearance({ type: 'alphabetically' }).attrs).toEqual({ 'data-p-type': 'alphabetically' });
  });
});

describe('textListTagForType()', () => {
  it('uses ul for unordered', () => {
    expect(textListTagForType()).toBe('ul');
    expect(textListTagForType('unordered')).toBe('ul');
  });

  it('uses ol for numbered and alphabetically', () => {
    expect(textListTagForType('numbered')).toBe('ol');
    expect(textListTagForType('alphabetically')).toBe('ol');
  });
});

describe('textListItemAppearance()', () => {
  it('emits only the item class', () => {
    expect(textListItemAppearance()).toEqual({ className: TEXT_LIST_ITEM_CLASS, attrs: {} });
  });
});
