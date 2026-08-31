/**
 * Stencil no longer owns p-link. The playground tag is the Mitosis Lit
 * custom element from mitosis/link/Link.lite.tsx.
 * This file stays so generateConstructorMap can still import class Link.
 */
export class Link {
  host!: HTMLElement;
  variant?: string = 'primary';
  icon?: string = 'none';
  iconSource?: string;
  href?: string;
  target?: string = '_self';
  download?: string;
  rel?: string;
  hideLabel?: unknown = false;
  compact?: unknown = false;
  aria?: unknown;
  render(): void {}
}
