import { forwardRef, type HTMLAttributes, type ReactNode, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import {
  type TableAppearanceProps,
  type TableCellAppearanceProps,
  type TableHeadCellAppearanceProps,
  tableAppearance,
  tableBodyAppearance,
  tableCellAppearance,
  tableHeadAppearance,
  tableHeadCellAppearance,
  tableRowAppearance,
} from '../../../../../components/src/elements/table/table.appearance';

const joinClass = (className: string, extra?: string) => [className, extra].filter(Boolean).join(' ');

export type PTableProps = TableAppearanceProps &
  Omit<HTMLAttributes<HTMLTableElement>, keyof TableAppearanceProps> & {
    children?: ReactNode;
  };

export const PTable = forwardRef<HTMLTableElement, PTableProps>(function PTable(
  { compact = false, layout, className, children, ...rest },
  ref
) {
  const appearance = tableAppearance({ compact, layout });
  return (
    <table {...rest} {...appearance.attrs} ref={ref} className={joinClass(appearance.className, className)}>
      {children}
    </table>
  );
});

export type PTableHeadProps = HTMLAttributes<HTMLTableSectionElement> & { children?: ReactNode };

export const PTableHead = forwardRef<HTMLTableSectionElement, PTableHeadProps>(function PTableHead(
  { className, children, ...rest },
  ref
) {
  const appearance = tableHeadAppearance();
  return (
    <thead {...rest} {...appearance.attrs} ref={ref} className={joinClass(appearance.className, className)}>
      {children}
    </thead>
  );
});

export type PTableBodyProps = HTMLAttributes<HTMLTableSectionElement> & { children?: ReactNode };

export const PTableBody = forwardRef<HTMLTableSectionElement, PTableBodyProps>(function PTableBody(
  { className, children, ...rest },
  ref
) {
  const appearance = tableBodyAppearance();
  return (
    <tbody {...rest} {...appearance.attrs} ref={ref} className={joinClass(appearance.className, className)}>
      {children}
    </tbody>
  );
});

export type PTableRowProps = HTMLAttributes<HTMLTableRowElement> & { children?: ReactNode };

export const PTableRow = forwardRef<HTMLTableRowElement, PTableRowProps>(function PTableRow(
  { className, children, ...rest },
  ref
) {
  const appearance = tableRowAppearance();
  return (
    <tr {...rest} {...appearance.attrs} ref={ref} className={joinClass(appearance.className, className)}>
      {children}
    </tr>
  );
});

export type PTableHeadCellProps = TableHeadCellAppearanceProps &
  Omit<ThHTMLAttributes<HTMLTableCellElement>, keyof TableHeadCellAppearanceProps> & {
    children?: ReactNode;
  };

export const PTableHeadCell = forwardRef<HTMLTableCellElement, PTableHeadCellProps>(function PTableHeadCell(
  { hideLabel = false, multiline = false, className, children, scope = 'col', ...rest },
  ref
) {
  const appearance = tableHeadCellAppearance({ hideLabel, multiline });
  return (
    <th {...rest} {...appearance.attrs} ref={ref} scope={scope} className={joinClass(appearance.className, className)}>
      {children}
    </th>
  );
});

export type PTableCellProps = TableCellAppearanceProps &
  Omit<TdHTMLAttributes<HTMLTableCellElement>, keyof TableCellAppearanceProps> & {
    children?: ReactNode;
  };

export const PTableCell = forwardRef<HTMLTableCellElement, PTableCellProps>(function PTableCell(
  { multiline = false, className, children, ...rest },
  ref
) {
  const appearance = tableCellAppearance({ multiline });
  return (
    <td {...rest} {...appearance.attrs} ref={ref} className={joinClass(appearance.className, className)}>
      {children}
    </td>
  );
});
