import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PLinkPure } from '../../../../src/elements/PLinkPure';

describe('PLinkPure', () => {
  it('returns an anchor with nothing wrapping it', () => {
    const { container } = render(<PLinkPure href="https://porsche.com">More</PLinkPure>);
    const link = container.firstElementChild as HTMLAnchorElement;

    expect(container.childElementCount).toBe(1);
    expect(link.tagName).toBe('A');
    expect(link.className).toBe('p-link-pure');
    expect(link.getAttribute('href')).toBe('https://porsche.com');
    expect(container.querySelector('p-link-pure')).toBeNull();
    expect(container.querySelector('p-icon')).toBeNull();
    expect(link.querySelector('img.p-icon.p-link-pure__icon')?.getAttribute('src')).toContain('arrow-right');
    expect(link.querySelector('span.p-link-pure__label')?.textContent).toBe('More');
  });

  it('puts aria attributes on the anchor', () => {
    const { container } = render(
      <PLinkPure href="https://porsche.com" aria-label="Porsche">
        More
      </PLinkPure>
    );
    expect((container.firstElementChild as HTMLAnchorElement).getAttribute('aria-label')).toBe('Porsche');
  });

  it('encodes non-default appearance on the anchor', () => {
    const { container } = render(
      <PLinkPure href="https://porsche.com" icon="phone" hideLabel underline active>
        Call
      </PLinkPure>
    );
    const link = container.firstElementChild as HTMLAnchorElement;

    expect(link.getAttribute('data-p-icon')).toBe('phone');
    expect(link.getAttribute('data-p-hide-label')).toBe('true');
    expect(link.getAttribute('data-p-underline')).toBe('true');
    expect(link.getAttribute('data-p-active')).toBe('true');
    expect(container.querySelector('span')).not.toBeNull();
    expect(link.querySelector('span')?.parentElement).toBe(link);
  });

  it('forwards a ref to the anchor', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <PLinkPure ref={ref} href="https://porsche.com">
        More
      </PLinkPure>
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});
