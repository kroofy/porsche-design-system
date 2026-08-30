import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PDivider } from '../../../../src/elements/PDivider';

describe('PDivider', () => {
  it('returns an hr with nothing wrapping it', () => {
    const { container } = render(<PDivider />);

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('HR');
    expect(container.querySelector('p-divider')).toBeNull();
    expect(container.innerHTML).toBe('<hr class="p-divider">');
  });

  it('puts aria attributes on the hr', () => {
    const { container } = render(<PDivider aria-hidden="true" />);
    expect((container.firstElementChild as HTMLHRElement).getAttribute('aria-hidden')).toBe('true');
  });

  it('encodes non-default appearance on the hr', () => {
    const { container } = render(<PDivider color="contrast-high" direction="vertical" />);
    const hr = container.firstElementChild as HTMLHRElement;

    expect(hr.className).toBe('p-divider');
    expect(hr.getAttribute('data-p-color')).toBe('contrast-high');
    expect(hr.getAttribute('data-p-direction')).toBe('vertical');
  });

  it('forwards a ref to the hr', () => {
    const ref = createRef<HTMLHRElement>();
    render(<PDivider ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLHRElement);
    expect(ref.current?.tagName).toBe('HR');
  });
});
