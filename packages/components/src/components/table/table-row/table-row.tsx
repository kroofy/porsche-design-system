/**
 * Stencil no longer owns p-table-row. The playground tag is the Mitosis Lit
 * custom element from mitosis/table-row/TableRow.lite.tsx.
 * This file stays so generateConstructorMap can still import class TableRow.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export class TableRow {
  host!: HTMLElement;
  render(): void {}
}

declare global {
  interface HTMLPTableRowElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-row': HTMLPTableRowElement;
  }
}
