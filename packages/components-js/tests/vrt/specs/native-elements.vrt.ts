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
] as const;

for (const pageName of pages) {
  test.describe(pageName, () => {
    for (const scheme of schemes) {
      test(`color-scheme ${scheme}`, async ({ page }) => {
        await setupScenario(page, `/${pageName}?scheme=${scheme}`, viewportWidthM);
        await expect(page.locator('#app')).toHaveScreenshot(`${pageName}-${viewportWidthM}-${scheme}.png`);
      });
    }
  });
}
