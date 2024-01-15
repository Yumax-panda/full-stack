import 'server-only'

import { unstable_cache as cache } from 'next/cache'

import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/client'
import { tag } from '@/lib/routes'
import { createNewWork, getEmptyWork } from '@/repository/work'

import type { UpdateWorkInServer } from '@/models'

import type { Work } from '@prisma/client'

export async function getOrCreateEmptyWorkWithutCache(
  userId: string,
): Promise<Work> {
  console.info(`called get or create empty work by user id: ${userId}`)
  const emptyWork = await getEmptyWork(userId)

  if (emptyWork) {
    return emptyWork
  }

  return createNewWork(userId)
}

export const getOrCreateEmptyWork = cache(
  getOrCreateEmptyWorkWithutCache,
  ['getOrCreateEmptyWork'],
  { tags: [tag.work] },
)

export async function getMyWorkByWorkIdWithoutCache(
  workId: string,
): Promise<Work | null> {
  console.info(`called get work by work id: ${workId}`)
  const [session, work] = await Promise.all([
    getSession(),
    prisma.work.findUnique({
      where: {
        id: workId,
      },
    }),
  ])

  if (!(session && session.user && work && session.user.id === work.userId)) {
    return null
  }

  return work
}

export { getMyWorkByWorkIdWithoutCache as getMyWorkByWorkId } // sessionを使うためキャッシュしない

export async function updateWork({
  id: workId,
  ...data
}: UpdateWorkInServer): Promise<Work | null> {
  const work = await prisma.work.update({
    where: {
      id: workId,
    },
    data,
  })

  return work
}
