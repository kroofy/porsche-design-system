/**
 * Stencil no longer owns p-accordion. The playground tag is the Mitosis Lit
 * custom element from mitosis/accordion/Accordion.lite.tsx.
 * This file stays so generateConstructorMap can still import class Accordion.
 * Global HTMLPAccordionElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class Accordion {
  host!: HTMLElement;
  open?: boolean;
  alignMarker?: string = 'end';
  background?: string = 'none';
  compact?: boolean;
  indent?: unknown = false;
  sticky?: boolean;
  size?: unknown = 'small';
  heading?: string;
  headingTag?: string = 'h2';
  render(): void {}
}

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
