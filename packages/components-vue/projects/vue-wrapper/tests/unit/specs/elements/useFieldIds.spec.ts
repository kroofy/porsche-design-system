import { defineComponent, h } from 'vue';
import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PInputText } from '../../../../src/elements/PInputText';
import { PLabel } from '../../../../src/elements/PLabel';
import { fieldDescribedBy, useFieldIds } from '../../../../src/elements/useFieldIds';

const Field = defineComponent({
  props: { id: { type: String, default: undefined } },
  setup(props) {
    const ids = useFieldIds(props.id);
    return () => [
      h(PLabel, { for: ids.control, required: true }, () => 'Name'),
      h('span', { class: 'p-description', id: ids.description }, 'Hint'),
      h(PInputText, {
        id: ids.control,
        'aria-describedby': fieldDescribedBy(ids, { description: true, message: true }),
        'aria-invalid': true,
      }),
      h('span', { class: 'p-message', id: ids.message, 'data-p-state': 'error' }, 'Bad'),
    ];
  },
});

describe('useFieldIds', () => {
  it('wires label for, control id, and describedby without wrapping the input', () => {
    const { container } = render(Field, { props: { id: 'name' } });
    const label = container.querySelector('label') as HTMLLabelElement;
    const input = container.querySelector('input') as HTMLInputElement;
    const description = container.querySelector('.p-description') as HTMLElement;
    const message = container.querySelector('.p-message') as HTMLElement;

    expect(container.querySelector('p-input-text')).toBeNull();
    expect(input.parentElement).toBe(container);
    expect(label.htmlFor).toBe('name');
    expect(input.id).toBe('name');
    expect(description.id).toBe('name-description');
    expect(message.id).toBe('name-message');
    expect(input.getAttribute('aria-describedby')).toBe('name-description name-message');
    expect(label.querySelector('.p-label__required')?.parentElement).toBe(label);
  });

  it('generates unique ids when omitted', () => {
    const Pair = defineComponent({
      setup() {
        return () => [h(Field), h(Field)];
      },
    });
    const { container } = render(Pair);
    const inputs = [...container.querySelectorAll('input')];
    const labels = [...container.querySelectorAll('label')];

    expect(inputs[0].id).not.toBe(inputs[1].id);
    expect(labels[0].htmlFor).toBe(inputs[0].id);
    expect(labels[1].htmlFor).toBe(inputs[1].id);
  });
});
