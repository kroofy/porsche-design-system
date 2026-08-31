/**
 * Stencil no longer owns p-modal. The playground tag is the Mitosis Lit
 * custom element from mitosis/modal/Modal.lite.tsx.
 * This file stays so generateConstructorMap can still import class Modal.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export class Modal {
  host!: HTMLElement;
  open: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPModalElement extends HTMLStencilElement {
    open: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-modal': HTMLPModalElement;
  }
}
