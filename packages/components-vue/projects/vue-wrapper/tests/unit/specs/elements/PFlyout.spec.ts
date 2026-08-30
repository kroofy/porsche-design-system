import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PFlyout } from '../../../../src/elements/PFlyout';

describe('PFlyout', () => {
  it('returns a dialog with nothing wrapping it', () => {
    const { container } = render(PFlyout, {
      slots: { default: '<header class="p-flyout__header">Some Heading</header><div>Some Content</div>' },
    });
    const dialog = container.firstElementChild as HTMLDialogElement;

    expect(container.childElementCount).toBe(1);
    expect(dialog.tagName).toBe('DIALOG');
    expect(dialog.getAttribute('class')).toBe('p-flyout');
    expect(container.querySelector('p-flyout')).toBeNull();
    expect(dialog.querySelector('.p-flyout__panel')).not.toBeNull();
    expect(dialog.querySelector('.p-flyout__dismiss')).not.toBeNull();
  });

  it('omits the dismiss button when dismissButton is false', () => {
    const { container } = render(PFlyout, { props: { dismissButton: false } });
    expect(container.querySelector('.p-flyout__dismiss')).toBeNull();
  });

  it('encodes appearance on the dialog', () => {
    const { container } = render(PFlyout, {
      props: {
        background: 'surface',
        backdrop: 'shading',
        position: 'start',
        fullscreen: true,
        footerBehavior: 'fixed',
      },
    });
    const dialog = container.firstElementChild as HTMLDialogElement;

    expect(dialog.getAttribute('data-p-background')).toBe('surface');
    expect(dialog.getAttribute('data-p-backdrop')).toBe('shading');
    expect(dialog.getAttribute('data-p-position')).toBe('start');
    expect(dialog.getAttribute('data-p-fullscreen')).toBe('true');
    expect(dialog.getAttribute('data-p-footer-behavior')).toBe('fixed');
  });
});
