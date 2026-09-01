#!/usr/bin/env node
// Every diagram must be reachable by someone who cannot see it.
//
// A diagram that carries a fact about someone's money and offers no text
// alternative has hidden that fact from part of the audience. This fails the
// build rather than filing a ticket.
//
// Run: node scripts/check-diagrams.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'components', 'diagrams');
const problems = [];

if (!existsSync(dir)) {
  process.stderr.write(`No diagram directory at ${dir}\n`);
  process.exit(1);
}

const files = readdirSync(dir).filter((f) => f.endsWith('.astro'));

if (files.length === 0) {
  process.stderr.write('No diagrams found.\n');
  process.exit(1);
}

for (const name of files) {
  const file = join(dir, name);
  const rel = relative(root, file).split('\\').join('/');
  const text = readFileSync(file, 'utf8');

  if (!/<svg\b/.test(text)) {
    problems.push(`${rel} has no svg element.`);
    continue;
  }
  if (!/role="img"/.test(text)) {
    problems.push(`${rel} is missing role="img".`);
  }
  const labelled = /aria-labelledby="([^"]+)"/.exec(text);
  if (!labelled) {
    problems.push(`${rel} is missing aria-labelledby.`);
  } else {
    for (const id of labelled[1].trim().split(/\s+/)) {
      if (!new RegExp(`id="${id}"`).test(text)) {
        problems.push(`${rel} references id "${id}" in aria-labelledby but no element carries it.`);
      }
    }
  }

  const title = /<title[^>]*>([\s\S]*?)<\/title>/.exec(text);
  if (!title || title[1].trim().length < 10) {
    problems.push(`${rel} needs a title element of at least 10 characters.`);
  }

  const desc = /<desc[^>]*>([\s\S]*?)<\/desc>/.exec(text);
  if (!desc) {
    problems.push(`${rel} has no desc element. Describe what the diagram shows, not what it looks like.`);
  } else if (desc[1].replace(/\s+/g, ' ').trim().length < 180) {
    problems.push(
      `${rel} has a desc shorter than 180 characters. A reader who cannot see the diagram needs the whole point, not a label list.`,
    );
  }

  // A marker cannot inherit the referencing path's colour across a theme
  // switch, so arrowheads are explicit paths.
  if (/<marker\b/.test(text)) {
    problems.push(`${rel} uses a marker element. Draw arrowheads as explicit paths with their own class.`);
  }

  // Hard-coded colours break the theme toggle.
  const hex = text.match(/(?:fill|stroke)="#[0-9a-fA-F]{3,8}"/g);
  if (hex) {
    problems.push(`${rel} hard-codes a colour: ${hex[0]}. Use the dg- classes so the theme toggle works.`);
  }
  if (/viewBox="0 0 (\d+)/.test(text)) {
    const width = Number(/viewBox="0 0 (\d+)/.exec(text)[1]);
    if (width > 720) {
      problems.push(`${rel} has a viewBox ${width} units wide. Keep diagrams at or below 720 so labels stay legible.`);
    }
  } else {
    problems.push(`${rel} has no viewBox starting at 0 0.`);
  }
}

if (problems.length) {
  process.stderr.write(`Diagrams: ${problems.length} problem(s).\n\n`);
  for (const p of problems) process.stderr.write(`  ${p}\n`);
  process.stderr.write('\n');
  process.exit(1);
}

process.stdout.write(`Diagrams pass. ${files.length} diagrams checked.\n`);
