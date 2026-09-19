/**
 * Stencil no longer owns p-flag. The playground tag is the Mitosis Lit
 * custom element from mitosis/flag/Flag.lite.tsx.
 * This file stays so generateConstructorMap can still import class Flag.
 */
export class Flag {
  host!: HTMLElement;
  name?: string = 'de';
  size?: unknown = 'sm';
  aria?: unknown;
  render(): void {}
}
