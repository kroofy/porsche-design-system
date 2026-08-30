import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PButtonTile } from '../../../../src/elements/PButtonTile';

describe('PButtonTile', () => {
  it('returns a button with nothing wrapping it', () => {
    const { container } = render(
      <PButtonTile label="Some Label" description="Default">
        <img alt="Some alt text" />
      </PButtonTile>
    );
    const tile = container.firstElementChild as HTMLButtonElement;

    expect(container.childElementCount).toBe(1);
    expect(tile.tagName).toBe('BUTTON');
    expect(tile.type).toBe('submit');
    expect(tile.className).toBe('p-button-tile');
    expect(tile.getAttribute('aria-label')).toBe('Some Label');
    expect(container.querySelector('p-button-tile')).toBeNull();
    expect(tile.querySelector('.p-button-tile__media img')?.getAttribute('alt')).toBe('Some alt text');
    expect(tile.querySelector('.p-button-tile__description')?.textContent).toBe('Default');
    const action = tile.querySelector('.p-button.p-button-tile__action');
    expect(action?.tagName).toBe('SPAN');
    expect(action?.getAttribute('aria-hidden')).toBe('true');
    expect(action?.getAttribute('data-p-variant')).toBe('secondary');
    expect(action?.querySelector('.p-button__label')?.textContent).toBe('Some Label');
    expect(tile.querySelector('.p-button-tile__action-compact')).toBeNull();
  });

  it('puts header and footer in real children', () => {
    const { container } = render(
      <PButtonTile label="Some Label" description="Default" header={<span>Header</span>} footer={<span>Footer</span>}>
        <img alt="" />
      </PButtonTile>
    );
    const tile = container.firstElementChild as HTMLButtonElement;

    expect(tile.querySelector('.p-button-tile__header')?.textContent).toBe('Header');
    expect(tile.querySelector('.p-button-tile__footer')?.textContent).toBe('Footer');
  });

  it('uses native disabled and loading state', () => {
    const { container, rerender } = render(
      <PButtonTile label="Some Label" description="Default" disabled>
        <img alt="" />
      </PButtonTile>
    );
    const tile = () => container.firstElementChild as HTMLButtonElement;

    expect(tile().disabled).toBe(true);
    expect(tile().getAttribute('aria-busy')).toBeNull();
    expect(tile().getAttribute('data-p-loading')).toBeNull();

    rerender(
      <PButtonTile label="Some Label" description="Default" loading>
        <img alt="" />
      </PButtonTile>
    );
    expect(tile().disabled).toBe(true);
    expect(tile().getAttribute('aria-busy')).toBe('true');
    expect(tile().getAttribute('data-p-loading')).toBe('true');
    expect(tile().querySelector('.p-button__spinner svg')).not.toBeNull();
    expect(container.querySelector('p-spinner')).toBeNull();
  });

  it('renders only the compact action when compact is true', () => {
    const { container } = render(
      <PButtonTile label="Some Label" description="Compact" compact>
        <img alt="" />
      </PButtonTile>
    );
    const tile = container.firstElementChild as HTMLButtonElement;

    expect(tile.getAttribute('data-p-compact')).toBe('true');
    expect(tile.querySelector('.p-button-tile__action')).toBeNull();
    const action = tile.querySelector('.p-button.p-button-tile__action-compact');
    expect(action?.getAttribute('data-p-hide-label')).toBe('true');
    expect(action?.getAttribute('data-p-compact')).toBe('true');
    expect(action?.getAttribute('data-p-icon')).toBe('arrow-right');
  });

  it('renders both actions when compact is responsive', () => {
    const { container } = render(
      <PButtonTile label="Some Label" description="Compact" compact={{ base: true, m: false }}>
        <img alt="" />
      </PButtonTile>
    );
    const tile = container.firstElementChild as HTMLButtonElement;

    expect(tile.getAttribute('data-p-compact')).toBe('true');
    expect(tile.getAttribute('data-p-compact-m')).toBe('false');
    expect(tile.querySelector('.p-button-tile__action')).not.toBeNull();
    expect(tile.querySelector('.p-button-tile__action-compact')).not.toBeNull();
  });

  it('encodes non-default appearance on the button', () => {
    const { container } = render(
      <PButtonTile
        label="Some Label"
        description="Large"
        size="large"
        weight="regular"
        aspectRatio="16/9"
        align="top"
        gradient
      >
        <img alt="" />
      </PButtonTile>
    );
    const tile = container.firstElementChild as HTMLButtonElement;

    expect(tile.getAttribute('data-p-size')).toBe('large');
    expect(tile.getAttribute('data-p-weight')).toBe('regular');
    expect(tile.getAttribute('data-p-aspect-ratio')).toBe('16/9');
    expect(tile.getAttribute('data-p-align')).toBe('top');
    expect(tile.getAttribute('data-p-gradient')).toBe('true');
  });

  it('forwards a ref to the button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <PButtonTile ref={ref} label="Some Label" description="Default">
        <img alt="" />
      </PButtonTile>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.className).toBe('p-button-tile');
  });
});
