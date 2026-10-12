import { test, expect } from '@playwright/test';

/**
 * Functional tests for the contact endpoint (POST /kontak).
 * These hit the backend directly; the UI currently surfaces a WhatsApp card,
 * but the form endpoint must still validate and persist correctly.
 *
 * Laravel applies CSRF protection, so we grab the token from the meta tag
 * and the session cookie off a real page load before posting.
 */

async function csrf(page: import('@playwright/test').Page) {
    await page.goto('/');
    const token = await page.locator('meta[name="csrf-token"]').getAttribute('content');
    return token ?? '';
}

test.describe('POST /kontak — validation', () => {
    test('rejects an empty submission', async ({ page }) => {
        const token = await csrf(page);
        const res = await page.request.post('/kontak', {
            headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json', 'X-CSRF-TOKEN': token },
            form: {},
        });
        expect(res.status()).toBe(422);
        const body = await res.json();
        expect(body.errors).toHaveProperty('name');
        expect(body.errors).toHaveProperty('email');
        expect(body.errors).toHaveProperty('message');
    });

    test('rejects an invalid email', async ({ page }) => {
        const token = await csrf(page);
        const res = await page.request.post('/kontak', {
            headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json', 'X-CSRF-TOKEN': token },
            form: { name: 'Budi', email: 'not-an-email', message: 'Saya butuh website company profile.' },
        });
        expect(res.status()).toBe(422);
        const body = await res.json();
        expect(body.errors).toHaveProperty('email');
    });

    test('rejects a message shorter than 10 characters', async ({ page }) => {
        const token = await csrf(page);
        const res = await page.request.post('/kontak', {
            headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json', 'X-CSRF-TOKEN': token },
            form: { name: 'Budi', email: 'budi@example.com', message: 'hai' },
        });
        expect(res.status()).toBe(422);
        const body = await res.json();
        expect(body.errors).toHaveProperty('message');
    });

    test('rejects an unknown service option', async ({ page }) => {
        const token = await csrf(page);
        const res = await page.request.post('/kontak', {
            headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json', 'X-CSRF-TOKEN': token },
            form: { name: 'Budi', email: 'budi@example.com', service: 'Nope', message: 'Saya butuh website company profile.' },
        });
        expect(res.status()).toBe(422);
        const body = await res.json();
        expect(body.errors).toHaveProperty('service');
    });
});

test.describe('POST /kontak — success', () => {
    test('accepts a valid submission and redirects back', async ({ page }) => {
        const token = await csrf(page);
        const res = await page.request.post('/kontak', {
            headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json', 'X-CSRF-TOKEN': token },
            form: {
                name: 'Budi Santoso',
                email: 'budi@example.com',
                business: 'Warung Budi',
                service: 'Website Development',
                message: 'Saya ingin membuat website company profile untuk usaha saya.',
            },
        });
        // Inertia redirects back (302) or responds 200 for a full page load.
        expect([200, 302]).toContain(res.status());
    });
});

test.describe('POST /kontak — rate limiting', () => {
    test('advertises the rate-limit quota via headers', async ({ page }) => {
        const token = await csrf(page);
        // A validation failure (422) does not redirect, so the throttle headers are visible.
        const res = await page.request.post('/kontak', {
            headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json', 'X-CSRF-TOKEN': token },
            form: { name: '', email: 'not-an-email', message: 'x' },
        });
        expect(res.status()).toBe(422);
        expect(res.headers()).toHaveProperty('x-ratelimit-limit');
        expect(res.headers()).toHaveProperty('x-ratelimit-remaining');
        expect(Number(res.headers()['x-ratelimit-limit'])).toBeGreaterThan(0);
    });
});

test.describe('HTTP surface', () => {
    test('home returns 200 and the app shell', async ({ request }) => {
        const res = await request.get('/');
        expect(res.status()).toBe(200);
        const html = await res.text();
        expect(html).toContain('id="app"');
        expect(html.toLowerCase()).toContain('prakarsa');
    });

    test('tentang returns 200', async ({ request }) => {
        const res = await request.get('/tentang');
        expect(res.status()).toBe(200);
    });

    test('static images are served', async ({ request }) => {
        for (const src of ['/images/prakarsa-logo-wordmark.png', '/images/getmasjid-mobile.png']) {
            const res = await request.get(src);
            expect(res.status(), src).toBe(200);
            expect(res.headers()['content-type']).toContain('image');
        }
    });

    test('unknown route returns 404', async ({ request }) => {
        const res = await request.get('/this-page-does-not-exist');
        expect(res.status()).toBe(404);
    });
});
