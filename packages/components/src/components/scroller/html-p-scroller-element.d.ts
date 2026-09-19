/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPScrollerElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-scroller hosts.
 */
export {};

declare global {
  interface HTMLPScrollerElement extends HTMLElement {
    scrollbar?: boolean;
    compact?: boolean;
    sticky?: boolean;
    aria?: unknown;
    alignScrollIndicator?: string;
    scrollToPosition?: unknown;
  }
  interface HTMLElementTagNameMap {
    'p-scroller': HTMLPScrollerElement;
  }
}
