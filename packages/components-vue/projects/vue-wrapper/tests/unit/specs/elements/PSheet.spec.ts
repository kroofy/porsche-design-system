import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PSheet } from '../../../../src/elements/PSheet';

describe('PSheet', () => {
  it('returns a dialog with nothing wrapping it', () => {
    const { container } = render(PSheet, {
      slots: { default: '<header class="p-sheet__header">Some Heading</header><div>Some Content</div>' },
    });
    const dialog = container.firstElementChild as HTMLDialogElement;

    expect(container.childElementCount).toBe(1);
    expect(dialog.tagName).toBe('DIALOG');
    expect(dialog.getAttribute('class')).toBe('p-sheet');
    expect(container.querySelector('p-sheet')).toBeNull();
    expect(dialog.querySelector('.p-sheet__panel')).not.toBeNull();
    expect(dialog.querySelector('.p-sheet__dismiss')).not.toBeNull();
  });

  it('omits the dismiss button when dismissButton is false', () => {
    const { container } = render(PSheet, { props: { dismissButton: false } });
    expect(container.querySelector('.p-sheet__dismiss')).toBeNull();
  });

  it('encodes appearance on the dialog', () => {
    const { container } = render(PSheet, { props: { background: 'surface' } });
    expect(container.firstElementChild?.getAttribute('data-p-background')).toBe('surface');
  });
});
