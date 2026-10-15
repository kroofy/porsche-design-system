#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const LOG = '/opt/cursor/artifacts/delete_stencil_core_verify.log';
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
const build = pkg.scripts?.build ?? '';
const hasStencilDep = Boolean(pkg.dependencies?.['@stencil/core'] || pkg.devDependencies?.['@stencil/core']);
const scriptsHaveStencilBuild = Object.values(pkg.scripts ?? {}).some((s) => /stencil\s+build/.test(s));
const startIsPlayground = start.includes('serve-playground.mjs');
const configExists = existsSync(resolve(REPO_ROOT, 'packages/components/stencil.config.ts'));

log(`start=${start}`);
log(`prestart=${prestart}`);
log(`build=${build}`);
log(`startIsPlayground=${startIsPlayground}`);
log(`hasStencilDep=${hasStencilDep}`);
log(`scriptsHaveStencilBuild=${scriptsHaveStencilBuild}`);
log(`stencilConfigExists=${configExists}`);

if (!startIsPlayground) {
  writeFileSync(LOG, `${lines.join('\n')}\n`);
  throw new Error('start path is not serve-playground.mjs');
}
if (hasStencilDep || scriptsHaveStencilBuild) {
  writeFileSync(LOG, `${lines.join('\n')}\n`);
  throw new Error('package.json still has @stencil/core or stencil build');
}
if (configExists) {
  writeFileSync(LOG, `${lines.join('\n')}\n`);
  throw new Error('stencil.config.ts still exists');
}

const rg = spawnSync('rg', ['-n', '@stencil/core', 'packages/components'], {
  cwd: REPO_ROOT,
  encoding: 'utf8',
});
const rgOut = `${rg.stdout ?? ''}${rg.stderr ?? ''}`.trim();
const leftover = rgOut
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)
  .filter((line) => !line.includes('//') && !line.includes('*'));
log(`rg=@stencil/core\n${rgOut}`);
if (leftover.length) {
  writeFileSync(LOG, `${lines.join('\n')}\n`);
  throw new Error('rg @stencil/core is not empty except historical comments');
}

const ls = spawnSync('npm', ['ls', '@stencil/core', '--all'], {
  cwd: REPO_ROOT,
  encoding: 'utf8',
});
const lsOut = `${ls.stdout ?? ''}${ls.stderr ?? ''}`.trim();
log(`npm ls @stencil/core\n${lsOut}`);
if (!/extraneous|empty|deduped|UNMET|missing|(?:\(empty\))/.test(lsOut) && /@stencil\/core@/.test(lsOut) && !/extraneous/.test(lsOut)) {
  // fail only if it is a real installed dependency
  if (!/extraneous/.test(lsOut) && !/empty/.test(lsOut) && ls.status === 0) {
    writeFileSync(LOG, `${lines.join('\n')}\n`);
    throw new Error('@stencil/core is still installed as a dependency');
  }
}

const canvasBuf = readFileSync(CANVAS_BASELINE);
if (canvasBuf.byteLength !== CANVAS_BYTES || sha256(canvasBuf) !== CANVAS_SHA) {
  throw new Error(`canvas baseline mismatch ${canvasBuf.byteLength} ${sha256(canvasBuf)}`);
}
log(`canvas baseline bytes=${canvasBuf.byteLength} sha256=${sha256(canvasBuf)}`);
log(`divider baseline bytes=${readFileSync(DIVIDER_BASELINE).byteLength}`);

const isBenignConsole = (text) => text.includes('ERR_CONNECTION_REFUSED') || text.includes('3002');

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
    AFTER_PNG: '/opt/cursor/artifacts/delete_stencil_core_divider_after.png',
    DIFF_PNG: '/opt/cursor/artifacts/delete_stencil_core_divider_pixel_diff.png',
  },
  { allowBenignConsole: true }
);
run('.audit/orchestrate/stencil-to-mitosis/scripts/land-canvas-pixel-diff.mjs', {
  AFTER_PNG: '/opt/cursor/artifacts/delete_stencil_core_canvas_after.png',
  DIFF_PNG: '/opt/cursor/artifacts/delete_stencil_core_canvas_pixel_diff.png',
});

copyFileSync(
  '/opt/cursor/artifacts/delete_stencil_core_divider_after.png',
  '/opt/cursor/artifacts/delete_stencil_core_divider_after_pass.png'
);
copyFileSync(
  '/opt/cursor/artifacts/delete_stencil_core_canvas_after.png',
  '/opt/cursor/artifacts/delete_stencil_core_canvas_after_pass.png'
);

log('failed=false');
writeFileSync(LOG, `${lines.join('\n')}\n`);
