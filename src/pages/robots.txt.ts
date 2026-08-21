import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const productionSite = site ?? new URL('https://referright.com');
	const sitemapUrl = new URL('/sitemap-index.xml', productionSite);

	return new Response(
		`User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`,
		{
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
			},
		},
	);
};
