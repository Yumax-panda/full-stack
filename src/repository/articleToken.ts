import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_cache as cache } from 'next/cache'

import type { UpdateArticleToken } from '@/models/articleToken'

import { prisma } from '@/lib/prisma'
import { tag } from '@/lib/routes'

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
  ['getArticleTokenByUserId'],
  { tags: [tag.token] },
)

export async function updateArticleToken(
  data: UpdateArticleToken,
): Promise<void> {
  const { userId, provider, token } = data
  if (token === null) {
    try {
      await prisma.articleToken.delete({
        where: {
          provider_userId: {
            provider,
            userId,
          },
        },
      })
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        // P2025: Record to delete does not exist.
        if (e.code === 'P2025') {
          return
        }
      }
    }
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
