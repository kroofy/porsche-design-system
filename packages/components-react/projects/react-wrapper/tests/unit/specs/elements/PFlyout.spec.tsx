import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PFlyout } from '../../../../src/elements/PFlyout';

describe('PFlyout', () => {
  it('returns a dialog with nothing wrapping it', () => {
    const { container } = render(
      <PFlyout>
        <header className="p-flyout__header">Some Heading</header>
        <div>Some Content</div>
      </PFlyout>
    );

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('DIALOG');
    expect(container.querySelector('p-flyout')).toBeNull();
    const dialog = container.firstElementChild as HTMLDialogElement;
    expect(dialog.getAttribute('class')).toBe('p-flyout');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.querySelector('.p-flyout__scroller')).not.toBeNull();
    expect(dialog.querySelector('.p-flyout__panel')).not.toBeNull();
    expect(dialog.querySelector('.p-flyout__dismiss')?.getAttribute('aria-label')).toBe('Dismiss flyout');
    expect(dialog.querySelector('.p-flyout__header')?.parentElement?.className).toBe('p-flyout__panel');
  });

  it('omits the dismiss button when dismissButton is false', () => {
    const { container } = render(<PFlyout dismissButton={false}>Some Content</PFlyout>);
    expect(container.querySelector('.p-flyout__dismiss')).toBeNull();
  });

  it('encodes appearance on the dialog', () => {
    const { container } = render(
      <PFlyout background="surface" backdrop="shading" position="start" fullscreen footerBehavior="fixed" />
    );
    const dialog = container.firstElementChild as HTMLDialogElement;

    expect(dialog.getAttribute('data-p-background')).toBe('surface');
    expect(dialog.getAttribute('data-p-backdrop')).toBe('shading');
    expect(dialog.getAttribute('data-p-position')).toBe('start');
    expect(dialog.getAttribute('data-p-fullscreen')).toBe('true');
    expect(dialog.getAttribute('data-p-footer-behavior')).toBe('fixed');
  });

  it('puts aria-label on the dialog', () => {
    const { container } = render(<PFlyout aria-label="Some Heading" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('Some Heading');
  });

  it('forwards a ref to the dialog', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<PFlyout ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDialogElement);
  });
});
