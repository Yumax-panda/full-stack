import { prisma } from '@/lib/client'

export async function getSkillsWithTagsByUserId(userId: string) {
  return await prisma.skill.findMany({
    where: {
      userId,
    },
    include: {
      tags: true,
    },
  })
}
