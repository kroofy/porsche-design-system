/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTableRowElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-table-row hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPTableRowElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-row': HTMLPTableRowElement;
  }
}
