/**
 * Stencil no longer owns p-button-tile. The playground tag is the Mitosis Lit
 * custom element from mitosis/button-tile/ButtonTile.lite.tsx.
 * This file stays so generateConstructorMap can still import class ButtonTile.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';
import type { BreakpointCustomizable, ButtonAriaAttribute, SelectedAriaAttributes } from '../../types';
import type {
  ButtonTileAlign,
  ButtonTileAspectRatio,
  ButtonTileIcon,
  ButtonTileSize,
  ButtonTileType,
  ButtonTileWeight,
} from './button-tile-utils';

export class ButtonTile {
  host!: HTMLElement;
  size?: BreakpointCustomizable<ButtonTileSize> = 'medium';
  weight?: BreakpointCustomizable<ButtonTileWeight> = 'semi-bold';
  aspectRatio?: BreakpointCustomizable<ButtonTileAspectRatio> = '4/3';
  label: string;
  description: string;
  align?: ButtonTileAlign = 'bottom';
  gradient?: boolean = false;
  compact?: BreakpointCustomizable<boolean> = false;
  type?: ButtonTileType = 'submit';
  disabled?: boolean = false;
  loading?: boolean = false;
  icon?: ButtonTileIcon = 'none';
  iconSource?: string;
  aria?: SelectedAriaAttributes<ButtonAriaAttribute>;
  render(): void {}
}

declare global {
  interface HTMLPButtonTileElement extends HTMLStencilElement {
    size?: BreakpointCustomizable<ButtonTileSize>;
    weight?: BreakpointCustomizable<ButtonTileWeight>;
    aspectRatio?: BreakpointCustomizable<ButtonTileAspectRatio>;
    label: string;
    description: string;
    align?: ButtonTileAlign;
    gradient?: boolean;
    compact?: BreakpointCustomizable<boolean>;
    type?: ButtonTileType;
    disabled?: boolean;
    loading?: boolean;
    icon?: ButtonTileIcon;
    iconSource?: string;
    aria?: SelectedAriaAttributes<ButtonAriaAttribute>;
  }
  interface HTMLElementTagNameMap {
    'p-button-tile': HTMLPButtonTileElement;
  }
}
