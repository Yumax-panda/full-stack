import { expect, test } from 'vitest'

import { createFactory } from './seed'

import { prisma } from '@/lib/client'
import { getOrCreateEmptyWorkWithoutCache } from '@/usecase/work'

const { UserFactory } = createFactory()

test('空のページがあれば、新規追加の際はそれを割り当てる', async () => {
  const user = await UserFactory.create()
  const work = await getOrCreateEmptyWorkWithoutCache(user.id)
  const work2 = await getOrCreateEmptyWorkWithoutCache(user.id)
  // テストが終わったらデータを削除
  await prisma.user.delete({ where: { id: user.id } })
  expect(work.id).toBe(work2.id)
})
