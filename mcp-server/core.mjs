/**
 * Universe Wallet documentation MCP server: shared core.
 *
 * One implementation, two transport adapters (stdio.mjs, http.mjs). Read-only:
 * the tools search and read the documentation corpus and never expose a wallet
 * connector, signer, broadcaster, account lookup, or any mutation. Every result
 * carries its URL, title, release, and content hash, so a client can cite and
 * verify what it was told.
 *
 * The corpus is the site's own generated data: catalog.json, releases.json,
 * capabilities.json, journeys.json, and the Markdown views. A version the
 * catalog does not know is answered as unknown - never mapped to the nearest
 * release.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

export function loadCorpus({ corpusDir } = {}) {
  const dir = corpusDir ?? join(here, '..', 'dist');
  const readJson = (name) => JSON.parse(readFileSync(join(dir, name), 'utf8'));
  const catalog = readJson('api/catalog.json');
  const releases = readJson('api/releases.json');
  const capabilities = readJson('api/capabilities.json');
  const journeys = readJson('api/journeys.json');
  return { catalog, releases, capabilities, journeys, dir };
}

function entryFor(corpus, pagePath) {
  return corpus.catalog.pages.find((page) => page.path === pagePath || page.path.replace(/index\.html$/, '') === pagePath);
}

function readPage(corpus, pagePath) {
  const entry = entryFor(corpus, pagePath);
  if (!entry) return null;
  let markdownPath = entry.markdown;
  try {
    const text = readFileSync(join(corpus.dir, ...markdownPath.split('/')), 'utf8');
    return { entry, text };
  } catch {
    return null;
  }
}

function resultMeta(corpus, entry, heading = null) {
  return {
    url: entry.path.replace(/index\.html$/, ''),
    title: entry.title,
    release: corpus.catalog.walletVersion,
    contentSha256: entry.contentSha256,
    ...(heading ? { heading } : {}),
  };
}

/** Section a Markdown page by heading, for grounded partial reads. */
function sectionOf(text, heading) {
  if (!heading) return { body: text, matched: null };
  const lines = text.split('\n');
  const start = lines.findIndex((line) => line.toLowerCase().includes(heading.toLowerCase()));
  if (start === -1) return { body: text, matched: null };
  const level = (lines[start].match(/^#+/) ?? ['#'])[0].length;
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const candidate = (lines[index].match(/^#+/) ?? [null, null])[0];
    if (candidate && candidate.length <= level) {
      end = index;
      break;
    }
  }
  return { body: lines.slice(start, end).join('\n'), matched: lines[start] };
}

export function buildTools(corpus) {
  const releaseById = new Map(corpus.releases.releases.map((release) => [release.id, release]));

  const tools = {
    search_wallet_docs: {
      description:
        'Search the Universe Wallet documentation. Returns page matches with title, URL, release, and content hash. Grounded in the corpus only.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Words to look for in the documentation.' },
          limit: { type: 'integer', minimum: 1, maximum: 20, default: 8 },
        },
        required: ['query'],
      },
      handler: async ({ query, limit = 8 }) => {
        const needle = String(query).toLowerCase();
        const terms = needle.split(/\s+/).filter(Boolean).slice(0, 50);
        const scored = corpus.catalog.pages
          .map((page) => {
            const text = readPage(corpus, page.path);
            if (!text) return null;
            const haystack = text.text.toLowerCase();
            const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
            return score > 0 ? { page, score, excerpt: excerptAround(text.text, terms) } : null;
          })
          .filter(Boolean)
          .sort((a, b) => b.score - a.score)
          .slice(0, limit);
        return {
          results: scored.map((match) => ({
            ...resultMeta(corpus, match.page),
            score: match.score,
            excerpt: match.excerpt,
          })),
          grounding:
            'Results quote this documentation only. Capability status: ' +
            `${corpus.capabilities.supportedProtocolCount} of ${corpus.capabilities.protocolCount} protocols authorized in ${corpus.capabilities.walletVersion}.`,
        };
      },
    },

    read_wallet_doc: {
      description:
        'Read one documentation page (or a section of it) with its canonical URL and content hash.',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Page path from the catalog, e.g. tasks/send.html' },
          heading: { type: 'string', description: 'Optional heading to read just that section.' },
        },
        required: ['path'],
      },
      handler: async ({ path, heading }) => {
        const page = readPage(corpus, path);
        if (!page) return { error: `unknown page: ${path}`, knownPages: corpus.catalog.pages.length };
        const section = sectionOf(page.text, heading);
        return {
          ...resultMeta(corpus, page.entry, section.matched),
          content: section.body.slice(0, 20000),
        };
      },
    },

    list_wallet_releases: {
      description: 'List every release in the documentation release catalog with its publication status.',
      inputSchema: { type: 'object', properties: {} },
      handler: async () => ({
        defaultReleaseId: corpus.releases.defaultReleaseId,
        releases: corpus.releases.releases,
      }),
    },

    compare_wallet_releases: {
      description:
        'Compare two documented releases. Releases without verifiable capability data are labeled as such; nothing is inferred.',
      inputSchema: {
        type: 'object',
        properties: {
          a: { type: 'string' },
          b: { type: 'string' },
        },
        required: ['a', 'b'],
      },
      handler: async ({ a, b }) => {
        const releaseA = releaseById.get(a);
        const releaseB = releaseById.get(b);
        if (!releaseA || !releaseB) {
          return {
            error: 'unknown release id',
            knownReleases: corpus.releases.releases.map((release) => release.id),
          };
        }
        return {
          a: releaseA,
          b: releaseB,
          capabilityComparison:
            releaseA.capabilitySnapshotSha256 && releaseB.capabilitySnapshotSha256
              ? { verifiable: true }
              : {
                  verifiable: false,
                  note: 'At least one release carries no verifiable capability snapshot, so no operation-level comparison can be made without inventing data.',
                },
        };
      },
    },

    get_wallet_capability: {
      description: 'Read the capability state for one protocol and operation in the documented release.',
      inputSchema: {
        type: 'object',
        properties: {
          protocol: { type: 'string' },
          operation: { type: 'string' },
        },
        required: ['protocol', 'operation'],
      },
      handler: async ({ protocol, operation }) => {
        const entry = corpus.capabilities.protocols.find((candidate) => candidate.id === protocol);
        if (!entry) {
          return {
            protocol,
            operation,
            state: 'unknown-to-snapshot',
            walletVersion: corpus.capabilities.walletVersion,
            note: 'The capability snapshot does not name this protocol. Unknown means unknown; nothing is inferred.',
          };
        }
        return {
          protocol,
          operation,
          walletVersion: corpus.capabilities.walletVersion,
          intended: entry.intendedOperations.includes(operation),
          authorized: entry.supportedOperations.includes(operation),
          supportState: entry.supportState,
          note: entry.supportedOperations.includes(operation)
            ? 'Authorized in this release.'
            : 'Not authorized in this release: the wallet fails closed with an unavailable state.',
        };
      },
    },

    list_wallet_protocols: {
      description: 'List every protocol in the capability snapshot with its support state.',
      inputSchema: {
        type: 'object',
        properties: { state: { type: 'string', description: 'Optional support-state filter.' } },
      },
      handler: async ({ state } = {}) => ({
        walletVersion: corpus.capabilities.walletVersion,
        protocols: corpus.capabilities.protocols
          .filter((protocol) => !state || protocol.supportState === state)
          .map((protocol) => ({
            id: protocol.id,
            name: protocol.name,
            networks: protocol.networks,
            intendedOperations: protocol.intendedOperations,
            supportedOperations: protocol.supportedOperations,
            supportState: protocol.supportState,
          })),
      }),
    },

    get_wallet_protocol: {
      description: 'Read one protocol in full: networks, intended operations, authorized operations, limits.',
      inputSchema: {
        type: 'object',
        properties: { protocol: { type: 'string' } },
        required: ['protocol'],
      },
      handler: async ({ protocol }) => {
        const entry = corpus.capabilities.protocols.find((candidate) => candidate.id === protocol);
        if (!entry) return { error: `unknown protocol: ${protocol}` };
        return { walletVersion: corpus.capabilities.walletVersion, ...entry };
      },
    },

    list_wallet_journeys: {
      description: 'List the guided journeys with audience, time, risk, and release.',
      inputSchema: {
        type: 'object',
        properties: { audience: { type: 'string', description: 'Optional audience filter.' } },
      },
      handler: async ({ audience } = {}) => ({
        journeys: corpus.journeys.journeys
          .filter((journey) => !audience || journey.audience.includes(audience))
          .map((journey) => ({
            id: journey.id,
            title: journey.title,
            outcome: journey.outcome,
            audience: journey.audience,
            estimatedMinutes: journey.estimatedMinutes,
            riskLevel: journey.riskLevel,
            releases: journey.releaseIds,
            steps: journey.steps.length,
          })),
      }),
    },

    read_wallet_journey: {
      description: 'Read one guided journey in full, including every step contract.',
      inputSchema: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
      },
      handler: async ({ id }) => {
        const journey = corpus.journeys.journeys.find((candidate) => candidate.id === id);
        if (!journey) {
          return { error: `unknown journey: ${id}`, known: corpus.journeys.journeys.map((candidate) => candidate.id) };
        }
        return { ...journey, canonicalUrl: `journeys/${journey.id}/` };
      },
    },

    read_wallet_safety_checklist: {
      description: 'Read the transaction-review and emergency safety checklists as plain text.',
      inputSchema: { type: 'object', properties: {} },
      handler: async () => {
        const emergency = readPage(corpus, 'emergency/index.html');
        return {
          ...resultMeta(corpus, emergency?.entry ?? corpus.catalog.pages[0]),
          content: emergency ? emergency.text.slice(0, 20000) : 'Emergency page not found in corpus.',
        };
      },
    },

    list_provider_methods: {
      description:
        'List the provider methods from the generated contract, with release status. Status derives from the release matrix.',
      inputSchema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Optional filter: authorized | not-authorized-in-this-release | available-without-protocol-authorization',
          },
        },
      },
      handler: async ({ status } = {}) => {
        const contract = JSON.parse(readFileSync(join(corpus.dir, 'api', 'provider-contract.json'), 'utf8'));
        return {
          walletVersion: corpus.capabilities.walletVersion,
          methods: contract.methods
            .filter((method) => !status || method.releaseStatus === status)
            .map((method) => ({
              id: method.id,
              effect: method.effect,
              category: method.category,
              protocol: method.protocol,
              operation: method.operation,
              releaseStatus: method.releaseStatus,
              parameters: method.parameters,
            })),
        };
      },
    },

    get_provider_method: {
      description: 'Read one provider method in full: parameters, requirements, release status, and safety notes.',
      inputSchema: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
      },
      handler: async ({ id }) => {
        const contract = JSON.parse(readFileSync(join(corpus.dir, 'api', 'provider-contract.json'), 'utf8'));
        const method = contract.methods.find((candidate) => candidate.id === id);
        if (!method) {
          return { error: `unknown method: ${id}`, known: contract.methods.map((candidate) => candidate.id).slice(0, 20) };
        }
        return { walletVersion: contract.walletVersion, ...method };
      },
    },
  };

  return Object.entries(tools).map(([name, tool]) => ({ name, ...tool }));
}

function excerptAround(text, terms, radius = 240) {
  const lower = text.toLowerCase();
  const index = lower.indexOf(terms[0] ?? '');
  if (index === -1) return text.slice(0, radius);
  const start = Math.max(0, index - radius / 2);
  return `${start > 0 ? '…' : ''}${text.slice(start, start + radius).trim()}…`;
}
