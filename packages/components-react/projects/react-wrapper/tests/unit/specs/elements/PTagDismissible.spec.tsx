import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { nativeIconUrl } from '../../../../../../../components/src/elements/icon/icon-url';
import { PTagDismissible } from '../../../../src/elements/PTagDismissible';

describe('PTagDismissible', () => {
  it('returns a button with nothing wrapping it', () => {
    const { container } = render(<PTagDismissible>Default</PTagDismissible>);
    const button = container.firstElementChild as HTMLButtonElement;

    expect(container.childElementCount).toBe(1);
    expect(button.tagName).toBe('BUTTON');
    expect(button.type).toBe('button');
    expect(button.className).toBe('p-tag-dismissible');
    expect(container.querySelector('p-tag-dismissible')).toBeNull();
    expect(button.querySelector('.p-tag-dismissible__sr')?.textContent).toBe('Remove:');
    expect(button.querySelector('.p-tag-dismissible__content')?.textContent).toBe('Default');
    const icon = button.querySelector('img.p-icon') as HTMLImageElement;
    expect(icon.getAttribute('src')).toBe(nativeIconUrl('close'));
    expect(icon.parentElement?.className).toBe('p-tag-dismissible__icon');
  });

  it('encodes compact and a label child', () => {
    const { container } = render(
      <PTagDismissible compact label="Some label">
        Default
      </PTagDismissible>
    );
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.getAttribute('data-p-compact')).toBe('true');
    expect(button.querySelector('.p-tag-dismissible__label')?.textContent).toBe('Some label');
  });

  it('forwards a ref to the button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<PTagDismissible ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
