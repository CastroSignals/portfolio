import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Not found (wildcard route)', () => {
  test('renders the 404 component on an unknown path', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/not.*found/i);
  });

  test('renders the "Back to Home" return link', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    const back = page.getByRole('link', { name: /back to home/i });
    await expect(back).toBeVisible();
  });

  test('clicking "Back to Home" returns to the hero', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await page.getByRole('link', { name: /back to home/i }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Gabriel');
  });

  test('has no detectable WCAG 2.1 AA accessibility violations', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
