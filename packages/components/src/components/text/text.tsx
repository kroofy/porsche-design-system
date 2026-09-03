/**
 * Stencil no longer owns p-text. The playground tag is the Mitosis Lit
 * custom element from mitosis/text/Text.lite.tsx.
 * This file stays so generateConstructorMap can still import class Text.
 */
export class Text {
  host!: HTMLElement;
  tag?: string = 'p';
  size?: unknown = 'sm';
  weight?: string = 'normal';
  align?: string = 'start';
  color?: string = 'primary';
  hyphens?: string = 'inherit';
  ellipsis?: boolean = false;
  render(): void {}
}
