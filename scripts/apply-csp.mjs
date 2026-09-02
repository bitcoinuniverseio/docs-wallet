#!/usr/bin/env node
// Post-build CSP enforcement for a static site.
//
// GitHub Pages serves no headers, so the policy ships as a <meta> tag injected
// into every built page. Inline scripts are not trusted: each page's own
// inline scripts are hashed at build time and pinned with 'sha256-...', a
// deterministic build-safe mechanism. Frames: same-origin only (the simulator
// iframe). connect-src: same-origin (Pagefind's index). Nothing third-party is
// reachable from any page.
//
// Usage: node scripts/apply-csp.mjs

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    // The simulator artifact carries its own CSP (it needs wasm-unsafe-eval,
    // which the prose site must not).
    if (full.startsWith(join(dist, 'simulator'))) continue;
    let entries;
    try {
      entries = readdirSync(full);
    } catch {
      if (name.endsWith('.html')) pages.push(full);
      continue;
    }
    walk(full);
  }
})(dist);

const META = /<meta http-equiv="Content-Security-Policy"[^>]*>/;
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
let injected = 0;

for (const page of pages) {
  let html = readFileSync(page, 'utf8');

  const hashes = new Set();
  for (const match of html.matchAll(INLINE_SCRIPT)) {
    const [, attrs, content] = match;
    if (attrs.includes('type="application/ld+json"')) continue; // data, not executable
    if (content.trim().length === 0) continue;
    hashes.add(`'sha256-${createHash('sha256').update(content).digest('base64')}'`);
  }

  const policy = [
    "default-src 'self'",
    `script-src 'self' ${[...hashes].join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-src 'self'",
    "worker-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
  ].join('; ');

  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}">`;
  if (META.test(html)) {
    html = html.replace(META, meta);
  } else {
    html = html.replace(/<head([^>]*)>/, `<head$1>${meta}`);
  }
  writeFileSync(page, html);
  injected += 1;
}

process.stdout.write(`CSP meta applied to ${injected} pages\n`);
