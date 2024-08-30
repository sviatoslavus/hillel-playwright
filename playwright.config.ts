import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';

dotenv.config({ path:  '.env'});

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
    baseURL: process.env.BASE_URL,
        httpCredentials: {
          username: process.env.USER_NAME!,
          password: process.env.USER_PASS!
        }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'qauto',
      testMatch: '**.qauto.spec.ts',
      use: {
        headless: true,
        storageState: 'session-storage.json',
      },
      dependencies: ['login'],
    },
    { name : 'login',
      testMatch: 'login.setup.ts',
      use:{
        headless: true,
        ...devices['Desktop Chrome'],
      },

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
  ],
});
