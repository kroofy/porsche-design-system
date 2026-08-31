/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTableHeadElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-table-head hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPTableHeadElement extends HTMLStencilElement {}
  interface HTMLElementTagNameMap {
    'p-table-head': HTMLPTableHeadElement;
  }
}
