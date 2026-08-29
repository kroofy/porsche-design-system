import { TEXT_ROOT_CLASS, textAppearance } from './text.appearance';

describe('textAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(textAppearance()).toEqual({ className: TEXT_ROOT_CLASS, attrs: {} });
  });

  it('omits default size, weight, align, color and hyphens', () => {
    expect(
      textAppearance({
        size: 'sm',
        weight: 'normal',
        align: 'start',
        color: 'primary',
        hyphens: 'inherit',
      }).attrs
    ).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      textAppearance({
        size: 'lg',
        weight: 'semibold',
        align: 'end',
        color: 'error',
        hyphens: 'auto',
        ellipsis: true,
      })
    ).toEqual({
      className: 'p-text',
      attrs: {
        'data-p-size': 'lg',
        'data-p-weight': 'semibold',
        'data-p-align': 'end',
        'data-p-color': 'error',
        'data-p-hyphens': 'auto',
        'data-p-ellipsis': 'true',
      },
    });
  });
});
