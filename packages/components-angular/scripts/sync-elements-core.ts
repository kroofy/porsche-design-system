import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const root = join(import.meta.dirname, '../../components/src/elements');
const dest = join(import.meta.dirname, '../projects/angular-wrapper/src/elements/core');

const files = [
  'appearance.ts',
  'field-ids.ts',
  'button/button.appearance.ts',
  'link/link.appearance.ts',
  'icon/icon.appearance.ts',
  'icon/icon-url.ts',
  'input/input.appearance.ts',
  'label/label.appearance.ts',
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
  readFileSync(iconUrl, 'utf8').replace(
    "from '@porsche-design-system/icons'",
    "from './icons-manifest'"
  )
);
