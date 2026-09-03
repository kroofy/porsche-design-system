/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPSegmentedControlItemElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-segmented-control-item hosts.
 */
export {};

declare global {
  interface HTMLPSegmentedControlItemElement extends HTMLElement {
    value?: string | number;
    disabled?: boolean;
    label?: string;
    icon?: string;
    iconSource?: string;
    selected?: boolean;
    compact?: boolean;
    disabledParent?: boolean;
    state?: string;
    message?: string;
  }
  interface HTMLElementTagNameMap {
    'p-segmented-control-item': HTMLPSegmentedControlItemElement;
  }
}
