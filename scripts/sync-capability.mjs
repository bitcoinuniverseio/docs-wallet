#!/usr/bin/env node
// Keeps every version and capability claim on this site identical to the
// release it describes.
//
// The wallet repository generates docs/PUBLIC-CAPABILITY-SUMMARY.json from the
// version in its package.json and the authorization state in its protocol
// release matrix. That file is the only place a capability claim may come from.
// capability-snapshot.json here is a copy of it, and every count on the site is
// rendered from that copy at build time rather than typed into prose.
//
// This exists because a documentation set that describes support in prose will
// drift from the build, and a claim that a protocol works when the release does
// not authorize it is a false statement about someone's money, not a stale
// sentence.
//
// Usage:
//   node scripts/sync-capability.mjs --pull [path]  refresh the snapshot from the wallet repository
//   node scripts/sync-capability.mjs --check        fail if any page contradicts the snapshot

import { copyFileSync, existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const snapshotPath = resolve(root, 'capability-snapshot.json');

const args = process.argv.slice(2);
const pullIndex = args.indexOf('--pull');

if (pullIndex !== -1) {
  const source = resolve(
    root,
    args[pullIndex + 1] && !args[pullIndex + 1].startsWith('--')
      ? args[pullIndex + 1]
      : '../../wallet/wallet/docs/PUBLIC-CAPABILITY-SUMMARY.json',
  );
  if (!existsSync(source)) {
    process.stderr.write(
      `Cannot refresh the snapshot: ${source} does not exist.\n` +
        'Run `npm run generate:public-capability-summary` in the wallet repository first, ' +
        'or pass the path explicitly with --pull <path>.\n',
    );
    process.exit(1);
  }
  copyFileSync(source, snapshotPath);
  process.stdout.write(`Refreshed capability-snapshot.json from ${source}\n`);
}

const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'));
const problems = [];

// The snapshot has to be internally consistent before it can be trusted.
const computedSupported = snapshot.protocols.filter((p) => p.supportedOperations.length > 0).length;
if (computedSupported !== snapshot.supportedProtocolCount) {
  problems.push(
    `capability-snapshot.json: supportedProtocolCount is ${snapshot.supportedProtocolCount} but ` +
      `${computedSupported} protocols carry supported operations.`,
  );
}
if (snapshot.protocols.length !== snapshot.protocolCount) {
  problems.push(
    `capability-snapshot.json: protocolCount is ${snapshot.protocolCount} but the array holds ` +
      `${snapshot.protocols.length}.`,
  );
}
if (snapshot.anyProtocolSupported !== computedSupported > 0) {
  problems.push('capability-snapshot.json: anyProtocolSupported disagrees with the protocol list.');
}

// No page may state a version or a count that contradicts the snapshot. Counts
// belong in JSX expressions reading the snapshot, not in typed prose.
const version = snapshot.walletVersion;
const versionShape = /\b1\.\d+\.\d+\.\d+\b/g;
const countShape = /\b(\d{1,3})\s+of\s+(\d{1,3})\s+protocols\b/gi;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.mdx?$/.test(name)) out.push(full);
  }
  return out;
}

const contentDir = join(root, 'src', 'content', 'docs');
const pages = existsSync(contentDir) ? walk(contentDir) : [];

for (const file of pages) {
  const rel = relative(root, file).split('\\').join('/');
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    for (const m of line.matchAll(versionShape)) {
      // 1.0.13 is the published store build and is deliberately different.
      if (m[0] !== version && m[0] !== '1.0.13' && !/1\.7\.5\.[456]/.test(m[0])) {
        problems.push(`${at} names version ${m[0]}, which is neither ${version} nor a documented candidate.`);
      }
    }
    for (const m of line.matchAll(countShape)) {
      if (Number(m[1]) !== snapshot.supportedProtocolCount || Number(m[2]) !== snapshot.protocolCount) {
        problems.push(
          `${at} states "${m[0]}" but the snapshot says ${snapshot.supportedProtocolCount} of ` +
            `${snapshot.protocolCount}. Render counts from the snapshot instead of typing them.`,
        );
      }
    }
  });
}

if (problems.length) {
  process.stderr.write(`Capability claims: ${problems.length} problem(s).\n\n`);
  for (const p of problems) process.stderr.write(`  ${p}\n`);
  process.stderr.write(
    '\nEvery version and capability claim must come from capability-snapshot.json.\n' +
      'Refresh it with `npm run capability:pull` after regenerating it in the wallet repository.\n',
  );
  process.exit(1);
}

process.stdout.write(
  `Capability claims pass. Wallet ${version}, ${snapshot.supportedProtocolCount} of ` +
    `${snapshot.protocolCount} protocols authorized, ${pages.length} pages checked.\n`,
);
