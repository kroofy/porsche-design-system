/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPAccordionElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-accordion hosts.
 */
export {};

declare global {
  interface HTMLPAccordionElement extends HTMLElement {
    open?: boolean;
    alignMarker?: string;
    background?: string;
    compact?: boolean;
    indent?: unknown;
    sticky?: boolean;
    size?: unknown;
    heading?: string;
    headingTag?: string;
  }
  interface HTMLElementTagNameMap {
    'p-accordion': HTMLPAccordionElement;
  }
}
