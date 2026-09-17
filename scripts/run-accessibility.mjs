// Run the unchanged browser gates against one owned, identified static build.
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDigest, DIST_ROOT, IDENTITY_PATH, startDistServer } from './serve-dist.mjs';

const AUDIT_SCRIPT = resolve(dirname(fileURLToPath(import.meta.url)), 'check-accessibility.mjs');

export async function verifyPreview(origin, identity, timeoutMs = 10_000) {
  if (!/^http:\/\/127\.0\.0\.1:[1-9][0-9]*$/.test(origin)) throw new Error('Preview must use owned loopback origin');
  const response = await fetch(origin + IDENTITY_PATH, { signal: AbortSignal.timeout(timeoutMs) });
  if (!response.ok) throw new Error('Preview identity request failed: ' + response.status);
  const actual = await response.json();
  if (actual.owner !== identity.owner || actual.buildDigest !== identity.buildDigest) {
    throw new Error('Preview ownership or built-document identity mismatch');
  }
}

export async function withBuiltPreview(run, { root = DIST_ROOT, readinessTimeoutMs = 10_000 } = {}) {
  const expectedDigest = await buildDigest(root);
  const preview = await startDistServer({ root, port: 0, owner: randomUUID() });
  try {
    await verifyPreview(preview.origin, { ...preview.identity, buildDigest: expectedDigest }, readinessTimeoutMs);
    process.stdout.write('Auditing built docs ' + expectedDigest + ' at ' + preview.origin + '\n');
    const result = await run(preview);
    if (await buildDigest(root) !== expectedDigest) throw new Error('Built documents changed during the audit');
    return result;
  } finally {
    await preview.close();
  }
}

export async function runAudit({
  origin, script = AUDIT_SCRIPT, signal, timeoutMs = 20 * 60_000,
  env = process.env, stdio = 'inherit',
}) {
  if (signal?.aborted) throw new Error('Accessibility audit cancelled');
  const child = spawn(process.execPath, [script], {
    env: { ...env, PREVIEW_ORIGIN: origin },
    stdio,
    shell: false,
  });
  let failure;
  let forcedStop;
  const stop = (message) => {
    if (failure) return;
    failure = new Error(message);
    child.kill('SIGTERM');
    // The handle belongs to this invocation; never inspect or kill by port.
    forcedStop = setTimeout(() => child.kill('SIGKILL'), 2_000);
  };
  const onAbort = () => stop('Accessibility audit cancelled');
  signal?.addEventListener('abort', onAbort, { once: true });
  const timer = setTimeout(() => stop('Accessibility audit timed out'), timeoutMs);
  try {
    const code = await new Promise((resolveExit, reject) => {
      child.once('error', reject);
      child.once('close', resolveExit);
    });
    if (failure) throw failure;
    if (code !== 0) throw new Error('Accessibility audit exited with code ' + code);
  } finally {
    clearTimeout(timer);
    clearTimeout(forcedStop);
    signal?.removeEventListener('abort', onAbort);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const controller = new AbortController();
  const onSignal = () => controller.abort();
  process.once('SIGINT', onSignal);
  process.once('SIGTERM', onSignal);
  try {
    await withBuiltPreview(({ origin }) => runAudit({ origin, signal: controller.signal }));
  } catch (error) {
    process.stderr.write(error.message + '\n');
    process.exitCode = 1;
  } finally {
    process.removeListener('SIGINT', onSignal);
    process.removeListener('SIGTERM', onSignal);
  }
}
