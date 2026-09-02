#!/usr/bin/env node
// Generate the machine-readable documentation corpus after the static build.
//
// Everything here is derived from the same generated data the site renders, so
// AI clients and the MCP server read exactly what humans read:
//   - public/llms-full.txt        the whole site as plain text (llms.txt stays hand-shaped)
//   - public/api/releases.json    the release catalog
//   - public/api/capabilities.json the capability snapshot
//   - public/api/journeys.json    the journey catalog
//   - public/api/catalog.json     page catalog with content hashes
//   - public/markdown/<page>.md   a clean Markdown view of every page
//
// Determinism: the corpus is a pure function of dist/ and src/data, and a
// freshness gate (`--check`) re-derives and compares, failing CI on drift.
//
// Usage: node scripts/build-machine-readable.mjs [--check]

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const check = process.argv.includes('--check');

if (!existsSync(dist)) {
  process.stderr.write('dist/ missing; run the build first\n');
  process.exit(1);
}

const releases = JSON.parse(readFileSync(join(root, 'src', 'data', 'releases.json'), 'utf8'));
const snapshot = JSON.parse(readFileSync(join(root, 'capability-snapshot.json'), 'utf8'));
const journeys = JSON.parse(readFileSync(join(root, 'src', 'data', 'journeys.json'), 'utf8'));
const captures = JSON.parse(readFileSync(join(root, 'src', 'data', 'captures.json'), 'utf8'));

// ---------------------------------------------------------------- page corpus

// Walk dist HTML, skip the simulator artifact (it carries its own metadata),
// and derive a Markdown view by stripping tags from the static HTML.
const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (full.includes(join('dist', 'simulator'))) continue;
    if (full.includes(join('dist', 'pagefind'))) continue;
    let isDirectory = false;
    try {
      isDirectory = statSync(full).isDirectory();
    } catch {
      continue;
    }
    if (isDirectory) {
      walk(full);
      continue;
    }
    if (name.endsWith('.html')) pages.push(full);
  }
})(dist);

function htmlToMarkdown(html) {
  const title = /<title>(.*?)<\/title>/s.exec(html)?.[1] ?? '';
  const description = /<meta name="description" content="(.*?)"/s.exec(html)?.[1] ?? '';
  let body = /<main[^>]*>([\s\S]*?)<\/main>/s.exec(html)?.[1] ?? html;
  // Strip scripts, styles, and SVG; keep the text skeleton.
  body = body
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<(h1|h2|h3|h4)[^>]*>([\s\S]*?)<\/\1>/g, (_, level, text) => `\n${'#'.repeat(Number(level[1]))} ${text.replace(/<[^>]+>/g, '').trim()}\n`)
    .replace(/<li[^>]*>/g, '\n- ')
    .replace(/<\/(p|div|section|figure|ul|ol)>/g, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return `# ${title}\n\n${description}\n\n${body}\n`;
}

const markdownDir = join(dist, 'markdown');
const catalogEntries = [];
const generated = new Map(); // relative dist path -> content

rmSync(markdownDir, { recursive: true, force: true });
mkdirSync(markdownDir, { recursive: true });

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const markdown = htmlToMarkdown(html);
  const rel = relative(join(dist), page).replace(/\\/g, '/');
  const mdName = rel === 'index.html' ? 'index.md' : rel.replace(/\.html$/, '.md').replace(/\/index\.md$/, '.md');
  generated.set(join('markdown', mdName), markdown);
  catalogEntries.push({
    path: rel,
    markdown: `markdown/${mdName}`,
    title: /<title>(.*?)<\/title>/s.exec(html)?.[1] ?? rel,
    contentSha256: createHash('sha256').update(html).digest('hex'),
  });
}

// llms-full.txt: every page, plain text, in catalog order.
const llmsFull = [
  '# Universe Wallet documentation - full text',
  '',
  `Derived from the static site for wallet ${snapshot.walletVersion}. ${snapshot.supportedProtocolCount} of ${snapshot.protocolCount} protocols authorize operations in this tree; every write operation fails closed.`,
  '',
  ...catalogEntries.map((entry) => {
    const markdown = generated.get(entry.markdown) ?? '';
    return `<!-- ${entry.path} -->\n\n${markdown}`;
  }),
].join('\n');

generated.set('llms-full.txt', llmsFull);
generated.set(
  join('api', 'releases.json'),
  JSON.stringify({ ...releases, generatedAt: releases.generatedAt }, null, 2),
);
generated.set(
  join('api', 'capabilities.json'),
  JSON.stringify(
    {
      walletVersion: snapshot.walletVersion,
      chains: snapshot.chains,
      protocolCount: snapshot.protocolCount,
      supportedProtocolCount: snapshot.supportedProtocolCount,
      anyProtocolSupported: snapshot.anyProtocolSupported,
      protocols: snapshot.protocols,
      capabilitySnapshotSha256: createHash('sha256')
        .update(readFileSync(join(root, 'capability-snapshot.json')))
        .digest('hex'),
    },
    null,
    2,
  ),
);
generated.set(
  join('api', 'journeys.json'),
  JSON.stringify({ schemaVersion: 'universe-doc-journeys-v1', journeys }, null, 2),
);
generated.set(
  join('api', 'provider-contract.json'),
  readFileSync(join(root, 'src', 'data', 'provider-contract.json'), 'utf8'),
);
generated.set(
  join('api', 'catalog.json'),
  JSON.stringify(
    {
      schemaVersion: 'universe-docs-catalog-v1',
      walletVersion: snapshot.walletVersion,
      releaseCatalog: 'api/releases.json',
      capabilities: 'api/capabilities.json',
      journeys: 'api/journeys.json',
      providerContract: 'api/provider-contract.json',
      captures: {
        count: captures.captures.length,
        walletVersion: captures.walletVersion,
        exportManifestSha256: captures.exportManifestSha256,
      },
      pages: catalogEntries.sort((a, b) => a.path.localeCompare(b.path)),
    },
    null,
    2,
  ),
);

// ------------------------------------------------------------------ write/check

let changed = 0;
for (const [rel, content] of generated) {
  const target = join(dist, rel);
  if (check) {
    if (!existsSync(target) || readFileSync(target, 'utf8') !== content) {
      process.stderr.write(`stale machine-readable output: ${rel}\n`);
      changed += 1;
    }
  } else {
    mkdirSync(dirname(target), { recursive: true });
    const existing = existsSync(target) ? readFileSync(target, 'utf8') : null;
    if (existing !== content) {
      writeFileSync(target, content);
      changed += 1;
    }
  }
}

const summary = `${changed} file(s) ${check ? 'stale' : 'written'}, ${catalogEntries.length} pages in catalog`;
if (check && changed > 0) {
  process.stderr.write(`machine-readable freshness gate FAILED: ${summary}\n`);
  process.exit(1);
}
process.stdout.write(`machine-readable corpus: ${summary}\n`);
