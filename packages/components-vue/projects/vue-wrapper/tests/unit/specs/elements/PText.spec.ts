import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PText } from '../../../../src/elements/PText';

describe('PText', () => {
  it('returns a p with nothing wrapping it', () => {
    const { container } = render(PText, { slots: { default: 'Body' } });
    const text = container.firstElementChild as HTMLElement;

    expect(container.childElementCount).toBe(1);
    expect(text.tagName).toBe('P');
    expect(text.className).toBe('p-text');
    expect(container.querySelector('p-text')).toBeNull();
  });

  it('renders a requested tag', () => {
    const { container } = render(PText, { props: { tag: 'blockquote' }, slots: { default: 'Quote' } });
    expect((container.firstElementChild as HTMLElement).tagName).toBe('BLOCKQUOTE');
  });

  it('encodes non-default appearance on the text', () => {
    const { container } = render(PText, {
      props: { size: 'lg', weight: 'semibold', color: 'error' },
      slots: { default: 'Body' },
    });
    const text = container.firstElementChild as HTMLElement;

    expect(text.getAttribute('data-p-size')).toBe('lg');
    expect(text.getAttribute('data-p-weight')).toBe('semibold');
    expect(text.getAttribute('data-p-color')).toBe('error');
  });
});
