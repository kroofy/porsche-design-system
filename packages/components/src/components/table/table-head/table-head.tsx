/**
 * Stencil no longer owns p-table-head. The playground tag is the Mitosis Lit
 * custom element from mitosis/table-head/TableHead.lite.tsx.
 * This file stays so generateConstructorMap can still import class TableHead.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export class TableHead {
  host!: HTMLElement;
  render(): void {}
}

declare global {
  interface HTMLPTableHeadElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-head': HTMLPTableHeadElement;
  }
}
