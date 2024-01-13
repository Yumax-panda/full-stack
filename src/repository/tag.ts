import { prisma } from '@/lib/client'

export async function getTagsByUserId(userId: string) {
  return await prisma.tag.findMany({
    where: {
      userId,
    },
  })
}
