import { prisma } from '@/lib/client'

import type { Work } from '@prisma/client'

export type PartialWork = Pick<Work, 'id' | 'title' | 'thumbnail'>

export async function getPartialWorksByUserId(
  userId: string,
): Promise<PartialWork[]> {
  return prisma.work.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
    },
  })
}

export async function getWorkById(workId: string): Promise<Work | null> {
  return prisma.work.findUnique({
    where: {
      id: workId,
    },
  })
}

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
