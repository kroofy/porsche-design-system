import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PInputText } from '../../../../src/elements/PInputText';
import { PLabel } from '../../../../src/elements/PLabel';

describe('PInputText', () => {
  it('returns an input with nothing wrapping it', () => {
    const { container } = render(PInputText, { attrs: { id: 'name' } });

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('INPUT');
    expect(container.querySelector('p-input-text')).toBeNull();
    expect(container.innerHTML).toBe('<input id="name" type="text" dir="auto" class="p-input">');
  });

  it('uses native disabled and loading state', async () => {
    const { container, rerender } = render(PInputText, { props: { disabled: true } });
    const input = () => container.firstElementChild as HTMLInputElement;

    expect(input().disabled).toBe(true);
    expect(input().getAttribute('aria-busy')).toBeNull();

    await rerender({ disabled: false, loading: true });
    expect(input().disabled).toBe(true);
    expect(input().getAttribute('aria-busy')).toBe('true');
    expect(input().getAttribute('data-p-loading')).toBe('true');
  });

  it('encodes non-default appearance on the input', () => {
    const { container } = render(PInputText, { props: { compact: true, state: 'error' } });
    const input = container.firstElementChild as HTMLInputElement;

    expect(input.className).toBe('p-input');
    expect(input.getAttribute('data-p-compact')).toBe('true');
    expect(input.getAttribute('data-p-state')).toBe('error');
  });
});

describe('PLabel', () => {
  it('returns a label with for pointing at the input', () => {
    const { container } = render(PLabel, {
      attrs: { for: 'name' },
      slots: { default: 'Name' },
    });
    const label = container.firstElementChild as HTMLLabelElement;

    expect(label.tagName).toBe('LABEL');
    expect(label.htmlFor).toBe('name');
    expect(label.className).toBe('p-label');
    expect(label.textContent).toBe('Name');
  });
});
