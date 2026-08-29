import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PInputText } from '../../../../src/elements/PInputText';
import { PLabel } from '../../../../src/elements/PLabel';

describe('PInputText', () => {
  it('returns an input with nothing wrapping it', () => {
    const { container } = render(<PInputText id="name" />);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('INPUT');
    expect(container.querySelector('p-input-text')).toBeNull();
    expect(container.innerHTML).toBe('<input id="name" dir="auto" class="p-input" type="text">');
  });

  it('puts aria attributes on the input', () => {
    const { container } = render(<PInputText aria-describedby="hint" />);
    const input = container.firstElementChild as HTMLInputElement;

    expect(input.getAttribute('aria-describedby')).toBe('hint');
  });

  it('uses native disabled and loading state', () => {
    const { container, rerender } = render(<PInputText disabled />);
    const input = () => container.firstElementChild as HTMLInputElement;

    expect(input().disabled).toBe(true);
    expect(input().getAttribute('aria-busy')).toBeNull();

    rerender(<PInputText loading />);
    expect(input().disabled).toBe(true);
    expect(input().getAttribute('aria-busy')).toBe('true');
    expect(input().getAttribute('data-p-loading')).toBe('true');
  });

  it('encodes non-default appearance on the input', () => {
    const { container } = render(<PInputText compact state="error" />);
    const input = container.firstElementChild as HTMLInputElement;

    expect(input.className).toBe('p-input');
    expect(input.getAttribute('data-p-compact')).toBe('true');
    expect(input.getAttribute('data-p-state')).toBe('error');
  });

  it('forwards a ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<PInputText ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  });
});

describe('PLabel', () => {
  it('returns a label with for pointing at the input', () => {
    const { container } = render(
      <>
        <PLabel htmlFor="name">Name</PLabel>
        <PInputText id="name" />
      </>
    );
    const label = container.querySelector('label') as HTMLLabelElement;
    const input = container.querySelector('input') as HTMLInputElement;

    expect(label.htmlFor).toBe('name');
    expect(label.className).toBe('p-label');
    expect(input.id).toBe('name');
    expect(container.querySelector('p-input-text')).toBeNull();
    expect(label.parentElement).toBe(container);
    expect(input.parentElement).toBe(container);
  });

  it('puts the required mark inside the label', () => {
    const { container } = render(
      <PLabel htmlFor="name" required>
        Name
      </PLabel>
    );
    const label = container.firstElementChild as HTMLLabelElement;
    const mark = label.querySelector('span.p-label__required');

    expect(mark?.getAttribute('aria-hidden')).toBe('true');
    expect(mark?.textContent).toBe(' *');
    expect(mark?.parentElement).toBe(label);
  });
});
