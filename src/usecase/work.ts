import 'server-only'

import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/client'
import { createNewWork, getEmptyWork } from '@/repository/work'

import type { Work } from '@prisma/client'

export async function getOrCreateEmptyWork(userId: string): Promise<Work> {
  const emptyWork = await getEmptyWork(userId)

  if (emptyWork) {
    return emptyWork
  }

  return createNewWork(userId)
}

export async function getMyWorkByWorkId(workId: string): Promise<Work | null> {
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
