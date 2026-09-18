// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// This is the public landing origin, never the app/auth handoff or a preview URL.
	site: 'https://www.rightrefer.com',
	output: 'static',
	integrations: [sitemap()],
});
