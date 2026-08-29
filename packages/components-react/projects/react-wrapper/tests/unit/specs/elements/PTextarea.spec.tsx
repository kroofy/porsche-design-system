import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PTextarea } from '../../../../src/elements/PTextarea';

describe('PTextarea', () => {
  it('returns a textarea with nothing wrapping it', () => {
    const { container } = render(<PTextarea id="bio" />);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('TEXTAREA');
    expect(container.querySelector('p-textarea')).toBeNull();
    expect(container.innerHTML).toBe('<textarea id="bio" dir="auto" rows="7" class="p-textarea"></textarea>');
  });

  it('encodes non-default appearance on the textarea', () => {
    const { container } = render(<PTextarea compact state="success" />);
    const textarea = container.firstElementChild as HTMLTextAreaElement;

    expect(textarea.className).toBe('p-textarea');
    expect(textarea.getAttribute('data-p-compact')).toBe('true');
    expect(textarea.getAttribute('data-p-state')).toBe('success');
  });
});
