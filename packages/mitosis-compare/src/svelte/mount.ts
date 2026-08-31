import Host from './Host.svelte';
import { DEMOS, pascal } from '../catalog';
import { openCompareRoot } from '../host';

const modules = import.meta.glob('../../../../packages/components/mitosis/*/output/frameworks/svelte/*.svelte');

const byTag = new Map<string, () => Promise<{ default: any }>>();
for (const [path, loader] of Object.entries(modules)) {
  const match = path.match(/mitosis\/([^/]+)\/output\/frameworks\/svelte\/([^/]+)\.svelte$/);
  if (!match) continue;
  byTag.set(match[1], loader as any);
}

async function load(tag: string) {
  const loader = byTag.get(tag);
  if (!loader) return null;
  return (await loader()).default;
}

export async function mountSvelte() {
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
  const comps: Record<string, any> = {};
  for (const tag of [...new Set([...DEMOS.map((d) => d.tag), ...extra])]) {
    try {
      const Comp = await load(tag);
      if (Comp) comps[tag] = Comp;
    } catch (error) {
      console.warn(`svelte load ${tag}`, error);
    }
  }

  for (const demo of DEMOS) {
    const el = document.querySelector(`[data-cell="svelte:${demo.tag}"]`) as HTMLElement | null;
    if (!el) continue;
    const Cmp = comps[demo.tag];
    el.dataset.svelte = Cmp ? 'loaded' : 'missing';
    if (!Cmp) {
      el.textContent = `missing ${pascal(demo.tag)}.svelte`;
      continue;
    }

    const child = demo.child;
    const text = child && 'text' in child ? child.text : '';
    const img = child && 'img' in child ? child.img : null;

    try {
      const mount = openCompareRoot(el, demo.tag);
      new Host({
        target: mount,
        props: { Cmp, props: demo.props ?? {}, text, img, tag: demo.tag },
      });

      const slotTarget = mount;
      if (child && 'buttons' in child) {
        for (const label of child.buttons) {
          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = label;
          slotTarget.append(button);
        }
      } else if (child && 'items' in child && comps['text-list-item']) {
        for (const label of child.items) {
          new Host({
            target: slotTarget,
            props: { Cmp: comps['text-list-item'], props: {}, text: label, tag: 'text-list-item' },
          });
        }
      } else if (child && 'radio' in child && comps['radio-group-option']) {
        for (const opt of child.radio) {
          new Host({
            target: slotTarget,
            props: {
              Cmp: comps['radio-group-option'],
              props: { value: opt.value, label: opt.label },
              tag: 'radio-group-option',
            },
          });
        }
      } else if (child && 'segmented' in child && comps['segmented-control-item']) {
        for (const opt of child.segmented) {
          new Host({
            target: slotTarget,
            props: {
              Cmp: comps['segmented-control-item'],
              props: { value: opt.value },
              text: opt.label,
              tag: 'segmented-control-item',
            },
          });
        }
      } else if (child && 'steps' in child && comps['stepper-horizontal-item']) {
        for (const step of child.steps) {
          new Host({
            target: slotTarget,
            props: {
              Cmp: comps['stepper-horizontal-item'],
              props: { state: step.state },
              text: step.label,
              tag: 'stepper-horizontal-item',
            },
          });
        }
      } else if (child && 'table' in child && comps['table-head']) {
        const note = document.createElement('div');
        note.textContent = `${child.table.head.join(' / ')} — ${child.table.rows.map((row) => row.join(' ')).join(', ')}`;
        slotTarget.append(note);
      }
      el.dataset.svelte = 'mounted';
    } catch (error) {
      el.dataset.svelte = 'failed';
      el.textContent = `svelte render failed: ${(error as Error).message}`;
    }
  }
}
