import { test, expect } from '@playwright/test';

test('BIMI logo is served as a self-contained SVG Tiny PS file', async ({ request, page }) => {
	const response = await request.get('/logo.svg', { maxRedirects: 0 });
	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toMatch(/^image\/svg\+xml\b/);

	const body = await response.body();
	expect(body.byteLength).toBeLessThanOrEqual(32 * 1024);
	const symbol = await (await request.get('/rightrefer-logo.svg')).text();
	const logo = await page.evaluate(({ source, symbolSource }) => {
		const xml = new DOMParser().parseFromString(source, 'image/svg+xml');
		const symbolXml = new DOMParser().parseFromString(symbolSource, 'image/svg+xml');
		const svg = xml.documentElement;
		return {
			parseErrors: xml.getElementsByTagName('parsererror').length,
			namespace: svg.namespaceURI,
			version: svg.getAttribute('version'),
			profile: svg.getAttribute('baseProfile'),
			viewBox: svg.getAttribute('viewBox'),
			width: svg.getAttribute('width'),
			height: svg.getAttribute('height'),
			title: svg.querySelector('title')?.textContent,
			description: svg.querySelector('desc')?.textContent,
			background: svg.querySelector('rect')?.getAttribute('fill'),
			backgroundSize: [
				svg.querySelector('rect')?.getAttribute('width'),
				svg.querySelector('rect')?.getAttribute('height'),
			],
			paths: Array.from(svg.querySelectorAll('path'), (path) =>
				[path.getAttribute('fill'), path.getAttribute('d')]),
			symbolPaths: Array.from(symbolXml.querySelectorAll('path'), (path) =>
				[path.getAttribute('fill'), path.getAttribute('d')]),
			elements: Array.from(xml.getElementsByTagName('*'), (element) => element.localName),
			attributes: Array.from(xml.getElementsByTagName('*')).flatMap((element) =>
				Array.from(element.attributes, (attribute) => attribute.localName)),
		};
	}, { source: body.toString('utf8'), symbolSource: symbol });

	expect(logo.parseErrors).toBe(0);
	expect(logo.namespace).toBe('http://www.w3.org/2000/svg');
	expect(logo.version).toBe('1.2');
	expect(logo.profile).toBe('tiny-ps');
	expect(logo.viewBox).toBe('0 0 96 96');
	expect(logo.width).toBe('96');
	expect(logo.height).toBe('96');
	expect(logo.title).toBe('RightRefer');
	expect(logo.description).toBeTruthy();
	expect(logo.background).toBe('#FFFFFF');
	expect(logo.backgroundSize).toEqual(['96', '96']);
	expect(logo.paths).toHaveLength(3);
	expect(logo.paths).toEqual(logo.symbolPaths);
	expect(logo.elements).toEqual(['svg', 'title', 'desc', 'rect', 'g', 'path', 'path', 'path']);
	expect(logo.attributes.every((name) =>
		['xmlns', 'version', 'baseProfile', 'width', 'height', 'viewBox', 'fill', 'transform', 'd'].includes(name),
	)).toBe(true);
});
