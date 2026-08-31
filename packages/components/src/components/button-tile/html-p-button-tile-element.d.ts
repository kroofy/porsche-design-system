/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPButtonTileElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-button-tile hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';
import type { BreakpointCustomizable, ButtonAriaAttribute, SelectedAriaAttributes } from '../../types';
import type {
  ButtonTileAlign,
  ButtonTileAspectRatio,
  ButtonTileIcon,
  ButtonTileSize,
  ButtonTileType,
  ButtonTileWeight,
} from './button-tile-utils';

export {};

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
