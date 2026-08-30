import { defineComponent, h, type PropType } from 'vue';
import {
  type AiTagLocale,
  type AiTagVariant,
  aiTagAppearance,
  aiTagLabel,
} from '../../../../../components/src/elements/ai-tag/ai-tag.appearance';

export const PAiTag = defineComponent({
  name: 'PAiTag',
  inheritAttrs: false,
  props: {
    locale: { type: String as PropType<AiTagLocale | string>, default: undefined },
    variant: { type: String as PropType<AiTagVariant>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = aiTagAppearance();
      const label = aiTagLabel(props.variant, props.locale);
      const { class: extraClass, ...rest } = attrs;
      const slotted = slots.default?.();

      return h(
        'span',
        {
          ...rest,
          ...appearance.attrs,
          class: [appearance.className, extraClass],
        },
        slotted ?? (label.kind === 'abbr' ? [h('abbr', { title: label.title }, label.text)] : [label.text])
      );
    };
  },
});
