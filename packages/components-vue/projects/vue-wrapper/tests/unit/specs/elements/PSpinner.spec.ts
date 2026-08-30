import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PSpinner } from '../../../../src/elements/PSpinner';

describe('PSpinner', () => {
  it('returns an svg with nothing wrapping it', () => {
    const { container } = render(PSpinner);
    const svg = container.firstElementChild as SVGSVGElement;

    expect(container.childElementCount).toBe(1);
    expect(svg.tagName).toBe('svg');
    expect(svg.getAttribute('class')).toBe('p-spinner');
    expect(svg.getAttribute('role')).toBe('alert');
    expect(container.querySelector('p-spinner')).toBeNull();
    expect(svg.querySelectorAll('circle')).toHaveLength(2);
  });

  it('encodes color and size on the svg', () => {
    const { container } = render(PSpinner, { props: { color: 'inherit', size: 'lg' } });
    const svg = container.firstElementChild as SVGSVGElement;

    expect(svg.getAttribute('data-p-color')).toBe('inherit');
    expect(svg.getAttribute('data-p-size')).toBe('lg');
  });

  it('puts aria-label on the svg', () => {
    const { container } = render(PSpinner, { attrs: { 'aria-label': 'Loading' } });
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('Loading');
  });
});
