import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  SPINNER_VIEWBOX,
  type SpinnerColor,
  type SpinnerSize,
  spinnerAppearance,
} from '../../../../../components/src/elements/spinner/spinner.appearance';

export const PSpinner = defineComponent({
  name: 'PSpinner',
  inheritAttrs: false,
  props: {
    color: { type: String as PropType<SpinnerColor>, default: undefined },
    size: { type: [String, Object] as PropType<Responsive<SpinnerSize>>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = spinnerAppearance({ color: props.color, size: props.size });
      const { class: extraClass, ...rest } = attrs;

      return h(
        'svg',
        {
          role: 'alert',
          'aria-live': 'assertive',
          focusable: 'false',
          ...rest,
          ...appearance.attrs,
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: SPINNER_VIEWBOX,
          class: [appearance.className, extraClass],
        },
        [h('circle', { r: '11' }), h('circle', { r: '11' }), slots.default?.()]
      );
    };
  },
});
