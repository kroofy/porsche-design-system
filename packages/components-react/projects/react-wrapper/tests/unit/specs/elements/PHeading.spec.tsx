import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PHeading } from '../../../../src/elements/PHeading';

describe('PHeading', () => {
  it('returns an h2 with nothing wrapping it', () => {
    const { container } = render(<PHeading>Title</PHeading>);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('H2');
    expect(container.querySelector('p-heading')).toBeNull();
    expect(container.innerHTML).toBe('<h2 class="p-heading">Title</h2>');
  });

  it('maps size to the heading tag', () => {
    const { container } = render(<PHeading size="sm">Title</PHeading>);
    expect(container.firstElementChild?.tagName).toBe('H6');
    expect(container.firstElementChild?.getAttribute('data-p-size')).toBe('sm');
  });

  it('prefers an explicit tag', () => {
    const { container } = render(<PHeading tag="h1">Title</PHeading>);
    expect(container.firstElementChild?.tagName).toBe('H1');
  });

  it('encodes non-default appearance on the heading', () => {
    const { container } = render(
      <PHeading size="5xl" weight="bold" align="center" color="contrast-high" ellipsis>
        Title
      </PHeading>
    );
    const heading = container.firstElementChild as HTMLHeadingElement;

    expect(heading.getAttribute('data-p-size')).toBe('5xl');
    expect(heading.getAttribute('data-p-weight')).toBe('bold');
    expect(heading.getAttribute('data-p-align')).toBe('center');
    expect(heading.getAttribute('data-p-color')).toBe('contrast-high');
    expect(heading.getAttribute('data-p-ellipsis')).toBe('true');
  });

  it('forwards a ref to the heading', () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<PHeading ref={ref}>Title</PHeading>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });
});
