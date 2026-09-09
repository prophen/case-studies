import { expect, test } from '@playwright/test';
test('production excludes drafts from the homepage and direct routes', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'The field notes are taking shape.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open the field notes' })).toHaveCount(0);
  expect(await page.content()).not.toContain('social-content-agent');
  const response = await request.get('/case-studies/social-content-agent');
  expect(response.status()).toBe(404);
  expect(await response.text()).not.toContain('An AI workflow before an AI agent');
});
test('sitemap and metadata use the confirmed domain and exclude drafts', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).not.toContain('social-content-agent');
  expect(await sitemap.text()).not.toContain('localhost');
  expect(await sitemap.text()).toContain('<loc>https://work.nikema.dev</loc>');
  const home = await request.get('/');
  expect(await home.text()).toContain('rel="canonical" href="https://work.nikema.dev"');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Allow: /');
  expect(robots).toContain('Sitemap: https://work.nikema.dev/sitemap.xml');
});
