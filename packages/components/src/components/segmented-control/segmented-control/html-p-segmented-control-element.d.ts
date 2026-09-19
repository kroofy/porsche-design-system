/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPSegmentedControlElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-segmented-control hosts.
 */
export {};

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
