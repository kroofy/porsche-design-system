import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { nativeFlagUrl } from '../../../../../../../components/src/elements/flag/flag-url';
import { PFlag } from '../../../../src/elements/PFlag';

describe('PFlag', () => {
  it('returns an img with nothing wrapping it', () => {
    const { container } = render(PFlag, { props: { name: 'us' } });
    const img = container.firstElementChild as HTMLImageElement;

    expect(container.childElementCount).toBe(1);
    expect(img.tagName).toBe('IMG');
    expect(img.className).toBe('p-flag');
    expect(img.getAttribute('src')).toBe(nativeFlagUrl('us'));
    expect(container.querySelector('p-flag')).toBeNull();
  });

  it('encodes non-default size on the img', () => {
    const { container } = render(PFlag, { props: { size: 'lg' } });
    expect((container.firstElementChild as HTMLImageElement).getAttribute('data-p-size')).toBe('lg');
  });
});
