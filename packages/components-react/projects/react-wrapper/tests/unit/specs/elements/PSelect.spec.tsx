import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PLabel } from '../../../../src/elements/PLabel';
import { PSelect } from '../../../../src/elements/PSelect';

describe('PSelect', () => {
  it('returns a select with nothing wrapping it', () => {
    const { container } = render(
      <PSelect id="choice">
        <option value="a">A</option>
      </PSelect>
    );

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('SELECT');
    expect(container.querySelector('p-select')).toBeNull();
    expect(container.querySelector('option')?.textContent).toBe('A');
  });

  it('uses native disabled and loading state', () => {
    const { container } = render(<PSelect loading />);
    const select = container.firstElementChild as HTMLSelectElement;

    expect(select.disabled).toBe(true);
    expect(select.getAttribute('aria-busy')).toBe('true');
    expect(select.getAttribute('data-p-loading')).toBe('true');
  });
});

describe('PLabel + PSelect', () => {
  it('keeps the label a sibling with for', () => {
    const { container } = render(
      <>
        <PLabel htmlFor="choice">Choice</PLabel>
        <PSelect id="choice">
          <option value="a">A</option>
        </PSelect>
      </>
    );

    expect(container.querySelector('label')?.htmlFor).toBe('choice');
    expect(container.querySelector('select')?.parentElement).toBe(container);
  });
});
