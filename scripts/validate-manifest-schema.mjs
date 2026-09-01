#!/usr/bin/env node
// Validates docs.manifest.json against the shared Bitcoin Universe schema.
//
// The schema is vendored into schemas/ so this runs in CI without the platform
// repository checked out. Refresh it from
// docs-platform/packages/content-schema/schemas/docs.manifest.schema.json when
// the platform publishes a new version.
//
// Run: node scripts/validate-manifest-schema.mjs

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const schema = JSON.parse(readFileSync(resolve(root, 'schemas/docs.manifest.schema.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(resolve(root, 'docs.manifest.json'), 'utf8'));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validate = ajv.compile(schema);
if (!validate(manifest)) {
  process.stderr.write('docs.manifest.json does not match the shared schema.\n\n');
  for (const err of validate.errors ?? []) {
    process.stderr.write(`  ${err.instancePath || '/'} ${err.message}\n`);
  }
  process.stderr.write('\n');
  process.exit(1);
}

process.stdout.write(
  `docs.manifest.json matches the shared schema (${manifest.id}, ${manifest.lifecycle}).\n`,
);
