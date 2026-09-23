import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const utilityDirectory = dirname(fileURLToPath(import.meta.url));
const siteDirectory = resolve(utilityDirectory, '..', '..');
const hostname = '127.0.0.1';
const port = Number.parseInt(process.env.PREVIEW_PORT ?? '4173', 10);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
};

function resolveRequestPath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, `http://${hostname}`).pathname);
  const candidate = resolve(siteDirectory, `.${pathname}`);
  if (candidate !== siteDirectory && !candidate.startsWith(`${siteDirectory}${sep}`)) return null;
  if (existsSync(candidate) && statSync(candidate).isDirectory()) return resolve(candidate, 'index.html');
  return candidate;
}

const server = createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let file;
  try {
    file = resolveRequestPath(request.url ?? '/');
  } catch {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Bad request');
    return;
  }

  if (!file || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
    return;
  }

  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Type': contentTypes[extname(file).toLowerCase()] ?? 'application/octet-stream',
  });
  if (request.method === 'HEAD') response.end();
  else createReadStream(file).pipe(response);
});

server.listen(port, hostname, () => {
  console.log(`Local site preview: http://${hostname}:${port}/`);
});
