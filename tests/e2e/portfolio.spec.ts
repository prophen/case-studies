import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [320, 390, 768, 1440]) {
  test(`homepage and study fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const [route, name] of [['/', 'home'], ['/case-studies/social-content-agent', 'study']]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      for (const img of await page.locator('main img').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.screenshot({ path: `docs/screenshots/${name}-${width}.png`, fullPage: true });
      if ([390, 1440].includes(width)) {
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        expect(results.violations).toEqual([]);
      }
    }
  });
}
test('navigation, anchors, disclosures, and keyboard focus work', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await page.getByRole('link', { name: 'Open the field notes' }).click();
  await expect(page.getByText('A work in progress.', { exact: true })).toBeVisible();
  const chapter = page.getByRole('navigation', { name: 'Case study chapters' }).getByRole('link', { name: /Decisions visible in the code/ });
  await chapter.click();
  await expect(page).toHaveURL(/#decisions-visible-in-the-code$/);
  await expect(page.locator('#decisions-visible-in-the-code')).toBeInViewport();
  await expect(page.locator('#decisions-visible-in-the-code')).toBeFocused();
  const summary = page.locator('summary').first();
  await summary.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
  await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).not.toHaveAttribute('open');
  await page.getByRole('link', { name: 'Back to selected work' }).click();
  await expect(page).toHaveURL(/\/#work$/);
});
test('text enlarged to 200 percent remains readable without page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1000 });
  for (const route of ['/', '/case-studies/social-content-agent']) {
    await page.goto(route);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});
test('reduced-motion preference disables smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});
