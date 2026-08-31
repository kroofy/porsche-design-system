/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTableCellElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-table-cell hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPTableCellElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-cell': HTMLPTableCellElement;
  }
}
