#!/usr/bin/env node
/**
 * Screenshot every demo: React vs upstream side by side, all targets, and a per-variant pixel diff (React vs upstream).
 *
 *   node scripts/screenshots.mjs [--base http://localhost:5174] [--out screenshots] [--themes light,dark] [--tags button,tag] [--skip-all]
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};
const base = arg('base', 'http://localhost:5174').replace(/\/$/, '');
const outDir = arg('out', 'screenshots');
const themes = arg('themes', 'light,dark').split(',');
const onlyTags = arg('tags', '') ? arg('tags', '').split(',') : null;
const skipAll = args.includes('--skip-all');
const ALL = 'react,vue,svelte,angular,lit,upstream';
const DIFF_THRESHOLD = 0.005;

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 1 });

const shellReady = (page) =>
  page.waitForFunction(
    () => {
      const frames = [...document.querySelectorAll('iframe')];
      return (
        frames.length > 0 && frames.every((frame) => frame.contentDocument?.documentElement?.dataset.ready === 'true')
      );
    },
    null,
    { timeout: 90000 }
  );

const shoot = async (hash, file, width) => {
  const page = await context.newPage();
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`${base}/index.html#${hash}`, { waitUntil: 'domcontentloaded' });
  await shellReady(page).catch(() => {});
  await page.waitForTimeout(900);
  await page.locator('.main').screenshot({ path: file });
  await page.close();
};

const variantShots = async (target, tag, theme, variant) => {
  const page = await context.newPage();
  await page.setViewportSize({ width: 560, height: 900 });
  const query = new URLSearchParams({ target, tag, theme, ...(variant ? { variant } : {}) });
  await page.goto(`${base}/frame.html?${query}`, { waitUntil: 'domcontentloaded' });
  await page
    .waitForFunction(() => document.documentElement.dataset.ready === 'true', null, { timeout: 60000 })
    .catch(() => {});
  await page.waitForTimeout(400);
  const shots = {};
  for (const section of await page.locator('.variant').all()) {
    const name = await section.getAttribute('data-variant');
    shots[name] = PNG.sync.read(await section.locator('.variant-mount').screenshot());
  }
  await page.close();
  return shots;
};

/** Pad both to the same size (padding counts as mismatch) and return ratio + a react | upstream | diff strip. */
const compare = (a, b) => {
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);
  const pad = (png) => {
    const out = new PNG({ width, height, fill: true });
    out.data.fill(255);
    PNG.bitblt(png, out, 0, 0, png.width, png.height, 0, 0);
    return out;
  };
  const left = pad(a);
  const right = pad(b);
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(left.data, right.data, diff.data, width, height, { threshold: 0.15 });
  const gap = 12;
  const strip = new PNG({ width: width * 3 + gap * 2, height, fill: true });
  strip.data.fill(255);
  PNG.bitblt(left, strip, 0, 0, width, height, 0, 0);
  PNG.bitblt(right, strip, 0, 0, width, height, width + gap, 0);
  PNG.bitblt(diff, strip, 0, 0, width, height, (width + gap) * 2, 0);
  return { ratio: mismatched / (width * height), strip };
};

const listPage = await context.newPage();
await listPage.goto(`${base}/index.html`, { waitUntil: 'domcontentloaded' });
const demos = (await listPage.evaluate(() => window.__PDS_DEMOS)).filter(
  (demo) => !onlyTags || onlyTags.includes(demo.tag)
);
await listPage.close();

const report = [];
const failures = [];
for (const theme of themes) {
  for (const sub of ['compare', 'all-targets', 'react', 'diff'])
    mkdirSync(join(outDir, sub, theme), { recursive: true });
  for (const demo of demos) {
    const variants = demo.stage ? demo.variants : [undefined];
    for (const variant of variants) {
      try {
        await shootDemo(theme, demo, variant);
      } catch (error) {
        failures.push(`${theme} ${demo.tag} ${variant ?? ''}: ${error.message.split('\n')[0]}`);
        process.stderr.write(`FAILED ${theme} ${demo.tag} ${variant ?? ''}\n`);
      }
    }
  }
}
await browser.close();

async function shootDemo(theme, demo, variant) {
  const suffix = variant ? `--${variant.replace(/\W+/g, '-')}` : '';
  const hash = (targets) =>
    new URLSearchParams({ tag: demo.tag, targets, theme, ...(variant ? { variant } : {}) }).toString();
  await shoot(hash('react,upstream'), join(outDir, 'compare', theme, `${demo.tag}${suffix}.png`), 1280);
  if (!skipAll) await shoot(hash(ALL), join(outDir, 'all-targets', theme, `${demo.tag}${suffix}.png`), 2200);

  const react = await variantShots('react', demo.tag, theme, variant);
  const upstream = await variantShots('upstream', demo.tag, theme, variant);
  for (const [name, png] of Object.entries(react)) {
    const slug = `${demo.tag}--${name.replace(/\W+/g, '-')}`;
    writeFileSync(join(outDir, 'react', theme, `${slug}.png`), PNG.sync.write(png));
    const other = upstream[name];
    if (!other) continue;
    const { ratio, strip } = compare(png, other);
    if (ratio > DIFF_THRESHOLD) writeFileSync(join(outDir, 'diff', theme, `${slug}.png`), PNG.sync.write(strip));
    report.push({ theme, tag: demo.tag, variant: name, mismatch: Number(ratio.toFixed(4)) });
  }
  process.stderr.write(`${theme} ${demo.tag}${suffix}\n`);
}

report.sort((a, b) => b.mismatch - a.mismatch);
writeFileSync(join(outDir, 'diff-report.json'), `${JSON.stringify(report, null, 2)}\n`);
const rows = report.map(
  (row) => `| ${row.theme} | p-${row.tag} | ${row.variant} | ${(row.mismatch * 100).toFixed(1)}% |`
);
writeFileSync(
  join(outDir, 'diff-report.md'),
  `# React vs upstream pixel mismatch\n\nPer variant, pixelmatch threshold 0.15, size difference counts as mismatch. Strips for >0.5% are in \`diff/\` (React | upstream | diff).\n\n| Theme | Component | Variant | Mismatch |\n| --- | --- | --- | --- |\n${rows.join('\n')}\n`
);
console.log(
  `${report.length} variant comparisons, ${report.filter((row) => row.mismatch > DIFF_THRESHOLD).length} above 0.5%`
);
if (failures.length) {
  console.error(`failed:\n${failures.join('\n')}`);
  process.exitCode = 1;
}
