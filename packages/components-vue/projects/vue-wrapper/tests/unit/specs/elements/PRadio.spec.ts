import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PRadio } from '../../../../src/elements/PRadio';

describe('PRadio', () => {
  it('returns a radio with nothing wrapping it', () => {
    const { container } = render(PRadio, { attrs: { id: 'opt', name: 'g' } });

    expect(container.childElementCount).toBe(1);
    expect((container.firstElementChild as HTMLInputElement).type).toBe('radio');
    expect(container.querySelector('p-radio')).toBeNull();
  });

  it('encodes compact and state on the radio', () => {
    const { container } = render(PRadio, { props: { compact: true, state: 'error' } });
    const input = container.firstElementChild as HTMLInputElement;

    expect(input.className).toBe('p-radio');
    expect(input.getAttribute('data-p-compact')).toBe('true');
    expect(input.getAttribute('data-p-state')).toBe('error');
  });
});
