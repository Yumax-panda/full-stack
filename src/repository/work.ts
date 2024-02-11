import type { Work } from '@prisma/client'
import { unstable_cache as cache } from 'next/cache'

import { prisma } from '@/lib/client'
import { tag } from '@/lib/routes'

export type PartialWork = {
  id: string
  title: string
  thumbnail: string | null
  updatedAt: Date
  isPrivate: boolean
}

export async function getPublicPartialWorksByUserIdWithoutCache(
  userId: string,
): Promise<PartialWork[]> {
  console.info(`called get public partial works by user id: ${userId}`)
  return prisma.work.findMany({
    where: {
      userId,
      isPrivate: false,
      title: { not: null },
      content: { not: null },
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      updatedAt: true,
      isPrivate: true,
    },
  }) as Promise<PartialWork[]>
}

export const getPublicPartialWorksByUserId = cache(
  getPublicPartialWorksByUserIdWithoutCache,
  ['getPublicPartialWorksByUserId'],
  { tags: [tag.work] },
)

export async function getAllPartialWorksByUserIdWithoutCache(
  userId: string,
): Promise<PartialWork[]> {
  console.info(`called get all partial works by user id: ${userId}`)
  return prisma.work.findMany({
    where: {
      userId,
      NOT: { title: null, content: null, thumbnail: null },
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      updatedAt: true,
      isPrivate: true,
    },
  }) as Promise<PartialWork[]>
}

export const getAllPartialWorksByUserId = cache(
  getAllPartialWorksByUserIdWithoutCache,
  ['getAllPartialWorksByUserId'],
  { tags: [tag.work] },
)

export async function getWorkByIdWithoutCache(
  workId: string,
): Promise<Work | null> {
  console.info(`called get work by id: ${workId}`)
  return prisma.work.findUnique({
    where: {
      id: workId,
    },
  })
}

export const getWorkById = cache(getWorkByIdWithoutCache, ['getWorkById'], {
  tags: [tag.work],
})

export async function getWorksByUserIdWithoutCache(
  userId: string,
): Promise<Work[]> {
  console.info(`called get works by user id: ${userId}`)
  return prisma.work.findMany({
    where: {
      userId,
    },
  })
}

export const getWorksByUserId = cache(
  getWorksByUserIdWithoutCache,
  ['getWorksByUserId'],
  { tags: [tag.work] },
)

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
