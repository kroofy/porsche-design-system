import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PButtonPure } from '../../../../src/elements/PButtonPure';

describe('PButtonPure', () => {
  it('returns a button with nothing wrapping it', () => {
    const { container } = render(PButtonPure, { slots: { default: 'Save' } });
    const button = container.firstElementChild as HTMLButtonElement;

    expect(container.childElementCount).toBe(1);
    expect(button.tagName).toBe('BUTTON');
    expect(button.className).toBe('p-button-pure');
    expect(container.querySelector('p-button-pure')).toBeNull();
    expect(container.querySelector('p-icon')).toBeNull();
    expect(button.querySelector('img.p-icon.p-button-pure__icon')?.getAttribute('src')).toContain('arrow-right');
    expect(button.querySelector('span.p-button-pure__label')?.textContent).toBe('Save');
  });

  it('puts aria attributes on the button', () => {
    const { container } = render(PButtonPure, {
      attrs: { 'aria-label': 'Close' },
      slots: { default: 'X' },
    });

    expect((container.firstElementChild as HTMLButtonElement).getAttribute('aria-label')).toBe('Close');
  });

  it('uses native disabled and loading state', async () => {
    const { container, rerender } = render(PButtonPure, {
      props: { disabled: true },
      slots: { default: 'Save' },
    });
    const button = () => container.firstElementChild as HTMLButtonElement;

    expect(button().disabled).toBe(true);

    await rerender({ disabled: false, loading: true });
    expect(button().disabled).toBe(true);
    expect(button().getAttribute('aria-busy')).toBe('true');
    expect(button().getAttribute('data-p-loading')).toBe('true');
    expect(button().querySelector('span.p-button-pure__spinner svg')).not.toBeNull();
    expect(container.querySelector('p-spinner')).toBeNull();
  });

  it('encodes non-default appearance on the button', () => {
    const { container } = render(PButtonPure, {
      props: { color: 'contrast-high', icon: 'delete', hideLabel: true, stretch: true },
      slots: { default: 'Delete' },
    });
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.getAttribute('data-p-color')).toBe('contrast-high');
    expect(button.getAttribute('data-p-icon')).toBe('delete');
    expect(button.getAttribute('data-p-hide-label')).toBe('true');
    expect(button.getAttribute('data-p-stretch')).toBe('true');
    expect(button.querySelector('img.p-icon')?.parentElement).toBe(button);
  });
});
