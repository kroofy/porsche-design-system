import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PSpinner } from '../../../../src/elements/PSpinner';

describe('PSpinner', () => {
  it('returns an svg with nothing wrapping it', () => {
    const { container } = render(<PSpinner />);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('svg');
    expect(container.querySelector('p-spinner')).toBeNull();
    const svg = container.firstElementChild as SVGSVGElement;
    expect(svg.getAttribute('class')).toBe('p-spinner');
    expect(svg.getAttribute('viewBox')).toBe('-16 -16 32 32');
    expect(svg.getAttribute('role')).toBe('alert');
    expect(svg.getAttribute('aria-live')).toBe('assertive');
    expect(svg.getAttribute('focusable')).toBe('false');
    expect(svg.querySelectorAll('circle')).toHaveLength(2);
  });

  it('encodes color and size on the svg', () => {
    const { container } = render(<PSpinner color="inherit" size="lg" />);
    const svg = container.firstElementChild as SVGSVGElement;

    expect(svg.getAttribute('data-p-color')).toBe('inherit');
    expect(svg.getAttribute('data-p-size')).toBe('lg');
  });

  it('puts aria-label on the svg', () => {
    const { container } = render(<PSpinner aria-label="Loading" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('Loading');
  });

  it('forwards a ref to the svg', () => {
    const ref = createRef<SVGSVGElement>();
    render(<PSpinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });
});
