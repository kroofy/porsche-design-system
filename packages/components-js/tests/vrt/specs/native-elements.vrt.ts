import { expect, test } from '@playwright/test';
import { schemes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../helpers';

const pages = [
  'native-button',
  'native-link',
  'native-input-text',
  'native-textarea',
  'native-checkbox',
  'native-radio',
  'native-select',
  'native-input-types',
  'native-button-pure',
  'native-link-pure',
  'native-divider',
  'native-heading',
  'native-text',
  'native-display',
  'native-fieldset',
  'native-text-list',
  'native-table',
] as const;

const waitForNativeIcons = async (page: Parameters<typeof setupScenario>[0]): Promise<void> => {
  await page.evaluate(async () => {
    const urls = new Set<string>();
    for (const el of document.querySelectorAll('#app .p-icon')) {
      const style = getComputedStyle(el);
      const mask = style.getPropertyValue('mask-image') || style.getPropertyValue('-webkit-mask-image');
      const match = /url\("?([^")]+)"?\)/.exec(mask);
      if (match?.[1]) {
        urls.add(match[1]);
      }
    }
    await Promise.all(
      [...urls].map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          })
      )
    );
  });
};

for (const pageName of pages) {
  test.describe(pageName, () => {
    for (const scheme of schemes) {
      test(`color-scheme ${scheme}`, async ({ page }) => {
        await setupScenario(page, `/${pageName}?scheme=${scheme}`, viewportWidthM);
        await waitForNativeIcons(page);
        await expect(page.locator('#app')).toHaveScreenshot(`${pageName}-${viewportWidthM}-${scheme}.png`);
      });
    }
  });
}
