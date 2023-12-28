import { prisma } from '@/lib/client'

export const getSkillsByUserId = async (userId: string) => {
  return await prisma.skill.findMany({
    where: {
      userId,
    },
  })
}
