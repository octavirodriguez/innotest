import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Prefer a single retry in CI to capture flaky failures with trace
  retries: process.env.CI ? 1 : 0,
  // Reduce workers in CI to avoid shared-state flakiness; local runs use default
  workers: process.env.CI ? 1 : undefined,
  // Use GitHub reporter in CI and preserve HTML report for local investigation
  reporter: [['github'], ['html', { title: 'Custom test run' }]],
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    trace: 'on-first-retry',
    // Run headless on CI, but keep headed locally for easier dev debugging
    headless: process.env.CI ? true : false,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Webkit'] }
    },
    {
      name: 'mobile chrome',
      use: { ...devices['Mobile Chrome'] }
    }
  ],
});