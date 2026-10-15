/**
 * Stencil no longer owns p-tag. The playground tag is the Mitosis Lit
 * custom element from mitosis/tag/Tag.lite.tsx.
 * This file stays so generateConstructorMap can still import class Tag.
 */
export class Tag {
  host!: HTMLElement;
  variant?: string = 'secondary';
  icon?: string = 'none';
  iconSource?: string;
  compact?: boolean = false;
  render(): void {}
}
