import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PDivider } from '../../../../src/elements/PDivider';

describe('PDivider', () => {
  it('returns an hr with nothing wrapping it', () => {
    const { container } = render(PDivider);
    const hr = container.firstElementChild as HTMLHRElement;

    expect(container.childElementCount).toBe(1);
    expect(hr.tagName).toBe('HR');
    expect(hr.className).toBe('p-divider');
    expect(container.querySelector('p-divider')).toBeNull();
  });

  it('puts aria attributes on the hr', () => {
    const { container } = render(PDivider, { attrs: { 'aria-hidden': 'true' } });
    expect((container.firstElementChild as HTMLHRElement).getAttribute('aria-hidden')).toBe('true');
  });

  it('encodes non-default appearance on the hr', () => {
    const { container } = render(PDivider, { props: { color: 'contrast-high', direction: 'vertical' } });
    const hr = container.firstElementChild as HTMLHRElement;

    expect(hr.getAttribute('data-p-color')).toBe('contrast-high');
    expect(hr.getAttribute('data-p-direction')).toBe('vertical');
  });
});
