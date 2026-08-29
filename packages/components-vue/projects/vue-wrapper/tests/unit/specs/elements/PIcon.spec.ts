import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { nativeIconUrl } from '../../../../../../../components/src/elements/icon';
import { PIcon } from '../../../../src/elements/PIcon';

describe('PIcon', () => {
  it('returns an img with nothing wrapping it', () => {
    const { container } = render(PIcon, { props: { name: 'delete' } });

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('IMG');
    expect(container.querySelector('p-icon')).toBeNull();
    const img = container.firstElementChild as HTMLImageElement;
    expect(img.className).toBe('p-icon');
    expect(img.getAttribute('data-p-name')).toBe('delete');
    expect(img.getAttribute('src')).toBe(nativeIconUrl('delete'));
    expect(img.getAttribute('alt')).toBe('');
  });

  it('puts aria attributes on the img', () => {
    const { container } = render(PIcon, {
      props: { name: 'close' },
      attrs: { 'aria-label': 'Close' },
    });
    const img = container.firstElementChild as HTMLImageElement;

    expect(img.getAttribute('aria-label')).toBe('Close');
  });
});
