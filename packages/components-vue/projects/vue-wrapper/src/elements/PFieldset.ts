import { defineComponent, h, type PropType } from 'vue';
import {
  type FieldsetLabelSize,
  type FieldsetState,
  fieldsetAppearance,
} from '../../../../../components/src/elements/fieldset/fieldset.appearance';

export const PFieldset = defineComponent({
  name: 'PFieldset',
  inheritAttrs: false,
  props: {
    labelSize: { type: String as PropType<FieldsetLabelSize>, default: undefined },
    required: { type: Boolean, default: false },
    state: { type: String as PropType<FieldsetState>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = fieldsetAppearance({
        labelSize: props.labelSize,
        required: props.required,
        state: props.state,
      });
      const { class: extraClass, ...rest } = attrs;

      return h(
        'fieldset',
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
