import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: { browserName: 'chromium', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    { name: 'development', testMatch: 'portfolio.spec.ts', use: { baseURL: 'http://127.0.0.1:5188' } },
    { name: 'production', testMatch: 'production.spec.ts', use: { baseURL: 'http://127.0.0.1:5189' } },
  ],
  webServer: [
    { command: 'npm run dev', url: 'http://127.0.0.1:5188', reuseExistingServer: true, timeout: 60000 },
    { command: 'npm run start', url: 'http://127.0.0.1:5189', reuseExistingServer: false, timeout: 60000 },
  ],
});
