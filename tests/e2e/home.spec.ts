import { test, expect } from '@playwright/test';
import { openNav } from './helpers';

/**
 * UI tests for the landing page: structure, sections, splash, and layout.
 */

test.describe('Home — structure', () => {
    test('loads with the expected title and language', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Prakarsa Studio/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'id');
    });

    test('has a main landmark and a skip link', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('main#utama')).toBeVisible();
        await expect(page.getByRole('link', { name: /lewati ke konten/i })).toBeAttached();
    });

    test('renders all key homepage sections', async ({ page }) => {
        await page.goto('/');
        // scroll through so reveal-on-scroll sections mount into view
        for (const id of ['beranda', 'tentang', 'layanan', 'portofolio', 'kontak']) {
            const section = page.locator(`#${id}`);
            await expect(section).toBeAttached();
        }
    });

    test('hero shows the headline and the animated typewriter', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.hero h1')).toContainText('Bukan Sekadar Website');
        await expect(page.locator('.hero .type-wrap')).toBeVisible();
        await expect(page.locator('.hero-lead')).toContainText('cepat, interaktif');
    });

    test('header exposes primary navigation and CTA', async ({ page }) => {
        await page.goto('/');
        await openNav(page);
        const nav = page.getByRole('navigation', { name: /utama/i });
        await expect(nav).toBeAttached();
        await expect(nav.getByRole('link', { name: 'Layanan' })).toBeAttached();
        await expect(nav.getByRole('link', { name: /mulai proyek/i })).toBeAttached();
    });
});

test.describe('Home — splash', () => {
    test('shows the splash curtain on first visit', async ({ page }) => {
        await page.goto('/');
        // The inline script adds is-splashing before React mounts.
        await expect(page.locator('.splash')).toBeVisible();
        await expect(page.locator('.splash-logo')).toBeVisible();
    });

    test('dismisses the splash and reveals content', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.splash')).toBeHidden({ timeout: 6000 });
        await expect(page.locator('html')).not.toHaveClass(/is-splashing/);
        await expect(page.locator('main#utama')).toBeVisible();
    });

    test('does not show the splash on a repeat visit in the same session', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.splash')).toBeHidden({ timeout: 6000 });
        await page.reload();
        await expect(page.locator('.splash')).toHaveCount(0);
    });
});

test.describe('Home — portfolio', () => {
    test('shows the GetMasjid case with a browser + phone mockup', async ({ page }) => {
        await page.goto('/');
        const card = page.locator('article.case', { hasText: 'GetMasjid' });
        await expect(card).toBeVisible();
        await expect(card.locator('.mock-shot .mock-url')).toHaveText('getmasjid.com');
        await expect(card.locator('.mock-phone')).toBeVisible();
        await expect(card.locator('.phone-screen .phone-shot')).toHaveAttribute('src', /getmasjid-mobile/);
    });

    test('explains the GetMasjid project', async ({ page }) => {
        await page.goto('/');
        const card = page.locator('article.case', { hasText: 'GetMasjid' });
        await expect(card.locator('h3')).toContainText('GetMasjid');
        await expect(card.locator('.case-desc')).toContainText(/jadwal sholat/i);
    });

    test('links the GetMasjid case to the live site in a new tab', async ({ page }) => {
        await page.goto('/');
        const link = page.locator('article.case', { hasText: 'GetMasjid' }).getByRole('link', { name: /lihat detail/i });
        await expect(link).toHaveAttribute('href', 'https://getmasjid.com');
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', /noopener/);
    });
});

test.describe('Home — navbar logo', () => {
    test('uses the wordmark image, not text', async ({ page }) => {
        await page.goto('/');
        const logo = page.locator('header .brand-logo');
        await expect(logo).toBeVisible();
        await expect(logo).toHaveAttribute('src', /prakarsa-logo-wordmark/);
        await expect(logo).toHaveAttribute('alt', /prakarsa studio/i);
    });
});

test.describe('Home — footer', () => {
    test('exposes footer navigation', async ({ page }) => {
        await page.goto('/');
        const footer = page.getByRole('contentinfo');
        await expect(footer).toBeVisible();
        await expect(footer.getByRole('link', { name: 'Beranda' })).toBeAttached();
        await expect(footer.getByRole('link', { name: 'Tentang Kami' })).toBeAttached();
    });
});
