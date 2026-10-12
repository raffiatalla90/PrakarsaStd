import { test, expect } from '@playwright/test';
import { openNav } from './helpers';

/**
 * UI + functional tests for navigation, the /tentang page,
 * anchor scrolling, and the contact section.
 */

test.describe('Navigation', () => {
    test('header link navigates to the Tentang page', async ({ page }) => {
        await page.goto('/');
        await openNav(page);
        await page.locator('header').getByRole('link', { name: 'Tentang Kami' }).click();
        await expect(page).toHaveURL(/\/tentang$/);
        await expect(page).toHaveTitle(/Tentang Kami — Prakarsa Studio/);
    });

    test('CTA scrolls to the contact section on the homepage', async ({ page }) => {
        await page.goto('/');
        await openNav(page);
        await page.locator('header').getByRole('link', { name: /mulai proyek/i }).click();
        await expect(page).toHaveURL(/#kontak$/);
        await expect(page.locator('#kontak')).toBeInViewport();
    });

    test('footer link returns from Tentang to Beranda', async ({ page }) => {
        await page.goto('/tentang');
        await page.getByRole('contentinfo').getByRole('link', { name: 'Beranda' }).click();
        await expect(page).toHaveURL(/\/$/);
    });
});

test.describe('Tentang page — UI', () => {
    test('renders the hero, values, stats and process sections', async ({ page }) => {
        await page.goto('/tentang');
        await expect(page.locator('.page-hero h1')).toContainText('Partner Pembuatan');
        await expect(page.locator('.value-grid li')).toHaveCount(3);
        await expect(page.locator('.stat-grid .stat')).toHaveCount(4);
        await expect(page.locator('.process-grid li')).toHaveCount(4);
    });

    test('shows a breadcrumb back to Beranda', async ({ page }) => {
        await page.goto('/tentang');
        const crumb = page.getByRole('navigation', { name: /breadcrumb/i });
        await expect(crumb.getByRole('link', { name: 'Beranda' })).toHaveAttribute('href', '/');
    });

    test('header marks the Tentang link as the current page', async ({ page }) => {
        await page.goto('/tentang');
        await expect(page.locator('header a[aria-current="location"]')).toContainText('Tentang Kami');
    });
});

test.describe('Contact section — UI', () => {
    test('renders the contact heading and channel card', async ({ page }) => {
        await page.goto('/');
        const contact = page.locator('#kontak');
        await contact.scrollIntoViewIfNeeded();
        await expect(contact.getByRole('heading', { name: /mari wujudkan ide/i })).toBeVisible();
        await expect(contact.locator('.wa-card')).toBeVisible();
    });

    test('WhatsApp card links out when a number is configured, otherwise shows a fallback', async ({ page }) => {
        await page.goto('/');
        const contact = page.locator('#kontak');
        await contact.scrollIntoViewIfNeeded();
        const chat = contact.getByRole('link', { name: /chat via whatsapp/i });
        const fallback = contact.locator('.wa-unavailable');
        await expect(chat.or(fallback)).toBeVisible();
        if (await chat.count()) {
            await expect(chat).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+/);
            await expect(chat).toHaveAttribute('target', '_blank');
        }
    });
});

test.describe('Reveal-on-scroll', () => {
    test('sections gain the "in" class once scrolled into view', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.splash')).toBeHidden({ timeout: 6000 });
        const about = page.locator('#tentang');
        await about.scrollIntoViewIfNeeded();
        await expect(about).toHaveClass(/in/, { timeout: 4000 });
    });
});
