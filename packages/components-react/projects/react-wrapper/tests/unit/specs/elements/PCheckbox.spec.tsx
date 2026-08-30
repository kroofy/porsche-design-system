import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PCheckbox } from '../../../../src/elements/PCheckbox';
import { PLabel } from '../../../../src/elements/PLabel';

describe('PCheckbox', () => {
  it('returns a checkbox with nothing wrapping it', () => {
    const { container } = render(<PCheckbox id="opt" />);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('INPUT');
    expect(container.querySelector('p-checkbox')).toBeNull();
    expect((container.firstElementChild as HTMLInputElement).type).toBe('checkbox');
    expect((container.firstElementChild as HTMLInputElement).className).toBe('p-checkbox');
  });

  it('uses native disabled and loading state', () => {
    const { container, rerender } = render(<PCheckbox disabled />);
    const input = () => container.firstElementChild as HTMLInputElement;

    expect(input().disabled).toBe(true);
    expect(input().getAttribute('aria-busy')).toBeNull();

    rerender(<PCheckbox loading />);
    expect(input().disabled).toBe(true);
    expect(input().getAttribute('aria-busy')).toBe('true');
    expect(input().getAttribute('data-p-loading')).toBe('true');
  });

  it('sets the native indeterminate property', () => {
    const { container } = render(<PCheckbox indeterminate />);
    const input = container.firstElementChild as HTMLInputElement;

    expect(input.indeterminate).toBe(true);
    expect(input.getAttribute('data-p-indeterminate')).toBe('true');
  });

  it('forwards a ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<PCheckbox ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('checkbox');
  });
});

describe('PLabel + PCheckbox', () => {
  it('keeps the label a sibling with for', () => {
    const { container } = render(
      <>
        <PCheckbox id="opt" />
        <PLabel htmlFor="opt">Option</PLabel>
      </>
    );

    expect(container.querySelector('label')?.htmlFor).toBe('opt');
    expect(container.querySelector('input')?.parentElement).toBe(container);
    expect(container.querySelector('label')?.parentElement).toBe(container);
  });
});
