/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPStepperHorizontalElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-stepper-horizontal hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPStepperHorizontalElement extends HTMLStencilElement {
    size?: unknown;
  }
  interface HTMLElementTagNameMap {
    'p-stepper-horizontal': HTMLPStepperHorizontalElement;
  }
}
