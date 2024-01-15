import { unstable_cache as cache } from 'next/cache'

import { prisma } from '@/lib/client'
import { tag } from '@/lib/routes'

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
