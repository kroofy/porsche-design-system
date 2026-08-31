import { throwIfParentIsNotOfKind } from '../../../utils';

/**
 * Stencil no longer owns p-text-list-item. The playground tag is the Mitosis Lit
 * custom element from mitosis/text-list-item/TextListItem.lite.tsx.
 * This file stays so generateConstructorMap can still import class TextListItem.
 * Global HTMLPTextListItemElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class TextListItem {
  host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-text-list');
  }

  render(): void {}
}

declare global {
  interface HTMLPTextListItemElement extends HTMLElement {}
  interface HTMLElementTagNameMap {
    'p-text-list-item': HTMLPTextListItemElement;
  }
}
