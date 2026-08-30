import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PLabel } from '../../../../src/elements/PLabel';
import { PRadio } from '../../../../src/elements/PRadio';

describe('PRadio', () => {
  it('returns a radio with nothing wrapping it', () => {
    const { container } = render(<PRadio id="opt" name="g" />);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('INPUT');
    expect((container.firstElementChild as HTMLInputElement).type).toBe('radio');
    expect(container.querySelector('p-radio')).toBeNull();
    expect(container.querySelector('p-radio-group')).toBeNull();
  });

  it('encodes compact and state on the radio', () => {
    const { container } = render(<PRadio compact state="error" name="g" />);
    const input = container.firstElementChild as HTMLInputElement;

    expect(input.className).toBe('p-radio');
    expect(input.getAttribute('data-p-compact')).toBe('true');
    expect(input.getAttribute('data-p-state')).toBe('error');
  });
});

describe('PLabel + PRadio', () => {
  it('keeps the label a sibling with for', () => {
    const { container } = render(
      <>
        <PRadio id="a" name="g" />
        <PLabel htmlFor="a">A</PLabel>
      </>
    );

    expect(container.querySelector('label')?.htmlFor).toBe('a');
    expect(container.querySelector('input')?.parentElement).toBe(container);
  });
});
