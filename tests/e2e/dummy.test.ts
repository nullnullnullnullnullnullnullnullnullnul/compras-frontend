import { test, expect } from '@playwright/test';

test('app loads and redirects from root', async ({ page }) => {
  await page.goto('/');
  await expect(page).not.toHaveURL('/');
});