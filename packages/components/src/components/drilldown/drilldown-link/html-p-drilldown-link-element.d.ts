/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPDrilldownLinkElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-drilldown-link hosts.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export {};

declare global {
  interface HTMLPDrilldownLinkElement extends HTMLStencilElement {
    href?: string;
    active?: boolean;
    target?: string;
    download?: string;
    rel?: string;
  }
  interface HTMLElementTagNameMap {
    'p-drilldown-link': HTMLPDrilldownLinkElement;
  }
}
