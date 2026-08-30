import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PLinkTile } from '../../../../src/elements/PLinkTile';

describe('PLinkTile', () => {
  it('returns an anchor with nothing wrapping it', () => {
    const { container } = render(PLinkTile, {
      props: { label: 'Some Label', description: 'Default' },
      attrs: { href: '#' },
      slots: { default: '<img alt="Some alt text" />' },
    });
    const tile = container.firstElementChild as HTMLAnchorElement;

    expect(container.childElementCount).toBe(1);
    expect(tile.tagName).toBe('A');
    expect(tile.className).toBe('p-link-tile');
    expect(tile.getAttribute('href')).toBe('#');
    expect(tile.getAttribute('aria-label')).toBe('Some Label');
    expect(container.querySelector('p-link-tile')).toBeNull();
    expect(tile.querySelector('.p-link-tile__media img')?.getAttribute('alt')).toBe('Some alt text');
    const action = tile.querySelector('.p-link.p-link-tile__action');
    expect(action?.tagName).toBe('SPAN');
    expect(action?.getAttribute('aria-hidden')).toBe('true');
    expect(tile.querySelector('.p-link-tile__action-compact')).toBeNull();
  });

  it('puts header and footer in real children', () => {
    const { container } = render(PLinkTile, {
      props: { label: 'Some Label', description: 'Default' },
      attrs: { href: '#' },
      slots: { default: '<img alt="" />', header: 'Header', footer: 'Footer' },
    });
    const tile = container.firstElementChild as HTMLAnchorElement;

    expect(tile.querySelector('.p-link-tile__header')?.textContent).toBe('Header');
    expect(tile.querySelector('.p-link-tile__footer')?.textContent).toBe('Footer');
  });

  it('renders only the compact action when compact is true', () => {
    const { container } = render(PLinkTile, {
      props: { label: 'Some Label', description: 'Compact', compact: true },
      attrs: { href: '#' },
      slots: { default: '<img alt="" />' },
    });
    const tile = container.firstElementChild as HTMLAnchorElement;

    expect(tile.getAttribute('data-p-compact')).toBe('true');
    expect(tile.querySelector('.p-link-tile__action')).toBeNull();
    expect(tile.querySelector('.p-link-tile__action-compact')).not.toBeNull();
  });
});
