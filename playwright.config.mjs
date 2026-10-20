import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: process.env.CI ? 2 : undefined,
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run dev',
    env: { PORT: '4173' },
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
  projects: [
    { name: 'iphone-webkit', use: { ...devices['iPhone 13'], browserName: 'webkit' } },
    { name: 'android-chromium', use: { ...devices['Pixel 7'], browserName: 'chromium' } },
    { name: 'desktop-safari', use: { ...devices['Desktop Safari'], browserName: 'webkit' } },
  ],
});
