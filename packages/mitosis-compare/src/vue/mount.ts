import { createApp, defineComponent, h, type Component } from 'vue';
import { DEMOS, pascal } from '../catalog';
import { hostClass } from '../host';

const modules = import.meta.glob('../../../../packages/components/mitosis/*/output/frameworks/vue/*.vue');

const byTag = new Map<string, () => Promise<{ default: Component }>>();
for (const [path, loader] of Object.entries(modules)) {
  const match = path.match(/mitosis\/([^/]+)\/output\/frameworks\/vue\/([^/]+)\.vue$/);
  if (!match) continue;
  byTag.set(match[1], loader as () => Promise<{ default: Component }>);
}

async function load(tag: string) {
  const loader = byTag.get(tag);
  if (!loader) return null;
  return (await loader()).default;
}

export async function mountVue() {
  const extra = [
    'text-list-item',
    'radio-group-option',
    'segmented-control-item',
    'stepper-horizontal-item',
    'table-head',
    'table-head-row',
    'table-head-cell',
    'table-body',
    'table-row',
    'table-cell',
    'tabs-item',
  ];
  const comps: Record<string, Component> = {};
  for (const tag of [...new Set([...DEMOS.map((d) => d.tag), ...extra])]) {
    const Comp = await load(tag);
    if (Comp) comps[tag] = Comp;
  }

  for (const demo of DEMOS) {
    const el = document.querySelector(`[data-cell="vue:${demo.tag}"]`);
    if (!el) continue;
    const Comp = comps[demo.tag];
    if (!Comp) {
      el.textContent = `missing ${pascal(demo.tag)}.vue`;
      continue;
    }

    const Root = defineComponent({
      setup() {
        const child = demo.child;
        const children: ReturnType<typeof h>[] = [];
        if (child && 'text' in child) children.push(h('span', child.text));
        if (child && 'img' in child) children.push(h('img', { src: child.img.src, alt: child.img.alt }));
        if (child && 'buttons' in child) {
          for (const label of child.buttons) children.push(h('button', { type: 'button' }, label));
        }
        if (child && 'items' in child && comps['text-list-item']) {
          for (const label of child.items) children.push(h(comps['text-list-item'], null, { default: () => label }));
        }
        if (child && 'radio' in child && comps['radio-group-option']) {
          for (const opt of child.radio) {
            children.push(h(comps['radio-group-option'], { value: opt.value, label: opt.label }));
          }
        }
        if (child && 'segmented' in child && comps['segmented-control-item']) {
          for (const opt of child.segmented) {
            children.push(h(comps['segmented-control-item'], { value: opt.value }, { default: () => opt.label }));
          }
        }
        if (child && 'steps' in child && comps['stepper-horizontal-item']) {
          for (const step of child.steps) {
            children.push(
              h(comps['stepper-horizontal-item'], { state: step.state }, { default: () => step.label })
            );
          }
        }
        if (child && 'table' in child) {
          const Head = comps['table-head'];
          const HeadRow = comps['table-head-row'];
          const HeadCell = comps['table-head-cell'];
          const Body = comps['table-body'];
          const Row = comps['table-row'];
          const Cell = comps['table-cell'];
          if (Head && HeadRow && HeadCell && Body && Row && Cell) {
            children.push(
              h(Head, null, {
                default: () =>
                  h(HeadRow, null, {
                    default: () => child.table.head.map((label) => h(HeadCell, null, { default: () => label })),
                  }),
              })
            );
            children.push(
              h(Body, null, {
                default: () =>
                  child.table.rows.map((row) =>
                    h(Row, null, { default: () => row.map((cell) => h(Cell, null, { default: () => cell })) })
                  ),
              })
            );
          }
        }
        return () => h('div', { class: hostClass(demo.tag) }, [h(Comp, demo.props ?? {}, { default: () => children })]);
      },
    });

    createApp(Root).mount(el);
  }
}
