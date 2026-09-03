/**
 * Stencil no longer owns p-display. The playground tag is the Mitosis Lit
 * custom element from mitosis/display/Display.lite.tsx.
 * This file stays so generateConstructorMap can still import class Display.
 */
export class Display {
  host!: HTMLElement;
  tag?: string;
  size?: unknown = 'large';
  align?: string = 'start';
  color?: string = 'primary';
  ellipsis?: boolean = false;
  render(): void {}
}
