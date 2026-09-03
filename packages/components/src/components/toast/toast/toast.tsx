/**
 * Stencil no longer owns p-toast. The playground tag is the Mitosis Lit
 * custom element from mitosis/toast/Toast.lite.tsx.
 * This file stays so generateConstructorMap can still import class Toast.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export class Toast {
  host!: HTMLElement;
  render(): void {}
  addMessage(_message: { text: string; state?: string }): void {}
}

declare global {
  interface HTMLPToastElement extends HTMLStencilElement {
    addMessage(message: { text: string; state?: string }): void;
  }
  interface HTMLElementTagNameMap {
    'p-toast': HTMLPToastElement;
  }
}
