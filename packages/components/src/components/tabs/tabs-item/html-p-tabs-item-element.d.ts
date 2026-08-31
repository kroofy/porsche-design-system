/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTabsItemElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-tabs-item hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPTabsItemElement extends HTMLStencilElement {
    label?: string;
  }
  interface HTMLElementTagNameMap {
    'p-tabs-item': HTMLPTabsItemElement;
  }
}
