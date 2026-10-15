/**
 * Stencil no longer owns p-toast-item. The playground tag is the Mitosis Lit
 * custom element from mitosis/toast-item/ToastItem.lite.tsx.
 * This file stays so generateConstructorMap can still import class ToastItem.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export class ToastItem {
  host!: HTMLElement;
  text?: string;
  state?: string;
  render(): void {}
}

declare global {
  interface HTMLPToastItemElement extends HTMLStencilElement {
    text?: string;
    state?: string;
  }
  interface HTMLElementTagNameMap {
    'p-toast-item': HTMLPToastItemElement;
  }
}
