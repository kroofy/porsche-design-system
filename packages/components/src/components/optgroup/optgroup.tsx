/**
 * Stencil no longer owns p-optgroup. The playground tag is the Mitosis Lit
 * custom element from mitosis/optgroup/Optgroup.lite.tsx.
 * This file stays so generateConstructorMap can still import class Optgroup.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';

export class Optgroup {
  host!: HTMLElement;
  label?: string;
  disabled?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPOptgroupElement extends HTMLStencilElement {
    label?: string;
    disabled?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-optgroup': HTMLPOptgroupElement;
  }
}
