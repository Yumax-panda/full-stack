import 'server-only'

import type { UpdateSkillProps } from '@/models'

import { prisma } from '@/lib/client'

export async function updateSkillWithTagIds({
  id,
  userId,
  tags,
  ...props
}: UpdateSkillProps & { userId: string }) {
  await prisma.skill.update({
    where: {
      id,
    },
    data: props,
  })

  await prisma.skillTagRelation.deleteMany({
    where: {
      skillId: id,
    },
  })

  await prisma.skillTagRelation.createMany({
    data: tags.map((tagId) => ({
      skillId: id,
      tagId,
    })),
  })
}

export async function deleteSkill(skillId: string) {
  await prisma.skillTagRelation.deleteMany({
    where: {
      skillId,
    },
  })

  await prisma.skill.delete({
    where: {
      id: skillId,
    },
  })
}
