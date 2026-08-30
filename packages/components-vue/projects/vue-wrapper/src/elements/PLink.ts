import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  LINK_ICON_CLASS,
  LINK_LABEL_CLASS,
  type LinkVariant,
  linkAppearance,
} from '../../../../../components/src/elements/link/link.appearance';
import { PIcon } from './PIcon';

export const PLink = defineComponent({
  name: 'PLink',
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<LinkVariant>, default: undefined },
    icon: { type: String, default: 'none' },
    hideLabel: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    compact: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = linkAppearance({
        variant: props.variant,
        icon: props.icon,
        hideLabel: props.hideLabel,
        compact: props.compact,
      });
      const { class: extraClass, ...rest } = attrs;

      return h(
        'a',
        {
          ...rest,
          ...appearance.attrs,
          class: [appearance.className, extraClass],
        },
        [
          ...(props.icon !== 'none'
            ? [
                h(PIcon, {
                  class: LINK_ICON_CLASS,
                  name: props.icon,
                  size: 'inherit',
                  color: 'inherit',
                  'aria-hidden': 'true',
                }),
              ]
            : []),
          h('span', { class: LINK_LABEL_CLASS }, slots.default?.()),
        ]
      );
    };
  },
});
