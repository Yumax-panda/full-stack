import type { Work } from '@prisma/client'
import { prisma } from '@/lib/client'

export type PartialWork = {
  id: string
  title: string
  thumbnail: string | null
  updatedAt: Date
}

export async function getPublicPartialWorksByUserId(
  userId: string,
): Promise<PartialWork[]> {
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

export async function getAllPartialWorksByUserId(
  userId: string,
): Promise<PartialWork[]> {
  return prisma.work.findMany({
    where: {
      userId,
      title: { not: null },
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

export async function getPublicWork(workId: string): Promise<Work | null> {
  return prisma.work.findFirst({
    where: {
      id: workId,
      isPrivate: false,
      title: { not: null },
      content: { not: null },
    },
  })
}
