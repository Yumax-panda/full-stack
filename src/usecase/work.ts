import 'server-only'

import { createNewWork, getEmptyWork } from '@/repository/work'

import type { Work } from '@prisma/client'

export async function getOrCreateEmptyWork(userId: string): Promise<Work> {
  const emptyWork = await getEmptyWork(userId)

  if (emptyWork) {
    return emptyWork
  }

  return createNewWork(userId)
}
