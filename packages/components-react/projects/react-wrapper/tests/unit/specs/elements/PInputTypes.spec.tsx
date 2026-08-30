import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PInputEmail, PInputNumber, PInputPassword } from '../../../../src/elements/PInputTypes';

describe('typed native inputs', () => {
  it('returns an email input with nothing wrapping it', () => {
    const { container } = render(<PInputEmail id="mail" />);
    const input = container.firstElementChild as HTMLInputElement;

    expect(container.childElementCount).toBe(1);
    expect(input.type).toBe('email');
    expect(input.className).toBe('p-input');
    expect(container.querySelector('p-input-email')).toBeNull();
  });

  it('returns a password input', () => {
    const { container } = render(<PInputPassword />);
    expect((container.firstElementChild as HTMLInputElement).type).toBe('password');
  });

  it('returns a number input and uses native disabled when loading', () => {
    const { container } = render(<PInputNumber loading />);
    const input = container.firstElementChild as HTMLInputElement;

    expect(input.type).toBe('number');
    expect(input.disabled).toBe(true);
    expect(input.getAttribute('aria-busy')).toBe('true');
    expect(input.getAttribute('data-p-loading')).toBe('true');
  });
});
