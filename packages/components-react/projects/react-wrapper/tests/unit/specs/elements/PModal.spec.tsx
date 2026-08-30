import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PModal } from '../../../../src/elements/PModal';

describe('PModal', () => {
  it('returns a dialog with nothing wrapping it', () => {
    const { container } = render(
      <PModal>
        <header className="p-modal__header">Some Heading</header>
        <div>Some Content</div>
      </PModal>
    );

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('DIALOG');
    expect(container.querySelector('p-modal')).toBeNull();
    const dialog = container.firstElementChild as HTMLDialogElement;
    expect(dialog.getAttribute('class')).toBe('p-modal');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.querySelector('.p-modal__scroller')).not.toBeNull();
    expect(dialog.querySelector('.p-modal__panel')).not.toBeNull();
    expect(dialog.querySelector('.p-modal__dismiss')).not.toBeNull();
    expect(dialog.querySelector('.p-modal__header')?.parentElement?.className).toBe('p-modal__panel');
  });

  it('omits the dismiss button when dismissButton is false', () => {
    const { container } = render(<PModal dismissButton={false}>Some Content</PModal>);
    expect(container.querySelector('.p-modal__dismiss')).toBeNull();
  });

  it('encodes appearance on the dialog', () => {
    const { container } = render(<PModal background="surface" backdrop="shading" fullscreen />);
    const dialog = container.firstElementChild as HTMLDialogElement;

    expect(dialog.getAttribute('data-p-background')).toBe('surface');
    expect(dialog.getAttribute('data-p-backdrop')).toBe('shading');
    expect(dialog.getAttribute('data-p-fullscreen')).toBe('true');
  });

  it('puts aria-label on the dialog', () => {
    const { container } = render(<PModal aria-label="Some Heading" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('Some Heading');
  });

  it('forwards a ref to the dialog', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<PModal ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDialogElement);
  });
});
