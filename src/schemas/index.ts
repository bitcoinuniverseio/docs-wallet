/**
 * Typed documentation experience model.
 *
 * Every generated or hand-authored record the new products consume has a
 * schema here. `npm run check:data` (and the production build) validate every
 * record against these schemas: an unknown capture ID, an impossible release
 * reference, or a journey step pointing at nothing fails the build instead of
 * shipping.
 */
import { z } from 'astro/zod';

export const releaseChannel = z.enum(['store', 'source-development', 'candidate']);

export const publicationStatus = z.enum(['published', 'unpublished', 'superseded']);

export const riskLevel = z.enum(['info', 'caution', 'danger', 'experimental']);

export const themeName = z.enum(['light', 'dark', 'oled']);

export const audience = z.enum(['new-user', 'wallet-user', 'developer', 'emergency']);

export const releaseSchema = z.object({
  id: z.string().regex(/^[a-z0-9.-]+$/),
  version: z.string().regex(/^\d+\.\d+\.\d+(\.\d+)?$/),
  channel: releaseChannel,
  publicationStatus,
  publishedAt: z.string().date().nullable(),
  sourceCommit: z.string().regex(/^[0-9a-f]{40}$/).nullable(),
  capabilitySnapshotSha256: z.string().nullable(),
  chains: z.array(z.object({ chain: z.string(), networks: z.array(z.string()) })),
  documentationStatus: z.enum(['described', 'reference-only', 'not-described']),
  knownLimitations: z.array(z.string()),
  notes: z.string()
});

export const releaseCatalogSchema = z.object({
  schemaVersion: z.literal('universe-doc-releases-v1'),
  generatedAt: z.string(),
  defaultReleaseId: z.string(),
  releases: z.array(releaseSchema).min(1)
});

export const captureDerivativeSchema = z.object({
  format: z.enum(['png', 'webp', 'avif']),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  path: z.string(),
  sha256: z.string(),
  byteSize: z.number().int().positive()
});

export const captureSchema = z.object({
  captureId: z.string(),
  visualCaseId: z.string(),
  kind: z.enum(['route', 'onboarding', 'approval']),
  workflow: z.string(),
  state: z.string(),
  riskLevel,
  theme: themeName,
  viewport: z.object({ width: z.number().int().positive(), height: z.number().int().positive() }),
  locale: z.string(),
  fixtureId: z.string(),
  publicTitle: z.string(),
  caption: z.string(),
  description: z.string(),
  consumers: z.array(z.string()),
  requiresUnauthorized: z.array(z.tuple([z.string(), z.string()])),
  privacyReview: z.object({
    reviewedAt: z.string(),
    method: z.string(),
    result: z.string()
  }),
  releaseId: z.string(),
  walletVersion: z.string(),
  walletSourceCommit: z.string().nullable(),
  capabilitySnapshotSha256: z.string(),
  intrinsicWidth: z.number().int().positive(),
  intrinsicHeight: z.number().int().positive(),
  masterSha256: z.string(),
  derivatives: z.array(captureDerivativeSchema).min(1),
  blurPlaceholder: z.string()
});

export const captureCatalogSchema = z.object({
  schemaVersion: z.literal('universe-docs-captures-imported-v1'),
  importedAt: z.string(),
  releaseId: z.string(),
  walletVersion: z.string(),
  /** Null only in the development placeholder written before the export lands. */
  exportManifestSha256: z.string().nullable(),
  captures: z.array(captureSchema)
});

export const providerMethodSchema = z.object({
  id: z.string(),
  requestMethod: z.string(),
  aliases: z.array(z.string()),
  parameters: z.array(
    z.object({ name: z.string(), type: z.string(), optional: z.boolean() })
  ),
  category: z.string(),
  effect: z.enum(['read', 'mutation', 'sign', 'broadcast']),
  public: z.boolean(),
  accountSensitive: z.boolean(),
  requiresPermission: z.boolean(),
  requiresUnlock: z.boolean(),
  requiresApproval: z.boolean(),
  protocol: z.string().nullable(),
  operation: z.string().nullable(),
  semanticIntent: z.string().nullable(),
  releaseStatus: z.enum(['authorized', 'not-authorized-in-this-release', 'available-without-protocol-authorization']),
  releaseEvidence: z.record(z.string(), z.unknown()).nullable()
});

export const providerContractSchema = z.object({
  schemaVersion: z.literal('universe-provider-contract-v1'),
  walletVersion: z.string(),
  walletSourceCommit: z.string().nullable(),
  providerNamespaces: z.array(z.string()),
  providerStateFlags: z.array(z.string()),
  events: z.array(z.string()),
  releaseAuthorization: z.object({
    supportedProtocolCount: z.number(),
    protocolCount: z.number(),
    anyProtocolSupported: z.boolean()
  }),
  methodCount: z.number(),
  methods: z.array(providerMethodSchema)
});

export const providerDocsOverlaySchema = z.object({
  schemaVersion: z.literal('universe-provider-docs-overlay-v1'),
  /** Keyed by provider method ID. Every generated method ID must appear. */
  methods: z.record(
    z.string(),
    z.object({
      explanation: z.string().min(1),
      safetyNote: z.string().min(1),
      example: z.string(),
      relatedGuide: z.string().nullable(),
      simulatedScenarios: z.array(z.string())
    })
  )
});

export const educationFixtureSchema = z.object({
  id: z.string(),
  kind: z.string(),
  title: z.string(),
  teaches: z.array(z.string()),
  summary: z.object({
    title: z.string(),
    outcome: z.string(),
    tone: z.enum(['ok', 'review', 'danger']),
    bullets: z.array(z.string()),
    footer: z.string()
  }),
  anatomy: z.object({
    inputs: z.array(
      z.object({
        address: z.string(),
        value: z.number(),
        owned: z.boolean(),
        sighashType: z.number().nullable()
      })
    ),
    outputs: z.array(
      z.object({ address: z.string(), value: z.number(), owned: z.boolean() })
    ),
    fee: z.number(),
    feeRate: z.number(),
    recommendedFeeRate: z.number(),
    shouldWarnFeeRate: z.boolean(),
    rbf: z.boolean()
  })
});

export const simulatorScenarioSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  description: z.string(),
  route: z.string(),
  workflow: z.string().default('general'),
  consumers: z.array(z.string()).default([])
});

export const simulatorArtifactSchema = z.object({
  schemaVersion: z.literal('universe-docs-simulator-imported-v1'),
  importedAt: z.string(),
  walletVersion: z.string(),
  walletSourceCommit: z.string().nullable(),
  artifactPath: z.string(),
  entrySha256: z.string(),
  isolation: z.object({
    offlineByConstruction: z.boolean(),
    noExtensionApis: z.boolean(),
    noKeyMaterial: z.boolean(),
    noSourceMaps: z.boolean()
  }),
  scenarios: z.array(simulatorScenarioSchema).min(1)
});

export const journeyStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  /** What the user is trying to achieve. */
  goal: z.string(),
  /** What they should see. */
  expected: z.string(),
  /** What they should do. */
  action: z.string(),
  /** What to check before continuing. */
  checkpoint: z.string(),
  /** What can go wrong. */
  failure: z.string(),
  reversible: z.boolean(),
  /** Deep link, capture reference, simulator scenario, or safety lab anchor. */
  captureIds: z.array(z.string()).default([]),
  simulatorScenarioIds: z.array(z.string()).default([]),
  safetyLabScenarioIds: z.array(z.string()).default([]),
  relatedPage: z.string().nullable().default(null),
  branches: z
    .array(
      z.object({
        condition: z.object({
          releaseId: z.string().nullable().default(null),
          capability: z.string().nullable().default(null),
          chain: z.string().nullable().default(null)
        }),
        note: z.string(),
        unavailable: z.boolean().default(false),
        steps: z.array(z.string()).default([])
      })
    )
    .default([])
});

export const journeySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  version: z.number().int().positive().default(1),
  title: z.string(),
  outcome: z.string(),
  audience: z.array(audience).min(1),
  estimatedMinutes: z.number().int().positive(),
  prerequisites: z.array(z.string()).default([]),
  releaseIds: z.array(z.string()).min(1),
  chains: z.array(z.string()).default(['bitcoin']),
  requiredCapabilities: z.array(z.string()).default([]),
  riskLevel,
  steps: z.array(journeyStepSchema).min(1),
  completionCriterion: z.string(),
  recovery: z.string(),
  nextBestAction: z.string().nullable().default(null)
});

export const safetyScenarioSchema = z.object({
  id: z.string(),
  fixtureId: z.string().nullable(),
  title: z.string(),
  origin: z.string(),
  requestedAuthority: z.string(),
  reversibility: z.string(),
  riskSignals: z.array(z.string()),
  correctDecision: z.string(),
  explanation: z.string()
});

export const commandActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  group: z.enum(['tasks', 'journeys', 'screens', 'capabilities', 'protocols', 'developer', 'emergency']),
  href: z.string(),
  keywords: z.array(z.string()).default([]),
  releaseIds: z.array(z.string()).default([]),
  description: z.string().default('')
});
