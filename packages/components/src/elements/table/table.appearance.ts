import type { NativeAppearance } from '../appearance';

export const TABLE_ROOT_CLASS = 'p-table' as const;
export const TABLE_HEAD_CLASS = 'p-table-head' as const;
export const TABLE_BODY_CLASS = 'p-table-body' as const;
export const TABLE_ROW_CLASS = 'p-table-row' as const;
export const TABLE_HEAD_CELL_CLASS = 'p-table-head-cell' as const;
export const TABLE_CELL_CLASS = 'p-table-cell' as const;

export const TABLE_LAYOUTS = ['auto', 'fixed'] as const;
export type TableLayout = (typeof TABLE_LAYOUTS)[number];

export type TableAppearanceProps = {
  compact?: boolean;
  layout?: TableLayout;
};

export type TableHeadCellAppearanceProps = {
  hideLabel?: boolean;
  multiline?: boolean;
};

export type TableCellAppearanceProps = {
  multiline?: boolean;
};

const DEFAULT_LAYOUT: TableLayout = 'auto';

export const tableAppearance = (props: TableAppearanceProps = {}): NativeAppearance => {
  const { compact = false, layout = DEFAULT_LAYOUT } = props;
  return {
    className: TABLE_ROOT_CLASS,
    attrs: {
      ...(compact ? { 'data-p-compact': 'true' } : {}),
      ...(layout !== DEFAULT_LAYOUT ? { 'data-p-layout': layout } : {}),
    },
  };
};

export const tableHeadAppearance = (): NativeAppearance => ({ className: TABLE_HEAD_CLASS, attrs: {} });

export const tableBodyAppearance = (): NativeAppearance => ({ className: TABLE_BODY_CLASS, attrs: {} });

export const tableRowAppearance = (): NativeAppearance => ({ className: TABLE_ROW_CLASS, attrs: {} });

export const tableHeadCellAppearance = (props: TableHeadCellAppearanceProps = {}): NativeAppearance => {
  const { hideLabel = false, multiline = false } = props;
  return {
    className: TABLE_HEAD_CELL_CLASS,
    attrs: {
      ...(hideLabel ? { 'data-p-hide-label': 'true' } : {}),
      ...(multiline ? { 'data-p-multiline': 'true' } : {}),
    },
  };
};

export const tableCellAppearance = (props: TableCellAppearanceProps = {}): NativeAppearance => {
  const { multiline = false } = props;
  return {
    className: TABLE_CELL_CLASS,
    attrs: {
      ...(multiline ? { 'data-p-multiline': 'true' } : {}),
    },
  };
};
