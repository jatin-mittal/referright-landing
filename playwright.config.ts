import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	workers: 2,
	use: {
		baseURL: 'http://127.0.0.1:4322',
		browserName: 'chromium',
		trace: 'retain-on-failure',
	},
	webServer: {
		command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4322',
		url: 'http://127.0.0.1:4322',
		reuseExistingServer: false,
	},
});
