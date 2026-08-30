import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PBanner } from '../../../../src/elements/PBanner';

describe('PBanner', () => {
  it('returns an aside with nothing wrapping it', () => {
    const { container } = render(PBanner, {
      props: { heading: 'Heading', description: 'Description' },
      slots: { default: 'Extra' },
    });
    const aside = container.firstElementChild as HTMLElement;

    expect(container.childElementCount).toBe(1);
    expect(aside.tagName).toBe('ASIDE');
    expect(aside.getAttribute('class')).toBe('p-banner');
    expect(container.querySelector('p-banner')).toBeNull();
    expect(aside.getAttribute('popover')).toBe('manual');
    expect(aside.getAttribute('role')).toBe('status');
    expect(aside.querySelector('h5')?.textContent).toBe('Heading');
    expect(aside.querySelector('.p-banner__dismiss')).not.toBeNull();
  });

  it('omits the dismiss button when dismissButton is false', () => {
    const { container } = render(PBanner, { props: { dismissButton: false } });
    expect(container.querySelector('.p-banner__dismiss')).toBeNull();
  });

  it('encodes appearance and live region on the aside', () => {
    const { container } = render(PBanner, { props: { state: 'error', position: 'bottom', heading: 'Broken' } });
    const aside = container.firstElementChild as HTMLElement;
    expect(aside.getAttribute('data-p-state')).toBe('error');
    expect(aside.getAttribute('data-p-position')).toBe('bottom');
    expect(aside.getAttribute('role')).toBe('alert');
    expect(aside.getAttribute('aria-live')).toBe('assertive');
  });
});
