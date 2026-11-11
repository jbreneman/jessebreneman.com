import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import { staticServer } from './static-server.mjs';

test('returning Workbox 4 visitor retires the root worker and only its caches', async ({ browser }) => {
	// Original Nuxt 2 worker, including the actual Workbox 4.3.1 strategies.
	const legacyWorker = await readFile(new URL('./legacy-worker.txt', import.meta.url), 'utf8');
	let previousRelease = true;
	let navigations = 0;
	const server = staticServer({ intercept(path, request, response) {
		if (path === '/') navigations++;
		if (path === '/_nuxt/retirement-probe.js') {
			response.writeHead(200, { 'Content-Type': 'application/javascript' }).end('new asset');
			return true;
		}
		if (previousRelease && path === '/') {
			response.writeHead(200, { 'Content-Type': 'text/html' }).end('<h1>Previous release</h1>');
			return true;
		}
		if (previousRelease && path === '/sw.js') {
			response.writeHead(200, { 'Content-Type': 'application/javascript', 'Cache-Control': 'no-cache' }).end(legacyWorker);
			return true;
		}
		return false;
	} });
	await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
	const origin = `http://127.0.0.1:${server.address().port}`;
	const context = await browser.newContext();
	try {
		const page = await context.newPage();
		const errors = [];
		page.on('pageerror', error => errors.push(error.message));
		await page.goto(origin);
		await page.evaluate(async () => {
			await navigator.serviceWorker.register('/sw.js');
			await navigator.serviceWorker.ready;
		});
		await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
		await page.reload();
		const cacheNames = await page.evaluate(async () => {
			const scope = location.origin + '/';
			const runtime = 'workbox-runtime-' + scope;
			const precache = 'workbox-precache-v2-' + scope;
			for (const name of [runtime, precache, 'other-app-cache', 'workbox-runtime-' + scope + 'other/']) {
				const cache = await caches.open(name);
				await cache.put('/_nuxt/retirement-probe.js', new Response('stale asset'));
			}
			return { runtime, precache };
		});
		expect(await page.evaluate(() => fetch('/_nuxt/retirement-probe.js').then(response => response.text()))).toBe('stale asset');
		previousRelease = false;
		navigations = 0;
		// The old NetworkFirst strategy loads the new HTML; its client plugin updates /sw.js.
		await page.goto(origin);
		await expect(page.locator('h1')).toContainText('Jesse Breneman');
		await expect.poll(() => page.evaluate(() => navigator.serviceWorker.getRegistrations().then(items => items.length))).toBe(0);
		const remaining = await page.evaluate(() => caches.keys());
		expect(remaining).not.toContain(cacheNames.runtime);
		expect(remaining).not.toContain(cacheNames.precache);
		expect(remaining).toContain('other-app-cache');
		expect(remaining).toContain('workbox-runtime-' + origin + '/other/');
		expect(await page.evaluate(() => fetch('/_nuxt/retirement-probe.js').then(response => response.text()))).toBe('new asset');
		expect(navigations).toBe(1);
		await page.reload();
		expect(await page.evaluate(() => navigator.serviceWorker.controller)).toBeNull();
		expect(errors).toEqual([]);
	} finally {
		await context.close();
		await new Promise(resolve => server.close(resolve));
	}
});
