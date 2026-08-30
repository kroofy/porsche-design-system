import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PButton } from '../../../../src/elements/PButton';

describe('PButton', () => {
  it('returns a button with nothing wrapping it', () => {
    const { container } = render(PButton, { slots: { default: 'Save' } });

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
    expect(container.querySelector('p-button')).toBeNull();
    expect(container.innerHTML).toBe(
      '<button type="submit" class="p-button"><span class="p-button__label">Save</span></button>'
    );
  });

  it('puts aria attributes on the button', () => {
    const { container } = render(PButton, {
      attrs: { 'aria-label': 'Close' },
      slots: { default: 'X' },
    });
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.getAttribute('aria-label')).toBe('Close');
  });

  it('uses native disabled and loading state', async () => {
    const { container, rerender } = render(PButton, {
      props: { disabled: true },
      slots: { default: 'Save' },
    });
    const button = () => container.firstElementChild as HTMLButtonElement;

    expect(button().disabled).toBe(true);
    expect(button().getAttribute('aria-busy')).toBeNull();

    await rerender({ disabled: false, loading: true });
    expect(button().disabled).toBe(true);
    expect(button().getAttribute('aria-busy')).toBe('true');
    expect(button().getAttribute('data-p-loading')).toBe('true');
    const spinner = button().querySelector('span.p-button__spinner svg');
    expect(spinner).not.toBeNull();
    expect(spinner?.parentElement?.parentElement).toBe(button());
    expect(container.querySelector('p-spinner')).toBeNull();
  });

  it('encodes non-default appearance on the button', () => {
    const { container } = render(PButton, {
      props: { variant: 'destructive', icon: 'delete', compact: true },
      slots: { default: 'Delete' },
    });
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.className).toBe('p-button');
    expect(button.getAttribute('data-p-variant')).toBe('destructive');
    expect(button.getAttribute('data-p-icon')).toBe('delete');
    expect(button.getAttribute('data-p-compact')).toBe('true');
    const icon = button.querySelector('img.p-icon.p-button__icon');
    expect(icon?.getAttribute('data-p-name')).toBe('delete');
    expect(icon?.parentElement).toBe(button);
    expect(container.querySelector('p-icon')).toBeNull();
    expect(container.querySelector('p-button')).toBeNull();
  });
});
