import { expect, test } from '@playwright/test';

test.describe('i18n', () => {
  test('language toggle swaps the tagline EN <-> ES and updates <html lang>', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('app-language', 'en');
    });
    await page.goto('/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByText(/dashboards airlines run/i)).toBeVisible();

    const toggle = page.getByRole('button', { name: /Cambiar a español|Switch to English/ });
    await toggle.click();

    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByText(/aerolíneas gestionan sus ingresos/i)).toBeVisible();

    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByText(/dashboards airlines run/i)).toBeVisible();
  });

  test('timeline content on /projects localizes EN <-> ES', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('app-language', 'en');
    });
    await page.goto('/projects');

    await expect(page.getByRole('heading', { name: 'Journey & Work' })).toBeVisible();
    await expect(page.getByText(/Sole developer on a logistics app/)).toBeVisible();
    await expect(page.getByText(/Career Path/)).toBeVisible();

    await page.getByRole('button', { name: /Cambiar a español|Switch to English/ }).click();

    await expect(page.getByRole('heading', { name: 'Trayectoria y Trabajo' })).toBeVisible();
    await expect(page.getByText(/Único desarrollador de una aplicación logística/)).toBeVisible();
    await expect(page.getByText(/Carrera/)).toBeVisible();
  });

  test('preferred language persists across reloads', async ({ page }) => {
    // Seed a known starting state, then toggle to es and reload.
    // addInitScript would re-seed on every navigation (including reload),
    // so set localStorage *after* the first load and reload to pick it up.
    await page.goto('/');
    await page.evaluate(() => window.localStorage.setItem('app-language', 'en'));
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    const toggle = page.getByRole('button', { name: /Cambiar a español|Switch to English/ });
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByText(/aerolíneas gestionan sus ingresos/i)).toBeVisible();
  });
});
