import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const BUTTON_TILE_ROOT_CLASS = 'p-button-tile' as const;
export const LINK_TILE_ROOT_CLASS = 'p-link-tile' as const;

export const tilePart = (root: string, part: string): string => `${root}__${part}`;

export const BUTTON_TILE_MEDIA_CLASS = 'p-button-tile__media' as const;
export const BUTTON_TILE_HEADER_CLASS = 'p-button-tile__header' as const;
export const BUTTON_TILE_CONTENT_CLASS = 'p-button-tile__content' as const;
export const BUTTON_TILE_DESCRIPTION_CLASS = 'p-button-tile__description' as const;
export const BUTTON_TILE_FOOTER_CLASS = 'p-button-tile__footer' as const;
export const BUTTON_TILE_ACTION_CLASS = 'p-button-tile__action' as const;
export const BUTTON_TILE_ACTION_COMPACT_CLASS = 'p-button-tile__action-compact' as const;

export const LINK_TILE_MEDIA_CLASS = 'p-link-tile__media' as const;
export const LINK_TILE_HEADER_CLASS = 'p-link-tile__header' as const;
export const LINK_TILE_CONTENT_CLASS = 'p-link-tile__content' as const;
export const LINK_TILE_DESCRIPTION_CLASS = 'p-link-tile__description' as const;
export const LINK_TILE_FOOTER_CLASS = 'p-link-tile__footer' as const;
export const LINK_TILE_ACTION_CLASS = 'p-link-tile__action' as const;
export const LINK_TILE_ACTION_COMPACT_CLASS = 'p-link-tile__action-compact' as const;

export const TILE_SIZES = ['medium', 'large', 'inherit'] as const;
export type TileSize = (typeof TILE_SIZES)[number];

export const TILE_WEIGHTS = ['regular', 'semi-bold'] as const;
export type TileWeight = (typeof TILE_WEIGHTS)[number];

export const TILE_ASPECT_RATIOS = ['1/1', '4/3', '3/4', '16/9', '9/16', 'auto'] as const;
export type TileAspectRatio = (typeof TILE_ASPECT_RATIOS)[number];

export const TILE_ALIGNS = ['top', 'bottom'] as const;
export type TileAlign = (typeof TILE_ALIGNS)[number];

export type TileAppearanceProps = {
  size?: Responsive<TileSize>;
  weight?: Responsive<TileWeight>;
  aspectRatio?: Responsive<TileAspectRatio>;
  align?: TileAlign;
  gradient?: boolean;
  compact?: Responsive<boolean>;
};

const DEFAULT_SIZE: TileSize = 'medium';
const DEFAULT_WEIGHT: TileWeight = 'semi-bold';
const DEFAULT_ASPECT: TileAspectRatio = '4/3';
const DEFAULT_ALIGN: TileAlign = 'bottom';

export const tileAppearance = (rootClass: string, props: TileAppearanceProps = {}): NativeAppearance => {
  const { size, weight, aspectRatio, align = DEFAULT_ALIGN, gradient = false, compact } = props;
  return {
    className: rootClass,
    attrs: {
      ...serializeResponsive('size', size, DEFAULT_SIZE),
      ...serializeResponsive('weight', weight, DEFAULT_WEIGHT),
      ...serializeResponsive('aspect-ratio', aspectRatio, DEFAULT_ASPECT),
      ...(align !== DEFAULT_ALIGN ? { 'data-p-align': align } : {}),
      ...(gradient ? { 'data-p-gradient': 'true' } : {}),
      ...serializeResponsive('compact', compact, false),
    },
  };
};

export const buttonTileAppearance = (props: TileAppearanceProps = {}): NativeAppearance =>
  tileAppearance(BUTTON_TILE_ROOT_CLASS, props);

export const linkTileAppearance = (props: TileAppearanceProps = {}): NativeAppearance =>
  tileAppearance(LINK_TILE_ROOT_CLASS, props);
