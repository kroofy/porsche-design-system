/**
 * Stencil no longer owns p-switch. The playground tag is the Mitosis Lit
 * custom element from mitosis/switch/Switch.lite.tsx.
 * This file stays so generateConstructorMap can still import class Switch.
 * Global HTMLPSwitchElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class Switch {
  host!: HTMLElement;
  alignLabel?: unknown = 'end';
  hideLabel?: unknown = false;
  stretch?: unknown = false;
  checked?: boolean = false;
  disabled?: boolean = false;
  loading?: boolean = false;
  compact?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPSwitchElement extends HTMLElement {
    checked?: boolean;
    disabled?: boolean;
    loading?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-switch': HTMLPSwitchElement;
  }
}
