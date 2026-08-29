import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PDisplay } from '../../../../src/elements/PDisplay';

describe('PDisplay', () => {
  it('returns an h1 with nothing wrapping it', () => {
    const { container } = render(<PDisplay>Hero</PDisplay>);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('H1');
    expect(container.querySelector('p-display')).toBeNull();
    expect(container.innerHTML).toBe('<h1 class="p-display">Hero</h1>');
  });

  it('maps size to the heading tag', () => {
    const { container } = render(<PDisplay size="small">Hero</PDisplay>);
    expect(container.firstElementChild?.tagName).toBe('H3');
    expect(container.firstElementChild?.getAttribute('data-p-size')).toBe('small');
  });

  it('forwards a ref to the heading', () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<PDisplay ref={ref}>Hero</PDisplay>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });
});
