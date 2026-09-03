/**
 * Stencil no longer owns p-flyout. The playground tag is the Mitosis Lit
 * custom element from mitosis/flyout/Flyout.lite.tsx.
 * This file stays so generateConstructorMap can still import class Flyout.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';

export class Flyout {
  host!: HTMLElement;
  open: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPFlyoutElement extends HTMLStencilElement {
    open: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-flyout': HTMLPFlyoutElement;
  }
}
