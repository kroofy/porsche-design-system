/**
 * Stencil no longer owns p-fieldset. The playground tag is the Mitosis Lit
 * custom element from mitosis/fieldset/Fieldset.lite.tsx.
 * This file stays so generateConstructorMap can still import class Fieldset.
 * Global HTMLPFieldsetElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class Fieldset {
  host!: HTMLElement;
  label?: string = '';
  labelSize?: string = 'medium';
  required?: boolean = false;
  state?: string = 'none';
  message?: string = '';
  aria?: unknown;
  render(): void {}
}

declare global {
  interface HTMLPFieldsetElement extends HTMLElement {
    label?: string;
    labelSize?: string;
    required?: boolean;
    state?: string;
    message?: string;
  }
  interface HTMLElementTagNameMap {
    'p-fieldset': HTMLPFieldsetElement;
  }
}
