/**
 * Stencil no longer owns p-stepper-horizontal-item. The playground tag is the Mitosis Lit
 * custom element from mitosis/stepper-horizontal-item/StepperHorizontalItem.lite.tsx.
 * This file stays so generateConstructorMap can still import class StepperHorizontalItem.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export class StepperHorizontalItem {
  host!: HTMLElement;
  state?: string;
  disabled?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPStepperHorizontalItemElement extends HTMLStencilElement {
    state?: string;
    disabled?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-stepper-horizontal-item': HTMLPStepperHorizontalItemElement;
  }
}
