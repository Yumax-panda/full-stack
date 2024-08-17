import { unstable_cache as cache } from 'next/cache'

import type { CreateTag, UpdateTag } from '@/models'

import { prisma } from '@/lib/prisma'
import { tag } from '@/lib/routes'

async function getTagsByUserIdWithoutCache(userId: string) {
  return await prisma.tag.findMany({
    where: {
      userId,
    },
  })
}

export const getTagsByUserId = cache(
  getTagsByUserIdWithoutCache,
  ['getTagsByUserId'],
  { tags: [tag.tag] },
)

export async function createTag(data: CreateTag & { userId: string }) {
  return await prisma.tag.create({
    data,
  })
}

export async function updateTag({
  id,
  userId,
  ...data
}: UpdateTag & { userId: string; id: string }) {
  return await prisma.tag.update({ where: { id }, data })
}

export async function deleteTag(id: string) {
  await Promise.all([
    prisma.tag.deleteMany({ where: { id } }),
    prisma.skillTagRelation.deleteMany({ where: { tagId: id } }),
  ])
}
