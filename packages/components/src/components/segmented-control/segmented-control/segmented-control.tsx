/**
 * Stencil no longer owns p-segmented-control. The playground tag is the Mitosis Lit
 * custom element from mitosis/segmented-control/SegmentedControl.lite.tsx.
 * This file stays so generateConstructorMap can still import class SegmentedControl.
 * Global HTMLPSegmentedControlElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class SegmentedControl {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  value?: string | number | null;
  columns?: unknown = 'auto';
  name?: string;
  form?: string;
  compact?: boolean = false;
  required?: boolean = false;
  disabled?: boolean = false;
  state?: string = 'none';
  message?: string = '';
  hideLabel?: unknown = false;
  noWrap?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPSegmentedControlElement extends HTMLElement {
    label?: string;
    description?: string;
    value?: string | number | null;
    columns?: unknown;
    name?: string;
    form?: string;
    compact?: boolean;
    required?: boolean;
    disabled?: boolean;
    state?: string;
    message?: string;
    hideLabel?: unknown;
    noWrap?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-segmented-control': HTMLPSegmentedControlElement;
  }
}
