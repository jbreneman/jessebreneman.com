import { test, expect } from '@playwright/test';

async function ready(page) {
	await page.goto('/');
	await expect(page.locator('.index-hero')).toHaveClass(/visible/);
	await page.evaluate(() => document.fonts.ready);
}

for (const width of [320, 390, 768, 1440]) {
	test(`static page, responsive images and layout at ${width}px`, async ({ page, request }, testInfo) => {
		await page.setViewportSize({ width, height: 900 });
		const errors = [];
		page.on('pageerror', error => errors.push(error.message));
		page.on('console', message => {
			if (['error', 'warning'].includes(message.type())) errors.push(message.text());
		});
		page.on('response', response => {
			if (response.url().startsWith('http://127.0.0.1:4173') && response.status() >= 400) errors.push(response.url());
		});
		page.on('requestfailed', request => errors.push(request.url()));
		const html = await (await request.get('/')).text();
		expect(html).toContain('Featured projects');
		expect(html).toContain('Frontend engineering, design systems');
		await ready(page);
		await expect(page).toHaveTitle('Jesse Breneman — Frontend / UI Portfolio');
		const heroContent = await page.locator('.index-hero-section').boundingBox();
		const sectionContent = await page.locator('#work .wave-section-content').boundingBox();
		expect(heroContent.x).toBeCloseTo(sectionContent.x, 1);
		expect(heroContent.width).toBeCloseTo(sectionContent.width, 1);
		// Keep the existing vertical spacing while matching the other sections horizontally.
		if (width === 390 || width === 1440) {
			const heading = await page.locator('h1').boundingBox();
			expect(heading.y).toBeCloseTo(width === 390 ? 81.89 : 252, 0);
		}
		for (const image of await page.locator('.project-card-image').all()) {
			await image.scrollIntoViewIfNeeded();
			await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 30)).toBe(true);
			expect(await image.evaluate(element => element.currentSrc)).toContain('/_ipx/');
			expect(await image.getAttribute('srcset')).toBeTruthy();
			expect(await image.evaluate(element => getComputedStyle(element).objectFit)).toBe('cover');
		}
		expect(await page.locator('.project-card').count()).toBe(5);
		const imageUrls = await page.locator('.project-card-background img').evaluateAll(images => [...new Set(images.flatMap(image => [image.getAttribute('src'), ...(image.getAttribute('srcset') || '').split(', ').map(candidate => candidate.split(' ')[0])]).filter(Boolean))]);
		for (const url of imageUrls) expect((await request.get(url)).status(), url).toBe(200);
		for (const selector of ['.rotating-border-preview', '.fancy-wipe-preview', '.hexagonal-grid-preview']) {
			await expect(page.locator(selector)).toBeVisible();
		}
		expect(await page.locator('.hexagonal-grid-preview-item').count()).toBe(30);
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
		expect(await page.locator('svg').count()).toBeGreaterThan(10);
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.evaluate(() => scrollTo(0, 0));
		await page.screenshot({ path: testInfo.outputPath(`page-${width}.png`), fullPage: true });
		expect(await page.evaluate(() => navigator.serviceWorker.getRegistrations().then(items => items.length))).toBe(0);
		for (const asset of ['/favicon.png', '/icon.png', '/resume-2020.pdf', '/sw.js']) {
			expect((await request.get(asset)).status()).toBe(200);
		}
		expect((await request.get('/missing-page')).status()).toBe(404);
		expect(await page.locator('script[src*="panelbear"]').count()).toBe(0);
		expect(errors).toEqual([]);
	});
}

test('system themes, custom theme cycle, persistence and initial theme', async ({ page, browser }) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await ready(page);
	await expect(page.locator('html')).toHaveClass(/light-mode/);
	await page.emulateMedia({ colorScheme: 'dark' });
	await expect(page.locator('html')).toHaveClass(/dark-mode/);
	for (const theme of ['sunset', 'sunrise', 'dark']) {
		await page.getByRole('button', { name: 'Change color theme' }).click();
		await expect(page.locator('html')).toHaveClass(new RegExp(`${theme}-mode`));
		await page.reload();
		await expect(page.locator('.index-hero')).toHaveClass(/visible/);
		await expect(page.locator('html')).toHaveClass(new RegExp(`${theme}-mode`));
	}
	for (const theme of ['light', 'dark', 'sunrise', 'sunset']) {
		const initialPage = await browser.newPage();
		await initialPage.addInitScript(value => localStorage.setItem('nuxt-color-mode', value), theme);
		await initialPage.route('**/_nuxt/*.js', route => route.abort());
		await initialPage.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
		await expect(initialPage.locator('html')).toHaveClass(new RegExp(`${theme}-mode`));
		await initialPage.close();
	}
});

test('responsive images load at double pixel density', async ({ browser }) => {
	const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
	await page.goto('http://127.0.0.1:4173/');
	for (const image of await page.locator('.project-card-image').all()) {
		await image.scrollIntoViewIfNeeded();
		await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 30)).toBe(true);
		expect(await image.evaluate(element => element.currentSrc)).toContain('/_ipx/');
	}
	await page.close();
});

test('theme palettes render on desktop and mobile', async ({ browser }, testInfo) => {
	for (const [theme, primary, background] of [
		['light', '#4ec6f3', '#ffffff'], ['dark', '#4ec6f3', '#333333'],
		['sunrise', '#642b73', '#ffffff'], ['sunset', '#febf57', '#ffffff']
	]) {
		const page = await browser.newPage({ reducedMotion: 'reduce' });
		await page.addInitScript(value => localStorage.setItem('nuxt-color-mode', value), theme);
		await page.goto('http://127.0.0.1:4173/');
		await page.evaluate(() => document.fonts.ready);
		const colors = await page.locator('html').evaluate(element => {
			const style = getComputedStyle(element);
			return ['--primary', '--grey-0'].map(property => style.getPropertyValue(property).trim()
				.replace(/^#([\da-f])([\da-f])([\da-f])$/i, '#$1$1$2$2$3$3'));
		});
		expect(colors).toEqual([primary, background]);
		for (const width of [390, 1440]) {
			await page.setViewportSize({ width, height: 900 });
			await page.screenshot({ path: testInfo.outputPath(`${theme}-${width}.png`) });
		}
		await page.close();
	}
});

test('one-time animations, preview pause controls, anchors and keyboard focus', async ({ page }) => {
	await page.addInitScript(() => {
		window.migrationAnimations = [];
		document.addEventListener('animationstart', event => {
			if (event.target.matches('.index-hero-heading-text, #work .fancy-wipe-text')) {
				window.migrationAnimations.push(event.animationName);
			}
		});
	});
	await ready(page);
	await expect.poll(() => page.evaluate(() => window.migrationAnimations.length)).toBe(1);
	await page.locator('#work-heading').scrollIntoViewIfNeeded();
	await expect.poll(() => page.evaluate(() => window.migrationAnimations.length)).toBe(2);
	await expect(page.locator('#work .fancy-wipe')).not.toHaveClass(/playing/);
	await page.evaluate(() => scrollTo(0, 0));
	await page.locator('#work-heading').scrollIntoViewIfNeeded();
		expect(await page.evaluate(() => window.migrationAnimations.length)).toBe(2);
	for (const name of ['Rotating border', 'Fancy wipe']) {
		const button = page.getByRole('button', { name: `Pause ${name} animation` });
		await button.click();
		const preview = page.locator('.portfolio-preview-card-preview-paused');
		expect(await preview.locator('*').evaluateAll(elements => elements.every(element => getComputedStyle(element).animationPlayState === 'paused'))).toBe(true);
		await page.getByRole('button', { name: `Play ${name} animation` }).click();
	}
	await page.goto('/');
	await page.getByRole('button', { name: 'Change color theme' }).focus();
	await expect(page.getByRole('button', { name: 'Change color theme' })).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(page.locator('html')).toHaveClass(/sunset-mode/);
	await page.keyboard.press('Tab');
	await expect(page.getByRole('link', { name: 'Go to homepage' })).toBeFocused();
	for (const id of ['work', 'experiments', 'writing', 'contact']) {
		await page.goto(`/#${id}`);
		await expect(page).toHaveURL(new RegExp(`#${id}$`));
		await expect(page.locator(`#${id}`)).toBeInViewport();
	}
});

for (const fallback of ['reduced motion', 'no JavaScript', 'no observer']) {
	test(`readable content with ${fallback}`, async ({ browser }) => {
		const context = await browser.newContext({
			javaScriptEnabled: fallback !== 'no JavaScript',
			reducedMotion: fallback === 'reduced motion' ? 'reduce' : 'no-preference'
		});
		if (fallback === 'no observer') await context.addInitScript(() => { delete window.IntersectionObserver; });
		const page = await context.newPage();
		const errors = [];
		page.on('pageerror', error => errors.push(error.message));
		await page.goto('http://127.0.0.1:4173/');
		await expect(page.locator('h1')).toContainText('Jesse Breneman');
		expect(await page.locator('.index-hero-heading-text').evaluate(element => getComputedStyle(element).opacity)).toBe('1');
		await page.locator('#work-heading').scrollIntoViewIfNeeded();
		await expect.poll(() => page.locator('.project-card-image').first().evaluate(element => element.complete && element.naturalWidth > 30)).toBe(true);
		expect(await page.locator('#work .fancy-wipe-text').evaluate(element => getComputedStyle(element).maskImage)).toBe('none');
		await expect(page.locator('.index-hero')).not.toHaveClass(/visible/);
		if (fallback === 'reduced motion') {
			expect(await page.locator('.rotating-border-preview-border').evaluate(element => getComputedStyle(element, '::before').animationName)).toBe('none');
			await expect(page.getByRole('button', { name: 'Pause Rotating border animation' })).toBeHidden();
		}
		expect(errors).toEqual([]);
		await context.close();
	});
}
