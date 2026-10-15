/**
 * Stencil no longer owns p-icon. The playground tag is the Mitosis Lit
 * custom element from mitosis/icon/Icon.lite.tsx.
 * This file stays so generateConstructorMap can still import class Icon.
 */
export class Icon {
  host!: HTMLElement;
  name?: string = 'arrow-right';
  source?: string;
  color?: string = 'primary';
  size?: unknown = 'sm';
  aria?: unknown;
  render(): void {}
}
