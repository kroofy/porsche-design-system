import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PTextList } from '../../../../src/elements/PTextList';
import { PTextListItem } from '../../../../src/elements/PTextListItem';

describe('PTextList', () => {
  it('returns a ul with nothing wrapping it', () => {
    const { container } = render(PTextList, {
      slots: { default: '<li class="p-text-list-item">Item</li>' },
    });
    const list = container.firstElementChild as HTMLUListElement;

    expect(container.childElementCount).toBe(1);
    expect(list.tagName).toBe('UL');
    expect(list.className).toBe('p-text-list');
    expect(container.querySelector('p-text-list')).toBeNull();
  });

  it('uses ol for numbered', () => {
    const { container } = render(PTextList, { props: { type: 'numbered' } });
    const list = container.firstElementChild as HTMLOListElement;

    expect(list.tagName).toBe('OL');
    expect(list.getAttribute('data-p-type')).toBe('numbered');
  });
});

describe('PTextListItem', () => {
  it('returns an li with nothing wrapping it', () => {
    const { container } = render(PTextListItem, { slots: { default: 'Item' } });
    const item = container.firstElementChild as HTMLLIElement;

    expect(item.tagName).toBe('LI');
    expect(item.className).toBe('p-text-list-item');
    expect(container.querySelector('p-text-list-item')).toBeNull();
  });
});
