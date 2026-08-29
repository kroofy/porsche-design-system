import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PHeading } from '../../../../src/elements/PHeading';

describe('PHeading', () => {
  it('returns an h2 with nothing wrapping it', () => {
    const { container } = render(PHeading, { slots: { default: 'Title' } });
    const heading = container.firstElementChild as HTMLHeadingElement;

    expect(container.childElementCount).toBe(1);
    expect(heading.tagName).toBe('H2');
    expect(heading.className).toBe('p-heading');
    expect(container.querySelector('p-heading')).toBeNull();
  });

  it('maps size to the heading tag', () => {
    const { container } = render(PHeading, { props: { size: 'sm' }, slots: { default: 'Title' } });
    expect((container.firstElementChild as HTMLHeadingElement).tagName).toBe('H6');
  });

  it('encodes non-default appearance on the heading', () => {
    const { container } = render(PHeading, {
      props: { weight: 'bold', color: 'contrast-high', ellipsis: true },
      slots: { default: 'Title' },
    });
    const heading = container.firstElementChild as HTMLHeadingElement;

    expect(heading.getAttribute('data-p-weight')).toBe('bold');
    expect(heading.getAttribute('data-p-color')).toBe('contrast-high');
    expect(heading.getAttribute('data-p-ellipsis')).toBe('true');
  });
});
