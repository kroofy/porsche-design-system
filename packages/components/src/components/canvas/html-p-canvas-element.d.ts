/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPCanvasElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-canvas hosts.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';

export {};

declare global {
  interface HTMLPCanvasElement extends HTMLStencilElement {
    sidebarStartOpen?: boolean;
    sidebarEndOpen?: boolean;
    background?: string;
  }
  interface HTMLElementTagNameMap {
    'p-canvas': HTMLPCanvasElement;
  }
}
