import { WORDMARK_ROOT_CLASS, wordmarkAppearance } from './wordmark.appearance';

describe('wordmarkAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(wordmarkAppearance()).toEqual({ className: WORDMARK_ROOT_CLASS, attrs: {} });
  });

  it('sets size inherit on the host', () => {
    expect(wordmarkAppearance({ size: 'inherit' })).toEqual({
      className: 'p-wordmark',
      attrs: { 'data-p-size': 'inherit' },
    });
  });
});
