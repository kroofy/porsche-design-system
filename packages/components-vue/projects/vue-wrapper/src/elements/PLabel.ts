import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import { LABEL_REQUIRED_CLASS, labelAppearance } from '../../../../../components/src/elements/label/label.appearance';

export const PLabel = defineComponent({
  name: 'PLabel',
  inheritAttrs: false,
  props: {
    hideLabel: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    required: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = labelAppearance({ hideLabel: props.hideLabel });
      const { class: extraClass, ...rest } = attrs;
      const children = [...(slots.default?.() ?? [])];
      if (props.required) {
        children.push(h('span', { class: LABEL_REQUIRED_CLASS, 'aria-hidden': 'true' }, ' *'));
      }

      return h(
        'label',
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
