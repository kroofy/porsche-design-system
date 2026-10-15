/**
 * Stencil no longer owns p-banner. The playground tag is the Mitosis Lit
 * custom element from mitosis/banner/Banner.lite.tsx.
 * This file stays so generateConstructorMap can still import class Banner.
 * Global HTMLPBannerElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class Banner {
  host!: HTMLElement;
  open: boolean = false;
  heading?: string = '';
  headingTag?: string = 'h5';
  description?: string = '';
  position?: unknown = { base: 'bottom', s: 'top' };
  state?: string = 'info';
  dismissButton?: boolean = true;
  render(): void {}
}

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
