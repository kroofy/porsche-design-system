import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getElementsCss } from './link-button-css';

writeFileSync(resolve(dirname(fileURLToPath(import.meta.url)), 'elements.css'), getElementsCss());
