/**
 * Stencil no longer owns p-spinner. The playground tag is the Mitosis Lit
 * custom element from mitosis/spinner/Spinner.lite.tsx.
 * This file stays so generateConstructorMap can still import class Spinner.
 */
export class Spinner {
  host!: HTMLElement;
  color?: string = 'primary';
  size?: unknown = 'sm';
  aria?: unknown;
  render(): void {}
}
