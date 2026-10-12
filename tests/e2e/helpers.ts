import { Page, expect } from '@playwright/test';

/**
 * Opens the mobile navigation drawer when the hamburger is present.
 * On desktop the nav is always visible, so this is a no-op there.
 */
export async function openNav(page: Page) {
    const menuBtn = page.locator('header .menu-btn');
    if (await menuBtn.isVisible()) {
        await menuBtn.click();
        await expect(page.locator('header .nav')).toBeVisible();
    }
}
