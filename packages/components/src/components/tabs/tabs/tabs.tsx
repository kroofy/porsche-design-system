/**
 * Stencil no longer owns p-tabs. The playground tag is the Mitosis Lit
 * custom element from mitosis/tabs/Tabs.lite.tsx.
 * This file stays so generateConstructorMap can still import class Tabs.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export class Tabs {
  host!: HTMLElement;
  size?: unknown = 'small';
  activeTabIndex?: number = 0;
  background?: string = 'none';
  compact?: boolean;
  weight?: string = 'regular';
  aria?: unknown;
  render(): void {}
}

declare global {
  interface HTMLPTabsElement extends HTMLStencilElement {
    size?: unknown;
    activeTabIndex?: number;
    background?: string;
    compact?: boolean;
    weight?: string;
    aria?: unknown;
  }
  interface HTMLElementTagNameMap {
    'p-tabs': HTMLPTabsElement;
  }
}
