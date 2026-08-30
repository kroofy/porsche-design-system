import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { WORDMARK_PATH } from '../../../../../../../components/src/elements/wordmark/wordmark-svg';
import { PWordmark } from '../../../../src/elements/PWordmark';

describe('PWordmark', () => {
  it('returns an svg with nothing wrapping it', () => {
    const { container } = render(<PWordmark />);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('svg');
    expect(container.querySelector('p-wordmark')).toBeNull();
    const svg = container.firstElementChild as SVGSVGElement;
    expect(svg.getAttribute('class')).toBe('p-wordmark');
    expect(svg.querySelector('path')?.getAttribute('d')).toBe(WORDMARK_PATH);
  });

  it('returns a bare a when href is set', () => {
    const { container } = render(<PWordmark href="#" />);
    const a = container.firstElementChild as HTMLAnchorElement;

    expect(a.tagName).toBe('A');
    expect(a.className).toBe('p-wordmark');
    expect(a.querySelector('svg')).not.toBeNull();
  });

  it('encodes inherit size on the host', () => {
    const { container } = render(<PWordmark size="inherit" />);
    expect(container.firstElementChild?.getAttribute('data-p-size')).toBe('inherit');
  });

  it('forwards a ref to the svg', () => {
    const ref = createRef<HTMLElement>();
    render(<PWordmark ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });
});
