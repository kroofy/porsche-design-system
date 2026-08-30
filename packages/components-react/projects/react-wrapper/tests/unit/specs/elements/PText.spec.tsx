import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PText } from '../../../../src/elements/PText';

describe('PText', () => {
  it('returns a p with nothing wrapping it', () => {
    const { container } = render(<PText>Body</PText>);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('P');
    expect(container.querySelector('p-text')).toBeNull();
    expect(container.innerHTML).toBe('<p class="p-text">Body</p>');
  });

  it('renders a requested tag', () => {
    const { container } = render(<PText tag="blockquote">Quote</PText>);
    expect(container.firstElementChild?.tagName).toBe('BLOCKQUOTE');
  });

  it('encodes non-default appearance on the text', () => {
    const { container } = render(
      <PText size="lg" weight="semibold" color="error" hyphens="auto">
        Body
      </PText>
    );
    const text = container.firstElementChild as HTMLElement;

    expect(text.getAttribute('data-p-size')).toBe('lg');
    expect(text.getAttribute('data-p-weight')).toBe('semibold');
    expect(text.getAttribute('data-p-color')).toBe('error');
    expect(text.getAttribute('data-p-hyphens')).toBe('auto');
  });

  it('forwards a ref to the element', () => {
    const ref = createRef<HTMLElement>();
    render(<PText ref={ref}>Body</PText>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});
