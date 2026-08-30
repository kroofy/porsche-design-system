import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PModal } from '../../../../src/elements/PModal';

describe('PModal', () => {
  it('returns a dialog with nothing wrapping it', () => {
    const { container } = render(PModal, {
      slots: { default: '<header class="p-modal__header">Some Heading</header><div>Some Content</div>' },
    });
    const dialog = container.firstElementChild as HTMLDialogElement;

    expect(container.childElementCount).toBe(1);
    expect(dialog.tagName).toBe('DIALOG');
    expect(dialog.getAttribute('class')).toBe('p-modal');
    expect(container.querySelector('p-modal')).toBeNull();
    expect(dialog.querySelector('.p-modal__panel')).not.toBeNull();
    expect(dialog.querySelector('.p-modal__dismiss')).not.toBeNull();
  });

  it('omits the dismiss button when dismissButton is false', () => {
    const { container } = render(PModal, { props: { dismissButton: false } });
    expect(container.querySelector('.p-modal__dismiss')).toBeNull();
  });

  it('encodes appearance on the dialog', () => {
    const { container } = render(PModal, {
      props: { background: 'surface', backdrop: 'shading', fullscreen: true },
    });
    const dialog = container.firstElementChild as HTMLDialogElement;

    expect(dialog.getAttribute('data-p-background')).toBe('surface');
    expect(dialog.getAttribute('data-p-backdrop')).toBe('shading');
    expect(dialog.getAttribute('data-p-fullscreen')).toBe('true');
  });
});
