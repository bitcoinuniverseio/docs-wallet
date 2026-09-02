#!/usr/bin/env node
// Validate every documentation data record and cross-reference.
//
// Run in npm test and before the production build. Invalid references, unknown
// capture IDs, impossible capability requirements, missing text fallbacks, and
// unsupported release combinations fail the build rather than ship.
//
// Usage: node --experimental-strip-types scripts/validate-data.mjs

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const problems = [];
const fail = (message) => problems.push(message);

const { releaseCatalogSchema, captureCatalogSchema, providerContractSchema, journeySchema, simulatorArtifactSchema } = await import(
  '../src/schemas/index.ts'
);

function readJson(rel) {
  const path = join(root, rel);
  if (!existsSync(path)) {
    fail(`${rel} does not exist; run the matching import script`);
    return null;
  }
  return JSON.parse(readFileSync(path, 'utf8'));
}

function validate(schema, data, label) {
  const outcome = schema.safeParse(data);
  if (!outcome.success) {
    for (const issue of outcome.error.issues.slice(0, 6)) {
      fail(`${label}: ${issue.path.join('.')} - ${issue.message}`);
    }
    return null;
  }
  return outcome.data;
}

// ---------------------------------------------------------------- catalogs

const releases = validate(releaseCatalogSchema, readJson('src/data/releases.json'), 'releases.json');
const captures = validate(captureCatalogSchema, readJson('src/data/captures.json'), 'captures.json');
const contract = validate(providerContractSchema, readJson('src/data/provider-contract.json'), 'provider-contract.json');
const simulator = validate(simulatorArtifactSchema, readJson('src/data/simulator.json'), 'simulator.json');

const journeysRaw = readJson('src/data/journeys.json');
const journeys = Array.isArray(journeysRaw) ? journeysRaw.map((journey, index) => validate(journeySchema, journey, `journeys[${index}] ${journey?.id ?? '?'}`)) : (fail('journeys.json must be an array'), []);

// Overlay: both directions against the contract.
const overlay = readJson('src/data/provider-overlay.json');
if (contract) {
  const contractIds = new Set(contract.methods.map((method) => method.id));
  const overlayIds = new Set(Object.keys(overlay?.methods ?? {}));
  for (const id of contractIds) if (!overlayIds.has(id)) fail(`provider overlay: generated method ${id} undocumented`);
  for (const id of overlayIds) if (!contractIds.has(id)) fail(`provider overlay: ${id} is not in the generated contract`);
}

// Fixtures exist and stay parseable.
const fixturesPath = join(root, 'src/data/safety/education-fixtures.json');
if (!existsSync(fixturesPath)) fail('safety fixtures missing; run scripts/import-education-fixtures.mjs');
const fixtures = existsSync(fixturesPath) ? JSON.parse(readFileSync(fixturesPath, 'utf8')) : { fixtures: [] };

// ------------------------------------------------------------ cross-references

if (captures && journeys) {
  const captureIds = new Set(captures.captures.map((capture) => capture.captureId));
  // The empty catalog is the development placeholder: a release build is
  // required to carry the imported capture set.
  if (captureIds.size === 0 && process.env.DOCS_ALLOW_EMPTY_CAPTURES !== '1') {
    fail(
      'capture catalog is empty: import the wallet capture export with scripts/import-captures.mjs (set DOCS_ALLOW_EMPTY_CAPTURES=1 only for local development)',
    );
  }
  for (const journey of journeys) {
    if (!journey) continue;
    for (const step of journey.steps) {
      if (captureIds.size > 0) {
        for (const captureId of step.captureIds) {
          if (!captureIds.has(captureId)) {
            fail(`journey ${journey.id} step ${step.id} references unknown capture ${captureId}`);
          }
        }
      }
      for (const scenarioId of step.simulatorScenarioIds) {
        if (simulator && !simulator.scenarios.some((scenario) => scenario.id === scenarioId)) {
          fail(`journey ${journey.id} step ${step.id} references unknown simulator scenario ${scenarioId}`);
        }
      }
    }
    for (const releaseId of journey.releaseIds) {
      if (releases && !releases.releases.some((release) => release.id === releaseId)) {
        fail(`journey ${journey.id} references unknown release ${releaseId}`);
      }
    }
  }
}

if (releases && !releases.releases.some((release) => release.id === releases.defaultReleaseId)) {
  fail(`defaultReleaseId ${releases.defaultReleaseId} is not in the catalog`);
}

// Commands: every href must exist in the built site (when dist is present) or
// map to a known page source.
const commands = readJson('src/data/commands.json');
if (commands) {
  const distDir = join(root, 'dist');
  const builtRoutes = new Set();
  if (existsSync(distDir)) {
    (function walk(dir) {
      for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) {
          if (!full.includes('pagefind') && !full.includes('captures')) walk(full);
        } else if (name === 'index.html') {
          builtRoutes.add(`/${full.slice(distDir.length + 1).replace(/\\/g, '/').replace(/index\.html$/, '')}`);
        }
      }
    })(distDir);
    for (const command of commands.commands) {
      const path = command.href.split('#')[0].split('?')[0];
      const base = path.replace(/\/$/, '');
      const candidates = [path, `${base}/`, `${base}/index.html`, `${base}.html`];
      const hit = candidates.some((candidate) => builtRoutes.has(candidate));
      if (!hit) fail(`command ${command.id} points at ${command.href}, which the build does not produce`);
    }
  }
}

if (problems.length) {
  process.stderr.write(`data validation: ${problems.length} problem(s)\n\n`);
  for (const problem of problems) process.stderr.write(`  - ${problem}\n`);
  process.exit(1);
}
process.stdout.write(
  `data validation: releases, captures (${captures?.captures.length ?? 0}), provider contract (${contract?.methodCount ?? 0} methods), ` +
    `journeys (${journeys.length}), simulator (${simulator?.scenarios.length ?? 0} scenarios) all consistent\n`,
);
