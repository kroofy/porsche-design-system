import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PSwitch } from '../../../../src/elements/PSwitch';

describe('PSwitch', () => {
  it('returns a button with nothing wrapping it', () => {
    const { container } = render(PSwitch, { slots: { default: 'Some label' } });

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
    expect(container.querySelector('p-switch')).toBeNull();
    expect(container.innerHTML).toBe(
      '<button type="button" role="switch" aria-checked="false" class="p-switch"><span class="p-switch__toggle"><span class="p-switch__knob"></span></span><span class="p-switch__label">Some label</span></button>'
    );
  });

  it('maps checked to aria-checked on the button', () => {
    const { container } = render(PSwitch, { props: { checked: true }, slots: { default: 'Some label' } });
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(button.hasAttribute('checked')).toBe(false);
  });

  it('uses native disabled and loading state', async () => {
    const { container, rerender } = render(PSwitch, {
      props: { disabled: true },
      slots: { default: 'Some label' },
    });
    const button = () => container.firstElementChild as HTMLButtonElement;

    expect(button().disabled).toBe(true);
    expect(button().getAttribute('aria-busy')).toBeNull();

    await rerender({ disabled: false, loading: true });
    expect(button().disabled).toBe(true);
    expect(button().getAttribute('aria-busy')).toBe('true');
    expect(button().getAttribute('data-p-loading')).toBe('true');
    const spinner = button().querySelector('svg.p-spinner.p-switch__spinner');
    expect(spinner).not.toBeNull();
    expect(spinner?.parentElement?.className).toBe('p-switch__knob');
    expect(container.querySelector('p-spinner')).toBeNull();
  });

  it('encodes non-default appearance on the button', () => {
    const { container } = render(PSwitch, {
      props: { alignLabel: 'start', hideLabel: true, stretch: true, compact: true },
      slots: { default: 'Some label' },
    });
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.className).toBe('p-switch');
    expect(button.getAttribute('data-p-align-label')).toBe('start');
    expect(button.getAttribute('data-p-hide-label')).toBe('true');
    expect(button.getAttribute('data-p-stretch')).toBe('true');
    expect(button.getAttribute('data-p-compact')).toBe('true');
  });
});
