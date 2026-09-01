#!/usr/bin/env node
// Manifest and provenance checks.
//
// Two things are verified here:
//   1. docs.manifest.json matches the shared schema, so the portal can ingest it.
//   2. Every material page carries provenance, because a page about money that
//      does not say what it was checked against is asking to be believed on
//      trust alone.
//
// Run: node scripts/check-manifest.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];

// ---------------------------------------------------------------- manifest --
const manifestPath = join(root, 'docs.manifest.json');
if (!existsSync(manifestPath)) {
  problems.push('docs.manifest.json is missing.');
} else {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    problems.push(`docs.manifest.json is not valid JSON: ${e.message}`);
  }
  if (manifest) {
    const required = [
      'schemaVersion',
      'id',
      'name',
      'classification',
      'repository',
      'documentationUrl',
      'docsRoot',
      'sourceRef',
      'lifecycle',
      'chains',
      'audiences',
      'owners',
      'securityClassification',
      'lastVerified',
    ];
    for (const key of required) {
      if (manifest[key] === undefined) problems.push(`docs.manifest.json is missing "${key}".`);
    }
    if (manifest.securityClassification !== 'public') {
      problems.push('docs.manifest.json securityClassification must be "public".');
    }
    if (manifest.classification !== 'product-docs') {
      problems.push('docs.manifest.json classification should be "product-docs" for this repository.');
    }
    if (!/^[0-9a-f]{40}$/.test(manifest.lastVerified?.commit ?? '')) {
      problems.push('docs.manifest.json lastVerified.commit must be a 40 character hex commit.');
    }
    if (['stable', 'beta', 'deprecated'].includes(manifest.lifecycle)) {
      if (!manifest.releasedRef || !manifest.releaseVersion) {
        problems.push(
          `docs.manifest.json lifecycle is "${manifest.lifecycle}" so releasedRef and releaseVersion are required. ` +
            'If no real release can be verified, use lifecycle "experimental" rather than inventing one.',
        );
      }
    }
    if (!existsSync(join(root, manifest.docsRoot ?? ''))) {
      problems.push(`docs.manifest.json docsRoot "${manifest.docsRoot}" does not exist.`);
    }
    for (const p of manifest.protocols ?? []) {
      if (!/^[a-z0-9][a-z0-9-]*$/.test(p)) {
        problems.push(`docs.manifest.json protocol id "${p}" does not match the schema pattern.`);
      }
    }
  }
}

// -------------------------------------------------------------- provenance --
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
  const text = readFileSync(file, 'utf8');
  const fm = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!fm) {
    problems.push(`${rel} has no front matter.`);
    continue;
  }
  const front = fm[1];

  if (!/^title:/m.test(front)) problems.push(`${rel} has no title.`);
  if (!/^description:/m.test(front)) {
    problems.push(`${rel} has no description. Every page needs a unique meta description.`);
  }

  // Navigation pages opt out of provenance explicitly.
  if (/^provenance:\s*false/m.test(front)) continue;

  if (!/^lastVerified:/m.test(front)) {
    problems.push(`${rel} has no lastVerified date. Say when a human last checked this against source.`);
  }
  if (!/^lifecycle:/m.test(front)) {
    problems.push(`${rel} has no lifecycle.`);
  }
}

// Descriptions must be unique, or search results and social cards collapse
// into each other.
const seen = new Map();
for (const file of pages) {
  const rel = relative(root, file).split('\\').join('/');
  const m = /^description:\s*(.+)$/m.exec(readFileSync(file, 'utf8'));
  if (!m) continue;
  const value = m[1].trim();
  if (seen.has(value)) problems.push(`${rel} repeats the description of ${seen.get(value)}.`);
  else seen.set(value, rel);
}

if (problems.length) {
  process.stderr.write(`Manifest and provenance: ${problems.length} problem(s).\n\n`);
  for (const p of problems) process.stderr.write(`  ${p}\n`);
  process.stderr.write('\n');
  process.exit(1);
}

process.stdout.write(`Manifest and provenance pass. ${pages.length} pages checked.\n`);
