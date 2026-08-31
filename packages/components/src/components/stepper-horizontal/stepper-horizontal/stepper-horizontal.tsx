/**
 * Stencil no longer owns p-stepper-horizontal. The playground tag is the Mitosis Lit
 * custom element from mitosis/stepper-horizontal/StepperHorizontal.lite.tsx.
 * This file stays so generateConstructorMap can still import class StepperHorizontal.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export class StepperHorizontal {
  host!: HTMLElement;
  size?: unknown = 'small';
  render(): void {}
}

declare global {
  interface HTMLPStepperHorizontalElement extends HTMLStencilElement {
    size?: unknown;
  }
  interface HTMLElementTagNameMap {
    'p-stepper-horizontal': HTMLPStepperHorizontalElement;
  }
}
