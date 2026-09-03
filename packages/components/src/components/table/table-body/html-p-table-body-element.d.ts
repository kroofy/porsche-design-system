/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTableBodyElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-table-body hosts.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export {};

declare global {
  interface HTMLPTableBodyElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-body': HTMLPTableBodyElement;
  }
}
