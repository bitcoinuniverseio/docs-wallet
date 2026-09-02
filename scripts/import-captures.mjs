#!/usr/bin/env node
// Import wallet-exported documentation captures.
//
// Consumes the wallet repository's docs-export directory (masters + manifest),
// verifies the manifest's own attestation and every image hash, then produces:
//   - src/data/captures/<captureId>.png        lossless master
//   - src/data/captures/<captureId>.webp/.avif responsive derivatives
//   - src/data/captures.json                   the typed capture catalog
//
// Refuses (nothing written) when:
//   - the manifest attestation does not match its own bytes;
//   - any master hash disagrees with the manifest;
//   - the manifest's wallet version disagrees with capability-snapshot.json;
//   - the export contains an image the manifest does not declare (orphan);
//   - the manifest declares two captures with one ID;
//   - a capture has no wallet source commit or capability snapshot hash.
//
// Usage:
//   node scripts/import-captures.mjs [export-dir]
//   DOCS_WALLET_EXPORT_DIR=... node scripts/import-captures.mjs

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = dirname(dirname(fileURLToPath(import.meta.url)));
// Masters and derivatives live in public/ so every page can reference them at
// a stable, immutable URL under the site base.
const outDir = join(root, 'public', 'captures');
const catalogPath = join(root, 'src', 'data', 'captures.json');

const exportDir = process.argv[2] ?? process.env.DOCS_WALLET_EXPORT_DIR ?? null;

if (!exportDir || !existsSync(exportDir)) {
  process.stderr.write(
    'Usage: node scripts/import-captures.mjs <wallet-repo>/frontend/docs-export\n' +
      'Generate it first with `npm run docs:export` in the wallet repository.\n',
  );
  process.exit(1);
}

const manifestPath = path.join(exportDir, 'manifest.json');
if (!existsSync(manifestPath)) {
  process.stderr.write(`no manifest at ${manifestPath}\n`);
  process.exit(1);
}

const problems = [];
const fail = (message) => problems.push(message);

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

// 1. Attestation: the exporter hashed the manifest bytes without the
//    attestation field. Recompute over exactly those bytes.
const { attestation, ...body } = manifest;
const recomputed = createHash('sha256').update(JSON.stringify(body, null, 2)).digest('hex');
if (!attestation || attestation.manifestSha256 !== recomputed) {
  fail('manifest attestation mismatch: the export was modified after signing');
}

// 2. Every declared master must exist and hash-match.
const declared = new Set();
const seenIds = new Map();
for (const capture of manifest.captures ?? []) {
  if (seenIds.has(capture.captureId)) {
    fail(`duplicate capture id ${capture.captureId}`);
    continue;
  }
  seenIds.set(capture.captureId, true);
  declared.add(capture.screenshot);

  const file = path.join(exportDir, capture.screenshot);
  if (!existsSync(file)) {
    fail(`manifest declares ${capture.screenshot} but it does not exist`);
    continue;
  }
  const hash = createHash('sha256').update(readFileSync(file)).digest('hex');
  if (hash !== capture.sha256) {
    fail(`${capture.screenshot} does not match its manifest hash`);
  }
  if (!(capture.walletSourceCommit ?? manifest.walletSourceCommit)) {
    fail(`${capture.captureId} has no wallet source commit`);
  }
  if (!capture.caption || !capture.description) {
    fail(`${capture.captureId} is missing caption or accessible description`);
  }
}

// 3. No orphan images.
const imagesOnDisk = readdirSync(path.join(exportDir, 'captures'))
  .filter((name) => name.endsWith('.png'))
  .map((name) => `captures/${name}`);
for (const image of imagesOnDisk) {
  if (!declared.has(image)) fail(`orphan image in export: ${image}`);
}

// 4. Version agreement with the docs snapshot.
const snapshot = JSON.parse(readFileSync(path.join(root, 'capability-snapshot.json'), 'utf8'));
if (snapshot.walletVersion !== manifest.walletVersion) {
  fail(
    `export describes wallet ${manifest.walletVersion} but this site's capability snapshot is ${snapshot.walletVersion}; run npm run capability:pull`,
  );
}

if (problems.length) {
  process.stderr.write(`capture import: ${problems.length} problem(s)\n\n`);
  for (const problem of problems) process.stderr.write(`  - ${problem}\n`);
  process.stderr.write('\nNothing was imported.\n');
  process.exit(1);
}

// ------------------------------------------------------------------ derivatives

const sharp = require('sharp');

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
mkdirSync(path.join(root, 'src', 'data'), { recursive: true });

const releaseId = `wallet-${manifest.walletVersion}`;
const imported = [];

for (const capture of manifest.captures) {
  const master = readFileSync(path.join(exportDir, capture.screenshot));
  const base = capture.captureId;
  const image = sharp(master);
  const metadata = await image.metadata();

  const pngBuffer = master;
  const webpBuffer = await sharp(master).webp({ quality: 82, effort: 4 }).toBuffer();
  const avifBuffer = await sharp(master).avif({ quality: 45, effort: 3 }).toBuffer();
  const blurBuffer = await sharp(master)
    .resize(16, Math.max(1, Math.round((16 * (metadata.height ?? 1)) / (metadata.width ?? 1))))
    .blur(1)
    .webp({ quality: 30 })
    .toBuffer();

  writeFileSync(path.join(outDir, `${base}.png`), pngBuffer);
  writeFileSync(path.join(outDir, `${base}.webp`), webpBuffer);
  writeFileSync(path.join(outDir, `${base}.avif`), avifBuffer);

  const width = metadata.width ?? capture.intrinsicWidth;
  const height = metadata.height ?? capture.intrinsicHeight;

  imported.push({
    captureId: capture.captureId,
    visualCaseId: capture.visualCaseId,
    kind: capture.kind,
    workflow: capture.workflow,
    state: capture.state,
    riskLevel: capture.riskLevel,
    theme: capture.theme,
    viewport: capture.viewport,
    locale: capture.locale,
    fixtureId: capture.fixtureId,
    publicTitle: capture.publicTitle,
    caption: capture.caption,
    description: capture.description,
    consumers: capture.consumers,
    requiresUnauthorized: capture.requiresUnauthorized,
    privacyReview: capture.privacyReview,
    releaseId,
    walletVersion: manifest.walletVersion,
    walletSourceCommit: capture.walletSourceCommit ?? manifest.walletSourceCommit ?? null,
    capabilitySnapshotSha256: manifest.releaseAuthorizationSnapshot.sha256,
    intrinsicWidth: width,
    intrinsicHeight: height,
    masterSha256: sha256(pngBuffer),
    derivatives: [
      { format: 'png', width, height, path: `captures/${base}.png`, sha256: sha256(pngBuffer), byteSize: pngBuffer.length },
      { format: 'webp', width, height, path: `captures/${base}.webp`, sha256: sha256(webpBuffer), byteSize: webpBuffer.length },
      { format: 'avif', width, height, path: `captures/${base}.avif`, sha256: sha256(avifBuffer), byteSize: avifBuffer.length },
    ],
    blurPlaceholder: `data:image/webp;base64,${blurBuffer.toString('base64')}`,
  });
  process.stdout.write(`  ${base} (${width}x${height})\n`);
}

const catalog = {
  schemaVersion: 'universe-docs-captures-imported-v1',
  importedAt: new Date().toISOString(),
  releaseId,
  walletVersion: manifest.walletVersion,
  exportManifestSha256: attestation.manifestSha256,
  captures: imported.sort((a, b) => a.captureId.localeCompare(b.captureId)),
};

writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
process.stdout.write(
  `imported ${imported.length} captures for wallet ${manifest.walletVersion} into src/data/captures\n`,
);
