/**
 * Stencil no longer owns p-segmented-control-item. The playground tag is the Mitosis Lit
 * custom element from mitosis/segmented-control-item/SegmentedControlItem.lite.tsx.
 * This file stays so generateConstructorMap can still import class SegmentedControlItem.
 */
export class SegmentedControlItem {
  host!: HTMLElement;
  value?: string | number;
  disabled?: boolean = false;
  label?: string;
  icon?: string;
  iconSource?: string;
  selected?: boolean;
  compact?: boolean;
  disabledParent?: boolean;
  state?: string;
  message?: string;
  render(): void {}
}

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
