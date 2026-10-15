/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPPaginationElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-pagination hosts.
 */
export {};

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
