import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PSheet } from '../../../../src/elements/PSheet';

describe('PSheet', () => {
  it('returns a dialog with nothing wrapping it', () => {
    const { container } = render(
      <PSheet>
        <header className="p-sheet__header">Some Heading</header>
        <div>Some Content</div>
      </PSheet>
    );

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('DIALOG');
    expect(container.querySelector('p-sheet')).toBeNull();
    const dialog = container.firstElementChild as HTMLDialogElement;
    expect(dialog.getAttribute('class')).toBe('p-sheet');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.querySelector('.p-sheet__scroller')).not.toBeNull();
    expect(dialog.querySelector('.p-sheet__panel')).not.toBeNull();
    expect(dialog.querySelector('.p-sheet__dismiss')?.getAttribute('aria-label')).toBe('Dismiss sheet');
    expect(dialog.querySelector('.p-sheet__header')?.parentElement?.className).toBe('p-sheet__panel');
  });

  it('omits the dismiss button when dismissButton is false', () => {
    const { container } = render(<PSheet dismissButton={false}>Some Content</PSheet>);
    expect(container.querySelector('.p-sheet__dismiss')).toBeNull();
  });

  it('encodes appearance on the dialog', () => {
    const { container } = render(<PSheet background="surface" />);
    expect(container.firstElementChild?.getAttribute('data-p-background')).toBe('surface');
  });

  it('forwards a ref to the dialog', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<PSheet ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDialogElement);
  });
});
