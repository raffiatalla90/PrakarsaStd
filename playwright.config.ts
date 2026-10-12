import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the Prakarsa Studio site.
 *
 * The app is served by `php artisan serve` on :8000. Start it before running:
 *   php artisan serve --host=127.0.0.1 --port=8000
 * or let the webServer block below boot it automatically.
 */
export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],

    use: {
        baseURL: process.env.E2E_BASE_URL ?? 'http://127.0.0.1:8000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'off',
    },

    projects: [
        { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
    ],

    webServer: process.env.E2E_SKIP_SERVER
        ? undefined
        : {
              command: 'php -d variables_order=EGPCS -S 127.0.0.1:8000 -t public',
              url: 'http://127.0.0.1:8000',
              reuseExistingServer: true,
              timeout: 120_000,
              env: { CONTACT_THROTTLE: '1000,1' },
          },
});
