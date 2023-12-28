import { prisma } from '@/lib/client'

export async function getArticleTokenByUserId(userId: string) {
  return await prisma.articleToken.findMany({
    where: {
      userId,
    },
  })
}
