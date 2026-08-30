import { type AnchorHTMLAttributes, forwardRef, type ReactNode } from 'react';
import {
  LINK_ICON_CLASS,
  LINK_LABEL_CLASS,
  linkAppearance,
} from '../../../../../components/src/elements/link/link.appearance';
import {
  LINK_TILE_ACTION_CLASS,
  LINK_TILE_ACTION_COMPACT_CLASS,
  LINK_TILE_CONTENT_CLASS,
  LINK_TILE_DESCRIPTION_CLASS,
  LINK_TILE_FOOTER_CLASS,
  LINK_TILE_HEADER_CLASS,
  LINK_TILE_MEDIA_CLASS,
  linkTileAppearance,
  type TileAppearanceProps,
} from '../../../../../components/src/elements/tile/tile.appearance';
import { PIcon } from './PIcon';

export type PLinkTileProps = TileAppearanceProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof TileAppearanceProps> & {
    label: string;
    description: string;
    header?: ReactNode;
    footer?: ReactNode;
    children?: ReactNode;
  };

const TileAction = ({
  className,
  label,
  icon,
  hideLabel,
  compact,
}: {
  className: string;
  label: string;
  icon: string | 'none';
  hideLabel?: boolean;
  compact?: boolean;
}) => {
  const appearance = linkAppearance({ variant: 'secondary', icon, hideLabel, compact });
  const showIcon = icon !== 'none';

  return (
    <span
      {...appearance.attrs}
      className={[appearance.className, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {showIcon && <PIcon className={LINK_ICON_CLASS} name={icon} size="inherit" color="inherit" aria-hidden="true" />}
      <span className={LINK_LABEL_CLASS}>{label}</span>
    </span>
  );
};

export const PLinkTile = forwardRef<HTMLAnchorElement, PLinkTileProps>(function PLinkTile(
  {
    size,
    weight,
    aspectRatio,
    align,
    gradient = false,
    compact,
    label,
    description,
    header,
    footer,
    className,
    children,
    ['aria-label']: ariaLabel,
    ...rest
  },
  ref
) {
  const appearance = linkTileAppearance({ size, weight, aspectRatio, align, gradient, compact });
  const showFull = compact !== true;
  const showCompact = compact === true || typeof compact === 'object';

  return (
    <a
      {...rest}
      {...appearance.attrs}
      ref={ref}
      aria-label={ariaLabel ?? label}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {header ? <span className={LINK_TILE_HEADER_CLASS}>{header}</span> : null}
      <span className={LINK_TILE_MEDIA_CLASS}>{children}</span>
      <span className={LINK_TILE_CONTENT_CLASS}>
        <p className={LINK_TILE_DESCRIPTION_CLASS}>{description}</p>
        {footer ? <span className={LINK_TILE_FOOTER_CLASS}>{footer}</span> : null}
        {showFull && <TileAction className={LINK_TILE_ACTION_CLASS} label={label} icon="none" />}
        {showCompact && (
          <TileAction className={LINK_TILE_ACTION_COMPACT_CLASS} label={label} icon="arrow-right" hideLabel compact />
        )}
      </span>
    </a>
  );
});
