import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PFieldset } from '../../../../src/elements/PFieldset';

describe('PFieldset', () => {
  it('returns a fieldset with nothing wrapping it', () => {
    const { container } = render(PFieldset, { slots: { default: '<legend>Some label</legend>' } });
    const fieldset = container.firstElementChild as HTMLFieldSetElement;

    expect(container.childElementCount).toBe(1);
    expect(fieldset.tagName).toBe('FIELDSET');
    expect(fieldset.className).toBe('p-fieldset');
    expect(container.querySelector('p-fieldset')).toBeNull();
  });

  it('puts aria attributes on the fieldset', () => {
    const { container } = render(PFieldset, { attrs: { role: 'radiogroup', 'aria-required': 'true' } });
    const fieldset = container.firstElementChild as HTMLFieldSetElement;

    expect(fieldset.getAttribute('role')).toBe('radiogroup');
    expect(fieldset.getAttribute('aria-required')).toBe('true');
  });

  it('encodes non-default appearance on the fieldset', () => {
    const { container } = render(PFieldset, { props: { labelSize: 'small', required: true, state: 'error' } });
    const fieldset = container.firstElementChild as HTMLFieldSetElement;

    expect(fieldset.getAttribute('data-p-label-size')).toBe('small');
    expect(fieldset.getAttribute('data-p-required')).toBe('true');
    expect(fieldset.getAttribute('data-p-state')).toBe('error');
  });
});
