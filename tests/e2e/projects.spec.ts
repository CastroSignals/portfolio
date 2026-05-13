import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Projects (/projects)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('app-language', 'en');
    });
  });

  test('renders the page heading', async ({ page }) => {
    await page.goto('/projects');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/journey/i);
  });

  test('renders the back link to home', async ({ page }) => {
    await page.goto('/projects');
    const back = page.getByRole('link', { name: /back/i });
    await expect(back.first()).toBeVisible();
  });

  test('renders at least one timeline item', async ({ page }) => {
    await page.goto('/projects');
    const items = page.locator('.timeline-item');
    await expect(items.first()).toBeVisible();
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('renders detailed project cards and expands the first one on click', async ({ page }) => {
    await page.goto('/projects');
    const cards = page.locator('.detailed-card');
    await expect(cards.first()).toBeVisible();

    const firstHeader = page.locator('.detailed-card__header').first();
    await firstHeader.click();

    await expect(cards.first()).toHaveClass(/detailed-card--expanded/);
  });

  test('has no detectable WCAG 2.1 AA accessibility violations', async ({ page }) => {
    await page.goto('/projects');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
