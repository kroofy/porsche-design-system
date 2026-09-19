/**
 * Stencil no longer owns p-pagination. The playground tag is the Mitosis Lit
 * custom element from mitosis/pagination/Pagination.lite.tsx.
 * This file stays so generateConstructorMap can still import class Pagination.
 * Global HTMLPPaginationElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class Pagination {
  host!: HTMLElement;
  totalItemsCount: number = 1;
  itemsPerPage: number = 1;
  activePage?: number = 1;
  showLastPage?: boolean = true;
  intl?: unknown;
  render(): void {}
}

declare global {
  interface HTMLPPaginationElement extends HTMLElement {
    totalItemsCount?: number;
    itemsPerPage?: number;
    activePage?: number;
    showLastPage?: boolean;
    intl?: unknown;
  }
  interface HTMLElementTagNameMap {
    'p-pagination': HTMLPPaginationElement;
  }
}
