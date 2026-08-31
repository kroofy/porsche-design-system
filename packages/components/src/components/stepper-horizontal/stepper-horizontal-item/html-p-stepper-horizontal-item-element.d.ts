/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPStepperHorizontalItemElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-stepper-horizontal-item hosts.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export {};

declare global {
  interface HTMLPStepperHorizontalItemElement extends HTMLStencilElement {
    state?: string;
    disabled?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-stepper-horizontal-item': HTMLPStepperHorizontalItemElement;
  }
}
