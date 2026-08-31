#!/usr/bin/env node
// Keeps every version and capability claim in this documentation identical to
// the release it describes.
//
// The wallet repository generates docs/PUBLIC-CAPABILITY-SUMMARY.json from the
// version in its package.json and the authorization state in its protocol
// release matrix. That file is the only place a capability claim may come from.
// `capability-snapshot.json` here is a copy of it, and the blocks between
// `<!-- capability:NAME start -->` and `<!-- capability:NAME end -->` markers in
// the Markdown are generated from that copy.
//
// This exists because a documentation set and a store listing that describe
// support in prose will drift from the build, and a claim that a protocol works
// when the release does not authorize it is a false statement about someone's
// money, not a stale sentence.
//
// Usage:
//   node scripts/sync-capability.mjs --pull [path]  refresh the snapshot from the wallet repository
//   node scripts/sync-capability.mjs                rewrite the marked blocks from the snapshot
//   node scripts/sync-capability.mjs --check        fail if any marked block is stale

import { copyFileSync, existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url).replace(/^\/([A-Za-z]:)/, '$1'));
const root = resolve(here, '..');
const snapshotPath = resolve(root, 'capability-snapshot.json');

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
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

// ---------------------------------------------------------------------------
// Block builders. Each returns the body that goes between its markers.
// ---------------------------------------------------------------------------

const blocks = {
  version() {
    return [`This documentation describes Universe Wallet ${snapshot.walletVersion}.`];
  },

  networks() {
    // Every network the release matrix covers, listed in full. A chain without a
    // Mainnet row is real: Babylon's Cosmos network is reached through the
    // staking flow rather than as a wallet-level chain, and splitting the column
    // into "mainnet plus extras" made that chain read as if it were missing one.
    const lines = ['| Chain | Unit | Networks |', '| --- | --- | --- |'];
    for (const chain of snapshot.chains) {
      lines.push(`| ${chain.name} | ${chain.unit} | ${chain.networks.join(', ')} |`);
    }
    return lines;
  },

  // The one sentence a reader needs about protocol support in the release they
  // installed. It is generated so it cannot be left behind by a release, and it
  // is deliberately blunt when nothing is authorized.
  'support-state'() {
    if (!snapshot.anyProtocolSupported) {
      return [
        `**No protocol operation is authorized in ${snapshot.walletVersion}.**`,
        '',
        `The wallet carries code for ${snapshot.protocolCount} protocols, and the release intends to ship many of`,
        'them. None of them has completed evidence for this build, so every protocol action fails closed:',
        'the screen loads, states that the operation is unavailable, and names what is missing. Bitcoin,',
        'Dogecoin and Zcash balances, receive, send, review, activity, coin control, connections, backup and',
        'recovery are unaffected, because they do not sit behind a protocol gate.',
        '',
        'See [why a protocol appears only when evidence proves it](assets-and-protocols/supported-protocols.md).',
      ];
    }
    return [
      `${snapshot.supportedProtocolCount} of ${snapshot.protocolCount} protocols are authorized in ` +
        `${snapshot.walletVersion}. Every other protocol fails closed and says what is missing.`,
    ];
  },

  protocols() {
    const state = {
      supported: 'Supported',
      'partly-supported': 'Partly supported',
      'not-in-this-release': 'Not in this release',
    };
    const lines = ['| Protocol | State in this release | Operations you can use |', '| --- | --- | --- |'];
    for (const protocol of snapshot.protocols) {
      const operations = protocol.supportedOperations.length ? protocol.supportedOperations.join(', ') : 'None';
      lines.push(`| ${protocol.name} | ${state[protocol.supportState]} | ${operations} |`);
    }
    return lines;
  },
};

// ---------------------------------------------------------------------------
// Rewrite
// ---------------------------------------------------------------------------

function markdownFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules' || name === 'assets') continue;
    const full = resolve(dir, name);
    if (statSync(full).isDirectory()) markdownFiles(full, out);
    else if (name.endsWith('.md') || name === 'llms.txt') out.push(full);
  }
  return out;
}

const files = markdownFiles(root);
const stale = [];
const rewritten = [];
const seenBlocks = new Set();

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  const eol = original.includes('\r\n') ? '\r\n' : '\n';
  let updated = original;

  for (const [name, build] of Object.entries(blocks)) {
    const startMarker = `<!-- capability:${name} start -->`;
    const endMarker = `<!-- capability:${name} end -->`;
    const start = updated.indexOf(startMarker);
    if (start === -1) continue;
    const end = updated.indexOf(endMarker, start);
    if (end === -1) {
      process.stderr.write(`${file} opens capability:${name} but never closes it.\n`);
      process.exit(1);
    }
    seenBlocks.add(name);
    const body = build().join(eol);
    const replacement = `${startMarker}${eol}${eol}${body}${eol}${eol}`;
    updated = updated.slice(0, start) + replacement + updated.slice(end);
  }

  if (updated === original) continue;
  if (checkOnly) stale.push(file.slice(root.length + 1).replaceAll('\\', '/'));
  else {
    writeFileSync(file, updated);
    rewritten.push(file.slice(root.length + 1).replaceAll('\\', '/'));
  }
}

const unused = Object.keys(blocks).filter((name) => !seenBlocks.has(name));
if (unused.length) {
  process.stderr.write(
    `These capability blocks are defined but no page uses them: ${unused.join(', ')}. ` +
      'Either place the marker or remove the builder, so the generator cannot quietly stop covering a claim.\n',
  );
  process.exit(1);
}

if (checkOnly) {
  if (stale.length) {
    process.stderr.write(
      `Capability blocks are stale in: ${stale.join(', ')}. Run \`node scripts/sync-capability.mjs\`.\n`,
    );
    process.exit(1);
  }
  process.stdout.write(`Capability blocks are current for ${snapshot.walletVersion}.\n`);
  process.exit(0);
}

process.stdout.write(
  rewritten.length
    ? `Updated capability blocks in: ${rewritten.join(', ')}\n`
    : `Capability blocks already current for ${snapshot.walletVersion}.\n`,
);
