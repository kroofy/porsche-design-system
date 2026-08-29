import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PTextarea } from '../../../../src/elements/PTextarea';

describe('PTextarea', () => {
  it('returns a textarea with nothing wrapping it', () => {
    const { container } = render(PTextarea, { attrs: { id: 'bio' } });

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('TEXTAREA');
    expect(container.querySelector('p-textarea')).toBeNull();
    expect(container.innerHTML).toBe('<textarea id="bio" dir="auto" class="p-textarea"></textarea>');
  });
});
