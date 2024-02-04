import { unstable_cache as cache } from 'next/cache'

import { prisma } from '@/lib/client'
import { tag } from '@/lib/routes'
import type { CreateTag, UpdateTag } from '@/models'

export async function getTagsByUserIdWithoutCache(userId: string) {
  console.info(`called get tags by user id: ${userId}`)
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
  console.info(`called create tag by user id: ${data.userId}`)
  return await prisma.tag.create({
    data,
  })
}

export async function updateTag({
  id,
  userId,
  ...data
}: UpdateTag & { userId: string }) {
  console.info(`called update tag by user id: ${userId}`)
  return await prisma.tag.update({ where: { id }, data })
}

export async function deleteTag(id: string) {
  console.info(`called delete tag by id: ${id}`)
  await Promise.all([
    prisma.tag.deleteMany({ where: { id } }),
    prisma.skillTagRelation.deleteMany({ where: { tagId: id } }),
  ])
}
