/**
 * Stencil no longer owns p-table. The playground tag is the Mitosis Lit
 * custom element from mitosis/table/Table.lite.tsx.
 * This file stays so generateConstructorMap can still import class Table.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';
import type { TableLayout, TableUpdateEventDetail } from './table-utils';

export class Table {
  host!: HTMLElement;
  caption?: string;
  compact?: boolean = false;
  layout?: TableLayout = 'auto';
  sticky?: boolean = false;
  update?: { emit: (detail: TableUpdateEventDetail) => void };
  render(): void {}
}

declare global {
  interface HTMLPTableElement extends HTMLStencilElement {
    caption?: string;
    compact?: boolean;
    layout?: TableLayout;
    sticky?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-table': HTMLPTableElement;
  }
}
