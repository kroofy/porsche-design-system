import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { POptgroup } from '../../../../src/elements/POptgroup';
import { PSelect } from '../../../../src/elements/PSelect';

describe('POptgroup', () => {
  it('returns an optgroup with nothing wrapping it', () => {
    const { container } = render(
      <PSelect>
        <POptgroup label="Group">
          <option value="a">A</option>
        </POptgroup>
      </PSelect>
    );

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('SELECT');
    expect(container.querySelector('p-optgroup')).toBeNull();
    expect(container.querySelector('optgroup')?.label).toBe('Group');
    expect(container.querySelector('optgroup')?.className).toBe('p-optgroup');
    expect(container.querySelector('option')?.textContent).toBe('A');
  });

  it('uses the native disabled attribute', () => {
    const { container } = render(
      <POptgroup label="Group" disabled>
        <option value="a">A</option>
      </POptgroup>
    );
    const group = container.firstElementChild as HTMLOptGroupElement;

    expect(group.disabled).toBe(true);
    expect(group.tagName).toBe('OPTGROUP');
  });

  it('forwards a ref to the optgroup', () => {
    const ref = createRef<HTMLOptGroupElement>();
    render(<POptgroup ref={ref} label="Group" />);
    expect(ref.current).toBeInstanceOf(HTMLOptGroupElement);
  });
});
