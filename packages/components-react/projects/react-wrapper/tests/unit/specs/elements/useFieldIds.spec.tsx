import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PInputText } from '../../../../src/elements/PInputText';
import { PLabel } from '../../../../src/elements/PLabel';
import { fieldDescribedBy, useFieldIds } from '../../../../src/elements/useFieldIds';

const Field = ({ id }: { id?: string }) => {
  const ids = useFieldIds(id);
  return (
    <>
      <PLabel htmlFor={ids.control} required>
        Name
      </PLabel>
      <span className="p-description" id={ids.description}>
        Hint
      </span>
      <PInputText
        id={ids.control}
        aria-describedby={fieldDescribedBy(ids, { description: true, message: true })}
        aria-invalid
      />
      <span className="p-message" id={ids.message} data-p-state="error">
        Bad
      </span>
    </>
  );
};

describe('useFieldIds', () => {
  it('wires label for, control id, and describedby without wrapping the input', () => {
    const { container } = render(<Field id="name" />);
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
    const { container } = render(
      <>
        <Field />
        <Field />
      </>
    );
    const inputs = [...container.querySelectorAll('input')];
    const labels = [...container.querySelectorAll('label')];

    expect(inputs[0].id).not.toBe(inputs[1].id);
    expect(labels[0].htmlFor).toBe(inputs[0].id);
    expect(labels[1].htmlFor).toBe(inputs[1].id);
  });
});
