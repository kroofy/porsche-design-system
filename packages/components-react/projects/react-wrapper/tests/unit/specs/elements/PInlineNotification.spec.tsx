import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PInlineNotification } from '../../../../src/elements/PInlineNotification';

describe('PInlineNotification', () => {
  it('returns an aside with nothing wrapping it', () => {
    const { container } = render(
      <PInlineNotification heading="Heading" description="Description">
        Extra
      </PInlineNotification>
    );

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('ASIDE');
    expect(container.querySelector('p-inline-notification')).toBeNull();
    const aside = container.firstElementChild as HTMLElement;
    expect(aside.getAttribute('class')).toBe('p-inline-notification');
    expect(aside.getAttribute('role')).toBe('status');
    expect(aside.getAttribute('aria-live')).toBe('polite');
    expect(aside.querySelector('h5')?.textContent).toBe('Heading');
    expect(aside.querySelector('p')?.textContent).toBe('Description');
    expect(aside.querySelector('.p-inline-notification__dismiss')?.getAttribute('aria-label')).toBe(
      'Close notification'
    );
  });

  it('omits the dismiss button when dismissButton is false', () => {
    const { container } = render(<PInlineNotification dismissButton={false}>Some Content</PInlineNotification>);
    expect(container.querySelector('.p-inline-notification__dismiss')).toBeNull();
  });

  it('encodes appearance and live region on the aside', () => {
    const { container } = render(<PInlineNotification state="error" heading="Broken" />);
    const aside = container.firstElementChild as HTMLElement;
    expect(aside.getAttribute('data-p-state')).toBe('error');
    expect(aside.getAttribute('role')).toBe('alert');
    expect(aside.getAttribute('aria-live')).toBe('assertive');
    expect(aside.getAttribute('aria-label')).toBe('Broken');
  });

  it('renders a native action button', () => {
    const { container } = render(<PInlineNotification actionLabel="Retry" actionIcon="refresh" />);
    const action = container.querySelector('.p-inline-notification__action');
    expect(action?.tagName).toBe('BUTTON');
    expect(action?.classList.contains('p-button-pure')).toBe(true);
    expect(action?.getAttribute('data-p-icon')).toBe('refresh');
  });

  it('forwards a ref to the aside', () => {
    const ref = createRef<HTMLElement>();
    render(<PInlineNotification ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('ASIDE');
  });
});
