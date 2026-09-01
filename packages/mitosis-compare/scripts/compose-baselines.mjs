import { createRequire } from 'node:module';
import { readFile, mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const require = createRequire('/workspace/package.json');
const sharp = require('sharp');

const tags = ['crest', 'heading', 'button', 'input-text', 'tag', 'model-signature', 'switch', 'divider'];
const outDir = '/opt/cursor/artifacts';
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1800, height: 1400 }, deviceScaleFactor: 2 });
await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.documentElement.dataset.ready === 'true', { timeout: 60000 });

for (const tag of tags) {
  await page.locator(`.tag-cell#${tag}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  const shots = [];
  for (const fw of ['lit', 'react', 'vue', 'angular', 'svelte']) {
    shots.push(await page.locator(`[data-cell="${fw}:${tag}"]`).screenshot({ type: 'png' }));
  }
  const baselinePath = `/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_${tag.replaceAll('-', '_')}_before.png`;
  const buffers = [await readFile(baselinePath), ...shots];
  const labels = ['Baseline', 'Lit', 'React', 'Vue', 'Angular', 'Svelte'];
  const targetH = 420;
  const labelH = 40;
  const resized = [];
  const widths = [];
  for (const buf of buffers) {
    const img = sharp(buf);
    const meta = await img.metadata();
    const w = Math.max(120, Math.round((meta.width / meta.height) * targetH));
    resized.push(await img.resize({ height: targetH, width: w, fit: 'inside', background: '#ffffff' }).png().toBuffer());
    widths.push(w + 28);
  }
  const totalW = widths.reduce((a, b) => a + b, 0);
  const canvasH = targetH + labelH + 28;
  const composites = [];
  let x = 0;
  let labelSvg = '';
  for (let i = 0; i < resized.length; i += 1) {
    composites.push({ input: resized[i], left: x + 14, top: labelH + 12 });
    labelSvg += `<text x="${x + 14}" y="28" font-family="sans-serif" font-size="20" font-weight="600" fill="#010205">${labels[i]}</text>`;
    x += widths[i];
  }
  composites.push({
    input: Buffer.from(`<svg width="${totalW}" height="${labelH}" xmlns="http://www.w3.org/2000/svg">${labelSvg}</svg>`),
    left: 0,
    top: 0,
  });
  await sharp({ create: { width: totalW, height: canvasH, channels: 3, background: '#ffffff' } })
    .composite(composites)
    .png()
    .toFile(`${outDir}/vs_baseline_${tag.replaceAll('-', '_')}.png`);
  console.log('wrote', tag);
}

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/baseline_vs_emit_top.png`, fullPage: false });
await browser.close();
