/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPModalElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-modal hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPModalElement extends HTMLStencilElement {
    open: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-modal': HTMLPModalElement;
  }
}
