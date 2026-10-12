import { test, expect } from '@playwright/test';

/**
 * Responsive layout + basic accessibility checks.
 */

test.describe('Responsive — desktop', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('header navigation is visible without opening a menu', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('header .nav')).toBeVisible();
        await expect(page.locator('header .menu-btn')).toBeHidden();
    });

    test('phone mockup keeps a taller-than-wide screen', async ({ page }) => {
        await page.goto('/');
        const screen = page.locator('.mock-phone .phone-screen');
        await screen.scrollIntoViewIfNeeded();
        const box = await screen.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.height).toBeGreaterThan(box!.width);
    });
});

test.describe('Responsive — mobile', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('hamburger menu toggles the nav', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.splash')).toBeHidden({ timeout: 6000 });
        const btn = page.locator('header .menu-btn');
        await expect(btn).toBeVisible();
        await expect(page.locator('header .nav')).toBeHidden();
        await btn.click();
        await expect(btn).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator('header .nav')).toBeVisible();
    });

    test('closing the menu with Escape returns focus to the button', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.splash')).toBeHidden({ timeout: 6000 });
        const btn = page.locator('header .menu-btn');
        await btn.click();
        await page.keyboard.press('Escape');
        await expect(btn).toHaveAttribute('aria-expanded', 'false');
    });

    test('no horizontal overflow on the homepage', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.splash')).toBeHidden({ timeout: 6000 });
        const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(1);
    });
});

test.describe('Accessibility basics', () => {
    test('all images have alt text', async ({ page }) => {
        await page.goto('/');
        const imgs = page.locator('img');
        const count = await imgs.count();
        for (let i = 0; i < count; i++) {
            await expect(imgs.nth(i)).toHaveAttribute('alt', /.*/);
        }
    });

    test('page has exactly one h1', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('h1')).toHaveCount(1);
    });

    test('interactive elements are keyboard reachable', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.splash')).toBeHidden({ timeout: 6000 });
        await page.keyboard.press('Tab');
        const focused = await page.evaluate(() => document.activeElement?.tagName ?? '');
        expect(['A', 'BUTTON', 'INPUT']).toContain(focused);
    });
});
