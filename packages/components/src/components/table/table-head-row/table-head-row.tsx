/**
 * Stencil no longer owns p-table-head-row. The playground tag is the Mitosis Lit
 * custom element from mitosis/table-head-row/TableHeadRow.lite.tsx.
 * This file stays so generateConstructorMap can still import class TableHeadRow.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export class TableHeadRow {
  host!: HTMLElement;
  render(): void {}
}

declare global {
  interface HTMLPTableHeadRowElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-head-row': HTMLPTableHeadRowElement;
  }
}
