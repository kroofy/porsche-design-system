import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { nativeIconUrl } from '../../../../../../../components/src/elements/icon/icon-url';
import { PTag } from '../../../../src/elements/PTag';

describe('PTag', () => {
  it('returns a span with nothing wrapping it', () => {
    const { container } = render(PTag, { slots: { default: 'Default' } });
    const tag = container.firstElementChild as HTMLElement;

    expect(container.childElementCount).toBe(1);
    expect(tag.tagName).toBe('SPAN');
    expect(tag.className).toBe('p-tag');
    expect(container.querySelector('p-tag')).toBeNull();
  });

  it('returns a bare a when href is set', () => {
    const { container } = render(PTag, { props: { href: '#' }, slots: { default: 'primary' } });
    const a = container.firstElementChild as HTMLAnchorElement;

    expect(a.tagName).toBe('A');
    expect(a.className).toBe('p-tag');
    expect(a.getAttribute('href')).toBe('#');
  });

  it('returns a bare button when type is set', () => {
    const { container } = render(PTag, { props: { type: 'button' }, slots: { default: 'primary' } });
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('encodes non-default appearance on the tag', () => {
    const { container } = render(PTag, {
      props: { variant: 'primary', compact: true, icon: 'car' },
      slots: { default: 'primary' },
    });
    const tag = container.firstElementChild as HTMLElement;

    expect(tag.getAttribute('data-p-variant')).toBe('primary');
    expect(tag.getAttribute('data-p-compact')).toBe('true');
    const icon = tag.querySelector('img.p-tag__icon') as HTMLImageElement;
    expect(icon.getAttribute('src')).toBe(nativeIconUrl('car'));
    expect(icon.parentElement).toBe(tag);
  });
});
