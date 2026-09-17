import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { BASE, buildDigest, IDENTITY_PATH, startDistServer } from './serve-dist.mjs';
import { runAudit, verifyPreview, withBuiltPreview } from './run-accessibility.mjs';

async function fixture(t, text = 'built docs') {
  const directory = await mkdtemp(join(tmpdir(), 'docs-wallet-preview-'));
  const root = join(directory, 'dist');
  await mkdir(root);
  await writeFile(join(root, 'index.html'), text);
  await writeFile(join(root, 'sitemap-0.xml'), '<urlset></urlset>');
  t.after(() => rm(directory, { recursive: true, force: true }));
  return { directory, root };
}

test('simultaneous previews own separate loopback ports and exact built identities', async (t) => {
  const a = await fixture(t, 'build A');
  const b = await fixture(t, 'build B');
  const [first, second] = await Promise.all([
    startDistServer({ root: a.root }), startDistServer({ root: b.root }),
  ]);
  t.after(() => Promise.all([first.close(), second.close()]));
  assert.notEqual(first.origin, second.origin);
  assert.match(first.origin, /^http:\/\/127\.0\.0\.1:/);
  assert.notEqual(first.identity.owner, second.identity.owner);
  assert.notEqual(first.identity.buildDigest, second.identity.buildDigest);
  assert.equal(first.identity.buildDigest, await buildDigest(a.root));
  await Promise.all([verifyPreview(first.origin, first.identity), verifyPreview(second.origin, second.identity)]);
  assert.equal(await (await fetch(first.origin + BASE + '/')).text(), 'build A');
  const response = await fetch(second.origin + BASE + '/');
  assert.equal(response.headers.get('access-control-allow-origin'), '*');
  assert.equal(await response.text(), 'build B');
  await assert.rejects(verifyPreview(first.origin, { ...first.identity, owner: second.identity.owner }), /identity mismatch/);
  await assert.rejects(verifyPreview(first.origin, { ...first.identity, buildDigest: second.identity.buildDigest }), /identity mismatch/);
  await first.close();
  await assert.rejects(fetch(first.origin + BASE + '/'));
  assert.equal(await (await fetch(second.origin + BASE + '/')).text(), 'build B');
});

test('occupied listeners are never borrowed or killed, and readiness is bounded', async (t) => {
  const { root } = await fixture(t);
  const existing = await startDistServer({ root });
  t.after(() => existing.close());
  await assert.rejects(startDistServer({ root, port: Number(new URL(existing.origin).port) }), { code: 'EADDRINUSE' });
  await verifyPreview(existing.origin, existing.identity);
  const stalled = createServer(() => {});
  await new Promise((ready) => stalled.listen(0, '127.0.0.1', ready));
  t.after(async () => {
    stalled.closeAllConnections();
    await new Promise((closed) => stalled.close(closed));
  });
  await assert.rejects(
    verifyPreview('http://127.0.0.1:' + stalled.address().port, existing.identity, 25),
    { name: 'TimeoutError' },
  );
});

test('failed callbacks and changed build bytes close only the owned preview', async (t) => {
  const { root } = await fixture(t);
  const survivor = await startDistServer({ root });
  t.after(() => survivor.close());
  let failedOrigin;
  await assert.rejects(withBuiltPreview(async ({ origin }) => {
    failedOrigin = origin;
    throw new Error('gate failed');
  }, { root }), /gate failed/);
  await assert.rejects(fetch(failedOrigin + IDENTITY_PATH));
  await verifyPreview(survivor.origin, survivor.identity);
  await assert.rejects(withBuiltPreview(async () => {
    await writeFile(join(root, 'index.html'), 'different build');
  }, { root }), /changed during the audit/);
  let ran = false;
  await assert.rejects(withBuiltPreview(() => { ran = true; }, { root: join(root, 'missing') }));
  assert.equal(ran, false);
});

test('audit children receive their owned origin and nonzero gates propagate', async (t) => {
  const { root, directory } = await fixture(t, 'expected build');
  const script = join(directory, 'failing-audit.mjs');
  const observed = join(directory, 'observed.txt');
  await writeFile(script,
    "import { writeFile } from 'node:fs/promises';\n" +
    "const response = await fetch(process.env.PREVIEW_ORIGIN + '/docs-wallet/');\n" +
    "await writeFile(" + JSON.stringify(observed) + ", await response.text());\n" +
    "process.exitCode = 42;\n");
  let origin;
  await assert.rejects(withBuiltPreview(async (preview) => {
    origin = preview.origin;
    await runAudit({
      origin, script, env: { ...process.env, PREVIEW_ORIGIN: 'http://127.0.0.1:1' },
      stdio: 'ignore',
    });
  }, { root }), /exited with code 42/);
  assert.equal(await readFile(observed, 'utf8'), 'expected build');
  await assert.rejects(fetch(origin + IDENTITY_PATH));
});

test('timed out and cancelled children terminate without closing other previews', async (t) => {
  const { root, directory } = await fixture(t);
  const script = join(directory, 'stalled-audit.mjs');
  await writeFile(script, "process.on('SIGTERM', () => {}); setInterval(() => {}, 1000);\n");
  const survivor = await startDistServer({ root });
  t.after(() => survivor.close());
  await assert.rejects(withBuiltPreview(({ origin }) =>
    runAudit({ origin, script, timeoutMs: 250, stdio: 'ignore' }), { root }),
  /audit timed out/);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 250);
  try {
    await assert.rejects(withBuiltPreview(({ origin }) =>
      runAudit({ origin, script, signal: controller.signal, stdio: 'ignore' }), { root }),
    /audit cancelled/);
  } finally { clearTimeout(timer); }
  await verifyPreview(survivor.origin, survivor.identity);
});
