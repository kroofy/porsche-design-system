/**
 * Stencil no longer owns p-wordmark. The playground tag is the Mitosis Lit
 * custom element from mitosis/wordmark/Wordmark.lite.tsx.
 * This file stays so generateConstructorMap can still import class Wordmark.
 */
export class Wordmark {
  host!: HTMLElement;
  size?: string = 'small';
  href?: string;
  target?: string = '_self';
  aria?: unknown;
  render(): void {}
}
