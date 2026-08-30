import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PDisplay } from '../../../../src/elements/PDisplay';

describe('PDisplay', () => {
  it('returns an h1 with nothing wrapping it', () => {
    const { container } = render(PDisplay, { slots: { default: 'Hero' } });
    const heading = container.firstElementChild as HTMLHeadingElement;

    expect(container.childElementCount).toBe(1);
    expect(heading.tagName).toBe('H1');
    expect(heading.className).toBe('p-display');
    expect(container.querySelector('p-display')).toBeNull();
  });

  it('maps size to the heading tag', () => {
    const { container } = render(PDisplay, { props: { size: 'small' }, slots: { default: 'Hero' } });
    expect((container.firstElementChild as HTMLHeadingElement).tagName).toBe('H3');
  });
});
