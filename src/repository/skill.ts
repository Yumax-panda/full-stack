import type { Tag } from '@prisma/client'
import { prisma } from '@/lib/client'

import type { SkillWithTags } from '@/models'

export async function getSkillsWithTagsByUserId(
  userId: string,
): Promise<SkillWithTags[]> {
  const skills = await prisma.skill.findMany({
    where: {
      userId,
    },
    include: {
      tags: true,
    },
  })
  const tags = await prisma.tag.findMany({
    where: {
      userId,
    },
  })
  const tagMap: Record<string, Tag> = {}
  tags.forEach((tag) => {
    tagMap[tag.id] = tag
  })
  return skills.map((skill) => {
    return {
      ...skill,
      tags: skill.tags.map((relation) => tagMap[relation.tagId]),
    }
  })
}
