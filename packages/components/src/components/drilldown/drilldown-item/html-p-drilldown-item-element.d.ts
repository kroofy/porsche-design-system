/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPDrilldownItemElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-drilldown-item hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPDrilldownItemElement extends HTMLStencilElement {
    identifier: string;
    label?: string;
    primary?: boolean;
    secondary?: boolean;
    cascade?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-drilldown-item': HTMLPDrilldownItemElement;
  }
}
