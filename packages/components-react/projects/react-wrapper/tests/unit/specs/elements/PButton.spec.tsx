import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PButton } from '../../../../src/elements/PButton';

describe('PButton', () => {
  it('returns a button with nothing wrapping it', () => {
    const { container } = render(<PButton>Save</PButton>);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
    expect(container.querySelector('p-button')).toBeNull();
    expect(container.innerHTML).toBe('<button type="submit" class="p-button">Save</button>');
  });

  it('puts aria attributes on the button', () => {
    const { container } = render(<PButton aria-label="Close">X</PButton>);
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.getAttribute('aria-label')).toBe('Close');
  });

  it('uses native disabled and loading state', () => {
    const { container, rerender } = render(<PButton disabled>Save</PButton>);
    const button = () => container.firstElementChild as HTMLButtonElement;

    expect(button().disabled).toBe(true);
    expect(button().getAttribute('aria-busy')).toBeNull();

    rerender(<PButton loading>Save</PButton>);
    expect(button().disabled).toBe(true);
    expect(button().getAttribute('aria-busy')).toBe('true');
    expect(button().getAttribute('data-p-loading')).toBe('true');
  });

  it('encodes non-default appearance on the button', () => {
    const { container } = render(
      <PButton variant="destructive" icon="delete" compact>
        Delete
      </PButton>
    );
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.className).toBe('p-button');
    expect(button.getAttribute('data-p-variant')).toBe('destructive');
    expect(button.getAttribute('data-p-icon')).toBe('delete');
    expect(button.getAttribute('data-p-compact')).toBe('true');
  });

  it('forwards a ref to the button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<PButton ref={ref}>Save</PButton>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});
