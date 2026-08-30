import { MODAL_ROOT_CLASS, modalAppearance } from './modal.appearance';

describe('modalAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(modalAppearance()).toEqual({ className: MODAL_ROOT_CLASS, attrs: {} });
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(modalAppearance({ background: 'surface', backdrop: 'shading', fullscreen: true })).toEqual({
      className: 'p-modal',
      attrs: {
        'data-p-background': 'surface',
        'data-p-backdrop': 'shading',
        'data-p-fullscreen': 'true',
      },
    });
  });

  it('encodes responsive fullscreen without a default base attr', () => {
    expect(modalAppearance({ fullscreen: { base: false, m: true } })).toEqual({
      className: 'p-modal',
      attrs: {
        'data-p-fullscreen-m': 'true',
      },
    });
  });
});
