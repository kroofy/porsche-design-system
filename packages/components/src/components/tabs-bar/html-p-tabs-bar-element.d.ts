/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTabsBarElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-tabs-bar hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPTabsBarElement extends HTMLStencilElement {
    activeTabIndex?: number;
    background?: string;
    size?: unknown;
    compact?: boolean;
    weight?: string;
    aria?: unknown;
  }
  interface HTMLElementTagNameMap {
    'p-tabs-bar': HTMLPTabsBarElement;
  }
}
