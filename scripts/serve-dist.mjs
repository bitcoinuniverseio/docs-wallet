// Static preview of the built site. Each audit owns a loopback listener.
import { createHash, randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { readFile, readdir, realpath, stat } from 'node:fs/promises';
import { join, extname, resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DIST_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
export const BASE = '/docs-wallet';
export const IDENTITY_PATH = BASE + '/__preview_identity';
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.wasm': 'application/wasm',
  '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif',
  '.webmanifest': 'application/manifest+json',
  '.pf_meta': 'application/octet-stream', '.pf_fragment': 'application/octet-stream',
  '.pf_index': 'application/octet-stream',
};

export async function buildDigest(root = DIST_ROOT) {
  const hash = createHash('sha256');
  for (const required of ['index.html', 'sitemap-0.xml']) {
    if (!(await stat(join(root, required))).isFile()) throw new Error('Missing built document: ' + required);
  }
  async function visit(directory, prefix = '') {
    const entries = (await readdir(directory, { withFileTypes: true }))
      .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    for (const entry of entries) {
      const name = prefix + entry.name;
      if (entry.isDirectory()) await visit(join(directory, entry.name), name + '/');
      else if (entry.isFile()) {
        const bytes = await readFile(join(directory, entry.name));
        hash.update(name + '\0' + bytes.length + '\0').update(bytes).update('\0');
      } else throw new Error('Unsupported built document entry: ' + name);
    }
  }
  await visit(root);
  return hash.digest('hex');
}

export async function startDistServer({ root = DIST_ROOT, port = 0, owner = randomUUID() } = {}) {
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Invalid preview port');
  root = await realpath(root);
  const identity = { owner, buildDigest: await buildDigest(root) };

  async function resolveFile(pathname) {
    const decoded = decodeURIComponent(pathname);
    let path = decoded === BASE || decoded.startsWith(BASE + '/') ? decoded.slice(BASE.length) : decoded;
    if (path === '' || path === '/') path = '/index.html';
    const file = resolve(root, '.' + path);
    if (file !== root && !file.startsWith(root + sep)) return null;
    for (const candidate of [file, file + '.html', join(file, 'index.html')]) {
      try {
        const actual = await realpath(candidate);
        if (!actual.startsWith(root + sep)) continue;
        if ((await stat(actual)).isFile()) return actual;
      } catch { /* try the next static route */ }
    }
    return null;
  }

  const server = createServer((req, res) => {
    void (async () => {
      const { pathname } = new URL(req.url, 'http://127.0.0.1');
      if (pathname === IDENTITY_PATH) {
        res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' });
        res.end(JSON.stringify(identity));
        return;
      }
      const file = await resolveFile(pathname);
      if (!file) {
        const notFound = await readFile(join(root, '404.html')).catch(() => Buffer.from('not found'));
        res.writeHead(404, { 'content-type': TYPES['.html'] }).end(notFound);
        return;
      }
      const bytes = await readFile(file);
      // The sandboxed simulator has an opaque origin and needs Pages' CORS policy.
      res.writeHead(200, {
        'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
        'access-control-allow-origin': '*',
      });
      res.end(bytes);
    })().catch(() => {
      if (!res.headersSent) res.writeHead(500);
      res.end('preview request failed');
    });
  });

  await new Promise((resolveReady, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => {
      server.off('error', reject);
      resolveReady();
    });
  });
  const origin = 'http://127.0.0.1:' + server.address().port;
  return {
    origin, identity,
    async close() {
      if (!server.listening) return;
      server.closeAllConnections();
      await new Promise((resolveClosed, reject) => server.close((error) => error ? reject(error) : resolveClosed()));
    },
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const preview = await startDistServer({ port: Number(process.env.PORT ?? 0) });
  process.stdout.write('serving dist at ' + preview.origin + BASE + '/\n');
  const stop = () => void preview.close().catch((error) => {
    process.stderr.write(error.message + '\n');
    process.exitCode = 1;
  });
  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);
}
