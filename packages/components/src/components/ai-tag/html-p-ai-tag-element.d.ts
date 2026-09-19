/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPAiTagElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-ai-tag hosts.
 */
export {};

declare global {
  interface HTMLPAiTagElement extends HTMLElement {
    locale?: string;
    variant?: string;
  }
  interface HTMLElementTagNameMap {
    'p-ai-tag': HTMLPAiTagElement;
  }
}
