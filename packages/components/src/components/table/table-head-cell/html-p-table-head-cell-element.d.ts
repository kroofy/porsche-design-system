/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTableHeadCellElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-table-head-cell hosts.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export {};

declare global {
  interface HTMLPTableHeadCellElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-head-cell': HTMLPTableHeadCellElement;
  }
}
