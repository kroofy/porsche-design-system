import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PTable, PTableBody, PTableCell, PTableHead, PTableHeadCell, PTableRow } from '../../../../src/elements/PTable';

describe('PTable', () => {
  it('returns a table with native parts and nothing wrapping them', () => {
    const { container } = render(
      <PTable>
        <PTableHead>
          <PTableRow>
            <PTableHeadCell>Col</PTableHeadCell>
          </PTableRow>
        </PTableHead>
        <PTableBody>
          <PTableRow>
            <PTableCell>Cell</PTableCell>
          </PTableRow>
        </PTableBody>
      </PTable>
    );

    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('TABLE');
    expect(container.querySelector('p-table')).toBeNull();
    expect(container.innerHTML).toBe(
      '<table class="p-table"><thead class="p-table-head"><tr class="p-table-row"><th scope="col" class="p-table-head-cell">Col</th></tr></thead><tbody class="p-table-body"><tr class="p-table-row"><td class="p-table-cell">Cell</td></tr></tbody></table>'
    );
  });

  it('encodes non-default appearance on the table and cells', () => {
    const { container } = render(
      <PTable compact layout="fixed">
        <PTableHead>
          <PTableRow>
            <PTableHeadCell hideLabel multiline>
              Col
            </PTableHeadCell>
          </PTableRow>
        </PTableHead>
        <PTableBody>
          <PTableRow>
            <PTableCell multiline>Cell</PTableCell>
          </PTableRow>
        </PTableBody>
      </PTable>
    );
    const table = container.firstElementChild as HTMLTableElement;

    expect(table.getAttribute('data-p-compact')).toBe('true');
    expect(table.getAttribute('data-p-layout')).toBe('fixed');
    expect(table.querySelector('th')?.getAttribute('data-p-hide-label')).toBe('true');
    expect(table.querySelector('th')?.getAttribute('data-p-multiline')).toBe('true');
    expect(table.querySelector('td')?.getAttribute('data-p-multiline')).toBe('true');
  });

  it('forwards a ref to the table', () => {
    const ref = createRef<HTMLTableElement>();
    render(<PTable ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });
});
