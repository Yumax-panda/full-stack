import { test, expect } from '@playwright/test'

import { routes } from '@/lib/routes'

test('top page', async ({ page }) => {
  await page.goto(routes.top(), {
    waitUntil: 'domcontentloaded',
  })
  await expect(page).toHaveTitle('Full Stack')
})
