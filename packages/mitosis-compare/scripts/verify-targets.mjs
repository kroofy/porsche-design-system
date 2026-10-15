#!/usr/bin/env node
/**
 * Load every demo in every target frame and record render errors, console errors and empty variants.
 *
 *   node scripts/verify-targets.mjs [--base http://localhost:5174] [--out report.json] [--targets react,vue] [--tags button,tag]
 */
import { writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};
const base = arg('base', 'http://localhost:5174').replace(/\/$/, '');
const out = arg('out', 'verify-report.json');
const targets = arg('targets', 'react,vue,svelte,angular,lit,upstream').split(',');
const theme = arg('theme', 'light');

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 900, height: 900 } });

const listPage = await context.newPage();
await listPage.goto(`${base}/index.html`, { waitUntil: 'domcontentloaded' });
const allTags = await listPage.$$eval('a[data-tag]', (links) => links.map((link) => link.dataset.tag));
await listPage.close();
const tags = arg('tags', '') ? arg('tags', '').split(',') : allTags;

const NOISE = [
  /Download the React DevTools/,
  /\[vite\]/,
  /Angular is running in development mode/,
  /was created with unknown prop/,
  /received an unexpected slot/,
  /unknown prop/,
];

const check = async (target, tag) => {
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() !== 'error' && message.type() !== 'warning') return;
    const text = message.text();
    if (NOISE.some((re) => re.test(text))) return;
    consoleErrors.push(`${message.type()}: ${text.slice(0, 300)}`);
  });
  page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message.slice(0, 300)}`));
  const url = `${base}/frame.html?target=${target}&tag=${tag}&theme=${theme}`;
  let result;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.documentElement.dataset.ready === 'true', null, { timeout: 45000 });
    result = await page.evaluate(() => {
      const variants = [...document.querySelectorAll('.variant')].map((section) => {
        const mount = section.querySelector('.variant-mount');
        const rect = mount.getBoundingClientRect();
        const deep = (root) => {
          let n = 0;
          for (const el of root.querySelectorAll('*')) {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) n += 1;
            if (el.shadowRoot) n += deep(el.shadowRoot);
          }
          return n;
        };
        return {
          name: section.dataset.variant,
          error: section.dataset.error ?? null,
          height: Math.round(rect.height),
          visibleNodes: deep(mount),
          text: (mount.innerText || '').trim().slice(0, 60),
        };
      });
      return { variants, frameErrors: window.__frameErrors };
    });
  } catch (error) {
    result = { variants: [], frameErrors: [`timeout/failed: ${error.message.split('\n')[0]}`] };
  }
  await page.close();
  const failed = result.variants.filter((variant) => variant.error);
  const empty = result.variants.filter((variant) => !variant.error && variant.visibleNodes === 0);
  const status = result.frameErrors.length || failed.length ? 'error' : empty.length ? 'empty' : 'ok';
  return {
    target,
    tag,
    status,
    ...result,
    consoleErrors,
    failed: failed.map((v) => v.name),
    empty: empty.map((v) => v.name),
  };
};

const queue = targets.flatMap((target) => tags.map((tag) => [target, tag]));
const results = [];
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const [target, tag] = queue.shift();
    const result = await check(target, tag);
    results.push(result);
    process.stderr.write(
      `${result.status.padEnd(5)} ${target.padEnd(8)} ${tag}${result.status === 'ok' ? '' : `  ${[...result.frameErrors, ...result.failed, ...result.empty].join(' | ').slice(0, 160)}`}\n`
    );
  }
});
await Promise.all(workers);
await browser.close();

results.sort((a, b) => a.tag.localeCompare(b.tag) || targets.indexOf(a.target) - targets.indexOf(b.target));
const summary = Object.fromEntries(
  targets.map((target) => {
    const rows = results.filter((result) => result.target === target);
    return [
      target,
      {
        ok: rows.filter((r) => r.status === 'ok').length,
        empty: rows.filter((r) => r.status === 'empty').length,
        error: rows.filter((r) => r.status === 'error').length,
      },
    ];
  })
);
writeFileSync(out, `${JSON.stringify({ base, theme, summary, results }, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
