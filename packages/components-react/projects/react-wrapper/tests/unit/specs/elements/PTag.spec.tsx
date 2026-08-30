import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { nativeIconUrl } from '../../../../../../../components/src/elements/icon/icon-url';
import { PTag } from '../../../../src/elements/PTag';

describe('PTag', () => {
  it('returns a span with nothing wrapping it', () => {
    const { container } = render(<PTag>Default</PTag>);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('SPAN');
    expect(container.querySelector('p-tag')).toBeNull();
    expect(container.innerHTML).toBe('<span class="p-tag">Default</span>');
  });

  it('returns a bare a when href is set', () => {
    const { container } = render(<PTag href="#">primary</PTag>);
    const a = container.firstElementChild as HTMLAnchorElement;

    expect(container.childElementCount).toBe(1);
    expect(a.tagName).toBe('A');
    expect(a.className).toBe('p-tag');
    expect(a.getAttribute('href')).toBe('#');
  });

  it('returns a bare button when type is set', () => {
    const { container } = render(<PTag type="button">primary</PTag>);
    const button = container.firstElementChild as HTMLButtonElement;

    expect(container.childElementCount).toBe(1);
    expect(button.tagName).toBe('BUTTON');
    expect(button.type).toBe('button');
    expect(button.className).toBe('p-tag');
  });

  it('encodes non-default appearance on the tag', () => {
    const { container } = render(
      <PTag variant="primary" compact icon="car">
        primary
      </PTag>
    );
    const tag = container.firstElementChild as HTMLElement;

    expect(tag.className).toBe('p-tag');
    expect(tag.getAttribute('data-p-variant')).toBe('primary');
    expect(tag.getAttribute('data-p-compact')).toBe('true');
    const icon = tag.querySelector('img.p-tag__icon') as HTMLImageElement;
    expect(icon).not.toBeNull();
    expect(icon.getAttribute('src')).toBe(nativeIconUrl('car'));
    expect(icon.parentElement).toBe(tag);
  });

  it('forwards a ref to the span', () => {
    const ref = createRef<HTMLElement>();
    render(<PTag ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current?.tagName).toBe('SPAN');
  });
});
