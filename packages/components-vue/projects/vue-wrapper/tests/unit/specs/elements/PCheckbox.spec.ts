import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PCheckbox } from '../../../../src/elements/PCheckbox';

describe('PCheckbox', () => {
  it('returns a checkbox with nothing wrapping it', () => {
    const { container } = render(PCheckbox, { attrs: { id: 'opt' } });

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('INPUT');
    expect((container.firstElementChild as HTMLInputElement).type).toBe('checkbox');
    expect(container.querySelector('p-checkbox')).toBeNull();
  });

  it('uses native disabled and loading state', async () => {
    const { container, rerender } = render(PCheckbox, { props: { disabled: true } });
    const input = () => container.firstElementChild as HTMLInputElement;

    expect(input().disabled).toBe(true);

    await rerender({ disabled: false, loading: true });
    expect(input().disabled).toBe(true);
    expect(input().getAttribute('aria-busy')).toBe('true');
    expect(input().getAttribute('data-p-loading')).toBe('true');
  });

  it('sets the native indeterminate property', () => {
    const { container } = render(PCheckbox, { props: { indeterminate: true } });
    const input = container.firstElementChild as HTMLInputElement;

    expect(input.indeterminate).toBe(true);
    expect(input.getAttribute('data-p-indeterminate')).toBe('true');
  });
});
