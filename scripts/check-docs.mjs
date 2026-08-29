#!/usr/bin/env node
// Documentation checks for docs-wallet.
// Fails on: the prohibited U+2014 character, emoji used as decoration, broken
// internal links, broken internal anchors, Markdown files that no page links
// to, images that do not exist, images with no alt text, SVG assets missing an
// accessible title, and capability blocks that have drifted from the snapshot.
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
    if (line.includes('\u2014')) {
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

// 4. Images must resolve, carry alt text, and expose an accessible name.
for (const file of mdFiles) {
  const rel = relative(root, file).split(sep).join('/');
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const [, alt, target] = m;
    if (!alt.trim()) problems.push(`${rel} embeds ${target} with no alt text`);
    if (/^https?:/.test(target)) {
      problems.push(`${rel} embeds a remote image ${target}; documentation images must be committed here`);
      continue;
    }
    const dest = resolve(dirname(file), decodeURIComponent(target.split('#')[0]));
    if (!existsSync(dest)) {
      problems.push(`${rel} embeds missing image ${target}`);
      continue;
    }
    linkedTargets.add(resolve(dest));
    if (dest.endsWith('.svg')) {
      const svg = readFileSync(dest, 'utf8');
      if (!/<title[ >]/.test(svg) || !/<desc[ >]/.test(svg)) {
        problems.push(`${target} needs both a <title> and a <desc> so it is readable without sight`);
      }
      if (!/role="img"/.test(svg) || !/aria-labelledby=/.test(svg)) {
        problems.push(`${target} needs role="img" and aria-labelledby`);
      }
      if (!/prefers-color-scheme: dark/.test(svg)) {
        problems.push(`${target} has no dark-theme rules and will be unreadable for half the readers`);
      }
    }
  }
}

// 5. Emoji must not stand in for words, icons, or status markers.
// Ranges cover pictographs, transport and map symbols, dingbats, supplemental
// symbols and the emoji variation selector. Typographic marks used in the prose
// (the middle dot in navigation rows) are not emoji and are not matched here.
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{1F000}-\u{1F0FF}\u{2600}-\u{27BF}\u{FE0F}]/u;
for (const file of [...mdFiles, ...allFiles.filter((f) => f.endsWith('llms.txt'))]) {
  const rel = relative(root, file).split(sep).join('/');
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      const hit = EMOJI.exec(line);
      if (hit) problems.push(`${rel}:${i + 1} uses the emoji ${hit[0]} as decoration`);
    });
}

// 6. Capability blocks must match the committed snapshot.
// The snapshot is generated in the wallet repository from its version and its
// protocol release matrix. A page that has drifted from it is claiming something
// about a build that the build does not support.
{
  const snapshot = JSON.parse(readFileSync(resolve(root, 'capability-snapshot.json'), 'utf8'));
  let sawVersionBlock = false;
  for (const file of mdFiles) {
    const rel = relative(root, file).split(sep).join('/');
    const text = readFileSync(file, 'utf8');
    if (text.includes('<!-- capability:version start -->')) sawVersionBlock = true;
    // A version literal outside a generated block will not be updated by the
    // release, so it is a claim waiting to go stale.
    for (const m of text.matchAll(/\b\d+\.\d+\.\d+\.\d+\b/g)) {
      if (m[0] === snapshot.walletVersion) continue;
      problems.push(`${rel} names version ${m[0]}, but this documentation set describes ${snapshot.walletVersion}`);
    }
  }
  if (!sawVersionBlock) problems.push('no page carries the capability:version block');
}

if (problems.length > 0) {
  console.error(`Documentation checks failed (${problems.length} problem${problems.length === 1 ? '' : 's'}):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`Documentation checks passed for ${mdFiles.length} Markdown files.`);
