import { chromium } from 'playwright';

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
await page.waitForFunction(
  () =>
    [...document.querySelectorAll('.baseline-cell img')].filter((img) => img.complete && img.naturalWidth > 0)
      .length >= 10,
  null,
  { timeout: 20000 }
);

const report = await page.evaluate(() => {
  const grid = document.querySelector('.compare-grid');
  const styles = getComputedStyle(grid);
  const baseline = [...document.querySelectorAll('.baseline-cell img')].reduce(
    (acc, img) => {
      acc.total += 1;
      if (img.complete && img.naturalWidth > 0) acc.ok += 1;
      return acc;
    },
    { total: 0, ok: 0 }
  );
  const childInfo = {
    childElementCount: grid.childElementCount,
    childNodes: [...grid.childNodes].slice(0, 8).map((node) => ({
      type: node.nodeType,
      name: node.nodeName,
      text: node.nodeType === Node.TEXT_NODE ? JSON.stringify(node.textContent) : node.className,
    })),
  };
  const headers = [...document.querySelectorAll('.compare-grid > .head')].map((el) => ({
    text: el.textContent.trim(),
    x: Math.round(el.getBoundingClientRect().x),
    y: Math.round(el.getBoundingClientRect().y),
    w: Math.round(el.getBoundingClientRect().width),
  }));
  const cells = [...document.querySelectorAll('[data-cell]')].map((el) => {
    const [fw, tag] = el.getAttribute('data-cell').split(':');
    const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
    const failed = /failed|missing|Cannot access|NG0/.test(text);
    return {
      fw,
      tag,
      failed,
      empty: text.length === 0 && el.children.length === 0,
      childCount: el.children.length,
      html: el.innerHTML.slice(0, 80),
      text: text.slice(0, 140),
      hasHost: !!el.querySelector('.mitosis-host'),
    };
  });
  return {
    columns: styles.gridTemplateColumns,
    gridWidth: Math.round(grid.getBoundingClientRect().width),
    baseline,
    childInfo,
    headers,
    cells,
  };
});

const byFw = {};
for (const cell of report.cells) {
  byFw[cell.fw] ??= { total: 0, failed: 0, empty: 0, ok: 0 };
  byFw[cell.fw].total += 1;
  if (cell.failed) byFw[cell.fw].failed += 1;
  else if (cell.empty) byFw[cell.fw].empty += 1;
  else byFw[cell.fw].ok += 1;
}

const failedCells = report.cells.filter((cell) => cell.failed || cell.empty);
console.log(JSON.stringify({ columns: report.columns, gridWidth: report.gridWidth, baseline: report.baseline, headers: report.headers, byFw, failedCells, errorCount: errors.length, errors: errors.slice(0, 20) }, null, 2));

const shots = ['crest', 'heading', 'button', 'input-text', 'tag', 'model-signature', 'switch', 'divider'];
for (const tag of shots) {
  const el = page.locator(`.tag-cell#${tag}`);
  if (!(await el.count())) continue;
  await el.scrollIntoViewIfNeeded();
  await page.waitForFunction(
    (id) => {
      const tagCell = document.getElementById(id);
      const img = tagCell?.nextElementSibling?.querySelector('img');
      return !!img && img.complete && img.naturalHeight > 20;
    },
    tag,
    { timeout: 15000 }
  );
  await page.waitForTimeout(200);
  const box = await page.evaluate((id) => {
    const tagCell = document.getElementById(id);
    const cells = [];
    let node = tagCell;
    for (let i = 0; i < 6 && node; i += 1) {
      cells.push(node);
      node = node.nextElementSibling;
    }
    const rects = cells.map((el) => el.getBoundingClientRect());
    const left = Math.min(...rects.map((rect) => rect.left));
    const top = Math.min(...rects.map((rect) => rect.top));
    const right = Math.max(...rects.map((rect) => rect.right));
    const bottom = Math.max(...rects.map((rect) => rect.bottom));
    return {
      x: Math.max(0, left),
      y: Math.max(0, top),
      width: Math.min(1800, right - left),
      height: Math.min(700, bottom - top),
    };
  }, tag);
  if (box.width > 10 && box.height > 10) {
    await page.screenshot({ path: `/tmp/compare-${tag}.png`, clip: box });
  }
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: '/tmp/compare-top.png', fullPage: false });
await page.screenshot({ path: '/tmp/compare-full.png', fullPage: true });
await browser.close();
