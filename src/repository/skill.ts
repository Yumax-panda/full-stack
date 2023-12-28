import { prisma } from '@/lib/client'

import type { Skill } from '@prisma/client'

export const getSkillsByUserId = async (userId: string): Promise<Skill[]> => {
  return await prisma.skill.findMany({
    where: {
      userId,
    },
  })
}
