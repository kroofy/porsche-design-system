import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
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
  type TileAlign,
  type TileAspectRatio,
  type TileSize,
  type TileWeight,
} from '../../../../../components/src/elements/tile/tile.appearance';
import { PIcon } from './PIcon';

const tileAction = (opts: {
  className: string;
  label: string;
  icon: string;
  hideLabel?: boolean;
  compact?: boolean;
  loading?: boolean;
  iconSource?: string;
}) => {
  const appearance = buttonAppearance({
    variant: 'secondary',
    icon: opts.icon,
    hideLabel: opts.hideLabel,
    compact: opts.compact,
    loading: opts.loading,
  });
  const showIcon = opts.icon !== 'none' || Boolean(opts.iconSource);
  return h('span', { ...appearance.attrs, class: [appearance.className, opts.className], 'aria-hidden': 'true' }, [
    ...(showIcon
      ? [
          h(PIcon, {
            class: BUTTON_ICON_CLASS,
            name: opts.icon === 'none' ? undefined : opts.icon,
            source: opts.iconSource,
            size: 'inherit',
            color: 'inherit',
            'aria-hidden': 'true',
          }),
        ]
      : []),
    ...(opts.loading
      ? [
          h('span', { class: BUTTON_SPINNER_CLASS, 'aria-hidden': 'true' }, [
            h(
              'svg',
              { viewBox: '-16 -16 32 32', width: '100%', height: '100%', focusable: 'false', 'aria-hidden': 'true' },
              [h('circle', { r: '11' }), h('circle', { r: '11' })]
            ),
          ]),
        ]
      : []),
    h('span', { class: BUTTON_LABEL_CLASS }, opts.label),
  ]);
};

export const PButtonTile = defineComponent({
  name: 'PButtonTile',
  inheritAttrs: false,
  props: {
    size: { type: [String, Object] as PropType<Responsive<TileSize>>, default: undefined },
    weight: { type: [String, Object] as PropType<Responsive<TileWeight>>, default: undefined },
    aspectRatio: { type: [String, Object] as PropType<Responsive<TileAspectRatio>>, default: undefined },
    align: { type: String as PropType<TileAlign>, default: undefined },
    gradient: { type: Boolean, default: false },
    compact: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    label: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'none' },
    iconSource: { type: String, default: undefined },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'submit' },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = buttonTileAppearance({
        size: props.size,
        weight: props.weight,
        aspectRatio: props.aspectRatio,
        align: props.align,
        gradient: props.gradient,
        compact: props.compact,
      });
      const { class: extraClass, 'aria-label': ariaLabel, ...rest } = attrs;
      const showFull = props.compact !== true;
      const showCompact = props.compact === true || typeof props.compact === 'object';
      const compactIcon = props.icon === 'none' ? 'arrow-right' : props.icon;

      return h(
        'button',
        {
          ...rest,
          ...appearance.attrs,
          type: props.type,
          disabled: Boolean(props.disabled || props.loading),
          'aria-busy': props.loading || undefined,
          'data-p-loading': props.loading ? 'true' : undefined,
          'aria-label': (ariaLabel as string) ?? props.label,
          class: [appearance.className, extraClass],
        },
        [
          ...(slots.header ? [h('span', { class: BUTTON_TILE_HEADER_CLASS }, slots.header())] : []),
          h('span', { class: BUTTON_TILE_MEDIA_CLASS }, slots.default?.()),
          h('span', { class: BUTTON_TILE_CONTENT_CLASS }, [
            h('p', { class: BUTTON_TILE_DESCRIPTION_CLASS }, props.description),
            ...(slots.footer ? [h('span', { class: BUTTON_TILE_FOOTER_CLASS }, slots.footer())] : []),
            ...(showFull
              ? [
                  tileAction({
                    className: BUTTON_TILE_ACTION_CLASS,
                    label: props.label,
                    icon: props.icon,
                    iconSource: props.iconSource,
                    loading: props.loading,
                  }),
                ]
              : []),
            ...(showCompact
              ? [
                  tileAction({
                    className: BUTTON_TILE_ACTION_COMPACT_CLASS,
                    label: props.label,
                    icon: compactIcon,
                    iconSource: props.iconSource,
                    hideLabel: true,
                    compact: true,
                    loading: props.loading,
                  }),
                ]
              : []),
          ]),
        ]
      );
    };
  },
});
