import { cache } from 'react'

import { prisma } from '@/lib/client'

import type { UpdateArticleToken } from '@/models/articleToken'

export async function getArticleTokenByUserIdWithoutCache(userId: string) {
  console.info(`called get article token by user id: ${userId}`)
  return await prisma.articleToken.findMany({
    where: {
      userId,
    },
  })
}

export const getArticleTokenByUserId = cache(
  getArticleTokenByUserIdWithoutCache,
)

export async function updateArticleToken(
  data: UpdateArticleToken,
): Promise<void> {
  const { userId, provider, token } = data
  if (token === null) {
    await prisma.articleToken.delete({
      where: {
        provider_userId: {
          provider,
          userId,
        },
      },
    })
    return
  }
  await prisma.articleToken.upsert({
    where: {
      provider_userId: {
        provider,
        userId,
      },
    },
    update: {
      token,
    },
    create: {
      provider,
      userId,
      token,
    },
  })
}
