import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PButtonPure } from '../../../../src/elements/PButtonPure';

describe('PButtonPure', () => {
  it('returns a button with nothing wrapping it', () => {
    const { container } = render(<PButtonPure>Save</PButtonPure>);
    const button = container.firstElementChild as HTMLButtonElement;

    expect(container.childElementCount).toBe(1);
    expect(button.tagName).toBe('BUTTON');
    expect(button.className).toBe('p-button-pure');
    expect(button.type).toBe('submit');
    expect(container.querySelector('p-button-pure')).toBeNull();
    expect(container.querySelector('p-icon')).toBeNull();
    const icon = button.querySelector('img.p-icon.p-button-pure__icon');
    expect(icon?.getAttribute('src')).toContain('arrow-right');
    expect(icon?.getAttribute('data-p-size')).toBe('inherit');
    expect(icon?.parentElement).toBe(button);
    expect(button.querySelector('span.p-button-pure__label')?.textContent).toBe('Save');
  });

  it('puts aria attributes on the button', () => {
    const { container } = render(<PButtonPure aria-label="Close">X</PButtonPure>);
    expect((container.firstElementChild as HTMLButtonElement).getAttribute('aria-label')).toBe('Close');
  });

  it('uses native disabled and loading state', () => {
    const { container, rerender } = render(<PButtonPure disabled>Save</PButtonPure>);
    const button = () => container.firstElementChild as HTMLButtonElement;

    expect(button().disabled).toBe(true);
    expect(button().getAttribute('aria-busy')).toBeNull();

    rerender(<PButtonPure loading>Save</PButtonPure>);
    expect(button().disabled).toBe(true);
    expect(button().getAttribute('aria-busy')).toBe('true');
    expect(button().getAttribute('data-p-loading')).toBe('true');
    expect(button().querySelector('span.p-button-pure__spinner svg')).not.toBeNull();
    expect(button().querySelector('img.p-icon')).toBeNull();
    expect(container.querySelector('p-spinner')).toBeNull();
  });

  it('encodes non-default appearance on the button', () => {
    const { container } = render(
      <PButtonPure color="contrast-high" icon="delete" hideLabel stretch underline active>
        Delete
      </PButtonPure>
    );
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.className).toBe('p-button-pure');
    expect(button.getAttribute('data-p-color')).toBe('contrast-high');
    expect(button.getAttribute('data-p-icon')).toBe('delete');
    expect(button.getAttribute('data-p-hide-label')).toBe('true');
    expect(button.getAttribute('data-p-stretch')).toBe('true');
    expect(button.getAttribute('data-p-underline')).toBe('true');
    expect(button.getAttribute('data-p-active')).toBe('true');
    expect(button.querySelector('img.p-icon')?.getAttribute('data-p-name')).toBe('delete');
  });

  it('omits the icon when icon is none', () => {
    const { container } = render(<PButtonPure icon="none">Save</PButtonPure>);
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.getAttribute('data-p-icon')).toBe('none');
    expect(button.querySelector('img.p-icon')).toBeNull();
  });

  it('forwards a ref to the button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<PButtonPure ref={ref}>Save</PButtonPure>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
