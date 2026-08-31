/**
 * Stencil no longer owns p-table-cell. The playground tag is the Mitosis Lit
 * custom element from mitosis/table-cell/TableCell.lite.tsx.
 * This file stays so generateConstructorMap can still import class TableCell.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export class TableCell {
  host!: HTMLElement;
  render(): void {}
}

declare global {
  interface HTMLPTableCellElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-cell': HTMLPTableCellElement;
  }
}
