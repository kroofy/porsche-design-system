import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { PSelect } from '../../../../src/elements/PSelect';

describe('PSelect', () => {
  it('returns a select with nothing wrapping it', () => {
    const { container } = render(PSelect, {
      attrs: { id: 'choice' },
      slots: { default: () => h('option', { value: 'a' }, 'A') },
    });

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('SELECT');
    expect(container.querySelector('p-select')).toBeNull();
    expect(container.querySelector('option')?.textContent).toBe('A');
  });

  it('uses native disabled and loading state', () => {
    const { container } = render(PSelect, { props: { loading: true } });
    const select = container.firstElementChild as HTMLSelectElement;

    expect(select.disabled).toBe(true);
    expect(select.getAttribute('aria-busy')).toBe('true');
    expect(select.getAttribute('data-p-loading')).toBe('true');
  });
});
