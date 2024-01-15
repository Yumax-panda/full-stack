import { cache } from 'react'

import { prisma } from '@/lib/client'

export async function getTagsByUserIdwithoutCache(userId: string) {
  console.info(`called get tags by user id: ${userId}`)
  return await prisma.tag.findMany({
    where: {
      userId,
    },
  })
}

export const getTagsByUserId = cache(getTagsByUserIdwithoutCache)
