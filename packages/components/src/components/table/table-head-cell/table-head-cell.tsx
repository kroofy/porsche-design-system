/**
 * Stencil no longer owns p-table-head-cell. The playground tag is the Mitosis Lit
 * custom element from mitosis/table-head-cell/TableHeadCell.lite.tsx.
 * This file stays so generateConstructorMap can still import class TableHeadCell.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export class TableHeadCell {
  host!: HTMLElement;
  render(): void {}
}

declare global {
  interface HTMLPTableHeadCellElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-head-cell': HTMLPTableHeadCellElement;
  }
}
