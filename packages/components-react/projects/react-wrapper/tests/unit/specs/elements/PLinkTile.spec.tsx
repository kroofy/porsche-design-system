import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PLinkTile } from '../../../../src/elements/PLinkTile';

describe('PLinkTile', () => {
  it('returns an anchor with nothing wrapping it', () => {
    const { container } = render(
      <PLinkTile href="#" label="Some Label" description="Default">
        <img alt="Some alt text" />
      </PLinkTile>
    );
    const tile = container.firstElementChild as HTMLAnchorElement;

    expect(container.childElementCount).toBe(1);
    expect(tile.tagName).toBe('A');
    expect(tile.className).toBe('p-link-tile');
    expect(tile.getAttribute('href')).toBe('#');
    expect(tile.getAttribute('aria-label')).toBe('Some Label');
    expect(container.querySelector('p-link-tile')).toBeNull();
    expect(tile.querySelector('.p-link-tile__media img')?.getAttribute('alt')).toBe('Some alt text');
    expect(tile.querySelector('.p-link-tile__description')?.textContent).toBe('Default');
    const action = tile.querySelector('.p-link.p-link-tile__action');
    expect(action?.tagName).toBe('SPAN');
    expect(action?.getAttribute('aria-hidden')).toBe('true');
    expect(action?.getAttribute('data-p-variant')).toBe('secondary');
    expect(tile.querySelector('.p-link-tile__action-compact')).toBeNull();
  });

  it('puts header and footer in real children', () => {
    const { container } = render(
      <PLinkTile
        href="#"
        label="Some Label"
        description="Default"
        header={<span>Header</span>}
        footer={<span>Footer</span>}
      >
        <img alt="" />
      </PLinkTile>
    );
    const tile = container.firstElementChild as HTMLAnchorElement;

    expect(tile.querySelector('.p-link-tile__header')?.textContent).toBe('Header');
    expect(tile.querySelector('.p-link-tile__footer')?.textContent).toBe('Footer');
  });

  it('renders only the compact action when compact is true', () => {
    const { container } = render(
      <PLinkTile href="#" label="Some Label" description="Compact" compact>
        <img alt="" />
      </PLinkTile>
    );
    const tile = container.firstElementChild as HTMLAnchorElement;

    expect(tile.getAttribute('data-p-compact')).toBe('true');
    expect(tile.querySelector('.p-link-tile__action')).toBeNull();
    const action = tile.querySelector('.p-link.p-link-tile__action-compact');
    expect(action?.getAttribute('data-p-hide-label')).toBe('true');
    expect(action?.getAttribute('data-p-compact')).toBe('true');
    expect(action?.getAttribute('data-p-icon')).toBe('arrow-right');
  });

  it('forwards a ref to the anchor', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <PLinkTile ref={ref} href="#" label="Some Label" description="Default">
        <img alt="" />
      </PLinkTile>
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current?.className).toBe('p-link-tile');
  });
});
