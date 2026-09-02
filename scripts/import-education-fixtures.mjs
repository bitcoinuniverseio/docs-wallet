#!/usr/bin/env node
// Import wallet-generated educational fixtures for the Safety Lab.
//
// Usage: node scripts/import-education-fixtures.mjs <wallet-repo>/frontend/docs-export

import { existsSync, copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const exportDir = process.argv[2] ?? process.env.DOCS_WALLET_EXPORT_DIR ?? null;
const source = exportDir ? join(exportDir, 'education-fixtures.json') : null;
const out = join(root, 'src', 'data', 'safety', 'education-fixtures.json');

if (!source || !existsSync(source)) {
  process.stderr.write(
    'Usage: node scripts/import-education-fixtures.mjs <wallet-repo>/frontend/docs-export\n' +
      'Generate it with `npm run docs:fixtures` in the wallet repository.\n',
  );
  process.exit(1);
}

const fixtures = JSON.parse(readFileSync(source, 'utf8'));
const problems = [];

if (fixtures.schemaVersion !== 'universe-education-fixtures-v1') {
  problems.push(`unexpected schemaVersion ${fixtures.schemaVersion}`);
}
if (!Array.isArray(fixtures.fixtures) || fixtures.fixtures.length === 0) {
  problems.push('no fixtures in the export');
}
const ids = new Set();
for (const fixture of fixtures.fixtures ?? []) {
  if (ids.has(fixture.id)) problems.push(`duplicate fixture id ${fixture.id}`);
  ids.add(fixture.id);
  if (!fixture.summary || !fixture.anatomy) problems.push(`${fixture.id}: missing summary or anatomy`);
  if (!Array.isArray(fixture.teaches) || fixture.teaches.length === 0) {
    problems.push(`${fixture.id}: teaches nothing`);
  }
}

// No fixture may carry a twelve-word phrase shape or WIF-shaped string, even
// by accident. The generator cannot produce one; this is the belt to its
// braces.
const SECRET_SHAPES = [
  /\b(?:[a-z]{3,8}\s){11,23}[a-z]{3,8}\b/i,
  /\b[1-9A-HJ-NP-Za-km-z]{51,52}\b/,
  /\b5[HJK][1-9A-Za-z]{49}\b/,
];
const serialized = JSON.stringify(fixtures);
for (const shape of SECRET_SHAPES) {
  if (shape.test(serialized)) problems.push(`fixture export matches secret-like shape ${shape}`);
}

if (problems.length) {
  process.stderr.write(`education fixture import: ${problems.length} problem(s)\n\n`);
  for (const problem of problems) process.stderr.write(`  - ${problem}\n`);
  process.exit(1);
}

mkdirSync(join(root, 'src', 'data', 'safety'), { recursive: true });
copyFileSync(source, out);
process.stdout.write(`education fixtures imported: ${fixtures.fixtures.length} scenarios\n`);
