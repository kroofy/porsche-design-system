import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { POptgroup } from '../../../../src/elements/POptgroup';
import { PSelect } from '../../../../src/elements/PSelect';

describe('POptgroup', () => {
  it('returns an optgroup with nothing wrapping it', () => {
    const { container } = render(PSelect, {
      slots: {
        default: () =>
          h(POptgroup, { label: 'Group' }, { default: () => h('option', { value: 'a' }, 'A') }),
      },
    });

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('SELECT');
    expect(container.querySelector('p-optgroup')).toBeNull();
    expect(container.querySelector('optgroup')?.label).toBe('Group');
    expect(container.querySelector('optgroup')?.className).toBe('p-optgroup');
    expect(container.querySelector('option')?.textContent).toBe('A');
  });

  it('uses the native disabled attribute', () => {
    const { container } = render(POptgroup, {
      attrs: { label: 'Group', disabled: true },
      slots: { default: () => h('option', { value: 'a' }, 'A') },
    });
    const group = container.firstElementChild as HTMLOptGroupElement;

    expect(group.disabled).toBe(true);
    expect(group.tagName).toBe('OPTGROUP');
  });
});
