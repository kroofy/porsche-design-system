import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PTextList } from '../../../../src/elements/PTextList';
import { PTextListItem } from '../../../../src/elements/PTextListItem';

describe('PTextList', () => {
  it('returns a ul with nothing wrapping it', () => {
    const { container } = render(
      <PTextList>
        <PTextListItem>Item</PTextListItem>
      </PTextList>
    );

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('UL');
    expect(container.querySelector('p-text-list')).toBeNull();
    expect(container.querySelector('p-text-list-item')).toBeNull();
    expect(container.innerHTML).toBe('<ul class="p-text-list"><li class="p-text-list-item">Item</li></ul>');
  });

  it('uses ol for numbered and alphabetically', () => {
    const numbered = render(<PTextList type="numbered" />);
    expect(numbered.container.firstElementChild?.tagName).toBe('OL');
    expect(numbered.container.firstElementChild?.getAttribute('data-p-type')).toBe('numbered');

    const alpha = render(<PTextList type="alphabetically" />);
    expect(alpha.container.firstElementChild?.tagName).toBe('OL');
    expect(alpha.container.firstElementChild?.getAttribute('data-p-type')).toBe('alphabetically');
  });

  it('forwards a ref to the list', () => {
    const ref = createRef<HTMLUListElement>();
    render(<PTextList ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });
});

describe('PTextListItem', () => {
  it('returns an li with nothing wrapping it', () => {
    const { container } = render(<PTextListItem>Item</PTextListItem>);
    expect(container.firstElementChild?.tagName).toBe('LI');
    expect(container.querySelector('p-text-list-item')).toBeNull();
  });

  it('forwards a ref to the li', () => {
    const ref = createRef<HTMLLIElement>();
    render(<PTextListItem ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });
});
