/**
 * Stencil no longer owns p-link-pure. The playground tag is the Mitosis Lit
 * custom element from mitosis/link-pure/LinkPure.lite.tsx.
 * This file stays so generateConstructorMap can still import class LinkPure.
 */
export class LinkPure {
  host!: HTMLElement;
  alignLabel?: unknown = 'end';
  stretch?: unknown = false;
  size?: unknown = 'sm';
  color?: string = 'primary';
  icon?: string = 'arrow-right';
  iconSource?: string;
  underline?: boolean = false;
  href?: string;
  active?: boolean = false;
  hideLabel?: unknown = false;
  target?: string = '_self';
  download?: string;
  rel?: string;
  aria?: unknown;
  render(): void {}
}
