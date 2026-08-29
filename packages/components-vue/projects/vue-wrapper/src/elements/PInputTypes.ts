import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import { type FieldState, type NativeInputType, inputAppearance } from '../../../../../components/src/elements/input';

const nativeInputProps = (defaultType: NativeInputType) => ({
  compact: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
  state: { type: String as PropType<FieldState>, default: undefined },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String as PropType<NativeInputType>, default: defaultType },
});

export const createNativeInput = (defaultType: NativeInputType, name: string) =>
  defineComponent({
    name,
    inheritAttrs: false,
    props: nativeInputProps(defaultType),
    setup(props, { attrs }) {
      return () => {
        const appearance = inputAppearance({
          compact: props.compact,
          state: props.state,
          loading: props.loading,
        });
        const { class: extraClass, ...rest } = attrs;

        return h('input', {
          ...rest,
          ...appearance.attrs,
          type: props.type,
          disabled: Boolean(props.disabled || props.loading),
          'aria-busy': props.loading || undefined,
          dir: 'auto',
          class: [appearance.className, extraClass],
        });
      };
    },
  });

export const PInputEmail = createNativeInput('email', 'PInputEmail');
export const PInputTel = createNativeInput('tel', 'PInputTel');
export const PInputUrl = createNativeInput('url', 'PInputUrl');
export const PInputSearch = createNativeInput('search', 'PInputSearch');
export const PInputPassword = createNativeInput('password', 'PInputPassword');
export const PInputNumber = createNativeInput('number', 'PInputNumber');
export const PInputDate = createNativeInput('date', 'PInputDate');
export const PInputTime = createNativeInput('time', 'PInputTime');
export const PInputMonth = createNativeInput('month', 'PInputMonth');
export const PInputWeek = createNativeInput('week', 'PInputWeek');
