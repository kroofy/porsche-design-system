export type DemoChild =
  | { text: string }
  | { img: { src: string; alt: string } }
  | { buttons: string[] }
  | { items: string[] }
  | { radio: { value: string; label: string }[] }
  | { segmented: { value: string; label: string }[] }
  | { steps: { state?: string; label: string }[] }
  | { table: { head: string[]; rows: string[][] } };

export type Demo = {
  tag: string;
  title: string;
  props?: Record<string, unknown>;
  child?: DemoChild;
};

export const OVERLAY_TAGS = [
  'banner',
  'modal',
  'flyout',
  'sheet',
  'toast',
  'toast-item',
  'popover',
  'drilldown',
  'drilldown-item',
  'drilldown-link',
  'canvas',
  'carousel',
  'select',
  'multi-select',
] as const;

export const CHILD_ONLY_TAGS = [
  'text-list-item',
  'table-head',
  'table-head-row',
  'table-head-cell',
  'table-body',
  'table-row',
  'table-cell',
  'segmented-control-item',
  'radio-group-option',
  'select-option',
  'multi-select-option',
  'optgroup',
  'tabs-item',
  'stepper-horizontal-item',
] as const;

export const DEMOS: Demo[] = [
  { tag: 'crest', title: 'crest', props: { href: '#' } },
  { tag: 'wordmark', title: 'wordmark', props: { href: '#' } },
  { tag: 'flag', title: 'flag', props: { name: 'de' } },
  { tag: 'model-signature', title: 'model-signature', props: { model: '911', color: 'primary' } },
  { tag: 'icon', title: 'icon', props: { name: 'car', size: 'large' } },
  { tag: 'divider', title: 'divider', props: { color: 'contrast-high' } },
  { tag: 'spinner', title: 'spinner', props: { size: 'medium' } },
  { tag: 'heading', title: 'heading', props: { size: 'large', tag: 'h2' }, child: { text: 'Heading' } },
  { tag: 'text', title: 'text', props: { size: 'small' }, child: { text: 'The quick brown fox jumps over the lazy dog.' } },
  { tag: 'display', title: 'display', props: { size: 'medium' }, child: { text: 'Display' } },
  { tag: 'tag', title: 'tag', props: { variant: 'primary', icon: 'car' }, child: { text: 'Tag' } },
  { tag: 'tag-dismissible', title: 'tag-dismissible', child: { text: 'Dismissible' } },
  { tag: 'ai-tag', title: 'ai-tag' },
  { tag: 'button', title: 'button', props: { variant: 'primary' }, child: { text: 'Button' } },
  { tag: 'button-pure', title: 'button-pure', props: { size: 'medium' }, child: { text: 'Button Pure' } },
  { tag: 'link', title: 'link', props: { href: '#' }, child: { text: 'Link' } },
  { tag: 'link-pure', title: 'link-pure', props: { href: '#' }, child: { text: 'Link Pure' } },
  { tag: 'switch', title: 'switch', props: { checked: true }, child: { text: 'Switch' } },
  { tag: 'checkbox', title: 'checkbox', props: { label: 'Checkbox', checked: true } },
  { tag: 'input-text', title: 'input-text', props: { label: 'Name', value: 'Porsche' } },
  { tag: 'input-email', title: 'input-email', props: { label: 'Email', value: 'dev@porsche.com' } },
  { tag: 'input-password', title: 'input-password', props: { label: 'Password', value: 'secret' } },
  { tag: 'input-search', title: 'input-search', props: { label: 'Search', value: '911' } },
  { tag: 'input-url', title: 'input-url', props: { label: 'URL', value: 'https://porsche.com' } },
  { tag: 'input-tel', title: 'input-tel', props: { label: 'Phone', value: '+49 711 0000' } },
  { tag: 'input-number', title: 'input-number', props: { label: 'Quantity', value: '2' } },
  { tag: 'input-date', title: 'input-date', props: { label: 'Date', value: '2026-08-31' } },
  { tag: 'input-month', title: 'input-month', props: { label: 'Month', value: '2026-08' } },
  { tag: 'input-time', title: 'input-time', props: { label: 'Time', value: '10:30' } },
  { tag: 'input-week', title: 'input-week', props: { label: 'Week', value: '2026-W36' } },
  { tag: 'textarea', title: 'textarea', props: { label: 'Message', value: 'Side-by-side Mitosis emit.' } },
  { tag: 'fieldset', title: 'fieldset', props: { label: 'Fieldset' }, child: { text: 'Grouped fields' } },
  { tag: 'text-list', title: 'text-list', props: { type: 'unordered' }, child: { items: ['One', 'Two', 'Three'] } },
  {
    tag: 'inline-notification',
    title: 'inline-notification',
    props: { heading: 'Notice', description: 'Shown without opening a dialog.', state: 'info' },
  },
  { tag: 'pagination', title: 'pagination', props: { totalItemsCount: 25, itemsPerPage: 5, activePage: 2 } },
  { tag: 'pin-code', title: 'pin-code', props: { label: 'PIN' } },
  { tag: 'accordion', title: 'accordion', props: { heading: 'Summary', open: true }, child: { text: 'Accordion body stays in flow.' } },
  {
    tag: 'segmented-control',
    title: 'segmented-control',
    props: { value: 'b' },
    child: {
      segmented: [
        { value: 'a', label: 'Day' },
        { value: 'b', label: 'Week' },
        { value: 'c', label: 'Month' },
      ],
    },
  },
  {
    tag: 'radio-group',
    title: 'radio-group',
    props: { name: 'compare-radio', value: 'b', label: 'Options' },
    child: {
      radio: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
      ],
    },
  },
  {
    tag: 'tabs-bar',
    title: 'tabs-bar',
    props: { activeTabIndex: 0 },
    child: { buttons: ['Tab one', 'Tab two', 'Tab three'] },
  },
  {
    tag: 'stepper-horizontal',
    title: 'stepper-horizontal',
    child: {
      steps: [
        { state: 'complete', label: 'Start' },
        { state: 'current', label: 'Review' },
        { label: 'Done' },
      ],
    },
  },
  {
    tag: 'button-tile',
    title: 'button-tile',
    props: { label: 'Some label', description: 'Some description', aspectRatio: '16/9' },
    child: { img: { src: '/pds-assets/cayenne.png', alt: 'Cayenne' } },
  },
  {
    tag: 'link-tile',
    title: 'link-tile',
    props: { href: '#', label: 'Some label', description: 'Some description', aspectRatio: '16/9' },
    child: { img: { src: '/pds-assets/cayenne.png', alt: 'Cayenne' } },
  },
  {
    tag: 'link-tile-product',
    title: 'link-tile-product',
    props: { heading: 'Cayenne', price: '718,00 €', href: '#' },
    child: { img: { src: '/pds-assets/cayenne.png', alt: 'Cayenne' } },
  },
  {
    tag: 'table',
    title: 'table',
    child: {
      table: {
        head: ['Model', 'Year'],
        rows: [
          ['911', '1964'],
          ['Cayenne', '2002'],
        ],
      },
    },
  },
  {
    tag: 'scroller',
    title: 'scroller',
    child: { buttons: ['One', 'Two', 'Three', 'Four', 'Five'] },
  },
  {
    tag: 'tabs',
    title: 'tabs',
    props: { activeTabIndex: 0 },
    child: { buttons: ['First', 'Second'] },
  },
];

export const pascal = (tag: string) =>
  tag
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
