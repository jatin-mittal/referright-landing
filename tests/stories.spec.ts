import { expect, test } from '@playwright/test';
import stories from '../src/data/stories.json' with { type: 'json' };

interface Story {
	name: string;
	title?: string;
	company?: string;
	companyLogoUrl?: string;
	companyLogoDarkUrl?: string;
	review: string;
	photoUrl?: string;
	linkedinUrl?: string;
}

const entries: readonly Story[] = stories.reviews;

test('stories show the approved reviews and supplied profiles', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');

	const section = page.locator('#stories');
	await expect(section.locator('.eyebrow')).toHaveText('Real people, real feedback');
	await expect(section.locator('.stories-proof-label')).toHaveText('Early release snapshot');
	await expect(section.locator('[data-count-to]')).toHaveText(String(stories.referralCount));
	expect((await section.innerText()).toLowerCase()).not.toContain('beta');
	expect((await section.innerText()).toLowerCase()).not.toContain('draft');
	const cards = section.locator('.quote-card:not([aria-hidden="true"])');
	await expect(cards).toHaveCount(entries.length);
	expect(entries).toHaveLength(7);
	expect(new Set(entries.map((entry) => entry.name)).size).toBe(entries.length);
	expect(entries.map((entry) => entry.company)).toEqual([
		'Microsoft',
		'Deutsche Telekom Digital Labs',
		'Deloitte',
		'UKG',
		'Microsoft',
		'FleetxAI',
		'Swiggy',
	]);
	expect(entries.map((entry) => entry.title)).toEqual([
		'Software Engineer - 2',
		'Software Engineer',
		'Gen AI Engineer',
		'SDE-2',
		'Software Engineer - 2',
		undefined,
		'Business Associate',
	]);
	for (let index = 0; index < entries.length; index++) {
		const entry = entries[index];
		const card = cards.nth(index);
		await expect(card.locator('.quote-identity strong')).toHaveText(entry.name);
		if (entry.title) await expect(card.locator('.quote-title')).toHaveText(entry.title);
		if (entry.company) await expect(card.locator('.quote-company')).toHaveText(entry.company);
		if (entry.companyLogoUrl) {
			const companyLogo = card.locator('.quote-company-logo:not(.is-dark)');
			await expect(companyLogo).toHaveAttribute('src', entry.companyLogoUrl);
			expect(await companyLogo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
		}
		expect(entry.review.trim().length).toBeGreaterThan(0);
		await expect(card.locator('blockquote')).toHaveText(`“${entry.review}”`);
	}
	await expect(section.locator('.stories-proof-note')).toHaveCount(0);
	for (const entry of entries) {
		expect(Object.keys(entry).every((key) => ['name', 'title', 'company', 'companyLogoUrl', 'companyLogoDarkUrl', 'photoUrl', 'linkedinUrl', 'review'].includes(key))).toBe(true);
	}
});

test('company marks switch to legible variants with the theme', async ({ page, request }) => {
	await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
	await page.goto('/');
	const cards = page.locator('#stories .quote-card:not([aria-hidden="true"])');

	for (let index = 0; index < entries.length; index++) {
		const logos = cards.nth(index).locator('.quote-company-logo');
		await expect(logos.first()).toBeVisible();
		expect(await logos.first().evaluate((image) => getComputedStyle(image).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
	}

	await page.locator('[data-theme-toggle]').click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	for (let index = 0; index < entries.length; index++) {
		const logos = cards.nth(index).locator('.quote-company-logo');
		const darkUrl = entries[index].companyLogoDarkUrl;
		if (darkUrl) {
			await expect(logos.first()).toBeHidden();
			const darkLogo = logos.last();
			await expect(darkLogo).toHaveAttribute('src', darkUrl);
			await expect(darkLogo).toBeVisible();
			await expect.poll(() => darkLogo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
		} else {
			await expect(logos.first()).toBeVisible();
		}
	}
	const microsoftLogo = await (await request.get('/company-logos/microsoft.svg')).text();
	expect(microsoftLogo).toContain('viewBox="0 0 23 23"');
	expect(microsoftLogo).toContain('d="M1 12h10v10H1z"');
	expect(microsoftLogo.match(/<path\b/g)).toHaveLength(4);
	expect(microsoftLogo).not.toContain('<rect');
	expect(microsoftLogo).not.toContain('#f3f3f3');

	await page.setViewportSize({ width: 390, height: 844 });
	for (const index of [0, 4]) {
		const card = cards.nth(index);
		const company = card.locator('.quote-company');
		const logo = card.locator('.quote-company-logo:not(.is-dark)');
		await expect(company).toHaveText('Microsoft');
		await expect(card.locator('.quote-company-logo')).toHaveCount(1);
		await expect(logo).toBeVisible();
		expect(await logo.evaluate((image: HTMLImageElement) =>
			image.complete && image.naturalWidth === 23 && image.naturalHeight === 23
		)).toBe(true);
		expect(await company.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
		expect(await logo.evaluate((image) => {
			if (!image.parentElement) return false;
			const row = image.parentElement.getBoundingClientRect();
			const bounds = image.getBoundingClientRect();
			return bounds.left >= row.left && bounds.right <= row.right;
		})).toBe(true);
	}
	await page.locator('[data-theme-toggle]').click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	for (const index of [0, 4]) {
		const card = cards.nth(index);
		await expect(card.locator('.quote-company-logo')).toBeVisible();
		await expect(card.locator('.quote-company')).toHaveText('Microsoft');
	}
});

test('profile links use the official blue mark and photos come from JSON', async ({ page, request }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	const logo = await request.get('/linkedin-blue.png');
	expect(logo.ok()).toBe(true);
	expect(logo.headers()['content-type']).toContain('image/png');

	const section = page.locator('#stories');
	const cards = section.locator('.quote-card:not([aria-hidden="true"])');
	for (let index = 0; index < entries.length; index++) {
		const card = cards.nth(index);
		const entry = entries[index];
		const link = card.locator('.quote-linkedin');
		if (entry.linkedinUrl) {
			await expect(link).toHaveAttribute('href', entry.linkedinUrl);
			await expect(link).toHaveAttribute('target', '_blank');
			await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
			await expect(link.locator('img')).toHaveAttribute('src', '/linkedin-blue.png');
		} else {
			await expect(link).toHaveCount(0);
		}
		if (entry.photoUrl) {
			await expect(card.locator('img.quote-avatar')).toHaveAttribute('src', entry.photoUrl);
		} else {
			await expect(card.locator('span.quote-avatar')).toBeVisible();
		}
	}
	const duplicates = section.locator('.quote-card[aria-hidden="true"]');
	await expect(duplicates).toHaveCount(entries.length);
	await expect(duplicates.first()).toBeHidden();
	await expect(duplicates.locator('.quote-linkedin').first()).toHaveAttribute('tabindex', '-1');
});
