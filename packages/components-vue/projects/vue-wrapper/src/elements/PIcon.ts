import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  type IconColor,
  type IconSize,
  iconAppearance,
  nativeIconUrl,
} from '../../../../../components/src/elements/icon';

export const PIcon = defineComponent({
  name: 'PIcon',
  inheritAttrs: false,
  props: {
    name: { type: String, default: 'arrow-right' },
    source: { type: String, default: undefined },
    color: { type: String as PropType<IconColor>, default: undefined },
    size: { type: [String, Object] as PropType<Responsive<IconSize>>, default: undefined },
  },
  setup(props, { attrs }) {
    return () => {
      const appearance = iconAppearance({
        name: props.source ? undefined : props.name,
        color: props.color,
        size: props.size,
      });
      const url = props.source || nativeIconUrl(props.name);
      const { class: extraClass, style, ...rest } = attrs;

      return h('img', {
        ...rest,
        ...appearance.attrs,
        src: url,
        alt: typeof rest.alt === 'string' ? rest.alt : '',
        width: 24,
        height: 24,
        loading: 'lazy',
        class: [appearance.className, extraClass],
        style: props.source ? { ['--_p-icon-mask']: `url("${url}")`, ...(style as object) } : style,
      });
    };
  },
});
