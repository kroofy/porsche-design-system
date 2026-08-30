import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  type TextAlign,
  type TextColor,
  type TextHyphens,
  type TextSize,
  type TextTag,
  type TextWeight,
  textAppearance,
} from '../../../../../components/src/elements/text/text.appearance';

export const PText = defineComponent({
  name: 'PText',
  inheritAttrs: false,
  props: {
    size: { type: [String, Object] as PropType<Responsive<TextSize>>, default: undefined },
    weight: { type: String as PropType<TextWeight>, default: undefined },
    align: { type: String as PropType<TextAlign>, default: undefined },
    color: { type: String as PropType<TextColor>, default: undefined },
    hyphens: { type: String as PropType<TextHyphens>, default: undefined },
    ellipsis: { type: Boolean, default: false },
    tag: { type: String as PropType<TextTag>, default: 'p' },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = textAppearance({
        size: props.size,
        weight: props.weight,
        align: props.align,
        color: props.color,
        hyphens: props.hyphens,
        ellipsis: props.ellipsis,
      });
      const { class: extraClass, ...rest } = attrs;

      return h(
        props.tag,
        {
          ...rest,
          ...appearance.attrs,
          class: [appearance.className, extraClass],
        },
        slots.default?.()
      );
    };
  },
});
