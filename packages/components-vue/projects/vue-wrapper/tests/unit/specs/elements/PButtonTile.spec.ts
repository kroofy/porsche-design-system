import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PButtonTile } from '../../../../src/elements/PButtonTile';

describe('PButtonTile', () => {
  it('returns a button with nothing wrapping it', () => {
    const { container } = render(PButtonTile, {
      props: { label: 'Some Label', description: 'Default' },
      slots: { default: '<img alt="Some alt text" />' },
    });
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
    expect(tile.querySelector('.p-button-tile__action-compact')).toBeNull();
  });

  it('puts header and footer in real children', () => {
    const { container } = render(PButtonTile, {
      props: { label: 'Some Label', description: 'Default' },
      slots: { default: '<img alt="" />', header: 'Header', footer: 'Footer' },
    });
    const tile = container.firstElementChild as HTMLButtonElement;

    expect(tile.querySelector('.p-button-tile__header')?.textContent).toBe('Header');
    expect(tile.querySelector('.p-button-tile__footer')?.textContent).toBe('Footer');
  });

  it('uses native disabled and loading state', async () => {
    const { container, rerender } = render(PButtonTile, {
      props: { label: 'Some Label', description: 'Default', disabled: true },
      slots: { default: '<img alt="" />' },
    });
    const tile = () => container.firstElementChild as HTMLButtonElement;

    expect(tile().disabled).toBe(true);
    expect(tile().getAttribute('aria-busy')).toBeNull();

    await rerender({ disabled: false, loading: true });
    expect(tile().disabled).toBe(true);
    expect(tile().getAttribute('aria-busy')).toBe('true');
    expect(tile().getAttribute('data-p-loading')).toBe('true');
    expect(tile().querySelector('.p-button__spinner svg')).not.toBeNull();
    expect(container.querySelector('p-spinner')).toBeNull();
  });

  it('renders only the compact action when compact is true', () => {
    const { container } = render(PButtonTile, {
      props: { label: 'Some Label', description: 'Compact', compact: true },
      slots: { default: '<img alt="" />' },
    });
    const tile = container.firstElementChild as HTMLButtonElement;

    expect(tile.getAttribute('data-p-compact')).toBe('true');
    expect(tile.querySelector('.p-button-tile__action')).toBeNull();
    expect(tile.querySelector('.p-button-tile__action-compact')).not.toBeNull();
  });

  it('encodes non-default appearance on the button', () => {
    const { container } = render(PButtonTile, {
      props: {
        label: 'Some Label',
        description: 'Large',
        size: 'large',
        weight: 'regular',
        aspectRatio: '16/9',
        align: 'top',
        gradient: true,
      },
      slots: { default: '<img alt="" />' },
    });
    const tile = container.firstElementChild as HTMLButtonElement;

    expect(tile.getAttribute('data-p-size')).toBe('large');
    expect(tile.getAttribute('data-p-weight')).toBe('regular');
    expect(tile.getAttribute('data-p-aspect-ratio')).toBe('16/9');
    expect(tile.getAttribute('data-p-align')).toBe('top');
    expect(tile.getAttribute('data-p-gradient')).toBe('true');
  });
});
