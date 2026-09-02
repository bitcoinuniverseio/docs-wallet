#!/usr/bin/env node
// Bundle budget gate.
//
// The interactive products must not tax ordinary reading. This gate measures
// the gzipped JavaScript the site ships (excluding the simulator artifact and
// the Pagefind engine, which load only on demand) and enforces:
//
//   - the whole site's JavaScript stays within a hard ceiling;
//   - no single script exceeds a per-chunk ceiling, so one careless island
//     cannot silently double a page's cost.
//
// The simulator is budgeted separately: it is a lazily loaded, separately
// cached artifact and must stay self-contained.
//
// Usage: node scripts/check-bundle-budget.mjs

import { gzipSync } from 'node:zlib';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

// Bytes of gzip a single built page may reference as script payloads. The
// prose pages load only the Starlight shell; interactive pages add their own
// islands. No page may drag the whole site's JavaScript with it.
const PAGE_BUDGET = 340 * 1024;
// No single script may exceed this, so one careless island cannot silently
// dominate a page.
const CHUNK_BUDGET = 160 * 1024;
// The simulator is its own lazily loaded, separately cached artifact.
const SIMULATOR_BUDGET = 3 * 1024 * 1024;

const siteScripts = [];
const simulatorBytes = { total: 0 };
let pagefindBytes = 0;

function walk(dir, scope) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    let isDirectory = false;
    try {
      isDirectory = statSync(full).isDirectory();
    } catch {
      continue;
    }
    if (isDirectory) {
      walk(full, scope);
      continue;
    }
    if (scope === 'simulator') {
      if (/\.(js|mjs)$/.test(name)) simulatorBytes.total += gzipSync(readFileSync(full)).length;
      continue;
    }
    if (scope === 'pagefind') {
      if (name.endsWith('.js') || name.endsWith('.wasm')) pagefindBytes += statSync(full).size;
      continue;
    }
    if (name.endsWith('.js')) siteScripts.push(full);
  }
}

walk(dist, 'site');
walk(join(dist, 'simulator'), 'simulator');
walk(join(dist, 'pagefind'), 'pagefind');

const problems = [];
const gzipByPath = new Map(siteScripts.map((file) => [file.slice(dist.length).replace(/\\/g, '/'), gzipSync(readFileSync(file)).length]));
const sizes = [...gzipByPath.entries()].map(([file, gzip]) => ({ file, gzip }));
const total = sizes.reduce((sum, entry) => sum + entry.gzip, 0);

// Per-page: every HTML page's own script references (src + modulepreload),
// resolved against the gzip map. A page pays only for what it references.
(function walkPages(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    let isDirectory = false;
    try {
      isDirectory = statSync(full).isDirectory();
    } catch {
      continue;
    }
    if (isDirectory) {
      walkPages(full);
      continue;
    }
    if (!name.endsWith('.html')) continue;
    const html = readFileSync(full, 'utf8');
    const refs = new Set();
    for (const match of html.matchAll(/<(?:script[^>]*\bsrc|link[^>]*\brel="modulepreload")="([^"]+\.js)"/g)) {
      refs.add(match[1]);
    }
    let pageBytes = 0;
    for (const ref of refs) {
      const path = ref.startsWith('http') ? null : decodeURIComponent(new URL(ref, 'https://x/').pathname);
      const key = path && gzipByPath.has(path) ? path : null;
      if (key) pageBytes += gzipByPath.get(key);
    }
    const label = full.slice(dist.length + 1).replace(/\\/g, '/');
    if (pageBytes > PAGE_BUDGET) {
      problems.push(`${label} references ${(pageBytes / 1024).toFixed(1)} KB gzip of script, over the ${(PAGE_BUDGET / 1024).toFixed(0)} KB page budget`);
    }
  }
})(dist);
for (const entry of sizes) {
  if (entry.gzip > CHUNK_BUDGET) {
    problems.push(`${entry.file} is ${(entry.gzip / 1024).toFixed(1)} KB gzip, over the ${(CHUNK_BUDGET / 1024).toFixed(0)} KB per-chunk budget`);
  }
}
if (simulatorBytes.total > SIMULATOR_BUDGET) {
  problems.push(`simulator artifact is ${(simulatorBytes.total / 1024 / 1024).toFixed(2)} MB, over its budget`);
}
if (pagefindBytes === 0) {
  problems.push('Pagefind engine missing from dist; the Answer Center and palette would have no index');
}

if (problems.length) {
  process.stderr.write(`bundle budget: ${problems.length} problem(s)\n\n`);
  for (const problem of problems) process.stderr.write(`  - ${problem}\n`);
  process.exit(1);
}
process.stdout.write(
  `bundle budget: site JS ${(total / 1024).toFixed(1)} KB gzip across ${sizes.length} scripts ` +
    `(largest ${(Math.max(...sizes.map((entry) => entry.gzip)) / 1024).toFixed(1)} KB), ` +
    `simulator ${(simulatorBytes.total / 1024 / 1024).toFixed(2)} MB (lazy, sandboxed), ` +
    `pagefind ${(pagefindBytes / 1024).toFixed(0)} KB (lazy)\n`,
);
