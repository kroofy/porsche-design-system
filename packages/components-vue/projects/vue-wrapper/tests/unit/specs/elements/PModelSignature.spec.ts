import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { nativeModelSignatureUrl } from '../../../../../../../components/src/elements/model-signature/model-signature-url';
import { PModelSignature } from '../../../../src/elements/PModelSignature';

describe('PModelSignature', () => {
  it('returns an img with nothing wrapping it', () => {
    const { container } = render(PModelSignature);
    const img = container.firstElementChild as HTMLImageElement;

    expect(container.childElementCount).toBe(1);
    expect(img.tagName).toBe('IMG');
    expect(img.className).toBe('p-model-signature');
    expect(img.getAttribute('src')).toBe(nativeModelSignatureUrl('911'));
    expect(container.querySelector('p-model-signature')).toBeNull();
  });

  it('encodes non-default appearance on the img', () => {
    const { container } = render(PModelSignature, {
      props: { model: '718', color: 'contrast-high', size: 'inherit', safeZone: false },
    });
    const img = container.firstElementChild as HTMLImageElement;

    expect(img.getAttribute('data-p-model')).toBe('718');
    expect(img.getAttribute('data-p-color')).toBe('contrast-high');
    expect(img.getAttribute('data-p-size')).toBe('inherit');
    expect(img.getAttribute('data-p-safe-zone')).toBe('false');
  });
});
