import { defineComponent, h, type PropType } from 'vue';
import {
  type AccordionAlignMarker,
  type AccordionBackground,
  type AccordionSize,
  accordionAppearance,
} from '../../../../../components/src/elements/accordion/accordion.appearance';
import type { Responsive } from '../../../../../components/src/elements/appearance';

export const PAccordion = defineComponent({
  name: 'PAccordion',
  inheritAttrs: false,
  props: {
    alignMarker: { type: String as PropType<AccordionAlignMarker>, default: undefined },
    background: { type: String as PropType<AccordionBackground>, default: undefined },
    compact: { type: Boolean, default: false },
    indent: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    sticky: { type: Boolean, default: false },
    size: { type: [String, Object] as PropType<Responsive<AccordionSize>>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = accordionAppearance({
        alignMarker: props.alignMarker,
        background: props.background,
        compact: props.compact,
        indent: props.indent,
        sticky: props.sticky,
        size: props.size,
      });
      const { class: extraClass, ...rest } = attrs;

      return h(
        'details',
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
