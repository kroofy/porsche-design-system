/**
 * Stencil no longer owns p-table-body. The playground tag is the Mitosis Lit
 * custom element from mitosis/table-body/TableBody.lite.tsx.
 * This file stays so generateConstructorMap can still import class TableBody.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export class TableBody {
  host!: HTMLElement;
  render(): void {}
}

declare global {
  interface HTMLPTableBodyElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-body': HTMLPTableBodyElement;
  }
}
