import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  BUTTON_ICON_CLASS,
  BUTTON_LABEL_CLASS,
  BUTTON_SPINNER_CLASS,
  type ButtonVariant,
  buttonAppearance,
} from '../../../../../components/src/elements/button/button.appearance';
import { PIcon } from './PIcon';

export const PButton = defineComponent({
  name: 'PButton',
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<ButtonVariant>, default: undefined },
    icon: { type: String, default: 'none' },
    hideLabel: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    compact: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'submit' },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = buttonAppearance({
        variant: props.variant,
        icon: props.icon,
        hideLabel: props.hideLabel,
        compact: props.compact,
        loading: props.loading,
      });
      const { class: extraClass, ...rest } = attrs;

      return h(
        'button',
        {
          ...rest,
          ...appearance.attrs,
          type: props.type,
          disabled: Boolean(props.disabled || props.loading),
          'aria-busy': props.loading || undefined,
          class: [appearance.className, extraClass],
        },
        [
          ...(props.icon !== 'none'
            ? [
                h(PIcon, {
                  class: BUTTON_ICON_CLASS,
                  name: props.icon,
                  size: 'inherit',
                  color: 'inherit',
                  'aria-hidden': 'true',
                }),
              ]
            : []),
          ...(props.loading
            ? [
                h('span', { class: BUTTON_SPINNER_CLASS, 'aria-hidden': 'true' }, [
                  h(
                    'svg',
                    {
                      viewBox: '-16 -16 32 32',
                      width: '100%',
                      height: '100%',
                      focusable: 'false',
                      'aria-hidden': 'true',
                    },
                    [h('circle', { r: '11' }), h('circle', { r: '11' })]
                  ),
                ]),
              ]
            : []),
          h('span', { class: BUTTON_LABEL_CLASS }, slots.default?.()),
        ]
      );
    };
  },
});
