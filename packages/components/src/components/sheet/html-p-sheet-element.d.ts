/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPSheetElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-sheet hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPSheetElement extends HTMLStencilElement {
    open: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-sheet': HTMLPSheetElement;
  }
}
