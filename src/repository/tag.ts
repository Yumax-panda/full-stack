import { unstable_cache as cache } from 'next/cache'

import { prisma } from '@/lib/client'
import { tag } from '@/lib/routes'
import type { CreateTag, UpdateTag } from '@/models'

export async function getTagsByUserIdwithoutCache(userId: string) {
  console.info(`called get tags by user id: ${userId}`)
  return await prisma.tag.findMany({
    where: {
      userId,
    },
  })
}

export const getTagsByUserId = cache(
  getTagsByUserIdwithoutCache,
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
