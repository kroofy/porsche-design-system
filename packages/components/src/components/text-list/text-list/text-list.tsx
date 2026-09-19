/**
 * Stencil no longer owns p-text-list. The playground tag is the Mitosis Lit
 * custom element from mitosis/text-list/TextList.lite.tsx.
 * This file stays so generateConstructorMap can still import class TextList.
 * Global HTMLPTextListElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class TextList {
  host!: HTMLElement;
  type?: string = 'unordered';
  render(): void {}
}

declare global {
  interface HTMLPTextListElement extends HTMLElement {
    type?: string;
  }
  interface HTMLElementTagNameMap {
    'p-text-list': HTMLPTextListElement;
  }
}
