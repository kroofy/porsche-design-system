/**
 * Stencil no longer owns p-heading. The playground tag is the Mitosis Lit
 * custom element from mitosis/heading/Heading.lite.tsx.
 * This file stays so generateConstructorMap can still import class Heading.
 */
export class Heading {
  host!: HTMLElement;
  tag?: string;
  size?: unknown = '2xl';
  weight?: string = 'normal';
  align?: string = 'start';
  color?: string = 'primary';
  hyphens?: string = 'none';
  ellipsis?: boolean = false;
  render(): void {}
}
