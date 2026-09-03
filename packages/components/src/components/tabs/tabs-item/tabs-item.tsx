/**
 * Stencil no longer owns p-tabs-item. The playground tag is the Mitosis Lit
 * custom element from mitosis/tabs-item/TabsItem.lite.tsx.
 * This file stays so generateConstructorMap can still import class TabsItem.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export class TabsItem {
  host!: HTMLElement;
  label?: string;
  render(): void {}
}

declare global {
  interface HTMLPTabsItemElement extends HTMLStencilElement {
    label?: string;
  }
  interface HTMLElementTagNameMap {
    'p-tabs-item': HTMLPTabsItemElement;
  }
}
