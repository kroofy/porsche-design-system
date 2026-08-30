import { defineComponent, h, type PropType } from 'vue';
import {
  type TableLayout,
  tableAppearance,
  tableBodyAppearance,
  tableCellAppearance,
  tableHeadAppearance,
  tableHeadCellAppearance,
  tableRowAppearance,
} from '../../../../../components/src/elements/table/table.appearance';

const listTag = (
  tag: string,
  appearance: { className: string; attrs: Record<string, string> },
  attrs: Record<string, unknown>,
  slots: { default?: () => unknown }
) => {
  const { class: extraClass, ...rest } = attrs;
  return h(
    tag,
    {
      ...rest,
      ...appearance.attrs,
      class: [appearance.className, extraClass],
    },
    slots.default?.()
  );
};

export const PTable = defineComponent({
  name: 'PTable',
  inheritAttrs: false,
  props: {
    compact: { type: Boolean, default: false },
    layout: { type: String as PropType<TableLayout>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => listTag('table', tableAppearance({ compact: props.compact, layout: props.layout }), attrs, slots);
  },
});

export const PTableHead = defineComponent({
  name: 'PTableHead',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => listTag('thead', tableHeadAppearance(), attrs, slots);
  },
});

export const PTableBody = defineComponent({
  name: 'PTableBody',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => listTag('tbody', tableBodyAppearance(), attrs, slots);
  },
});

export const PTableRow = defineComponent({
  name: 'PTableRow',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => listTag('tr', tableRowAppearance(), attrs, slots);
  },
});

export const PTableHeadCell = defineComponent({
  name: 'PTableHeadCell',
  inheritAttrs: false,
  props: {
    hideLabel: { type: Boolean, default: false },
    multiline: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = tableHeadCellAppearance({ hideLabel: props.hideLabel, multiline: props.multiline });
      const { class: extraClass, ...rest } = attrs;
      return h(
        'th',
        {
          ...rest,
          ...appearance.attrs,
          scope: (rest.scope as string) || 'col',
          class: [appearance.className, extraClass],
        },
        slots.default?.()
      );
    };
  },
});

export const PTableCell = defineComponent({
  name: 'PTableCell',
  inheritAttrs: false,
  props: {
    multiline: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () => listTag('td', tableCellAppearance({ multiline: props.multiline }), attrs, slots);
  },
});
