import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const types = {
	'.html': 'text/html', '.js': 'application/javascript', '.mjs': 'application/javascript',
	'.json': 'application/json', '.css': 'text/css', '.png': 'image/png',
	'.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
	'.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.pdf': 'application/pdf'
};

// Deliberately serves files only: no Nuxt server or runtime image transforms.
export function staticServer({ root = '.output/public', intercept } = {}) {
	const directory = resolve(root);
	return createServer(async (request, response) => {
		try {
			const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
			if (await intercept?.(pathname, request, response)) return;
			let file = resolve(directory, '.' + pathname);
			if (!file.startsWith(directory + sep) && file !== directory) {
				response.writeHead(403).end();
				return;
			}
			if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
			const extension = file.slice(file.lastIndexOf('.'));
			response.writeHead(200, {
				'Content-Type': types[extension] || 'application/octet-stream',
				'Cache-Control': 'no-cache'
			}).end(await readFile(file));
		} catch {
			response.writeHead(404, { 'Content-Type': 'text/html' }).end('Not found');
		}
	});
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	staticServer().listen(4173, '127.0.0.1', () => console.log('Static preview: http://127.0.0.1:4173'));
}
