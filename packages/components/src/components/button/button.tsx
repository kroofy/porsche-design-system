/**
 * Stencil no longer owns p-button. The playground tag is the Mitosis Lit
 * custom element from mitosis/button/Button.lite.tsx.
 * This file stays so generateConstructorMap can still import class Button.
 * Global HTMLPButtonElement stays because implicitSubmit still types those
 * hosts after Stencil drops the @Component declaration.
 */
export class Button {
  host!: HTMLElement;
  type?: string = 'submit';
  name?: string;
  value?: string;
  disabled?: boolean = false;
  loading?: boolean = false;
  variant?: string = 'primary';
  icon?: string = 'none';
  iconSource?: string;
  hideLabel?: unknown = false;
  compact?: unknown = false;
  aria?: unknown;
  form?: string;
  render(): void {}
}

declare global {
  interface HTMLPButtonElement extends HTMLElement {
    type?: string;
    disabled?: boolean;
    aria?: unknown;
  }
  interface HTMLElementTagNameMap {
    'p-button': HTMLPButtonElement;
  }
}
