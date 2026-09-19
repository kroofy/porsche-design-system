/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPBannerElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-banner hosts.
 */
export {};

declare global {
  interface HTMLPBannerElement extends HTMLElement {
    open?: boolean;
    heading?: string;
    headingTag?: string;
    description?: string;
    position?: unknown;
    state?: string;
    dismissButton?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-banner': HTMLPBannerElement;
  }
}
