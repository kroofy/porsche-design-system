import { camelCase } from 'change-case';
import { sync as globbySync } from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

const INTERNAL_TAG_NAMES = ['p-toast-item'];

const TAG_NAME_FROM_METADATA = /tagName:\s*['"]([a-z-]+)['"]/;

const generateTagNames = (): void => {
  const mitosisSourceDirectory = path.resolve('../components/mitosis');
  const componentFiles = globbySync(`${mitosisSourceDirectory}/**/*.lite.tsx`);

  const tags = [
    ...new Set(
      componentFiles
        .map((file) => {
          const fileContent = fs.readFileSync(file, 'utf8');
          const [, tag] = TAG_NAME_FROM_METADATA.exec(fileContent) || [];
          return tag;
        })
        .filter((tag): tag is string => Boolean(tag))
    ),
  ].sort();

  const camelUnion = tags.length ? tags.map((tag) => `'${camelCase(tag)}'`).join(' | ') : 'never';

  const content = `export const TAG_NAMES = [${tags.map((tag) => `'${tag}'`).join(', ')}] as const;
export type TagName = typeof TAG_NAMES[number];

// TODO: replace with generic in TS4.1: https://stackoverflow.com/questions/57807009/typescript-generic-to-turn-underscore-object-to-camel-case
export type TagNameCamelCase = ${camelUnion};

export const INTERNAL_TAG_NAMES: TagName[] = [${INTERNAL_TAG_NAMES.map((tag) => `'${tag}'`).join(', ')}];
`;

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'tagNames.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(['INTERNAL_TAG_NAMES:', ...INTERNAL_TAG_NAMES.map((tag) => `– ${tag}`)].join('\n'));
  console.log(`Generated ${targetFileName} for ${tags.length} tags`);
};

generateTagNames();
