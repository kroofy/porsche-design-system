import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PInlineNotification } from '../../../../src/elements/PInlineNotification';

describe('PInlineNotification', () => {
  it('returns an aside with nothing wrapping it', () => {
    const { container } = render(PInlineNotification, {
      props: { heading: 'Heading', description: 'Description' },
      slots: { default: 'Extra' },
    });
    const aside = container.firstElementChild as HTMLElement;

    expect(container.childElementCount).toBe(1);
    expect(aside.tagName).toBe('ASIDE');
    expect(aside.getAttribute('class')).toBe('p-inline-notification');
    expect(container.querySelector('p-inline-notification')).toBeNull();
    expect(aside.getAttribute('role')).toBe('status');
    expect(aside.querySelector('h5')?.textContent).toBe('Heading');
    expect(aside.querySelector('.p-inline-notification__dismiss')).not.toBeNull();
  });

  it('omits the dismiss button when dismissButton is false', () => {
    const { container } = render(PInlineNotification, { props: { dismissButton: false } });
    expect(container.querySelector('.p-inline-notification__dismiss')).toBeNull();
  });

  it('encodes appearance and live region on the aside', () => {
    const { container } = render(PInlineNotification, { props: { state: 'error', heading: 'Broken' } });
    const aside = container.firstElementChild as HTMLElement;
    expect(aside.getAttribute('data-p-state')).toBe('error');
    expect(aside.getAttribute('role')).toBe('alert');
    expect(aside.getAttribute('aria-live')).toBe('assertive');
  });
});
