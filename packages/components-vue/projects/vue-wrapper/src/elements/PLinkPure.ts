import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  LINK_PURE_ICON_CLASS,
  LINK_PURE_LABEL_CLASS,
  type LinkPureAlignLabel,
  type LinkPureColor,
  type LinkPureSize,
  linkPureAppearance,
} from '../../../../../components/src/elements/link-pure/link-pure.appearance';
import { PIcon } from './PIcon';

export const PLinkPure = defineComponent({
  name: 'PLinkPure',
  inheritAttrs: false,
  props: {
    size: { type: [String, Object] as PropType<Responsive<LinkPureSize>>, default: undefined },
    color: { type: String as PropType<LinkPureColor>, default: undefined },
    icon: { type: String, default: 'arrow-right' },
    iconSource: { type: String, default: undefined },
    hideLabel: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    alignLabel: { type: [String, Object] as PropType<Responsive<LinkPureAlignLabel>>, default: undefined },
    stretch: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    underline: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = linkPureAppearance({
        size: props.size,
        color: props.color,
        icon: props.icon,
        hideLabel: props.hideLabel,
        alignLabel: props.alignLabel,
        stretch: props.stretch,
        underline: props.underline,
        active: props.active,
      });
      const { class: extraClass, ...rest } = attrs;
      const showIcon = props.icon !== 'none' || Boolean(props.iconSource);

      return h(
        'a',
        {
          ...rest,
          ...appearance.attrs,
          class: [appearance.className, extraClass],
        },
        [
          ...(showIcon
            ? [
                h(PIcon, {
                  class: LINK_PURE_ICON_CLASS,
                  name: props.icon === 'none' ? 'arrow-right' : props.icon,
                  source: props.iconSource,
                  size: 'inherit',
                  color: 'inherit',
                  'aria-hidden': 'true',
                }),
              ]
            : []),
          h('span', { class: LINK_PURE_LABEL_CLASS }, slots.default?.()),
        ]
      );
    };
  },
});
