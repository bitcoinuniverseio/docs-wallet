#!/usr/bin/env node
// Documentation checks for docs-wallet.
// Fails on: the prohibited U+2014 character, broken internal links,
// broken internal anchors, and Markdown files that no page links to.
// Run: node scripts/check-docs.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative, sep } from 'node:path';

const root = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const problems = [];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const allFiles = walk(root);
const mdFiles = allFiles.filter((f) => f.endsWith('.md'));

// Collect headings per file so anchor links can be verified.
function anchorsOf(file) {
  const anchors = new Set();
  const seen = new Map();
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = /^#{1,6}\s+(.*)$/.exec(line);
    if (!m) continue;
    let slug = m[1]
      .trim()
      .toLowerCase()
      .replace(/[`*_~[\]()!]/g, '')
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-');
    const count = seen.get(slug) ?? 0;
    seen.set(slug, count + 1);
    if (count > 0) slug = `${slug}-${count}`;
    anchors.add(slug);
  }
  return anchors;
}

const anchorCache = new Map();
const linkedTargets = new Set();

for (const file of mdFiles) {
  const rel = relative(root, file).split(sep).join('/');
  const text = readFileSync(file, 'utf8');

  // 1. Prohibited character U+2014.
  text.split('\n').forEach((line, i) => {
    if (line.includes('—')) {
      problems.push(`${rel}:${i + 1} contains the prohibited U+2014 character`);
    }
  });

  // 2. Internal links must resolve; anchors must exist.
  const linkRe = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  for (const m of text.matchAll(linkRe)) {
    const target = m[1];
    if (/^(https?:|mailto:|#)/.test(target)) {
      if (target.startsWith('#')) {
        if (!anchorCache.has(file)) anchorCache.set(file, anchorsOf(file));
        if (!anchorCache.get(file).has(target.slice(1))) {
          problems.push(`${rel} links to missing anchor ${target}`);
        }
      }
      continue;
    }
    const [pathPart, anchor] = target.split('#');
    const dest = resolve(dirname(file), decodeURIComponent(pathPart));
    if (!existsSync(dest)) {
      problems.push(`${rel} links to missing file ${target}`);
      continue;
    }
    linkedTargets.add(resolve(dest));
    if (anchor && dest.endsWith('.md')) {
      if (!anchorCache.has(dest)) anchorCache.set(dest, anchorsOf(dest));
      if (!anchorCache.get(dest).has(anchor)) {
        problems.push(`${rel} links to ${pathPart} but its anchor #${anchor} does not exist`);
      }
    }
  }
}

// 3. Every page except the entry README must be reachable from some other page.
for (const file of mdFiles) {
  const rel = relative(root, file).split(sep).join('/');
  if (rel === 'README.md') continue;
  if (!linkedTargets.has(resolve(file))) {
    problems.push(`${rel} is not linked from any other page`);
  }
}

if (problems.length > 0) {
  console.error(`Documentation checks failed (${problems.length} problem${problems.length === 1 ? '' : 's'}):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`Documentation checks passed for ${mdFiles.length} Markdown files.`);
