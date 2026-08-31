/**
 * Stencil no longer owns p-button-pure. The playground tag is the Mitosis Lit
 * custom element from mitosis/button-pure/ButtonPure.lite.tsx.
 * This file stays so generateConstructorMap can still import class ButtonPure.
 */
export class ButtonPure {
  host!: HTMLElement;
  type?: string = 'submit';
  name?: string;
  value?: string;
  disabled?: boolean = false;
  loading?: boolean = false;
  size?: unknown = 'sm';
  icon?: string = 'arrow-right';
  color?: string = 'primary';
  iconSource?: string;
  underline?: boolean = false;
  active?: boolean = false;
  hideLabel?: unknown = false;
  alignLabel?: unknown = 'end';
  stretch?: unknown = false;
  aria?: unknown;
  form?: string;
  render(): void {}
}
