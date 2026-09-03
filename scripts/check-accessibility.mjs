#!/usr/bin/env node
// Accessibility and reflow audit over every built page, in both themes.
//
// Runs against a served build, so it tests what a reader gets rather than what
// the source intends. Fails on any axe violation at serious or critical impact,
// and on any page that scrolls horizontally at 320px.
//
// Run: npx astro preview --port 4323 & node scripts/check-accessibility.mjs

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const axeSource = readFileSync(resolve(root, 'node_modules/axe-core/axe.min.js'), 'utf8');

const ORIGIN = process.env.PREVIEW_ORIGIN ?? 'http://localhost:4328';
const BASE = '/docs-wallet';

const sitemap = await (await fetch(`${ORIGIN}${BASE}/sitemap-0.xml`)).text();
const paths = [
  ...new Set(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''))
      .concat([`${BASE}/404`]),
  ),
];

if (paths.length < 10) {
  process.stderr.write(`Only ${paths.length} pages found in the sitemap. Is the preview running?\n`);
  process.exit(1);
}

const browser = await chromium.launch();
const problems = [];

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({
    viewport: { width: 320, height: 900 },
    colorScheme: theme,
    reducedMotion: 'reduce',
    // The built site enforces a strict CSP with per-page inline-script hashes.
    // The audit injects axe itself, so this audit context alone bypasses CSP;
    // real visitors get the full policy.
    bypassCSP: true,
  });
  const page = await context.newPage();

  for (const path of paths) {
    const res = await page.goto(`${ORIGIN}${path}`, { waitUntil: 'load' });
    if (!res || res.status() >= 400) {
      problems.push(`${path} returned ${res?.status()}`);
      continue;
    }
    await page.evaluate(
      (t) => document.documentElement.setAttribute('data-theme', t),
      theme,
    );

    // Horizontal overflow at 320px. Wide content must scroll inside its own
    // container, never push the page.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 1) {
      problems.push(`${path} [${theme}] overflows horizontally by ${overflow}px at 320px wide.`);
    }

    await page.addScriptTag({ content: axeSource });
    const results = await page.evaluate(async () =>
      // eslint-disable-next-line no-undef
      await axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      }),
    );
    for (const v of results.violations) {
      if (v.impact !== 'serious' && v.impact !== 'critical') continue;
      problems.push(
        `${path} [${theme}] ${v.id} (${v.impact}): ${v.help}. ${v.nodes.length} node(s), first: ${
          v.nodes[0]?.target?.join(' ') ?? 'unknown'
        }`,
      );
    }
  }
  await context.close();
}

// The homepage switches from the mobile drawer to the persistent sidebar at
// 800px. Its portrait wallet capture must stay inside the hero and above the
// following safety notices, never paint over either the sidebar or the page
// content after the reader scrolls.
for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({
    viewport: { width: 800, height: 900 },
    colorScheme: theme,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const res = await page.goto(`${ORIGIN}${BASE}/`, { waitUntil: 'load' });
  if (!res || res.status() >= 400) {
    problems.push(`${BASE}/ [${theme}] returned ${res?.status()}`);
  } else {
    await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
    const layout = await page.evaluate(() => {
      const bounds = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
      };
      const hero = document.querySelector('.u-hero');
      return {
        hero: bounds('.u-hero'),
        shot: bounds('.u-hero .u-shot'),
        status: bounds('.u-status'),
        hasHorizontalOverflow: hero ? hero.scrollWidth > hero.clientWidth : false,
      };
    });
    if (!layout.hero || !layout.shot || !layout.status) {
      problems.push(`${BASE}/ [${theme}] is missing the homepage hero layout.`);
    } else if (
      layout.hasHorizontalOverflow ||
      layout.shot.left < layout.hero.left ||
      layout.shot.right > layout.hero.right ||
      layout.shot.bottom > layout.status.top
    ) {
      problems.push(`${BASE}/ [${theme}] lets the wallet capture escape the homepage hero.`);
    }
  }
  await context.close();
}

await browser.close();

if (problems.length) {
  process.stderr.write(`Accessibility: ${problems.length} problem(s).\n\n`);
  for (const p of problems) process.stderr.write(`  ${p}\n`);
  process.stderr.write('\n');
  process.exit(1);
}

process.stdout.write(`Accessibility pass. ${paths.length} pages checked in both themes at 320px.\n`);
