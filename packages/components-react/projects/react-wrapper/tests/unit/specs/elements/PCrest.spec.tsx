import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { nativeCrestImgSrc } from '../../../../../../../components/src/elements/crest/crest-url';
import { PCrest } from '../../../../src/elements/PCrest';

describe('PCrest', () => {
  it('returns a picture with nothing wrapping it', () => {
    const { container } = render(<PCrest />);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('PICTURE');
    expect(container.querySelector('p-crest')).toBeNull();
    const picture = container.firstElementChild as HTMLPictureElement;
    expect(picture.className).toBe('p-crest');
    expect(picture.querySelector('img')?.getAttribute('src')).toBe(nativeCrestImgSrc());
    expect(picture.querySelector('img')?.getAttribute('alt')).toBe('Porsche');
  });

  it('returns a bare a when href is set', () => {
    const { container } = render(<PCrest href="#" />);
    const a = container.firstElementChild as HTMLAnchorElement;

    expect(container.childElementCount).toBe(1);
    expect(a.tagName).toBe('A');
    expect(a.className).toBe('p-crest');
    expect(a.getAttribute('href')).toBe('#');
    expect(a.querySelector('picture')).not.toBeNull();
  });

  it('forwards a ref to the picture', () => {
    const ref = createRef<HTMLElement>();
    render(<PCrest ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLPictureElement);
  });
});
