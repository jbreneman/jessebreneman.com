export default defineNuxtPlugin(async () => {
	if (!('serviceWorker' in navigator)) return;
	try {
		const registrations = await navigator.serviceWorker.getRegistrations();
		for (const registration of registrations) {
			const worker = registration.active || registration.waiting || registration.installing;
			if (worker && new URL(worker.scriptURL).href === new URL('/sw.js', location.origin).href) {
				await registration.update();
			}
		}
	} catch {
		// Worker updates can fail offline; let the browser retry on the next visit.
	}
});
