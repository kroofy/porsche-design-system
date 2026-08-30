import { defineComponent, h, type PropType } from 'vue';
import {
  SHEET_DISMISS_CLASS,
  SHEET_PANEL_CLASS,
  SHEET_SCROLLER_CLASS,
  type SheetBackground,
  sheetAppearance,
} from '../../../../../components/src/elements/sheet/sheet.appearance';

export const PSheet = defineComponent({
  name: 'PSheet',
  inheritAttrs: false,
  props: {
    background: { type: String as PropType<SheetBackground>, default: undefined },
    dismissButton: { type: Boolean, default: true },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = sheetAppearance({ background: props.background });
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
          h('div', { class: SHEET_SCROLLER_CLASS }, [
            h('div', { class: SHEET_PANEL_CLASS }, [
              ...(props.dismissButton
                ? [
                    h('button', { type: 'button', class: SHEET_DISMISS_CLASS, 'aria-label': 'Dismiss sheet' }, [
                      h('span', 'Dismiss sheet'),
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
