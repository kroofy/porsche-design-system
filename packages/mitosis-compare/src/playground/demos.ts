/** Child tree shared by every target renderer. `c` = PDS component (tag without `p-`), `el` = plain HTML. */
export type DemoNode =
  | string
  | { c: string; props?: Record<string, unknown>; children?: DemoNode[]; slot?: string }
  | { el: string; attrs?: Record<string, string>; children?: DemoNode[]; slot?: string };

export type Variant = { name: string; props?: Record<string, unknown>; children?: DemoNode[] };

export type Demo = {
  tag: string;
  group: string;
  /** Overlay demos render one variant per fixed-height frame. */
  stage?: boolean;
  variants: Variant[];
};

export const IMAGE = 'pds-assets/lights.jpg';

const c = (tag: string, props?: Record<string, unknown>, children?: DemoNode[], slot?: string): DemoNode => ({
  c: tag,
  props,
  children,
  slot,
});
const el = (tag: string, attrs?: Record<string, string>, children?: DemoNode[], slot?: string): DemoNode => ({
  el: tag,
  attrs,
  children,
  slot,
});
const img = (slot?: string) => el('img', { src: IMAGE, alt: 'Porsche lights' }, undefined, slot);

const inputVariants = (label: string, value: string, extra: Record<string, unknown> = {}): Variant[] => [
  { name: 'default', props: { label, value, ...extra } },
  {
    name: 'description + placeholder',
    props: { label, description: 'Some description', placeholder: 'Placeholder', ...extra },
  },
  { name: 'compact', props: { label, value, compact: true, ...extra } },
  { name: 'error', props: { label, value, state: 'error', message: 'Some error message', ...extra } },
  { name: 'success', props: { label, value, state: 'success', message: 'Some success message', ...extra } },
  { name: 'disabled', props: { label, value, disabled: true, ...extra } },
  { name: 'loading', props: { label, value, loading: true, ...extra } },
  { name: 'hide-label', props: { label, value, hideLabel: true, ...extra } },
];

const options = (tag: string, labels: string[]) =>
  labels.map((label, i) => c(tag, { value: String.fromCharCode(97 + i) }, [label]));

const tableChildren = (): DemoNode[] => [
  c('table-head', {}, [
    c('table-head-row', {}, [
      c('table-head-cell', {}, ['Model']),
      c('table-head-cell', {}, ['Year']),
      c('table-head-cell', {}, ['Power']),
    ]),
  ]),
  c('table-body', {}, [
    c('table-row', {}, [
      c('table-cell', {}, ['911 Carrera']),
      c('table-cell', {}, ['1964']),
      c('table-cell', {}, ['290 kW']),
    ]),
    c('table-row', {}, [
      c('table-cell', {}, ['Cayenne']),
      c('table-cell', {}, ['2002']),
      c('table-cell', {}, ['260 kW']),
    ]),
    c('table-row', {}, [
      c('table-cell', {}, ['Taycan']),
      c('table-cell', {}, ['2019']),
      c('table-cell', {}, ['300 kW']),
    ]),
  ]),
];

const lorem = 'The quick brown fox jumps over the lazy dog.';

export const DEMOS: Demo[] = [
  // Basic
  {
    tag: 'button',
    group: 'Actions',
    variants: [
      { name: 'primary', props: { variant: 'primary' }, children: ['Some label'] },
      { name: 'secondary', props: { variant: 'secondary' }, children: ['Some label'] },
      { name: 'destructive', props: { variant: 'destructive' }, children: ['Some label'] },
      { name: 'icon', props: { variant: 'primary', icon: 'car' }, children: ['Some label'] },
      { name: 'compact', props: { variant: 'primary', compact: true }, children: ['Some label'] },
      {
        name: 'hide-label',
        props: { variant: 'primary', icon: 'arrow-right', hideLabel: true },
        children: ['Some label'],
      },
      { name: 'disabled', props: { variant: 'primary', disabled: true }, children: ['Some label'] },
      { name: 'loading', props: { variant: 'primary', loading: true }, children: ['Some label'] },
    ],
  },
  {
    tag: 'button-pure',
    group: 'Actions',
    variants: [
      { name: 'default', props: {}, children: ['Some label'] },
      { name: 'icon wrench', props: { icon: 'wrench' }, children: ['Some label'] },
      { name: 'size lg', props: { size: 'lg' }, children: ['Some label'] },
      { name: 'underline', props: { underline: true }, children: ['Some label'] },
      { name: 'active', props: { active: true }, children: ['Some label'] },
      { name: 'align-label start', props: { alignLabel: 'start' }, children: ['Some label'] },
      { name: 'disabled', props: { disabled: true }, children: ['Some label'] },
      { name: 'loading', props: { loading: true }, children: ['Some label'] },
    ],
  },
  {
    tag: 'button-tile',
    group: 'Actions',
    variants: [
      {
        name: 'default',
        props: { label: 'Some label', description: 'Some description', aspectRatio: '16/9' },
        children: [img()],
      },
      {
        name: 'compact',
        props: { label: 'Some label', description: 'Some description', aspectRatio: '16/9', compact: true },
        children: [img()],
      },
      {
        name: 'align top',
        props: { label: 'Some label', description: 'Some description', aspectRatio: '16/9', align: 'top' },
        children: [img()],
      },
      {
        name: 'disabled',
        props: { label: 'Some label', description: 'Some description', aspectRatio: '16/9', disabled: true },
        children: [img()],
      },
    ],
  },
  {
    tag: 'link',
    group: 'Actions',
    variants: [
      { name: 'primary', props: { href: '#', variant: 'primary' }, children: ['Some label'] },
      { name: 'secondary', props: { href: '#', variant: 'secondary' }, children: ['Some label'] },
      { name: 'icon', props: { href: '#', icon: 'car' }, children: ['Some label'] },
      { name: 'compact', props: { href: '#', compact: true }, children: ['Some label'] },
      { name: 'hide-label', props: { href: '#', icon: 'arrow-right', hideLabel: true }, children: ['Some label'] },
      { name: 'no href (plain text)', props: {}, children: ['Some label'] },
    ],
  },
  {
    tag: 'link-pure',
    group: 'Actions',
    variants: [
      { name: 'default', props: { href: '#' }, children: ['Some label'] },
      { name: 'icon external', props: { href: '#', icon: 'external' }, children: ['Some label'] },
      { name: 'size lg', props: { href: '#', size: 'lg' }, children: ['Some label'] },
      { name: 'underline', props: { href: '#', underline: true }, children: ['Some label'] },
      { name: 'active', props: { href: '#', active: true }, children: ['Some label'] },
    ],
  },
  {
    tag: 'link-tile',
    group: 'Actions',
    variants: [
      {
        name: 'default',
        props: { href: '#', label: 'Some label', description: 'Some description', aspectRatio: '16/9' },
        children: [img()],
      },
      {
        name: 'compact',
        props: { href: '#', label: 'Some label', description: 'Some description', aspectRatio: '16/9', compact: true },
        children: [img()],
      },
      {
        name: 'gradient off',
        props: {
          href: '#',
          label: 'Some label',
          description: 'Some description',
          aspectRatio: '16/9',
          gradient: false,
        },
        children: [img()],
      },
    ],
  },
  {
    tag: 'link-tile-product',
    group: 'Actions',
    variants: [
      {
        name: 'default',
        props: { href: '#', heading: 'Some product', price: '1.911,00 €', description: 'Some description' },
        children: [img()],
      },
      {
        name: 'price original',
        props: { href: '#', heading: 'Some product', price: '1.911,00 €', priceOriginal: '2.000,00 €' },
        children: [img()],
      },
      {
        name: 'liked',
        props: { href: '#', heading: 'Some product', price: '1.911,00 €', likeButton: true, liked: true },
        children: [img()],
      },
    ],
  },
  // Typography
  {
    tag: 'heading',
    group: 'Typography',
    variants: [
      { name: 'size 2xl', props: { size: '2xl', tag: 'h2' }, children: ['Some heading'] },
      { name: 'size lg', props: { size: 'lg', tag: 'h3' }, children: ['Some heading'] },
      { name: 'weight bold', props: { size: 'md', weight: 'bold' }, children: ['Some heading'] },
      { name: 'align center', props: { size: 'md', align: 'center' }, children: ['Some heading'] },
      { name: 'color contrast-medium', props: { size: 'md', color: 'contrast-medium' }, children: ['Some heading'] },
    ],
  },
  {
    tag: 'text',
    group: 'Typography',
    variants: [
      { name: 'default', props: {}, children: [lorem] },
      { name: 'size lg', props: { size: 'lg' }, children: [lorem] },
      { name: 'weight semibold', props: { weight: 'semibold' }, children: [lorem] },
      { name: 'color contrast-medium', props: { color: 'contrast-medium' }, children: [lorem] },
      { name: 'ellipsis', props: { ellipsis: true }, children: [`${lorem} ${lorem} ${lorem} ${lorem}`] },
    ],
  },
  {
    tag: 'display',
    group: 'Typography',
    variants: [
      { name: 'size md', props: { size: 'md' }, children: ['Display'] },
      { name: 'size sm', props: { size: 'sm' }, children: ['Display'] },
      { name: 'align center', props: { size: 'sm', align: 'center' }, children: ['Display'] },
    ],
  },
  {
    tag: 'text-list',
    group: 'Typography',
    variants: [
      { name: 'unordered', props: { type: 'unordered' }, children: options('text-list-item', ['One', 'Two', 'Three']) },
      { name: 'numbered', props: { type: 'numbered' }, children: options('text-list-item', ['One', 'Two', 'Three']) },
      {
        name: 'nested',
        props: {},
        children: [
          c('text-list-item', {}, ['One', c('text-list', {}, options('text-list-item', ['Nested a', 'Nested b']))]),
          c('text-list-item', {}, ['Two']),
        ],
      },
    ],
  },
  // Visual
  {
    tag: 'icon',
    group: 'Visual',
    variants: [
      { name: 'car', props: { name: 'car' } },
      { name: 'wrench (manifest)', props: { name: 'wrench' } },
      { name: 'heart size lg', props: { name: 'heart', size: 'lg' } },
      { name: 'color error', props: { name: 'error-filled', color: 'error' } },
      { name: 'color success', props: { name: 'success-filled', color: 'success' } },
    ],
  },
  {
    tag: 'spinner',
    group: 'Visual',
    variants: [
      { name: 'small', props: { size: 'small' } },
      { name: 'medium', props: { size: 'medium' } },
      { name: 'large', props: { size: 'large' } },
    ],
  },
  {
    tag: 'divider',
    group: 'Visual',
    variants: [
      { name: 'default', props: {} },
      { name: 'contrast-high', props: { color: 'contrast-high' } },
    ],
  },
  {
    tag: 'crest',
    group: 'Visual',
    variants: [
      { name: 'default', props: {} },
      { name: 'link', props: { href: '#' } },
    ],
  },
  {
    tag: 'wordmark',
    group: 'Visual',
    variants: [
      { name: 'small', props: { size: 'small' } },
      { name: 'inherit', props: { size: 'inherit' } },
    ],
  },
  {
    tag: 'flag',
    group: 'Visual',
    variants: [
      { name: 'de', props: { name: 'de' } },
      { name: 'gb size lg', props: { name: 'gb', size: 'lg' } },
      { name: 'jp', props: { name: 'jp' } },
    ],
  },
  {
    tag: 'model-signature',
    group: 'Visual',
    variants: [
      { name: '911', props: { model: '911' } },
      { name: 'taycan', props: { model: 'taycan' } },
      { name: 'cayenne contrast-high', props: { model: 'cayenne', color: 'contrast-high' } },
    ],
  },
  {
    tag: 'tag',
    group: 'Visual',
    variants: [
      { name: 'primary', props: { variant: 'primary' }, children: ['Some label'] },
      { name: 'secondary', props: { variant: 'secondary' }, children: ['Some label'] },
      { name: 'info', props: { variant: 'info' }, children: ['Some label'] },
      { name: 'success', props: { variant: 'success' }, children: ['Some label'] },
      { name: 'warning', props: { variant: 'warning' }, children: ['Some label'] },
      { name: 'error', props: { variant: 'error' }, children: ['Some label'] },
      { name: 'icon', props: { variant: 'primary', icon: 'car' }, children: ['Some label'] },
      { name: 'compact', props: { variant: 'primary', compact: true }, children: ['Some label'] },
    ],
  },
  {
    tag: 'tag-dismissible',
    group: 'Visual',
    variants: [
      { name: 'default', props: {}, children: ['Some label'] },
      { name: 'label', props: { label: 'Some label' }, children: ['Some value'] },
      { name: 'compact', props: { compact: true }, children: ['Some label'] },
    ],
  },
  {
    tag: 'ai-tag',
    group: 'Visual',
    variants: [
      { name: 'default', props: {} },
      { name: 'locale de', props: { locale: 'de' } },
      { name: 'locale ja', props: { locale: 'ja' } },
    ],
  },
  // Forms
  {
    tag: 'checkbox',
    group: 'Forms',
    variants: [
      { name: 'unchecked', props: { label: 'Some label' } },
      { name: 'checked', props: { label: 'Some label', checked: true } },
      { name: 'indeterminate', props: { label: 'Some label', indeterminate: true } },
      { name: 'compact', props: { label: 'Some label', checked: true, compact: true } },
      { name: 'error', props: { label: 'Some label', state: 'error', message: 'Some error message' } },
      { name: 'disabled', props: { label: 'Some label', checked: true, disabled: true } },
      { name: 'loading', props: { label: 'Some label', loading: true } },
    ],
  },
  {
    tag: 'switch',
    group: 'Forms',
    variants: [
      { name: 'off', props: {}, children: ['Some label'] },
      { name: 'on', props: { checked: true }, children: ['Some label'] },
      { name: 'compact', props: { checked: true, compact: true }, children: ['Some label'] },
      { name: 'align-label start', props: { alignLabel: 'start' }, children: ['Some label'] },
      { name: 'disabled', props: { checked: true, disabled: true }, children: ['Some label'] },
      { name: 'loading', props: { loading: true }, children: ['Some label'] },
    ],
  },
  {
    tag: 'input-text',
    group: 'Forms',
    variants: inputVariants('Some label', 'Porsche', { counter: true, maxLength: 20 }),
  },
  { tag: 'input-email', group: 'Forms', variants: inputVariants('Email', 'dev@porsche.com') },
  { tag: 'input-password', group: 'Forms', variants: inputVariants('Password', 'secret', { toggle: true }) },
  { tag: 'input-search', group: 'Forms', variants: inputVariants('Search', '911', { indicator: true, clear: true }) },
  { tag: 'input-url', group: 'Forms', variants: inputVariants('URL', 'https://porsche.com') },
  { tag: 'input-tel', group: 'Forms', variants: inputVariants('Phone', '+49 711 911 0') },
  { tag: 'input-number', group: 'Forms', variants: inputVariants('Quantity', '2', { controls: true }) },
  { tag: 'input-date', group: 'Forms', variants: inputVariants('Date', '2026-10-15') },
  { tag: 'input-month', group: 'Forms', variants: inputVariants('Month', '2026-10') },
  { tag: 'input-time', group: 'Forms', variants: inputVariants('Time', '10:30') },
  { tag: 'input-week', group: 'Forms', variants: inputVariants('Week', '2026-W42') },
  {
    tag: 'textarea',
    group: 'Forms',
    variants: [
      { name: 'default', props: { label: 'Some label', value: lorem } },
      { name: 'counter', props: { label: 'Some label', value: lorem, counter: true, maxLength: 120 } },
      { name: 'error', props: { label: 'Some label', value: lorem, state: 'error', message: 'Some error message' } },
      { name: 'disabled', props: { label: 'Some label', value: lorem, disabled: true } },
    ],
  },
  {
    tag: 'pin-code',
    group: 'Forms',
    variants: [
      { name: 'default', props: { label: 'Some label' } },
      { name: 'value', props: { label: 'Some label', value: '12' } },
      { name: 'length 6', props: { label: 'Some label', length: 6 } },
      { name: 'error', props: { label: 'Some label', state: 'error', message: 'Some error message' } },
      { name: 'disabled', props: { label: 'Some label', disabled: true } },
      { name: 'loading', props: { label: 'Some label', loading: true } },
    ],
  },
  {
    tag: 'radio-group',
    group: 'Forms',
    variants: [
      {
        name: 'default',
        props: { name: 'rg-1', label: 'Some label', value: 'b' },
        children: ['A', 'B', 'C'].map((label) =>
          c('radio-group-option', { value: label.toLowerCase(), label: `Option ${label}` })
        ),
      },
      {
        name: 'row',
        props: { name: 'rg-2', label: 'Some label', value: 'a', direction: 'row' },
        children: ['A', 'B', 'C'].map((label) =>
          c('radio-group-option', { value: label.toLowerCase(), label: `Option ${label}` })
        ),
      },
      {
        name: 'error',
        props: { name: 'rg-3', label: 'Some label', state: 'error', message: 'Some error message' },
        children: ['A', 'B'].map((label) =>
          c('radio-group-option', { value: label.toLowerCase(), label: `Option ${label}` })
        ),
      },
      {
        name: 'disabled',
        props: { name: 'rg-4', label: 'Some label', value: 'a', disabled: true },
        children: ['A', 'B'].map((label) =>
          c('radio-group-option', { value: label.toLowerCase(), label: `Option ${label}` })
        ),
      },
    ],
  },
  {
    tag: 'segmented-control',
    group: 'Forms',
    variants: [
      { name: 'default', props: { value: 'b' }, children: options('segmented-control-item', ['Day', 'Week', 'Month']) },
      {
        name: 'label + compact',
        props: { value: 'a', label: 'Some label', compact: true },
        children: options('segmented-control-item', ['Day', 'Week', 'Month']),
      },
      {
        name: 'icons',
        props: { value: 'a' },
        children: [
          c('segmented-control-item', { value: 'a', icon: 'car', label: 'Car' }),
          c('segmented-control-item', { value: 'b', icon: 'heart', label: 'Heart' }),
        ],
      },
      {
        name: 'disabled',
        props: { value: 'a', disabled: true },
        children: options('segmented-control-item', ['Day', 'Week']),
      },
    ],
  },
  {
    tag: 'select',
    group: 'Forms',
    variants: [
      {
        name: 'default',
        props: { name: 's-1', label: 'Some label', value: 'b' },
        children: options('select-option', ['Option A', 'Option B', 'Option C']),
      },
      {
        name: 'optgroup',
        props: { name: 's-2', label: 'Some label', value: 'a' },
        children: [c('optgroup', { label: 'Group 1' }, options('select-option', ['Option A', 'Option B']))],
      },
      {
        name: 'error',
        props: { name: 's-3', label: 'Some label', state: 'error', message: 'Some error message' },
        children: options('select-option', ['Option A']),
      },
      {
        name: 'disabled',
        props: { name: 's-4', label: 'Some label', value: 'a', disabled: true },
        children: options('select-option', ['Option A']),
      },
    ],
  },
  {
    tag: 'multi-select',
    group: 'Forms',
    variants: [
      {
        name: 'default',
        props: { name: 'm-1', label: 'Some label', value: ['a', 'b'] },
        children: options('multi-select-option', ['Option A', 'Option B', 'Option C']),
      },
      {
        name: 'error',
        props: { name: 'm-2', label: 'Some label', state: 'error', message: 'Some error message' },
        children: options('multi-select-option', ['Option A']),
      },
      {
        name: 'disabled',
        props: { name: 'm-3', label: 'Some label', disabled: true },
        children: options('multi-select-option', ['Option A']),
      },
    ],
  },
  {
    tag: 'fieldset',
    group: 'Forms',
    variants: [
      { name: 'default', props: { label: 'Some legend' }, children: [el('p', {}, ['Grouped fields'])] },
      {
        name: 'required + error',
        props: { label: 'Some legend', required: true, state: 'error', message: 'Some error message' },
        children: [el('p', {}, ['Grouped fields'])],
      },
    ],
  },
  // Navigation
  {
    tag: 'pagination',
    group: 'Navigation',
    variants: [
      { name: 'page 2 of 5', props: { totalItemsCount: 25, itemsPerPage: 5, activePage: 2 } },
      { name: 'page 10 of 50', props: { totalItemsCount: 500, itemsPerPage: 10, activePage: 10 } },
    ],
  },
  {
    tag: 'tabs-bar',
    group: 'Navigation',
    variants: [
      {
        name: 'default',
        props: { activeTabIndex: 0 },
        children: ['Tab one', 'Tab two', 'Tab three'].map((t) => el('button', { type: 'button' }, [t])),
      },
      {
        name: 'compact',
        props: { activeTabIndex: 1, compact: true },
        children: ['Tab one', 'Tab two', 'Tab three'].map((t) => el('button', { type: 'button' }, [t])),
      },
      {
        name: 'size lg',
        props: { activeTabIndex: 2, size: 'large' },
        children: ['Tab one', 'Tab two', 'Tab three'].map((t) => el('button', { type: 'button' }, [t])),
      },
    ],
  },
  {
    tag: 'tabs',
    group: 'Navigation',
    variants: [
      {
        name: 'default',
        props: { activeTabIndex: 0 },
        children: [
          c('tabs-item', { label: 'First' }, ['First panel']),
          c('tabs-item', { label: 'Second' }, ['Second panel']),
        ],
      },
    ],
  },
  {
    tag: 'stepper-horizontal',
    group: 'Navigation',
    variants: [
      {
        name: 'default',
        props: {},
        children: [
          c('stepper-horizontal-item', { state: 'complete' }, ['Start']),
          c('stepper-horizontal-item', { state: 'current' }, ['Review']),
          c('stepper-horizontal-item', {}, ['Done']),
        ],
      },
      {
        name: 'warning + disabled',
        props: {},
        children: [
          c('stepper-horizontal-item', { state: 'warning' }, ['Start']),
          c('stepper-horizontal-item', { state: 'current' }, ['Review']),
          c('stepper-horizontal-item', { disabled: true }, ['Done']),
        ],
      },
    ],
  },
  {
    tag: 'scroller',
    group: 'Navigation',
    variants: [
      {
        name: 'default',
        props: {},
        children: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'].map((t) =>
          el('button', { type: 'button', style: 'padding:8px 16px;white-space:nowrap' }, [t])
        ),
      },
    ],
  },
  // Content
  {
    tag: 'accordion',
    group: 'Content',
    variants: [
      { name: 'open', props: { heading: 'Some summary', open: true }, children: [lorem] },
      { name: 'closed', props: { heading: 'Some summary' }, children: [lorem] },
      { name: 'compact', props: { heading: 'Some summary', compact: true, open: true }, children: [lorem] },
    ],
  },
  {
    tag: 'inline-notification',
    group: 'Content',
    variants: [
      { name: 'info', props: { heading: 'Some heading', description: 'Some description', state: 'info' } },
      { name: 'success', props: { heading: 'Some heading', description: 'Some description', state: 'success' } },
      { name: 'warning', props: { heading: 'Some heading', description: 'Some description', state: 'warning' } },
      { name: 'error', props: { heading: 'Some heading', description: 'Some description', state: 'error' } },
      {
        name: 'action + no dismiss',
        props: { heading: 'Some heading', description: 'Some description', actionLabel: 'Retry', dismissButton: false },
      },
    ],
  },
  {
    tag: 'table',
    group: 'Content',
    variants: [
      { name: 'default', props: { caption: 'Some caption' }, children: tableChildren() },
      { name: 'compact', props: { caption: 'Some caption', compact: true }, children: tableChildren() },
    ],
  },
  {
    tag: 'carousel',
    group: 'Content',
    variants: [
      {
        name: 'default',
        props: { heading: 'Some heading', description: 'Some description' },
        children: ['1', '2', '3', '4', '5'].map((n) =>
          el(
            'div',
            {
              style:
                'height:120px;background:var(--p-color-surface);display:grid;place-items:center;border-radius:12px',
            },
            [`Slide ${n}`]
          )
        ),
      },
    ],
  },
  {
    tag: 'popover',
    group: 'Content',
    variants: [{ name: 'closed', props: { description: 'Some popover description' } }],
  },
  {
    tag: 'toast-item',
    group: 'Content',
    variants: [
      { name: 'info', props: { text: 'Some message', state: 'info' } },
      { name: 'success', props: { text: 'Some message', state: 'success' } },
    ],
  },
  // Overlays
  {
    tag: 'modal',
    group: 'Overlays',
    stage: true,
    variants: [
      {
        name: 'open',
        props: { open: true, aria: { 'aria-label': 'Some heading' } },
        children: [el('h2', { slot: 'header' }, ['Some heading']), el('p', {}, [lorem])],
      },
      {
        name: 'fullscreen',
        props: { open: true, fullscreen: true, aria: { 'aria-label': 'Some heading' } },
        children: [el('p', {}, [lorem])],
      },
    ],
  },
  {
    tag: 'flyout',
    group: 'Overlays',
    stage: true,
    variants: [
      {
        name: 'end',
        props: { open: true, aria: { 'aria-label': 'Some heading' } },
        children: [el('h2', { slot: 'header' }, ['Some heading']), el('p', {}, [lorem])],
      },
      {
        name: 'start',
        props: { open: true, position: 'start', aria: { 'aria-label': 'Some heading' } },
        children: [el('p', {}, [lorem])],
      },
    ],
  },
  {
    tag: 'sheet',
    group: 'Overlays',
    stage: true,
    variants: [
      {
        name: 'open',
        props: { open: true, aria: { 'aria-label': 'Some heading' } },
        children: [el('h2', { slot: 'header' }, ['Some heading']), el('p', {}, [lorem])],
      },
    ],
  },
  {
    tag: 'banner',
    group: 'Overlays',
    stage: true,
    variants: [
      { name: 'info', props: { open: true, heading: 'Some heading', description: 'Some description', state: 'info' } },
      {
        name: 'error',
        props: { open: true, heading: 'Some heading', description: 'Some description', state: 'error' },
      },
    ],
  },
  {
    tag: 'drilldown',
    group: 'Overlays',
    stage: true,
    variants: [
      {
        name: 'open',
        props: { open: true, aria: { 'aria-label': 'Some label' } },
        children: [
          c('drilldown-item', { identifier: 'id-1', label: 'Some label' }, [
            c('drilldown-link', { href: '#' }, ['Some link']),
            c('drilldown-link', { href: '#' }, ['Some link']),
          ]),
          c('drilldown-item', { identifier: 'id-2', label: 'Some label' }, [
            c('drilldown-link', { href: '#' }, ['Some link']),
          ]),
        ],
      },
    ],
  },
  {
    tag: 'canvas',
    group: 'Overlays',
    stage: true,
    variants: [{ name: 'default', props: {}, children: [el('p', { style: 'padding:16px' }, ['Canvas main content'])] }],
  },
];

export const DEMO_BY_TAG = new Map(DEMOS.map((demo) => [demo.tag, demo]));

/** Known gaps in the React / Vue / Svelte / Angular emit; Lit gets this behavior from build-lit-* post-processing. */
export const NOTES: Record<string, string> = {
  banner: 'Framework emit never opens: showPopover() is injected only into the Lit build.',
  carousel: 'Framework emit renders nothing: the Splide wiring is injected only into the Lit build.',
  accordion:
    'Framework emit duplicates the heading and hides the panel: the Lit template is hand-written in build-lit-accordion.',
  'button-tile':
    'Framework emit misses the inner CTA button: the Lit template is hand-written in build-lit-button-tile.',
  'link-tile': 'Framework emit misses the inner CTA link: the Lit template is hand-written in build-lit-link-tile.',
  drilldown: 'Framework emit has no level navigation: data-* state is injected only into the Lit build.',
  pagination: 'Framework emit has no page layout state: data-* flags are injected only into the Lit build.',
  scroller: 'Framework emit has no scroll indicators: data-* flags are injected only into the Lit build.',
  tabs: 'Framework emit cannot pass activeTabIndex to the tabs bar (Angular AOT error NG8002).',
  checkbox: 'indeterminate is a DOM property only; framework emit cannot set it without a ref.',
};

/** Tags only reachable as children of another demo. */
export const CHILD_TAGS = [
  'text-list-item',
  'radio-group-option',
  'segmented-control-item',
  'select-option',
  'multi-select-option',
  'optgroup',
  'tabs-item',
  'stepper-horizontal-item',
  'table-head',
  'table-head-row',
  'table-head-cell',
  'table-body',
  'table-row',
  'table-cell',
  'drilldown-item',
  'drilldown-link',
  'toast',
];

export const TARGETS = ['react', 'vue', 'svelte', 'angular', 'lit', 'upstream'] as const;
export type Target = (typeof TARGETS)[number];

export const TARGET_LABEL: Record<Target, string> = {
  react: 'React',
  vue: 'Vue',
  svelte: 'Svelte',
  angular: 'Angular',
  lit: 'Lit',
  upstream: 'Upstream 4.8.0',
};

export const pascal = (tag: string) =>
  tag
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

export const kebab = (prop: string) => prop.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

export type FrameParams = { target: Target; tag: string; theme: 'light' | 'dark'; variant?: string };

export const readParams = (search = location.search): FrameParams => {
  const params = new URLSearchParams(search);
  const target = (params.get('target') ?? 'react') as Target;
  return {
    target: (TARGETS as readonly string[]).includes(target) ? target : 'react',
    tag: params.get('tag') ?? 'button',
    theme: params.get('theme') === 'dark' ? 'dark' : 'light',
    variant: params.get('variant') ?? undefined,
  };
};
