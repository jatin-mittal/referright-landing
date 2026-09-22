import { test, expect } from '@playwright/test';

for (const theme of ['light', 'dark'] as const) {
	test(`mobile sticky tabs work in ${theme} mode`, async ({ page }, testInfo) => {
		await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/');

		const tablist = page.getByRole('tablist');
		await expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
		expect(await tablist.evaluate((element) => element.scrollWidth === element.clientWidth)).toBe(true);

		const tabs = page.locator('.paths-tab');
		await expect(tabs).toHaveCount(3);
		for (let index = 0; index < 3; index++) {
			const tab = tabs.nth(index);
			expect((await tab.boundingBox())?.height).toBeGreaterThanOrEqual(44);
			await tab.click();
			await expect(tab).toHaveAttribute('aria-selected', 'true');
			await expect(page.getByRole('tabpanel')).toHaveCount(1);
		}

		expect(await tablist.evaluate((element) => getComputedStyle(element).position)).toBe('sticky');
		await page.locator('.paths-panel:not([hidden]) .paths-cta').scrollIntoViewIfNeeded();
		await expect(tablist).toBeInViewport();

		expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
		await tablist.screenshot({ path: testInfo.outputPath(`mobile-tabs-${theme}.png`) });
	});
}

test('desktop keeps the horizontal pill switch', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	const tablist = page.getByRole('tablist');
	expect(await tablist.evaluate((element) => element.scrollWidth === element.clientWidth)).toBe(true);
	for (const tab of await page.getByRole('tab').all()) {
		await tab.click();
		await expect(tab).toHaveAttribute('aria-selected', 'true');
	}
});

test('keyboard navigation uses left and right arrows', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	const tabs = page.getByRole('tab');
	await tabs.first().focus();
	await page.keyboard.press('ArrowRight');
	await expect(tabs.nth(1)).toBeFocused();
	await page.keyboard.press('End');
	await expect(tabs.nth(2)).toBeFocused();
	await page.keyboard.press('Home');
	await expect(tabs.first()).toBeFocused();
	await page.keyboard.press('ArrowLeft');
	await expect(tabs.nth(2)).toBeFocused();
});

test('glow pulse applies only to buttons inside demo windows', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.goto('/');

	for (let index = 0; index < 3; index++) {
		await page.getByRole('tab').nth(index).click();
		const panel = page.getByRole('tabpanel');
		const demo = panel.locator('.pc-action').first();
		await expect.poll(() => demo.evaluate((element) => getComputedStyle(element, '::after').animationName))
			.toBe('path-glow');
	}

	for (const control of await page.locator('.paths-tab, .paths-cta').all()) {
		const animations = await control.evaluate((element) => [
			getComputedStyle(element).animationName,
			getComputedStyle(element, '::after').animationName,
			...Array.from(element.querySelectorAll('*')).map((node) => getComputedStyle(node).animationName),
		]);
		expect(animations).not.toContain('path-glow');
	}

	await page.emulateMedia({ reducedMotion: 'reduce' });
	const reducedAnimation = await page.getByRole('tabpanel').locator('.pc-action').first()
		.evaluate((element) => getComputedStyle(element, '::after').animationName);
	expect(reducedAnimation).toBe('none');
});

test('demo buttons simulate state and reset', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	for (const [index, action, done] of [
		[0, 'Send request', 'Request raised'],
		[1, 'Claim request', 'Request claimed'],
	] as const) {
		await page.getByRole('tab').nth(index).click();
		const panel = page.getByRole('tabpanel');
		const button = panel.getByRole('button', { name: action, exact: true });
		await button.click();
		await expect(panel.getByRole('button', { name: done, exact: true })).toBeDisabled();
		await expect(panel.getByRole('status')).toContainText('Demo only; nothing was sent.');
		await panel.getByRole('button', { name: 'Reset', exact: true }).click();
		await expect(button).toBeEnabled();
	}
});

test('trust strip keeps the requested mobile format', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	const strip = page.locator('.hero-strip');
	await expect(strip.locator('strong')).toHaveText([
		'LinkedIn', 'Referrer Appreciation, Your Way', '100% Free', '2-Day Response',
	]);
	await expect(strip.locator('li > span')).toHaveText([
		'Verified employment', 'Add an optional thank-you amount.', 'No payment required', 'Get clarity, sooner.',
	]);
	expect(await strip.locator('li').evaluateAll((elements) => elements.every((element) => {
		const style = getComputedStyle(element);
		return style.borderLeftWidth === '2px'
			&& style.borderTopWidth === '0px'
			&& style.borderRightWidth === '0px'
			&& style.borderBottomWidth === '0px';
	}))).toBe(true);
});

test('FAQ text and structured data agree', async ({ page }) => {
	await page.goto('/');
	const structured = await page.locator('script[type="application/ld+json"]').allTextContents();
	const faq = structured.map((value) => JSON.parse(value)).find((value) => value['@type'] === 'FAQPage');
	const items = page.locator('.faq-item');
	await expect(items).toHaveCount(faq.mainEntity.length);
	for (let index = 0; index < faq.mainEntity.length; index++) {
		await expect(items.nth(index).locator('.faq-question')).toHaveText(faq.mainEntity[index].name);
		await expect(items.nth(index).locator('.faq-answer')).toHaveText(faq.mainEntity[index].acceptedAnswer.text);
	}
});

test('footer links to the public legal pages', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('link', { name: 'Privacy', exact: true })).toHaveAttribute('href', '/privacy/');
	await expect(page.getByRole('link', { name: 'Terms', exact: true })).toHaveAttribute('href', '/terms/');
});

test('homepage includes the Google site verification token', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('meta[name="google-site-verification"]')).toHaveAttribute(
		'content',
		'j6O-5YpIJmfBldKGkepKWvJ69ZZlmqWrElZFDFaBpww',
	);
});

for (const legalPage of [
	{
		path: '/privacy/',
		title: 'Privacy Policy',
		canonical: 'https://www.rightrefer.com/privacy/',
	},
	{
		path: '/terms/',
		title: 'Terms of Service',
		canonical: 'https://www.rightrefer.com/terms/',
	},
] as const) {
	test(`${legalPage.title} is public and has page-specific metadata`, async ({ page }) => {
		await page.goto(legalPage.path);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(legalPage.title);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', legalPage.canonical);

		const structured = await page.locator('script[type="application/ld+json"]').allTextContents();
		expect(structured.map((value) => JSON.parse(value)['@type'])).not.toContain('FAQPage');
	});
}

test('all three paths stay readable with JavaScript disabled', async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
	const page = await context.newPage();
	await page.goto('http://127.0.0.1:4322');
	await expect(page.locator('.paths-panel:visible')).toHaveCount(3);
	await expect(page.locator('.paths-title:visible')).toHaveCount(3);
	await expect(page.locator('.paths-visual:visible')).toHaveCount(0);
	await context.close();
});
