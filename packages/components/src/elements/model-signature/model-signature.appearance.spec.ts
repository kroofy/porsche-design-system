import { MODEL_SIGNATURE_ROOT_CLASS, modelSignatureAppearance } from './model-signature.appearance';

describe('modelSignatureAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(modelSignatureAppearance()).toEqual({ className: MODEL_SIGNATURE_ROOT_CLASS, attrs: {} });
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      modelSignatureAppearance({
        model: '718',
        size: 'inherit',
        color: 'contrast-high',
        safeZone: false,
      })
    ).toEqual({
      className: 'p-model-signature',
      attrs: {
        'data-p-model': '718',
        'data-p-size': 'inherit',
        'data-p-color': 'contrast-high',
        'data-p-safe-zone': 'false',
      },
    });
  });
});
