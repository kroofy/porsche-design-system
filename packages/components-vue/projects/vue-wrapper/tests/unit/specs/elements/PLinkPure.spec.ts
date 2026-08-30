import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PLinkPure } from '../../../../src/elements/PLinkPure';

describe('PLinkPure', () => {
  it('returns an anchor with nothing wrapping it', () => {
    const { container } = render(PLinkPure, {
      attrs: { href: 'https://porsche.com' },
      slots: { default: 'More' },
    });
    const link = container.firstElementChild as HTMLAnchorElement;

    expect(container.childElementCount).toBe(1);
    expect(link.tagName).toBe('A');
    expect(link.className).toBe('p-link-pure');
    expect(link.getAttribute('href')).toBe('https://porsche.com');
    expect(container.querySelector('p-link-pure')).toBeNull();
    expect(link.querySelector('img.p-icon.p-link-pure__icon')?.getAttribute('src')).toContain('arrow-right');
    expect(link.querySelector('span.p-link-pure__label')?.textContent).toBe('More');
  });

  it('encodes non-default appearance on the anchor', () => {
    const { container } = render(PLinkPure, {
      attrs: { href: 'https://porsche.com' },
      props: { icon: 'phone', hideLabel: true, underline: true, active: true },
      slots: { default: 'Call' },
    });
    const link = container.firstElementChild as HTMLAnchorElement;

    expect(link.getAttribute('data-p-icon')).toBe('phone');
    expect(link.getAttribute('data-p-hide-label')).toBe('true');
    expect(link.getAttribute('data-p-underline')).toBe('true');
    expect(link.getAttribute('data-p-active')).toBe('true');
    expect(container.querySelector('span')?.parentElement).toBe(link);
  });
});
