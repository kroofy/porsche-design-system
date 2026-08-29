import { DISPLAY_ROOT_CLASS, displayAppearance, displayTagForSize } from './display.appearance';

describe('displayAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(displayAppearance()).toEqual({ className: DISPLAY_ROOT_CLASS, attrs: {} });
  });

  it('omits default size, align and color', () => {
    expect(displayAppearance({ size: 'large', align: 'start', color: 'primary' }).attrs).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(displayAppearance({ size: 'small', align: 'center', color: 'inherit', ellipsis: true })).toEqual({
      className: 'p-display',
      attrs: {
        'data-p-size': 'small',
        'data-p-align': 'center',
        'data-p-color': 'inherit',
        'data-p-ellipsis': 'true',
      },
    });
  });
});

describe('displayTagForSize()', () => {
  it('defaults to h1 for large', () => {
    expect(displayTagForSize()).toBe('h1');
    expect(displayTagForSize('large')).toBe('h1');
  });

  it('maps size to a heading tag', () => {
    expect(displayTagForSize('small')).toBe('h3');
    expect(displayTagForSize('medium')).toBe('h2');
  });

  it('prefers an explicit tag', () => {
    expect(displayTagForSize('large', 'h6')).toBe('h6');
  });
});
