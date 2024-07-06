import { expect, test } from 'vitest'

import { userCreatedTest } from '@/__tests__/utils/factory'
import { prisma } from '@/lib/prisma'
import { getOrCreateEmptyWorkWithoutCache } from '@/usecase/work'

test(
  '空のページがあれば、新規追加の際はそれを割り当てる',
  userCreatedTest(async ({ user }) => {
    const work = await getOrCreateEmptyWorkWithoutCache(user.id)
    const work2 = await getOrCreateEmptyWorkWithoutCache(user.id)
    expect(work.id, '取得したページが同じか').toBe(work2.id)
    expect(work.title, '空のページのタイトルがnullになっているか').toBeNull()
    expect(work.content, '空のページの内容がnullになっているか').toBeNull()
    expect(
      work.thumbnail,
      '空のページのサムネイルがnullになっているか',
    ).toBeNull()
  }),
)

test(
  '空のページがなければ、新規追加する: タイトルが設定されている',
  userCreatedTest(async ({ user }) => {
    const nonEmptyWork = await prisma.work.create({
      data: {
        title: 'test',
        userId: user.id,
      },
    })
    const work = await getOrCreateEmptyWorkWithoutCache(user.id)
    expect(work.id, '空でないページを取得していないか').not.toBe(
      nonEmptyWork.id,
    )
    expect(work.title, '空のページのタイトルがnullになっているか').toBeNull()
    expect(work.content, '空のページの内容がnullになっているか').toBeNull()
    expect(
      work.thumbnail,
      '空のページのサムネイルがnullになっているか',
    ).toBeNull()
  }),
)
