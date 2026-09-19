/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPFlyoutElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-flyout hosts.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';

export {};

declare global {
  interface HTMLPFlyoutElement extends HTMLStencilElement {
    open: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-flyout': HTMLPFlyoutElement;
  }
}
