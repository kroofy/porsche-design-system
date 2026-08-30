import { HEADING_ROOT_CLASS, headingAppearance, headingTagForSize } from './heading.appearance';

describe('headingAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(headingAppearance()).toEqual({ className: HEADING_ROOT_CLASS, attrs: {} });
  });

  it('omits default size, weight, align, color and hyphens', () => {
    expect(
      headingAppearance({
        size: '2xl',
        weight: 'normal',
        align: 'start',
        color: 'primary',
        hyphens: 'none',
      }).attrs
    ).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      headingAppearance({
        size: { base: '2xl', m: '5xl' },
        weight: 'bold',
        align: 'center',
        color: 'contrast-high',
        hyphens: 'auto',
        ellipsis: true,
      })
    ).toEqual({
      className: 'p-heading',
      attrs: {
        'data-p-size-m': '5xl',
        'data-p-weight': 'bold',
        'data-p-align': 'center',
        'data-p-color': 'contrast-high',
        'data-p-hyphens': 'auto',
        'data-p-ellipsis': 'true',
      },
    });
  });
});

describe('headingTagForSize()', () => {
  it('defaults to h2 for 2xl', () => {
    expect(headingTagForSize()).toBe('h2');
    expect(headingTagForSize('2xl')).toBe('h2');
  });

  it('maps size to a heading tag', () => {
    expect(headingTagForSize('sm')).toBe('h6');
    expect(headingTagForSize('lg')).toBe('h4');
  });

  it('prefers an explicit tag', () => {
    expect(headingTagForSize('sm', 'h1')).toBe('h1');
  });

  it('uses h2 for responsive size objects', () => {
    expect(headingTagForSize({ base: 'sm', m: '5xl' })).toBe('h2');
  });
});
