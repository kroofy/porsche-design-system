import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const root = join(import.meta.dirname, '../../components/src/elements');
const dest = join(import.meta.dirname, '../projects/angular-wrapper/src/elements/core');

const files = [
  'appearance.ts',
  'accordion/accordion.appearance.ts',
  'field-ids.ts',
  'button/button.appearance.ts',
  'button-pure/button-pure.appearance.ts',
  'crest/crest.appearance.ts',
  'crest/crest-url.ts',
  'divider/divider.appearance.ts',
  'display/display.appearance.ts',
  'fieldset/fieldset.appearance.ts',
  'flag/flag.appearance.ts',
  'flag/flag-url.ts',
  'heading/heading.appearance.ts',
  'text/text.appearance.ts',
  'text-list/text-list.appearance.ts',
  'table/table.appearance.ts',
  'tag/tag.appearance.ts',
  'spinner/spinner.appearance.ts',
  'modal/modal.appearance.ts',
  'link/link.appearance.ts',
  'link-pure/link-pure.appearance.ts',
  'icon/icon.appearance.ts',
  'icon/icon-url.ts',
  'input/input.appearance.ts',
  'label/label.appearance.ts',
  'model-signature/model-signature.appearance.ts',
  'model-signature/model-signature-url.ts',
  'wordmark/wordmark.appearance.ts',
  'wordmark/wordmark-svg.ts',
];

for (const file of files) {
  const to = join(dest, file);
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(join(root, file), to);
}

const { ICONS_MANIFEST } = createRequire(import.meta.url)('@porsche-design-system/icons');
writeFileSync(
  join(dest, 'icon/icons-manifest.ts'),
  `export const ICONS_MANIFEST = ${JSON.stringify(ICONS_MANIFEST)} as const;\n`
);

const iconUrl = join(dest, 'icon/icon-url.ts');
writeFileSync(
  iconUrl,
  readFileSync(iconUrl, 'utf8').replace("from '@porsche-design-system/icons'", "from './icons-manifest'")
);

const { CRESTS_MANIFEST, FLAGS_MANIFEST, MODEL_SIGNATURES_MANIFEST } = createRequire(import.meta.url)(
  '@porsche-design-system/assets'
);

writeFileSync(
  join(dest, 'flag/flags-manifest.ts'),
  `export const FLAGS_MANIFEST = ${JSON.stringify(FLAGS_MANIFEST)} as const;\n`
);
writeFileSync(
  join(dest, 'crest/crests-manifest.ts'),
  `export const CRESTS_MANIFEST = ${JSON.stringify(CRESTS_MANIFEST)} as const;\n`
);
writeFileSync(
  join(dest, 'model-signature/model-signatures-manifest.ts'),
  `export const MODEL_SIGNATURES_MANIFEST = ${JSON.stringify(MODEL_SIGNATURES_MANIFEST)} as const;\n`
);

for (const [file, manifest] of [
  ['flag/flag-url.ts', './flags-manifest'],
  ['crest/crest-url.ts', './crests-manifest'],
  ['model-signature/model-signature-url.ts', './model-signatures-manifest'],
] as const) {
  const path = join(dest, file);
  writeFileSync(path, readFileSync(path, 'utf8').replace("from '@porsche-design-system/assets'", `from '${manifest}'`));
}
