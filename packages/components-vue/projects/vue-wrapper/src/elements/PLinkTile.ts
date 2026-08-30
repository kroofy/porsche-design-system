import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
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
}) => {
  const appearance = linkAppearance({
    variant: 'secondary',
    icon: opts.icon,
    hideLabel: opts.hideLabel,
    compact: opts.compact,
  });
  return h('span', { ...appearance.attrs, class: [appearance.className, opts.className], 'aria-hidden': 'true' }, [
    ...(opts.icon !== 'none'
      ? [
          h(PIcon, {
            class: LINK_ICON_CLASS,
            name: opts.icon,
            size: 'inherit',
            color: 'inherit',
            'aria-hidden': 'true',
          }),
        ]
      : []),
    h('span', { class: LINK_LABEL_CLASS }, opts.label),
  ]);
};

export const PLinkTile = defineComponent({
  name: 'PLinkTile',
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
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = linkTileAppearance({
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

      return h(
        'a',
        {
          ...rest,
          ...appearance.attrs,
          'aria-label': (ariaLabel as string) ?? props.label,
          class: [appearance.className, extraClass],
        },
        [
          ...(slots.header ? [h('span', { class: LINK_TILE_HEADER_CLASS }, slots.header())] : []),
          h('span', { class: LINK_TILE_MEDIA_CLASS }, slots.default?.()),
          h('span', { class: LINK_TILE_CONTENT_CLASS }, [
            h('p', { class: LINK_TILE_DESCRIPTION_CLASS }, props.description),
            ...(slots.footer ? [h('span', { class: LINK_TILE_FOOTER_CLASS }, slots.footer())] : []),
            ...(showFull ? [tileAction({ className: LINK_TILE_ACTION_CLASS, label: props.label, icon: 'none' })] : []),
            ...(showCompact
              ? [
                  tileAction({
                    className: LINK_TILE_ACTION_COMPACT_CLASS,
                    label: props.label,
                    icon: 'arrow-right',
                    hideLabel: true,
                    compact: true,
                  }),
                ]
              : []),
          ]),
        ]
      );
    };
  },
});
