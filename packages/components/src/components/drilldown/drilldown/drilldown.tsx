/**
 * Stencil no longer owns p-drilldown. The playground tag is the Mitosis Lit
 * custom element from mitosis/drilldown/Drilldown.lite.tsx.
 * This file stays so generateConstructorMap can still import class Drilldown.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export class Drilldown {
  host!: HTMLElement;
  open: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPDrilldownElement extends HTMLStencilElement {
    open: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-drilldown': HTMLPDrilldownElement;
  }
}
