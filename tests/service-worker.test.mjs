import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../public/sw.js', import.meta.url), 'utf8');

test('retirement clears only the old worker caches, claims clients, and unregisters', async () => {
	const scope = 'https://jessebreneman.com/';
	const owned = [`workbox-runtime-${scope}`, `workbox-precache-v2-${scope}`];
	const unrelated = ['other-app-cache', 'workbox-runtime-https://jessebreneman.com/other/'];
	const events = {};
	const actions = [];
	vm.runInNewContext(source, {
		self: {
			addEventListener: (name, handler) => { events[name] = handler; },
			skipWaiting: () => { actions.push('skipWaiting'); },
			clients: { claim: async () => { actions.push('claim'); } },
			registration: { scope, unregister: async () => { actions.push('unregister'); } }
		},
		caches: {
			keys: async () => [...owned, ...unrelated],
			delete: async name => { actions.push(name); }
		}
	});
	events.install();
	await new Promise((resolve, reject) => {
		events.activate({ waitUntil: work => work.then(resolve, reject) });
	});
	assert.deepEqual(actions, ['skipWaiting', ...owned, 'claim', 'unregister']);
	assert.equal(events.fetch, undefined, 'retired worker must not intercept requests');
});

const pluginSource = (await readFile(new URL('../app/plugins/retire-service-worker.client.js', import.meta.url), 'utf8'))
	.replace('export default ', '');

async function runPlugin(navigator) {
	let plugin;
	vm.runInNewContext(pluginSource, {
		defineNuxtPlugin: callback => { plugin = callback; },
		navigator, URL, location: { origin: 'https://jessebreneman.com' }
	});
	await plugin();
}

test('returning visitors update only the historical worker; fresh visits register nothing', async () => {
	const updated = [];
	await runPlugin({ serviceWorker: {
		getRegistrations: async () => [
			{ active: { scriptURL: 'https://jessebreneman.com/sw.js' }, update: async () => updated.push('old') },
			{ active: { scriptURL: 'https://jessebreneman.com/other/sw.js' }, update: async () => updated.push('other') }
		]
	} });
	assert.deepEqual(updated, ['old']);
	await runPlugin({ serviceWorker: { getRegistrations: async () => [] } });
	await runPlugin({});
});

test('offline worker updates do not prevent application startup', async () => {
	await runPlugin({ serviceWorker: { getRegistrations: async () => { throw new Error('offline'); } } });
});
