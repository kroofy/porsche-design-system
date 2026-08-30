import { FLAGS_MANIFEST } from '@porsche-design-system/assets';

export const PDS_CDN = 'https://cdn.ui.porsche.com/porsche-design-system';
export const DEFAULT_FLAG_NAME = 'de' as const;

export type FlagName = keyof typeof FLAGS_MANIFEST;

export const nativeFlagUrl = (name: string): string => {
  const file = FLAGS_MANIFEST[name as FlagName] || FLAGS_MANIFEST.xx;
  return `${PDS_CDN}/flags/${file}`;
};
