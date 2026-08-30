import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { nativeModelSignatureUrl } from '../../../../../../../components/src/elements/model-signature/model-signature-url';
import { PModelSignature } from '../../../../src/elements/PModelSignature';

describe('PModelSignature', () => {
  it('returns an img with nothing wrapping it', () => {
    const { container } = render(<PModelSignature />);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('IMG');
    expect(container.querySelector('p-model-signature')).toBeNull();
    const img = container.firstElementChild as HTMLImageElement;
    expect(img.className).toBe('p-model-signature');
    expect(img.getAttribute('src')).toBe(nativeModelSignatureUrl('911'));
    expect(img.getAttribute('alt')).toBe('911');
  });

  it('encodes non-default appearance on the img', () => {
    const { container } = render(<PModelSignature model="718" color="contrast-high" size="inherit" safeZone={false} />);
    const img = container.firstElementChild as HTMLImageElement;

    expect(img.getAttribute('data-p-model')).toBe('718');
    expect(img.getAttribute('data-p-color')).toBe('contrast-high');
    expect(img.getAttribute('data-p-size')).toBe('inherit');
    expect(img.getAttribute('data-p-safe-zone')).toBe('false');
    expect(img.getAttribute('src')).toBe(nativeModelSignatureUrl('718'));
  });

  it('forwards a ref to the img', () => {
    const ref = createRef<HTMLImageElement>();
    render(<PModelSignature ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });
});
