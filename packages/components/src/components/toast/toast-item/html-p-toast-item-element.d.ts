/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPToastItemElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-toast-item hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPToastItemElement extends HTMLStencilElement {
    text?: string;
    state?: string;
  }
  interface HTMLElementTagNameMap {
    'p-toast-item': HTMLPToastItemElement;
  }
}
