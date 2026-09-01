#!/usr/bin/env node
// Generates llms.txt from the content collection, so that every URL in it is a
// page that exists and every description is the page's own.
//
// Run: node scripts/generate-llms.mjs
// Check: node scripts/generate-llms.mjs --check

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://bitcoinuniverseio.github.io/docs-wallet';
const snapshot = JSON.parse(readFileSync(join(root, 'capability-snapshot.json'), 'utf8'));

const SECTIONS = [
  ['Start here', 'start'],
  ['How it works', 'concepts'],
  ['Everyday tasks', 'tasks'],
  ['Assets and protocols', 'assets'],
  ['Safety', 'safety'],
  ['Reference', 'reference'],
  ['Developers', 'developers'],
  ['Help', 'help'],
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.mdx?$/.test(name)) out.push(full);
  }
  return out;
}

const contentDir = join(root, 'src', 'content', 'docs');
const pages = walk(contentDir)
  .map((file) => {
    const rel = relative(contentDir, file).split('\\').join('/');
    const slug = rel.replace(/\.mdx?$/, '');
    const text = readFileSync(file, 'utf8');
    const title = /^title:\s*(.+)$/m.exec(text)?.[1]?.trim() ?? slug;
    const description = /^description:\s*(.+)$/m.exec(text)?.[1]?.trim() ?? '';
    return { slug, title, description, section: slug.includes('/') ? slug.split('/')[0] : null };
  })
  .filter((p) => p.slug !== '404');

const lines = [];
lines.push('# Universe Wallet documentation');
lines.push('');
lines.push(
  '> User documentation for Universe Wallet, a self-custody browser extension for Bitcoin, Dogecoin,',
);
lines.push(
  '> Zcash, and Fractal Bitcoin. It keeps coins carrying digital artifacts out of ordinary payments',
);
lines.push('> and puts a readable account of every signature in front of the user.');
lines.push('');
lines.push('## Facts that govern every claim on this site');
lines.push('');
lines.push(`- Documented version: Universe Wallet ${snapshot.walletVersion}, from the source tree.`);
lines.push('- Published version: 1.0.13, on the Chrome Web Store since 2025-04-15.');
lines.push(`- ${snapshot.walletVersion} has NOT been submitted or published.`);
lines.push(
  `- Protocol authorization in the committed baseline: ${snapshot.supportedProtocolCount} of ${snapshot.protocolCount} protocols.`,
);
lines.push(
  '- No protocol operation is available in any released build. Ordinary Bitcoin sending is also gated.',
);
lines.push(
  '- There is no fee bump, no speed up, and no child-pays-for-parent flow anywhere in the product.',
);
lines.push('- Universe cannot recover a lost recovery phrase, move funds, or reverse a transaction.');
lines.push('- Lifecycle: experimental. Chains: Bitcoin, Dogecoin, Zcash, Fractal Bitcoin.');
lines.push('');
lines.push(`- [Documentation home](${BASE}/): entry point, current version position, and safety index.`);
lines.push('');

for (const [label, dir] of SECTIONS) {
  const items = pages.filter((p) => p.section === dir);
  if (!items.length) continue;
  lines.push(`## ${label}`);
  lines.push('');
  for (const p of items.sort((a, b) => a.slug.localeCompare(b.slug))) {
    lines.push(`- [${p.title}](${BASE}/${p.slug}): ${p.description}`);
  }
  lines.push('');
}

lines.push('## Source');
lines.push('');
lines.push('- [Product source](https://github.com/bitcoinuniverseio/wallet): the wallet extension, private to the organization.');
lines.push('- [Documentation source](https://github.com/bitcoinuniverseio/docs-wallet): this site.');
lines.push('- [Release candidates](https://github.com/bitcoinuniverseio/wallet/releases): pre-releases named by commit. A pre-release is not an authorized build.');
lines.push('- [Bitcoin Universe documentation portal](https://docs.bitcoinuniverse.io): every component.');
lines.push('');

const output = lines.join('\n');
const target = join(root, 'llms.txt');

if (process.argv.includes('--check')) {
  const current = readFileSync(target, 'utf8');
  if (current !== output) {
    process.stderr.write('llms.txt is stale. Run `node scripts/generate-llms.mjs`.\n');
    process.exit(1);
  }
  process.stdout.write('llms.txt is current.\n');
} else {
  writeFileSync(target, output);
  process.stdout.write(`Wrote llms.txt with ${pages.length} pages.\n`);
}
