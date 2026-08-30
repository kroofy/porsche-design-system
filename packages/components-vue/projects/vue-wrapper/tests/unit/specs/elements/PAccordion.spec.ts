import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PAccordion } from '../../../../src/elements/PAccordion';

describe('PAccordion', () => {
  it('returns a details with nothing wrapping it', () => {
    const { container } = render(PAccordion, {
      slots: { default: '<summary>Some summary</summary><div>Some details</div>' },
    });
    const details = container.firstElementChild as HTMLDetailsElement;

    expect(container.childElementCount).toBe(1);
    expect(details.tagName).toBe('DETAILS');
    expect(details.className).toBe('p-accordion');
    expect(container.querySelector('p-accordion')).toBeNull();
  });

  it('puts open and aria on the details', () => {
    const { container } = render(PAccordion, { attrs: { open: true, 'aria-label': 'Some accordion' } });
    const details = container.firstElementChild as HTMLDetailsElement;

    expect(details.open).toBe(true);
    expect(details.getAttribute('aria-label')).toBe('Some accordion');
  });

  it('encodes non-default appearance on the details', () => {
    const { container } = render(PAccordion, {
      props: {
        alignMarker: 'start',
        background: 'surface',
        compact: true,
        indent: true,
        sticky: true,
        size: 'medium',
      },
    });
    const details = container.firstElementChild as HTMLDetailsElement;

    expect(details.getAttribute('data-p-align-marker')).toBe('start');
    expect(details.getAttribute('data-p-background')).toBe('surface');
    expect(details.getAttribute('data-p-compact')).toBe('true');
    expect(details.getAttribute('data-p-indent')).toBe('true');
    expect(details.getAttribute('data-p-sticky')).toBe('true');
    expect(details.getAttribute('data-p-size')).toBe('medium');
  });
});
