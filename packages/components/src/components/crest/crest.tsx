/**
 * Stencil no longer owns p-crest. The playground tag is the Mitosis Lit
 * custom element from mitosis/crest/Crest.lite.tsx.
 * This file stays so generateConstructorMap can still import class Crest.
 */
export class Crest {
  host!: HTMLElement;
  href?: string;
  target?: string = '_self';
  aria?: unknown;
  render(): void {}
}
