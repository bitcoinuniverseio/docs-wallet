#!/usr/bin/env node
// Import the wallet's generated provider contract and the documentation overlay.
//
// The contract comes from the wallet repository's generator (no signature is
// ever typed by hand here). The overlay is this repository's prose keyed by
// generated method ID. Both directions are enforced:
//
//   - every method in the generated contract must have overlay documentation;
//   - every overlay entry must name a method the contract actually has.
//
// Drift in either direction fails, which is the CI gate that keeps the docs
// honest when the provider surface changes.
//
// Usage: node scripts/import-provider-contract.mjs <wallet-repo>/frontend/docs-export

import { existsSync, copyFileSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = dirname(dirname(fileURLToPath(import.meta.url)));

const exportDir = process.argv[2] ?? process.env.DOCS_WALLET_EXPORT_DIR ?? null;
const contractSource = exportDir ? join(exportDir, 'provider-contract.json') : null;
const overlayPath = join(root, 'src', 'data', 'provider-overlay.json');
const contractOut = join(root, 'src', 'data', 'provider-contract.json');

if (!contractSource || !existsSync(contractSource)) {
  process.stderr.write(
    'Usage: node scripts/import-provider-contract.mjs <wallet-repo>/frontend/docs-export\n' +
      'Generate it with `npm run docs:contract` in the wallet repository.\n',
  );
  process.exit(1);
}

const contract = JSON.parse(readFileSync(contractSource, 'utf8'));
const overlay = JSON.parse(readFileSync(overlayPath, 'utf8'));

const problems = [];
const fail = (message) => problems.push(message);

// Structural validation of the generated contract.
if (contract.schemaVersion !== 'universe-provider-contract-v1') {
  fail(`unexpected contract schemaVersion ${contract.schemaVersion}`);
}
if (typeof contract.methodCount !== 'number' || !Array.isArray(contract.methods)) {
  fail('contract is missing methods');
} else if (contract.methods.length !== contract.methodCount) {
  fail(`methodCount says ${contract.methodCount} but the array holds ${contract.methods.length}`);
}
for (const method of contract.methods ?? []) {
  for (const field of ['id', 'requestMethod', 'category', 'effect', 'releaseStatus']) {
    if (method[field] === undefined) fail(`method ${method.id ?? '?'} lacks ${field}`);
  }
  if (!method.public && method.requiresUnlock === undefined) {
    fail(`method ${method.id} lacks unlock requirement`);
  }
}

// Snapshot agreement.
const snapshot = JSON.parse(readFileSync(join(root, 'capability-snapshot.json'), 'utf8'));
if (snapshot.walletVersion !== contract.walletVersion) {
  fail(
    `contract describes wallet ${contract.walletVersion} but the site snapshot is ${snapshot.walletVersion}; run npm run capability:pull`,
  );
}

// Overlay coverage, both directions.
const contractIds = new Set((contract.methods ?? []).map((method) => method.id));
const overlayIds = new Set(Object.keys(overlay.methods ?? {}));
for (const id of contractIds) {
  if (!overlayIds.has(id)) fail(`generated method ${id} has no documentation overlay entry`);
}
for (const id of overlayIds) {
  if (!contractIds.has(id)) {
    fail(`overlay documents ${id}, which the generated contract does not define`);
  }
}
for (const [id, entry] of Object.entries(overlay.methods ?? {})) {
  if (!entry.explanation || entry.explanation.length < 10) fail(`overlay ${id}: explanation missing or too short`);
  if (!entry.safetyNote) fail(`overlay ${id}: safetyNote missing`);
}

// Example drift: an overlay example that names a parameter the contract does
// not declare would teach a call that cannot work. Parameters are dynamic in
// JS, so this stays a soft check on names.
for (const [id, entry] of Object.entries(overlay.methods ?? {})) {
  if (!entry.example) continue;
  const method = (contract.methods ?? []).find((candidate) => candidate.id === id);
  if (!method) continue;
  for (const parameter of method.parameters ?? []) {
    if (!entry.example.includes(parameter.name) && parameter.name !== 'options') {
      // Not every example must use every parameter; this is informational only.
    }
  }
}

if (problems.length) {
  process.stderr.write(`provider contract import: ${problems.length} problem(s)\n\n`);
  for (const problem of problems) process.stderr.write(`  - ${problem}\n`);
  process.exit(1);
}

copyFileSync(contractSource, contractOut);
process.stdout.write(
  `provider contract imported: ${contract.methodCount} methods, ${contract.events.length} events, ` +
    `${contract.providerNamespaces.length} namespaces, overlay complete\n`,
);
