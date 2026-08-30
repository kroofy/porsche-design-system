import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '../../../../projects/angular-wrapper/src/elements/PTable';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PTable', () => {
  it('returns a table with native parts and nothing wrapping them', () => {
    @Component({
      standalone: true,
      imports: [PTable, PTableHead, PTableBody, PTableRow, PTableHeadCell, PTableCell],
      template: `
        <table pTable>
          <thead pTableHead>
            <tr pTableRow>
              <th pTableHeadCell>Col</th>
            </tr>
          </thead>
          <tbody pTableBody>
            <tr pTableRow>
              <td pTableCell>Cell</td>
            </tr>
          </tbody>
        </table>
      `,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const table = host.firstElementChild as HTMLTableElement;

    expect(host.childElementCount).toBe(1);
    expect(table.tagName).toBe('TABLE');
    expect(host.querySelector('p-table')).toBeNull();
    expect(table.classList.contains('p-table')).toBe(true);
    expect(table.querySelector('thead')?.classList.contains('p-table-head')).toBe(true);
    expect(table.querySelector('th')?.classList.contains('p-table-head-cell')).toBe(true);
    expect(table.querySelector('td')?.classList.contains('p-table-cell')).toBe(true);
  });

  it('encodes non-default appearance', () => {
    @Component({
      standalone: true,
      imports: [PTable, PTableHead, PTableRow, PTableHeadCell, PTableBody, PTableCell],
      template: `
        <table pTable compact layout="fixed">
          <thead pTableHead>
            <tr pTableRow>
              <th pTableHeadCell hideLabel multiline>Col</th>
            </tr>
          </thead>
          <tbody pTableBody>
            <tr pTableRow>
              <td pTableCell multiline>Cell</td>
            </tr>
          </tbody>
        </table>
      `,
    })
    class Host {}

    const fixture = render(Host);
    const table = fixture.nativeElement.querySelector('table') as HTMLTableElement;

    expect(table.getAttribute('data-p-compact')).toBe('true');
    expect(table.getAttribute('data-p-layout')).toBe('fixed');
    expect(table.querySelector('th')?.getAttribute('data-p-hide-label')).toBe('true');
    expect(table.querySelector('td')?.getAttribute('data-p-multiline')).toBe('true');
  });
});
