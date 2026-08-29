import { ICONS_MANIFEST } from '@porsche-design-system/icons';

export const PDS_ICON_CDN = 'https://cdn.ui.porsche.com/porsche-design-system';
export const DEFAULT_ICON_NAME = 'arrow-right' as const;

export const nativeIconUrl = (name: string): string => {
  const file = ICONS_MANIFEST[name as keyof typeof ICONS_MANIFEST];
  if (!file) {
    return nativeIconUrl(DEFAULT_ICON_NAME);
  }
  return `${PDS_ICON_CDN}/icons/${file}`;
};
