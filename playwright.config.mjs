import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests/browser',
	fullyParallel: false,
	workers: 1,
	timeout: 30_000,
	use: {
		baseURL: 'http://127.0.0.1:4173',
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure'
	},
	webServer: {
		command: 'node tests/browser/static-server.mjs',
		url: 'http://127.0.0.1:4173',
		reuseExistingServer: false
	}
});
