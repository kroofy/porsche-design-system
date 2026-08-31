/**
 * Stencil no longer owns p-sheet. The playground tag is the Mitosis Lit
 * custom element from mitosis/sheet/Sheet.lite.tsx.
 * This file stays so generateConstructorMap can still import class Sheet.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export class Sheet {
  host!: HTMLElement;
  open: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPSheetElement extends HTMLStencilElement {
    open: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-sheet': HTMLPSheetElement;
  }
}
