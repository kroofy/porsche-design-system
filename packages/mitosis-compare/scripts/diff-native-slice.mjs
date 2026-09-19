import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const { PNG } = require('/tmp/node_modules/pngjs');
const pixelmatchMod = require('/tmp/node_modules/pixelmatch');
const pixelmatch = pixelmatchMod.default || pixelmatchMod;

const TAGS = ['button', 'wordmark', 'input-text'];
const FRAMEWORKS = ['lit', 'react', 'vue', 'svelte'];
const outDir = '/tmp/native-slice';
mkdirSync(outDir, { recursive: true });

const diffPng = (leftPath, rightPath, dest) => {
  const a = PNG.sync.read(readFileSync(leftPath));
  const b = PNG.sync.read(readFileSync(rightPath));
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);
  const diff = new PNG({ width, height });
  const mismatch = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.1 });
  writeFileSync(dest, PNG.sync.write(diff));
  return { mismatch, pixels: width * height, ratio: Number((mismatch / (width * height)).toFixed(4)), size: [width, height] };
};

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1800, height: 1400 } });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});

await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.documentElement.dataset.ready === 'true', null, {
  timeout: 60000,
});

const report = { tags: {} };

for (const tag of TAGS) {
  await page.locator(`.tag-cell#${tag}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const info = await page.evaluate((id) => {
    const box = (fw) => {
      const el = document.querySelector(`[data-cell="${fw}:${id}"]`);
      const host = el?.querySelector('[data-pds]') ?? el?.querySelector(`p-${id}`) ?? el;
      const rect = host?.getBoundingClientRect();
      return {
        w: Math.round(rect?.width ?? 0),
        h: Math.round(rect?.height ?? 0),
        text: (host?.textContent || '').replace(/\s+/g, ' ').trim(),
        hasPds: !!el?.querySelector('[data-pds]'),
        defined: !!customElements.get(`p-${id}`),
      };
    };
    return { lit: box('lit'), react: box('react'), vue: box('vue'), svelte: box('svelte') };
  }, tag);

  for (const fw of FRAMEWORKS) {
    await page.locator(`[data-cell="${fw}:${tag}"]`).screenshot({ path: `${outDir}/${tag}-${fw}.png` });
  }

  report.tags[tag] = {
    ...info,
    reactDiff: diffPng(`${outDir}/${tag}-lit.png`, `${outDir}/${tag}-react.png`, `${outDir}/${tag}-lit-vs-react.png`),
    vueDiff: diffPng(`${outDir}/${tag}-lit.png`, `${outDir}/${tag}-vue.png`, `${outDir}/${tag}-lit-vs-vue.png`),
    svelteDiff: diffPng(`${outDir}/${tag}-lit.png`, `${outDir}/${tag}-svelte.png`, `${outDir}/${tag}-lit-vs-svelte.png`),
  };
}

writeFileSync(`${outDir}/report.json`, `${JSON.stringify({ errorCount: errors.length, errors: errors.slice(0, 20), tags: report.tags }, null, 2)}\n`);
console.log(JSON.stringify({ errorCount: errors.length, errors: errors.slice(0, 12), tags: report.tags }, null, 2));
await browser.close();
