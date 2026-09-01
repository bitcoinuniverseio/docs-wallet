import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Provenance every material page carries. The footer renders it, and
// scripts/check-manifest.mjs fails the build when a page under a content
// directory omits `lastVerified`.
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /** Repository that owns the behaviour this page describes. */
        sourceRepo: z.string().default('bitcoinuniverseio/wallet'),
        /** Path inside that repository where the behaviour is defined. */
        sourcePath: z.string().optional(),
        /** Chains this page applies to. Omit for chain-independent pages. */
        chain: z.array(z.string()).optional(),
        /** Networks this page applies to. */
        network: z.array(z.string()).optional(),
        /** Lifecycle of the behaviour described, not of the document. */
        lifecycle: z
          .enum(['stable', 'beta', 'experimental', 'not-released', 'deprecated'])
          .default('experimental'),
        /** ISO date on which a human last checked this page against source. */
        lastVerified: z.coerce.date().optional(),
        /** Set false on pages that are navigation rather than product facts. */
        provenance: z.boolean().default(true),
        /**
         * Suppress the generated page heading. Only for a page that renders its
         * own h1, so that the document never has two.
         */
        hideTitle: z.boolean().default(false),
      }),
    }),
  }),
};
