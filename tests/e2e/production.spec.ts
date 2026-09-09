import { expect, test } from '@playwright/test';
test('production includes the approved study without draft notices', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'An AI workflow before an AI agent' })).toBeVisible();
  await expect(page.locator('a[href="/case-studies/social-content-agent"]')).toBeVisible();
  await expect(page.locator('.draft-badge')).toHaveCount(0);
  const response = await page.goto('/case-studies/social-content-agent');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1, name: 'An AI workflow before an AI agent' })).toBeVisible();
  await expect(page.locator('.draft-notice')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://work.nikema.dev/case-studies/social-content-agent');
});
test('sitemap and metadata include the published study at the confirmed domain', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain('<loc>https://work.nikema.dev/case-studies/social-content-agent</loc>');
  expect(await sitemap.text()).not.toContain('localhost');
  expect(await sitemap.text()).toContain('<loc>https://work.nikema.dev</loc>');
  const home = await request.get('/');
  expect(await home.text()).toContain('rel="canonical" href="https://work.nikema.dev"');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Allow: /');
  expect(robots).toContain('Sitemap: https://work.nikema.dev/sitemap.xml');
});
