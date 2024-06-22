import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'qauto',
      testMatch: '**.qauto.spec.ts',
      use: {
        headless: false,
        baseURL: 'https://qauto.forstudy.space/',
        httpCredentials: {
          username: 'guest',
          password: 'welcome2qauto'
        }
      }
    },
    {
      name: 'smoke',
      // testDir: './tests/smoke',
      // testMatch: '**.smoke.e2e.ts',
      grep: new RegExp('@smoke'),
      use: { ...devices['Desktop Chrome'], 
        headless: false,
        viewport: {
          width: 400, 
          height: 300
        }
       },
    },
    {
      name: 'regression',
      // testDir: './tests/regression',
      // testMatch: '**.e2e.ts',
      grep: new RegExp('@regression'),
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api',
      testDir: './tests',
      testMatch: '**.api.spec.ts'

    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
