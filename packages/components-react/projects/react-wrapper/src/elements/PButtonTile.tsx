import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import {
  BUTTON_ICON_CLASS,
  BUTTON_LABEL_CLASS,
  BUTTON_SPINNER_CLASS,
  buttonAppearance,
} from '../../../../../components/src/elements/button/button.appearance';
import {
  BUTTON_TILE_ACTION_CLASS,
  BUTTON_TILE_ACTION_COMPACT_CLASS,
  BUTTON_TILE_CONTENT_CLASS,
  BUTTON_TILE_DESCRIPTION_CLASS,
  BUTTON_TILE_FOOTER_CLASS,
  BUTTON_TILE_HEADER_CLASS,
  BUTTON_TILE_MEDIA_CLASS,
  buttonTileAppearance,
  type TileAppearanceProps,
} from '../../../../../components/src/elements/tile/tile.appearance';
import { PIcon } from './PIcon';

export type PButtonTileProps = TileAppearanceProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof TileAppearanceProps> & {
    label: string;
    description: string;
    icon?: string | 'none';
    iconSource?: string;
    loading?: boolean;
    header?: ReactNode;
    footer?: ReactNode;
    children?: ReactNode;
  };

const TileAction = ({
  className,
  label,
  icon,
  iconSource,
  hideLabel,
  compact,
  loading,
}: {
  className: string;
  label: string;
  icon: string | 'none';
  iconSource?: string;
  hideLabel?: boolean;
  compact?: boolean;
  loading?: boolean;
}) => {
  const appearance = buttonAppearance({
    variant: 'secondary',
    icon,
    hideLabel,
    compact,
    loading,
  });
  const showIcon = icon !== 'none' || Boolean(iconSource);

  return (
    <span
      {...appearance.attrs}
      className={[appearance.className, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {showIcon && (
        <PIcon
          className={BUTTON_ICON_CLASS}
          name={icon === 'none' ? undefined : icon}
          source={iconSource}
          size="inherit"
          color="inherit"
          aria-hidden="true"
        />
      )}
      {loading && (
        <span className={BUTTON_SPINNER_CLASS} aria-hidden="true">
          <svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
            <circle r="11" />
            <circle r="11" />
          </svg>
        </span>
      )}
      <span className={BUTTON_LABEL_CLASS}>{label}</span>
    </span>
  );
};

export const PButtonTile = forwardRef<HTMLButtonElement, PButtonTileProps>(function PButtonTile(
  {
    size,
    weight,
    aspectRatio,
    align,
    gradient = false,
    compact,
    label,
    description,
    icon = 'none',
    iconSource,
    loading = false,
    disabled = false,
    type = 'submit',
    header,
    footer,
    className,
    children,
    ['aria-label']: ariaLabel,
    ...rest
  },
  ref
) {
  const appearance = buttonTileAppearance({ size, weight, aspectRatio, align, gradient, compact });
  const showFull = compact !== true;
  const showCompact = compact === true || typeof compact === 'object';
  const compactIcon = icon === 'none' ? 'arrow-right' : icon;

  return (
    <button
      {...rest}
      {...appearance.attrs}
      ref={ref}
      type={type}
      disabled={Boolean(disabled || loading)}
      aria-busy={loading || undefined}
      {...(loading ? { 'data-p-loading': 'true' } : {})}
      aria-label={ariaLabel ?? label}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {header ? <span className={BUTTON_TILE_HEADER_CLASS}>{header}</span> : null}
      <span className={BUTTON_TILE_MEDIA_CLASS}>{children}</span>
      <span className={BUTTON_TILE_CONTENT_CLASS}>
        <p className={BUTTON_TILE_DESCRIPTION_CLASS}>{description}</p>
        {footer ? <span className={BUTTON_TILE_FOOTER_CLASS}>{footer}</span> : null}
        {showFull && (
          <TileAction
            className={BUTTON_TILE_ACTION_CLASS}
            label={label}
            icon={icon}
            iconSource={iconSource}
            loading={loading}
          />
        )}
        {showCompact && (
          <TileAction
            className={BUTTON_TILE_ACTION_COMPACT_CLASS}
            label={label}
            icon={compactIcon}
            iconSource={iconSource}
            hideLabel
            compact
            loading={loading}
          />
        )}
      </span>
    </button>
  );
});
