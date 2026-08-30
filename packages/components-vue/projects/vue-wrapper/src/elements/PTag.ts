import { defineComponent, h, type PropType } from 'vue';
import {
  TAG_ICON_CLASS,
  type TagVariant,
  tagAppearance,
} from '../../../../../components/src/elements/tag/tag.appearance';
import { PIcon } from './PIcon';

export const PTag = defineComponent({
  name: 'PTag',
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<TagVariant>, default: undefined },
    compact: { type: Boolean, default: false },
    href: { type: String, default: undefined },
    target: { type: String, default: undefined },
    type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: undefined },
    icon: { type: String, default: 'none' },
    iconSource: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = tagAppearance({
        variant: props.variant,
        compact: props.compact,
      });
      const { class: extraClass, ...rest } = attrs;
      const hasIcon = props.icon !== 'none' || !!props.iconSource;
      const children = [
        ...(hasIcon
          ? [
              h(PIcon, {
                class: TAG_ICON_CLASS,
                name: props.icon === 'none' ? undefined : props.icon,
                source: props.iconSource,
                size: 'xs',
                color: 'inherit',
                'aria-hidden': 'true',
              }),
            ]
          : []),
        slots.default?.(),
      ];

      if (props.href !== undefined) {
        return h(
          'a',
          {
            ...rest,
            ...appearance.attrs,
            href: props.href,
            target: props.target,
            class: [appearance.className, extraClass],
          },
          children
        );
      }

      if (props.type !== undefined) {
        return h(
          'button',
          {
            ...rest,
            ...appearance.attrs,
            type: props.type,
            class: [appearance.className, extraClass],
          },
          children
        );
      }

      return h(
        'span',
        {
          ...rest,
          ...appearance.attrs,
          class: [appearance.className, extraClass],
        },
        children
      );
    };
  },
});
