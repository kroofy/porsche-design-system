import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { nativeCrestImgSrc } from '../../../../../../../components/src/elements/crest/crest-url';
import { PCrest } from '../../../../src/elements/PCrest';

describe('PCrest', () => {
  it('returns a picture with nothing wrapping it', () => {
    const { container } = render(PCrest);
    const picture = container.firstElementChild as HTMLPictureElement;

    expect(container.childElementCount).toBe(1);
    expect(picture.tagName).toBe('PICTURE');
    expect(picture.className).toBe('p-crest');
    expect(picture.querySelector('img')?.getAttribute('src')).toBe(nativeCrestImgSrc());
    expect(container.querySelector('p-crest')).toBeNull();
  });

  it('returns a bare a when href is set', () => {
    const { container } = render(PCrest, { props: { href: '#' } });
    const a = container.firstElementChild as HTMLAnchorElement;

    expect(a.tagName).toBe('A');
    expect(a.className).toBe('p-crest');
    expect(a.querySelector('picture')).not.toBeNull();
  });
});
