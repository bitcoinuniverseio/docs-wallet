#!/usr/bin/env node
// Generate the documentation release catalog.
//
// The catalog is built from verified wallet artifacts only:
//   - the live capability snapshot (capability-snapshot.json) for the
//     source tree this site describes;
//   - docs/STORE-LISTING.md facts for the published store build;
//   - the wallet docs-export provenance (provider contract) for the exact
//     source commit.
//
// Nothing speculative enters the catalog: no roadmap entries, no assumed
// dates. A release without a verified publication date carries null.
//
// Usage:
//   node scripts/generate-releases.mjs [wallet-docs-export-dir]

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const exportDir =
  process.argv[2] ??
  process.env.DOCS_WALLET_EXPORT_DIR ??
  'D:/universe/wallet/.runtime/wt-docs-artifacts-20260902/frontend/docs-export';

const snapshot = JSON.parse(readFileSync(join(root, 'capability-snapshot.json'), 'utf8'));
const snapshotSha256 = createHash('sha256')
  .update(readFileSync(join(root, 'capability-snapshot.json')))
  .digest('hex');

let sourceCommit = null;
const contractPath = join(exportDir, 'provider-contract.json');
if (existsSync(contractPath)) {
  const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
  if (contract.walletVersion === snapshot.walletVersion && contract.walletSourceCommit) {
    sourceCommit = contract.walletSourceCommit;
  }
}

// The store build's publication date is recorded in the wallet repository's
// store listing and in this site's versions page. It predates the current
// source tree by more than a year and carries no capability snapshot here.
const catalog = {
  schemaVersion: 'universe-doc-releases-v1',
  generatedAt: new Date().toISOString(),
  defaultReleaseId: `wallet-${snapshot.walletVersion}`,
  releases: [
    {
      id: 'wallet-1.0.13-store',
      version: '1.0.13',
      channel: 'store',
      publicationStatus: 'published',
      publishedAt: '2025-04-15',
      sourceCommit: null,
      capabilitySnapshotSha256: null,
      chains: [{ chain: 'bitcoin', networks: ['mainnet'] }],
      documentationStatus: 'reference-only',
      knownLimitations: [
        'Predates the current documentation by more than a year; screens described here may not exist in this build.',
        'Predates Zcash support entirely.',
        'Protocol authorization state is not verifiable from this site for this build.',
      ],
      notes:
        'The build published to the Chrome Web Store in April 2025. Where this documentation and that build disagree, the installed build is correct for you.',
    },
    {
      id: `wallet-${snapshot.walletVersion}`,
      version: snapshot.walletVersion,
      channel: 'source-development',
      publicationStatus: 'unpublished',
      publishedAt: null,
      sourceCommit,
      capabilitySnapshotSha256: snapshotSha256,
      chains: snapshot.chains.map((chain) => ({
        chain: chain.id,
        networks: chain.networks.map((network) => network.toLowerCase()),
      })),
      documentationStatus: 'described',
      knownLimitations: [
        `This source tree authorizes ${snapshot.supportedProtocolCount} of ${snapshot.protocolCount} protocols; every write operation fails closed.`,
        'Not submitted to the Chrome Web Store; no user has this build unless they built it from source.',
      ],
      notes:
        'The source tree every page on this site was verified against. Its capture set, simulator, and provider contract all pin this version.',
    },
    {
      id: 'wallet-qualification-candidate-2026-08',
      version: snapshot.walletVersion,
      channel: 'candidate',
      publicationStatus: 'unpublished',
      publishedAt: null,
      sourceCommit: null,
      capabilitySnapshotSha256: null,
      chains: [{ chain: 'bitcoin', networks: ['mainnet'] }],
      documentationStatus: 'not-described',
      knownLimitations: [
        'A qualification campaign covering thirteen Zerdinals and ZRunes operations completed against one candidate commit, and that authorization was never published.',
        'The candidate build is not documented on this site because no artifact users could install came from it.',
      ],
      notes:
        'Recorded so the release history is honest: an authorizable artifact exists, and it has not been published.',
    },
  ],
};

const out = join(root, 'src', 'data', 'releases.json');
writeFileSync(out, JSON.stringify(catalog, null, 2) + '\n');
process.stdout.write(
  `release catalog: ${catalog.releases.length} releases, default ${catalog.defaultReleaseId}${sourceCommit ? ` @ ${sourceCommit.slice(0, 12)}` : ''}\n`,
);
