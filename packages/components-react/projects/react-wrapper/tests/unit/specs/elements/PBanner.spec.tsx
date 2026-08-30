import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PBanner } from '../../../../src/elements/PBanner';

describe('PBanner', () => {
  it('returns an aside with nothing wrapping it', () => {
    const { container } = render(
      <PBanner heading="Heading" description="Description">
        Extra
      </PBanner>
    );

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('ASIDE');
    expect(container.querySelector('p-banner')).toBeNull();
    const aside = container.firstElementChild as HTMLElement;
    expect(aside.getAttribute('class')).toBe('p-banner');
    expect(aside.getAttribute('popover')).toBe('manual');
    expect(aside.getAttribute('role')).toBe('status');
    expect(aside.getAttribute('aria-live')).toBe('polite');
    expect(aside.querySelector('h5')?.textContent).toBe('Heading');
    expect(aside.querySelector('p')?.textContent).toBe('Description');
    expect(aside.querySelector('.p-banner__dismiss')?.getAttribute('aria-label')).toBe('Close banner');
  });

  it('omits the dismiss button when dismissButton is false', () => {
    const { container } = render(<PBanner dismissButton={false}>Some Content</PBanner>);
    expect(container.querySelector('.p-banner__dismiss')).toBeNull();
  });

  it('encodes appearance and live region on the aside', () => {
    const { container } = render(<PBanner state="error" position="bottom" heading="Broken" />);
    const aside = container.firstElementChild as HTMLElement;
    expect(aside.getAttribute('data-p-state')).toBe('error');
    expect(aside.getAttribute('data-p-position')).toBe('bottom');
    expect(aside.getAttribute('role')).toBe('alert');
    expect(aside.getAttribute('aria-live')).toBe('assertive');
    expect(aside.getAttribute('aria-label')).toBe('Broken');
  });

  it('forwards a ref to the aside', () => {
    const ref = createRef<HTMLElement>();
    render(<PBanner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('ASIDE');
  });
});
