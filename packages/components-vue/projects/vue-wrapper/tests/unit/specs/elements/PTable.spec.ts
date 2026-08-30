import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PTable, PTableBody, PTableCell, PTableHead, PTableHeadCell, PTableRow } from '../../../../src/elements/PTable';

describe('PTable', () => {
  it('returns a table with nothing wrapping it', () => {
    const { container } = render(PTable, {
      slots: { default: '<thead class="p-table-head"></thead>' },
    });
    const table = container.firstElementChild as HTMLTableElement;

    expect(container.childElementCount).toBe(1);
    expect(table.tagName).toBe('TABLE');
    expect(table.className).toBe('p-table');
    expect(container.querySelector('p-table')).toBeNull();
  });

  it('encodes compact and fixed layout', () => {
    const { container } = render(PTable, { props: { compact: true, layout: 'fixed' } });
    const table = container.firstElementChild as HTMLTableElement;

    expect(table.getAttribute('data-p-compact')).toBe('true');
    expect(table.getAttribute('data-p-layout')).toBe('fixed');
  });
});

describe('PTableHeadCell', () => {
  it('returns a th with scope col', () => {
    const { container } = render(PTableHeadCell, {
      props: { hideLabel: true, multiline: true },
      slots: { default: 'Col' },
    });
    const th = container.firstElementChild as HTMLTableCellElement;

    expect(th.tagName).toBe('TH');
    expect(th.getAttribute('scope')).toBe('col');
    expect(th.getAttribute('data-p-hide-label')).toBe('true');
    expect(th.getAttribute('data-p-multiline')).toBe('true');
    expect(container.querySelector('p-table-head-cell')).toBeNull();
  });
});

describe('PTableRow', () => {
  it('returns a tr with nothing wrapping it', () => {
    const { container } = render(PTableRow);
    expect((container.firstElementChild as HTMLTableRowElement).tagName).toBe('TR');
    expect(container.querySelector('p-table-row')).toBeNull();
  });
});

describe('PTableCell', () => {
  it('returns a td', () => {
    const { container } = render(PTableCell, { props: { multiline: true }, slots: { default: 'Cell' } });
    const td = container.firstElementChild as HTMLTableCellElement;
    expect(td.tagName).toBe('TD');
    expect(td.getAttribute('data-p-multiline')).toBe('true');
  });
});

describe('PTableHead and PTableBody', () => {
  it('returns thead and tbody', () => {
    expect(render(PTableHead).container.firstElementChild?.tagName).toBe('THEAD');
    expect(render(PTableBody).container.firstElementChild?.tagName).toBe('TBODY');
  });
});
