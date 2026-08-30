import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PWordmark } from '../../../../src/elements/PWordmark';

describe('PWordmark', () => {
  it('returns an svg with nothing wrapping it', () => {
    const { container } = render(PWordmark);
    const svg = container.firstElementChild as SVGSVGElement;

    expect(container.childElementCount).toBe(1);
    expect(svg.tagName).toBe('svg');
    expect(svg.getAttribute('class')).toBe('p-wordmark');
    expect(container.querySelector('p-wordmark')).toBeNull();
  });

  it('returns a bare a when href is set', () => {
    const { container } = render(PWordmark, { props: { href: '#' } });
    expect(container.firstElementChild?.tagName).toBe('A');
    expect(container.firstElementChild?.className).toBe('p-wordmark');
  });
});
