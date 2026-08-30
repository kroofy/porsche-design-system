import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PAccordion } from '../../../../src/elements/PAccordion';

describe('PAccordion', () => {
  it('returns a details with nothing wrapping it', () => {
    const { container } = render(
      <PAccordion>
        <summary>Some summary</summary>
        <div>Some details</div>
      </PAccordion>
    );

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('DETAILS');
    expect(container.querySelector('p-accordion')).toBeNull();
    expect(container.innerHTML).toBe(
      '<details class="p-accordion"><summary>Some summary</summary><div>Some details</div></details>'
    );
  });

  it('puts open and aria on the details', () => {
    const { container } = render(<PAccordion open aria-label="Some accordion" />);
    const details = container.firstElementChild as HTMLDetailsElement;

    expect(details.open).toBe(true);
    expect(details.getAttribute('aria-label')).toBe('Some accordion');
  });

  it('encodes non-default appearance on the details', () => {
    const { container } = render(
      <PAccordion alignMarker="start" background="surface" compact indent sticky size="medium" />
    );
    const details = container.firstElementChild as HTMLDetailsElement;

    expect(details.className).toBe('p-accordion');
    expect(details.getAttribute('data-p-align-marker')).toBe('start');
    expect(details.getAttribute('data-p-background')).toBe('surface');
    expect(details.getAttribute('data-p-compact')).toBe('true');
    expect(details.getAttribute('data-p-indent')).toBe('true');
    expect(details.getAttribute('data-p-sticky')).toBe('true');
    expect(details.getAttribute('data-p-size')).toBe('medium');
  });

  it('forwards a ref to the details', () => {
    const ref = createRef<HTMLDetailsElement>();
    render(<PAccordion ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDetailsElement);
    expect(ref.current?.tagName).toBe('DETAILS');
  });
});
