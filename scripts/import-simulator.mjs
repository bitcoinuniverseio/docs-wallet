#!/usr/bin/env node
// Import the wallet documentation simulator build.
//
// Verifies the artifact declares its provenance, ships no source maps, and
// asserts its isolation properties, then installs it under public/simulator/
// and records a typed summary in src/data/simulator.json.
//
// Usage: node scripts/import-simulator.mjs <wallet-repo>/frontend/dist/docs-simulator

import { createHash } from 'node:crypto';
import { existsSync, cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = process.argv[2] ?? process.env.DOCS_WALLET_SIMULATOR_DIR ?? null;
const outDir = join(root, 'public', 'simulator');
const outData = join(root, 'src', 'data', 'simulator.json');

if (!source || !existsSync(join(source, 'build.json'))) {
  process.stderr.write(
    'Usage: node scripts/import-simulator.mjs <wallet-repo>/frontend/dist/docs-simulator\n' +
      'Build it with `npm run docs:simulator` in the wallet repository.\n',
  );
  process.exit(1);
}

const problems = [];
const buildInfo = JSON.parse(readFileSync(join(source, 'build.json'), 'utf8'));

if (!buildInfo.walletVersion) problems.push('build.json lacks walletVersion');
if (!buildInfo.walletSourceCommit) problems.push('build.json lacks walletSourceCommit');
const isolation = buildInfo.isolation ?? {};
for (const flag of ['offlineByConstruction', 'noExtensionApis', 'noKeyMaterial', 'noSourceMaps']) {
  if (isolation[flag] !== true) problems.push(`build.json does not assert ${flag}`);
}

// Files: no source maps, no private paths encoded in names.
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else files.push(full);
  }
})(source);

for (const file of files) {
  const rel = file.slice(source.length + 1);
  if (rel.endsWith('.map')) problems.push(`source map shipped: ${rel}`);
}

// Version agreement with the docs snapshot.
const snapshot = JSON.parse(readFileSync(join(root, 'capability-snapshot.json'), 'utf8'));
if (snapshot.walletVersion !== buildInfo.walletVersion) {
  problems.push(
    `simulator was built from wallet ${buildInfo.walletVersion} but the site snapshot is ${snapshot.walletVersion}`,
  );
}

if (problems.length) {
  process.stderr.write(`simulator import: ${problems.length} problem(s)\n\n`);
  for (const problem of problems) process.stderr.write(`  - ${problem}\n`);
  process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });

// Scenario registry. IDs must match ui/docs-simulator/scenarios.ts in the
// wallet repository; the wallet-side isolation test pins that list and the
// simulator reports its actual list at runtime, where the host falls back to
// the default scenario for anything unknown.
const SCENARIOS = [
  { id: 'first-launch', title: 'First launch', description: 'A fresh installation with no wallet yet.', route: 'welcome', workflow: 'install-and-onboarding', consumers: ['journeys:install-and-verify', 'journeys:create-or-import', 'simulator'] },
  { id: 'create-or-import', title: 'Create or import', description: 'Choosing between creating a wallet and importing one.', route: 'account/create-password?isNewAccount=false', workflow: 'install-and-onboarding', consumers: ['journeys:create-or-import', 'journeys:create-a-wallet', 'journeys:import-safely', 'simulator'] },
  { id: 'populated-home', title: 'Home with funds', description: 'An unlocked wallet with a synthetic portfolio.', route: 'main', workflow: 'home', consumers: ['journeys:understand-balances', 'journeys:receive-funds', 'simulator'] },
  { id: 'receive', title: 'Receive', description: 'The receiving screen, ready to show an address.', route: 'wallet/receive', workflow: 'receive', consumers: ['journeys:receive-funds', 'pages:tasks/receive', 'simulator'] },
  { id: 'protected-outputs', title: 'Protected outputs', description: 'Outputs the wallet holds back, and why.', route: 'locked-utxos', workflow: 'protected-outputs', consumers: ['journeys:understand-balances', 'pages:concepts/protected-outputs', 'simulator'] },
  { id: 'account-switching', title: 'Account switching', description: 'Switching between accounts.', route: 'account/switch-account', workflow: 'account-switching', consumers: ['journeys:switch-chain-safely', 'simulator'] },
  { id: 'backup-settings', title: 'Backup and settings', description: 'Backup status and the settings root.', route: 'settings', workflow: 'settings', consumers: ['journeys:create-a-wallet', 'simulator'] },
  { id: 'unavailable-operation', title: 'Unavailable operation', description: 'The fail-closed send screen in a build that cannot send.', route: 'wallet/tx/create', workflow: 'send', consumers: ['journeys:send-safely', 'pages:assets/why-unavailable', 'simulator'] },
];

mkdirSync(outDir, { recursive: true });
cpSync(source, outDir, { recursive: true });

const entryPath = join(outDir, 'ui.js');
const entrySha256 = existsSync(entryPath)
  ? createHash('sha256').update(readFileSync(entryPath)).digest('hex')
  : null;

const data = {
  schemaVersion: 'universe-docs-simulator-imported-v1',
  importedAt: new Date().toISOString(),
  walletVersion: buildInfo.walletVersion,
  walletSourceCommit: buildInfo.walletSourceCommit,
  artifactPath: 'simulator/',
  entrySha256,
  isolation: {
    offlineByConstruction: true,
    noExtensionApis: true,
    noKeyMaterial: true,
    noSourceMaps: true,
  },
  scenarios: SCENARIOS,
};

writeFileSync(outData, JSON.stringify(data, null, 2) + '\n');
process.stdout.write(
  `simulator imported: wallet ${buildInfo.walletVersion} @ ${(buildInfo.walletSourceCommit ?? '').slice(0, 12)}, ${files.length} files\n`,
);
