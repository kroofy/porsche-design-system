import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Prefer the legacy nested probe install, else the hoisted root workspace install.
const candidates = [
  resolve(componentsRoot, '../mitosis-probe-lit/node_modules'),
  resolve(componentsRoot, '../../node_modules'),
];

export const probeNodeModules = candidates.find((dir) => existsSync(resolve(dir, '.bin/mitosis'))) ?? candidates[1];
