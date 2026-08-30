import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  MODAL_DISMISS_CLASS,
  MODAL_PANEL_CLASS,
  MODAL_SCROLLER_CLASS,
  type ModalBackdrop,
  type ModalBackground,
  modalAppearance,
} from '../../../../../components/src/elements/modal/modal.appearance';

export const PModal = defineComponent({
  name: 'PModal',
  inheritAttrs: false,
  props: {
    background: { type: String as PropType<ModalBackground>, default: undefined },
    backdrop: { type: String as PropType<ModalBackdrop>, default: undefined },
    fullscreen: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    dismissButton: { type: Boolean, default: true },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = modalAppearance({
        background: props.background,
        backdrop: props.backdrop,
        fullscreen: props.fullscreen,
      });
      const { class: extraClass, ...rest } = attrs;

      return h(
        'dialog',
        {
          'aria-modal': 'true',
          tabindex: -1,
          ...rest,
          ...appearance.attrs,
          class: [appearance.className, extraClass],
        },
        [
          h('div', { class: MODAL_SCROLLER_CLASS }, [
            h('div', { class: MODAL_PANEL_CLASS }, [
              ...(props.dismissButton
                ? [
                    h('button', { type: 'button', class: MODAL_DISMISS_CLASS, 'aria-label': 'Dismiss modal' }, [
                      h('span', 'Dismiss modal'),
                    ]),
                  ]
                : []),
              slots.default?.(),
            ]),
          ]),
        ]
      );
    };
  },
});
