/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPDrilldownElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-drilldown hosts.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export {};

declare global {
  interface HTMLPDrilldownElement extends HTMLStencilElement {
    open: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-drilldown': HTMLPDrilldownElement;
  }
}
