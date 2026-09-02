#!/usr/bin/env node
// MCP protocol conformance and grounding tests.
//
// Runs the real stdio server as a child process and speaks JSON-RPC to it:
// initialize, tools/list, tools/call - including malformed input, unknown
// versions, unknown capabilities, oversized queries, and missing documents.
// A failure fails the workflow; nothing here is skipped for lack of a browser
// or a network, because the server needs neither.
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const problems = [];
const fail = (message) => problems.push(message);

if (!existsSync(join(root, 'dist', 'api', 'catalog.json'))) {
  process.stderr.write('dist/api/catalog.json missing; build the site first\n');
  process.exit(1);
}

const child = spawn(process.execPath, [join(root, 'mcp-server', 'stdio.mjs'), '--corpus', join(root, 'dist')], {
  stdio: ['pipe', 'pipe', 'pipe'],
});

let nextId = 1;
const pending = new Map();
let buffer = '';

child.stdout.on('data', (chunk) => {
  buffer += chunk.toString();
  let newline;
  while ((newline = buffer.indexOf('\n')) !== -1) {
    const line = buffer.slice(0, newline).trim();
    buffer = buffer.slice(newline + 1);
    if (!line) continue;
    try {
      const message = JSON.parse(line);
      const resolver = pending.get(message.id);
      if (resolver) {
        pending.delete(message.id);
        resolver(message);
      }
    } catch {
      fail(`unparseable server output: ${line.slice(0, 120)}`);
    }
  }
});
child.stderr.on('data', () => undefined); // logs, not protocol

function rpc(method, params) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, resolve);
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`timeout on ${method}`));
      }
    }, 10000);
  });
}

async function tool(name, args) {
  const response = await rpc('tools/call', { name, arguments: args });
  if (response.error) return { isError: true, error: response.error };
  const text = response.result?.content?.[0]?.text ?? '';
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text, isError: response.result?.isError === true };
  }
}

// 1. initialize handshake
const initialized = await rpc('initialize', {
  protocolVersion: '2025-03-26',
  capabilities: {},
  clientInfo: { name: 'universe-docs-test', version: '0.0.1' },
});
if (!initialized.result?.serverInfo?.name) fail('initialize handshake failed');
await rpc('notifications/initialized', {});

// 2. tools/list exposes the required set
const listed = await rpc('tools/list', {});
const names = (listed.result?.tools ?? []).map((tool) => tool.name);
const REQUIRED = [
  'search_wallet_docs',
  'read_wallet_doc',
  'list_wallet_releases',
  'compare_wallet_releases',
  'get_wallet_capability',
  'list_wallet_protocols',
  'get_wallet_protocol',
  'list_wallet_journeys',
  'read_wallet_journey',
  'read_wallet_safety_checklist',
  'get_provider_method',
  'list_provider_methods',
];
for (const required of REQUIRED) {
  if (!names.includes(required)) fail(`required tool missing: ${required}`);
}

// 3. grounding: search returns metadata with release and hash
const search = await tool('search_wallet_docs', { query: 'send unavailable' });
if (!Array.isArray(search.results) || search.results.length === 0) fail('search returned no grounded results');
for (const result of search.results ?? []) {
  if (!result.url || !result.release || !result.contentSha256) {
    fail(`search result lacks source-of-truth metadata: ${JSON.stringify(result).slice(0, 120)}`);
    break;
  }
}

// 4. unknown version handling: compare with a made-up release must not invent data
const compare = await tool('compare_wallet_releases', { a: 'wallet-9.9.9', b: 'wallet-0.0.1' });
if (!compare.error && compare.capabilityComparison?.verifiable !== false) {
  fail('compare_wallet_releases invented a comparison for unknown releases');
}

// 5. unknown capability answers as unknown
const capability = await tool('get_wallet_capability', { protocol: 'not-a-protocol', operation: 'read' });
if (capability.state !== 'unknown-to-snapshot') fail('unknown capability was not labeled unknown');

// 6. missing document handled
const missing = await tool('read_wallet_doc', { path: 'no/such/page.html' });
if (!missing.error) fail('missing document did not fail cleanly');

// 7. oversized query is bounded
const oversized = await tool('search_wallet_docs', { query: 'bitcoin '.repeat(500), limit: 3 });
if (!Array.isArray(oversized.results)) fail('oversized query broke search');

// 8. provider method grounding
const methods = await tool('list_provider_methods', {});
if (!Array.isArray(methods.methods) || methods.methods.length === 0) fail('provider methods missing from corpus');
const method = await tool('get_provider_method', { id: methods.methods[0].id });
if (!method.releaseStatus) fail('provider method result lacks release status');

// 9. malformed input is refused, not crashed
const badRead = await tool('read_wallet_doc', {});
if (!badRead.isError && !badRead.error) fail('read_wallet_doc accepted empty arguments');

// 10. the server exposes no mutating tool
const MUTATION_SHAPES = ['connect', 'sign', 'send', 'broadcast', 'approve', 'switch', 'mutate', 'write', 'account'];
for (const name of names) {
  for (const shape of MUTATION_SHAPES) {
    if (name.toLowerCase().includes(shape)) fail(`tool name suggests a mutating surface: ${name}`);
  }
}

child.kill();

if (problems.length) {
  process.stderr.write(`MCP tests: ${problems.length} problem(s)\n\n`);
  for (const problem of problems) process.stderr.write(`  - ${problem}\n`);
  process.exit(1);
}
process.stdout.write(`MCP conformance: ${names.length} tools, grounding, refusal, and bounded-input checks passed\n`);
