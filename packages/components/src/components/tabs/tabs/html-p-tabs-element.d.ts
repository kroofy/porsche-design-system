/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTabsElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-tabs hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPTabsElement extends HTMLStencilElement {
    size?: unknown;
    activeTabIndex?: number;
    background?: string;
    compact?: boolean;
    weight?: string;
    aria?: unknown;
  }
  interface HTMLElementTagNameMap {
    'p-tabs': HTMLPTabsElement;
  }
}
