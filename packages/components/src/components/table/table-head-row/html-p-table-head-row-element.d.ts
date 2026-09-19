/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTableHeadRowElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-table-head-row hosts.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export {};

declare global {
  interface HTMLPTableHeadRowElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-head-row': HTMLPTableHeadRowElement;
  }
}
