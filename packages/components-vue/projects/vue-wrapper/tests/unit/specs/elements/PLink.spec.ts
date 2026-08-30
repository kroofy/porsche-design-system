import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PLink } from '../../../../src/elements/PLink';

describe('PLink', () => {
  it('returns an anchor with nothing wrapping it', () => {
    const { container } = render(PLink, {
      attrs: { href: 'https://porsche.com' },
      slots: { default: 'Porsche' },
    });

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('A');
    expect(container.querySelector('p-link')).toBeNull();
    expect(container.innerHTML).toBe(
      '<a href="https://porsche.com" class="p-link"><span class="p-link__label">Porsche</span></a>'
    );
  });

  it('puts aria attributes on the anchor', () => {
    const { container } = render(PLink, {
      attrs: { href: '#main', 'aria-current': 'page' },
      slots: { default: 'Main' },
    });
    const link = container.firstElementChild as HTMLAnchorElement;

    expect(link.getAttribute('aria-current')).toBe('page');
  });

  it('encodes non-default appearance on the anchor', () => {
    const { container } = render(PLink, {
      attrs: { href: '/' },
      props: { variant: 'secondary', icon: 'arrow-right', compact: true },
      slots: { default: 'Next' },
    });
    const link = container.firstElementChild as HTMLAnchorElement;

    expect(link.className).toBe('p-link');
    expect(link.getAttribute('data-p-variant')).toBe('secondary');
    expect(link.getAttribute('data-p-icon')).toBe('arrow-right');
    expect(link.getAttribute('data-p-compact')).toBe('true');
    const icon = link.querySelector('img.p-icon.p-link__icon');
    expect(icon?.getAttribute('data-p-size')).toBe('inherit');
    expect(icon?.parentElement).toBe(link);
    expect(container.querySelector('p-icon')).toBeNull();
    expect(container.querySelector('p-link')).toBeNull();
  });
});
