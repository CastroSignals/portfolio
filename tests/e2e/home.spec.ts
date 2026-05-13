import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Home (/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('app-language', 'en');
    });
  });

  test('renders the page with main landmarks', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('renders the hero with the user name as h1', async ({ page }) => {
    await page.goto('/');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Gabriel');
    await expect(h1).toContainText('Castro');
  });

  test('renders the tagline', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/dashboards airlines run/i)).toBeVisible();
  });

  test('exposes the LinkedIn and GitHub social links with external attrs', async ({ page }) => {
    await page.goto('/');
    const linkedin = page.getByRole('link', { name: 'LinkedIn', exact: true });
    await expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/castrosignals');
    await expect(linkedin).toHaveAttribute('target', '_blank');
    await expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer');

    const github = page.getByRole('link', { name: 'GitHub', exact: true });
    await expect(github).toHaveAttribute('href', 'https://github.com/castrosignals');
  });

  test('theme toggle flips data-theme on <html>', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /Switch to (light|dark) mode/ });
    await expect(toggle).toBeVisible();

    const before = await page.locator('html').getAttribute('data-theme');
    await toggle.click();
    const after = await page.locator('html').getAttribute('data-theme');

    // Starts unset (or dark); after a click the attribute must be a real value
    // and must have flipped relative to "before".
    expect(after).toMatch(/^(dark|light)$/);
    expect(after).not.toBe(before);
  });

  test('has no detectable WCAG 2.1 AA accessibility violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
