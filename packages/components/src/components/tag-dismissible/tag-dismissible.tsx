/**
 * Stencil no longer owns p-tag-dismissible. The playground tag is the Mitosis Lit
 * custom element from mitosis/tag-dismissible/TagDismissible.lite.tsx.
 * This file stays so generateConstructorMap can still import class TagDismissible.
 */
export class TagDismissible {
  host!: HTMLElement;
  label?: string;
  aria?: unknown;
  compact?: boolean = false;
  render(): void {}
}
