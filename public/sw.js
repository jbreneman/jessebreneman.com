// Retire the former Nuxt PWA worker at its original URL and root scope.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
	event.waitUntil((async () => {
		// Workbox 4's default caches are scoped to this registration's URL.
		const scope = self.registration.scope;
		const names = await caches.keys();
		await Promise.all(names
			.filter(name => /^workbox-(precache|runtime)-/.test(name) && name.endsWith(scope))
			.map(name => caches.delete(name)));
		await self.clients.claim();
		await self.registration.unregister();
	})());
});
