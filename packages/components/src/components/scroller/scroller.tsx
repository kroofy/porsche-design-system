/**
 * Stencil no longer owns p-scroller. The playground tag is the Mitosis Lit
 * custom element from mitosis/scroller/Scroller.lite.tsx.
 * This file stays so generateConstructorMap can still import class Scroller.
 * Global HTMLPScrollerElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class Scroller {
  host!: HTMLElement;
  scrollbar?: boolean = false;
  compact?: boolean;
  sticky?: boolean = false;
  aria?: unknown;
  alignScrollIndicator?: string = 'center';
  scrollToPosition?: unknown;
  render(): void {}
}

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
