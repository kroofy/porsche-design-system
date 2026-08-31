/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPToastElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-toast hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPToastElement extends HTMLStencilElement {
    addMessage(message: { text: string; state?: string }): void;
  }
  interface HTMLElementTagNameMap {
    'p-toast': HTMLPToastElement;
  }
}
