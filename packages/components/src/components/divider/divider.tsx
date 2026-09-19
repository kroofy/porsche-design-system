/**
 * Stencil no longer owns p-divider. The playground tag is the Mitosis Lit
 * custom element from mitosis/divider/Divider.lite.tsx.
 * This file stays so generateConstructorMap can still import class Divider.
 */
export class Divider {
  host!: HTMLElement;
  color?: string = 'contrast-lower';
  direction?: unknown = 'horizontal';
  render(): void {}
}
