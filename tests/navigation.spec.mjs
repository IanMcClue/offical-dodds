import { test, expect } from '@playwright/test';

const destinations = ['START', 'IDENTITY', 'WORK', 'PLAYGROUND', 'JOURNAL', 'ARCHIVE', 'CONTACT', 'OPTIONS'];

test('all destinations remain reachable and fit the viewport', async ({ page }) => {
  await page.goto('/');
  const compact = await page.evaluate(() => matchMedia('(max-width: 900px)').matches);
  for (const name of destinations) {
    if (compact) {
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      await page.locator('#mobile-menu').getByRole('link').filter({ hasText: name }).click();
      await expect(page.locator('#mobile-menu')).toBeHidden();
      await expect(page.locator('#scene-title')).toBeFocused();
    } else {
      await page.locator('.menu').getByRole('button', { name, exact: true }).click();
    }
    await expect(page.getByRole('heading', { level: 1, name, exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.getByRole('button', { name: 'motion:', exact: false }).click();
  await expect(page.getByRole('button', { name: 'motion: off', exact: true })).toBeVisible();
});

test('compact menu handles focus, history, reduced motion and resize', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/#work');
  const toggle = page.locator('#menu-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu [aria-current=page]')).toHaveAttribute('href', '#work');
  await toggle.focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('#mobile-menu a').first()).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.locator('#mobile-menu a').last()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#scene-title')).toHaveText('WORK');
  await toggle.click();
  await page.locator('#mobile-menu a[href="#playground"]').click();
  await page.getByRole('textbox').fill('TEST');
  await expect(page.locator('#type-preview')).toHaveText('TEST');
  expect(await page.getByRole('textbox').evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
  await page.goBack();
  await expect(page.locator('#scene-title')).toHaveText('WORK');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await toggle.click();
  expect(await page.locator('#mobile-menu a').first().evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.locator('#mobile-menu')).toBeHidden();
  await expect(toggle).toBeHidden();
  await expect(page.locator('.menu')).toBeVisible();
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('small phones and landscape can scroll to every control', async ({ page }) => {
  for (const viewport of [{ width: 320, height: 568 }, { width: 844, height: 390 }, { width: 768, height: 1024 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/#options');
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    await page.locator('#mobile-menu a').last().click();
    await page.getByRole('button', { name: 'RESTORE DEFAULTS' }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const content = await page.locator('.scene-content').boundingBox();
    const scene = await page.locator('.scene').boundingBox();
    expect(content.y + content.height).toBeLessThanOrEqual(scene.y + scene.height);
  }
});
