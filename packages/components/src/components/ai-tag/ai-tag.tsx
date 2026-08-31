/**
 * Stencil no longer owns p-ai-tag. The playground tag is the Mitosis Lit
 * custom element from mitosis/ai-tag/AiTag.lite.tsx.
 * This file stays so generateConstructorMap can still import class AiTag.
 * Global HTMLPAiTagElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class AiTag {
  host!: HTMLElement;
  locale?: string = 'en-US';
  variant?: string = 'generated';
  render(): void {}
}

declare global {
  interface HTMLPAiTagElement extends HTMLElement {
    locale?: string;
    variant?: string;
  }
  interface HTMLElementTagNameMap {
    'p-ai-tag': HTMLPAiTagElement;
  }
}
