#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const LOG = '/opt/cursor/artifacts/delete_stencil_verify.log';
const PKG = resolve(REPO_ROOT, 'packages/components/package.json');
const DIVIDER_BASELINE = resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_divider_before.png');
const CANVAS_BASELINE = resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_canvas_before.png');
const CANVAS_SHA = '28de5f4bfb3bfd7be7a26beebb89bb114b419f318af8c9e777e7dea52ff18c97';
const CANVAS_BYTES = 40157;

const lines = [];
const log = (msg) => {
  lines.push(typeof msg === 'string' ? msg : JSON.stringify(msg));
  console.warn(typeof msg === 'string' ? msg : JSON.stringify(msg));
};

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
mkdirSync('/opt/cursor/artifacts', { recursive: true });

const pkg = JSON.parse(readFileSync(PKG, 'utf8'));
const start = pkg.scripts?.start ?? '';
const prestart = pkg.scripts?.prestart ?? '';
const startInvokesStencil = /stencil\s+build/.test(start) || /stencil\s+build/.test(prestart);
log(`start=${start}`);
log(`prestart=${prestart}`);
log(`startInvokesStencil=${startInvokesStencil}`);
if (startInvokesStencil) {
  writeFileSync(LOG, `${lines.join('\n')}\n`);
  throw new Error('start path still invokes stencil build');
}

const componentHits = spawnSync(
  'rg',
  ['-n', '^@Component', '--glob', '*.tsx', 'packages/components/src'],
  { cwd: REPO_ROOT, encoding: 'utf8' }
);
const componentOut = `${componentHits.stdout ?? ''}${componentHits.stderr ?? ''}`.trim();
log(`atComponent=${JSON.stringify(componentOut)}`);
if (componentOut) {
  writeFileSync(LOG, `${lines.join('\n')}\n`);
  throw new Error('rg ^@Component is not empty');
}

const canvasBuf = readFileSync(CANVAS_BASELINE);
if (canvasBuf.byteLength !== CANVAS_BYTES || sha256(canvasBuf) !== CANVAS_SHA) {
  throw new Error(`canvas baseline mismatch ${canvasBuf.byteLength} ${sha256(canvasBuf)}`);
}
log(`canvas baseline bytes=${canvasBuf.byteLength} sha256=${sha256(canvasBuf)}`);
log(`divider baseline bytes=${readFileSync(DIVIDER_BASELINE).byteLength}`);

const isBenignConsole = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') || text.includes('3002');

const run = (script, env, { allowBenignConsole = false } = {}) => {
  const result = spawnSync('node', [resolve(REPO_ROOT, script)], {
    cwd: REPO_ROOT,
    env: { ...process.env, ...env },
    encoding: 'utf8',
  });
  const out = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trimEnd();
  log(`ran ${script} status=${result.status}`);
  if (out) log(out);
  if (result.status === 0) return;
  if (allowBenignConsole) {
      const jsonStart = out.indexOf('{');
      if (jsonStart >= 0) {
        const summary = JSON.parse(out.slice(jsonStart));
      const errors = summary.consoleErrors ?? [];
      const onlyBenign = errors.length > 0 && errors.every(isBenignConsole);
      const pixelsOk = summary.litVsBaseline?.strictMismatch === 0 && !summary.litVsBaseline?.error;
      if (onlyBenign && pixelsOk) {
        log(`${script} pixel-diff 0; ignoring benign dummyassets 3002 console error`);
        return;
      }
    }
  }
  writeFileSync(LOG, `${lines.join('\n')}\n`);
  throw new Error(`${script} failed`);
};

run(
  '.audit/orchestrate/stencil-to-mitosis/scripts/land-divider-pixel-diff.mjs',
  {
    AFTER_PNG: '/opt/cursor/artifacts/delete_stencil_divider_after.png',
    DIFF_PNG: '/opt/cursor/artifacts/delete_stencil_divider_pixel_diff.png',
  },
  { allowBenignConsole: true }
);
run('.audit/orchestrate/stencil-to-mitosis/scripts/land-canvas-pixel-diff.mjs', {
  AFTER_PNG: '/opt/cursor/artifacts/delete_stencil_canvas_after.png',
  DIFF_PNG: '/opt/cursor/artifacts/delete_stencil_canvas_pixel_diff.png',
});

copyFileSync(
  '/opt/cursor/artifacts/delete_stencil_divider_after.png',
  '/opt/cursor/artifacts/delete_stencil_divider_after_pass.png'
);
copyFileSync(
  '/opt/cursor/artifacts/delete_stencil_canvas_after.png',
  '/opt/cursor/artifacts/delete_stencil_canvas_after_pass.png'
);

log('failed=false');
writeFileSync(LOG, `${lines.join('\n')}\n`);
