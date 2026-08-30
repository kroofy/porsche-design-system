import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  type HeadingAlign,
  type HeadingColor,
  type HeadingHyphens,
  type HeadingSize,
  type HeadingTag,
  type HeadingWeight,
  headingAppearance,
  headingTagForSize,
} from '../../../../../components/src/elements/heading/heading.appearance';

export const PHeading = defineComponent({
  name: 'PHeading',
  inheritAttrs: false,
  props: {
    size: { type: [String, Object] as PropType<Responsive<HeadingSize>>, default: undefined },
    weight: { type: String as PropType<HeadingWeight>, default: undefined },
    align: { type: String as PropType<HeadingAlign>, default: undefined },
    color: { type: String as PropType<HeadingColor>, default: undefined },
    hyphens: { type: String as PropType<HeadingHyphens>, default: undefined },
    ellipsis: { type: Boolean, default: false },
    tag: { type: String as PropType<HeadingTag>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = headingAppearance({
        size: props.size,
        weight: props.weight,
        align: props.align,
        color: props.color,
        hyphens: props.hyphens,
        ellipsis: props.ellipsis,
      });
      const { class: extraClass, ...rest } = attrs;

      return h(
        headingTagForSize(props.size, props.tag),
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
