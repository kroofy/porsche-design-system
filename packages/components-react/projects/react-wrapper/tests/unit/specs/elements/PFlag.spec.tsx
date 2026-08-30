import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { nativeFlagUrl } from '../../../../../../../components/src/elements/flag/flag-url';
import { PFlag } from '../../../../src/elements/PFlag';

describe('PFlag', () => {
  it('returns an img with nothing wrapping it', () => {
    const { container } = render(<PFlag name="us" />);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('IMG');
    expect(container.querySelector('p-flag')).toBeNull();
    const img = container.firstElementChild as HTMLImageElement;
    expect(img.className).toBe('p-flag');
    expect(img.getAttribute('src')).toBe(nativeFlagUrl('us'));
    expect(img.getAttribute('alt')).toBe('');
  });

  it('puts aria attributes on the img', () => {
    const { container } = render(<PFlag aria-label="German flag" />);
    expect((container.firstElementChild as HTMLImageElement).getAttribute('aria-label')).toBe('German flag');
  });

  it('encodes non-default size on the img', () => {
    const { container } = render(<PFlag size="lg" />);
    expect((container.firstElementChild as HTMLImageElement).getAttribute('data-p-size')).toBe('lg');
  });

  it('forwards a ref to the img', () => {
    const ref = createRef<HTMLImageElement>();
    render(<PFlag ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });
});
