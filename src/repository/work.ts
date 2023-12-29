import { prisma } from '@/lib/client'

import type { Work } from '@prisma/client'

export async function getWorksByUserId(userId: string): Promise<Work[]> {
  return prisma.work.findMany({
    where: {
      userId,
    },
  })
}

export async function createNewWork(userId: string): Promise<Work> {
  return prisma.work.create({
    data: {
      userId,
    },
  })
}

export async function getEmptyWork(userId: string): Promise<Work | null> {
  return prisma.work.findFirst({
    where: { userId, title: null, content: null, thumbnail: null },
  })
}
