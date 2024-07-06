import { expect, test } from '@playwright/test'

import { authenticatedUserCreatedTest } from '@/__tests__/e2e/utils/auth'
import {
  SkillFactory,
  SkillTagRelationFactory,
  TagFactory,
  userCreatedTest,
} from '@/__tests__/utils/factory'
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

test('スキルが登録されていないユーザーのページ', async ({ page }) => {
  userCreatedTest(async ({ user }) => {
    await page.goto(routes.userSkill(user.id), {
      waitUntil: 'domcontentloaded',
    })
    await expect(page).toHaveTitle(`${user.name} | Full Stack`)
    const hasEmptyMessage = await page.isVisible(
      'text=まだスキルが登録されていません',
    )
    expect(
      hasEmptyMessage,
      'タグが登録されていない場合はメッセージが表示される',
    ).toBe(true)
  })
})

test('スキルが登録されている & タグが登録されていないユーザーのページ', async ({
  page,
}) => {
  userCreatedTest(async ({ user }) => {
    await SkillFactory.createList(3)
    await page.goto(routes.userSkill(user.id), {
      waitUntil: 'domcontentloaded',
    })
    await expect(page).toHaveTitle(`${user.name} | Full Stack`)
    const hasSkillCards = await page.isVisible(
      'text=スキルが登録されていません',
    )
    expect(
      hasSkillCards,
      'スキルが登録されている場合はカードが表示される',
    ).toBe(false)
  })

  const isTagFilterSelectVisible = await page.isVisible('text=タグで絞り込む')

  expect(
    isTagFilterSelectVisible,
    'タグが登録されていない場合はタグフィルターが表示されない',
  ).toBe(false)
})

test('スキルが登録されている & タグが登録されているユーザーのページ', async ({
  page,
}) => {
  userCreatedTest(async ({ user }) => {
    await Promise.all([
      SkillFactory.createList(3),
      SkillTagRelationFactory.createList(3),
    ])
    await page.goto(routes.userSkill(user.id), {
      waitUntil: 'domcontentloaded',
    })
    await expect(page).toHaveTitle(`${user.name} | Full Stack`)
    const hasSkillCards = await page.isVisible(
      'text=スキルが登録されていません',
    )
    expect(
      hasSkillCards,
      'スキルが登録されている場合はカードが表示される',
    ).toBe(false)

    const isTagFilterSelectVisible = await page.isVisible('text=タグで絞り込む')
    expect(
      isTagFilterSelectVisible,
      'タグが登録されている場合はタグフィルターが表示される',
    ).toBe(true)
  })
})

test('スキルが登録されている & タグが登録されているがスキルと結びつけていない場合', async ({
  page,
}) => {
  userCreatedTest(async ({ user }) => {
    await Promise.all([SkillFactory.createList(3), TagFactory.createList(3)])
    await page.goto(routes.userSkill(user.id), {
      waitUntil: 'domcontentloaded',
    })
    await expect(page).toHaveTitle(`${user.name} | Full Stack`)
    const hasSkillCards = await page.isVisible(
      'text=スキルが登録されていません',
    )
    expect(
      hasSkillCards,
      'スキルが登録されている場合はカードが表示される',
    ).toBe(false)

    const isTagFilterSelectVisible = await page.isVisible('text=タグで絞り込む')
    expect(
      isTagFilterSelectVisible,
      'タグがスキルと結びついていない場合は絞り込みが表示されない',
    ).toBe(false)
  })
})
