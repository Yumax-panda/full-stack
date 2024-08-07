import { unstable_cache as cache } from 'next/cache'

import type { UpdateWorkInServer } from '@/models'
import type { Work } from '@prisma/client'

import { auth as getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { tag } from '@/lib/routes'
import { createNewWork, getEmptyWork } from '@/repository/work'

export async function getOrCreateEmptyWorkWithoutCache(
  userId: string,
): Promise<Work> {
  const emptyWork = await getEmptyWork(userId)

  if (emptyWork) {
    return emptyWork
  }

  return createNewWork(userId)
}

export const getOrCreateEmptyWork = cache(
  getOrCreateEmptyWorkWithoutCache,
  ['getOrCreateEmptyWork'],
  { tags: [tag.work] },
)

export async function getMyWorkByWorkIdWithoutCache(
  workId: string,
): Promise<Work | null> {
  const [session, work] = await Promise.all([
    getSession(),
    prisma.work.findUnique({
      where: {
        id: workId,
      },
    }),
  ])

  if (!(session?.user && work && session.user.id === work.userId)) {
    return null
  }

  return work
}

export async function updateWork({
  id: workId,
  userId,
  ...data
}: UpdateWorkInServer & { id: string }): Promise<Work | null> {
  const work = await prisma.work.update({
    where: {
      id: workId,
      userId,
    },
    data,
  })

  return work
}

export async function deleteWork(workId: string) {
  return await prisma.work.delete({
    where: {
      id: workId,
    },
  })
}
