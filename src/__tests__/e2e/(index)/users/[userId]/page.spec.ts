import { test, expect } from '@playwright/test'

import { authenticatedUserCreatedTest } from '@/__tests__/e2e/utils/auth'
import { userCreatedTest } from '@/__tests__/utils/factory'
import { routes } from '@/lib/routes'

test('存在しないユーザーのページ', async ({ page }) => {
  await page.goto(routes.userSkill('not-exist'), {
    waitUntil: 'domcontentloaded',
  })
  await expect(page, '404ページになっているか').toHaveTitle(/.*404/)
})

test('存在するユーザーページ: 未ログイン', async ({ page }) => {
  userCreatedTest(async ({ user }) => {
    await page.goto(routes.userSkill(user.id), {
      waitUntil: 'domcontentloaded',
    })
    await expect(page).toHaveTitle(`${user.name} | Full Stack`)
    const hasAddSkillButton = await page.isVisible('text=スキルを追加')
    expect(hasAddSkillButton, '未ログイン時はスキル追加ボタンがないはず').toBe(
      false,
    )
  })
})

test('存在するユーザーページ: ログインしている', async ({ browser }) => {
  authenticatedUserCreatedTest({
    browser,
    test: async ({ user, page }) => {
      await page.goto(routes.userSkill(user.id), {
        waitUntil: 'domcontentloaded',
      })
      await expect(page).toHaveTitle(`${user.name} | Full Stack`)
      await page.click('text=スキルを追加')
      await expect(
        page,
        'スキル追加ボタンを押して編集ページへ遷移できるかどうか',
      ).toHaveURL(routes.userSkillEdit())
    },
  })
})
